<template lang="html" >
  <div class="animated delay-0.5s fadeIn">
    <UserCard
      v-if="photo.user.username"
      :username="photo.user.username"
    ></UserCard>
    <PhotoElement :photo="photo" :photoId="photo.id"></PhotoElement>
  </div>
</template>

<script>
import PhotoElement from "./PhotoElement";
import UserCard from "./UserCard";
import * as PhotoService from "../http/PhotoService";

export default {
  name: "PhotoView",
  components: {
    PhotoElement: () => import("./PhotoElement"),
    UserCard: () => import("./UserCard")
  },
  props: {
    photoId: {
      type: String
    }
  },
  data() {
    return {
      photo: {
        urls: {},
        user: {}
      }
    };
  },
  mounted() {},
  created() {
    PhotoService.get(this.photoId, { client_id: this.$root.client_id })
      .then(res => {
        this.photo = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
