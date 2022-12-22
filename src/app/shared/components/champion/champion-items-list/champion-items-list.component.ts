import { Component, Input, OnInit } from '@angular/core';
import { Champion } from 'src/app/shared/models/champion.model';

@Component({
  selector: 'app-champion-items-list',
  templateUrl: './champion-items-list.component.html',
  styleUrls: ['./champion-items-list.component.scss']
})
export class ChampionItemsListComponent implements OnInit {
  @Input() champion : Champion = new Champion ();

  ngOnInit(): void {
  }  

}
