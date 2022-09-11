<template>
  <div id="toast">
    <div class="toast" :class="[toast.color]">
      <div class="toast__icon">
        <div class="icon icon--32" :class="[toast.icon]"></div>
      </div>
      <div class="toast__content">
        <p class="title">
          <b>{{ toast.title }}</b>
        </p>
        <span class="toast__msg">{{ msg }}</span>
      </div>
      <!-- <div class="toast__close toast__icon">
        <i class="fas fa-times"></i>
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "TheToast",
  data() {
    return {
      listToast: [
        {
          name: "warn",
          icon: "icon-warning",
          color: "toast-warning",
          title: "cảnh báo",
        },
        {
          name: "fail",
          icon: "icon-fail",
          color: "toast-fail",
          title: "Lỗi",
        },
        {
          name: "info",
          icon: "icon-info",
          color: "toast-infor",
          title: "Thông báo",
        },

        {
          name: "success",
          icon: "icon-success",
          color: "toast-success",
          title: "Thành công",
        },
      ],
      toast: {},
    };
  },
  props: {
    type: String,
    msg: String,
  },
  created() {
    for (var i = 0; i < Object.keys(this.listToast).length; i++) {
      if (this.listToast[i].name == this.type) {
        this.toast = this.listToast[i];
      }
      // break;
    }
  },
  mounted() {},
};
</script>
<style scoped>
@import url(../../css/base/toast.css);
@import url(../../css/base/icon.css);
.title {
  font-size: 16px;
}
</style>