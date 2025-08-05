import { renderHook, waitFor } from "@testing-library/react-native";
import { useFetchProducts } from "./useFetchProducts";
import { getMockApiResponse, mockModelName } from "@test-utils/mock-data";

describe("useFetchProducts", () => {
  const mockApiResponse = getMockApiResponse();

  beforeEach(() => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockApiResponse),
      } as Response)
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should return initial state", () => {
    const { result } = renderHook(() => useFetchProducts(""));

    expect(result.current.products).toEqual([]);
    expect(result.current.title).toBe("");
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should fetch products and update state", async () => {
    const { result } = renderHook(() => useFetchProducts(mockModelName));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBeNull();

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.products).toHaveLength(1);
    expect(result.current.products).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          offer_id: expect.any(String),
          name: expect.any(String),
          price: expect.any(Number),
          currency_symbol: expect.any(String),
          link: expect.any(String),
          image: expect.any(String),
          merchant: expect.objectContaining({
            name: expect.any(String),
            logo_url: expect.any(String),
          }),
        }),
      ])
    );
    expect(result.current.title).toBe(mockApiResponse.widget.data.title);
    expect(result.current.error).toBeNull();
  });

  it("should handle fetch errors", async () => {
    jest.spyOn(global, "fetch").mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 404,
      } as Response)
    );

    const { result } = renderHook(() => useFetchProducts("invalidModel"));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBeNull();

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.products).toEqual([]);
    expect(result.current.title).toBe("");
    expect(result.current.error).toBe("HTTP error! status: 404");
  });
});
    