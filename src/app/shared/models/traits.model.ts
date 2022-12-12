import { State } from "../enums/State.enum";
import { Item } from "./item.model";

export class Effect {
    maxUnits: number = 0;
    minUnits: number = 0;
    style: number = 0;
    variables?: any;
}

export class Trait {
    apiName: string = "";
    desc: string = "";
    effects: Effect[] = [];
    icon: string = "";
    name: string = "";
    
    currentNumber : number = 1;
    currentPallier : number = 1;
    nextPallier : number = 1;
    
    champions : any;
    palliers : number[] = [];
    state : State = State.Unactive;
    isSpat:boolean = false;
    
    itemsReco : Item[] = [];
}
