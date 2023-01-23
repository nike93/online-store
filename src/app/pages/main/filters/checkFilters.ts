import { ProductItem } from '../../../components/templates/types';
import data from '../../../../data/data.json';
import App from '../../../app';
import MainPage from '../main';
import FiltrationLogic from './filtrationLogic';
import Query from '../../../query/query';

class CheckFilters {
  protected container: HTMLElement;
  items: string[];
  category: keyof ProductItem;
  constructor(category: keyof ProductItem) {
    this.container = document.createElement('div');
    this.items = [];
    this.category = category;
  }

  generateUnicItems(): string[] {
    return [...new Set(data.prod.map((el) => el[this.category] as string))];
  }

  renderInputs(): HTMLElement {
    this.items = this.generateUnicItems();

    const list = document.createElement('div');
    list.classList.add('filters__list');

    this.items.forEach((inputName) => {
      const inputID = `${this.category}%${inputName}`;
      const itemContainer = document.createElement('div');
      itemContainer.classList.add('input__container');

      const input = document.createElement('input');
      input.type = 'checkbox';
      if (this.isInputChecked(inputName)) {
        input.checked = true;
      }

      input.value = inputName;
      input.id = inputID;
      input.addEventListener('click', () => this.addRemoveToState(inputID));

      const label = document.createElement('label');
      label.textContent = inputName;
      label.htmlFor = inputID;

      const span = document.createElement('span');
      const numberSortMatches = this.numberMatches(
        App.state.filters.filteredData,
        inputName,
      );
      const numberAllMatches = this.numberMatches(App.data.prod, inputName);
      span.innerText = `${numberSortMatches} / ${numberAllMatches}`;

      itemContainer.style.opacity = `${numberSortMatches === 0 ? 0.7 : 1}`;

      itemContainer.append(input, label, span);
      list.append(itemContainer);
    });

    return list;
  }

  isInputChecked(inputName: string): boolean | undefined {
    return App.state.filters.checkboxes[this.category]?.includes(inputName);
  }

  addRemoveToState(inputID: string): void {
    const [key, value] = inputID.split('%');

    this.isCategoryExist(key as keyof ProductItem);
    const index =
      App.state.filters.checkboxes[key as keyof ProductItem]?.indexOf(value);
    if ((index && index != -1) || index == 0) {
      App.state.filters.checkboxes[key as keyof ProductItem]?.splice(index, 1);
      this.isLastItem(key as keyof ProductItem);
    } else {
      App.state.filters.checkboxes[key as keyof ProductItem]?.push(value);
    }
    FiltrationLogic.applyAllFilters();
    App.state.filters.isChangedByRange = false;
    Query.addCheckBoxesToHash();

    MainPage.rerender();
  }

  isCategoryExist(category: keyof ProductItem): void {
    if (!App.state.filters.checkboxes[category]) {
      App.state.filters.checkboxes[category] = [];
    }
  }
  isLastItem(category: keyof ProductItem): void {
    if (App.state.filters.checkboxes[category]?.length == 0) {
      delete App.state.filters.checkboxes[category];
    }
  }

  numberMatches(data: ProductItem[], value: string): number {
    return data.filter((el) => Object.values(el).includes(value)).length;
  }

  renderBlock(): void {
    this.container.classList.add('filters__block');
    const title = document.createElement('p');
    title.textContent = this.category.toUpperCase();
    this.container.append(title, this.renderInputs());
  }

  render(): HTMLElement {
    this.renderBlock();
    return this.container;
  }
}
export default CheckFilters;
