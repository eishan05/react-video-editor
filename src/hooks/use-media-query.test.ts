import { renderHook, act } from "@testing-library/react";
import {
	useMediaQuery,
	useIsLargeScreen,
	useIsMediumScreen,
	useIsSmallScreen,
} from "./use-media-query";

describe("useMediaQuery", () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	it("returns initial match value and updates on change", () => {
		let changeListener: ((e: MediaQueryListEvent) => void) | null = null;
		const mockMql = {
			matches: false,
			media: "(min-width: 768px)",
			addEventListener: (_: string, cb: (e: MediaQueryListEvent) => void) => {
				changeListener = cb;
			},
			removeEventListener: jest.fn(),
		} as any;
		// Override matchMedia for this test
		const matchMediaSpy = jest
			.spyOn(window, "matchMedia")
			.mockReturnValue(mockMql);

		const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));
		expect(result.current).toBe(false);
		expect(matchMediaSpy).toHaveBeenCalledWith("(min-width: 768px)");

		act(() => {
			mockMql.matches = true;
			changeListener &&
				changeListener({ matches: true } as MediaQueryListEvent);
		});

		expect(result.current).toBe(true);
	});

	it("cleans up listener on unmount", () => {
		const removeListener = jest.fn();
		const mockMql = {
			matches: true,
			media: "(min-width: 1024px)",
			addEventListener: jest.fn(),
			removeEventListener: removeListener,
		} as any;
		jest.spyOn(window, "matchMedia").mockReturnValue(mockMql);

		const { unmount } = renderHook(() => useMediaQuery("(min-width: 1024px)"));
		unmount();
		expect(removeListener).toHaveBeenCalled();
	});
});

describe("predefined breakpoint hooks", () => {
	it("useIsLargeScreen uses correct media query", () => {
		const spy = jest.spyOn(window, "matchMedia");
		renderHook(() => useIsLargeScreen());
		expect(spy).toHaveBeenCalledWith("(min-width: 1024px)");
	});

	it("useIsMediumScreen uses correct media query", () => {
		const spy = jest.spyOn(window, "matchMedia");
		renderHook(() => useIsMediumScreen());
		expect(spy).toHaveBeenCalledWith("(min-width: 768px)");
	});

	it("useIsSmallScreen uses correct media query", () => {
		const spy = jest.spyOn(window, "matchMedia");
		renderHook(() => useIsSmallScreen());
		expect(spy).toHaveBeenCalledWith("(max-width: 767px)");
	});
});
