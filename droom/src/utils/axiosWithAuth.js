export const fakeAuth = {
    isAuthenticated: false,
    authenticate(cred,login) {
      login(cred);
    },
    signout(cb) {
      this.isAuthenticated = false;
      setTimeout(cb, 100);
    }
  };