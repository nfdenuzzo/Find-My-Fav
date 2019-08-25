import Vue from "vue";
import VueRouter from "vue-router";

import HomeView from "../components/HomeView";
import FavesView from "../components/FavesView";
import PhotoView from "../components/PhotoView";
import UserView from "../components/UserView";
import AuthView from "../components/AuthView";
import NotFound from "@/components/NotFound";
import { store } from "../store";

import nativeToast from "native-toast";
import "native-toast/dist/native-toast.css";

Vue.use(VueRouter);

export const router = new VueRouter({
  routes: [
    {
      path: "",
      name: "Home",
      component: HomeView,
      beforeEnter: (to, from, next) => {
        if (!store.getters.getLoggedIn) {
          next("/auth");
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
          nativeToast({
            message: "Not Authorized",
            position: "south",
            type: "error",
            timeout: 3000
          });
          next("/auth");
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
          nativeToast({
            message: "Not Authorized",
            position: "south",
            type: "error",
            timeout: 3000
          });
          next("/auth");
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
          nativeToast({
            message: "Not Authorized",
            position: "south",
            type: "error",
            timeout: 3000
          });
          next("/auth");
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
    { path: "/auth", name: "Auth", component: AuthView }
  ]
});

export default router;
