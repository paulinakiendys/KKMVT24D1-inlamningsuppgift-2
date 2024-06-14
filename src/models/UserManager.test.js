const axios = require("axios");
const User = require("./User");
const UserDatabase = require("./UserDatabase");
const UserManager = require("./UserManager");

jest.mock("axios");

describe("UserManager", () => {
  let mockData;
  let userManager;

  beforeEach(() => {
    mockData = new User(1, "testuser", "password");
    const userDatabase = new UserDatabase(axios);
    userManager = new UserManager(userDatabase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should register a new user", async () => {
    axios.get.mockResolvedValue({ data: new User(null, null, null) });
    axios.post.mockResolvedValue({ data: "Successfully registered user" });

    const response = await userManager.register(mockData);

    expect(response).toBe("Successfully registered user");
  });

  it("should not register an existing user", async () => {
    axios.get.mockResolvedValue({ data: mockData });

    const response = await userManager.register(mockData);

    expect(response).toBe("User already exists");
  });

  it("should not register when user is null", async () => {
    const response = await userManager.register(null);

    expect(response).toBe("User is null");
  });

  it("should login a user", async () => {
    axios.get.mockResolvedValue({ data: mockData });

    const response = await userManager.login(1, "testuser", "password");

    expect(response).toBeTruthy();
    expect(userManager.currentUser.username).toBe("testuser");
    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  it("should throw an error when logging in with wrong password", async () => {
    axios.get.mockResolvedValue({ data: mockData });

    const response = await userManager.login(1, "testuser", "wrongpassword");

    expect(response).toBeFalsy();
    expect(userManager.currentUser).toBeNull();
    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  it("should change the password of a user", async () => {
    axios.get.mockResolvedValue({ data: mockData });
    axios.post.mockResolvedValue({ data: mockData });

    const response = await userManager.changePassword(
      1,
      "password",
      "newpassword"
    );

    expect(response).toBe("Password changed successfully");
    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalledTimes(1);
  });

  it("should throw an error when failing to change the password of a user", async () => {
    axios.get.mockResolvedValue({ data: mockData });

    await expect(
      userManager.changePassword(1, "wrongpassword", "newpassword")
    ).rejects.toThrow("Old password is incorrect");

    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.post).not.toHaveBeenCalled();
  });
});
