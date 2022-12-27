import Component from "../../components/templates/components";
import { productItem } from './../templates/types';

class DescriptionPage extends Component {
  protected products: productItem[];

  constructor(products: productItem[]) {
    super("div", "description", "description-page");
    this.products = products;
  }

  linkNavigation(id: number) {
    id = id - 1;
    const navContainer = document.createElement('div');
    navContainer.classList.add('navigation');
    navContainer.innerText = `Store  /  ${this.products[id]['category']}  /  ${this.products[id]['brand']}  /  ${this.products[id]['title']}`;
    this.container.append(navContainer);
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

    this.products[id]['images'].forEach(el => {
      const slideImg = document.createElement('img');
      slideImg.src = el;
      slideImg.alt = 'Product';
      slide.append(slideImg);
    })
    
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
    headNameBlock.append(categoryContainer)
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

    //buy now
    const btnBuy = document.createElement('button');
    btnBuy.classList.add('button', 'buy-btn');
    btnBuy.innerText = 'Buy now';
    //add to cart
    const addCart = document.createElement('button');
    addCart.classList.add('button', 'cart-btn');
    addCart.innerText = 'Add to Cart';
    btnContainer.append(btnBuy, addCart);
    priceBlock.append(price, btnContainer);
    descriptionContainerFrame.append(priceBlock);    
    
    descriptionContainer.append(descriptionContainerFrame);
    
    productContainer.append(descriptionContainer);
    this.container.append(productContainer);
  }

  render() {
    this.linkNavigation(22);
    this.productBlock(22);
    return this.container;
  }
}

export default DescriptionPage;
