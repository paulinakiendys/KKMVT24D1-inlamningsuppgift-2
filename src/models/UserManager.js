class UserManager {
  constructor(userDatabase) {
    this.userDatabase = userDatabase;
    this.currentUser = null;
  }

  async register(user) {
    if (user !== null) {
      const dbUser = await this.userDatabase.load(user.id);

      if (dbUser.id === user.id) {
        return "User already exists";
      }
      return await this.userDatabase.save(dbUser);
    }
    return "User is null";
  }

  async login(id, username, password) {
    const dbUser = await this.userDatabase.load(id);

    if (dbUser.username === username && dbUser.password === password) {
      this.currentUser = dbUser;
      return true;
    }
    return false;
  }

  async changePassword(id, oldPassword, newPassword) {
    const dbUser = await this.userDatabase.load(id);

    if (dbUser.password === oldPassword) {
      dbUser.password = newPassword;
      await this.userDatabase.save(dbUser);
      return "Password changed successfully";
    } else {
      throw new Error("Old password is incorrect");
    }
  }
}

module.exports = UserManager;
