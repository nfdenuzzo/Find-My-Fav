<template>
  <div class="text-xs-center">
    <v-layout row wrap justify-center>
      <el-pagination
        @current-change="setCurrentPage"
        @prev-click="setPrePage"
        @next-click="setNextPage"
        @size-change="setPageSize"
        :current-page="getPaging.page"
        :page-size="getPaging.pageSize"
        :page-sizes="[10, 20, 30]"
        :page-count="getPaging.totalPages"
        :total="getPaging.totalItems"
        style="margin-bottom: 10px;"
        small
        background
        layout="prev, pager, next, sizes"
      ></el-pagination>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: "Pager",
  data() {
    return {
      page: 1
    };
  },
  computed: {
    getPaging() {
      return this.$store.getters.getPaging;
    }
  },
  methods: {
    // part of pagination
    setCurrentPage(index) {
      this.$store.commit({
        type: "setPagingCurrentPage",
        data: index
      });
      this.$emit("ReloadPageData");
    },
    setPageSize(total) {
      this.$store.commit({
        type: "setPagingSize",
        data: total
      });
      let test = this.$store.getters.getPageSize;
      this.$emit("ReloadPageData");
    },
    setPrePage() {
      if (this.$store.getters.getCurrentPage > 1) {
        let index = this.$store.getters.getCurrentPage - 1;
        this.$store.commit({
          type: "setPagingCurrentPage",
          data: index
        });
        this.$emit("ReloadPageData");
      }
    },
    // part of pagination
    setNextPage() {
      let index = this.$store.getters.getCurrentPage + 1;
      this.$store.commit({
        type: "setPagingCurrentPage",
        data: index
      });
      this.$emit("ReloadPageData");
    }
  }
};
</script>

<style>
.el-pagination {
  white-space: pre-wrap !important;
}
</style>
