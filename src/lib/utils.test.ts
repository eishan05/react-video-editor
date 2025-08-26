import { cn } from './utils';

describe('lib utilities', () => {
  describe('cn (className utility)', () => {
    it('should combine class names', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2');
    });

    it('should handle conditional classes', () => {
      expect(cn('class1', false && 'class2', 'class3')).toBe('class1 class3');
      expect(cn('class1', true && 'class2', 'class3')).toBe('class1 class2 class3');
    });

    it('should merge tailwind classes correctly', () => {
      expect(cn('px-2 py-1', 'px-3')).toBe('py-1 px-3');
      expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
    });

    it('should handle objects', () => {
      expect(cn({ 'class1': true, 'class2': false, 'class3': true })).toBe('class1 class3');
    });

    it('should handle arrays', () => {
      expect(cn(['class1', 'class2'], 'class3')).toBe('class1 class2 class3');
    });

    it('should handle undefined and null values', () => {
      expect(cn('class1', undefined, null, 'class2')).toBe('class1 class2');
    });

    it('should handle empty strings', () => {
      expect(cn('class1', '', 'class2')).toBe('class1 class2');
    });

    it('should return empty string for no arguments', () => {
      expect(cn()).toBe('');
    });

    it('should handle complex tailwind merging scenarios', () => {
      // tailwind-merge behavior: later bg-color classes override earlier ones
      expect(cn('bg-red-500 bg-opacity-50', 'bg-blue-500')).toBe('bg-blue-500');
      expect(cn('p-4 px-6', 'py-8')).toBe('p-4 px-6 py-8');
    });
  });
});