/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client-image" />

declare module "*.glb" {
	const src: string;
	export default src;
}
