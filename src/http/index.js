import axios from "axios";
import router from "../router";
import nativeToast from "native-toast";
import "native-toast/dist/native-toast.css";
import { store } from "../store";

window.axios = axios;

axios.interceptors.request.use(
  function(config) {
    config.headers.common["X-Requested-With"] = "XMLHttpRequest";
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // eslint-disable-next-line no-console
    console.log(error);
    if (!error.response) {
      error.response = {
        status: 503,
        config: null,
        data: null,
        headers: null,
        request: XMLHttpRequest,
        statusText: "Network Error"
      };
    }
    switch (error.response.status) {
      case 401:
        nativeToast().destroy();
        nativeToast({
          message:
            "Not authorized, We could not authorize you, reload or login again",
          position: "south",
          type: "error",
          timeout: 5000
        });
        router.push("/Auth");
        store.commit("setLoggedIn", false);
        localStorage.removeItem("client_id");
        break;
      // Forbidden, user does not have the required rights to view a page
      case 403:
        nativeToast().destroy();
        nativeToast({
          message: "Forbidden. Sorry, you are not allowed to view this.",
          position: "south",
          type: "error",
          timeout: 5000
        });
        break;
      // Backend-controller action was not found.
      case 404:
        nativeToast().destroy();
        nativeToast({
          message:
            "Not found 404. Sorry, the resource was not found on the server.",
          position: "south",
          type: "error",
          timeout: 5000
        });
        break;
      // Internal server error
      case 500:
        nativeToast().destroy();
        nativeToast({
          message:
            "Error occurred. An error occurred on the server. Please try again. Sorry for the inconvenience",
          position: "south",
          type: "error",
          timeout: 5000
        });
        break;
      // Network related error
      case 503:
        nativeToast().destroy();
        nativeToast({
          message: "Network Error. Sorry, the server is unavailable.",
          position: "south",
          type: "error",
          timeout: 5000
        });
        break;
      // Unexpected error code
      default:
        nativeToast().destroy();
        nativeToast({
          message:
            "Unexpected error occurred. We are not sure what just happened, Please try again. Sorry for the inconvenience.",
          position: "south",
          type: "error",
          timeout: 5000
        });
        break;
    }

    return Promise.reject(error);
  }
);

window.axios = axios;
