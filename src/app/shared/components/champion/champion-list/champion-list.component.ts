import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ChampionService } from 'src/app/shared/services/champion.service';
import { Champion } from '../../../models/champion.model';

@Component({
  selector: 'app-champion-list',
  templateUrl: './champion-list.component.html',
  styleUrls: ['./champion-list.component.scss']
})
export class ChampionListComponent  implements OnInit {  
  
  @Input() forceList : boolean = true; //retourne par defaut la liste de tout les champion  
  @Input() champion : Champion = new Champion ();
  //@Input() champions : Champion[] = new Array();
champions$ : Observable<Champion[]>
  @Output() selectChampion = new EventEmitter();
  @Input() index!: number;

  constructor(private championService : ChampionService) {

  }

  ngOnInit(): void {    
    this.champions$ = this.championService.getAll();
  }
  
  selectChampionChild(champ : Champion) : void{  
    this.selectChampion.emit(champ);
  }

  firstLetter(name :string | undefined) {
    return name && name.charAt(0);
  }
}

