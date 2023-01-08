import { productItem } from './../../templates/types';
import App from '../../../app/app';

class FiltrationLogic {
  static filterDataCheckbox(data: productItem[]) {
    let filteredData = data;
    const allBoxFilters = App.state.filters.checkboxes;
    for (const key of Object.keys(allBoxFilters) as Array<keyof productItem>) {
      // console.log(allBoxFilters[key]);
      filteredData = filteredData.filter((el) =>
        allBoxFilters[key]?.includes(el[key] as keyof productItem)
      );
    }
    // console.log(filteredData);

    return filteredData;
  }

  static filterDataRange(data: productItem[]) {
    let filteredData = data;
    const allBoxFilters = App.state.filters.range;
    for (const key of Object.keys(allBoxFilters) as Array<keyof productItem>) {
      const filter = allBoxFilters[key];
      if (filter) {
        filteredData = filteredData.filter(
          (el) =>
            (el[key] as number) >= filter[0] && (el[key] as number) <= filter[1]
        );
      }
    }
    return filteredData;
  }
  static searchProduct(data: productItem[]) {
    const str = App.state.filters.search?.toLowerCase();
    let filteredData = data;
    if (str) {
      filteredData = filteredData.filter((el) => {
        for (const key of Object.keys(el)) {
          const value = el[key as keyof productItem];
          if (key == 'images' || key == 'thumbnail' || key == 'id') {
            continue;
          } else if (
            (typeof value == 'string' && value.toLowerCase().includes(str)) ||
            (typeof value == 'number' &&
              String(value).toLowerCase().includes(str))
          ) {
            return true;
          }
        }
      });
    }
    return filteredData;
  }

  static applyAllFilters() {
    let filteredData = FiltrationLogic.filterDataCheckbox(App.data.prod);
    filteredData = FiltrationLogic.filterDataRange(filteredData);
    filteredData = FiltrationLogic.searchProduct(filteredData);
    App.state.filters.filteredData = filteredData;
    // console.log(App.state.filters.filteredData, App.data.prod);
    return filteredData;
  }

  // function that change in state values for range. Then we use this val when render input ranges
  static setRangeValuesFromCheckBox() {
    const allBoxFilters = App.state.filters.range;
    for (const key of Object.keys(allBoxFilters) as Array<keyof productItem>) {
      allBoxFilters[key] = [
        Math.min(...App.state.filters.filteredData.map((el) => +el[key])),
        Math.max(...App.state.filters.filteredData.map((el) => +el[key])),
      ];
    }
  }

  // Sorting

  static sortData() {
    const data = App.state.filters.filteredData;
    if (App.state.filters.sorting?.split('-')[0]) {
      const category: string = App.state.filters.sorting?.split('-')[0];
      const way = App.state.filters.sorting?.split('-')[1];

      console.log(App.state.filters.sorting);

      data.sort(function (a, b) {
        const x = a[category as keyof productItem];
        const y = b[category as keyof productItem];
        if (typeof x == 'number' && typeof y == 'number') {
          console.log('pr');
          return way == 'high' ? x - y : y - x;
        } else if (typeof x == 'string' && typeof y == 'string') {
          console.log('str');
          const isTrue = way == 'high' ? x > y : y > x;
          return isTrue ? 1 : -1;
        } else {
          return 1;
        }
      });
    }
  }
}

export default FiltrationLogic;
