class orderWindow {
  openWindow() {
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
    //inputName.pattern = '[A-Za-zА-Яа-яЁё]{3,} [A-Za-zА-Яа-яЁё]{3,}.*';

    const inputPhone = document.createElement('input');
    inputPhone.classList.add('input-phone', 'input');
    inputPhone.placeholder = 'Phone number';
    inputPhone.type = 'number';

    const inputAdress = document.createElement('input');
    inputAdress.classList.add('input-adress', 'input');
    inputAdress.placeholder = 'Delivery adress';

    const inputMail = document.createElement('input');
    inputMail.classList.add('input-mail', 'input');
    inputMail.placeholder = 'E-mail';
    inputMail.type = 'email';

    form.append(inputName, inputPhone, inputAdress, inputMail);
    modalWindow.append(form);

    const creditTitle = document.createElement('h3');
    creditTitle.classList.add('modal__credit');
    creditTitle.innerText = 'Credit card details';
    modalWindow.append(creditTitle);

    const creditCard = document.createElement('div');
    creditCard.classList.add('credit-card');

    const cardNumber = document.createElement('div');
    cardNumber.classList.add('card-number');

    const cardIcon = document.createElement('img');
    cardIcon.classList.add('card-icon');

    const numberField = document.createElement('input');
    numberField.classList.add('number-field');
    numberField.placeholder = 'Card number';
    numberField.type = 'number';

    cardNumber.append(cardIcon, numberField);

    const validBlock = document.createElement('div');
    validBlock.classList.add('valid-block');

    const dateInput = document.createElement('input');
    dateInput.classList.add('date-input');
    dateInput.placeholder = 'Validaty';
    //dateInput.type = 'number';

    const cvvInput = document.createElement('input');
    cvvInput.classList.add('cvv-input');
    cvvInput.placeholder = 'CVV';
    cvvInput.type = 'number';
    validBlock.append(dateInput, cvvInput);

    creditCard.append(cardNumber, validBlock);
    modalWindow.append(creditCard);

    const confirmBtn = document.createElement('button');
    confirmBtn.classList.add('confirm-button');
    confirmBtn.innerText = 'Confirm';

    modalWindow.append(confirmBtn);

    main.append(modalWindow);

    //validation
    // inputName.addEventListener('blur', function() {
    //   const arr = inputName.value.split(' ');
    //   if (arr.length > 1) {
    //     for (let i = 0; i < arr.length; i++) {
    //       if (arr[i].length > 2) {
    //         console.log('yes');
    //       }
    //     } 
    //   } else {
    //     console.log('no!')
    //   }
           
    // })

    inputPhone.addEventListener('blur', function() {
      if (inputPhone.value[0] !== '+' || inputPhone.value.length < 10) {
        console.log(typeof(inputPhone.value));
        console.log('no');
      } else {
        console.log('yes');
      }
    })

    //mail
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    function validEmail(value: string) {
      return EMAIL_REGEXP.test(value);
    }
    function checkMail() {
      if (validEmail(inputMail.value)) inputMail.style.borderColor = '#46760A';
      else inputMail.style.borderColor = 'red';
    }
    inputMail.addEventListener('input', checkMail);
    
    //cardNUmber

    function checkCardNumber() {
      const maxLength = 16;
      if (numberField.value.length > maxLength) {
        numberField.value = numberField.value.slice(0, maxLength);
      }
      if(numberField.value[0] === '4') {
        console.log('da')
        alert('visa');
      }
      
    }
    numberField.addEventListener('input', checkCardNumber);

    //cvv
    function checkCVV() {
      const maxLength = 3;
      if (cvvInput.value.length > maxLength) {
        cvvInput.value = cvvInput.value.slice(0, maxLength);
      }
      if (cvvInput.value.length === maxLength)  cvvInput.style.borderColor = '#46760A';
      else cvvInput.style.borderColor = 'red';
      
    }
    cvvInput.addEventListener('input', checkCVV);

    //date
    function dateCheck() {
      const maxLength = 5;
      if (dateInput.value.length === 2) {
        dateInput.value += '/';
      }
      if (dateInput.value.length > maxLength) {
        dateInput.value = dateInput.value.slice(0, maxLength);
      }
      if (dateInput.value.length === maxLength)  dateInput.style.borderColor = '#46760A';
      else dateInput.style.borderColor = 'red';
    }
    dateInput.addEventListener('input', dateCheck);
  }
}

export default orderWindow;