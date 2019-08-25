<template lang="html">
  <v-card class="mx-auto elevation-19" min-width="250px" max-width="500px">
    <v-toolbar dark color="#00137f">
      <v-spacer></v-spacer>
      <v-toolbar-title class="display-1 font-weight-medium strokeme"
        >Login</v-toolbar-title
      >
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
      <v-layout>
        <v-flex xs12 xs12>
          <v-text-field
            ref="ClientId"
            v-model="client_id"
            label="Client ID:"
            outline
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions>
      <v-btn @click.native="onReset()" round color="red" class="white--text"
        >Reset</v-btn
      >
      <v-spacer></v-spacer>
      <v-btn @click.native="onSubmit()" round color="green" class="white--text"
        >Submit</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import PhotoElement from "./PhotoElement";
import LogoutMixin from "@/mixins/LogoutMixin";
export default {
  name: "AuthView",
  mixins: [LogoutMixin],
  data() {
    return {
      client_id: null
    };
  },
  mounted() {
    this.$refs.ClientId.focus();
    // if the user  returns to the auth screen we can then log them out - this is optional of course but i think its a good thing
    this.Logout();
  },
  methods: {
    onSubmit() {
      localStorage.setItem("client_id", this.client_id);
      this.$root.client_id = this.client_id;
      this.$store.commit("setLoggedIn", true);
      this.$router.push("/").catch(err => {
        console.log(err);
      });
    },
    onReset() {
      this.client_id = null;
    }
  }
};
</script>
