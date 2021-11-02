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
        console.log(payload);
        let authUrl = "login url";
        let fd;
        if (payload.isSignUp) {
          authUrl = "signup url";
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
        }else{
          fd = {
            usernameOrEmail: payload.usernameOrEmail,
            password: payload.password
          }
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
