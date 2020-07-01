
export class Word{

    static fromJson( {id, word, learned, created } ){

        const tempWord = new Word( word );

        tempWord.id = id;
        tempWord.learned = learned;
        tempWord.created = created;

        return tempWord;
    }


    constructor( word ){

        this.word = word;

        this.id = new Date().getTime(); 
        this.learned = false;
        this.created = new Date();

    }


}