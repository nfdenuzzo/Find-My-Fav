export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    getPaginationData(response) {
      let resultsPerPage = null;
      let resultsTotal = null;
      if (response.headers["x-per-page"]) {
        resultsPerPage = response.headers["x-per-page"];
      }
      if (response.headers["x-total"]) {
        resultsTotal = response.headers["x-total"];
      }
      // If the header has a X-pagination, we can update our paging in the global store
      if (resultsPerPage && resultsTotal) {
        // Commit new pager settings to the store
        this.$store.commit({
          type: "updatePager",
          paging: {
            totalItems: parseInt(resultsTotal),
            totalPages: parseInt(
              Math.ceil(resultsTotal / parseFloat(resultsPerPage))
            ),
            pageNumber: this.$store.getters.getNewPageNumber,
            pageSize: resultsPerPage
          }
        });
      }
    }
  }
};
