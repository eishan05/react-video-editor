import { createMetadata } from "./metadata";

describe("createMetadata", () => {
	it("merges overrides with defaults", () => {
		const metadata = createMetadata({
			title: "My Title",
			description: "My description",
			openGraph: { type: "article" },
			twitter: { card: "summary" },
		} as any);

		expect(metadata.openGraph).toEqual(
			expect.objectContaining({
				title: "My Title",
				description: "My description",
				url: "https://designcombo.dev",
				images: "/banner.png",
				siteName: "Combo",
				type: "article",
			}),
		);

		expect(metadata.twitter).toEqual(
			expect.objectContaining({
				card: "summary",
				creator: "@Combo",
				title: "My Title",
				description: "My description",
				images: "/banner.png",
			}),
		);

		expect(metadata.icons).toEqual({ icon: "/icon.svg" });
	});

	it("handles missing title and description", () => {
		const metadata = createMetadata({} as any);
		expect(metadata.openGraph.title).toBeUndefined();
		expect(metadata.openGraph.description).toBeUndefined();
		expect(metadata.twitter.title).toBeUndefined();
		expect(metadata.twitter.description).toBeUndefined();
	});
});

describe("baseUrl", () => {
	const originalEnv = process.env.NODE_ENV;

	afterEach(() => {
		process.env.NODE_ENV = originalEnv;
		jest.resetModules();
	});

	it("uses localhost in development", () => {
		process.env.NODE_ENV = "development";
		jest.isolateModules(() => {
			const { baseUrl } = require("./metadata");
			expect(baseUrl.href).toBe("http://localhost:3000/");
		});
	});

	it("uses production url otherwise", () => {
		process.env.NODE_ENV = "production";
		jest.isolateModules(() => {
			const { baseUrl } = require("./metadata");
			expect(baseUrl.href).toBe("https://designcombo.dev/");
		});
	});
});
