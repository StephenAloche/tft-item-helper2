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
  
  destroy$ = new Subject();
  SETDATAURL : string = "https://raw.communitydragon.org/latest/cdragon/tft/en_us.json"
  TRAITURL : string = "https://raw.communitydragon.org/latest/game/assets/ux/traiticons/"
  TRAITSUFFIXE : string = "trait_icon_"//exemple trait_icon_6_hero.png
  setData : SetData[];
  
  setDataFiltered : SetData;
  dataTraits: Trait[];
  dataChampions: Champion[];
  
  
  constructor(
    private http: HttpClient
    ) { }
    
    ngOnDestroy() {
      this.destroy$.next(undefined);
      this.destroy$.complete();
    }
    
    LoadSetData() : void{
      if(!this.setDataFiltered)
      {
        this.http.get<string>(`${this.SETDATAURL}?${new Date().getTime()}`)
        .pipe(takeUntil(this.destroy$))
        .subscribe((response : any)=> {
          this.setData = response.setData;
          
          this.setDataFiltered = this.setData.filter(set=>set.number==currentSetNum && set.mutator.includes("Stage2"))[0];        
        }
        )
        /*
        var request = new XMLHttpRequest();
        //request.open('GET', this.SETDATAURL, false);
        request.open('GET', this.SETDATAURL+'?'+ new Date().getTime(), false);  // sans cache 
        request.send(null);
        const response2 = JSON.parse(request.responseText);
        
        this.setData = response2.setData;
        */
        
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
      
      /*
      dataChampions?.forEach(champ => {
        this.LoadDataTraits(champ)   ;
      });
      
      if(dataChampions)
      {
        this.championService.LoadChampions(dataChampions)
      }
      */
    }
    /*
    LoadDataTraits(champ : Champion):void{
      champ.dataTraits = [];
      
      champ.traits?.forEach(trait => {
        if (this.dataTraits) {
          var traitSelect = this.dataTraits?.filter(t=>t.name == trait)[0]
          traitSelect = this.traitsService.LoadTraitDesc(traitSelect);
          champ.dataTraits?.push(traitSelect);          
        }
      });   
    }
    */
  }
  