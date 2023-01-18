/**
 * @jest-environment jsdom
 */
import {describe, expect, test} from '@jest/globals';
import orderWindow from "../components/order/order";

const testOrder = new orderWindow();

describe('Test name', () => {
  test('check name', () => {
    expect(testOrder.checkName('Fedor Pashko')).toEqual(true)
  });

  test('check name', () => {
    expect(testOrder.checkName('Serge')).toEqual(false)
  });

  test('check name', () => {
    expect(testOrder.checkName('')).toEqual(false)
  });
})

describe('Test phone', () => {
  test('check phone', () => {
    expect(testOrder.checkPhone('+375295923713')).toEqual(true)
  });

  test('check phone', () => {
    expect(testOrder.checkPhone('+37523713')).toEqual(false)
  });

  test('check phone', () => {
    expect(testOrder.checkPhone('375295923713')).toEqual(false)
  });
})

describe('Test adress', () => {
  test('check adress', () => {
    expect(testOrder.checkAdress('Street Greens Plants')).toEqual(true)
  });

  test('check adress', () => {
    expect(testOrder.checkAdress('')).toEqual(false)
  });

  test('check adress', () => {
    expect(testOrder.checkAdress('New York')).toEqual(false)
  });
})

describe('Test mail', () => {
  test('check mail', () => {
    expect(testOrder.checkMail('pochta@mail.ru')).toEqual(true)
  });

  test('check adress', () => {
    expect(testOrder.checkMail('pochta.ru')).toEqual(false)
  });

  test('check adress', () => {
    expect(testOrder.checkMail('pochta@mail')).toEqual(false)
  });
})

