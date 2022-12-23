import Component from "../../components/templates/components";
import { PagesId } from "../../routing/routing";

const Buttons = [
  {
    id: PagesId.MainPage,
    text: "Main Page",
  },
  {
    id: PagesId.DescriptionPage,
    text: "Item Description Page",
  },
  {
    id: PagesId.CartPage,
    text: "Cart Page",
  },
];

class Header extends Component {
  // protected container: HTMLElement;
  static TextObject = {};

  constructor() {
    super("div", "header__wrapper", "header");
  }
  // temporarry buttons
  renderPageButtons() {
    const pageButtons = document.createElement("div");
    pageButtons.classList.add("header__buttons");
    Buttons.forEach((button) => {
      const buttonHTML = document.createElement("a");
      buttonHTML.href = `#${button.id}`;
      buttonHTML.innerText = button.text;
      pageButtons.append(buttonHTML);
    });
    this.container.append(pageButtons);
  }

  protected createHeader() {
    const header = this.container;

    const headerTitle = document.createElement("h1");
    headerTitle.innerText = "ONLINE-Store";
    headerTitle.classList.add("header__title");
    header.append(headerTitle);

    const totalPrice = document.createElement("div");
    totalPrice.classList.add("total-price");
    totalPrice.innerText = "$5.2";
    header.append(totalPrice);

    this.renderPageButtons();

    const cart = document.createElement("div");
    cart.classList.add("cart");
    cart.innerText = "Cart";
    header.append(cart);

    this.container = header;
  }

  render() {
    this.createHeader();

    return this.container;
  }
}

export default Header;
