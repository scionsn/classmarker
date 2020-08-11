window.addEventListener('load',init);
function init(){
    updateCounts();
    bindEvents();
}
function deleteMarked(){
    var arr= questionOperations.delete();
    printTable(arr);
}
function printTable(arr){
    document.querySelector('#questions').innerHTML = '';
    arr.forEach(printQuestion);
    updateCounts();
}
function load(){
    if(localStorage){
        if(localStorage.questions){
            var arrayofObjects= JSON.parse(localStorage.questions);
            //the for of loop is used to traverse an array
            for(let obj of arrayofObjects){
                let questionObject = new Question(obj.id, obj.name, obj.optionA, obj.optionB, obj.optionC, obj.optionD,obj.rans,obj.score);
                questionOperations.questions.push(questionObject);
            }
            //questionOperations.questions = JSON.parse(localStorage.questions);
            // prints all  the questions in the array.
            printTable(questionOperations.questions);
        }
        else{
            alert("Nothing to Load");
        }
    }
    else{
        alert("Ur Browser is Outdated...");
    }

}
function save(event){
    if(localStorage){
        let arr = questionOperations.questions;
        let json =JSON.stringify(arr);
        console.log(arr);
        console.log(json);
        localStorage.questions = json;
        alert("Record Saved");
    }
    else{
        alert("Ur Browser is Outdated...");
    }
    //event.preventDefault();
    //event.stopPropagation();
    
}
function bindEvents(){
    document.querySelector('#load').addEventListener('click',load);
    document.querySelector('#save').addEventListener('click',save);
    document.querySelector('#add').addEventListener('click',addQuestion);
    document.querySelector('#delete').addEventListener('click',deleteMarked);
    document.querySelector('#update').addEventListener('click',updateMarked);
    document.querySelector('#clear').addEventListener('click',clearAll);
    document.querySelector('#search').addEventListener('click',search);
   document.querySelector('#sort').addEventListener('click',sort);
}
function printQuestion(questionObject){
var tbody = document.querySelector('#questions');
var tr = tbody.insertRow();
var index = 0;
for(let key in questionObject)
// the for in loop returns the key in key value pair
{
    //the if statement is used because v dont want ismarked to get printed on the webpage.
    if(key=='isMarked'){
        continue;
    }
   let td =  tr.insertCell(index);
   td.innerText = questionObject[key]; 
   index++;
   
}
let td =  tr.insertCell(index);
let id = questionObject.id;
td.appendChild(createDelete('https://cdn1.iconfinder.com/data/icons/hawcons/32/699013-icon-27-trash-can-128.png',id));
td.appendChild(createEdit('https://image.flaticon.com/icons/png/128/61/61456.png',id));
//https://image.flaticon.com/icons/png/128/61/61456.png

}
function updateCounts(){
    document.querySelector('#total').innerText = questionOperations.questions.length;
    document.querySelector('#mark').innerText =  questionOperations.countMark() ;
    document.querySelector('#unmark').innerText =  questionOperations.questions.length -   questionOperations.countMark();
}
function toggleMark(){
    //this  refers to the current object which is img here. it will also show its attribute  qid and classname which is set to size.
console.log('U Click on ',this);
// the get attibute method shows the value of the attribute.
let id = this.getAttribute('qid');
console.log('ID is ',id);
questionOperations.toggleMark(id);
// The parentNode property returns the parent node of the specified node, as a Node object.
// In HTML, the document itself is the parent node of the HTML element, HEAD and BODY are child nodes of the HTML element.
let tr = this.parentNode.parentNode;//this points to row.
// The classList property returns the class name(s) of an element, as a DOMTokenList object.
// This property is useful to add, remove and toggle CSS classes on an element.
// The classList property is read-only, however, you can modify it by using the add() and remove() methods.
// the toggle method Toggles between a class name for an element.
// the first parameter removes the specified class from an element, and returns false.
// If the class does not exist, it is added to the element, and the return value is true, the second param. is unnecess.
tr.classList.toggle('alert-danger');//here alert-danger is the class that we want to toggle.
updateCounts();
// if(tr.className){
 //   tr.className='';
// }
// else
//tr.className='alert-danger';
// tr.className='alert-danger';
}

