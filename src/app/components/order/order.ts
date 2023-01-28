import { PagesId } from '../../routing/routing';
import App from '../../app';
import { cardIconPlug, cardIconMir, cardIconAmEx, carIconVisa, cardIconMasterCard } from '../../../data/constants';

class OrderWindow {
  private container: HTMLElement;
  private modalWindow: HTMLElement;
  private modalBack: HTMLElement;
  private cardNumber: HTMLElement;
  private validBlock: HTMLElement;
  private form: HTMLFormElement;
  private inputName: HTMLInputElement;
  private inputPhone: HTMLInputElement;
  private inputMail: HTMLInputElement;
  private inputAdress: HTMLInputElement;
  private numberField: HTMLInputElement;
  private dateInput: HTMLInputElement;
  private secretCodeInput: HTMLInputElement;
  private cardIcon: HTMLImageElement;

  constructor() {
    this.container = <HTMLElement>document.querySelector('.main');
    this.form = document.createElement('form');
    this.modalWindow = document.createElement('div');
    this.modalBack = document.createElement('div');
    this.cardNumber = document.createElement('div');
    this.validBlock = document.createElement('div');
    this.inputName = document.createElement('input');
    this.inputPhone = document.createElement('input');
    this.inputMail = document.createElement('input');
    this.inputAdress = document.createElement('input');
    this.numberField = document.createElement('input');
    this.dateInput = document.createElement('input');
    this.secretCodeInput = document.createElement('input');
    this.cardIcon = document.createElement('img');
  }

  setAttributeInput(element: HTMLInputElement, className: [string, string], placeholderInput: string, typeInput: string): void {
    className.forEach(name => element.classList.add(name));
    element.placeholder = placeholderInput;
    element.type = typeInput;
  }

  openWindow(): void {
    App.state.cart.promoString = '';
    this.modalWindow.classList.add('modal');

    const titleModal = document.createElement('h3');
    titleModal.classList.add('modal__title');
    titleModal.innerText = 'Personal details';
    this.modalWindow.append(titleModal);

    this.setAttributeInput(this.inputName, ['input-name', 'input'], 'Name', 'text');
    this.setAttributeInput(this.inputPhone, ['input-phone', 'input'], 'Phone number', 'text');
    this.setAttributeInput(this.inputAdress, ['input-adress', 'input'], 'Delivery adress', 'text');
    this.setAttributeInput(this.inputMail, ['input-mail', 'input'], 'E-mail', 'email');

    const creditTitle = document.createElement('h3');
    creditTitle.classList.add('modal__credit');
    creditTitle.innerText = 'Credit card details';

    const creditCard = document.createElement('div');
    creditCard.classList.add('credit-card');

    this.cardNumber.classList.add('card-number');

    this.cardIcon.classList.add('card-icon');
    this.cardIcon.src = cardIconPlug;      

    this.setAttributeInput(this.numberField, ['number-field', 'input'], 'Card number', 'text');

    this.cardNumber.append(this.cardIcon, this.numberField);

    this.validBlock.classList.add('valid-block');

    this.setAttributeInput(this.dateInput, ['date-input', 'input'], 'Validaty', 'text');

    this.setAttributeInput(this.secretCodeInput, ['cvv-input', 'input'], 'CVV', 'text');

    this.validBlock.append(this.dateInput, this.secretCodeInput);

    creditCard.append(this.cardNumber, this.validBlock);

    const confirmBtn = document.createElement('button');
    confirmBtn.classList.add('confirm-button');
    confirmBtn.innerText = 'Confirm';
    confirmBtn.type = 'submit';

    this.form.append(
      this.inputName,
      this.inputPhone,
      this.inputAdress,
      this.inputMail,
      creditTitle,
      creditCard,
      confirmBtn,
    );
    this.modalWindow.append(this.form);

    this.modalBack.classList.add('modal-back-open');

    this.container.append(this.modalWindow, this.modalBack);

    this.numberField.oninput = () => {
      this.checkCardNumber();
    };

    this.secretCodeInput.oninput = () => {
      this.checkCVV();
    };

    this.dateInput.oninput = () => {
      this.dateCheck();
    };

    this.form.onsubmit = (e) => {
      e.preventDefault();
      this.validationForm();
    };

    this.modalBack.onclick = () => {
      this.modalWindow.remove();
      this.modalBack.remove();
    };
  }

  onlyNumberCheck(element: HTMLInputElement): void {
    element.value = element.value.replace(/[\D]/g, '');
  }

  checkValueInput (checkFunction: boolean, element: HTMLElement, value: string) {    
    if (checkFunction) {
      this.createErrorText(value, element);
      return false;
    } else {
      this.deleteErrorText(element);
    }
  }

