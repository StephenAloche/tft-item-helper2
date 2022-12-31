import { Component, Input, OnInit } from '@angular/core';
import { ignoreElements } from 'rxjs';
import { FormControl } from '@angular/forms';
import { TraitService } from 'src/app/shared/services/trait.service';
import { Trait } from 'src/app/shared/models/traits.model';
import { State } from 'src/app/shared/enums/State.enum';
import { Champion } from 'src/app/shared/models/champion.model';
import { ChampionService } from 'src/app/shared/services/champion.service';
import { CHAMPION_IMG_URL, ITEM_IMG_URL, ITEM_SPAT_IMG_URL, TRAIT_IMG_URL } from 'src/assets/const-path-img';

const BLOCK_MAX_WIDTH = 82;

@Component({
  selector: 'app-active-traits',
  templateUrl: './active-traits.component.html',
  styleUrls: ['./active-traits.component.scss']
})
export class ActiveTraitsComponent implements OnInit {
  ITEM_IMG_URL = ITEM_IMG_URL;
  ITEM_SPAT_IMG_URL = ITEM_SPAT_IMG_URL;
  CHAMPION_IMG_URL = CHAMPION_IMG_URL;
  TRAIT_IMG_URL = TRAIT_IMG_URL;
  
  constructor(private readonly traitService : TraitService, public readonly championService : ChampionService) { }
  
  public State = State;
  private _activesTraits: Trait[] |undefined = [];
  get activesTraits(): Trait[]|undefined {
    return this._activesTraits;
  }
  
  @Input() displayPalliers : boolean = true;
  @Input() showUnactive : boolean = true;
  @Input() blockMaxWidth : number = BLOCK_MAX_WIDTH;
  champions : Champion[];
  
  @Input('activesTraits')
  set activesTraits(traitsActiv: Trait[]|undefined ) {
    if(traitsActiv)
    {
      this._activesTraits = this.traitService.reorderTraits(traitsActiv,this.showUnactive);
    }
    else{
      this._activesTraits = undefined;
    }
  }
  
  otherTraits : Trait[] = [];
  traitSelected : Trait = new Trait();
  
  ngOnInit(): void {
  }
}