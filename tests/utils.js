/* eslint-disable import/prefer-default-export */
import Sandworm from '../dist';

export const expectCallToMatch = ({
  family,
  method,
  firstArg,
  secondArg,
  index = 0,
  fromRoot = false,
}) => {
  const call = Sandworm.getHistory().filter(
    ({module}) => module === (fromRoot ? 'root' : 'jest-circus'),
  )[index];

  expect(call).not.toBeUndefined();
  expect(typeof call).toBe('object');
  if (family) {
    expect(call.family).toEqual(family);
  }
  if (method) {
    expect(call.method).toEqual(method);
  }
  if (firstArg) {
    expect(call.args).not.toBeUndefined();
    expect(call.args[0]).not.toBeUndefined();
    expect(call.args[0]).toEqual(firstArg);
  }
  if (secondArg) {
    expect(call.args).not.toBeUndefined();
    expect(call.args[1]).not.toBeUndefined();
    expect(call.args[1]).toEqual(secondArg);
  }
};
