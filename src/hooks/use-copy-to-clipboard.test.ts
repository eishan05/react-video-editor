import { renderHook, act } from '@testing-library/react';
import { useCopyToClipboard } from './use-copy-to-clipboard';

// Mock sonner toast
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock navigator.clipboard
const mockWriteText = jest.fn();
Object.assign(navigator, {
  clipboard: {
    writeText: mockWriteText,
  },
});

// Mock setTimeout and clearTimeout
jest.useFakeTimers();

describe('useCopyToClipboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockWriteText.mockClear();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.useFakeTimers();
  });

  describe('initial state', () => {
    it('should initialize with isCopied as false', () => {
      const { result } = renderHook(() =>
        useCopyToClipboard({ text: 'test text' })
      );

      expect(result.current.isCopied).toBe(false);
      expect(typeof result.current.handleCopy).toBe('function');
    });
  });

  describe('handleCopy function', () => {
    it('should copy text to clipboard and show success toast', async () => {
      mockWriteText.mockResolvedValue(undefined);
      const { toast } = require('sonner');

      const { result } = renderHook(() =>
        useCopyToClipboard({ text: 'Hello World' })
      );

      await act(async () => {
        result.current.handleCopy();
      });

      expect(mockWriteText).toHaveBeenCalledWith('Hello World');
      expect(toast.success).toHaveBeenCalledWith('Copied to clipboard!');
      expect(result.current.isCopied).toBe(true);
    });

    it('should use custom copy message', async () => {
      mockWriteText.mockResolvedValue(undefined);
      const { toast } = require('sonner');
      const customMessage = 'Text copied successfully!';

      const { result } = renderHook(() =>
        useCopyToClipboard({ 
          text: 'test', 
          copyMessage: customMessage 
        })
      );

      await act(async () => {
        result.current.handleCopy();
      });

      expect(toast.success).toHaveBeenCalledWith(customMessage);
    });

    it('should handle clipboard write failure', async () => {
      mockWriteText.mockRejectedValue(new Error('Clipboard error'));
      const { toast } = require('sonner');

      const { result } = renderHook(() =>
        useCopyToClipboard({ text: 'test text' })
      );

      await act(async () => {
        result.current.handleCopy();
      });

      expect(mockWriteText).toHaveBeenCalledWith('test text');
      expect(toast.error).toHaveBeenCalledWith('Failed to copy to clipboard.');
      expect(result.current.isCopied).toBe(false);
    });

    it('should reset isCopied after timeout', async () => {
      mockWriteText.mockResolvedValue(undefined);

      const { result } = renderHook(() =>
        useCopyToClipboard({ text: 'test text' })
      );

      await act(async () => {
        result.current.handleCopy();
      });

      expect(result.current.isCopied).toBe(true);

      // Fast-forward time
      act(() => {
        jest.advanceTimersByTime(2000);
      });

      expect(result.current.isCopied).toBe(false);
    });

    it('should clear existing timeout when copying again', async () => {
      mockWriteText.mockResolvedValue(undefined);
      const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');

      const { result } = renderHook(() =>
        useCopyToClipboard({ text: 'test text' })
      );

      // First copy
      await act(async () => {
        result.current.handleCopy();
      });

      expect(result.current.isCopied).toBe(true);

      // Second copy before timeout
      await act(async () => {
        result.current.handleCopy();
      });

      expect(clearTimeoutSpy).toHaveBeenCalled();
      expect(result.current.isCopied).toBe(true);

      clearTimeoutSpy.mockRestore();
    });

    it('should handle multiple rapid copy calls', async () => {
      mockWriteText.mockResolvedValue(undefined);

      const { result } = renderHook(() =>
        useCopyToClipboard({ text: 'test text' })
      );

      // Multiple rapid calls
      await act(async () => {
        result.current.handleCopy();
        result.current.handleCopy();
        result.current.handleCopy();
      });

      expect(mockWriteText).toHaveBeenCalledTimes(3);
      expect(result.current.isCopied).toBe(true);
    });
  });

  describe('text updates', () => {
    it('should copy updated text when text prop changes', async () => {
      mockWriteText.mockResolvedValue(undefined);

      const { result, rerender } = renderHook(
        ({ text }) => useCopyToClipboard({ text }),
        { initialProps: { text: 'initial text' } }
      );

      // Copy initial text
      await act(async () => {
        result.current.handleCopy();
      });

      expect(mockWriteText).toHaveBeenCalledWith('initial text');

      // Update text and copy again
      rerender({ text: 'updated text' });

      await act(async () => {
        result.current.handleCopy();
      });

      expect(mockWriteText).toHaveBeenCalledWith('updated text');
    });
  });

  describe('edge cases', () => {
    it('should handle empty text', async () => {
      mockWriteText.mockResolvedValue(undefined);

      const { result } = renderHook(() =>
        useCopyToClipboard({ text: '' })
      );

      await act(async () => {
        result.current.handleCopy();
      });

      expect(mockWriteText).toHaveBeenCalledWith('');
    });

    it('should handle very long text', async () => {
      mockWriteText.mockResolvedValue(undefined);
      const longText = 'a'.repeat(10000);

      const { result } = renderHook(() =>
        useCopyToClipboard({ text: longText })
      );

      await act(async () => {
        result.current.handleCopy();
      });

      expect(mockWriteText).toHaveBeenCalledWith(longText);
    });

    it('should handle special characters in text', async () => {
      mockWriteText.mockResolvedValue(undefined);
      const specialText = 'Text with\nnewlines\tand\ttabs & symbols!@#$%';

      const { result } = renderHook(() =>
        useCopyToClipboard({ text: specialText })
      );

      await act(async () => {
        result.current.handleCopy();
      });

      expect(mockWriteText).toHaveBeenCalledWith(specialText);
    });
  });
});