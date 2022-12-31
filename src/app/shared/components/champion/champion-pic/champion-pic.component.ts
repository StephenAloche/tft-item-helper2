import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { Champion } from 'src/app/shared/models/champion.model';
import { CHAMPION_IMG_URL } from 'src/assets/const-path-img';

@Component({
  selector: 'app-champion-pic',
  templateUrl: './champion-pic.component.html',
  styleUrls: ['./champion-pic.component.scss']
})
export class ChampionPicComponent {
  CHAMPION_IMG_URL = CHAMPION_IMG_URL;
  @HostBinding('class') componentClass = 'sc-champion-pic';
  
  @Input() champion : Champion = new Champion ();
  @Output() clickChampionPic = new EventEmitter();

  clickChampion(champ : Champion) : void{  
    this.clickChampionPic.emit(champ);
  }

}
