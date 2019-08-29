<template lang="html">
  <div v-cloak class="home-view">
    <PhotoList :photos="photos" :dataLoading="dataLoading"></PhotoList>
  </div>
</template>

<script>
import PhotoList from "./PhotoList";
export default {
  name: "FavesView",
  components: {
    PhotoList: () => import("./PhotoList")
  },
  data() {
    return {
      dataLoading: false
    };
  },
  computed: {
    photos() {
      return this.$store.getters.getFavedPhotos;
    }
  },
  mounted() {
    if (this.$route.params.type !== undefined) {
      this.$store.commit("setFavedFilter", this.$route.params.type);
      this.$store.dispatch("ToggleLikedFavouritePhotos");
      this.$store.commit("setViewDialog", false);
    } else {
      this.$router.push("/");
    }
  },
  created() {},
  methods: {}
};
</script>
