import { Component, Input, OnInit } from '@angular/core';
import { Champion } from 'src/app/shared/models/champion.model';
import { ChampionService } from 'src/app/shared/services/champion.service';

@Component({
  selector: 'app-champion-tooltip',
  templateUrl: './champion-tooltip.component.html',
  styleUrls: ['./champion-tooltip.component.scss']
})
export class ChampionTooltipComponent implements OnInit {
  math = Math;
  currentChampionManaWidth = 0;
  @Input() champion : Champion= new Champion ();
  
constructor(
  private readonly championService : ChampionService
  ) {
    
}

  ngOnInit(): void {

    this.currentChampionManaWidth = (this.champion.stats?.initialMana??0) * 100/ (this.champion.stats?.mana??0);
    this.champion.recommandedItemsObs$ = this.championService.getRecommandedItem(this.champion);
  }
}
