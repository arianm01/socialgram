import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: {
      token: null
    },
    mutations: {},
    actions: {
      nuxtServerInit(vuexContext, context){

      },
      initAuth(vuexContext, req){
        return false
      }
    },
    getters: {
      isAuthenticated(){
       return false;
      }
    }
  });
};

export default createStore ;
