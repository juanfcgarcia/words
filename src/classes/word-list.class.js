import { Word } from './word.class';

export class WordList {

    constructor() {
        this.loadLocalStorage();
    }

    newWord( word ){
        this.words.push( word );
        this.saveLocalStorage();

    }

    deleteWord( id ){
        this.words = this.words.filter( word => word.id != id);
        this.saveLocalStorage();
    }

    checkLearned( id ){

        for( const word of this.words ){

            if( word.id  == id ){

                word.learned = !word.learned;
                this.saveLocalStorage();
                break;

            }
        }

    }

    deleteAllLearned( ){
        this.words = this.words.filter( word => !word.learned);
        this.saveLocalStorage();
    }

    saveLocalStorage(){

        localStorage.setItem('word', JSON.stringify( this.words ) );

        
    }

    loadLocalStorage(){

        this.words = (localStorage.getItem('word')) 
                     ?  JSON.parse(localStorage.getItem('word')) 
                      : []  ;

        this.words = this.words.map( obj => Word.fromJson ( obj ));              
    }

}