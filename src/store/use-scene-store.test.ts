import { renderHook, act } from '@testing-library/react';
import { useSceneStore } from './use-scene-store';

describe('useSceneStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    const { result } = renderHook(() => useSceneStore());
    act(() => {
      result.current.setScene(null as any);
    });
  });

  describe('initial state', () => {
    it('should have null scene initially', () => {
      const { result } = renderHook(() => useSceneStore());
      
      expect(result.current.scene).toBeNull();
    });
  });

  describe('setScene', () => {
    it('should update scene with design object', () => {
      const { result } = renderHook(() => useSceneStore());
      const mockDesign = {
        id: 'design-1',
        name: 'Test Design',
        width: 1920,
        height: 1080,
        elements: [],
        backgrounds: [],
        metadata: {}
      } as any;

      act(() => {
        result.current.setScene(mockDesign);
      });

      expect(result.current.scene).toEqual(mockDesign);
      expect(result.current.scene?.id).toBe('design-1');
      expect(result.current.scene?.name).toBe('Test Design');
    });

    it('should replace existing scene', () => {
      const { result } = renderHook(() => useSceneStore());
      const firstDesign = {
        id: 'design-1',
        name: 'First Design'
      } as any;
      const secondDesign = {
        id: 'design-2',
        name: 'Second Design'
      } as any;

      act(() => {
        result.current.setScene(firstDesign);
      });
      
      act(() => {
        result.current.setScene(secondDesign);
      });

      expect(result.current.scene).toEqual(secondDesign);
      expect(result.current.scene?.id).toBe('design-2');
    });

    it('should handle complex design structure', () => {
      const { result } = renderHook(() => useSceneStore());
      const complexDesign = {
        id: 'complex-design',
        name: 'Complex Design',
        width: 1920,
        height: 1080,
        elements: [
          { id: 'element-1', type: 'text', content: 'Hello' },
          { id: 'element-2', type: 'image', src: 'image.png' }
        ],
        backgrounds: [
          { type: 'color', value: '#ffffff' }
        ],
        metadata: {
          createdAt: '2023-01-01',
          author: 'Test User'
        }
      } as any;

      act(() => {
        result.current.setScene(complexDesign);
      });

      expect(result.current.scene).toEqual(complexDesign);
      expect(result.current.scene?.elements).toHaveLength(2);
      expect(result.current.scene?.backgrounds).toHaveLength(1);
      expect(result.current.scene?.metadata.author).toBe('Test User');
    });

    it('should set scene back to null', () => {
      const { result } = renderHook(() => useSceneStore());
      const mockDesign = {
        id: 'design-1',
        name: 'Test Design'
      } as any;

      act(() => {
        result.current.setScene(mockDesign);
      });

      expect(result.current.scene).not.toBeNull();

      act(() => {
        result.current.setScene(null as any);
      });

      expect(result.current.scene).toBeNull();
    });
  });

  describe('store persistence', () => {
    it('should maintain scene state across multiple hook instances', () => {
      const { result: result1 } = renderHook(() => useSceneStore());
      const mockDesign = {
        id: 'design-1',
        name: 'Persistent Design'
      } as any;
      
      act(() => {
        result1.current.setScene(mockDesign);
      });

      const { result: result2 } = renderHook(() => useSceneStore());
      
      expect(result2.current.scene).toEqual(mockDesign);
      expect(result2.current.scene?.id).toBe('design-1');
    });

    it('should allow multiple components to access the same scene', () => {
      const { result: component1 } = renderHook(() => useSceneStore());
      const { result: component2 } = renderHook(() => useSceneStore());
      
      const testDesign = {
        id: 'shared-design',
        name: 'Shared Design'
      } as any;

      act(() => {
        component1.current.setScene(testDesign);
      });

      expect(component1.current.scene?.id).toBe('shared-design');
      expect(component2.current.scene?.id).toBe('shared-design');
      expect(component1.current.scene).toBe(component2.current.scene);
    });
  });
});