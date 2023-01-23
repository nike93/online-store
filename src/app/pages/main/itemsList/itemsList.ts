import { ProductItem } from '../../../components/templates/types';
import Component from '../../../components/templates/components';
import ItemMain from './itemMain/itemMain';
import App from '../../../app';

class ItemsList extends Component {
  products: ProductItem[];

  constructor() {
    super('div', 'main__prod-list');
    this.products = App.state.filters.filteredData;
  }
  isEmptyList(): void {
    if (this.products.length == 0)
      this.container.innerHTML = `<div class="main__empty">Products were not found, try to change search settings.</div>`;
  }

  render(): HTMLElement {
    this.isEmptyList();
    this.products.forEach((el) => {
      this.container.append(new ItemMain(el).render());
    });
    return this.container;
  }
}
export default ItemsList;
