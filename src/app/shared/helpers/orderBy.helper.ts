
  export function orderBy<Type>(array : any[], orderType: any, descending : boolean = false) : Type[]{
    return array = array.sort((a, b) => {
      if (a[orderType] > b[orderType]) {
        return descending ? -1 : 1;
      }
      if (a[orderType] < b[orderType]) {
        return descending ? 1 : -1;
      }
      return 0;
    });
  }

  export function orderByArrayLength<Type>(array : any[], descending : boolean) : Type[]{
    return array = array.sort((a, b) => {
      if (a.length > b.length) {
        return descending ? -1 : 1;
      }
      if (a.length < b.length) {
        return descending ? 1 : -1;
      }
      return 0;
    });
  }
