<template>
  <v-dialog v-model="InternalViewDialog" width="600" no-click-animation>
    <v-card>
      <br />
      <v-layout justify-center>
        <PhotoView
          :photoId="photoId"
          v-if="InternalViewDialog"
          style="width: 400px;"
        ></PhotoView>
      </v-layout>
      <v-card-actions>
        <v-layout justify-center>
          <v-flex xs3>
            <v-btn
              @click.native="CloseView()"
              round
              block
              color="orange darken-1"
              class="white--text font-weight-bold"
              >Close</v-btn
            >
          </v-flex>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import PhotoView from "./PhotoView";
export default {
  name: "UserViewDialog",
  components: {
    PhotoView: () => import("./PhotoView")
  },
  props: {
    viewDialog: {
      type: Boolean,
      default: false,
      required: false
    },
    photoId: {
      type: String,
      default: "regular"
    }
  },
  data() {
    return {
      client_id: null,
      InternalViewDialog: this.viewDialog
    };
  },
  watch: {
    viewDialog() {
      this.InternalViewDialog = this.viewDialog;
    },
    InternalViewDialog() {
      if (this.InternalViewDialog === false) {
        this.$emit("closeUserDialog", false);
      }
    }
  },
  methods: {
    CloseView() {
      this.$emit("closeUserDialog", false);
    }
  }
};
</script>

<style>
.v-dialog:not(.v-dialog--fullscreen) {
  max-height: 100% !important;
}

.v-dialog.v-dialog--active {
  max-height: 100% !important;
}
</style>
