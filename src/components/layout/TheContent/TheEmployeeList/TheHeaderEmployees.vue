<template>
  <div class="navbar">
    <!-- navbar left  -->
    <div class="navbar--left">
      <div class="input-container">
        <div class="input-include-icon">
          <input type="text" class="input" />
          <img
            class="input-icon icon--24"
            src="../../../../assets/Icons/Ic_seerch.png"
            alt=""
          />
          <div class="input-icon seperate"></div>
        </div>
      </div>
    </div>
    <!-- navbar right  -->
    <div class="navbar--right">
      <button @click="showDialogAdd" class="btn">Thêm</button>
      <button class="btn btn--white">Xuất khẩu</button>
      <button
        id="delete-all"
        class="btn btn-icon btn--white"
        
      >
        <div class="icon"></div>
        <img @click="showDeleteAll" class="icon--24" src="../../../../assets/Icons/ic_More.png" alt="" />
        <div @click="deleteAllSelected" class="btn__deleteAll" v-if="isShowBtnDeleteAll">
          <div class="icon icon-delete icon--24"></div>
          <p>Xóa</p>
        </div>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "TheHeaderEmployees",
  props:{
    // isShowDeleteAll: Boolean,
  },
  data(){
    return{
      isShowBtnDeleteAll: false,
    }
  },
  methods: {
    showDialogAdd() {
      this.$emit("showDialogAdd");
    },
    deleteAllSelected() {
      this.$emit("deleteAllSelected");
    },
    showDeleteAll(){
      this.isShowBtnDeleteAll=!this.isShowBtnDeleteAll;
    },
  },
};
</script>
<style scoped>
@import url(@/css/layout/header.css);
@import url(@/css/base/icon.css);
@import url(@/css/base/input.css);
@import url(@/css/base/button.css);
#delete-all {
  position: relative;
}
.btn__deleteAll {
    position: absolute;
    height: 36px;
    width: 96px;
    display: flex;
    background-color: #ffffff;
    border-radius: 5px;
    padding: 0px 10px;
    box-shadow: 0 1px 4px 1px rgb(0 0 0 / 25%);
    right: 0px;
    top: 36px;
    z-index: 1;
}
.btn__deleteAll > div {
  margin: auto 0;
}
.btn__deleteAll > p {
  margin: auto 10px;
}
</style>