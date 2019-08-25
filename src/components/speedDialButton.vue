<template>
  <v-speed-dial v-model="fab" direction="left" style="float">
    <template v-slot:activator>
      <v-btn
        v-model="fab"
        color="indigo darken-3"
        dark
        fab
        v-tooltip="{ content: ' View Faved / Liked Photos ' }"
      >
        <v-icon v-if="!fab">burst_mode</v-icon>
        <v-icon v-if="fab">close</v-icon>
      </v-btn>
    </template>
    <v-btn
      fab
      dark
      small
      color="pink"
      v-tooltip="{ content: ' View Faved Photos ' }"
      @click="viewFavPhotos('faved')"
    >
      <v-icon>favorite_border</v-icon>
    </v-btn>
    <v-btn
      fab
      dark
      small
      color="orange"
      v-tooltip="{ content: ' View Liked Photos ' }"
      @click="viewFavPhotos('liked')"
    >
      <v-icon>star_border</v-icon>
    </v-btn>
    <v-btn
      fab
      dark
      small
      color="white"
      v-tooltip="{ content: ' View Liked & Faved ' }"
      @click="viewFavPhotos('liked and faved')"
    >
      <v-img
        :src="images.LikedFav"
        :lazy-src="images.LikedFav"
        aspect-ratio="1"
        contain
        class="grey lighten-2"
        style="border-radius: 50%;"
      ></v-img>
    </v-btn>
  </v-speed-dial>
</template>

<script>
export default {
  name: "speedDialButton",
  data() {
    return {
      fab: false,
      images: {
        LikedFav: require("@/assets/images/LikedFav.png")
      }
    };
  },
  methods: {
    viewFavPhotos(value) {
      if (!this.$route.path.includes("/faves")) {
        this.$router.push({
          name: "Favourites",
          params: { type: value }
        });
      } else {
        this.$store.commit("setFavedFilter", value);
        this.$store.dispatch("ToggleLikedFavouritePhotos");
      }
    }
  }
};
</script>

<style>
</style>