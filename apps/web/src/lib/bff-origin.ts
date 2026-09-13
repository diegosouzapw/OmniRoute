/**
 * BFF (Backend-for-Frontend) base URL.
 *
 * In the SvelteKit app all data-fetching goes through the BFF layer instead
 * of calling internal Next.js API routes directly.  The value is read from
 * the `BFF_API_URL` environment variable at build/runtime; when unset it
 * defaults to the same-origin so that the BFF is assumed to be co-located
 * with the SvelteKit server.
 */
export const bffApiUrl: string = import.meta.env.VITE_BFF_API_URL ?? "";
