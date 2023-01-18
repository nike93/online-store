/**
 * @jest-environment jsdom
 */
import {expect, test} from '@jest/globals';
import Summary from '../components/cart/summary';

const testSummary = new Summary();

test('test summary', () => {
  expect(testSummary.renderTitle().textContent).toEqual('Summary');
})

test('test summary', () => {
  expect(testSummary.renderTitle()).not.toBeNull();
})

test('test promo', () => {
  expect(testSummary.renderPromoSuggestion('rs')).not.toBeNull();
})

test('Test renderNB', () => {
  expect(testSummary.renderNB().textContent).not.toEqual('Promo');
})

test('Test renderNB', () => {
  expect(testSummary.renderNB().textContent).toEqual('*Promo for test: "rs", "ny"');
})

test('Test renderBTN', () => {
  expect(testSummary.renderBuyButton().classList.contains('button')).toEqual(true);
})


