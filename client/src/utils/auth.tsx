type SavedData = {
  id: string | null;
  token: string | null;
  refreshToken: string | null;
};

class Auth {
  //login user and store server auth token in localStorage
  login(id: string, token: string, refreshToken: string) {
    localStorage.setItem("userId", id);
    localStorage.setItem("loginToken", token);
    localStorage.setItem("refreshToken", refreshToken);
    window.location.assign(`/dashboard/${id}`);
  }

  // remove token and send user to homepage
  logout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("loginToken");
    localStorage.removeItem("refreshToken");
    window.location.assign("/");
  }

  // return token from localStorage
  getSavedData(): SavedData | null {
    let id = localStorage.getItem("userId");
    let token = localStorage.getItem("loginToken");
    let refreshToken = localStorage.getItem("refreshToken");
    if (!id || !token) {
      // window.location.assign("/login");
      return null;
    } else return { id, token, refreshToken };
  }
}

export default new Auth();
