import Vuex from "vuex";
import Cookie from "js-cookie";

let timer;
const createStore = () => {
    return new Vuex.Store({
        state: {
          token: null,
          user: null,
          didAutoLogout: false
        },
        mutations: {
          setToken(state, payload) {
            state.token = payload;
            state.didAutoLogout = false;
          },
          setAutoLogout(state) {
            state.didAutoLogout = true;
          },
          setUser(state, payload) {
            state.user = payload;
          }
        },
        actions: {
          nuxtServerInit(vuexContext, context) {

          },
          async authenticateUser(context, payload) {
            console.log(payload);
            let authUrl = process.env.baseURL + "login";
            let fd;
            if (payload.isSignUp) {
              authUrl = process.env.baseURL + "signup";
              fd = {
                username: payload.username.val,
                password: payload.password.val,
                image_url: payload.avatar.val,
                name: payload.name.val,
                email: payload.email.val,
                gender: payload.gender.val,
                age: parseInt(payload.age.val),
                country: payload.country.val,
                city: payload.city.val
              }
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
                timer = setTimeout(function () {
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
                this.$axios.$get(process.env.baseURL + "profile?user_id=0", {
                  headers: {
                    "Authorization": "Bearer " + context.getters.token
                  }
                }).then(response => {
                  console.log(response.toString());
                  context.commit('setUser', response);
                });
              }
            })
            return await request;
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
            timer = setTimeout(function () {
              context.dispatch("autoLogout");
            }, expiresIn);
            if (token) {
              context.commit("setToken", token);
            }
          }
          ,
          logout(context) {
            localStorage.removeItem("token");
            localStorage.removeItem("tokenExpiration");
            Cookie.remove("jwt");
            Cookie.remove("tokenExpiration");
            clearTimeout(timer);
            context.commit("setToken", null);
          }
          ,
//           autoLogout(context) {
//             context.dispatch("logout");
//             context.commit("setAutoLogout");
//           }
        },
        getters: {
          isAuthenticated(state) {
            return !!state.token;
          }
          ,
          user(state) {
            return state.user;
          }
          ,
          token(state) {
            return state.token;
          }
          ,
          didAutoLogout(state) {
            return state.didAutoLogout;
          }
        }
      }
    )
      ;
  }
;

export default createStore;
