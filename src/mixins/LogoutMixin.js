export default {
  mounted() {},
  methods: {
    Logout() {
      this.$root.client_id = null;
      this.$store.commit("setLoggedIn", false);
      localStorage.removeItem("client_id");
      if (this.$route.path !== "/AuthView") {
        this.$router.push("/AuthView").catch(err => {
          console.log(err);
        });
      }
    }
  }
};
