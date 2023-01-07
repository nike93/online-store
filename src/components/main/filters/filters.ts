import Component from '../../../components/templates/components';
import CheckFilters from './checkFilters';
import RangeFilters from './rangeFilters';

class Filters extends Component {
  brandFilters: CheckFilters;
  categoryFilters: CheckFilters;
  priceFilters: RangeFilters;
  stockFilters: RangeFilters;

  static TextObject = {
    MainTitle: 'Filters',
  };

  constructor() {
    super('div', 'filters');
    this.brandFilters = new CheckFilters('brand');
    this.categoryFilters = new CheckFilters('category');
    this.priceFilters = new RangeFilters('price');
    this.stockFilters = new RangeFilters('stock');
  }

  render() {
    const title = this.createTitle(Filters.TextObject.MainTitle);
    this.container.append(
      title,
      this.categoryFilters.render(),
      this.brandFilters.render(),
      this.priceFilters.render(),
      this.stockFilters.render()
    );
    return this.container;
  }
}
export default Filters;
