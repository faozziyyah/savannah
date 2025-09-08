
import { addPost } from "../utils/posts";

describe("addPost", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("successfully creates a post", async () => {
    const mockPayload = { title: "Test Post", body: "This is a test", userId: "1" };
    const mockResponse = { id: "123", ...mockPayload };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await addPost(mockPayload);
    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3001/posts",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
    );
  });

  it("throws an error when API fails", async () => {
    const mockPayload = { title: "Fail Post", body: "Bad request", userId: "1" };

    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    });

    await expect(addPost(mockPayload)).rejects.toThrow("Failed to create post");
  });
});
