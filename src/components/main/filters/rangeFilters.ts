import { productItem } from './../../templates/types';
import * as noUiSlider from 'nouislider';
import App from '../../../app/app';
import MainPage from '../main';
import FiltrationLogic from './filtrationLogic';
import Query from '../../../query/query';

class RangeFilters {
  protected container: HTMLElement;
  category: keyof productItem;
  constructor(category: keyof productItem) {
    this.container = document.createElement('div');
    this.category = category;
  }

  renderInput() {
    const fragment = document.createDocumentFragment();
    const input = document.createElement('div') as noUiSlider.target;
    const sign = this.category == 'price' ? '$' : '';
    const minData = Math.min(...App.data.prod.map((el) => +el[this.category]));
    const maxData = Math.max(...App.data.prod.map((el) => +el[this.category]));
    const stateFilter = App.state.filters.range[this.category];
    const startMax = stateFilter ? stateFilter[0] : minData;
    const startMin = stateFilter ? stateFilter[1] : maxData;
    const initialVal = [startMax, startMin];

    input.classList.add('filters__range');
    input.id = `input-${this.category}`;
    noUiSlider.create(input, {
      start: initialVal,
      step: 1,
      connect: true,
      range: {
        min: minData,
        max: maxData,
      },
    });

    const container = document.createElement('div');
    container.classList.add('filters__range-values');
    const minDom = document.createElement('span');
    const maxDom = document.createElement('span');
    container.append(minDom, maxDom);
    const snapValues = [minDom, maxDom];

    input.noUiSlider?.on('update', function (values, handle) {
      snapValues[handle].innerHTML = String(values[handle] + sign);
      App.state.filters.range[input.id.split('-')[1] as keyof productItem] =
        values as number[];
    });
    input.noUiSlider?.on('change', FiltrationLogic.applyAllFilters);
    input.noUiSlider?.on('change', MainPage.rerender);
    input.noUiSlider?.on('change', () => {
      const value = input.noUiSlider?.get();
      if (typeof value == 'object') {
        const queryValue = value
          .map((el) => String(el).split('.')[0])
          .join('-');
        Query.addToHash(input.id.split('-')[1], queryValue);
        console.log(App.state.filters.range);
      }
    });
    fragment.append(input, container);
    return fragment;
  }

  renderBlock() {
    this.container.classList.add('filters__block');
    const title = document.createElement('p');
    title.textContent = this.category.toUpperCase();
    this.container.append(title, this.renderInput());
  }

  render() {
    this.renderBlock();
    return this.container;
  }
}
export default RangeFilters;
