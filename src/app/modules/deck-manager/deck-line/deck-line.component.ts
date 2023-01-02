import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeAdAp } from 'src/app/shared/enums/TypeAdAp.enum';
import { cleanChampionName } from 'src/app/shared/helpers/cleanSource.helper';
import { Champion } from 'src/app/shared/models/champion.model';
import { Item } from 'src/app/shared/models/item.model';
import { Trait } from 'src/app/shared/models/traits.model';
import { ChampionService } from 'src/app/shared/services/champion.service';
import { ItemService } from 'src/app/shared/services/item.service';
import { TraitService } from 'src/app/shared/services/trait.service';
import { Deck } from '../models/deck.models';
import { DeckChampion } from '../models/deckChampion.models';

@Component({
  selector: 'app-deck-line',
  templateUrl: './deck-line.component.html',
  styleUrls: ['./deck-line.component.scss']
})
export class DeckLineComponent implements OnInit {
  Math = Math;
  @Input() deck : Deck;
  @Input() isCreateOrUpdate : boolean;
  @Output() clickChampionDeck = new EventEmitter();

  @Output() clickDeleteDeck = new EventEmitter();
  @Output() clickUpdateDeck = new EventEmitter();
  activeTraits : Trait[];

  constructor(
    private readonly traitService : TraitService,
    private readonly championService : ChampionService,
    private readonly itemService:ItemService
    ) {
  }

  ngOnInit(): void {
      this.championService.getManyByName(this.deck.deckChampions.map(c=>c.name)).subscribe(
        (champions: Champion[]) =>{
          this.deck.champions = champions;
          this.activeTraits = this.deck.champions.flatMap(c=>c.dataTraits);
          this.deck.percentageAD = champions.filter(c=>c.typeAdAp==TypeAdAp.Ad).length *100 / champions.length;
        }
        );
  }

  clickChampionDeckLine(champ : Champion) : void{
    this.clickChampionDeck.emit(champ);
  }

  isCore(champion : Champion):boolean{
    return this.deck?.champions.find(c=>c.name === champion.name)?.isCore??false;
  }

  getDeckChampion(championName : string) : DeckChampion | undefined{
    return this.deck.deckChampions.find(c=>cleanChampionName(c.name) === cleanChampionName(championName));
  }

  getItems(itemsName : string[]) : Observable<Item[]>{
return this.itemService.getManyByName(itemsName);
  }


  clickUpdateDeckLine(deck: Deck) : void {
    this.clickUpdateDeck.emit(deck);
  }

  clickDeleteDeckLine(deck:Deck) : void {
    this.clickDeleteDeck.emit(deck);
  }
}
