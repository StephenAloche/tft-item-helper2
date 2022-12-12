import { Component, OnInit } from '@angular/core';
import { ChampionService } from 'src/app/shared/services/champion.service';

@Component({
  selector: 'app-champion-manager',
  templateUrl: './champion-manager.component.html',
  styleUrls: ['./champion-manager.component.scss']
})
export class ChampionManagerComponent implements OnInit {
  constructor(
    private championService : ChampionService
  ){  }

  ngOnInit(): void {
  let o = this.championService.getAll();
  }
}
