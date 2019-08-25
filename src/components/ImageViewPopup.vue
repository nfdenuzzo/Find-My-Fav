<template>
  <v-dialog v-model="InternalViewImagePopup" width="600" no-click-animation>
    <v-card>
      <v-img
        v-if="InternalViewImagePopup && src"
        :src="src"
        :lazy-src="src"
        aspect-ratio="1"
        contain
        class="grey lighten-2"
      ></v-img>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ImageViewPopup",
  components: {},
  props: {
    viewImagePopup: {
      type: Boolean,
      default: false,
      required: false
    },
    src: {
      type: String,
      default: "regular"
    }
  },
  data() {
    return {
      InternalViewImagePopup: this.viewImagePopup
    };
  },
  watch: {
    src() {
      if (this.src === null) {
        this.$emit("closeImagePopup", false);
      }
    },
    viewImagePopup() {
      this.InternalViewImagePopup = this.viewImagePopup;
    },
    InternalViewImagePopup() {
      if (this.InternalViewImagePopup === false) {
        this.$emit("closeImagePopup", false);
      }
    }
  },
  methods: {}
};
</script>

<style></style>
