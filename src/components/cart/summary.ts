import Component from '../templates/components';
import App from '../../app/app';

class Summary extends Component {
  constructor() {
    super('div', 'summary');
  }

  renderStatic() {
    return `
  <p class="summary__title"></p>
  <div class="summary__products">
    <span class="subtitle">Products</span><span class="number">${App.state.cart.items.reduce(
      (a, b) => a + b.qty,
      0
    )}</span>
  </div>
  <div class="summary__total">
    <span class="subtitle">Total</span><span class="number">$${App.state.cart.items.reduce(
      (a, b) => a + b.prod.price * b.qty,
      0
    )}</span>
  </div>`;
  }
  render() {
    this.container.innerHTML = this.renderStatic();
    return this.container;
  }
}

export default Summary;
