import { productItem } from './../../templates/types';
import * as noUiSlider from 'nouislider';

class RangeFilters {
  protected container: HTMLElement;
  category: keyof productItem;
  constructor(category: keyof productItem) {
    this.container = document.createElement('div');
    this.category = category;
  }

  renderInput() {
    const fragment = document.createDocumentFragment();
    const input = document.createElement('div');
    input.classList.add('filters__range');
    noUiSlider.create(input, {
      start: [20, 80],
      connect: true,
      range: {
        min: 0,
        max: 100,
      },
    });

    const container = document.createElement('div');
    container.classList.add('filters__range-values');
    const minDom = document.createElement('span');
    const maxDom = document.createElement('span');
    container.append(minDom, maxDom);
    const snapValues = [minDom, maxDom];

    (input as noUiSlider.target).noUiSlider?.on(
      'update',
      function (values, handle) {
        snapValues[handle].innerHTML = String(values[handle]);
      }
    );
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
