/**
 * `wawoff2` ships no type declarations. Only the decompression half is used
 * here, to turn the WOFF2 sources into the TTF buffers resvg needs.
 */
declare module 'wawoff2' {
	const wawoff2: {
		compress(input: Uint8Array): Promise<Uint8Array>;
		decompress(input: Uint8Array): Promise<Uint8Array>;
	};
	export default wawoff2;
}
