const { add } = require('./math');

test('adds two numbers correctly', () => {
  const result = add(2, 3);
  expect(result).toBe(5); 
});
