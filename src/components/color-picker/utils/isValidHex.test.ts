import isValidHex from './isValidHex';

describe('isValidHex', () => {
  it('should validate 6-digit hex colors', () => {
    expect(isValidHex('#ff0000')).toBe(true);
    expect(isValidHex('#00ff00')).toBe(true);
    expect(isValidHex('#0000ff')).toBe(true);
    expect(isValidHex('#ffffff')).toBe(true);
    expect(isValidHex('#000000')).toBe(true);
  });

  it('should validate 3-digit hex colors', () => {
    expect(isValidHex('#f00')).toBe(true);
    expect(isValidHex('#0f0')).toBe(true);
    expect(isValidHex('#00f')).toBe(true);
    expect(isValidHex('#fff')).toBe(true);
    expect(isValidHex('#000')).toBe(true);
  });

  it('should validate 8-digit hex colors (with alpha)', () => {
    expect(isValidHex('#ff0000ff')).toBe(true);
    expect(isValidHex('#00ff0080')).toBe(true);
    expect(isValidHex('#0000ff00')).toBe(true);
  });

  it('should validate 4-digit hex colors (with alpha)', () => {
    expect(isValidHex('#f00f')).toBe(true);
    expect(isValidHex('#0f08')).toBe(true);
    expect(isValidHex('#00f0')).toBe(true);
  });

  it('should handle case insensitivity', () => {
    expect(isValidHex('#FF0000')).toBe(true);
    expect(isValidHex('#Ff0000')).toBe(true);
    expect(isValidHex('#fF0000')).toBe(true);
    expect(isValidHex('#ABCDEF')).toBe(true);
  });

  it('should reject invalid hex formats', () => {
    expect(isValidHex('ff0000')).toBe(false); // Missing #
    expect(isValidHex('#gg0000')).toBe(false); // Invalid character
    expect(isValidHex('#ff')).toBe(false); // Wrong length (2 digits after #)
    expect(isValidHex('#ff000')).toBe(false); // Wrong length (5 digits)
    expect(isValidHex('#ff00000')).toBe(false); // Wrong length (7 digits)
    expect(isValidHex('#ff0000000')).toBe(false); // Wrong length (9 digits)
  });

  it('should reject empty and invalid strings', () => {
    expect(isValidHex('')).toBe(false);
    expect(isValidHex('#')).toBe(false);
    expect(isValidHex('invalid')).toBe(false);
    expect(isValidHex('rgb(255, 0, 0)')).toBe(false);
  });

  it('should reject special characters and spaces', () => {
    expect(isValidHex('#ff 000')).toBe(false);
    expect(isValidHex('#ff@000')).toBe(false);
    expect(isValidHex('#ff-000')).toBe(false);
    expect(isValidHex('#ff_000')).toBe(false);
  });
});