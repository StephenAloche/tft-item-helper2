import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { currentSetNum } from 'src/app/app.component';
import { Deck, deckFactory } from 'src/app/modules/deck-manager/models/deck.models';

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  constructor(private http: HttpClient) { }

  getFromSite(): Observable<Deck[]> {
    let jsonURL = `assets/dataSets/Set${currentSetNum}/decksData_Set${currentSetNum}.json`;   
    let decks: Deck[] = []; 
    return this.http.get<any[]>(jsonURL).pipe(
      map(
        (listDeckData: any) => {
          listDeckData.forEach((deckData : any) => {            
            let newDeck : Deck = deckFactory(null);
            newDeck.championsName = deckData.championsName;
            newDeck.name = deckData.name;
            decks.push(newDeck);    
          });
          return decks;      
        }
      )
    )
  }
}
