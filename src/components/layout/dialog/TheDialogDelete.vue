<template>
  <div id="confirm-action" class="confirm-box">
    <div class="dialog">
      <div class="dialog__content">
        <div class="header">
          <p>{{title}}</p>
          <img @click="closeDialog"
            class="icon--24 close-dialog icon"
            src="../../../assets/Icons/ic_X_2.png"
            alt=""
          />
        </div>
        <div class="dialog__msg">{{msg}}</div>
        <div class="footer">
          <button id="btn_dong_y" class="btn">Đồng ý</button>
          <button @click="closeDialog" class="btn btn--white close-dialog">Đóng</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TheDialogDelete",
  components: {},
  props: {
    title: String,
    msg: String,
  },
  methods: {
    closeDialog(){
        this.$emit("close-dialog");
    }
  },
};
</script>
<style scoped>
@import url(../../../css/base/icon.css);
/* căn giữa các thành phần bên trong dialog  */
.dialog {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
/* bo tròn góc  phần nội dung của dialog + bg màu trắng + căn cứ đặt btn x*/
.dialog__content {
  background-color: #ffffff;
  border-radius: 4px;
  position: absolute;
  display: flex;
}
.dialog__content .header {
  padding-top: 16px;
  font-size: 16px;
}

.dialog__content img.close-dialog {
  position: absolute;
  right: 12px;
  top: 12px;
}
.dialog__content .dialog__msg-item {
  margin-bottom: 16px;
}
.dialog__content .footer {
  display: flex;
  flex-direction: row-reverse;
}
</style>