type SavedData = {
  id: string;
  token: string;
};

class Auth {
  //login user and store server auth token in localStorage
  login(id: string, token: string) {
    console.log(token);
    localStorage.setItem("userId", id);
    localStorage.setItem("loginToken", token);
    window.location.assign(`/dashboard/${id}`);
  }

  // remove token and send user to homepage
  logout() {
    localStorage.removeItem("loginToken");
    window.location.assign("/");
  }

  // return token from localStorage
  getSavedData(): SavedData | null {
    let id = localStorage.getItem("userId");
    let token = localStorage.getItem("loginToken");
    if (!id || !token) {
      //  window.location.assign("/login");
      return null;
    } else return { id, token };
  }
}

export default new Auth();
