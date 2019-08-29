import * as PhotoService from "../http/PhotoService";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
export default {
  mounted() {},
  methods: {
    TestValidAuth() {
      this.dataLoading = true;
      this.$root.client_id = this.client_id;
      localStorage.setItem("client_id", this.client_id);
      PhotoService.list()
        .then(() => {
          localStorage.setItem("client_id", this.client_id);
          this.$root.client_id = this.client_id;
          this.$store.commit("setLoggedIn", true);
          this.$router.push("/").catch(err => {
            console.log(err);
          });
        })
        .catch(err => {
          localStorage.removeItem("client_id", this.client_id);
          console.log(err);
          iziToast.destroy();
          iziToast.error({
            timeout: 2000,
            position: "bottomCenter",
            title: "Error",
            message: "Not authorized, Incorrect Client-Id"
          });
        })
        .finally(() => {
          this.loginButtonLoading = false;
        });
    }
  }
};
