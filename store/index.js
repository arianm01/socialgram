import Vuex from "vuex";
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
      setAutoLogout(state){
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
          fd.append("age", payload.age.val);
          fd.append("city", payload.country.val);
          fd.append("name", payload.city.val);
        } else {
          fd = {
            username: payload.UsernameOrEmail.val,
            password: payload.password.val
          };
        }
        const request = this.$axios.$post(authUrl, fd);
        request.then(response => {
          console.log(new Date().getTime());
          timer = setTimeout(function() {
            context.dispatch('autoLogout');
          }, (+response.exp*1000-new Date().getTime()));
          localStorage.setItem("token", response.access_token);
          localStorage.setItem("tokenExpiration", Number.parseInt(response.exp));
          context.commit("setToken", response.access_token);
        });
        return request;
      },
      logout(context) {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');

        clearTimeout(timer);

        context.commit('setToken', null);
      },
      autoLogout(context) {
        context.dispatch('logout');
        context.commit('setAutoLogout');
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
