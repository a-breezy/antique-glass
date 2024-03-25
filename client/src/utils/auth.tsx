class Auth {
  //login user and store server auth token in localStorage
  login(id: string, token: string) {
    console.log(token);
    localStorage.setItem("userId", id);
    localStorage.setItem("loginToken", token);
    window.location.assign("/dashboard");
  }

  // remove token and send user to homepage
  logout() {
    localStorage.removeItem("loginToken");
    window.location.assign("/");
  }

  // return token from localStorage
  getSavedData() {
    let id = localStorage.getItem("userId");
    let token = localStorage.getItem("loginToken");
    if (!id || !token) return window.location.assign("/login");
    else return { id, token };
  }
}

export default new Auth();
