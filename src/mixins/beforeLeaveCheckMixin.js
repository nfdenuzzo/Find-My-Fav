export default {
  beforeRouteLeave(to, from, next) {
    if (
      this.$store.getters.getViewDialog === true ||
      this.$store.getters.getViewImagePopup === true
    ) {
      this.$store.commit("setViewDialog", false);
      this.$store.commit("setViewImagePopup", false);
      next(false);
    } else {
      next();
    }
  },
  mounted() {},
  methods: {}
};
