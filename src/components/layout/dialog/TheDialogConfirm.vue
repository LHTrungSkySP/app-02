<template>
  <div class="dialog-container confirm-box" style="z-index:2">
    <div class="dialog">
      <div class="dialog__content">
        <div class="header">
          <p class="title">
            <b>{{ title }}</b>
          </p>
          <div
            @click="closeDialog"
            class="icon--24 icon-closeDialog icon close-dialog"
          />
        </div>
        <div class="dialog__msg">{{ msg }}</div>
        <div class="footer">
          <button tabindex="13" @click="actionAgree" class="btn">Đồng ý</button>
          <button tabindex="13" @click="closeDialog" class="btn btn--white">Đóng</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TheDialogConfirm",
  data() {},
  created() {},
  props: ["title","msg","type"],
  methods: {
    closeDialog() {
      this.$emit("close");
    },
    actionAgree() {
        this.$emit("agree");
        this.closeDialog();
    },
  },
};
</script>

<style scoped>
@import url(../../../css/base/comfirm-box.css);
@import url(../../../css/base/dialog.css);
@import url(../../../css/base/button.css);
.title {
  font-size: 16px;
}
.header {
  height: 46px;
}
.footer {
  display: flex;
  /* flex-direction:row; */
}
</style>