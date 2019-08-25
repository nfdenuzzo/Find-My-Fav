<template lang="html">
  <div v-cloak class="user-card">
    <v-layout justify-center>
      <img
        :src="src"
        :alt="alt"
        @click="onImgClick"
        class="ml-4"
        style="border-radius: 50%; width: 100px;"
      />
    </v-layout>
    <br />
    <v-layout justify-center>
      <v-btn
        :disabled="$route.path.includes('/user/')"
        @click="onImgClick"
        round
        light
        flat
        small
        class="title font-weight-bold custom-btn"
      >
        {{ user.name }}
      </v-btn>
    </v-layout>
    <v-layout justify-center v-if="user.location">
      <v-icon>room</v-icon
      ><label class="subheading font-weight-regular">{{ user.location }}</label>
    </v-layout>
    <v-layout class="ma-2 pa-2" justify-center v-if="user.bio">
      <label class="subheading font-weight-regular">{{ user.bio }}</label>
    </v-layout>
  </div>
</template>

<script>
import UserServiceMethodsMixin from "@/mixins/UserServiceMethodsMixin";
export default {
  name: "UserCard",
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
      return this.user.profile_image.medium;
    },
    alt() {
      return this.user.name;
    }
  },
  created() {
    this.getUserPhoto();
  },
  mounted() {},
  methods: {
    onImgClick() {
      this.$store.commit("setViewDialog", false);
      this.$router
        .push({ name: "User", params: { username: this.username } })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style scoped>
.custom-btn::before {
  color: transparent;
}

.custom-btn:hover {
  color: green;
}

.theme--light.v-btn.v-btn--disabled,
.theme--light.v-btn.v-btn--disabled .v-btn__loading,
.theme--light.v-btn.v-btn--disabled .v-icon {
  color: black !important;
}
</style>
