import { Component, HostBinding, Input } from '@angular/core';
import { Champion } from 'src/app/shared/models/champion.model';

@Component({
  selector: 'app-champion-pic',
  templateUrl: './champion-pic.component.html',
  styleUrls: ['./champion-pic.component.scss']
})
export class ChampionPicComponent {
  @HostBinding('class') componentClass = 'sc-champion-pic';
  
  @Input() champion : Champion = new Champion ();

}
