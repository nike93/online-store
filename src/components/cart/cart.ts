import Component from "../templates/components";

class CartPage extends Component {
  static TextObject = {
    MainTitle: "Cart Page",
  };

  constructor() {
    super("div", "cart", "cart-page");
  }

  render() {
    const title = this.createTitle(CartPage.TextObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}

export default CartPage;
