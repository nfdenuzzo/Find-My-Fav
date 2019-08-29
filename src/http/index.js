import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { store } from "../store";

window.axios = axios;

axios.interceptors.request.use(
  function(config) {
    let token = localStorage.getItem("client_id");
    if (token) {
      config.headers.common["Authorization"] = "Client-ID " + token;
    }
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
        iziToast.destroy();
        iziToast.error({
          timeout: 2000,
          position: "bottomCenter",
          title: "Error occurred",
          message:
            "Not authorized, We could not authorize you, reload or login again"
        });
        store.commit("setLoggedIn", false);
        localStorage.removeItem("client_id");
        break;
      // Forbidden, user does not have the required rights to view a page
      case 403:
        iziToast.destroy();
        iziToast.error({
          timeout: 2000,
          position: "bottomCenter",
          title: "Error occurred",
          message: "Forbidden. Sorry, you are not allowed to view this."
        });
        break;
      // Backend-controller action was not found.
      case 404:
        iziToast.destroy();
        iziToast.error({
          timeout: 2000,
          position: "bottomCenter",
          title: "Error occurred",
          message:
            "Not found 404. Sorry, the resource was not found on the server."
        });
        break;
      // Internal server error
      case 500:
        iziToast.destroy();
        iziToast.error({
          timeout: 2000,
          position: "bottomCenter",
          title: "Error occurred",
          message:
            "Error occurred. An error occurred on the server. Please try again. Sorry for the inconvenience"
        });
        break;
      // Network related error
      case 503:
        iziToast.destroy();
        iziToast.error({
          timeout: 2000,
          position: "bottomCenter",
          title: "Error occurred",
          message: "Network Error. Sorry, the server is unavailable."
        });
        break;
      // Unexpected error code
      default:
        iziToast.destroy();
        iziToast.error({
          timeout: 2000,
          position: "bottomCenter",
          title: "Error occurred",
          message:
            "Unexpected error occurred. We are not sure what just happened, Please try again. Sorry for the inconvenience."
        });
        break;
    }

    return Promise.reject(error);
  }
);

window.axios = axios;
