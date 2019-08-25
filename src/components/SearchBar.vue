<template lang="html">
  <div class="home-view">
    <v-layout row xs12 class="pa-2 ma-2" justify-center>
      <v-flex xs12 class="pa-1 ma-1">
        <v-text-field
          v-model="Search"
          append-icon="search"
          label="Search though our free photo database..."
          hide-details
          outline
          clearable
        ></v-text-field>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  name: "SearchBar",
  data() {
    return {
      Search: null
    };
  },
  watch: {
    Search: _.debounce(function(newVal) {
      this.setFilter(newVal);
    }, 300)
  },
  methods: {
    setFilter(newVal) {
      if (newVal !== null && newVal !== undefined && newVal.length > 0) {
        this.$store.commit("setFilter", newVal);
        this.$store.commit("resetPager");
        this.$emit("getListPhotosByQuery");
      } else {
        this.$store.commit("setFilter", null);
        this.$store.commit("resetPager");
        this.$emit("getListRandomPhotos");
      }
    }
  }
};
</script>

<style></style>
