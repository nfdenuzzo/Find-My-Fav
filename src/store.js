import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ],
  state: {
    Filter: null,
    LoggedIn: false,
    LikedList: [],
    FavouriteList: [],
    ViewPhotoViewDialog: false,
    ViewDialog: false,
    ViewImagePopup: false,
    Photos: [],
    FavedPhotos: [],
    Paging: {
      totalItems: 0,
      currentPage: 1,
      pageSize: 10,
      totalPages: 0
    },
    FavedFilter: null,
    NewPageNumber: 1
  },
  getters: {
    getFavedFilter: state => state.FavedFilter,
    getFilter: state => state.Filter,
    getLoggedIn: state => state.LoggedIn,
    getLikedList: state => state.LikedList,
    getFavouriteList: state => state.FavouriteList,
    getViewPhotoViewDialog: state => state.ViewPhotoViewDialog,
    getViewDialog: state => state.ViewDialog,
    getViewImagePopup: state => state.ViewImagePopup,
    getNewPageNumber: state => state.NewPageNumber,
    getCurrentPage: state => state.Paging.currentPage,
    getPageSize: state => state.Paging.pageSize,
    getTotalCount: state => state.Paging.totalItems,
    getPaging: state => state.Paging,
    getPhotos: state => state.Photos,
    getFavedPhotos: state => state.FavedPhotos
  },
  actions: {
    ToggleLikedFavouritePhotos(context) {
      let FavedPhotos = [];
      let result = [];
      let resultFav = context.state.FavouriteList.map(a => a.photo);
      let resultLiked = context.state.LikedList.map(a => a.photo);
      if (context.state.FavedFilter === "liked and faved") {
        result = FavedPhotos.concat(resultFav, resultLiked);
      }
      if (context.state.FavedFilter === "liked") {
        result = resultLiked;
      }
      if (context.state.FavedFilter === "faved") {
        result = resultFav;
      }
      context.commit("setTotalItems", result.length);
      context.commit("setFavedPhoto", result);
    },
    ToggleLikedFavourite(context, { SelectedPhotoId, photoObject, favetype }) {
      let PhotoObject = photoObject;
      let IdPhoto = SelectedPhotoId;
      let TypeFav = favetype;
      var clearingLike = false;
      var clearingFav = false;
      for (let i = 0; i < context.state.LikedList.length; i++) {
        if (context.state.LikedList[i].id === IdPhoto) {
          context.commit("removeLike", i);
          if (TypeFav === "like") {
            clearingLike = true;
          }
        }
      }
      for (let i = 0; i < context.state.FavouriteList.length; i++) {
        if (context.state.FavouriteList[i].id === IdPhoto) {
          context.commit("removeFavourite", i);
          if (TypeFav === "favorite") {
            clearingFav = true;
          }
        }
      }
      if (TypeFav === "like" && !clearingLike) {
        context.commit("setLiked", { id: IdPhoto, photo: PhotoObject });
      }
      if (TypeFav === "favorite" && !clearingFav) {
        context.commit("setFavourite", { id: IdPhoto, photo: PhotoObject });
      }
    }
  },
  mutations: {
    setFavedPhoto(state, payload) {
      state.FavedPhotos = payload;
    },
    setFavedFilter(state, payload) {
      state.FavedFilter = payload;
    },
    setTotalItems(state, payload) {
      state.Paging.totalItems = payload;
    },
    setFilter(state, payload) {
      state.Filter = payload;
    },
    updatePager(state, payload) {
      state.Paging.pageSize = parseInt(payload.paging.pageSize);
      state.Paging.totalPages = payload.paging.totalPages;
      state.Paging.currentPage = payload.paging.pageNumber;
      state.Paging.totalItems = payload.paging.totalItems;
    },
    resetPager(state) {
      state.Paging.pageSize = 10;
      state.Paging.totalPages = 0;
      state.Paging.currentPage = 1;
      state.Paging.totalItems = 0;
    },
    setNewPageNumber(state, payload) {
      state.NewPageNumber = payload;
    },
    setPhotos(state, payload) {
      state.Photos = payload;
    },
    resetPhotos(state) {
      state.Photos = [];
    },
    setPagingSize(state, payload) {
      state.Paging.pageSize = parseInt(payload.data);
    },
    setPagingCurrentPage(state, payload) {
      state.Paging.currentPage = payload.data;
    },
    setViewImagePopup(state, payload) {
      state.ViewImagePopup = payload;
    },
    setViewDialog(state, payload) {
      state.ViewDialog = payload;
    },
    setViewPhotoViewDialog(state, payload) {
      state.ViewPhotoViewDialog = payload;
    },
    setLoggedIn(state, payload) {
      state.LoggedIn = payload;
    },
    setLiked(state, payload) {
      state.LikedList.push(payload);
    },
    setFavourite(state, payload) {
      state.FavouriteList.push(payload);
    },
    removeFavourite(state, payload) {
      if (payload > -1) {
        state.FavouriteList.splice(payload, 1);
      }
    },
    removeLike(state, payload) {
      if (payload > -1) {
        state.LikedList.splice(payload, 1);
      }
    }
  }
});
