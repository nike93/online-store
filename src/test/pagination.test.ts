/**
 * @jest-environment jsdom
 */
import {expect, test} from '@jest/globals';
import Pagination from '../app/pages/cart/pagination';

const testPagination = new Pagination();

test('Test pagination', () => {
  expect(testPagination.renderTitle().textContent).not.toBeNull();
})