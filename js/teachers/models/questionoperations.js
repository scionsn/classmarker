var questionOperations = {
    questions : [],
    add(question){
        this.questions.push(question);
    },
    delete(){
       return  this.questions =  this.questions.filter(qobj=>qobj.isMarked==false);
    },
    countMark(){
        return this.questions.filter(qobj=>qobj.isMarked).length;
        //The filter() method creates an array filled with all array elements that pass a test,its arguments require a callback function. 
    },
    toggleMark(id){
    //     let questionObject = this.search(id);
    //    questionObject.toggle();
   this.search(id).toggle();
       
    },
    search(id){
       return this.questions.find(questionObject=>questionObject.id==id);
    //    find() is an inbuilt function  which gets value of the first element in array that satisfies  provided condition.it  uses callback func.
    },
    update(questionObject){
        let index = this.questions.findIndex((element)=>element.id = questionObject.id);

        for(let key in questionObject){
            this.questions[index][key] = questionObject[key];
        }
        console.log('Questions array ',this.questions);
    },
    sort(){
return this.questions.sort((a,b)=>a.id-b.id);
    }
};
