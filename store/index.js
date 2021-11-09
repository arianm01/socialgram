import Vuex from "vuex";
import Cookie from "js-cookie";

let timer;
const createStore = () => {
  return new Vuex.Store({
    state: {
      token: null,
      didAutoLogout: false
    },
    mutations: {
      setToken(state, payload) {
        state.token = payload;
        state.didAutoLogout = false;
      },
      setAutoLogout(state) {
        state.didAutoLogout = true;
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {

      },
      initAuth(vuexContext, req) {
        return false;
      },
      authenticateUser(context, payload) {
        console.log(payload);
        let authUrl = process.env.baseURL + "login";
        let fd;
        if (payload.isSignUp) {
          authUrl = process.env.baseURL + "signup";
          fd = new FormData();
          fd.append("image", payload.image, payload.image.name);
          fd.append("name", payload.name.val);
          fd.append("username", payload.username.val);
          fd.append("password", payload.password.val);
          fd.append("email", payload.email.val);
          fd.append("gender", payload.gender.val);
          fd.append("age", Number.parseInt(payload.age.val));
          fd.append("country", payload.country.val);
          fd.append("city", payload.city.val);
          console.log(fd);
        } else {
          fd = {
            username: payload.UsernameOrEmail.val,
            password: payload.password.val
          };
        }
        const request = this.$axios.$post(authUrl, fd);
        request.then(response => {
          if (!payload.isSignUp) {
            timer = setTimeout(function() {
              context.dispatch("autoLogout");
            }, (+response.exp * 1000 - new Date().getTime()));
            localStorage.setItem("token", response.access_token);
            localStorage.setItem("tokenExpiration", Number.parseInt(response.exp));
            context.commit("setToken", response.access_token);
            Cookie.set("jwt", response.access_token);
            Cookie.set(
              "tokenExpiration",
              Number.parseInt(response.exp)
            );
          }
        });
        return request;
      },
      tryLogin(context, req) {
        let token;
        let tokenExpiration;
        if (req) {
          if (!req.headers.cookie) {
            return;
          }
          const jwtCookie = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("jwt="));
          if (!jwtCookie) {
            return;
          }
          token = jwtCookie.split("=")[1];
          tokenExpiration = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("tokenExpiration="))
            .split("=")[1];
        } else if (process.client) {
          token = localStorage.getItem("token");
          tokenExpiration = localStorage.getItem("tokenExpiration");
        }
        const expiresIn = +tokenExpiration * 1000 - new Date().getTime();
        if (expiresIn < 0) {
          return;
        }
        timer = setTimeout(function() {
          context.dispatch("autoLogout");
        }, expiresIn);
        if (token) {
          context.commit("setToken", token);
        }
      },
      logout(context) {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiration");

        clearTimeout(timer);

        context.commit("setToken", null);
      },
      autoLogout(context) {
        context.dispatch("logout");
        context.commit("setAutoLogout");
      }
    },
    getters: {
      isAuthenticated(state) {
        return !!state.token;
      },
      token(state) {
        return state.token;
      },
      didAutoLogout(state) {
        return state.didAutoLogout;
      }
    }
  });
};

export default createStore;
