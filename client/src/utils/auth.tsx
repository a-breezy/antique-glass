class Auth {
  //login user and store server auth token in localStorage
  login(token: string) {
    console.log(token);
    localStorage.setItem("loginToken", token);
    window.location.assign("/dashboard");
  }

  // remove token and send user to homepage
  logout() {
    localStorage.removeItem("loginToken")
    window.location.assign("/")
  }

  // return token from localStorage
  getToken() {
    return localStorage.getItem("loginToken")
  }
}

export default new Auth();
