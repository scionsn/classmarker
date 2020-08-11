const dbOperations = {
    add(questionObject){
        // firebase.database.ref.set is used to save ques.
        //it is stored as a  promise as the task is async.
        let promise = firebase.database().ref("/questions/"+questionObject.id).set(questionObject);
        return promise;
    },
    getQuestionById(id){
                // just firebase.database.ref is used to fetch ques.
                //stream is similar to  promise.
                // The value event is called every time data is changed at the specified database reference, 
                // including changes to children node. 
                // the listener receives a snapshot that contains the data at the specified location- 
                // in the database at the time of the event. You can retrieve the data in the snapshot with the val() method.
        var stream = firebase.database().ref("/questions/"+id);
        stream.on('value',(snapshot)=>{
            let object = snapshot.val();    
            console.log('Object is ',object);
        })
    },
    updateQuestionById(id){
        
    }
}