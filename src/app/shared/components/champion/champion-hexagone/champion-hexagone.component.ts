import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Champion } from 'src/app/shared/models/champion.model';
import { CHAMPION_IMG_URL, ITEM_IMG_URL, TRAIT_IMG_URL } from 'src/app/app.component';

@Component({
  selector: 'app-champion-hexagone',
  templateUrl: './champion-hexagone.component.html',
  styleUrls: ['./champion-hexagone.component.scss']
})
export class ChampionHexagoneComponent implements OnInit {
  ITEM_IMG_URL = ITEM_IMG_URL;
  CHAMPION_IMG_URL = CHAMPION_IMG_URL;
  TRAIT_IMG_URL = TRAIT_IMG_URL;

  @Input() champion : Champion | undefined;
  
  constructor() { }

  ngOnInit(): void {
  }

  
}
