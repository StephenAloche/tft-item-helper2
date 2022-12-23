import { Component, OnInit } from '@angular/core';
import { Champion } from 'src/app/shared/models/champion.model';
import { Deck, deckFactory, templateDeck } from '../models/deck.models';

const LOCALSTORAGE_NAME = 'tft-helper-decks';3
@Component({
  selector: 'app-deck-manager',
  templateUrl: './deck-manager.component.html',
  styleUrls: ['./deck-manager.component.scss']
})
export class DeckManagerComponent implements OnInit{
  creationOrUpdate : boolean;
  decks : Deck[];
  newDeck : Deck| undefined;

  ngOnInit(): void {
    this.decks = JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME)??'null')??[];
  }

  createDeck(){
    this.creationOrUpdate = true;
    this.newDeck = deckFactory(null);
  }

  cancelNewDeck(){
    this.creationOrUpdate = false;
    this.newDeck = undefined;
  }

  saveNewDeck(){
    if(this.newDeck && this.newDeck.champions.length > 0)
    {
      this.decks.push(deckFactory(this.newDeck));
      localStorage.setItem(LOCALSTORAGE_NAME,JSON.stringify(this.decks));
      this.creationOrUpdate = false;
      this.newDeck = undefined;
    }
    else{
      alert('sauvegarde impossible : pas assez de champion dans ce deck');
    }
  }

  
  selectChampion(champion: Champion): void {
    if(!this.creationOrUpdate || !this.newDeck)
    {
      return;
    }
    this.newDeck.champions.push(champion);
  }

  removeChampion(champion: Champion): void {
    if(!this.creationOrUpdate || !this.newDeck)
    {
      return;
    }
    const index = this.newDeck.champions.indexOf(champion, 0);
            if (index > -1) {
              this.newDeck.champions.splice(index, 1);
            }
  }


}
