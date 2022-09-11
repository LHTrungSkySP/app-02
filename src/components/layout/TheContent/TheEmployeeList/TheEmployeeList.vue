<!-- Quản lý toàn bộ sự kiện trên table  -->
<template>
  <div class="table-container">
    <!-- table  -->
    <table class="table">
      <thead>
        <tr>
          <th style="text-align: center">
            <TheCheckBox :isCheck="isCheckBoxHeader" @checkBox="checkBoxHeader"/>
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
        v-for="officerDetail in listDetailOfficers" 
        :key="officerDetail"
        :officerDetail="officerDetail"
        :parentSpeak="meSpeak"
        :contentSpeak="contentSpeak"
        @selected="countRecordBeSelected"
        @editDetailOfficer="showTheDialogEmployee"

        @deleteOfficer="showDeleteOfficer"

        :toggleDeleteAll="toggleDeleteAll"
        @getOfficerID="deleteOfficerByID"
        
        />
      </tbody>
    </table>
  </div>
  <TheDialogEmployee 
  type="edit" 
  title="Sửa cán bộ, nhân viên." 
  v-if="isShowTheDialogEmployee" 
  @closeDialog="closeTheDialogEmployee"
  :officerDetail="officerDetail"
  />
<TheDialogConfirm 
v-show="isShowComfirm" 
@close="function(){isShowComfirm=false}" 
type="delete" 
@agree="agreeDeleteOficer"
title="Thông báo xác nhận xóa" 
  msg="Bạn có chắc chắn muốn xóa các Cán bộ giáo viên mà bạn vừa chọn không ?" 
/>
</template>
<script>

import TheEmployeeRecord from "./TheEmployeeRecord.vue";
import TheCheckBox from "@/components/base/TheCheckBox.vue";
import TheDialogEmployee from "../../dialog/TheDialogEmployee.vue";
import TheDialogConfirm from "../../dialog/TheDialogConfirm.vue";
export default {
  name: "TheEmployeeList",
  props: ["listDetailOfficers","toggleDeleteAll"],
  components: {
    TheEmployeeRecord,
    TheCheckBox,
    TheDialogEmployee,
    TheDialogConfirm,
  },
  created() {
  },
  data() {
    return {
      // số lượng bản ghi chi tiết nhân viên
      len_listDetailOfficers: this.listDetailOfficers.length,

      // số lượng bản ghi được chọn
      numberOfRecordsSelected: 0,
      
      // trạng thái của check box header 
      isCheckBoxHeader: false,      
      // liên hệ vs các bản ghi con
      meSpeak: false,
      contentSpeak: false,

      // liên hệ vs dialog
      isShowTheDialogEmployee: false,
      isShowComfirm: false,

      idDelete: "",
      toggleDeleteOne:false,

      // chi tiết nhân viên cần sửa
      officerDetail: Object,
    };
  },
  watch: {
    toggleDeleteAll: function(){
      
    }
  },
  methods: {
    
    countRecordBeSelected(isSelected){
      if(isSelected){
        this.numberOfRecordsSelected++;
        if(this.numberOfRecordsSelected==this.listDetailOfficers.length){
          this.isCheckBoxHeader=true;
        }
      }
      else{
        this.numberOfRecordsSelected--;
        if(this.numberOfRecordsSelected<this.listDetailOfficers.length){
          this.isCheckBoxHeader=false;
        }
      }
    },
    // nói chuyện với bản ghi (con) về check
    checkBoxHeader(){
      this.isCheckBoxHeader=!this.isCheckBoxHeader;
      this.meSpeak=!this.meSpeak;
      if(this.isCheckBoxHeader==true){
        this.contentSpeak=true;
      }
      else{
        this.contentSpeak=false;       
      }      
    },

    // dialog edit
    closeTheDialogEmployee(status){
      this.isShowTheDialogEmployee=false;
      if(status=="success"){
        this.$emit("reload");
      }
    },
    showTheDialogEmployee(ob){
      this.officerDetail=ob;
      // console.log(this.officerDetail.officer)
      this.isShowTheDialogEmployee=true;
    },

    // list OfficerID must delete
    
    agreeDeleteOficer(){
      this.isShowComfirm=false;
      // alert(this.idDelete)
      this.$emit("deleteOneOfficer",this.idDelete);
    },

    showDeleteOfficer(id){
      this.isShowComfirm=true;
      this.idDelete=id;
    },

    deleteOfficerByID(id){
      this.$emit("deleteOneOfficer",id);
    }
  },
};
</script>
<style scoped>
@import url(@/css/main.css);
@import url(@/css/base/table.css);
@import url(@/css/base/icon.css);
@import url(@/css/base/button.css);
</style>















