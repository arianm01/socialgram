<template>
  <div class="body-div">
    <div v-if="isLoading" class="h-screen">
      <base-spinner></base-spinner>
    </div>
    <div class="justify-center flex flex-col" v-else>
      <div class="flex profile">
        <img :src="user.image_url" class="avatar rounded-full" alt="profile">
        <div class="profile-mt">
          <div class="flex name">
            <h1>{{ user.username }}</h1>
            <div v-if="!isItMe" class="flex justify-around">
              <button @click="createReq" v-if="true" class="css-button-shadow--sky">Follow</button>
              <button @click="deleteReq" v-if="false" class="css-button-black">Requested</button>
              <button @click="deleteFollowing" v-else class="css-button-shadow--sky">Following</button>
            </div>
            <div v-else class="flex ">
              <button @click="editProfile" class="css-button-black">Edit profile</button>
            </div>
          </div>
          <div class="flex flex-auto pos justify-around">
            <p v-if="user.posts.length!==1">{{ user.posts.length }} posts</p>
            <p v-else>{{ user.posts.length }} post</p>
            <p @click="showFollowings" class="cursor" v-if="user.followers!==1">{{ user.followers }} followers</p>
            <p @click="showFollowings" class="cursor" v-else>{{ user.followers }} followers</p>
            <p @click="showFollowers" class="cursor" v-if="user.followings!==1">{{ user.followings }} followings</p>
            <p @click="showFollowers" class="cursor" v-else>{{ user.followings }} followings</p>
          </div>
          <div>
            <p>{{ user.name }}</p>
            <p>{{ user.bio }}</p>
            <p>{{ user.interest }}</p>
          </div>

          <modal
            title="editing profile"
            v-show="modalSecond.show"
            @close="modalSecond.show = false">
            <div slot="body">
              <form @submit.prevent="submitSecondForm" class="flex flex-col place-center">
                <div class="flex justify-center component">
                  <h1 class="txt">bio</h1>
                  <input type="text" v-model.trim="user.bio" placeholder="Bio" required>
                </div>
                <div class="flex justify-center component">
                  <h1 class="txt">interest</h1>
                  <textarea v-model.trim="user.interest" placeholder="intrests" required></textarea>
                </div>
                <button class="btn btnPrimary">Submit</button>
              </form>
            </div>
          </modal>
        </div>
      </div>
      <hr>
      <post-list :posts="posts"/>
      <!--        <p class="text-center" :class="'h-screen'" v-else>that was all of your posts</p>-->
    </div>
  </div>
</template>

<script>
import PostList from "~/components/post/PostList";
import BaseSpinner from "~/components/features/BaseSpinner";
import Swal from "sweetalert2";
import Modal from "~/components/UI/Modal";

export default {
  name: "index",
  components: {Modal, BaseSpinner, PostList},
  layout: 'app',
  data() {
    return {
      isItMe: false,
      id: null,
      user: {},
      isTherePost: false,
      posts: [],
      isLoading: true,
      modalSecond: {
        show: false,
      },
    }
  },
  component: {},
  async created() {
    this.id = parseInt(this.$route.params.id);
    if (!this.$store.getters.user) {
      const user = await this.$axios.$get(process.env.baseURL + "profile?user_id=0", {
        headers: {
          "Authorization": "Bearer " + this.$store.getters.token
        }
      });
      await this.$store.commit('setUser', user);
    }
    const profile = await this.$axios.$get(process.env.baseURL + "profile?user_id=" + this.id, {
      headers: {
        "Authorization": "Bearer " + this.$store.getters.token
      }
    });
    if (profile.posts.length === 0) {
      this.isTherePost = false;
      return;
    }
    this.user = profile;
    for (const key in profile.posts) {
      console.log(profile.posts[key]);
      this.posts.push({...profile.posts[key], status: false});
      this.posts[this.posts.length - 1].user = this.user;
      for (const user in profile.posts[key].likes) {
        console.log(user);
        if (profile.posts[key].likes[user].ID === this.$store.getters.user.ID) {
          this.posts[this.posts.length - 1].status = true;
          break;
        }
      }
    }
    if (this.id === this.$store.getters.user.ID)
      this.isItMe = true;
    this.isLoading = false;
  },
  methods: {
    showFollowers() {

    },
    showFollowings() {

    },
    createReq() {
      this.$axios.$post(process.env.baseURL + "request?user_id=" + this.user.ID, {}, {
        headers: {
          "Authorization": "Bearer " + this.$store.getters.token
        }
      }).then(() => this.$router.go());
    },
    deleteReq() {
      Swal.fire({
        title: 'Are you sure',
        text: "do you want to withdraw this request?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$axios.$delete(process.env.baseURL + "request?user_id=" + this.user.ID, {
            headers: {
              "Authorization": "Bearer " + this.$store.getters.token
            }
          }).then(() =>
            Swal.fire(
              'Deleted!',
              'Your request has been deleted.',
              'success'
            )).then(() => this.$router.go());
        }
      })
    },
    deleteFollowing() {

    },
    deleteFollowers() {

    },
    editProfile() {
      this.modalSecond.show = !this.modalSecond.show;
    },
    submitSecondForm() {
      console.log({
        bio: this.user.bio,
        interest: this.user.interest,
      });
      this.$axios.$put(process.env.baseURL + "profile", {
        bio: this.user.bio,
        interest: this.user.interest,
      }, {
        headers: {
          "Authorization": "Bearer " + this.$store.getters.token
        }
      });
      this.modalSecond.show=false;
    }
  }
};
</script>

<style scoped>
.body-div {
  background-color: #18191b;
  color: #f5f5f5;
  height: fit-content;
}
.avatar {
  height: 150px;
  width: 150px;
  margin: 50px;
}

.profile {
  padding: 10px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.cursor {
  cursor: pointer;
}

h1 {
  font-size: 22px;
  margin-right: 14px;
}

hr {
  margin-top: 5px;
  width: 85%;
  place-self: center;
  opacity: 0.5;
  color: #fff;
}

p {
  margin-right: 14px;
}

.css-button-shadow--sky {
  min-width: 80px;
  height: 35px;
  color: #fff;
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
  position: relative;
  display: inline-block;
  outline: none;
  border-radius: 5px;
  border: none;
  background-color: #3a86ff;
}

.css-button-shadow--sky:active {
  background-color: #4278d0;
}

.css-button-black {
  min-width: 80px;
  height: 35px;
  color: #fff;
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
  position: relative;
  display: inline-block;
  outline: none;
  border-radius: 5px;
  z-index: 0;
  background: #000;
  overflow: hidden;
  border: 2px solid #fff;
}

@media only screen and (max-width: 750px) {
  .avatar {
    height: 85px;
    width: 85px;
    place-self: center;
  }

  .profile-mt {
    place-self: center;
  }

  .profile {
    flex-direction: column;
    align-items: start;
    justify-content: start;
  }
}

@media only screen and (max-width: 525px) {
  .pos {
    /*display: none;*/
  }

  .name {
    flex-direction: column;
    place-content: center;
  }
}
</style>
