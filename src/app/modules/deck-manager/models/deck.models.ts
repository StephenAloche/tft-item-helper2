import { Champion } from "src/app/shared/models/champion.model";
import { DeckChampion } from "./deckChampion.models";

export interface Deck{
    name : string;
    champions : Champion[];
    championsCore : string[];
    championsName : string[];
    deckChampions : DeckChampion[];
    augments : string[];
    avgPl : string;
    top4 : string;
    link : string;

    percentageAD : number;
}

export const templateDeck: Deck = {
    name : '',
    champions : new Array(),
    deckChampions : new Array(),
    championsCore : new Array(),
    championsName : new Array(),
    augments :  new Array(),
    avgPl : '',
    top4 : '',
    link : '',
    percentageAD : 0
};

export const deckFactory = (deck?: Deck| null): Deck => ({ ...templateDeck, ...deck });
