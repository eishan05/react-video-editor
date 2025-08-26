import { frameToTimeString, timeToString, getSafeCurrentFrame } from './time';

describe('time utilities', () => {
  describe('frameToTimeString', () => {
    it('should convert frames to time string for minutes and seconds only', () => {
      expect(frameToTimeString({ frame: 0 }, { fps: 30 })).toBe('00:00');
      expect(frameToTimeString({ frame: 30 }, { fps: 30 })).toBe('00:01');
      expect(frameToTimeString({ frame: 90 }, { fps: 30 })).toBe('00:03');
      expect(frameToTimeString({ frame: 1800 }, { fps: 30 })).toBe('01:00');
    });

    it('should include hours when necessary', () => {
      expect(frameToTimeString({ frame: 108000 }, { fps: 30 })).toBe('1:00:00');
      expect(frameToTimeString({ frame: 109800 }, { fps: 30 })).toBe('1:01:00');
      expect(frameToTimeString({ frame: 111600 }, { fps: 30 })).toBe('1:02:00');
    });

    it('should handle different fps values', () => {
      expect(frameToTimeString({ frame: 60 }, { fps: 60 })).toBe('00:01');
      expect(frameToTimeString({ frame: 24 }, { fps: 24 })).toBe('00:01');
      expect(frameToTimeString({ frame: 25 }, { fps: 25 })).toBe('00:01');
    });

    it('should handle fractional frames', () => {
      expect(frameToTimeString({ frame: 15 }, { fps: 30 })).toBe('00:00');
      expect(frameToTimeString({ frame: 45 }, { fps: 30 })).toBe('00:01');
    });
  });

  describe('timeToString', () => {
    it('should convert milliseconds to time string for minutes and seconds only', () => {
      expect(timeToString({ time: 0 })).toBe('00:00');
      expect(timeToString({ time: 1000 })).toBe('00:01');
      expect(timeToString({ time: 3000 })).toBe('00:03');
      expect(timeToString({ time: 60000 })).toBe('01:00');
    });

    it('should include hours when necessary', () => {
      expect(timeToString({ time: 3600000 })).toBe('1:00:00');
      expect(timeToString({ time: 3660000 })).toBe('1:01:00');
      expect(timeToString({ time: 3720000 })).toBe('1:02:00');
    });

    it('should handle fractional seconds', () => {
      expect(timeToString({ time: 1500 })).toBe('00:01');
      expect(timeToString({ time: 500 })).toBe('00:00');
    });
  });

  describe('getSafeCurrentFrame', () => {
    it('should return 0 for null playerRef', () => {
      expect(getSafeCurrentFrame(null)).toBe(0);
    });

    it('should return 0 for undefined playerRef', () => {
      expect(getSafeCurrentFrame(undefined)).toBe(0);
    });

    it('should return 0 for playerRef without current', () => {
      const playerRef = { current: null };
      expect(getSafeCurrentFrame(playerRef)).toBe(0);
    });

    it('should return current frame for valid playerRef', () => {
      const playerRef = {
        current: {
          getCurrentFrame: jest.fn().mockReturnValue(150)
        }
      };
      expect(getSafeCurrentFrame(playerRef)).toBe(150);
    });

    it('should return 0 for non-finite frame values', () => {
      const playerRef = {
        current: {
          getCurrentFrame: jest.fn().mockReturnValue(NaN)
        }
      };
      expect(getSafeCurrentFrame(playerRef)).toBe(0);
    });

    it('should return 0 for infinite frame values', () => {
      const playerRef = {
        current: {
          getCurrentFrame: jest.fn().mockReturnValue(Infinity)
        }
      };
      expect(getSafeCurrentFrame(playerRef)).toBe(0);
    });

    it('should return 0 for negative frame values', () => {
      const playerRef = {
        current: {
          getCurrentFrame: jest.fn().mockReturnValue(-5)
        }
      };
      expect(getSafeCurrentFrame(playerRef)).toBe(0);
    });

    it('should handle errors gracefully', () => {
      const playerRef = {
        current: {
          getCurrentFrame: jest.fn().mockImplementation(() => {
            throw new Error('Test error');
          })
        }
      };
      expect(getSafeCurrentFrame(playerRef)).toBe(0);
    });

    it('should handle non-number return values', () => {
      const playerRef = {
        current: {
          getCurrentFrame: jest.fn().mockReturnValue('invalid')
        }
      };
      expect(getSafeCurrentFrame(playerRef)).toBe(0);
    });
  });
});