import { Observable } from "rxjs";
import { Champion } from "src/app/shared/models/champion.model";

export interface Deck{
    name : string;
    champions : Champion[];
    championsCore : string[];
    championsName : string[];
    augments : null;
}

export const templateDeck: Deck = {
    name : '',
    champions : new Array(),
    championsCore : new Array(),
    championsName : new Array(),
    augments : null,
};

export const deckFactory = (deck?: Deck| null): Deck => ({ ...templateDeck, ...deck });
