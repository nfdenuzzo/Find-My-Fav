import Vue from "vue";
import Router from "vue-router";

import HomeView from "@/components/HomeView";
import FavesView from "@/components/FavesView";
import PhotoView from "@/components/PhotoView";
import UserView from "@/components/UserView";
import AuthView from "@/components/AuthView";
import NotFound from "@/components/NotFound";
import { store } from "../src/store";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
      beforeEnter: (to, from, next) => {
        if (!store.getters.getLoggedIn) {
          next("/AuthView");
        } else {
          next();
        }
      }
    },
    {
      path: "/faves",
      name: "Favourites",
      component: FavesView,
      beforeEnter: (to, from, next) => {
        if (!store.getters.getLoggedIn) {
          iziToast.error({
            timeout: 2000,
            position: "bottomCenter",
            title: "Error occurred",
            message: "Not Authorized"
          });
          next("/AuthView");
        } else {
          next();
        }
      }
    },
    {
      path: "/photo/:id",
      name: "Photo",
      component: PhotoView,
      beforeEnter: (to, from, next) => {
        if (!store.getters.getLoggedIn) {
          iziToast.error({
            timeout: 2000,
            position: "bottomCenter",
            title: "Error occurred",
            message: "Not Authorized"
          });
          next("/AuthView");
        } else {
          next();
        }
      }
    },
    {
      path: "/user/:username",
      name: "User",
      component: UserView,
      beforeEnter: (to, from, next) => {
        if (!store.getters.getLoggedIn) {
          iziToast.error({
            timeout: 2000,
            position: "bottomCenter",
            title: "Error occurred",
            message: "Not Authorized"
          });
          next("/AuthView");
        } else {
          next();
        }
      }
    },
    {
      path: "*",
      name: "NotFound",
      component: NotFound
    },
    { path: "/AuthView", name: "AuthView", component: AuthView }
  ]
});
