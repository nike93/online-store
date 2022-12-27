import { allProducts } from './../templates/types';
import Component from '../../components/templates/components';
import ItemsList from './itemsList/itemsList';
import Filters from './filters/filters';

class MainPage extends Component {
  data: allProducts;

  constructor(data: allProducts) {
    super('div', 'main__wrapper', 'main-page');
    this.data = data;
  }

  renderViewButtons() {
    const container = document.createElement('div');
    container.classList.add('view-block');
    const grid = document.createElement('div');
    grid.classList.add('view-block__ico', 'grid', 'view-block__ico_active');
    const list = document.createElement('div');
    list.classList.add('view-block__ico', 'list');
    container.append(grid, list);
    return container;
  }

  renderSearchBar() {
    const input = document.createElement('input');
    input.classList.add('main__search');
    input.placeholder = `Search product`;
    return input;
  }

  renderTotalFound() {
    const total = document.createElement('div');
    total.classList.add('main__stat');
    total.textContent = `Found: ${this.data.prod.length}`;
    return total;
  }

  renderSortOptions() {
    const sortBar = document.createElement('div');
    sortBar.classList.add('sort-bar');
    const select = document.createElement('select');
    select.classList.add('sort-bar__select');
    for (let i = 0; i < 5; i++) {
      const option = document.createElement('option');
      option.classList.add('sort-bar__option');
      option.textContent = `Option${i}`;
      select.append(option);
    }
    sortBar.append(select);
    return sortBar;
  }

  renderMainHeader() {
    const header = document.createElement('div');
    header.classList.add('main__header');
    header.append(
      this.renderSortOptions(),
      this.renderTotalFound(),
      this.renderSearchBar(),
      this.renderViewButtons()
    );
    return header;
  }

  renderCatalog() {
    const catalog = document.createElement('div');
    catalog.classList.add('main__catalog');
    catalog.append(
      this.renderMainHeader(),
      new ItemsList(this.data.prod).render()
    );
    return catalog;
  }

  render() {
    this.container.classList.add('wrapper');
    this.container.append(new Filters().render());

    this.container.append(this.renderCatalog());
    return this.container;
  }
}
export default MainPage;
