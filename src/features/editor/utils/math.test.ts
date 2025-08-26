import { clamp } from './math';

describe('math utilities', () => {
  describe('clamp', () => {
    it('should clamp value within the specified range', () => {
      expect(clamp(5, 0, 10)).toBe(5);
      expect(clamp(-5, 0, 10)).toBe(0);
      expect(clamp(15, 0, 10)).toBe(10);
    });

    it('should handle equal min and max values', () => {
      expect(clamp(5, 3, 3)).toBe(3);
      expect(clamp(1, 3, 3)).toBe(3);
    });

    it('should handle decimal numbers', () => {
      expect(clamp(2.5, 1.1, 3.9)).toBe(2.5);
      expect(clamp(0.5, 1.1, 3.9)).toBe(1.1);
      expect(clamp(4.5, 1.1, 3.9)).toBe(3.9);
    });

    it('should handle negative numbers', () => {
      expect(clamp(-5, -10, -1)).toBe(-5);
      expect(clamp(-15, -10, -1)).toBe(-10);
      expect(clamp(0, -10, -1)).toBe(-1);
    });
  });
});