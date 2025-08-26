import hexToRgba from './hexToRgba';

describe('hexToRgba', () => {
  it('should convert 6-digit hex to rgba', () => {
    expect(hexToRgba('#ff0000', 100)).toBe('rgba(255, 0, 0, 1)');
    expect(hexToRgba('#00ff00', 100)).toBe('rgba(0, 255, 0, 1)');
    expect(hexToRgba('#0000ff', 100)).toBe('rgba(0, 0, 255, 1)');
  });

  it('should convert 3-digit hex to rgba', () => {
    expect(hexToRgba('#f00', 100)).toBe('rgba(255, 0, 0, 1)');
    expect(hexToRgba('#0f0', 100)).toBe('rgba(0, 255, 0, 1)');
    expect(hexToRgba('#00f', 100)).toBe('rgba(0, 0, 255, 1)');
  });

  it('should handle hex without # prefix', () => {
    expect(hexToRgba('ff0000', 100)).toBe('rgba(255, 0, 0, 1)');
    expect(hexToRgba('f00', 100)).toBe('rgba(255, 0, 0, 1)');
  });

  it('should apply opacity correctly', () => {
    expect(hexToRgba('#ff0000', 50)).toBe('rgba(255, 0, 0, 0.5)');
    expect(hexToRgba('#ff0000', 25)).toBe('rgba(255, 0, 0, 0.25)');
    expect(hexToRgba('#ff0000', 0)).toBe('rgba(255, 0, 0, 0)');
  });

  it('should default to 100% opacity for invalid opacity values', () => {
    expect(hexToRgba('#ff0000', NaN)).toBe('rgba(255, 0, 0, 1)');
  });

  it('should handle mixed case hex values', () => {
    expect(hexToRgba('#FF0000', 100)).toBe('rgba(255, 0, 0, 1)');
    expect(hexToRgba('#Ff0000', 100)).toBe('rgba(255, 0, 0, 1)');
  });

  it('should handle edge cases', () => {
    expect(hexToRgba('#000000', 100)).toBe('rgba(0, 0, 0, 1)');
    expect(hexToRgba('#ffffff', 100)).toBe('rgba(255, 255, 255, 1)');
    expect(hexToRgba('#000', 100)).toBe('rgba(0, 0, 0, 1)');
    expect(hexToRgba('#fff', 100)).toBe('rgba(255, 255, 255, 1)');
  });
});