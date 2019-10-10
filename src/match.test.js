const match = require('./match');

describe('match', () => {
  test('should not break with empty values', () => {
    expect(match()).toBe(true);
  });

  test('should return `true` if no `filter` passed', () => {
    const data = { foo: 'bar' };

    expect(match(data)).toBe(true);
  });

  test('should return `false` if no `data` passed', () => {
    const data = undefined;
    const filter = { foo: 'bar' };

    expect(match(data, filter)).toBe(false);
  });

  test('should return `true` if filter matches', () => {
    const data = { foo: 'bar' };
    const filter = { foo: 'bar' };

    expect(match(data, filter)).toBe(true);
  });

  test('should return `true` if filter matches but data has more values', () => {
    const data = { foo: 'bar', baz: 'bux' };
    const filter = { foo: 'bar' };

    expect(match(data, filter)).toBe(true);
  });

  test('should return `false` if all filter values doesn\'t match', () => {
    const data = { foo: 'bar', baz: 'bux' };
    const filter = { foo: 'bar', hello: 'world' };

    expect(match(data, filter)).toBe(false);
  });
});
