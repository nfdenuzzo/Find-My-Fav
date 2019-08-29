<template>
  <div id="app" v-cloak>
    <v-app>
      <v-toolbar dark color="#00137f" style="z-index: 99;">
        <router-link to="/" tag="span" style="cursor: pointer">
          <v-layout row>
            <img :src="images.Logo" style="height:35px" class="mt-2" />
            <label
              :class="$breakpoint.smAndUp ? 'font-weight-bold mt-3 subheading' : 'font-weight-bold mt-3 caption'"
            >Find My Fav</label>
          </v-layout>
        </router-link>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
            v-for="item in menuitems"
            :key="item.title"
            @click="Route(item.link)"
            round
            flat
            dark
            router-link
            class="font-weight-bold"
          >
            <i class="material-icons">{{ item.icon }}</i>
            {{ item.title }}
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-container fluid style="background-color: #F8F8FF;">
        <v-layout row justify-center class="animated bounceInLeft">
          <img
            :src="images.Logo"
            v-if="($route.path === '/') && $breakpoint.smAndUp"
            :style="$breakpoint.smAndUp ? 'height:80px' : 'height:90px'"
            class="pb-3"
          />
        </v-layout>
        <v-layout row justify-center>
          <label
            class="font-weight-bold"
            v-if="$route.path === '/'"
            :class="$breakpoint.smAndUp ? 'display-1' : 'headline'"
            style="font-family: Patua One !important;"
          >Welcome to Find My Fav</label>
        </v-layout>
        <v-layout row>
          <v-btn
            @click="$router.back();"
            v-if="
            $route.path !== '/AuthView' &&
              $store.getters.getLoggedIn &&
              $route.path !== '/'
          "
            fab
            flat
            light
            style="background-color:orange"
            router-link
            class="font-weight-bold white--text"
            v-tooltip="{ content: 'Go Home ' }"
          >
            <v-icon>keyboard_return</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <speedDialButton v-if="($store.getters.getLoggedIn)"></speedDialButton>
        </v-layout>
        <div class="animated delay-0.5s fadeIn">
          <router-view></router-view>
        </div>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import LogoutMixin from "./mixins/LogoutMixin";
import speedDialButton from "./components/speedDialButton";
import BreakPointMixin from "@/mixins/BreakPointMixin";
export default {
  name: "App",
  mixins: [LogoutMixin, BreakPointMixin],
  components: {
    speedDialButton: () => import("./components/speedDialButton")
  },
  data() {
    return {
      images: {
        Logo: require("../src/assets/images/logo.png")
      }
    };
  },
  computed: {
    menuitems() {
      let menuitems = [
        {
          title: "Login",
          icon: "lock_open",
          link: "/AuthView"
        }
      ];
      if (this.$store.getters.getLoggedIn) {
        menuitems = [
          {
            title: "Logout",
            icon: "lock_outline",
            link: "/logout"
          }
        ];
      }
      return menuitems;
    }
  },
  mounted() {
    if (!this.$store.getters.getLoggedIn && this.$route.path !== "/AuthView") {
      this.$router.push("/AuthView").catch(err => {
        console.log(err);
      });
    }
  },
  methods: {
    Route(value) {
      if (value === "/logout") {
        this.Logout();
      } else {
        this.$router.push(value).catch(err => {
          console.log(err);
        });
      }
    }
  }
};
</script>
<style>
::-webkit-scrollbar {
  width: 15px;
  height: 7px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #525252;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #00137f;
}

.v-btn--floating .v-icon {
  height: auto !important;
}
</style>
