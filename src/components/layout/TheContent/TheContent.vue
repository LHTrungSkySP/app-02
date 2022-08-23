<template>
  <div class="content">
    <!-- Header các chức năng tùy chọn  -->
    <TheHeaderEmployees
      @isShowDeleteAll="ShowBtnDeleteAll"
      @deleteAllSelected="deleteAllSelected"
      @showDialogAdd="isShowDialogAdd = !isShowDialogAdd"
      :isShowDeleteAll="isShowBtnDeleteAll"
    />

    <!-- danh sách  -->
    <TheEmployeeList
      @isDeleteSuccess="deleteSuccess"
      :isDeleteAllSelected="isDeleteAllSelected"
      @countEmployee="countEmployee"

    />

    <!-- chuyển trang  -->
    <ThePaging :countEmployee="numberEmployee" />
  </div>

<!-- các dialog bổ sung chức năng  -->
  <!-- dialog thêm nhân viên  -->
  <TheDialogEmployee
    type="add"
    title="Thêm hồ sơ Cán bộ, giáo viên"
    @closeDialog="closeDialog"
    v-if="isShowDialogAdd"
  />
  <!-- <div id="toast">
    <Transition v-for="toast in listToast" :key="toast">
      <TheToast :type="toast.typeToast" msg="Thêm Cán bộ thành công" />
    </Transition>
  </div> -->

  <!-- dialog xác nhận xóa  -->
  <TheDialogConfirm
    @delete="deleteRecord"
    @close="closeDialogConfirm"
    @agree="agreeDeleteAll"
    title="Thông báo"
    msg="Bạn có chắc chắn muốn xóa Cán bộ giáo viên đang chọn không?"
    type="delete"
    v-if="isShowDialogConfirmDelete"
  />
</template>


<script>

import TheEmployeeList from "./TheEmployeeList/TheEmployeeList.vue";
import TheHeaderEmployees from "./TheEmployeeList/TheHeaderEmployees.vue";
import ThePaging from "./ThePaging.vue";
import TheDialogEmployee from "../dialog/TheDialogEmployee.vue";
// import TheToast from "@/components/base/TheToast.vue";
import TheDialogConfirm from "../dialog/TheDialogConfirm.vue";

export default {
  name: "TheContent",
  components: {
    TheEmployeeList,
    TheHeaderEmployees,
    ThePaging,
    TheDialogEmployee,
    // TheToast,
    TheDialogConfirm,
  },
  data() {
    return {
      // listToast: [],
      // show dialog

      isShowDialogAdd: false,
      isShowDialogEdit: false,
      isShowDialogConfirmDelete: false,

      isDeleteAllSelected: false,
      isShowBtnDeleteAll: false,

      numberEmployee: 0,
      // testShowToast: false,
      // typeToast: "",
    };
  },
  watch: {
    // typeToast: function () {
    //   this.testShowToast = true;
    // },
    // testShowToast: function () {
    //   setTimeout(() => (this.testShowToast = false), 5000);
    // },
    // listToast: function () {
    //   alert(1)
      
    // },
  },
  methods: {
    closeDialog() {
      this.isShowDialogAdd = !this.isShowDialogAdd;
      // if (str != undefined) {
      //   this.listToast.push({ typeToast: str, msg: "Thêm thánh công" });
      //   // setTimeout(() => (this.listToast.shift()), 2000);
      //   // this.typeToast = str;
      // }
    },
    closeDialogConfirm() {
      this.isShowDialogConfirmDelete = false;
    },
    deleteAllSelected() {
      this.isShowDialogConfirmDelete = true;
    },
    agreeDeleteAll() {
      this.isShowDialogConfirmDelete = false;
      this.isDeleteAllSelected = true;
      this.listToast.push({typeToast: "success  ", msg: "xoas thánh công"})
      // setTimeout(() => (this.listToast.shift()), 2000);
    },
    deleteSuccess() {
      this.isDeleteAllSelected = false;
      this.isShowBtnDeleteAll = false;
      
    },
    ShowBtnDeleteAll() {
      this.isShowBtnDeleteAll = !this.isShowBtnDeleteAll;
    },
    countEmployee(len) {
      this.numberEmployee = len;
    },
    deleteRecord() {},
  },
};
</script>
<style scoped>
@import url(@/css/layout/content.css);
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>