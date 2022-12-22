import Page from '../../components/templates/page'

class CartPage extends Page {
  static TextObject = {
    MainTitle: 'Cart Page',
  }

  constructor(id: string) {
    super(id);
  }

  render() {
    const title = this.createHeaderTitle(CartPage.TextObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}

export default CartPage;