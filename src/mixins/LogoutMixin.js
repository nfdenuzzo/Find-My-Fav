export default {
  mounted() {},
  methods: {
    Logout() {
      this.$root.client_id = null;
      this.$store.commit("setLoggedIn", false);
      localStorage.removeItem("client_id");
      if (this.$route.path !== "/auth") {
        this.$router.push("/auth").catch(err => {
          console.log(err);
        });
      }
    }
  }
};
