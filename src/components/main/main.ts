import Component from '../../components/templates/components';
import ItemsList from './itemsList/itemsList';
import Filters from './filters/filters';
import App from '../../app/app';

class MainPage extends Component {
  static items: HTMLElement;
  static filters: HTMLElement;

  constructor() {
    super('div', 'main__wrapper', 'main-page');

    MainPage.items = new ItemsList().render();
    MainPage.filters = new Filters().render();
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
  // TODO! replace
  static rerender() {
    MainPage.items.innerHTML = '';
    MainPage.items.append(new ItemsList().render());
  }
  //

  renderSearchBar() {
    const input = document.createElement('input');
    input.classList.add('main__search');
    input.placeholder = `Search product`;
    return input;
  }

  renderTotalFound() {
    const total = document.createElement('div');
    total.classList.add('main__stat');
    total.textContent = `Found: ${App.data.prod.length}`;
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
    catalog.append(this.renderMainHeader(), MainPage.items);
    return catalog;
  }

  render() {
    this.container.classList.add('wrapper');
    this.container.append(MainPage.filters);

    this.container.append(this.renderCatalog());
    return this.container;
  }
}
export default MainPage;
