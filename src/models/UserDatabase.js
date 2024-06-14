class UserDatabase {
  constructor(axios) {
    this.axios = axios;
  }

  async save(user) {
    // This function will be mocked in tests
    try {
      const response = await this.axios.post(" ");
      return response.data;
    } catch (error) {
      console.error("Error: ", error);
      throw error;
    }
  }

  async load(id) {
    // This function will be mocked in tests
    try {
      const response = await this.axios.get(" ");
      return response.data;
    } catch (error) {
      console.error("Error: ", error);
      throw error;
    }
  }
}

module.exports = UserDatabase;
