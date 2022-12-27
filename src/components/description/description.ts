import Component from "../../components/templates/components";

class DescriptionPage extends Component {
  constructor() {
    super("div", "description", "description-page");
  }

  linkNavigation() {
    const navContainer = document.createElement('div');
    navContainer.classList.add('navigation');
    navContainer.innerText = 'Path to Product / ... / ...';
    this.container.append(navContainer);
  }

  productBlock() {
    const productContainer = document.createElement('div');
    productContainer.classList.add('product-block');
    //photo
    const photoContainer = document.createElement('div');
    photoContainer.classList.add('photo-container');

    //head photo
    const headPhoto = document.createElement('div');
    headPhoto.classList.add('head-photo');
    const headPhotoImg = document.createElement('img');
    headPhotoImg.src = 'https://i.dummyjson.com/data/products/2/thumbnail.jpg';
    headPhoto.append(headPhotoImg);
    //small photo
    const slide = document.createElement('div');
    slide.classList.add('slide');
    const slideImg1 = document.createElement('img');
    slideImg1.src = 'https://i.dummyjson.com/data/products/2/2.jpg';
    
    const slideImg2 = document.createElement('img');
    slideImg2.src = 'https://i.dummyjson.com/data/products/2/3.jpg';

    const slideImg3 = document.createElement('img');
    slideImg3.src = 'https://i.dummyjson.com/data/products/2/1.jpg';

    slide.append(slideImg1, slideImg2, slideImg3);
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
    nameProduct.innerText = 'Name of Product';
    headNameBlock.append(nameProduct);

    //category and brand container
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');

    //category
    const category = document.createElement('p');
    category.innerHTML = 'Category: smartphones';

    //brand
    const brand = document.createElement('p');
    brand.innerHTML = 'Brand: Apple';
    categoryContainer.append(category, brand);
    headNameBlock.append(categoryContainer)
    descriptionContainerFrame.append(headNameBlock);

    //info block
    const infoBlock = document.createElement('div');
    infoBlock.classList.add('info-block');
    //description
    const productDescription = document.createElement('p');
    productDescription.classList.add('product-description');
    productDescription.innerText = 'Description: Samsung is new variant which goes beyond Galaxy to the Universe';

    //discount
    const discount = document.createElement('p');
    discount.innerText = 'Discount Percentage: 13.1';

    //rating
    const rating = document.createElement('p');
    rating.innerText = 'Rating: 13';

    //stock
    const stock = document.createElement('p');
    stock.innerText = 'Stock: 88';
    infoBlock.append(productDescription, discount, rating, stock);
    descriptionContainerFrame.append(infoBlock);

    //block with price
    const priceBlock = document.createElement('div');
    
    //price
    const price = document.createElement('p');
    price.classList.add('price');
    price.innerText = '€899.00';

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
    this.linkNavigation();
    this.productBlock();
    return this.container;
  }
}

export default DescriptionPage;
