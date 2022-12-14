import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Champion } from '../models/champion.model';
import { SetData } from '../models/setData.model';
import { cleanSetVariable } from '../helpers/cleanSource.helper';
import { Trait } from '../models/traits.model';
import { currentSetNum } from 'src/app/app.component';

const httpOptions = {
  _headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  }),
  get headers() {
    return this._headers;
  },
  set headers(value) {
    this._headers = value;
  },
};

@Injectable({
  providedIn: 'root'
})
export class SetService {
  
private readonly unsubscribe$ = new Subject();
  SETDATAURL : string = "https://raw.communitydragon.org/latest/cdragon/tft/en_us.json"
  TRAITURL : string = "https://raw.communitydragon.org/latest/game/assets/ux/traiticons/"
  TRAITSUFFIXE : string = "trait_icon_"//exemple trait_icon_6_hero.png
  setData : SetData[];
  
  setDataFiltered : SetData;
  setDataFiltered$ : Observable<string>;
  dataTraits: Trait[];
  dataChampions: Champion[];
  
  
  constructor(
    private http: HttpClient
    ) { }

    ngOnDestroy() {
      this.unsubscribe$.next(undefined);
      this.unsubscribe$.complete();
    }
    
    LoadSetData() : void{
      if(!this.setDataFiltered)
      {
        this.http.get<string>(`${this.SETDATAURL}?${new Date().getTime()}`)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((response : any)=> {
          this.setData = response.setData;
          
          //TODO : faire les verif de demi-set (stage2) :  && set.mutator.includes("Stage2")
          this.setDataFiltered = this.setData.filter(set=>set.number==currentSetNum)[0];        
        }
        )        
        var listJsonRecoItem = [];        
      }
    }
    
    getTraits() : Trait[]{
      if(!this.setDataFiltered){
        this.LoadSetData();
      }
      
      if(!this.dataTraits){        
        this.dataTraits = cleanSetVariable<Trait>(this.setDataFiltered.traits!);
        if(this.dataTraits)
        {
          this.dataTraits.forEach(trait => {
            trait.icon = trait.icon.replace(".tex",".png");
          });
        }    
      }      
      return this.dataTraits;
    }
    
    getChampions() : Champion[]{
      if(!this.setDataFiltered){
        this.LoadSetData();
      }
      //filtre des objets considéré comme des champion = coffre de mercrenaire ou tome ou invocations mechaniques
      if(!this.dataChampions){
        this.dataChampions = this.setDataFiltered.champions?.filter(c=>c.traits?.length??0>0)?? [];
      }

      return this.dataChampions;
    }    
  }
  