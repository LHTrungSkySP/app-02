<template>
  <div class="layout">
    <!-- thanh menu -->

    <div class="main">
      <!-- header của main  -->
     
      <div class="content content--alert">
        <img :src="require('../../../assets/Icons/ic_Alert.png')" />
        <div class="header">
          <p>Chưa có Dữ liệu</p>
        </div>
        <p>
          Vui lòng chọn Thêm mới hoặc Nhập khẩu để lấy danh sách
          hiện có tại trường
        </p>
        <div>
          <button class="btn">Thêm mới</button>
          <button class="btn">Nhập khẩu</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
// import TheDatePicker from "../../base/TheDatePicker.vue"
export default {
  name: "TheDeviceContent",
  components:{
    // TheDatePicker,
  }
};
</script>
<style scoped>
@import url(../../../css/main.css);
@import url(../../../css/layout);
</style>
