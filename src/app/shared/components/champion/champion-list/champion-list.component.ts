import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Order } from 'src/app/shared/enums/Order.enum';
import { orderBy } from 'src/app/shared/helpers/orderBy.helper';
import { ChampionService } from 'src/app/shared/services/champion.service';
import { Champion } from '../../../models/champion.model';

@Component({
  selector: 'app-champion-list',
  templateUrl: './champion-list.component.html',
  styleUrls: ['./champion-list.component.scss']
})
export class ChampionListComponent implements OnInit {

  @Input() forceList: boolean = true; //retourne par defaut la liste de tout les champion  
  @Input() champion: Champion = new Champion();
  //@Input() champions : Champion[] = new Array();
  champions$: Observable<Champion[]>
  @Output() selectChampion = new EventEmitter();
  @Input() index!: number;

  //championOrderedList :  [any,Champion[]][];
  championOrderedList :  Map<any,Champion[]>;

  Order = Order;
  currentOrder: Order;
  innerHtmlString: string;

  constructor(private championService: ChampionService) {

  }

  ngOnInit(): void {
    this.champions$ = this.championService.getAll();
  }

  selectChampionChild(champ: Champion): void {
    this.selectChampion.emit(champ);
  }

  firstLetter(name: string | undefined) {
    return name && name.charAt(0);
  }

  orderList(param: Order) {
    this.currentOrder = param;
    const map = new Map<any,Champion[]>();

    switch (param) {
      case Order.Cost:
        this.champions$ = this.champions$.pipe(
          tap((champs : Champion[]) => {
            //orderBy(champs, 'cost');
            orderBy<Champion>(champs, 'cost').forEach(
              (champion: Champion) => {
                this.fillMap(map, champion.cost, champion);
              }
              );
            return champs;
          })
        );
        break;
      case Order.Trait:
        this.champions$ = this.champions$.pipe(
          tap(champs => {
            //orderBy(champs, 'traits');
            orderBy<Champion>(champs, 'traits').forEach(
              (champion: Champion) => {
                this.fillMap(map, champion.traits![0], champion);
              }
              );
            return champs;
          }));
        break;
      default:
      case Order.Name:
        this.champions$ = this.champions$.pipe(
          tap(champs => {
            orderBy(champs, 'name');
            orderBy<Champion>(champs, 'name').forEach(
              (champion: Champion) => {
                this.fillMap(map, champion.name[0], champion);
              }
              );
            return champs;
          }));
        break;
    }
    this.championOrderedList = map;// = [...map];
  }

  fillMap(map : Map<any,Champion[]>,key : any, value : Champion){
    !map.has(key)
      ? map.set(key, [value])
      : map.get(key)!.push(value);
  }

}

export class ChampionOrdered{
  key:any;
  champions : Champion[];
}
