import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Champion } from 'src/app/shared/models/champion.model';
import { Trait } from 'src/app/shared/models/traits.model';
import { ChampionService } from 'src/app/shared/services/champion.service';
import { TraitService } from 'src/app/shared/services/trait.service';
import { Deck } from '../models/deck.models';

@Component({
  selector: 'app-deck-line',
  templateUrl: './deck-line.component.html',
  styleUrls: ['./deck-line.component.scss']
})
export class DeckLineComponent implements OnInit {
  @Input() deck : Deck;
  @Input() isCreateOrUpdate : boolean;
  @Output() clickChampionDeckLine = new EventEmitter();
  activeTraits : Trait[];

  constructor(private readonly traitService : TraitService,private readonly championService : ChampionService) {    
  }

  ngOnInit(): void {
      this.championService.getManyByName(this.deck.championsName).subscribe(
        (champions: Champion[]) =>{
          this.deck.champions = champions;
          this.activeTraits = this.traitService.reorderTraits(this.deck.champions.flatMap(c=>c.dataTraits));
        }
      );
  }

  clickChampion(champ : Champion) : void{  
    this.clickChampionDeckLine.emit(champ);
  }

  isCore(champion : Champion):boolean{
    return this.deck?.championsCore?.includes(champion.name);
  }
}
