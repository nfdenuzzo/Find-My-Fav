<template lang="html">
  <div v-cloak class="home-view">
    <UserCard :username="$route.params.username"></UserCard>
    <PhotoList :photos="photos" :dataLoading="dataLoading"></PhotoList>
    <Pager @ReloadPageData="loadPageData"></Pager>
  </div>
</template>

<script>
import PhotoList from "./PhotoList";
import Pager from "./Pager";
import UserCard from "./UserCard";
import * as UserService from "../http/UserService";
import paginationData from "@/mixins/paginationData";

export default {
  name: "UserView",
  components: {
    PhotoList: () => import("./PhotoList"),
    UserCard: () => import("./UserCard"),
    Pager: () => import("./Pager")
  },
  mixins: [paginationData],
  data() {
    return {
      dataLoading: false
    };
  },
  computed: {
    photos() {
      return this.$store.getters.getPhotos;
    }
  },
  mounted() {
    this.LoadUserPhotos();
    this.$store.commit("setViewDialog", false);
  },
  created() {},
  methods: {
    LoadUserPhotos() {
      this.$store.commit("resetPhotos", []);
      this.dataLoading = true;
      UserService.listPhotos(this.$route.params.username, {
        client_id: this.$root.client_id,
        page: this.$store.getters.getCurrentPage,
        per_page: this.$store.getters.getPageSize
      })
        .then(res => {
          this.getPaginationData(res);
          this.$store.commit("setPhotos", res.data);
          this.dataLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.$store.commit("resetPager");
          this.$router.back();
          this.dataLoading = false;
        });
    },
    loadPageData() {
      this.LoadUserPhotos();
    }
  }
};
</script>
