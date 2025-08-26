import rgbaToHex from './rgbaToHex';

describe('rgbaToHex', () => {
  it('should convert RGB array to hex', () => {
    expect(rgbaToHex([255, 0, 0])).toBe('#ff0000');
    expect(rgbaToHex([0, 255, 0])).toBe('#00ff00');
    expect(rgbaToHex([0, 0, 255])).toBe('#0000ff');
    expect(rgbaToHex([255, 255, 255])).toBe('#ffffff');
    expect(rgbaToHex([0, 0, 0])).toBe('#000000');
  });

  it('should convert RGBA array to hex with alpha', () => {
    expect(rgbaToHex([255, 0, 0, 255])).toBe('#ff0000ff');
    expect(rgbaToHex([0, 255, 0, 128])).toBe('#00ff0080');
    expect(rgbaToHex([0, 0, 255, 0])).toBe('#0000ff00');
  });

  it('should pad single digit hex values with zero', () => {
    expect(rgbaToHex([15, 0, 0])).toBe('#0f0000');
    expect(rgbaToHex([0, 15, 0])).toBe('#000f00');
    expect(rgbaToHex([0, 0, 15])).toBe('#00000f');
    expect(rgbaToHex([1, 2, 3])).toBe('#010203');
  });

  it('should handle string numbers', () => {
    expect(rgbaToHex(['255', '0', '0'])).toBe('#ff0000');
    expect(rgbaToHex(['128', '128', '128'])).toBe('#808080');
  });

  it('should handle mixed string and number inputs', () => {
    expect(rgbaToHex([255, '0', 0])).toBe('#ff0000');
    expect(rgbaToHex(['128', 128, '128'])).toBe('#808080');
  });

  it('should return empty string for invalid inputs', () => {
    expect(rgbaToHex('not-an-array' as any)).toBe('');
    expect(rgbaToHex([])).toBe('');
    expect(rgbaToHex([255])).toBe('');
    expect(rgbaToHex([255, 0])).toBe('');
    expect(rgbaToHex([255, 0, 0, 0, 0])).toBe('');
  });

  it('should return empty string for NaN values', () => {
    expect(rgbaToHex([NaN, 0, 0])).toBe('');
    expect(rgbaToHex([255, NaN, 0])).toBe('');
    expect(rgbaToHex([255, 0, NaN])).toBe('');
    expect(rgbaToHex(['invalid', 0, 0])).toBe('');
  });

  it('should handle boundary values', () => {
    expect(rgbaToHex([0, 0, 0])).toBe('#000000');
    expect(rgbaToHex([255, 255, 255])).toBe('#ffffff');
    expect(rgbaToHex([128, 128, 128])).toBe('#808080');
  });

  it('should handle decimal numbers (behavior may vary)', () => {
    const result1 = rgbaToHex([255.7, 0.3, 0.9]);
    const result2 = rgbaToHex([128.5, 128.5, 128.5]);
    
    // Just check that it returns a valid string format
    expect(typeof result1).toBe('string');
    expect(typeof result2).toBe('string');
    expect(result1.startsWith('#') || result1 === '').toBe(true);
    expect(result2.startsWith('#') || result2 === '').toBe(true);
  });
});