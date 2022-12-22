import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Champion } from 'src/app/shared/models/champion.model';

@Component({
  selector: 'app-champion-hexagone',
  templateUrl: './champion-hexagone.component.html',
  styleUrls: ['./champion-hexagone.component.css']
})
export class ChampionHexagoneComponent implements OnInit {
  @Input() champion : Champion | undefined;
  
  constructor() { }

  ngOnInit(): void {
  }

  
}
