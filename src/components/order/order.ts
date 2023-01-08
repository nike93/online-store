import { PagesId } from '../../routing/routing';
import App from '../../app/app';

class orderWindow {
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
  private cvvInput: HTMLInputElement;
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
    this.cvvInput = document.createElement('input');
    this.cardIcon = document.createElement('img');
  }

  openWindow() {
    this.modalWindow.classList.add('modal');

    const titleModal = document.createElement('h3');
    titleModal.classList.add('modal__title');
    titleModal.innerText = 'Personal details';
    this.modalWindow.append(titleModal);

    this.inputName.classList.add('input-name', 'input');
    this.inputName.placeholder = 'Name';
    this.inputName.type = 'text';

    this.inputPhone.classList.add('input-phone', 'input');
    this.inputPhone.placeholder = 'Phone number';
    this.inputPhone.type = 'text';

    this.inputAdress.classList.add('input-adress', 'input');
    this.inputAdress.placeholder = 'Delivery adress';

    this.inputMail.classList.add('input-mail', 'input');
    this.inputMail.placeholder = 'E-mail';
    this.inputMail.type = 'email';

    const creditTitle = document.createElement('h3');
    creditTitle.classList.add('modal__credit');
    creditTitle.innerText = 'Credit card details';

    const creditCard = document.createElement('div');
    creditCard.classList.add('credit-card');

    this.cardNumber.classList.add('card-number');

    this.cardIcon.classList.add('card-icon');
    this.cardIcon.src =
      'https://play-lh.googleusercontent.com/baXy546Srucl3vM1yaHr060eBL9_mrk0NH2GGRRCMTrKbekbx2pI77WCaXmNwUqnqQ';

    this.numberField.classList.add('number-field', 'input');
    this.numberField.placeholder = 'Card number';
    this.numberField.type = 'number';

    this.cardNumber.append(this.cardIcon, this.numberField);

    this.validBlock.classList.add('valid-block');

    this.dateInput.classList.add('date-input', 'input');
    this.dateInput.placeholder = 'Validaty';

    this.cvvInput.classList.add('cvv-input', 'input');
    this.cvvInput.placeholder = 'CVV';
    this.cvvInput.type = 'number';
    this.validBlock.append(this.dateInput, this.cvvInput);

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
      confirmBtn
    );
    this.modalWindow.append(this.form);

    this.modalBack.classList.add('modal-back-open');

    this.container.append(this.modalWindow, this.modalBack);

    this.numberField.oninput = () => {
      this.checkCardNumber();
    };

    this.cvvInput.oninput = () => {
      this.checkCVV();
    };

    this.dateInput.oninput = () => {
      this.dateCheck();
    };

    this.form.onsubmit = () => {
      this.validationForm();
    };

    this.modalBack.onclick = () => {
      this.modalWindow.remove();
      this.modalBack.remove();
    };
  }

  validationForm() {
    const nameValue = this.inputName.value;
    const mailValue = this.inputMail.value;
    const phoneValue = this.inputPhone.value;
    const adressValue = this.inputAdress.value;
    const formInputs: NodeListOf<HTMLInputElement> =
      document.querySelectorAll('.input');
    const emptyValue = Array.from(formInputs).filter(
      (input) => input.value === ''
    );

    formInputs.forEach(function (input) {
      if (input.value === '') {
        input.classList.add('error');
      } else {
        input.classList.remove('error');
      }
    });

    if (emptyValue.length !== 0) {
      return false;
    }

    if (!this.checkName(nameValue)) {
      this.inputName.classList.add('error');
      this.createErrorText('name', this.inputName);
      return false;
    } else {
      this.inputName.classList.remove('error');
      this.deleteErrorText();
    }

    if (!this.checkPhone(phoneValue)) {
      this.inputPhone.classList.add('error');
      this.createErrorText('phone', this.inputPhone);
      return false;
    } else {
      this.inputPhone.classList.remove('error');
      this.deleteErrorText();
    }

    if (!this.checkAdress(adressValue)) {
      this.inputAdress.classList.add('error');
      this.createErrorText('adress', this.inputAdress);
      return false;
    } else {
      this.inputAdress.classList.remove('error');
      this.deleteErrorText();
    }

    if (!this.checkMail(mailValue)) {
      this.inputMail.classList.add('error');
      this.createErrorText('e-mail', this.inputMail);
      return false;
    } else {
      this.inputMail.classList.remove('error');
      this.deleteErrorText();
    }

    if (this.numberField.value.length !== 16) {
      this.numberField.classList.add('error');
      this.createErrorText('number', this.cardNumber);
      return false;
    } else {
      this.numberField.classList.remove('error');
      this.deleteErrorText();
    }

    if (
      Number(this.dateInput.value.split('/')[0]) > 12 ||
      this.dateInput.value.length < 5
    ) {
      this.dateInput.classList.add('error');
      this.createErrorText('date', this.validBlock);
      return false;
    } else {
      this.dateInput.classList.remove('error');
      this.deleteErrorText();
    }

    if (this.cvvInput.value.length !== 3) {
      this.cvvInput.classList.add('error');
      this.createErrorText('cvv', this.validBlock);
      return false;
    } else {
      this.cvvInput.classList.remove('error');
      this.deleteErrorText();
    }

    this.endMessage();
  }

  createErrorText(field: string, container: HTMLElement) {
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

  deleteErrorText() {
    const err = <HTMLElement>document.querySelector('.error-text');
    if (err) {
      err.remove();
    }
  }

  checkName(name: string) {
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

  checkPhone(phone: string) {
    const PHONE_REGEXP =
      /^(\+)((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){7,15}\d$/iu;
    return PHONE_REGEXP.test(phone);
  }

  checkAdress(adress: string) {
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

  checkMail(mail: string) {
    const EMAIL_REGEXP =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    return EMAIL_REGEXP.test(mail.toLowerCase());
  }

  checkPaySystem() {
    switch (this.numberField.value[0]) {
      case '2':
        this.cardIcon.src =
          'https://photo.virtualbrest.ru/uploads/2022/03/15/c29822b85d1ba85616b98c231c73119c.jpeg';
        break;
      case '3':
        this.cardIcon.src =
          'https://pbs.twimg.com/profile_images/983285404253196288/rx3n00Ep_400x400.jpg';
        break;
      case '4':
        this.cardIcon.src =
          'https://infocity.tech/wp-content/uploads/2020/07/Visa-logo.jpg';
        break;
      case '5':
        this.cardIcon.src =
          'https://models.rsbis.com/storage/makets/preview/resize_600x600/26/42/2642b70ee46621ca320c3a82fc9fdc71.jpeg';
        break;
      default:
        this.cardIcon.src =
          'https://play-lh.googleusercontent.com/baXy546Srucl3vM1yaHr060eBL9_mrk0NH2GGRRCMTrKbekbx2pI77WCaXmNwUqnqQ';
        break;
    }
  }

  checkCardNumber() {
    const maxLength = 16;
    if (this.numberField.value.length > maxLength) {
      this.numberField.value = this.numberField.value.slice(0, maxLength);
    }
    this.checkPaySystem();
  }

  checkCVV() {
    const maxLength = 3;
    if (this.cvvInput.value.length > maxLength) {
      this.cvvInput.value = this.cvvInput.value.slice(0, maxLength);
    }
  }

  dateCheck() {
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

  endMessage() {
    const endMessage = document.createElement('p');
    endMessage.innerText = 'Thank you for the order. Redirect to main page...';
    endMessage.classList.add('end-message');
    this.modalWindow.innerHTML = '';
    this.modalWindow.append(endMessage);
    setTimeout(() => {
      this.modalWindow.remove();
      this.modalBack.remove();
      App.state.cart.items = [];
      App.header.reloadHeader();
      window.location.hash = `#${PagesId.MainPage}`;
    }, 4000);
  }
}

export default orderWindow;
