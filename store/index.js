import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: {
      token: null
    },
    mutations: {},
    actions: {
      nuxtServerInit(vuexContext, context) {

      },
      initAuth(vuexContext, req) {
        return false;
      },
      authenticateUser(context, payload) {
        let authUrl = "login url";
        let fd;
        if (payload.isSignUp) {
          authUrl = "signup url";
          fd = new FormData();
          fd.append("image", payload.image, payload.image.name);
          fd.append("name", payload.user.name);
          fd.append("username", payload.user.username);
          fd.append("password", payload.user.password);
          fd.append("email", payload.user.email);
          fd.append("gender", payload.user.gender);
          fd.append("age", payload.user.age);
          fd.append("city", payload.user.country);
          fd.append("name", payload.user.city);
        }
        return this.$axios.$post(authUrl, fd, {
          onUploadProgress: uploadEvent => {
            // console.log('upload: '+ Math.round(uploadEvent.loaded / uploadEvent.total * 100) + "%");
          }
        }).then(res => {
          if (!res.ok) {
            // show some error
            return;
          }
          if (!payload.isSignUp) {
            context.commit("setToken", res.token);
            localStorage.setItem("token", res.token);
            localStorage.setItem("tokenExpiration", new Date().getDate() + Number.parseInt(res.expireDate) * 1000);
          }
        }).catch(e => console.log(e));
      }
    },
    getters: {
      isAuthenticated() {
        return false;
      }
    }
  });
};

export default createStore;
