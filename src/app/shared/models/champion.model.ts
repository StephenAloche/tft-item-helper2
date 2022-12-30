
import { Trait } from './traits.model';
import { Item } from './item.model';
import { TypeAdAp } from '../enums/TypeAdAp.enum';
import { Observable } from 'rxjs';

export class Champion {    
    
    ability?: Ability;
    priorItem: boolean = false;
    apiName?: string;
    cost: number=0;
    icon?: string;
    name: string="";
    stats?: Stats;  // !  indique a typescript qu'il y aura une valeur a l'execution (runtime) visible aussi dans le HTML
    traits?: string[];
    
    stars : number = 1;
    id : number = 0;
    recommendedItemsId : number[] = new Array();
    recommandedItems : Item[] = new Array();
    
    equippedItems : Item[] = new Array();
    dataTraits: Trait[] = [];
    synergies : Synergie[] = [];
    typeAdAp : TypeAdAp = TypeAdAp.Ad;    
    isCore : boolean;    
    
    recommandedItemsObs$ : Observable<Item[]>;
}

export class Variable {
    name?: string;
    value?: number[];
}

export class Ability {

    easyDesc?: string="";
    easyDesc$?: Observable<string>;

    desc?: string;
    icon?: string;
    name?: string;
    variables?: Variable[];
}

class Stats {
    armor: number = 0;
    attackSpeed: number = 0;
    critChance: number = 0;
    critMultiplier: number = 0;
    damage: number = 0;
    hp: number = 0;
    initialMana: number = 0;
    magicResist: number = 0;
    mana: number = 0;
    range: number = 0;
    /*
    ne fonctionne pas https://stackoverflow.com/questions/51204290/angular-typescript-class-getter-property-not-working/51205101
    public get dps() : number
    {
        return Math.round(((this.damageDisplay * this.attackSpeed) ??0) *100)/100;
    }
    */
    dps: number = 0;
    damageDisplay: number = 0;
    hpDisplay: number = 0;
    dpsDisplay: number = 0;
}

export class Synergie {
    
    constructor(){};
    
    traitName : string = "";
    champions : Champion[] = [];
}