import { Component, OnInit } from '@angular/core';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import { Champion } from 'src/app/shared/models/champion.model';
import { ChampionService } from 'src/app/shared/services/champion.service';
import { Deck, deckFactory, templateDeck } from '../models/deck.models';

const LOCALSTORAGE_NAME = 'tft-helper-decks'; 3
@Component({
  selector: 'app-deck-manager',
  templateUrl: './deck-manager.component.html',
  styleUrls: ['./deck-manager.component.scss']
})
export class DeckManagerComponent implements OnInit {
  isCreate: boolean;
  isUpdate: boolean;
  decks: Deck[];

  board: Champion[] = [];
  bench: Champion[] = [];

  deckEdit: Deck | undefined;

  constructor(private readonly championService: ChampionService) {
  }

  ngOnInit(): void {
    this.decks = JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME) ?? 'null') ?? [];
    this.decks.forEach(deck => {
      this.championService.getManyByName(deck.championsName).subscribe(
        (champions: Champion[]) =>
          deck.champions = champions
      );
    })
  }

  createDeck() {
    this.isCreate = true;
    this.deckEdit = deckFactory(null);
  }

  updateDeck(deck: Deck) {
    this.isUpdate = true;
    this.deckEdit = deck;
  }

  deleteDeck(deck:Deck) {
    const index = this.decks.indexOf(deck, 0);
    if (index > -1) {
      this.decks.splice(index, 1);
    }
    this.deckEdit = deckFactory(null);
  }

  cancelNewDeck() {
    this.isCreate = this.isUpdate = false;
    this.deckEdit = undefined;
  }

  saveNewDeck() {
    if (this.deckEdit && this.deckEdit.champions.length > 0) {

      if (this.isCreate) {
        this.decks.push(deckFactory(this.deckEdit));
      }

      localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(this.decks, (key, value) => this.replacer(key, value))
      );
      this.isCreate = this.isUpdate = false;
      this.deckEdit = undefined;
    }
    else {
      alert('sauvegarde impossible : pas assez de champion dans ce deck');
    }
  }

  replacer(key:any,value:any){
    if (key === "champions") {
      return undefined;
    }
    return value;
  }

  selectChampion(champion: Champion): void {
    if (!this.isCreateOrUpdate || !this.deckEdit) {
      return;
    }
    this.deckEdit.champions.push(champion);
    this.deckEdit.championsName.push(champion.name);
  }

  removeChampion(champion: Champion): void {
    if (!this.isCreateOrUpdate || !this.deckEdit) {
      return;
    }
    const index = this.deckEdit.champions.indexOf(champion, 0);
    if (index > -1) {
      this.deckEdit.champions.splice(index, 1);
    }
  }
  
  selectChampionBoard(champion: Champion): void {
    if(this.board.length<10){
      this.board.push(champion);
    }
  }
  
  removeChampionBoard(champion: Champion): void {
    const index = this.board.indexOf(champion, 0);
    if (index > -1) {
      this.board.splice(index, 1);
    }
  }

  isCreateOrUpdate(): boolean{
    return this.isCreate || this.isUpdate;
  }


}
