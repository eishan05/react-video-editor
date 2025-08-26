import { generateId } from './id';

describe('id utilities', () => {
  describe('generateId', () => {
    it('should generate id with specified length', () => {
      expect(generateId(5)).toHaveLength(5);
      expect(generateId(10)).toHaveLength(10);
      expect(generateId(20)).toHaveLength(20);
    });

    it('should generate different ids on multiple calls', () => {
      const id1 = generateId(10);
      const id2 = generateId(10);
      const id3 = generateId(10);
      
      expect(id1).not.toBe(id2);
      expect(id1).not.toBe(id3);
      expect(id2).not.toBe(id3);
    });

    it('should only contain alphanumeric characters', () => {
      const id = generateId(100);
      const validChars = /^[a-zA-Z0-9]+$/;
      expect(id).toMatch(validChars);
    });

    it('should handle zero length', () => {
      expect(generateId(0)).toBe('');
    });

    it('should handle length of 1', () => {
      const id = generateId(1);
      expect(id).toHaveLength(1);
      expect(/^[a-zA-Z0-9]$/.test(id)).toBe(true);
    });

    it('should generate consistent length for large values', () => {
      const id = generateId(1000);
      expect(id).toHaveLength(1000);
    });
  });
});