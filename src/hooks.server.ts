/// <reference types="@sveltejs/kit" />

import type { Handle } from '@sveltejs/kit';

export const prerender = true;
export const trailingSlash = 'always';

export const handle: Handle = async ({ event, resolve }) => {
	return resolve(event);
};