function edit(id){
    console.log("Edit Click");

    let object = questionOperations.search(id);
    console.log(object);

    for(let key in object){
        if(key == 'isMarked'){
            continue;
        }
        document.querySelector('#'+key).value = object[key];
    }
    console.log('Edit ended.......');
}

function createDelete(path,id){
    // here v create an img tag .
    var img = document.createElement('img');
    //since img is an existing html tag, therefore it has various attributes in the form of keys accessed using fullstop. 
    img.src =path;
    // The setAttribute() method adds the specified attribute to an element, and gives it the specified value.
// If the specified attribute already exists, only the value is set/changed.
    img.setAttribute('qid',id);
// using classname we can set the classname for img tag.
    img.className='size';
    img.addEventListener('click',toggleMark);
    // img.toggleMark();
    // togglemark(){  this }
    return img;
}

function createEdit(path,id){
    // here v create an img tag .
    var img = document.createElement('img');
    //since img is an existing html tag, therefore it has various attributes in the form of keys accessed using fullstop. 
    img.src =path;
    // The setAttribute() method adds the specified attribute to an element, and gives it the specified value.
// If the specified attribute already exists, only the value is set/changed.
    img.setAttribute('qid',id);
// using classname we can set the classname for img tag.
    img.className='size';
    img.addEventListener('click',function(){
        //the below two functions work in async fashion.
        toggleMark.apply(img);
        edit(id);
    });
    // img.toggleMark();
    // togglemark(){  this }
    return img;
}

function addQuestion(){
    var questionObject = new Question();
    for(let key in questionObject){
        if(key=='isMarked'){
            continue;
        }
        questionObject[key] =document.querySelector('#'+key).value;
    }
    questionOperations.add(questionObject);
    printQuestion(questionObject);
    updateCounts();
    // Call FireBase to Add Question
    let pr= dbOperations.add(questionObject);
    pr.then(data=>{
        document.querySelector('#qresult').innerText = 'Question Added';
    }).catch(err=>{
        document.querySelector('#qresult').innerText = 'Error During Question Add';
        console.log('Error FB ',err);
    })
    console.log('Add Call ',questionObject);
   /*
   var questionObject = new Question();
   var myid =  document.querySelector('#id').value;
    questionObject.id = myid;
   var name =  document.querySelector('#name').value;
   var optionA =  document.querySelector('#optionA').value;*/

}
function updateMarked(){
    // alert("this updates the desired record");
    var questionObject = new Question();
    for(let key in questionObject){
        if(key=='isMarked'){
            continue;
        }
        questionObject[key] =document.querySelector('#'+key).value;
    }   
    questionOperations.update(questionObject);
    
    var tbody = document.querySelector('#questions');
    tbody.innerHTML = "";
    questionOperations.questions.forEach(questionObject=>{
//the below code prints the updated object.
        printQuestion(questionObject);
    });

}
function clearAll(){
    console.log("clear all clicked");
    var tbody=document.querySelector("#questions");
    tbody.innerHTML="";
    updateCounts();
}
function search(){
    var obj;
    console.log("search clicked");
    var searchid=prompt("enter the id you want  to search for:",1);
console.log("search id is: "+searchid);
var arr=questionOperations.questions;
for(let u of arr){
    if(u.id===searchid){
         obj=questionOperations.search(searchid);
        console.log("id is found");
        console.log(obj);
    }
}
var tbody=document.querySelector("#questions");
tbody.innerHTML="";
printQuestion(obj);
updateCounts();
}
 
function sort(){
console.log("sort clicked");
var arr= questionOperations.sort();
printTable(arr);

}