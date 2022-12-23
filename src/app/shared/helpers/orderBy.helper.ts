
  export function orderBy<Type>(array : any[], orderType: any) : Type[]{
    return array = array.sort((a, b) => {
      if (a[orderType] > b[orderType]) {
        return 1;
      }
      if (a[orderType] < b[orderType]) {
        return -1;
      }
      return 0;
    });
  }    

  export function orderByDescending<Type>(array : any[], orderType: any) : Type[]{
    return array = array.sort((a, b) => {
      if (a[orderType] > b[orderType]) {
        return -1;
      }
      if (a[orderType] < b[orderType]) {
        return 1;
      }
      return 0;
    });
  }    