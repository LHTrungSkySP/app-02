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
      
    };
  },
  components: {},
  props: {
    isCheck: Boolean,
  },
  watch: {
  },

  methods: {
    checkBox() {
        this.$emit("checkBox");
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