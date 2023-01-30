import Component from '../../components/templates/components';
import ItemsList from './itemsList/itemsList';
import Filters from './filters/filters';
import ViewBar from './viewBar';

class MainPage extends Component {
  static items: HTMLElement;
  static filters: HTMLElement;
  static headline: HTMLElement;

  constructor() {
    super('div', 'main__wrapper');

    MainPage.items = new ItemsList().render();
    MainPage.filters = new Filters().render();
    MainPage.headline = new ViewBar().render();
  }

  static rerender(): void {
    MainPage.items.innerHTML = '';
    MainPage.filters.innerHTML = '';
    MainPage.headline.innerHTML = '';
    MainPage.items.append(...new ItemsList().render().childNodes);
    MainPage.filters.append(...new Filters().render().childNodes);
    MainPage.headline.append(...new ViewBar().render().childNodes);
  }

  static rerenderForSearch(): void {
    MainPage.items.innerHTML = '';
    MainPage.filters.innerHTML = '';
    MainPage.items.append(...new ItemsList().render().childNodes);
    MainPage.filters.append(...new Filters().render().childNodes);
    ViewBar.uploadTotalQty();
  }

  renderCatalog(): HTMLElement {
    const catalog = document.createElement('div');
    catalog.classList.add('main__catalog');
    catalog.append(MainPage.headline, MainPage.items);
    return catalog;
  }

  render(): HTMLElement {
    this.container.classList.add('wrapper');
    this.container.append(MainPage.filters);

    this.container.append(this.renderCatalog());
    return this.container;
  }
}
export default MainPage;
