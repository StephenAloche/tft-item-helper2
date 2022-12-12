import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Champion } from '../../models/champion.model';

@Component({
  selector: 'app-champion-list',
  templateUrl: './champion-list.component.html',
  styleUrls: ['./champion-list.component.scss']
})
export class ChampionListComponent  implements OnInit {  
  
  @Input() forceList : boolean = true; //retourne par defaut la liste de tout les champion  
  @Input() champion : Champion = new Champion ();
  @Input() champions : Champion[] = new Array();
  @Output() childEvent = new EventEmitter();
  
  //Interpolation avec liste
  @Input() index!: number;

  ngOnInit(): void {
    if(this.champions.length < 1 && this.forceList){

    }
    //this.champions = this.championService.champions;
  }
  
  selectChampion(champ : Champion) : void{  
    this.childEvent.emit(champ);
  }

  firstLetter(name :string | undefined) {
    return name && name.charAt(0);
  }
}

