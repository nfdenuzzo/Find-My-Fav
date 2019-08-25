<template lang="html">
  <div class="photo-list">
    <br>
    <v-layout row justify-center>
      <label v-if="$route.path.includes('/faves')"
      :class="$breakpoint.smAndUp ? 'display-1 font-weight-bold' : 'title font-weight-bold'"
      style="font-family: Patua One !important;"
        >All my {{$store.getters.getFavedFilter}} photos</label
      >
    </v-layout>
    <br>
    <v-layout row wrap>
      <label class="font-weight-bold"
        >Photos: {{ $store.getters.getTotalCount }}</label
      >
    </v-layout>
    <v-layout row wrap v-if="dataLoading">
      <v-flex xs2 sm5 class="pa-1 ma-1"/>
      <v-flex xs4 sm4>
        <v-progress-circular
          :width="5"
          size="250"
          color="#FF6A00"
          indeterminate
        ></v-progress-circular>
      </v-flex>
      <v-flex xs3 sm4 class="pa-1 ma-1"/>
    </v-layout>
    <v-layout row wrap justify-center v-if="!dataLoading">
      <v-flex
        v-for="photo in photos"
        :key="photo.id"
        xs12
        sm6
        md4
        lg3
        class="pa-1 pb-4"
      >
        <PhotoElement
          class="animated fadeIn"
          :photo="photo"
          :photoId="photo.id"
          v-if="!dataLoading"
          @viewUserDialog="viewUserDialog"
          @viewImagePopup="viewImagePopupDialog"
        ></PhotoElement>
      </v-flex>
      <v-flex v-if="!photos.length > 0 && !dataLoading" xs10 sm8 md6>
        <v-img
          :src="images.NoDataFound"
          :lazy-src="images.NoDataFound"
          contain
        ></v-img>
      </v-flex>
    </v-layout>
    <v-layout>
      <UserViewDialog
        :viewDialog="viewDialog"
        @closeUserDialog="closeUserDialog"
        :photoId="SelectedPhotoId"
      ></UserViewDialog>
    </v-layout>
    <v-layout>
      <ImageViewPopup
        :viewImagePopup="viewImagePopup"
        :src="selectedImageSrc"
        @closeImagePopup="closeImagePopup"
      ></ImageViewPopup>
    </v-layout>
  </div>
</template>

<script>
import PhotoElement from "./PhotoElement";
import UserViewDialog from "./UserViewDialog";
import ImageViewPopup from "./ImageViewPopup";
import BreakPointMixin from "@/mixins/BreakPointMixin";
export default {
  name: "PhotoList",
  components: {
    ImageViewPopup: () => import("./ImageViewPopup"),
    PhotoElement: () => import("./PhotoElement"),
    UserViewDialog: () => import("./UserViewDialog")
  },
  mixins: [BreakPointMixin],
  props: {
    photos: {
      type: Array,
      default() {
        return [];
      }
    },
    dataLoading: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data() {
    return {
      SelectedPhotoId: null,
      selectedImageSrc: null,
      images: {
        NoDataFound: require("@/assets/images/image-not-found.png")
      }
    };
  },
  computed: {
    viewDialog: {
      get() {
        return this.$store.getters.getViewDialog;
      },
      set(value) {
        this.$store.commit("setViewDialog", value);
      }
    },
    viewImagePopup: {
      get() {
        return this.$store.getters.getViewImagePopup;
      },
      set(value) {
        this.$store.commit("setViewImagePopup", value);
      }
    }
  },
  watch: {
    "$store.getters.getViewPhotoViewDialog"() {
      if (this.$store.getters.getViewPhotoViewDialog) {
        this.viewDialog = true;
      } else {
        this.viewDialog = false;
      }
    },
    "$store.getters.getViewImagePopup"() {
      if (this.$store.getters.getViewImagePopup) {
        this.viewImagePopup = true;
      } else {
        this.viewImagePopup = false;
      }
    }
  },
  mounted() {},
  methods: {
    viewImagePopupDialog(value) {
      this.selectedImageSrc = value.src;
      this.viewImagePopup = value.value;
    },
    closeImagePopup() {
      this.viewImagePopup = false;
    },
    closeUserDialog(value) {
      this.viewDialog = value;
    },
    viewUserDialog(value) {
      this.SelectedPhotoId = value.photoId;
      this.viewDialog = value.value;
    }
  }
};
</script>
