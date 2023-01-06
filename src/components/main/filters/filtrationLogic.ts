import { productItem } from './../../templates/types';
import App from '../../../app/app';

class FiltrationLogic {
  // static filterDataCheckbox(data: productItem[]) {
  //   const allBoxFilters = App.state.filters.checkboxes;
  //   const result: productItem[] = [];
  //   allBoxFilters.forEach((el) => {
  //     const [key, value] = el.split('-');

  //     data.forEach((item) => {
  //       if (item[key as keyof productItem] == value) {
  //         result.push(item);
  //       }
  //     });
  //   });

  //   return result.length > 0 ? result : data;
  // }
  static filterDataCheckbox() {
    let filteredData = App.data.prod;
    const allBoxFilters = App.state.filters.checkboxes;
    for (const key of Object.keys(allBoxFilters) as Array<keyof productItem>) {
      console.log(key);
      filteredData = filteredData.filter((el) => {
        allBoxFilters[key]?.indexOf(el[key]);
      });
    }
    console.log(allBoxFilters);

    return filteredData;
  }
}
export default FiltrationLogic;
