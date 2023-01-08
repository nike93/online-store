import Component from '../../../components/templates/components';
import CheckFilters from './checkFilters';
import RangeFilters from './rangeFilters';
import resetButtons from './resetButtons';

class Filters extends Component {
  brandFilters: CheckFilters;
  categoryFilters: CheckFilters;
  priceFilters: RangeFilters;
  stockFilters: RangeFilters;
  totalReset: resetButtons;

  static TextObject = {
    MainTitle: 'Filters',
  };

  constructor() {
    super('div', 'filters');
    this.brandFilters = new CheckFilters('brand');
    this.categoryFilters = new CheckFilters('category');
    this.priceFilters = new RangeFilters('price');
    this.stockFilters = new RangeFilters('stock');
    this.totalReset = new resetButtons();
  }

  render() {
    const title = this.createTitle(Filters.TextObject.MainTitle);
    this.container.append(
      title,
      this.totalReset.render(),
      this.categoryFilters.render(),
      this.brandFilters.render(),
      this.priceFilters.render(),
      this.stockFilters.render()
    );
    return this.container;
  }
}
export default Filters;
