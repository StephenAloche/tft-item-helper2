import { Component, Input, OnInit } from '@angular/core';
import { ignoreElements } from 'rxjs';
import { E_State, Trait } from '../../traits/traits';
import { TraitsService } from '../../traits/traits.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-active-traits',
  templateUrl: './active-traits.component.html',
  styleUrls: ['./active-traits.component.css']
})
export class ActiveTraitsComponent implements OnInit {
  
  constructor(private traitService : TraitsService) { }
  
  public e_State = E_State;
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
    //if(this.activesTraits.length<1)
    //this.activesTraits = this.traitService.traitsPerma;
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
            //if(pallier.minUnits<=trait.currentNumber)
            if(trait.currentNumber>=pallier.minUnits)
            {
              trait.currentPallier = pallier.minUnits;
              trait.nextPallier = trait.effects.filter(e=>e.minUnits >= pallier.maxUnits+1)[0]?.maxUnits??1;

              if(pallier.maxUnits==25000)
              {            
                trait.state = E_State.Gold;
              }
              else
              {
                if(pallier == trait.effects[0])
                trait.state = E_State.Bronze;
                
                else if(pallier == trait.effects[1])
                trait.state = E_State.Silver;
                
                else if(pallier == trait.effects[2])
                trait.state = E_State.Gold;
                
                else if(pallier == trait.effects[3])
                trait.state = E_State.Prisma;
                
                else
                trait.state = E_State.Unactive;
              }
            }
          });
        }
        else{
          trait.state = E_State.Unactive;
          trait.nextPallier = trait.effects[0].minUnits;
        }
      });
      
      //on desactive les traits qui s'annule
      //dragon annule brise ecaille
      if(this._activesTraits.some(t=>t.name=="Dragon") && this._activesTraits.some(t=>t.name=="Brise-écaille"))
      {
        this._activesTraits.forEach(t=>{if(t.name=="Brise-écaille") t.state = E_State.Unactive});        
      }
      /*
      //dragon annule lui meme
      if(traitsActiv.filter(t=>t.name=="Dragon").length>1)
      {
        this._activesTraits.forEach(t=>{if(t.name=="Dragon") t.state = E_State.Unactive});        
      }
      */
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