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
    <v-form ref="SignInForm" v-model="validCreate" lazy-validation >
      <v-layout>
          <v-text-field
            ref="ClientId"
            v-model="client_id"
            label="Client ID:"
            outline
            required
            :rules="SignInFormRules"
            @keyup.enter="SignIn()"
          ></v-text-field>
      </v-layout>
        </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn @click.native="onReset()" round color="red" class="white--text"
        >Reset</v-btn
      >
      <v-spacer></v-spacer>
      <v-btn @click.native="SignIn()" round color="green" class="white--text" :loading="loginButtonLoading"
        >Submit</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import PhotoElement from "./PhotoElement";
import LogoutMixin from "@/mixins/LogoutMixin";
import ValidAuthMethodsMixin from "@/mixins/ValidAuthMethodsMixin";
export default {
  name: "AuthView",
  mixins: [LogoutMixin, ValidAuthMethodsMixin],
  data() {
    return {
      client_id: null,
      loginButtonLoading: false,
      validCreate: true,
      SignInFormRules: [
        v => !!v || "Client Id is required!",
        v => /\S/.test(v) || "Client Id is required!"
      ]
    };
  },
  mounted() {
    this.$refs.ClientId.focus();
    // if the user  returns to the auth screen we can then log them out - this is optional of course but i think its a good thing
  },
  methods: {
    SignIn() {
      if (this.$refs.SignInForm.validate()) {
        this.loginButtonLoading = true;
        this.TestValidAuth();
      }
    },
    onReset() {
      this.client_id = null;
    }
  }
};
</script>
