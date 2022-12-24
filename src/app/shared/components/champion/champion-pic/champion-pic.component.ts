import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { Champion } from 'src/app/shared/models/champion.model';

@Component({
  selector: 'app-champion-pic',
  templateUrl: './champion-pic.component.html',
  styleUrls: ['./champion-pic.component.scss']
})
export class ChampionPicComponent {
  @HostBinding('class') componentClass = 'sc-champion-pic';
  
  @Input() champion : Champion = new Champion ();
  @Output() clickChampionPic = new EventEmitter();

  clickChampion(champ : Champion) : void{  
    this.clickChampionPic.emit(champ);
  }

}
