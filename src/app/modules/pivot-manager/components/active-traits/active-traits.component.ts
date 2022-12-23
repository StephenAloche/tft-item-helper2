import { Component, Input, OnInit } from '@angular/core';
import { ignoreElements } from 'rxjs';
import { FormControl } from '@angular/forms';
import { TraitService } from 'src/app/shared/services/trait.service';
import { Trait } from 'src/app/shared/models/traits.model';
import { State } from 'src/app/shared/enums/State.enum';

@Component({
  selector: 'app-active-traits',
  templateUrl: './active-traits.component.html',
  styleUrls: ['./active-traits.component.scss']
})
export class ActiveTraitsComponent implements OnInit {
  
  constructor(private readonly traitService : TraitService) { }
  
  public State = State;
  private _activesTraits: Trait[] |undefined = [];
  get activesTraits(): Trait[]|undefined {
    return this._activesTraits;
  }
  
  @Input('activesTraits')
  set activesTraits(traitsActiv: Trait[]|undefined ) {
    if(traitsActiv)
    {
      this._activesTraits = this.traitService.reorderTraits(traitsActiv);
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