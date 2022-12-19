import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Champion } from 'src/app/shared/models/champion.model';

@Component({
  selector: 'app-champion-tile',
  templateUrl: './champion-tile.component.html',
  styleUrls: ['./champion-tile.component.scss']
})
export class ChampionTileComponent implements OnInit {
  @HostBinding('class') componentClass = 'sc-champion-tile';
  
  @Input() champion : Champion = new Champion ();
  //currentChampionManaWidth = 0;
  router: any;
  constructor() {
   }
  
  ngOnInit(): void {
      //this.currentChampionManaWidth = (this.champion.stats?.initialMana??0) * 100/ (this.champion.stats?.mana??0);
  }
}