import App from '../app/app';

class LStorage {
  static cartKey = 'niketopshopcart';

  static setLocalStorage() {
    localStorage.setItem(
      LStorage.cartKey,
      JSON.stringify(App.state.cart.items)
    );
  }

  static getLocalStorage() {
    const value = localStorage.getItem(LStorage.cartKey);
    if (value) {
      App.state.cart.items = JSON.parse(value);
    }
  }
}

export default LStorage;
