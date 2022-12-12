import { Component } from '@angular/core';
import { SetService } from './shared/services/set.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'tft-itemManager';
  
  constructor(private setService: SetService) { }
  
  ngOnInit(): void {
    this.setService.LoadSetData();
  }  
}

export const currentSetNum : number = 7;
export const currentpatchNum : string = "12.17";