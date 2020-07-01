import './styles.css';
 
import { Word, WordList } from './classes';
import { createWordHtml } from './js/componentes';


export const wordList = new WordList();

wordList.words.forEach( word => createWordHtml( word ) );
