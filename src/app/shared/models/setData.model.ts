import { Champion } from "./champion.model";
import { Trait } from "./traits.model";

export class SetData {
    champions?: Champion[];
    name: string="";
    mutator: string="";
    traits?: Trait[];
    number : number = 0;
}
