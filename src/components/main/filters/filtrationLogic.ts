import { productItem } from './../../templates/types';
import App from '../../../app/app';

class FiltrationLogic {
  static filterDataCheckbox(data: productItem[]) {
    let filteredData = data;
    const allBoxFilters = App.state.filters.checkboxes;
    for (const key of Object.keys(allBoxFilters) as Array<keyof productItem>) {
      filteredData = filteredData.filter((el) =>
        allBoxFilters[key]?.includes(el[key] as keyof productItem)
      );
    }

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
    FiltrationLogic.sortData();
    return filteredData;
  }

  // Sorting

  static sortData() {
    const data = App.state.filters.filteredData;
    if (App.state.filters.sorting?.split('-')[0]) {
      const category: string = App.state.filters.sorting?.split('-')[0];
      const way = App.state.filters.sorting?.split('-')[1];

      data.sort(function (a, b) {
        const x = a[category as keyof productItem];
        const y = b[category as keyof productItem];
        if (typeof x == 'number' && typeof y == 'number') {
          return way == 'high' ? x - y : y - x;
        } else if (typeof x == 'string' && typeof y == 'string') {
          const isTrue =
            way == 'high'
              ? x.toLowerCase() > y.toLowerCase()
              : y.toLowerCase() > x.toLowerCase();
          return isTrue ? 1 : -1;
        } else {
          return 1;
        }
      });
    }
  }
}

export default FiltrationLogic;
