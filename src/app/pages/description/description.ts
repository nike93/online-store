import Component from '../../components/templates/components';
import { ProductItem } from '../../components/templates/types';
import { PagesId } from '../../routing/routing';
import OrderWindow from '../../components/order/order';
import App from '../../app';
import CartPage from '../cart/cart';

class DescriptionPage extends Component {
  protected products: ProductItem[];
  id: number;

  constructor(products: ProductItem[], id: number) {
    super('div', 'description', 'description-page');
    this.products = products;
    this.id = id;
  }

  linkNavigation(id: number): void {
    id = id - 1;
    const navContainer = document.createElement('div');
    navContainer.classList.add('navigation');
    const mainLink = document.createElement('span');
    mainLink.classList.add('navigation__main');
    mainLink.innerText = 'Store';
    const pathToProduct = document.createElement('span');
    pathToProduct.innerText = `  /  ${this.products[id]['category']}  /  ${this.products[id]['brand']}  /  ${this.products[id]['title']}`;
    navContainer.append(mainLink, pathToProduct);
    this.container.append(navContainer);

    mainLink.addEventListener('click', () => {
      window.location.hash = `#${PagesId.MainPage}`;
    });
  }

  productBlock(id: number): void {
    id = id - 1;
    const productContainer = document.createElement('div');
    productContainer.classList.add('product-block');
    
    const photoContainer = document.createElement('div');
    photoContainer.classList.add('photo-container');

    const headPhoto = document.createElement('div');
    headPhoto.classList.add('head-photo');
    const headPhotoImg = document.createElement('img');
    headPhotoImg.src = this.products[id]['thumbnail'];
    headPhoto.append(headPhotoImg);

    const slide = document.createElement('div');
    slide.classList.add('slide');

    this.products[id]['images'].forEach((el) => {
      const slideImg = document.createElement('img');
      slideImg.classList.add('slide__img');
      slideImg.src = el;
      slideImg.id = `img-${this.products[id]['id']}`;
      slideImg.alt = 'Product';
      slide.append(slideImg);
    });

    photoContainer.append(headPhoto, slide);

    productContainer.append(photoContainer);

    const descriptionContainer = document.createElement('div');
    descriptionContainer.classList.add('description-container');

    const descriptionContainerFrame = document.createElement('div');
    descriptionContainerFrame.classList.add('description-frame');

    const headNameBlock = document.createElement('div');

    const nameProduct = document.createElement('h2');
    nameProduct.classList.add('description__name');
    nameProduct.innerText = this.products[id]['title'];
    headNameBlock.append(nameProduct);

    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');

    const category = document.createElement('p');
    category.innerHTML = `Category: ${this.products[id]['category']}`;

    const brand = document.createElement('p');
    brand.innerHTML = `Brand: ${this.products[id]['brand']}`;
    categoryContainer.append(category, brand);
    headNameBlock.append(categoryContainer);
    descriptionContainerFrame.append(headNameBlock);

    const infoBlock = document.createElement('div');
    infoBlock.classList.add('info-block');

    const productDescription = document.createElement('p');
    productDescription.classList.add('product-description');
    productDescription.innerText = `Description: ${this.products[id]['description']}`;

    const discount = document.createElement('p');
    discount.innerText = `Discount Percentage: ${this.products[id]['discountPercentage']}`;

    const rating = document.createElement('p');
    rating.innerText = `Rating: ${this.products[id]['rating']}`;

    const stock = document.createElement('p');
    stock.innerText = `Stock: ${this.products[id]['stock']}`;
    infoBlock.append(productDescription, discount, rating, stock);
    descriptionContainerFrame.append(infoBlock);

    const priceBlock = document.createElement('div');

    const price = document.createElement('p');
    price.classList.add('price');
    price.innerText = `€${this.products[id]['price']}`;

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('btn-container');

    const isInCart: number = App.state.cart.items.filter(
      (el) => el.prod.id == this.products[id].id,
    ).length;

    const btnBuy = document.createElement('button');
    btnBuy.classList.add('button', 'buy-btn');
    btnBuy.innerText = 'Buy now';

    const addCart = document.createElement('button');
    addCart.classList.add('button', 'cart-btn');

    if (isInCart > 0) {
      addCart.innerText = 'Drop from cart';
      addCart.classList.add('active');
    } else {
      addCart.innerText = 'Add to cart';
      addCart.classList.remove('active');
    }

    btnContainer.append(btnBuy, addCart);
    priceBlock.append(price, btnContainer);
    descriptionContainerFrame.append(priceBlock);

    descriptionContainer.append(descriptionContainerFrame);

    productContainer.append(descriptionContainer);
    this.container.append(productContainer);
    this.container.classList.add('wrapper');

    slide.addEventListener('click', (e) => {
      const element = <HTMLElement>e.target;
      if (element.classList.contains('slide__img')) {
        const photoSrc = element.getAttribute('src') as string;
        headPhotoImg.src = photoSrc;
      }
    });

    btnBuy.addEventListener('click', () => {
      const checkCart: number = App.state.cart.items.filter(
        (el) => el.prod.id == this.products[id].id,
      ).length;
      if (checkCart === 0) {
        CartPage.addItemtoCart(this.products[id]);
        App.header.reloadHeader();
      }
      window.location.hash = `#${PagesId.CartPage}`;
      const order = new OrderWindow();
      order.openWindow();
    });

    addCart.addEventListener('click', () => {
      const isInCart: number = App.state.cart.items.filter(
        (el) => el.prod.id == this.products[id].id,
      ).length;
      if (isInCart > 0) {
        addCart.textContent = 'Add to cart';
        addCart.classList.remove('active');
        CartPage.removeItemFromCart(this.products[id]);
        App.header.reloadHeader();
      } else {
        addCart.textContent = 'Drop from cart';
        addCart.classList.add('active');
        CartPage.addItemtoCart(this.products[id]);
        App.header.reloadHeader();
      }
    });
  }

  render(): HTMLElement {
    this.linkNavigation(this.id);
    this.productBlock(this.id);
    return this.container;
  }
}

export default DescriptionPage;
