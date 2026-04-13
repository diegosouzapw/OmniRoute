import { describe, it } from "node:test";
import assert from "node:assert/strict";

const { parsePaginationParams, buildPaginatedResponse } =
  await import("../../src/shared/types/pagination.ts");

// ---------------------------------------------------------------------------
// parsePaginationParams
// ---------------------------------------------------------------------------

describe("parsePaginationParams", () => {
  it("returns default page=1 and limit=50 when no params are provided", () => {
    const params = new URLSearchParams();
    const result = parsePaginationParams(params);
    assert.equal(result.page, 1);
    assert.equal(result.limit, 50);
  });

  it("parses explicit page and limit values", () => {
    const params = new URLSearchParams({ page: "3", limit: "25" });
    const result = parsePaginationParams(params);
    assert.equal(result.page, 3);
    assert.equal(result.limit, 25);
  });

  it("coerces string numbers correctly", () => {
    const params = new URLSearchParams({ page: "7", limit: "100" });
    const result = parsePaginationParams(params);
    assert.equal(result.page, 7);
    assert.equal(result.limit, 100);
  });

  it("clamps limit to the maximum of 200", () => {
    const params = new URLSearchParams({ page: "1", limit: "500" });
    assert.throws(() => parsePaginationParams(params), {
      name: "ZodError",
    });
  });

  it("rejects limit below the minimum of 1", () => {
    const params = new URLSearchParams({ page: "1", limit: "0" });
    assert.throws(() => parsePaginationParams(params), {
      name: "ZodError",
    });
  });

  it("rejects page below the minimum of 1", () => {
    const params = new URLSearchParams({ page: "0", limit: "10" });
    assert.throws(() => parsePaginationParams(params), {
      name: "ZodError",
    });
  });

  it("rejects negative page values", () => {
    const params = new URLSearchParams({ page: "-5", limit: "10" });
    assert.throws(() => parsePaginationParams(params), {
      name: "ZodError",
    });
  });

  it("rejects negative limit values", () => {
    const params = new URLSearchParams({ page: "1", limit: "-10" });
    assert.throws(() => parsePaginationParams(params), {
      name: "ZodError",
    });
  });

  it("rejects NaN page values", () => {
    const params = new URLSearchParams({ page: "abc", limit: "10" });
    assert.throws(() => parsePaginationParams(params), {
      name: "ZodError",
    });
  });

  it("rejects NaN limit values", () => {
    const params = new URLSearchParams({ page: "1", limit: "xyz" });
    assert.throws(() => parsePaginationParams(params), {
      name: "ZodError",
    });
  });

  it("uses default limit when only page is provided", () => {
    const params = new URLSearchParams({ page: "2" });
    const result = parsePaginationParams(params);
    assert.equal(result.page, 2);
    assert.equal(result.limit, 50);
  });

  it("uses default page when only limit is provided", () => {
    const params = new URLSearchParams({ limit: "10" });
    const result = parsePaginationParams(params);
    assert.equal(result.page, 1);
    assert.equal(result.limit, 10);
  });

  it("accepts the exact maximum limit of 200", () => {
    const params = new URLSearchParams({ page: "1", limit: "200" });
    const result = parsePaginationParams(params);
    assert.equal(result.limit, 200);
  });

  it("accepts the exact minimum page and limit of 1", () => {
    const params = new URLSearchParams({ page: "1", limit: "1" });
    const result = parsePaginationParams(params);
    assert.equal(result.page, 1);
    assert.equal(result.limit, 1);
  });

  it("rejects floating point page values", () => {
    const params = new URLSearchParams({ page: "1.5", limit: "10" });
    assert.throws(() => parsePaginationParams(params), {
      name: "ZodError",
    });
  });
});

// ---------------------------------------------------------------------------
// buildPaginatedResponse
// ---------------------------------------------------------------------------

describe("buildPaginatedResponse", () => {
  it("returns correct structure with empty data array", () => {
    const result = buildPaginatedResponse([], 0, { page: 1, limit: 10 });
    assert.deepEqual(result.data, []);
    assert.equal(result.total, 0);
    assert.equal(result.page, 1);
    assert.equal(result.limit, 10);
    assert.equal(result.totalPages, 0);
  });

  it("calculates totalPages = 1 for a single page of results", () => {
    const data = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const result = buildPaginatedResponse(data, 3, { page: 1, limit: 10 });
    assert.equal(result.totalPages, 1);
    assert.equal(result.total, 3);
    assert.deepEqual(result.data, data);
  });

  it("calculates totalPages correctly for multiple pages", () => {
    const data = [{ id: 1 }, { id: 2 }];
    const result = buildPaginatedResponse(data, 25, { page: 1, limit: 10 });
    assert.equal(result.totalPages, 3);
    assert.equal(result.page, 1);
    assert.equal(result.limit, 10);
  });

  it("returns correct metadata for the last page", () => {
    const data = [{ id: 21 }];
    const result = buildPaginatedResponse(data, 21, { page: 3, limit: 10 });
    assert.equal(result.totalPages, 3);
    assert.equal(result.page, 3);
    assert.equal(result.data.length, 1);
  });

  it("handles a page in the middle of the result set", () => {
    const data = [{ id: 11 }, { id: 12 }, { id: 13 }, { id: 14 }, { id: 15 }];
    const result = buildPaginatedResponse(data, 50, { page: 3, limit: 5 });
    assert.equal(result.totalPages, 10);
    assert.equal(result.page, 3);
    assert.equal(result.limit, 5);
    assert.equal(result.data.length, 5);
  });

  it("rounds up totalPages when total is not evenly divisible by limit", () => {
    const data = [{ id: 1 }];
    const result = buildPaginatedResponse(data, 7, { page: 1, limit: 3 });
    assert.equal(result.totalPages, 3); // ceil(7/3) = 3
  });

  it("preserves the generic type of data items", () => {
    const data = [
      { name: "Alice", age: 30 },
      { name: "Bob", age: 25 },
    ];
    const result = buildPaginatedResponse(data, 100, { page: 1, limit: 2 });
    assert.equal(result.data[0].name, "Alice");
    assert.equal(result.data[1].age, 25);
    assert.equal(result.totalPages, 50);
  });

  it("returns totalPages = 1 when total equals limit exactly", () => {
    const data = Array.from({ length: 10 }, (_, i) => ({ id: i }));
    const result = buildPaginatedResponse(data, 10, { page: 1, limit: 10 });
    assert.equal(result.totalPages, 1);
  });

  it("handles limit of 1 for single-item pages", () => {
    const data = [{ id: 42 }];
    const result = buildPaginatedResponse(data, 100, { page: 42, limit: 1 });
    assert.equal(result.totalPages, 100);
    assert.equal(result.page, 42);
    assert.equal(result.limit, 1);
    assert.equal(result.data.length, 1);
  });

  it("handles large total with small limit", () => {
    const data = [{ id: 1 }, { id: 2 }];
    const result = buildPaginatedResponse(data, 10000, { page: 500, limit: 2 });
    assert.equal(result.totalPages, 5000);
    assert.equal(result.page, 500);
  });
});
