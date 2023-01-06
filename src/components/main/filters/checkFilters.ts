import { productItem } from './../../templates/types';
import data from '../../../data.json';
import App from '../../../app/app';
import FiltrationLogic from './filtrationLogic';

class CheckFilters {
  protected container: HTMLElement;
  items: string[];
  category: keyof productItem;
  constructor(category: keyof productItem) {
    this.container = document.createElement('div');
    this.items = [];
    this.category = category;
  }

  generateUnicItems() {
    return [...new Set(data.prod.map((el) => el[this.category] as string))];
  }

  renderInputs() {
    this.items = this.generateUnicItems();

    const list = document.createElement('div');
    list.classList.add('filters__list');

    this.items.forEach((inputName) => {
      const inputID = `${this.category}%${inputName}`;
      const itemContainer = document.createElement('div');
      itemContainer.classList.add('input__container');

      const input = document.createElement('input');
      input.type = 'checkbox';
      input.value = inputName;
      input.id = inputID;
      input.addEventListener('click', () => this.addRemoveToState(inputID));

      const label = document.createElement('label');
      label.textContent = inputName;
      label.htmlFor = inputID;

      itemContainer.append(input, label);
      list.append(itemContainer);
    });

    return list;
  }

  addRemoveToState(inputID: string) {
    const [key, value] = inputID.split('%');

    this.isCategoryExist(key as keyof productItem);
    const index =
      App.state.filters.checkboxes[key as keyof productItem]?.indexOf(value);
    if ((index && index != -1) || index == 0) {
      App.state.filters.checkboxes[key as keyof productItem]?.splice(index, 1);
      this.isLastItem(key as keyof productItem);
    } else {
      App.state.filters.checkboxes[key as keyof productItem]?.push(value);
    }
    // MainPage.rerender();
    FiltrationLogic.filterDataCheckbox();
  }

  isCategoryExist(category: keyof productItem) {
    if (!App.state.filters.checkboxes[category]) {
      App.state.filters.checkboxes[category] = [];
    }
  }
  isLastItem(category: keyof productItem) {
    if (App.state.filters.checkboxes[category]?.length == 0) {
      delete App.state.filters.checkboxes[category];
    }
  }

  renderBlock() {
    this.container.classList.add('filters__block');
    const title = document.createElement('p');
    title.textContent = this.category.toUpperCase();
    this.container.append(title, this.renderInputs());
  }

  render() {
    this.renderBlock();
    return this.container;
  }
}
export default CheckFilters;
