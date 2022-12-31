import { Component, Input, OnInit } from '@angular/core';
import { Champion } from 'src/app/shared/models/champion.model';
import { CHAMPION_IMG_URL, ITEM_IMG_URL, ITEM_SPAT_IMG_URL, TRAIT_IMG_URL } from 'src/assets/const-path-img';

@Component({
  selector: 'app-champion-items-list',
  templateUrl: './champion-items-list.component.html',
  styleUrls: ['./champion-items-list.component.scss']
})
export class ChampionItemsListComponent implements OnInit {
  ITEM_IMG_URL = ITEM_IMG_URL;
  ITEM_SPAT_IMG_URL = ITEM_SPAT_IMG_URL;
  CHAMPION_IMG_URL = CHAMPION_IMG_URL;
  TRAIT_IMG_URL = TRAIT_IMG_URL;
  @Input() champion : Champion = new Champion ();

  ngOnInit(): void {
  }  

}
