import { Component } from '@angular/core';
import { Champion } from 'src/app/shared/models/champion.model';
import { Trait } from 'src/app/shared/models/traits.model';

@Component({
  selector: 'app-deck-line',
  templateUrl: './deck-line.component.html',
  styleUrls: ['./deck-line.component.scss']
})
export class DeckLineComponent {
  deckChampions : Champion[];
  deckTraits : Trait[];
}
