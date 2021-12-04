<template>
  <div class="banner w-2/3">
    <form @submit.prevent="onLogin">
      <div class="right-side h-screen flex flex-col">
        <div class="flex flex-row justify-end english1 .flex-1"><h1 class="english">English(</h1><img
          src="../../assets/pics/contents.png" alt="english" width="30" />)
        </div>
        <h1 class="title">Login to your Account</h1>
        <div class="flex flex-row justify-between btns">
          <div class="css-button-sliding-to-left--blue" @click="$emit('warning')">
            <div class="flex flex-row">
              <img src="../../assets/pics/icons8-google-50.png" class="w-10 g-span" alt="google" />
              <p class="Goo-p">continue with Google</p>
            </div>
          </div>
          <div class="css-button-sliding-to-left--blue" @click="$emit('warning')">
            <div class="flex flex-row">
              <img src="../../assets/pics/icons8-facebook-50.png" class="w-10 g-span" alt="facebook" />
              <p class="Goo-p">continue with facebook</p>
            </div>
          </div>
        </div>
        <h1 style="align-self: center; font-size: 25px;" class="m-5">-OR-</h1>
        <div class="flex flex-row justify-center mt-7">
          <input type="text" required v-model.trim="user.UsernameOrEmail.val" placeholder="Username or email"
                 style="width:50%;" :class="{input_box: user.UsernameOrEmail.isValid, invalid: !user.UsernameOrEmail.isValid}">
        </div>
        <div class="flex flex-row justify-center mt-7">
          <input type="password" required v-model.trim="user.password.val" placeholder="Password" style="width:50%;"
                 :class="{input_box: user.password.isValid, invalid: !user.password.isValid}">
        </div>
        <button class="css-button-green place-self-center" type="submit">
          Login
        </button>
        <div class="mt-7 log">
          don't have an account ? <span @click="$emit('toggle')" class="login" style="display:block;">Sign up</span>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
export default {
  name: "Login",
  data() {
    return {
      user: {
        UsernameOrEmail: {
          val: "",
          isValid: true
        },
        password: {
          val: "",
          isValid: true
        }
      }
    };
  },
  methods: {
    onLogin() {
      this.$store.dispatch("authenticateUser", {
        ...this.user,
        isSignUp: false
      }).then(() => {
        this.$router.push('/');
      }).catch(response => {
          if(response.response)
            Swal.fire({
                title: 'sth went wrong :(',
                text: response.response.data.description,
                icon: 'error',
                confirmButtonText: 'OK'
              });
      });
    }
  }
};
</script>

<style scoped>
.right-side {
  background-color: #21343b;
  border-radius: 50px 0 0 50px;
  padding: 2%;
  z-index: 1;
}

.btns {
  justify-content: space-around;
  margin-top: 3%;
}

.title {
  text-align: center;
  align-self: center;
  font-size: 35px;
}

.css-button-sliding-to-left--blue {
  min-width: 130px;
  height: 55px;
  color: #fff;
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  outline: none;
  border-radius: 5px;
  z-index: 0;
  font-size: 25px;
  background: #21343b;
  overflow: hidden;
  border: 2px solid #fff;
}

.css-button-sliding-to-left--blue:hover {
  color: #21343b;
}

.css-button-sliding-to-left--blue:hover:after {
  width: 100%;
}

.css-button-sliding-to-left--blue:after {
  content: "";
  position: absolute;
  z-index: -1;
  transition: all 0.3s ease;
  left: 0;
  top: 0;
  width: 0;
  height: 100%;
  background: #fff;
}


.css-button-green {
  align-self: center;
  justify-self: center;
  min-width: 130px;
  width: 70%;
  height: 50px;
  color: #21343b;
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  outline: none;
  border-radius: 5px;
  z-index: 0;
  margin-top: 30px;
  font-size: 25px;
  background: #b0d8da;
  overflow: hidden;
  text-align: center;
  border: 2px solid #b0d8da;
}

.css-button-green:hover {
  color: #b0d8da;
}

.css-button-green:hover:after {
  width: 100%;
}

.css-button-green:after {
  content: "";
  position: absolute;
  z-index: -1;
  transition: all 0.3s ease;
  left: 0;
  top: 0;
  width: 0;
  height: 100%;
  background: #21343b;
}


.banner {
  background-color: #b0d8da;
  z-index: 10;
  color: #fff;
}

.input_box {
  background: #21343b;
  border-style: none;
  outline: none;
  border-bottom: 1px solid white;
  width: 35%;
  color: #fff;
  font-size: 20px;
}

.login {
  color: blue;
  cursor: pointer;
}

.log {
  width: 70%;
  align-self: center;
  font-size: 20px;
}

@media only screen and (max-width: 980px) {
  /* For mobile phones: */
  .css-button-sliding-to-left--blue {
    font-size: 20px;
    min-width: 105px;
    height: 45px;
  }

  .g-span {
    width: 13%;
  }
}

@media only screen and (max-width: 825px) {
  /* For mobile phones: */
  .css-button-sliding-to-left--blue {
    font-size: 18px;
    height: 50px;
    border: none;
    min-width: fit-content;
  }

  .css-button-sliding-to-left--blue:after {
    background-color: #21343b;
  }

  .btns {
    justify-content: space-evenly;
  }

  .english1 {
    display: none;
  }

  .Goo-p {
    display: none;
  }

  .title {
    font-size: 30px;
  }

  .right-side {
    width: 100%;
    /*height: fit-content;*/
    min-height: 100%;
    border-radius: 50px 50px 0 0;
  }

  .banner {
    width: 100%;
    /*min-height: min-content;*/
  }

  .banner {
    height: 100%;
    background-color: #21343b;
  }

  .right-side {
    height: fit-content;
  }

  .g-span {
    width: 85%;
  }
}
</style>
