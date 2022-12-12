export class Item {
        id: number = 0;
        name?: string;
        desc?: string;
        effects?: any;
        from?: number[];
        icon?: string;
        unique: boolean = false;
        ratio : number = 0;
        
        recipe : Item[] = new Array();
        recipeItem1? : Item;
        recipeItem2? : Item;
        isGlowing: boolean = false;
        isWrong: boolean = false;
        isEquiped: boolean = false;
    }
