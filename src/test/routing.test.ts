/**
 * @jest-environment jsdom
 */
import {expect, test} from '@jest/globals';
import Routing from '../app/routing/routing';

const testRouting = new Routing();

test('check page', () => {
  expect(testRouting.checkIsSamePage('mai')).toEqual(false)
});