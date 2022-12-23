import { Component, Input } from '@angular/core';
import { Trait } from 'src/app/shared/models/traits.model';
import { Deck } from '../models/deck.models';

@Component({
  selector: 'app-deck-line',
  templateUrl: './deck-line.component.html',
  styleUrls: ['./deck-line.component.scss']
})
export class DeckLineComponent {
  @Input() deck : Deck;
  activeTraits : Trait[];
}
