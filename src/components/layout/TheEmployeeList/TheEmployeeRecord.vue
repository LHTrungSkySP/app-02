<template>
  <tr :class="{ 'bg-selected': isSelected }">
    <td>
      <TheCheckBox :type="normal" :isCheckAll="isCheckAll" @check="toggleCheck"></TheCheckBox>
    </td>
    <td class="text-align--center">{{ post.EmployeeCode }}</td>
    <td>{{ post.FirstName }} {{ post.LastName }} {{ post.EmployeeName }}</td>
    <td>{{ post.PhoneNumber }}</td>
    <td>Tổ Toán - Tin</td>
    <td>Lý</td>
    <td>Phòng Tin, phòng TN hóa...</td>
    <td>
      <div class="check-box check-tick icon"></div>
    </td>
    <td>
      <div class="check-box check-tick icon"></div>
    </td>
    <td style="width: 80px">
      <div class="item-align--center">
        <div @click="showDialogEdit" class="icon-edit icon"></div>
        <div @click="showNotification" class="icon-delete icon"></div>
      </div>
    </td>
  </tr>
</template>
<script>
import TheCheckBox from "@/components/base/TheCheckBox.vue";
export default {
  name: "TheEmployeeList",
  data() {
    return {
      isSelected: false,
    };
  },
  props: {
    post: Object,
    isCheckAll: Boolean,
  },
  components: {
    TheCheckBox,
  },
  watch: {
    isCheckAll: function () {
      this.isSelected = this.isCheckAll;
    },
  },

  methods: {
    toggleCheck(ischeck) {
      this.isSelected = ischeck;
      this.$emit("conutSelected",ischeck);
    },
  },
};
</script>
<style scoped>
@import url(../../../css/main.css);
@import url(../../../css/base/table.css);
@import url(../../../css/base/icon.css);
.bg-selected {
  background-color: #f5f6fa;
}
</style>