  validationForm(): boolean | void {
    const nameValue = this.inputName.value;
    const mailValue = this.inputMail.value;
    const phoneValue = this.inputPhone.value;
    const adressValue = this.inputAdress.value;
    const formInputs: NodeListOf<HTMLInputElement> =
      document.querySelectorAll('.input');
    const emptyValue = Array.from(formInputs).filter((input) => input.value === '');

    formInputs.forEach((input) => {      
      input.value === '' ? input.classList.add('error') : input.classList.remove('error');
    });

    this.checkValueInput(!this.checkName(nameValue), this.inputName, 'name');
    this.checkValueInput(!this.checkPhone(phoneValue), this.inputPhone, 'phone');
    this.checkValueInput(!this.checkAdress(adressValue), this.inputAdress, 'adress');
    this.checkValueInput(!this.checkMail(mailValue), this.inputMail, 'e-mail');
    
    this.checkValueInput((this.numberField.value.length !== 16), this.numberField, 'number');
    this.checkValueInput(
      (Number(this.dateInput.value.split('/')[0]) > 12 ||
      this.dateInput.value.length < 5), 
      this.dateInput, 
      'date');
    this.checkValueInput((this.secretCodeInput.value.length !== 3), this.secretCodeInput, 'cvv');

    if (emptyValue.length !== 0) {
      return false;
    } else {
      this.endMessage();
    }
  }

  createErrorText(field: string, container: HTMLElement): void {    
    container.classList.add('error');
    const err = <HTMLElement>document.querySelector('.error-text');
    if (err) {
      return;
    } else {
      const errorText = document.createElement('span');
      errorText.classList.add('error-text');
      errorText.innerText = `Enter a correct ${field}`;
      container === this.secretCodeInput ? container.before(errorText) : container.after(errorText);
    }
  }
 
  deleteErrorText(container: HTMLElement): void {
    container.classList.remove('error');
    const err = <HTMLElement>document.querySelector('.error-text');
    if (err) {
      err.remove();
    }
  }

  checkName(name: string): boolean | void {
    const array = name.split(' ');
    if (array.length >= 2) {
      const filterArr = array.filter((el) => el.length >= 3);
      if (array.length === filterArr.length) {
        return true;
      }
    } else {
      return false;
    }
  }

  checkPhone(phone: string): boolean {
    const PHONE_REGEXP =
      /^(\+)((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){7,15}\d$/iu;
    return PHONE_REGEXP.test(phone);
  }

  checkAdress(adress: string): boolean | void {
    const array = adress.split(' ');
    if (array.length >= 3) {
      const filterArr = array.filter((el) => el.length >= 5);
      if (array.length === filterArr.length) {
        return true;
      }
    } else {
      return false;
    }
  }

  checkMail(mail: string): boolean {
    const EMAIL_REGEXP =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    return EMAIL_REGEXP.test(mail.toLowerCase());
  }

  checkPaySystem(): void {
    switch (this.numberField.value[0]) {
      case '2': this.cardIcon.src = cardIconMir;
        break;
      case '3': this.cardIcon.src = cardIconAmEx;
        break;
      case '4': this.cardIcon.src = carIconVisa;
        break;
      case '5': this.cardIcon.src = cardIconMasterCard;
        break;
      default: this.cardIcon.src = cardIconPlug;
      break;
    }
  }

  checkCardNumber(): void {
    const maxLength = 16;
    if (this.numberField.value.length > maxLength) {
      this.numberField.value = this.numberField.value.slice(0, maxLength);
    }
    this.checkPaySystem();
    this.onlyNumberCheck(this.numberField);
  }

  checkCVV(): void {
    const maxLength = 3;
    if (this.secretCodeInput.value.length > maxLength) {
      this.secretCodeInput.value = this.secretCodeInput.value.slice(0, maxLength);
    }
    this.onlyNumberCheck(this.secretCodeInput);
  }

  dateCheck(): void {
    const maxLength = 5;
    let cardDate = this.dateInput.value.replace(/\D/g, '').substring(0, 4);
    const matchValue = cardDate.match(/.{1,2}/g);
    if (matchValue) {
      cardDate = matchValue.join('/');
    }
    this.dateInput.value = cardDate;
    if (this.dateInput.value.length > maxLength) {
      this.dateInput.value = this.dateInput.value.slice(0, maxLength);
    }
  }

  endMessage(): void {
    const endMessage = document.createElement('p');
    endMessage.innerText = 'Thank you for the order. Redirect to main page...';
    endMessage.classList.add('end-message');
    this.modalWindow.innerHTML = '';
    this.modalWindow.append(endMessage);
    const timeToTransition = 4000;
    setTimeout(() => {
      this.modalWindow.remove();
      this.modalBack.remove();
      App.state.cart.items = [];
      App.header.reloadHeader();
      window.location.hash = `#${PagesId.MainPage}`;
    }, timeToTransition);
  }
}

export default OrderWindow;
