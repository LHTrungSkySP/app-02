<template>
  <div class="content">
    <!-- Header các chức năng tùy chọn  -->
    <TheHeaderEmployees :numberRecord="numberRecord" @reload="callData_detailOfficers()" @findByKeyword="findByKeyword" @deleteAllSelected="toggleDeleteAll=!toggleDeleteAll"/>
    <!-- danh sách  -->
    <TheEmployeeList 
    :listDetailOfficers="listDetailOfficers" 
    :toggleDeleteAll="toggleDeleteAll" 
    @deleteOneOfficer="deleteOneOfficer"  
    @reload="callData_detailOfficers()"
    />

    <!-- chuyển trang  -->
    <ThePaging @changPage="changPage" :numberRecord="numberRecord" :pageCount="pageCount" />
  </div>
  <TheToast
    title="Thành công"
    msg="Xóa nhân viên thành công"
    type="success"
    v-if="isShowToastSuccessDelete"
  />
</template>

<script>
import axios from "axios";
import TheToast from "@/components/base/TheToast.vue";
import TheHeaderEmployees from "./TheEmployeeList/TheHeaderEmployees.vue";
import ThePaging from "./ThePaging.vue";
import TheEmployeeList from "./TheEmployeeList/TheEmployeeList.vue";
export default {
  name: "TheContent",
  components: {
    TheEmployeeList,
    TheHeaderEmployees,
    ThePaging,TheToast,
  },
  data() {
    return {
      isShowComfirm:false,

      listDetailOfficers: Object,
      numberRecord: Number,
      sortBy: "OfficerCode",
      pageNumber: 1,
      pageCount: Number,
      pageSize: 50,
      keyword: "",
      isShowToastSuccessDelete:false,


      toggleDeleteAll: false,
    };
  },
  created() {
    this.callData_detailOfficers();
  },

  watch: {
  },
  methods: {
    changPage(num){
      this.pageNumber=num;
      this.callData_detailOfficers();
    },
    // get data
    callData_detailOfficers() {
      //   // gọi dữ liệu của nhân viên về
        axios.get("http://localhost:3269/api/Officers/GetDetails?keyword="+this.keyword+"&sortBy="+this.sortBy+"&pageSize="+this.pageSize+"&pageNumber="+this.pageNumber).then((res) => {
        this.listDetailOfficers = res.data.listOfficerDetail;
        this.numberRecord = res.data.total;
        this.pageCount= Math.ceil(this.numberRecord/this.pageSize)

      });
    },
    // delete data
    callAPI_deleteOfficers(id) {
        axios.delete("http://localhost:3269/api/Officers/"+id).then((res) => {
          console.log(res);
          this.callData_detailOfficers();   
          this.isShowToastSuccessDelete=true;
          setTimeout(function () {
          this.isShowToastSuccessDelete = false;
        }.bind(this), 3000);  

      });
    },
    deleteOneOfficer(id){
      this.callAPI_deleteOfficers(id);
    },
    findByKeyword(k){
      this.keyword=k;
      this.callData_detailOfficers();
    },
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