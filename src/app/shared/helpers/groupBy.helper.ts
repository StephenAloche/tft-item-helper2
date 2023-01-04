

export function groupBy<T>(key: string, array: T[]): { key: string, values: T[] }[] {
    return array.reduce((all : { key: string, values: T[] }[], current : any) => {
      const existingKey = all.find(existing => existing.key === current[key]);
      if (!existingKey) {
        all.push({key: current[key], values: [current]});
      } else {
        existingKey.values.push(current);
      }
      return all;
    }, []);
  }
