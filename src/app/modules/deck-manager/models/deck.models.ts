import { Champion } from "src/app/shared/models/champion.model";

export interface Deck{
    name : string;
    champions : Champion[];
    augments : null;
}

export const templateDeck: Deck = {
    name : '',
    champions : [],
    augments : null,
};

export const deckFactory = (deck?: Deck| null): Deck => ({ ...templateDeck, ...deck });
