import { Word } from '../classes';
import { wordList } from '../index';

//Reference to html
const divWordList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const btnDelete     = document.querySelector('.clear-completed');
const ulFilters     = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filters');


export const createWordHtml = ( _word ) =>{

    const htmlWord = `

    <li class="${ (_word.learned) ? 'completed' : '' }" data-id="${ _word.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (_word.learned) ? 'checked' : '' }>
            <label>${ _word.word}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`   

    const div  = document.createElement('div');
    div.innerHTML = htmlWord;

    divWordList.append( div.firstElementChild );

    return div.firstElementChild;
}

//Events
txtInput.addEventListener('keyup', ( event ) => {

    if(event.keyCode === 13 &&  txtInput.value.length > 0){

        console.log(txtInput.value);
        const newWord = new Word( txtInput.value );
        wordList.newWord( newWord );


        createWordHtml( newWord );
        txtInput.value = '';

    }

});

divWordList.addEventListener('click', ( event ) =>{

    console.log('click');
    const nameElement = event.target.localName;
    const wordElement  = event.target.parentElement.parentElement;
    const wordId      = wordElement.getAttribute('data-id');

    console.log(wordId);

    if( nameElement.includes('input') ){ //click in check

        wordList.checkLearned( wordId);
        wordElement.classList.toggle('completed');

    }else if( nameElement.includes('button')){//Detele word
        wordList.deleteWord( wordId);
        divWordList.removeChild( wordElement );

    }

    console.log(wordList);
});

btnDelete.addEventListener('click', () =>{

    wordList.deleteAllLearned();

    for( let i = divWordList.children.length-1; i>= 0; i--){

        const element = divWordList.children[i];

        if( element.classList.contains('completed')){
            divWordList.removeChild(element);
        }

    }

});


ulFilters.addEventListener('click', (event) => {
     
    const filtro = event.target.text;
    if ( !filtro ){ return; }

    anchorFiltros.forEach( elem => elem.classList.remove('selected') );
    event.target.classList.add('selected');

    console.log( event.target );
   
    
    for( const element of divWordList.children ){

        element.classList.remove('hidden');
        const learned = element.classList.contains('completed');

        switch( filtro ){

            case 'Pendientes':
                if( learned ){
                    element.classList.add('hidden');
                }
            break;
            
            case 'Completados':
                if( !learned ){
                    element.classList.add('hidden');
                }
            break;


        }

    }

});