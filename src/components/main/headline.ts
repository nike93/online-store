import App from '../../app/app';
import Component from '../templates/components';
import FiltrationLogic from './filters/filtrationLogic';
import MainPage from './main';

class HeadLine extends Component {
  constructor() {
    super('div', 'main__header');
  }

  renderSortOptions() {
    const sortBar = document.createElement('div');
    sortBar.classList.add('sort-bar');
    const select = document.createElement('select');
    select.classList.add('sort-bar__select');
    select.addEventListener('change', () => {
      App.state.filters.sorting = select.value;
      FiltrationLogic.sortData();

      MainPage.rerender();
    });

    const titleOption = document.createElement('option');
    titleOption.textContent = 'Sort options:';
    titleOption.classList.add('sort-bar__option', 'sort-bar__option_disabled');
    titleOption.disabled = true;
    titleOption.selected = true;
    select.append(titleOption);

    const optionTypes = [
      ['Sort by name A - Z', 'title-high'],
      ['Sort by name Z - A', 'title-low'],
      ['Sort by price $ -> $$$', 'price-high'],
      ['Sort by price $$$ -> $', 'price-low'],
    ];
    for (const el of optionTypes) {
      const option = document.createElement('option');
      option.classList.add('sort-bar__option');
      option.textContent = `${el[0]}`;
      option.value = `${el[1]}`;
      if (App.state.filters.sorting == el[1]) {
        option.selected = true;
      }
      select.append(option);
    }
    sortBar.append(select);
    return sortBar;
  }

  renderTotalFound() {
    const total = document.createElement('div');
    total.classList.add('main__stat');
    total.textContent = `Found: ${App.state.filters.filteredData.length}`;
    return total;
  }

  renderSearchBar() {
    const input = document.createElement('input');
    input.classList.add('main__search');
    input.placeholder = `Search product`;
    if (App.state.filters.search) {
      input.value = App.state.filters.search;
    }

    input.addEventListener('input', () => {
      App.state.filters.search = input.value;
      FiltrationLogic.applyAllFilters();
      MainPage.rerender();
    });
    return input;
  }

  renderViewButtons() {
    const container = document.createElement('div');
    container.addEventListener('click', (e) => {
      const id = (e.target as HTMLElement).id;
      if (id === App.state.view) {
        return;
      } else {
        App.state.view = id;
        MainPage.rerender();
        grid.classList.toggle('view-block__ico_active');
        list.classList.toggle('view-block__ico_active');
      }
    });
    container.classList.add('view-block');
    const grid = document.createElement('div');
    grid.id = 'grid';
    grid.classList.add('view-block__ico', 'grid-ico');
    const list = document.createElement('div');
    list.id = 'list';
    list.classList.add('view-block__ico', 'list-ico');
    App.state.view === 'grid'
      ? grid.classList.add('view-block__ico_active')
      : list.classList.add('view-block__ico_active');
    container.append(grid, list);
    return container;
  }

  render() {
    this.container.append(
      this.renderSortOptions(),
      this.renderTotalFound(),
      this.renderSearchBar(),
      this.renderViewButtons()
    );
    return this.container;
  }
}
export default HeadLine;
