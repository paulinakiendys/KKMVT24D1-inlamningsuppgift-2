const axios = require("axios");
const UserDatabase = require("./UserDatabase");
const User = require("./User");

jest.mock("axios");

describe("UserDatabase", () => {
  let userDatabase;
  let mockResponse;
  let mockError;

  beforeEach(() => {
    userDatabase = new UserDatabase(axios);
    mockError = new Error("Error");
    mockResponse = { id: 1, username: "testuser", password: "password" };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should save a user", async () => {
    axios.post.mockResolvedValue({ data: mockResponse });

    const response = await userDatabase.save(
      new User(1, "testuser", "password")
    );
    expect(response).toEqual(mockResponse);
    expect(axios.post).toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalledTimes(1);
  });

  it("should throw an error when failing to save a user", async () => {
    axios.post.mockRejectedValue(mockError);

    await expect(
      userDatabase.save({ username: "testuser", password: "password" })
    ).rejects.toThrow(mockError);
    expect(axios.post).toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalledTimes(1);
  });

  it("should get a user", async () => {
    axios.get.mockResolvedValue({ data: mockResponse });
    const response = await userDatabase.load(1);
    expect(response).toEqual(mockResponse);
    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  it("should throw an error when failing to get a user", async () => {
    axios.get.mockRejectedValue(mockError);
    await expect(userDatabase.load(1)).rejects.toThrow(mockError);
    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});
