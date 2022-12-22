//import './page.sass'

abstract class Page {
  protected container: HTMLElement;
  static TextObject = {};

  constructor(id: string) {
    this.container = document.createElement('div');
    this.container.id = id;
  }

  protected createHeader() {
    const header = document.createElement('header');
    header.classList.add('header');

    const headerTitle = document.createElement('h1');
    headerTitle.innerText = 'ONLINE-Store';
    headerTitle.classList.add('header-title');
    header.append(headerTitle);

    const totalPrice = document.createElement('div');
    totalPrice.classList.add('total-price');
    totalPrice.innerText = '$5.2'
    header.append(totalPrice);

    const cart = document.createElement('div');
    cart.classList.add('cart');
    cart.innerText = "Cart";
    header.append(cart);

    this.container.append(header);
    return header;
  }

  protected createHeaderTitle(text: string) {
    const pageTitle = document.createElement('p');
    pageTitle.innerText = text;
    return pageTitle;
  }

  render() {
    return this.container;
  }
}

export default Page;