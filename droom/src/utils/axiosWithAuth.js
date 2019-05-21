export const fakeAuth = {
    isAuthenticated: false,
    authenticate(cred,login,cb) {
      login(cred).then(cb);
    },
    signout(cb) {
      this.isAuthenticated = false;
      localStorage.setItem("userToken", "")
      cb();
    }
  };