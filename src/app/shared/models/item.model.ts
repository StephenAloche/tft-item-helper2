export interface Item {
    id: number;
    name?: string;
    cleanName?: string;
    desc?: string;
    effects?: any;
    from?: number[];
    icon?: string;
    unique: boolean;
    ratio: number;

    recipe: Item[];
    recipeItem1?: Item;
    recipeItem2?: Item;
    isGlowing: boolean;
    isWrong: boolean;
    isEquiped: boolean;
}

const templateItem: Item = {
    id: 0,
    name: '',
    desc: '',
    effects: null,
    from: new Array(),
    icon: '',
    unique: false,
    ratio: 0,

    recipe: new Array(),
    recipeItem1: undefined,
    recipeItem2: undefined,
    isGlowing: false,
    isWrong: false,
    isEquiped: false,
};

export const newItem = (
    item?: Item
): Item => ({ ...templateItem, ...item });
