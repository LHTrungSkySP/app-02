<!-- Quản lý toàn bộ sự kiện trên table  -->
<template>
  <div class="table-container">
    <!-- table  -->
    <table class="table">
      <thead>
        <tr>
          <th style="text-align: center">
            <TheCheckBox :isCheckHeader="isCheckHeader" type="header" @toggleCheckAll="toggleCheckAll"/>
          </th>
          <th>Số hiệu cán bộ</th>
          <th>Học và tên</th>
          <th>Số điện thoại</th>
          <th>Tổ chuyên môn</th>
          <th>QL theo môn</th>
          <th>QL kho, phòng</th>
          <th>Đào tạo QLTB</th>
          <th>Đang làm việc</th>
          <th style="width: 80px"></th>
        </tr>
      </thead>
      <tbody> 
        <TheEmployeeRecord 
        @conutSelected="conutSelected" 
        :isCheckAll="isCheckAll" 
        v-for="post in this.posts" :key="post.EmployeeCode" 
        :post="post"/>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "axios";
import TheEmployeeRecord from "./TheEmployeeRecord.vue";
import TheCheckBox from "@/components/base/TheCheckBox.vue";
export default {
  name: "TheEmployeeList",
  created() {
    axios.get("https://amis.manhnv.net/api/v1/Employees").then((response) => {
      this.posts = response.data;
      this.countEmployee=response.data.length;
    });
  },
  data() {
    return {
      post: {
        EmployeeCode: "2",
        FullName: "",
        PhoneNumber: "",
        Gender: "",
      },
      posts: Object,
      // check toàn bộ không
      isCheckAll: false,
      // có check nút ở header ko
      isCheckHeader: false,
      // tổng row đc chọn
      countSeleceted: 0,
      // tổng nhân viên đc load trên trang
      countEmployee: 0,


    };
  },
  components: {
    TheEmployeeRecord,
    TheCheckBox,
  },
  watch:{
    countSeleceted: function(){
      if(this.countSeleceted==0){
        this.isCheckAll=false;
        this.isCheckHeader=false;
      }
      else if(this.countSeleceted<this.countEmployee){
        this.isCheckHeader=false;
      }
      // if(this.countSeleceted==0){
      //   this.isCheckAll=false;
      // }
      else{
        this.isCheckHeader=true;
        this.isCheckAll=true;
      }
        // this.isCheckAll=this.isCheckHeader;
    }
  },
  methods: {
    // check all check box
    toggleCheckAll(){
      this.isCheckAll=!this.isCheckAll;
      if(this.isCheckAll){
        this.countSeleceted=this.countEmployee;
      }
      else{
        this.countSeleceted=0;
      }
    },
    // count checkbox have selected
    conutSelected(isCheck){
      if(isCheck){
        this.countSeleceted++;
      }
      else{
        this.countSeleceted--;
      }
    },

    //closeDialog
    closeDialog(){
      this.showDialogAdd= false;
      this.showDialogEdit= false;
    }
  },
};
</script>
<style scoped>
@import url(../../../css/main.css);
@import url(../../../css/base/table.css);
@import url(../../../css/base/icon.css);
</style>