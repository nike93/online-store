import Component from '../../components/templates/components';
import { productItem } from './../templates/types';
import { PagesId } from '../../routing/routing';
import orderWindow from '../order/order';
import App from '../../app/app';
import CartPage from '../cart/cart';

class DescriptionPage extends Component {
  protected products: productItem[];
  id: number;

  constructor(products: productItem[], id: number) {
    super('div', 'description', 'description-page');
    this.products = products;
    this.id = id;
  }

  linkNavigation(id: number) {
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

  productBlock(id: number) {
    id = id - 1;
    const productContainer = document.createElement('div');
    productContainer.classList.add('product-block');
    //photo
    const photoContainer = document.createElement('div');
    photoContainer.classList.add('photo-container');

    //head photo
    const headPhoto = document.createElement('div');
    headPhoto.classList.add('head-photo');
    const headPhotoImg = document.createElement('img');
    headPhotoImg.src = this.products[id]['thumbnail'];
    headPhoto.append(headPhotoImg);
    //small photo
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

    //description
    const descriptionContainer = document.createElement('div');
    descriptionContainer.classList.add('description-container');

    const descriptionContainerFrame = document.createElement('div');
    descriptionContainerFrame.classList.add('description-frame');

    //block with name and category
    const headNameBlock = document.createElement('div');

    //name Product
    const nameProduct = document.createElement('h2');
    nameProduct.classList.add('description__name');
    nameProduct.innerText = this.products[id]['title'];
    headNameBlock.append(nameProduct);

    //category and brand container
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');

    //category
    const category = document.createElement('p');
    category.innerHTML = `Category: ${this.products[id]['category']}`;

    //brand
    const brand = document.createElement('p');
    brand.innerHTML = `Brand: ${this.products[id]['brand']}`;
    categoryContainer.append(category, brand);
    headNameBlock.append(categoryContainer);
    descriptionContainerFrame.append(headNameBlock);

    //info block
    const infoBlock = document.createElement('div');
    infoBlock.classList.add('info-block');
    //description
    const productDescription = document.createElement('p');
    productDescription.classList.add('product-description');
    productDescription.innerText = `Description: ${this.products[id]['description']}`;

    //discount
    const discount = document.createElement('p');
    discount.innerText = `Discount Percentage: ${this.products[id]['discountPercentage']}`;

    //rating
    const rating = document.createElement('p');
    rating.innerText = `Rating: ${this.products[id]['rating']}`;

    //stock
    const stock = document.createElement('p');
    stock.innerText = `Stock: ${this.products[id]['stock']}`;
    infoBlock.append(productDescription, discount, rating, stock);
    descriptionContainerFrame.append(infoBlock);

    //block with price
    const priceBlock = document.createElement('div');

    //price
    const price = document.createElement('p');
    price.classList.add('price');
    price.innerText = `€${this.products[id]['price']}`;

    //buttons
    const btnContainer = document.createElement('div');
    btnContainer.classList.add('btn-container');

    const isInCart: number = App.state.cart.items.filter(
      (el) => el.prod.id == this.products[id].id
    ).length;
    //buy now
    const btnBuy = document.createElement('button');
    btnBuy.classList.add('button', 'buy-btn');
    btnBuy.innerText = 'Buy now';
    //add to cart
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

    //change photos
    slide.addEventListener('click', (e) => {
      const element = <HTMLElement>e.target;
      if (element.classList.contains('slide__img')) {
        const photoSrc = element.getAttribute('src') as string;
        headPhotoImg.src = photoSrc;
      }
    });

    btnBuy.addEventListener('click', () => {
      const checkCart: number = App.state.cart.items.filter(
        (el) => el.prod.id == this.products[id].id
      ).length;
      if (checkCart === 0) {
        CartPage.addItemtoCart(this.products[id]);
        App.header.reloadHeader();
      }      
      window.location.hash = `#${PagesId.CartPage}`;
      const order = new orderWindow();
      order.openWindow();
    });

    addCart.addEventListener('click', () => {
      const isInCart: number = App.state.cart.items.filter(
        (el) => el.prod.id == this.products[id].id
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

  render() {
    this.linkNavigation(this.id);
    this.productBlock(this.id);
    return this.container;
  }
}

export default DescriptionPage;
