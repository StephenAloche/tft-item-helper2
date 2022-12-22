import { Component, Input, OnInit } from '@angular/core';
import { ignoreElements } from 'rxjs';
import { FormControl } from '@angular/forms';
import { TraitService } from 'src/app/shared/services/trait.service';
import { Trait } from 'src/app/shared/models/traits.model';
import { State } from 'src/app/shared/enums/State.enum';

@Component({
  selector: 'app-active-traits',
  templateUrl: './active-traits.component.html',
  styleUrls: ['./active-traits.component.css']
})
export class ActiveTraitsComponent implements OnInit {
  
  constructor(private traitService : TraitService) { }
  
  public State = State;
  private _activesTraits: Trait[] |undefined = [];
  get activesTraits(): Trait[]|undefined {
    return this._activesTraits;
  }
  
  @Input('activesTraits')
  set activesTraits(traitsActiv: Trait[]|undefined ) {
    //this._activesTraits = traitsActiv;
    if(traitsActiv)
    {
      this.reorderTraits(traitsActiv)
      console.table(this.activesTraits); // <-- do your logic here!
    }
    else{
      this._activesTraits = undefined;
    }
  }
  
  otherTraits : Trait[] = [];
  traitSelected : Trait = new Trait();
  
  ngOnInit(): void {
  }
  
  reorderTraits(traitsActiv: Trait[]){    
    
    var traitsClean : Trait[] = [];
    
    //on a une liste de tous les traits
    traitsActiv.forEach(trait=>{
      //pour chaque trait on compte combien il y  en a dans la liste
      //on ajout ce count au currentNumber
      trait.currentNumber = traitsActiv.filter(t=>t.name==trait.name).length
    });
    
    //on les regroupe distinctement - ne marche plus parfaitement car concat ou set ne distinct plus 2 trait identique
    this._activesTraits = [...new Set([...traitsActiv])];    
    this._activesTraits = traitsActiv.unique();
    
    if(this._activesTraits[0]!=undefined)
    {
      //pour chacun on teste les palliers (Effect)
      this._activesTraits.forEach(trait=>{
        //pour chaques trait on boucle sur les pallier
        if(trait.currentNumber>=trait.effects[0].minUnits)
        {
          trait.effects.forEach(pallier=>{
            if(trait.currentNumber>=pallier.minUnits)
            {
              trait.currentPallier = pallier.minUnits;
              trait.nextPallier = trait.effects.filter(e=>e.minUnits >= pallier.maxUnits+1)[0]?.maxUnits??1;

              if(pallier.maxUnits==25000)
              {            
                trait.state = State.Gold;
              }
              else
              {
                if(pallier == trait.effects[0])
                trait.state = State.Bronze;
                
                else if(pallier == trait.effects[1])
                trait.state = State.Silver;
                
                else if(pallier == trait.effects[2])
                trait.state = State.Gold;
                
                else if(pallier == trait.effects[3])
                trait.state = State.Prisma;
                
                else
                trait.state = State.Unactive;
              }
            }
          });
        }
        else{
          trait.state = State.Unactive;
          trait.nextPallier = trait.effects[0].minUnits;
        }
      });
      
      //on desactive les traits qui s'annule
      // if(this._activesTraits.some(t=>t.name=="Dragon") && this._activesTraits.some(t=>t.name=="Brise-écaille"))
      // {
      //   this._activesTraits.forEach(t=>{if(t.name=="Brise-écaille") t.state = State.Unactive});        
      // }

      this._activesTraits?.sort((n1,n2) => n2.state - n1.state)
    }
  }
}



declare global {
  interface Array<T> {
    unique():any[];
  }
}

Array.prototype.unique = function() {
  var a = this.concat();
  for(var i=0; i<a.length; ++i) {
    for(var j=i+1; j<a.length; ++j) {
      if(a[i].name === a[j].name)
      a.splice(j--, 1);
    }
  }
  
  return a;
};