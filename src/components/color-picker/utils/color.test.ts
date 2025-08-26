import Color from './color';

describe('Color class', () => {
  describe('constructor', () => {
    it('should create color from hex string', () => {
      const color = new Color('#ff0000');
      expect(color.red).toBe(255);
      expect(color.green).toBe(0);
      expect(color.blue).toBe(0);
    });

    it('should create color from rgb string', () => {
      const color = new Color('rgb(255, 0, 0)');
      expect(color.red).toBe(255);
      expect(color.green).toBe(0);
      expect(color.blue).toBe(0);
    });

    it('should create color from HSV object', () => {
      const color = new Color({ h: 0, s: 1, v: 1 });
      expect(color.red).toBe(255);
      expect(color.green).toBe(0);
      expect(color.blue).toBe(0);
    });

    it('should initialize alpha value correctly', () => {
      const color = new Color('rgba(255, 0, 0, 0.5)');
      expect(color.alpha).toBe(50);
    });
  });

  describe('static isValidHex', () => {
    it('should validate correct hex colors', () => {
      expect(Color.isValidHex('#ff0000')).toBe(true);
      expect(Color.isValidHex('#f00')).toBe(true);
      expect(Color.isValidHex('ff0000')).toBe(true);
      expect(Color.isValidHex('f00')).toBe(true);
    });

    it('should reject invalid hex colors', () => {
      expect(Color.isValidHex('#gg0000')).toBe(false);
      expect(Color.isValidHex('#ff000')).toBe(false); // 5 digits is invalid
      expect(Color.isValidHex('invalid')).toBe(false);
      expect(Color.isValidHex('')).toBe(false);
    });
  });

  describe('getters and setters', () => {
    let color: Color;

    beforeEach(() => {
      color = new Color('#ff0000');
    });

    it('should get and set hue', () => {
      expect(color.hue).toBe(0);
      color.hue = 120;
      expect(color.hue).toBe(120);
      expect(color.green).toBeGreaterThan(0);
    });

    it('should get and set saturation', () => {
      color.saturation = 0.5;
      expect(color.saturation).toBe(0.5);
    });

    it('should get and set brightness', () => {
      color.brightness = 0.5;
      expect(color.brightness).toBe(0.5);
    });

    it('should get and set red', () => {
      color.red = 128;
      expect(color.red).toBe(128);
    });

    it('should get and set green', () => {
      color.green = 128;
      expect(color.green).toBe(128);
    });

    it('should get and set blue', () => {
      color.blue = 128;
      expect(color.blue).toBe(128);
    });

    it('should get and set alpha', () => {
      color.alpha = 75;
      expect(color.alpha).toBe(75);
    });
  });

  describe('conversion methods', () => {
    let color: Color;

    beforeEach(() => {
      color = new Color('#ff0000');
    });

    it('should convert to hex string', () => {
      expect(color.toHexString()).toBe('#ff0000');
    });

    it('should convert to rgb string', () => {
      expect(color.toRgbString()).toBe('rgb(255, 0, 0)');
    });

    it('should convert to hsv', () => {
      const hsv = color.toHsv();
      expect(hsv.h).toBe(0);
      expect(hsv.s).toBe(1);
      expect(hsv.v).toBe(1);
    });

    it('should get hex value', () => {
      expect(color.hex).toBe('ff0000');
    });

    it('should get RGB array', () => {
      expect(color.RGB).toEqual([255, 0, 0]);
    });

    it('should get HSB array', () => {
      expect(color.HSB).toEqual([0, 1, 1]);
    });
  });

  describe('color manipulation', () => {
    it('should update RGB when HSV changes', () => {
      const color = new Color('#ff0000');
      color.hue = 120; // Change to green
      expect(color.green).toBeGreaterThan(200);
      expect(color.red).toBeLessThan(100);
    });

    it('should update HSV when RGB changes', () => {
      const color = new Color('#ff0000');
      color.green = 255;
      expect(color.hue).toBeCloseTo(60, 0); // Yellow hue
    });

    it('should handle lightness property', () => {
      const color = new Color('#ff0000');
      color.lightness = 0.5;
      expect(color.lightness).toBe(0.5);
    });
  });

  describe('edge cases', () => {
    it('should handle black color', () => {
      const color = new Color('#000000');
      expect(color.red).toBe(0);
      expect(color.green).toBe(0);
      expect(color.blue).toBe(0);
    });

    it('should handle white color', () => {
      const color = new Color('#ffffff');
      expect(color.red).toBe(255);
      expect(color.green).toBe(255);
      expect(color.blue).toBe(255);
    });

    it('should handle transparent color', () => {
      const color = new Color('transparent');
      expect(color.alpha).toBe(0);
    });
  });
});