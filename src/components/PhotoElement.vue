<template lang="html">
  <v-card :hover="!$store.getters.getViewDialog">
    <v-hover>
      <v-card
        :hover="!$store.getters.getViewDialog"
        slot-scope="{ hover }"
        flat
      >
        <v-img
          @click="onImgClick()"
          :src="src"
          :alt="alt"
          :lazy-src="src"
          aspect-ratio="1"
          class="grey lighten-2"
        >
          <v-expand-transition>
            <div
              v-if="hover"
              class="d-flex transition-fast-in-fast-out v-card--reveal black--text"
              style="height: 100%;"
            >
              <ImageUserInfo
                v-if="
                  !$store.getters.getViewDialog &&
                    !$route.path.includes('/user/')
                "
                :username="photo.user.username"
              ></ImageUserInfo>
            </div>
          </v-expand-transition>
        </v-img>
      </v-card>
    </v-hover>
    <v-layout row>
      <v-btn
        :color="FaveType === 'favorite' ? 'pink' : 'grey'"
        v-tooltip="{ content: ' Favourite ' }"
        @click="onBtnClick('favorite')"
        fab
        dark
        small
        class="mr-1"
      >
        <v-icon dark>favorite</v-icon>
      </v-btn>
      <v-btn
        :color="FaveType === 'like' ? 'orange' : 'grey'"
        v-tooltip="{ content: ' Like ' }"
        @click="onBtnClick('like')"
        fab
        dark
        small
        class="ml-1"
      >
        <v-icon dark>grade</v-icon>
      </v-btn>
      <v-spacer> </v-spacer>
      <v-btn
        v-tooltip="{ content: ' Download ' }"
        @click="DownloadImage()"
        fab
        dark
        small
        class="ml-1"
        color="light-green darken-2"
      >
        <v-icon dark>arrow_downward</v-icon>
      </v-btn>
      <a
        ref="downloadImage"
        v-show="false"
        :href="src"
        download="download.jpg"
        target="_blank"
      >
      </a>
    </v-layout>
  </v-card>
</template>

<script>
import "@/assets/css/v-tooltip.css";
import ImageViewPopup from "./ImageViewPopup";
import ImageUserInfo from "./ImageUserInfo";
export default {
  name: "PhotoElement",
  components: {
    ImageViewPopup,
    ImageUserInfo
  },
  props: {
    photo: {
      type: Object,
      required: true
    },
    size: {
      type: String,
      default: "regular"
    },
    photoId: {
      type: String,
      default: "regular",
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {
    FaveType() {
      if (
        this.$store.getters.getFavouriteList.some(
          item => item.id === this.photoId
        )
      ) {
        return "favorite";
      } else if (
        this.$store.getters.getLikedList.some(item => item.id === this.photoId)
      ) {
        return "like";
      } else {
        return null;
      }
    },
    src() {
      return this.photo.urls[this.size];
    },
    alt() {
      return this.photo.description;
    }
  },
  watch: {},
  mounted() {},
  methods: {
    DownloadImage() {
      this.$refs.downloadImage.click();
    },
    onImgClick() {
      if (this.$route.path.includes("/user/")) {
        this.$emit("viewImagePopup", { src: this.src, value: true });
      } else {
        this.$emit("viewUserDialog", { photoId: this.photo.id, value: true });
      }
    },
    onBtnClick(favetype) {
      let SelectedPhotoId = this.photoId;
      let photoObject = this.photo;
      this.$store.dispatch("ToggleLikedFavourite", {
        SelectedPhotoId,
        photoObject,
        favetype
      });
    }
  }
};
</script>
