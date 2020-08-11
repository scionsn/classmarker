class Question{
    constructor(id, name, optionA,optionB, optionC,optionD,rans,score,isMarked){
        this.id = id;
        this.name =name;
        this.optionA = optionA;
        this.optionB = optionB;
        this.optionC = optionC;
        this.optionD = optionD;
        this.rans = rans;
        //rans is right answer
        this.score = score;
        this.isMarked = false;
    }
    toggle(){
        this.isMarked = !this.isMarked;
    }
}