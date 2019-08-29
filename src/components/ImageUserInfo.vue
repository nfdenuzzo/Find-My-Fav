<template lang="html">
    <div class="image-user-info-card" v-cloak>
      <v-layout justify-center style="background:rgba(255,255,255,0.8);">
          <img class="mt-2" :src="src" :alt="alt" style="border-radius: 50%; width: 40px; height: 40px;">
          <label class="mt-2 ml-3"> <span class="font-weight-bold">{{ user.name }}</span> <br> Photos: <span class="font-weight-bold">{{user.total_photos}} </span>
          &nbsp Collections:
          <span class="font-weight-bold">{{user.total_collections}}</span>
          </label>
        </v-layout>
    </div>
</template>

<script>
import * as UserService from "../http/UserService";
import UserServiceMethodsMixin from "@/mixins/UserServiceMethodsMixin";
export default {
  name: "ImageUserInfoCard",
  mixins: [UserServiceMethodsMixin],
  props: {
    username: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      user: {
        profile_image: {}
      }
    };
  },
  computed: {
    src() {
      return this.user.profile_image.small;
    },
    alt() {
      return this.user.name;
    }
  },
  created() {
    if (this.username !== null && this.username !== undefined) {
      this.getUserPhoto();
    }
  },
  mounted() {},
  methods: {}
};
</script>
<style scoped>
</style>
