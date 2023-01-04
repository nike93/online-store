import Component from '../../components/templates/components';
import { productItem } from './../templates/types';
import { PagesId } from '../../routing/routing';
//import orderWindow from '../order/order';

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
    this.container.classList.add('wrapper');

    //change photos    
    slide.addEventListener('click', (e) => {
      const photoSrc= (<HTMLElement>e.target).getAttribute('src') as string;
      headPhotoImg.src = photoSrc;
    })

    
    const main = <HTMLElement>document.querySelector('.main');
    const modalWindow = document.createElement('div');
    modalWindow.classList.add('modal');

    const titleModal = document.createElement('h3');
    titleModal.classList.add('modal__title');
    titleModal.innerText = 'Personal details';
    modalWindow.append(titleModal);
    

    const form = document.createElement('form');

    const inputName = document.createElement('input');
    inputName.classList.add('input-name', 'input');
    inputName.placeholder = 'Name';
    inputName.type = 'text';

    const inputPhone = document.createElement('input');
    inputPhone.classList.add('input-phone', 'input');
    inputPhone.placeholder = 'Phone number';
    inputPhone.type = 'text';

    const inputAdress = document.createElement('input');
    inputAdress.classList.add('input-adress', 'input');
    inputAdress.placeholder = 'Delivery adress';

    const inputMail = document.createElement('input');
    inputMail.classList.add('input-mail', 'input');
    inputMail.placeholder = 'E-mail';
    inputMail.type = 'email';



    const creditTitle = document.createElement('h3');
    creditTitle.classList.add('modal__credit');
    creditTitle.innerText = 'Credit card details';
    //modalWindow.append(creditTitle);

    const creditCard = document.createElement('div');
    creditCard.classList.add('credit-card');

    const cardNumber = document.createElement('div');
    cardNumber.classList.add('card-number');

    const cardIcon = document.createElement('img');
    cardIcon.classList.add('card-icon');
    cardIcon.src = 'https://play-lh.googleusercontent.com/baXy546Srucl3vM1yaHr060eBL9_mrk0NH2GGRRCMTrKbekbx2pI77WCaXmNwUqnqQ';

    const numberField = document.createElement('input');
    numberField.classList.add('number-field', 'input');
    numberField.placeholder = 'Card number';
    numberField.type = 'number';

    cardNumber.append(cardIcon, numberField);

    const validBlock = document.createElement('div');
    validBlock.classList.add('valid-block');

    const dateInput = document.createElement('input');
    dateInput.classList.add('date-input', 'input');
    dateInput.placeholder = 'Validaty';

    const cvvInput = document.createElement('input');
    cvvInput.classList.add('cvv-input', 'input');
    cvvInput.placeholder = 'CVV';
    cvvInput.type = 'number';
    validBlock.append(dateInput, cvvInput);

    creditCard.append(cardNumber, validBlock);
    //modalWindow.append(creditCard);

    const confirmBtn = document.createElement('button');
    confirmBtn.classList.add('confirm-button');
    confirmBtn.innerText = 'Confirm';
    confirmBtn.type = 'submit';

    form.append(inputName, inputPhone, inputAdress, inputMail, creditTitle, creditCard, confirmBtn);
    modalWindow.append(form);    

    main.append(modalWindow);

    //validation

    const formInputs = document.querySelectorAll('.input');

    //name
    function checkName (name: string) {
      const array = name.split(' ');
      if (array.length >= 2) {
        const filterArr = array.filter(el => el.length >= 3);
        if (array.length === filterArr.length) {
          return true;
        }
      } else {
        return false;
      }
    }

    //phone
    function checkPhone (phone: string) {
      const PHONE_REGEXP = /^(\+)((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){7,15}\d$/iu;
      return PHONE_REGEXP.test(phone);
    }

    //adress
    function checkAdress (adress: string) {
      const array = adress.split(' ');
      if (array.length >= 3) {
        const filterArr = array.filter(el => el.length >= 5);
        if (array.length === filterArr.length) {
          return true;
        }
      } else {
        return false;
      }
    }

    //mail
    function checkMail (mail: string) {
      const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
      return EMAIL_REGEXP.test((mail).toLowerCase());
    }

    function createErrorText (field: string, container: HTMLElement) {  
      const err = <HTMLElement>document.querySelector('.error-text');    
      if (err) {
        return;
      } else {
        const errorText = document.createElement('span');
        errorText.classList.add('error-text');        
        errorText.innerText = `Enter a correct ${field}`;      
        container.after(errorText);
      }      
    }

    function deleteErrorText () {
      const err = <HTMLElement>document.querySelector('.error-text');
      if (err) {
        err.remove();
      }
    }

    form.onsubmit = function () {
      const nameValue = inputName.value;
      const mailValue = inputMail.value;
      const phoneValue = inputPhone.value;
      const adressValue = inputAdress.value;

      const emptyValue = Array.from(formInputs).filter((input: any) => input.value === '');
      
      formInputs.forEach(function (input: any) {
        if (input.value === '') {
          input.classList.add('error');
        } else {
          input.classList.remove('error');
        }
      })

      if (emptyValue.length !== 0) {
        return false;
      }

      if (!checkName(nameValue)) {
        inputName.classList.add('error');
        createErrorText('name', inputName);
        return false;
      } else {
        inputName.classList.remove('error');
        deleteErrorText();        
      }

      if (!checkPhone(phoneValue)) {
        inputPhone.classList.add('error');
        createErrorText('phone', inputPhone);
        return false;
      } else {
        inputPhone.classList.remove('error');       
        deleteErrorText();        
      }      

      if (!checkAdress(adressValue)) {
        inputAdress.classList.add('error');
        createErrorText('adress', inputAdress);
        return false;
      } else {
        inputAdress.classList.remove('error');
        deleteErrorText();
      }

      if (!checkMail(mailValue)) {
        inputMail.classList.add('error');        
        createErrorText('e-mail', inputMail);
        return false;
      } else {
        inputMail.classList.remove('error');
        deleteErrorText();
      }

      if (numberField.value.length !== 16) {
        numberField.classList.add('error');        
        createErrorText('number', cardNumber);
        return false;
      } else {
        numberField.classList.remove('error');        
        deleteErrorText();
      }

      if (Number(dateInput.value.split('/')[0]) > 12 || dateInput.value.length < 5) {
        dateInput.classList.add('error');       
        createErrorText('date', validBlock);
        return false;
      } else {
        dateInput.classList.remove('error');
        deleteErrorText();
      }

      if (cvvInput.value.length !== 3) {
        cvvInput.classList.add('error');       
        createErrorText('cvv', validBlock);
        return false;
      } else {
        cvvInput.classList.remove('error');
        deleteErrorText();
      }
      
      modalWindow.innerHTML = 'Thank you for the order. Redirect to home page...';

    }    
    
    //cardNUmber

    function checkPaySystem () {
      switch(numberField.value[0]) {
        case '2': cardIcon.src = 'https://photo.virtualbrest.ru/uploads/2022/03/15/c29822b85d1ba85616b98c231c73119c.jpeg';
        break;
        case '3': cardIcon.src = 'https://pbs.twimg.com/profile_images/983285404253196288/rx3n00Ep_400x400.jpg';
        break;
        case '4': cardIcon.src = 'https://infocity.tech/wp-content/uploads/2020/07/Visa-logo.jpg';
        break;
        case '5': cardIcon.src = 'https://models.rsbis.com/storage/makets/preview/resize_600x600/26/42/2642b70ee46621ca320c3a82fc9fdc71.jpeg';
        break;
        default: cardIcon.src = 'https://play-lh.googleusercontent.com/baXy546Srucl3vM1yaHr060eBL9_mrk0NH2GGRRCMTrKbekbx2pI77WCaXmNwUqnqQ';
        break;
      }      
    }

    function checkCardNumber() {
      const maxLength = 16;
      if (numberField.value.length > maxLength) {
        numberField.value = numberField.value.slice(0, maxLength);
      }    
      checkPaySystem();    
    }
    numberField.addEventListener('input', checkCardNumber);

    //cvv
    function checkCVV() {
      const maxLength = 3;
      if (cvvInput.value.length > maxLength) {
        cvvInput.value = cvvInput.value.slice(0, maxLength);
      }      
    }
    cvvInput.addEventListener('input', checkCVV);

    //date
    function dateCheck() {
      const maxLength = 5;
      let cardDate = dateInput.value.replace(/\D/g, '').substring(0,4);
      const matchValue = cardDate.match(/.{1,2}/g);
      if (matchValue) {
        cardDate = matchValue.join('/');
      }       
      dateInput.value = cardDate;
      if (dateInput.value.length > maxLength) {
        dateInput.value = dateInput.value.slice(0, maxLength);
      }
   
    }
    dateInput.addEventListener('input', dateCheck);
    
    btnBuy.addEventListener('click', function() {
      console.log('buy');
      //this.modal;
    })

  }

  render() {
    this.linkNavigation(this.id);
    this.productBlock(this.id);
    return this.container;
  }
}

export default DescriptionPage;
