<template>
  <div class="body-div h-screen">
    <form @submit.prevent="onPost" class="h-full">
      <section class="post-list flex flex-col form1">
        <h1 class="title">Create a new Post</h1>
        <div class="flex justify-center component">
          <h1 class="txt">Add Your photo</h1>
          <input type="text" v-model.trim="post.image_url.val"
                 :class="{input_box: post.image_url.isValid, invalid: !post.image_url.isValid,}"
                 placeholder="Google Drive link" required @blur="clearValidity('image_url')">
        </div>
        <div class="flex justify-center component">
          <h1 class="txt">Add Title</h1>
          <input type="text" v-model.trim="post.title.val" placeholder="title" required
                 :class="{input_box: post.title.isValid, invalid: !post.title.isValid}"
                 @blur="clearValidity('title')">
        </div>
        <div class="flex justify-center component">
          <h1 class="txt">Add Caption</h1>
          <textarea v-model.trim="post.caption.val" placeholder="caption" required></textarea>
        </div>
        <button class="css-button-red place-self-center" type="submit">
          Create Post
        </button>
      </section>
    </form>
<!--    <div class="h-screen">-->

<!--    </div>-->
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "index",
  layout: "app",
  data() {
    return {
      post: {
        title: {
          val: "",
          isValid: true
        },
        caption: {
          val: "",
          isValid: true
        },
        image_url: {
          val: "",
          isValid: true
        }
      },
      formIsinValid: ""
    }
  },
  methods: {
    clearValidity(input) {
      this.post[input].isValid = true;
    },
    Validate(){
      this.formIsinValid = ""
      if (this.post.image_url.val.startsWith("https://drive.google.com/")) {
        const myarr = this.post.image_url.val.split('/');
        if (myarr.length !== 7) {
          console.log(myarr);
          this.formIsinValid = "your link is not a valid URL from drive"
          return false;
        } else {
          this.post.image_url.val = "https://drive.google.com/uc?export=view&id=" + myarr[5];
          console.log(this.post.image);
        }
      } else {
        this.post.image_url.isValid = false;
        this.formIsinValid = "your link must start with https://drive.google.com";
        return false;
      }
      return true;
    },
    onPost() {
      if (this.Validate()) {
        const fd = {
          title: this.post.title.val,
          image_url: this.post.image_url.val,
          content: this.post.caption.val,
        };
        this.$axios.$post(process.env.baseURL+"post", fd , {
          headers: {
            "Authorization": "Bearer " + this.$store.getters.token
          }}).then(() => {
          Swal.fire(
            {
              title: 'success',
              text: 'your post was successfully created',
              icon: "success",
              confirmButtonText: "let's go"
            });
          this.$router.push("/profile/"+this.$store.getters.user.id);
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
      }else {
        Swal.fire(
          {
            title: 'sth went wrong :(',
            text: this.formIsinValid,
            icon: 'error',
            confirmButtonText: 'OK'
          }
        )
      }
    }
  }
};
</script>

<style scoped>
.body-div {
  background-color: #18191b;
  color: #f5f5f5;
}

.title {
  font-size: 25px;
  padding-bottom: 2%;
  padding-top: 2%;
}
.form1{
  padding-bottom: 1%;
  margin-left: 15%;
  margin-right: 15%;
  border-radius: 30%;
}

.input_box,textarea {
  width: 60%;
  color: #18191b;
  height: 50px;
  font-weight: 700;
  letter-spacing: 1px;
  font-size: 16px;
  background-color: aliceblue;
  border: none;
  border-radius: 20px;
  box-sizing: border-box;
  text-align: center;
  outline: none;
}

textarea {
  resize: none;
  height: 120px;
  font-size: 18px;
}

.txt {
  font-size: 18px;
  align-self: center;
  width: 150px;
  padding: 5px;
  margin: 6px 3% 3%;
}

.invalid {
  outline: none;
  width: 60%;
  height: 50px;
  border: 2px solid red;
  color: #18191b;
  font-weight: 700;
  letter-spacing: 1px;
  font-size: 16px;
  background-color: aliceblue;
  border-radius: 20px;
  box-sizing: border-box;
  text-align: center;
}

.post-list {
  padding: 10px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.component {
  width: 70%;
  margin-top: 10px;
}

.css-button-red {
  align-self: center;
  justify-self: center;
  min-width: 130px;
  min-height: 50px;
  width: 40%;
  height: 50px;
  color: #ffffff;
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
  background: crimson;
  overflow: hidden;
  text-align: center;
}

.css-button-red:hover {
  color: crimson;
}

.css-button-red:hover:after {
  width: 100%;
}

.css-button-red:after {
  content: "";
  position: absolute;
  z-index: -1;
  transition: all 0.3s ease;
  left: 0;
  top: 0;
  width: 0;
  height: 100%;
  background: #ffffff;
}
@media only screen and (max-width:800px) {
  .txt {
    font-size:14px;
    padding:0;
    margin:0;
    text-align: center;
  }
  .component{
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }
  .input_box,textarea {
    font-size:14px;
    width:100%;
  }
  .form1{
    margin-left: 10%;
    margin-right: 10%;
  }
}
@media only screen and (max-height:530px) {
  .body-div{
    height: fit-content;
  }
}
</style>
