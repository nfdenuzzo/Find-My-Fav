import * as UserService from "../http/UserService";
export default {
  mounted() {},
  methods: {
    getUserPhoto() {
      UserService.get(this.username, { client_id: this.$root.client_id })
        .then(res => {
          this.user = res.data;
        })
        .catch(console.error);
    }
  }
};
