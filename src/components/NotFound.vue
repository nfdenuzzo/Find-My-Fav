<template>
  <v-card class="mx-auto" flat style="background-color: #F8F8FF;" max-width="600px" height="470px">
    <div>
      <div>
        <v-layout row wrap justify-center>
          <div
            class="notfound-404"
            style="
            background-color: red;
            width: 200px;
            border-radius: 50%;
            height: 200px;"
          >
            <v-img :src="images.Emoji"></v-img>
          </div>
        </v-layout>
        <v-layout row wrap justify-center>
          <h1 class="font-weight-black">404</h1>
        </v-layout>
        <v-layout row wrap justify-center>
          <h1 class="font-weight-black">Oops! Page Not Be Found</h1>
        </v-layout>
        <br />
        <p class="text--black font-weight-bold pa-2 ma-2">
          Sorry but the page you are looking for does not exist, have been
          removed. name changed or is temporarily unavailable
        </p>
        <v-layout row justify-center>
          <v-flex xs6 sm4>
            <v-btn @click.native="ClickedGoHome()" round block dark color="#00137f">BACK TO HOME</v-btn>
          </v-flex>
        </v-layout>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      images: {
        Emoji: require("@/assets/images/emoji.png")
      }
    };
  },
  computed: {},
  mounted() {},
  methods: {
    ClickedGoHome() {
      this.$router.push("/");
    }
  }
};
</script>
<style scoped>
</style>
