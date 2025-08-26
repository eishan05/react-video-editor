import { renderHook, act } from '@testing-library/react';
import useStore from './use-store';

describe('useStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    const { result } = renderHook(() => useStore());
    act(() => {
      result.current.setState({
        compositions: [],
        structure: [],
        size: { width: 1080, height: 1920 },
        background: { type: 'color', value: 'transparent' },
        viewTimeline: true,
        timeline: null,
        duration: 1000,
        fps: 30,
        scale: {
          index: 7,
          unit: 300,
          zoom: 1 / 300,
          segments: 5,
        },
        scroll: { left: 0, top: 0 },
        playerRef: null,
        activeIds: [],
        tracks: [],
        trackItemIds: [],
        transitionIds: [],
        transitionsMap: {},
        trackItemsMap: {},
        sceneMoveableRef: null,
      });
    });
  });

  describe('initial state', () => {
    it('should have correct default values', () => {
      const { result } = renderHook(() => useStore());
      
      expect(result.current.compositions).toEqual([]);
      expect(result.current.structure).toEqual([]);
      expect(result.current.size).toEqual({ width: 1080, height: 1920 });
      expect(result.current.background).toEqual({ type: 'color', value: 'transparent' });
      expect(result.current.viewTimeline).toBe(true);
      expect(result.current.timeline).toBeNull();
      expect(result.current.duration).toBe(1000);
      expect(result.current.fps).toBe(30);
      expect(result.current.playerRef).toBeNull();
      expect(result.current.activeIds).toEqual([]);
      expect(result.current.tracks).toEqual([]);
      expect(result.current.sceneMoveableRef).toBeNull();
    });

    it('should have correct default scale values', () => {
      const { result } = renderHook(() => useStore());
      
      expect(result.current.scale).toEqual({
        index: 7,
        unit: 300,
        zoom: 1 / 300,
        segments: 5,
      });
    });

    it('should have correct default scroll values', () => {
      const { result } = renderHook(() => useStore());
      
      expect(result.current.scroll).toEqual({ left: 0, top: 0 });
    });
  });

  describe('setCompositions', () => {
    it('should update compositions', () => {
      const { result } = renderHook(() => useStore());
      const testCompositions = [
        { id: '1', name: 'Composition 1' },
        { id: '2', name: 'Composition 2' },
      ];

      act(() => {
        result.current.setCompositions(testCompositions);
      });

      expect(result.current.compositions).toEqual(testCompositions);
    });

    it('should replace existing compositions', () => {
      const { result } = renderHook(() => useStore());
      const initialCompositions = [{ id: '1', name: 'Initial' }];
      const newCompositions = [{ id: '2', name: 'New' }];

      act(() => {
        result.current.setCompositions(initialCompositions);
      });
      
      act(() => {
        result.current.setCompositions(newCompositions);
      });

      expect(result.current.compositions).toEqual(newCompositions);
      expect(result.current.compositions).not.toEqual(initialCompositions);
    });
  });

  describe('setViewTimeline', () => {
    it('should update viewTimeline to false', () => {
      const { result } = renderHook(() => useStore());

      act(() => {
        result.current.setViewTimeline(false);
      });

      expect(result.current.viewTimeline).toBe(false);
    });

    it('should update viewTimeline to true', () => {
      const { result } = renderHook(() => useStore());

      act(() => {
        result.current.setViewTimeline(false);
      });
      
      act(() => {
        result.current.setViewTimeline(true);
      });

      expect(result.current.viewTimeline).toBe(true);
    });
  });

  describe('setTimeline', () => {
    it('should update timeline', () => {
      const { result } = renderHook(() => useStore());
      const mockTimeline = { id: 'timeline-1' } as any;

      act(() => {
        result.current.setTimeline(mockTimeline);
      });

      expect(result.current.timeline).toBe(mockTimeline);
    });
  });

  describe('setScale', () => {
    it('should update scale', () => {
      const { result } = renderHook(() => useStore());
      const newScale = {
        index: 5,
        unit: 200,
        zoom: 1 / 200,
        segments: 10,
      };

      act(() => {
        result.current.setScale(newScale);
      });

      expect(result.current.scale).toEqual(newScale);
    });
  });

  describe('setScroll', () => {
    it('should update scroll position', () => {
      const { result } = renderHook(() => useStore());
      const newScroll = { left: 100, top: 50 };

      act(() => {
        result.current.setScroll(newScroll);
      });

      expect(result.current.scroll).toEqual(newScroll);
    });
  });

  describe('setPlayerRef', () => {
    it('should update playerRef', () => {
      const { result } = renderHook(() => useStore());
      const mockPlayerRef = { current: { play: jest.fn() } } as any;

      act(() => {
        result.current.setPlayerRef(mockPlayerRef);
      });

      expect(result.current.playerRef).toBe(mockPlayerRef);
    });

    it('should set playerRef to null', () => {
      const { result } = renderHook(() => useStore());
      const mockPlayerRef = { current: { play: jest.fn() } } as any;

      act(() => {
        result.current.setPlayerRef(mockPlayerRef);
      });
      
      act(() => {
        result.current.setPlayerRef(null);
      });

      expect(result.current.playerRef).toBeNull();
    });
  });

  describe('setSceneMoveableRef', () => {
    it('should update sceneMoveableRef', () => {
      const { result } = renderHook(() => useStore());
      const mockMoveableRef = { current: { moveable: 'instance' } } as any;

      act(() => {
        result.current.setSceneMoveableRef(mockMoveableRef);
      });

      expect(result.current.sceneMoveableRef).toBe(mockMoveableRef);
    });
  });

  describe('setState', () => {
    it('should update multiple state properties', async () => {
      const { result } = renderHook(() => useStore());
      const updates = {
        duration: 2000,
        fps: 60,
        activeIds: ['id1', 'id2'],
      };

      await act(async () => {
        await result.current.setState(updates);
      });

      expect(result.current.duration).toBe(2000);
      expect(result.current.fps).toBe(60);
      expect(result.current.activeIds).toEqual(['id1', 'id2']);
    });

    it('should merge with existing state', async () => {
      const { result } = renderHook(() => useStore());
      
      await act(async () => {
        await result.current.setState({ duration: 1500 });
      });

      expect(result.current.duration).toBe(1500);
      expect(result.current.fps).toBe(30); // Should remain unchanged
    });
  });

  describe('store persistence', () => {
    it('should maintain state across multiple hook instances', () => {
      const { result: result1 } = renderHook(() => useStore());
      
      act(() => {
        result1.current.setViewTimeline(false);
      });

      const { result: result2 } = renderHook(() => useStore());
      
      expect(result2.current.viewTimeline).toBe(false);
    });
  });
});