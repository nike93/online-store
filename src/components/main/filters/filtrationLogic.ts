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
}
export default FiltrationLogic;
