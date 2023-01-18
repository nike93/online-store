/**
 * @jest-environment jsdom
 */
import {expect, test} from '@jest/globals';
import CartPage from '../components/cart/cart';


test('test cart', () => {
  expect(CartPage.emptyCartDom().textContent).toEqual('Cart is Empty');
})

test('test cart', () => {
  expect(CartPage.emptyCartDom().textContent).not.toEqual('Empty');
})
