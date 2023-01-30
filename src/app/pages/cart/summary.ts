import Component from '../../components/templates/components';
import App from '../../app';
import coupons from './../../../data/coupons.json';
import { Coupon } from '../../components/templates/types';
import OrderWindow from '../../components/order/order';

class Summary extends Component {
  appliedCodes: HTMLElement;
  promoContainer: HTMLElement;
  regularPrice: HTMLElement;
  salePrice: HTMLElement;
  constructor() {
    super('div', 'summary');
    this.appliedCodes = document.createElement('div');
    this.promoContainer = document.createElement('div');
    this.regularPrice = document.createElement('div');
    this.salePrice = document.createElement('div');
  }

  renderTitle(): HTMLElement {
    const title = document.createElement('p');
    title.classList.add('summary__title');
    title.textContent = 'Summary';
    return title;
  }
  renderProducts(): HTMLElement {
    const prod = document.createElement('div');
    prod.classList.add('summary__products');
    const subtitle = document.createElement('span');
    subtitle.textContent = 'Products: ';
    const number = document.createElement('span');
    number.textContent = `${App.state.cart.items.reduce((a, b) => a + b.qty, 0)}`;
    prod.append(subtitle, number);
    return prod;
  }
  renderTotal(): HTMLElement {
    this.regularPrice.classList.add('summary__total');
    const subtitle = document.createElement('span');
    subtitle.textContent = 'Total: ';
    const number = document.createElement('span');
    number.textContent = `$${App.state.cart.items.reduce(
      (a, b) => a + b.prod.price * b.qty,
      0,
    )}`;
    this.regularPrice.append(subtitle, number);
    return this.regularPrice;
  }
  renderPromoSuggestion(input: string): void {
    const code = coupons.find((el) => el.name == input);
    if (code) {
      this.promoContainer.textContent = code?.description;
      const button = document.createElement('button');
      button.textContent = 'Add';
      this.promoContainer.append(button);
      button.addEventListener('click', () => this.addCoupon(code));
    }
  }

  addCoupon(code: Coupon): void {
    if (this.isApplied(code)) {
      return;
    }
    App.state.appliedCuppons.push(code);
    this.renderAppliedCodes();
    this.renderSalePrice();
  }

  dropCoupon(code: Coupon): void {
    const index = App.state.appliedCuppons.indexOf(code);
    App.state.appliedCuppons.splice(index, 1);
    if (App.state.appliedCuppons.length == 0) {
      this.appliedCodes.innerHTML = '';
      this.appliedCodes.classList.remove('codes');
      this.salePrice.innerHTML = '';
      this.regularPrice.classList.remove('underlined');
      return;
    }
    this.renderAppliedCodes();
    this.renderSalePrice();
  }

  renderInput(): HTMLInputElement {
    this.promoContainer.classList.add('summary__suggest-code');
    const input = document.createElement('input');
    input.classList.add('summary__input');
    input.value = App.state.cart.promoString;
    input.placeholder = 'Enter promo code';
    input.addEventListener('input', this.checkPromo.bind(this));
    return input;
  }

  renderAppliedCodes(): void {
    if (App.state.appliedCuppons.length > 0) {
      this.appliedCodes.innerHTML = '';
      this.appliedCodes.classList.add('codes', 'codes_hide');
      const title = document.createElement('p');
      title.textContent = 'Applied codes';
      this.appliedCodes.append(title);
    }
    for (const code of App.state.appliedCuppons) {
      const container = document.createElement('div');
      container.classList.add('codes__item');
      const name = document.createElement('span');
      name.textContent = code.description;
      const dropBTN = document.createElement('button');
      dropBTN.textContent = 'drop';
      dropBTN.addEventListener('click', () => this.dropCoupon(code));
      container.append(name, dropBTN);
      this.appliedCodes.append(container);
    }
  }

  isApplied(item: Coupon): number | boolean {
    return App.state.appliedCuppons.indexOf(item) != -1;
  }
  isAnyAppliedCoupons(): boolean {
    return App.state.appliedCuppons.length > 0;
  }
  renderSalePrice(): void {
    if (this.isAnyAppliedCoupons()) {
      this.regularPrice.classList.add('underlined');
      this.salePrice.innerHTML = '';
      this.salePrice.classList.add('summary__total');
      const subtitle = document.createElement('span');
      subtitle.textContent = 'Total: ';
      const number = document.createElement('span');
      number.textContent = `$${Math.round(
        App.state.cart.items.reduce((a, b) => a + b.prod.price * b.qty, 0) *
          (1 - this.countTotalDiscount()),
      )}`;
      this.salePrice.append(subtitle, number);
    }
  }

  checkPromo(e: Event): void {
    const value = (e.currentTarget as HTMLInputElement).value.toLowerCase();
    App.state.cart.promoString = value;
    if (coupons.find((el) => el.name == value)) {
      this.renderPromoSuggestion(value);
    } else {
      this.promoContainer.innerHTML = '';
    }
  }

  countTotalDiscount(): number {
    const totalDiscount =
      App.state.appliedCuppons.reduce((a, b) => a + b.percentage, 0) / 100;
    return totalDiscount;
  }

  renderNB(): HTMLElement {
    const nb = document.createElement('span');
    nb.textContent = '*Promo for test: "rs", "ny"';
    return nb;
  }

  renderBuyButton(): HTMLButtonElement {
    const btn = document.createElement('button');
    btn.classList.add('button', 'summary__button');
    btn.textContent = 'BUY NOW';
    btn.addEventListener('click', () => {
      const order = new OrderWindow();
      order.openWindow();
    });
    return btn;
  }
  render(): HTMLElement {
    this.renderAppliedCodes();
    this.renderSalePrice();
    this.container.append(
      this.renderTitle(),
      this.renderProducts(),
      this.renderTotal(),
      this.salePrice,
      this.appliedCodes,
      this.renderInput(),
      this.promoContainer,
      this.renderBuyButton(),
    );
    this.container.insertAdjacentElement('beforeend', this.renderNB());
    return this.container;
  }
}

export default Summary;
