<template>
  <div class="content">
    <TheHeaderEmployees  @showDialogAdd="isShowDialogAdd=!isShowDialogAdd"/>
    <TheEmployeeList />
    <ThePaging />
  </div>
  <TheDialogEmployee
    type="add"
    title="Thêm hồ sơ Cán bộ, giáo viên"
    @closeDialog="isShowDialogAdd=!isShowDialogAdd"
    v-if="isShowDialogAdd"
  />
</template>
<script>
import TheEmployeeList from "../TheEmployeeList/TheEmployeeList.vue";
import TheHeaderEmployees from "../TheEmployeeList/TheHeaderEmployees.vue";
import ThePaging from "../../base/ThePaging.vue";
import TheDialogEmployee from "../dialog/TheDialogEmployee.vue";

export default {
  name: "TheContent",
  components: {
    TheEmployeeList,
    TheHeaderEmployees,
    ThePaging,
    TheDialogEmployee,
  },
  data() {
    return {

      // show dialog
      isShowDialogAdd: true,
      isShowDialogEdit: false,
    };
  },
  methods:{

  }
};
</script>
<style scoped>
@import url(../../../css/layout/content.css);
</style>