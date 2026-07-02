import { z } from "zod";

/**
 * Pagination query parameters
 */
export interface PaginationParams {
  page: number;
  limit: number;
}

/**
 * Paginated response wrapper for any data type
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Zod schema for validating pagination parameters from URL search params
 */
const PaginationParamsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(200).default(50),
});

/**
 * Parse and validate pagination parameters from URLSearchParams
 * @param searchParams - URL search params containing page and limit
 * @returns Validated pagination parameters
 */
export function parsePaginationParams(searchParams: URLSearchParams): PaginationParams {
  return PaginationParamsSchema.parse({
    page: searchParams.get("page") ?? undefined,
    limit: searchParams.get("limit") ?? undefined,
  });
}

/**
 * Build a paginated response with calculated total pages
 * @param data - Array of items for this page
 * @param total - Total count of items across all pages
 * @param params - Pagination parameters (page and limit)
 * @returns Paginated response object
 */
export function buildPaginatedResponse<T>(
  data: T[],
  total: number,
  params: PaginationParams
): PaginatedResponse<T> {
  return {
    data,
    total,
    page: params.page,
    limit: params.limit,
    totalPages: Math.ceil(total / params.limit),
  };
}
