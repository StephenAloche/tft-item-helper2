import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core'
import { HexCase } from '../../models/HexCase.models';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  encapsulation: ViewEncapsulation.None // attention le style .css devient global
})
export class BoardComponent implements OnInit {  
  @Output() 
  onDragEvent = new EventEmitter();
  @Output() 
  onDropEvent = new EventEmitter();
  @Output() 
  allowDropEvent = new EventEmitter();
  @Input() 
  @Input() board : HexCase[][] = [];

  constructor() { }
  
  ngOnInit(): void {
  }
  
  onDrag(ev:any) : void{  
    this.onDragEvent.emit(ev);
  }
  
  onDrop(ev:any) : void{  
    this.onDropEvent.emit(ev);
  }

  allowDrop(ev:any) : void{  
    this.allowDropEvent.emit(ev);
  }
}
