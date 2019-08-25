<template lang="html">
  <div class="home-view">
    <SearchBar
      @getListPhotosByQuery="getListPhotosByQuery"
      @getListRandomPhotos="getListRandomPhotos"
    ></SearchBar>
    <PhotoList :photos="photos" :dataLoading="dataLoading"></PhotoList>
    <br />
    <Pager @ReloadPageData="loadPageData"></Pager>
  </div>
</template>

<script>
import PhotoList from "./PhotoList";
import SearchBar from "./SearchBar";
import Pager from "./Pager";
import * as PhotoService from "../http/PhotoService";
import paginationData from "@/mixins/paginationData";
import beforeLeaveCheckMixin from "@/mixins/beforeLeaveCheckMixin.js";
import _ from "lodash";

export default {
  name: "HomeView",
  components: {
    PhotoList: () => import("./PhotoList"),
    Pager: () => import("./Pager"),
    SearchBar: () => import("./SearchBar")
  },
  mixins: [paginationData, beforeLeaveCheckMixin],
  data() {
    return {
      dataLoading: false
    };
  },
  watch: {
    Search: _.debounce(function(newVal) {
      this.setFilter(newVal);
    }, 300)
  },
  computed: {
    photos() {
      return this.$store.getters.getPhotos;
    }
  },
  created() {
    this.getListRandomPhotos();
  },
  mounted() {
    this.$store.commit("setViewDialog", false);
    this.$store.commit("setFilter", null);
  },
  methods: {
    loadPageData() {
      if (this.$store.getters.getFilter !== null) {
        this.getListPhotosByQuery();
      } else {
        this.getListRandomPhotos();
      }
    },
    getListRandomPhotos() {
      this.dataLoading = true;
      PhotoService.list({
        client_id: this.$root.client_id,
        page: this.$store.getters.getCurrentPage,
        per_page: this.$store.getters.getPageSize
      })
        .then(res => {
          this.getPaginationData(res);
          this.$store.commit("setPhotos", res.data);
        })
        .catch(err => {
          console.log(err);
          this.$store.commit("resetPager");
          this.$router.back();
        })
        .finally(() => {
          this.dataLoading = false;
        });
    },
    getListPhotosByQuery() {
      this.$store.commit("resetPhotos", []);
      this.dataLoading = true;
      PhotoService.listQuery({
        client_id: this.$root.client_id,
        page: this.$store.getters.getCurrentPage,
        query: this.$store.getters.getFilter
      })
        .then(res => {
          this.getPaginationData(res);
          this.$store.commit("setPhotos", res.data.results);
        })
        .catch(err => {
          console.log(err);
          this.$store.commit("resetPager");
          this.$router.back();
        })
        .finally(() => {
          this.dataLoading = false;
        });
    }
  }
};
</script>
