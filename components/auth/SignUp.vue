<template>
  <div class="banner w-2/3">
    <form @submit.prevent="Submit">
      <div class="right-side h-screen flex flex-col">
        <div class="flex flex-row justify-end english1 .flex-1"><h1 class="english">English(</h1><img
          src="../../assets/pics/contents.png" alt="english" width="30" />)
        </div>
        <h1 class="title justify-self-center">Create Account</h1>
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
        <div class="flex flex-row justify-start">
          <h1 class="txt-avatar">Add Your Avatar</h1>
          <input type="file" class="avatar" accept="image/*" id="file-input" @change="onFileSelected" required>
        </div>
        <div class="flex flex-row justify-between mt-7">
          <input type="text" v-model.trim="user.name.val" id="name-input" placeholder="Name" required
                 :class="{input_box: user.name.isValid, invalid: !user.name.isValid, 'ml-7': true}"
                 @blur="clearValidity('name')">
          <input type="text" v-model.trim="user.username.val" placeholder="Username" @change="isUsernameUniqe" required
                 style="width:39%;"
                 :class="{input_box: user.username.isValid, invalid: !user.username.isValid, 'mr-10': true}">
        </div>
        <div class="flex flex-row justify-between mt-7">
          <input type="email" v-model.trim="user.email.val" placeholder="Email" @change="isEmailUniqe" required
                 :class="{input_box: user.email.isValid, invalid: !user.email.isValid, 'ml-7': true}">
          <div class="flex flex-row justify-around">
            <input type="text" v-model.trim="user.gender.val" placeholder="Gender" required
                   :class="{input_box: user.gender.isValid, invalid: !user.gender.isValid}"
                   @blur="clearValidity('gender')">
            <input type="number" v-model.trim="user.age.val" placeholder="Age" required
                   :class="{input_box: user.age.isValid, invalid: !user.age.isValid, 'mr-2': true}"
                   @blur="clearValidity('age')">
          </div>
        </div>
        <div class="flex flex-row justify-between mt-7">
          <input type="password" v-model.trim="user.password.val" placeholder="Password" required
                 :class="{input_box: user.password.isValid, invalid: !user.password.isValid, 'ml-7': true}"
                 @blur="clearValidity('password')">
          <div class="flex flex-row justify-around">
            <input type="text" v-model.trim="user.country.val" placeholder="Country" required
                   :class="{input_box: user.country.isValid, invalid: !user.country.isValid}"
                   @blur="clearValidity('country')">
            <input type="text" v-model.trim="user.city.val" placeholder="City" required
                   :class="{input_box: user.city.isValid, invalid: !user.city.isValid, 'mr-2': true}"
                   @blur="clearValidity('city')">
          </div>
        </div>
        <button class="css-button-sliding-to-left--green place-self-center" type="submit">
          Create Account
        </button>
        <div class="log">
          Already have an account ? <span @click="$emit('toggle')" class="login">Login</span>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "SignIn",
  data() {
    return {
      selectedFile: null,
      user: {
        name: {
          val: "",
          isValid: true
        },
        username: {
          val: "",
          isValid: true
        },
        password: {
          val: "",
          isValid: true
        },
        email: {
          val: "",
          isValid: true
        },
        gender: {
          val: "",
          isValid: true
        },
        age: {
          val: null,
          isValid: true
        },
        city: {
          val: "",
          isValid: true
        },
        country: {
          val: "",
          isValid: true
        }
      },
      formIsinValid: ""
    };
  },
  methods: {
    clearValidity(input) {
      this.user[input].isValid = true;
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    isUsernameUniqe(event) {
      this.user.username.isValid = true;
      this.$store.dispatch("authenticateUser", {
        UsernameOrEmail: {
          val: event.path[0].value
        },
        password: {
          val: "notImportant"
        },
        isSignUp: false
      }).then()
        .catch(res => {
          if (res.response.data.description.includes("password")) {
            this.user.username.isValid = false;
          }
        });
    },
    isEmailUniqe(event) {
      this.user.email.isValid = true;
      this.$store.dispatch("authenticateUser", {
        UsernameOrEmail: {
          val: event.path[0].value
        },
        password: {
          val: "notImportant"
        },
        isSignUp: false
      }).then()
        .catch(res => {
          if (res.response.data.description.includes("password")) {
            this.user.email.isValid = false;
          }
        });
    },
    Submit() {
      if (this.Validate()) {
        console.log({ ...this.user, image: this.selectedFile });
        this.$store.dispatch("authenticateUser", {
          ...this.user,
          image: this.selectedFile,
          isSignUp: true
        }).then(response => {
          Swal.fire(
            {
              title: 'welcome ' + response.name,
              text: 'you have signed up successfully',
              icon: "success",
              confirmButtonText: "let's go"
            });
          this.$emit('toggle');
        }).catch(response => {
            if (response.response)
              Swal.fire(
                {
                  title: 'sth went wrong :(',
                  text: response.response.data.description,
                  icon: 'error',
                  confirmButtonText: 'OK'
                });
          });
      }else{
        Swal.fire(
          {
            title: 'sth went wrong :(',
            text: this.formIsinValid,
            icon: 'error',
            confirmButtonText: 'OK'
          }
        )
      }
    },
    Validate() {
      this.formIsinValid = ""
      if (!this.user.name.val.match(/^[A-Za-z ]+$/)) {
        this.user.name.isValid = false;
        this.formIsinValid = "your name must be only letters";
        return false;
      }
      if (!this.user.username.val.match(/^(?=.{3,})/) || !this.user.username.isValid) {
        this.user.username.isValid = false;
        this.formIsinValid = "this username is not acceptable";
        return false;
      }
      if (!this.user.email.val.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        this.user.email.isValid = false;
        this.formIsinValid = "this email address is not acceptable";
        return false;
      }
      if (!this.user.age.val || this.user.age.val < 0) {
        this.user.age.isValid = false;
        this.formIsinValid = "your age must be a positive number";
        return false;
      }
      if (!(this.user.gender.val === "male" || this.user.gender.val === "female")) {
        this.user.gender.isValid = false;
        this.formIsinValid = "your gender can be male or female";
        return false;
      }
      if (!this.user.password.val.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/) || !this.user.password.isValid) {
        this.user.password.isValid = false;
        this.formIsinValid = "your password must contain a capital letter, small letter, number, a sign and be at least 8 character";
        return false;
      }
      if (!this.user.country.val.match(/^[A-Za-z]+$/)) {
        this.user.country.isValid = false;
        this.formIsinValid = "your country name must be only letters";
        return false;
      }
      if (!this.user.city.val.match(/^[A-Za-z]+$/)) {
        this.user.city.isValid = false;
        this.formIsinValid = "your city name must be only letters";
        return false;
      }
      return true;
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

.invalid {
  border: 1px solid red;
  outline: none;
  background: #21343b;
  width: 35%;
  color: #fff;
  font-size: 20px;
}

.btns {
  justify-content: space-around;
  margin-top: 3%;
}

.txt-avatar {
  font-size: 20px;
  align-self: center;
  margin: 6px 3% 3%;
}

.avatar {
  cursor: pointer;
  border-radius: 5px;
  border: 2px solid #fff;
  padding: 5px 10px;
  height: 45px;
}

.title {
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


.css-button-sliding-to-left--green {
  align-self: center;
  justify-self: center;
  min-width: 130px;
  min-height: 50px;
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

.css-button-sliding-to-left--green:hover {
  color: #b0d8da;
}

.css-button-sliding-to-left--green:hover:after {
  width: 100%;
}

.css-button-sliding-to-left--green:after {
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
  outline: none;
  border-style: none;
  border-bottom: 1px solid white;
  width: 35%;
  color: #fff;
  font-size: 20px;
}

.login {
  margin-left: 2%;
  color: blue;
  cursor: pointer;
}

.log {
  margin-top: 2%;
  display: flex;
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

  .txt-avatar {
    font-size: 18px;
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

  .right-side {
    width: 100%;
    min-height: 100%;
    border-radius: 50px 50px 0 0;
  }

  .banner {
    width: 100%;
  }

  .g-span {
    width: 85%;
  }

  .txt-avatar {
    font-size: 16px;
  }

  .title {
    font-size: 30px;
  }

  .banner {
    height: 100%;
    background-color: #21343b;
  }

  .right-side {
    height: fit-content;
  }
}

@media only screen and (max-width: 480px) {
  /* For mobile phones: */
  .txt-avatar {
    font-size: 15px;
  }

  .log {
    font-size: 12px;
    display: flex;
  }

  .login {
    margin-left: 2%;
  }

  .avatar {
    width: 85%;
  }
}

</style>
