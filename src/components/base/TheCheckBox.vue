<template>
  <div
    @click="checkBox"
    class="checkBoxNoActive"
    :class="{ checkBoxNoActive: !isCheck, checkBoxActive: isCheck }"
  ></div>
</template>
<script>
export default {
  name: "TheCheckBox",
  data() {
    return {
      isCheck: false,
    };
  },
  components: {},
  props: {
    type: String,
    isCheckAll: Boolean,
    isCheckHeader: Boolean,
  },
  watch: {
    isCheckAll: function () {
      if (this.isCheckAll) {
        this.isCheck = true;
      } else {
        this.isCheck = false;
      }
    },
    isCheckHeader: function () {
      this.isCheck = this.isCheckHeader;
    },
  },

  methods: {
    checkBox() {
      // nút ở header, gửi sự kiện check all
      if (this.type == "header") {
        this.$emit("toggleCheckAll");
      }
      // ấn nút ở tbody : đảo trạng thái, gửi sự kiện check lên row
      else{
        // gửi trạng thái lên thằng cha
        this.isCheck = !this.isCheck;
        this.$emit("check", this.isCheck);
      }
      // bỏ hover khi nút được ấn ( nếu không ảnh hover sẽ đè lên ảnh active)
      if (this.isCheck) {
        this.isHover = false;
      } else {
        this.isHover = true;
      }
    },
  },
};
</script>
<style scoped>
div {
  height: 24px;
  width: 24px;
  background-position: center;
  margin: auto;
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
}
.checkBoxNoActive {
  background-image: url(../../assets/Icons/ic_Checkbox_Inactive.png);
}
.checkBoxNoActive:hover:not(.checkBoxActive) {
  background-image: url(../../assets/Icons/ic_Checkbox_Hover.png);
}
.checkBoxActive {
  background-image: url(../../assets/Icons/ic_Checkbox_Active.png);
}
</style>