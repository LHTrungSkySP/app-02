<template>
  <div class="navbar">
    <!-- navbar left  -->
    <div class="navbar--left">
      <div class="input-container">
        <div class="input-include-icon">
          <input type="text" class="input" />
          <img
            class="input-icon icon--24"
            src="../../../assets/Icons/Ic_seerch.png"
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
      <button class="btn btn-icon btn--white">
        <div class="icon"></div>
        <img class="icon--24" src="../../../assets/Icons/ic_More.png" alt="" />
      </button>
    </div>
  </div>
</template>
<script>
export default {
    name: "TheHeaderEmployees",
    methods:{
      showDialogAdd(){
        this.$emit('showDialogAdd');
      }
    }
}
</script>
<style scoped>
@import url(../../../css/layout/header.css);
@import url(../../../css/base/icon.css);
@import url(../../../css/base/input.css);
@import url(../../../css/base/button.css);
</style>