<template>
  <div class="navbar">
    <!-- navbar left  -->
    <div class="navbar--left">
      <div class="input-container">
        <div class="input-include-icon">
          <input type="text" class="input" v-model="keyword" @change="talkWithParent"/>
          <img
            class="input-icon icon--24"
            src="../../../../assets/Icons/Ic_seerch.png"
            alt=""
          />
          <div class="input-icon seperate"></div>
        </div>
      </div>
    </div>
    <!-- navbar right  -->
    <div class="navbar--right">
      <button @click="showDialogAdd" class="btn">Thêm</button>
      <div >
        <vue-excel-xlsx
        :data="dataExport.data"
        :columns="dataExport.columns"
        :file-name="'filename'"
        :file-type="'xlsx'"
        :sheet-name="'sheetname'"
        class="btn btn--white"
      >
        Xuất khẩu
      </vue-excel-xlsx>
      </div>
      <!-- <button class="btn btn--white"></button> -->
      <button
        id="delete-all"
        class="btn btn-icon btn--white"        
        >
        <div class="icon"></div>
        <img @click="showDeleteAll" class="icon--24" src="../../../../assets/Icons/ic_More.png" alt="" />
        <div @click="showComfirm" class="btn__deleteAll" v-if="isShowBtnDeleteAll">
          <div class="icon icon-delete icon--24"></div>
          <p>Xóa</p>
        </div>
      </button>
    </div>
  </div>
  <TheDialogConfirm 
  title="Thông báo xác nhận xóa" 
  msg="Bạn có chắc chắn muốn xóa các Cán bộ giáo viên mà bạn vừa chọn không ?" 
  v-if="isShowComfirm"
  type="delete"
  @agree="deleteAllSelected"
  @close="isShowComfirm=false"
  />
  <TheDialogEmployee
    title="Thêm cán bộ, nhân viên."
    type="add"
    v-if="isShowTheDialogEmployee"
    @closeDialog="closeTheDialogEmployee"
    officerDetail=""
  />
  <TheToast
    type="success"
    title="Thành công"
    msg="Thêm mới nhân viên thành công"
    v-if="isShowToastSuccessAdd"
  ></TheToast>
  <TheToast
    type="fail"
    title="Thất bại"
    msg="Thêm mới nhân viên thất bại"
    v-if="isShowToastSuccessAddFail"
  ></TheToast>
</template>
<script>
import TheToast from '@/components/base/TheToast.vue';
import TheDialogEmployee from '../../dialog/TheDialogEmployee.vue';
import TheDialogConfirm from '../../dialog/TheDialogConfirm.vue';
import ExportStyle from "../../../../javascript/ExportStyle";
import OfficerExport from "../../../../javascript/OfficerExport";
// import Officer from '@/javascript/Employee';
import axios from "axios";
export default {
  name: "TheHeaderEmployees",
  components:{
    TheDialogEmployee,
    TheDialogConfirm,
    TheToast,
  },
  props:["numberRecord"],
  data(){
    return{
      isShowBtnDeleteAll: false,
      isShowTheDialogEmployee: false,
      isShowComfirm: false,
      isShowComfirmAdd: false,

      // định dạng file excel
      dataExport: ExportStyle,
      // từ khóa để search (mã NV, họ tên, Số đt)
      keyword: "",

      listDetailOfficers: Object,
      stt:0,
      officerExport: OfficerExport,
      sortBy: "OfficerCode",
      isShowToastSuccessAdd:false,
      isShowToastSuccessAddFail: false,
      tam:[],
    }
  },
  created(){
    this.callData_detailOfficers();
  },
  methods: {
    callData_detailOfficers() {
      //   // gọi dữ liệu của nhân viên về
        axios.get("http://localhost:3269/api/Officers/GetDetails?keyword=''&sortBy="+this.sortBy+"&pageSize="+this.numberRecord+"&pageNumber=1").then((res) => {
        this.listDetailOfficers=res.data.listOfficerDetail;
        for(var i=0;i<this.listDetailOfficers.length;i++){
          // // console.log(this.dataExport.data)
          var officer ={
            stt: null,
            officerCode: null,
            officerName: null,
            phoneNumber: null,
            groupName: null,
            subjects: null,
            storageRooms: null,
            emt: null,
            workStatus: null,
          }
          var tam= res.data.listOfficerDetail[i].officer;
        officer.stt=i+1;
          officer.officerCode=tam.officerCode;
          officer.officerName=tam.officerName;
          officer.groupName=tam.groupName;
          officer.phoneNumber=tam.phoneNumber;
          // thêm môn
          var listSubjectName=[];
          for(var z=0;z<this.listDetailOfficers[i].subjects.length;z++){
            listSubjectName.push(this.listDetailOfficers[i].subjects[z].subjectName)
            // alert(this.listDetailOfficers[i].subjects[z].subjectName)
          }
          if(listSubjectName!=[]){
            officer.subjects=listSubjectName.join(", ");
          }
          // thêm phòng kho
          var listStorageRoomsName=[];
          for(var j=0;j<this.listDetailOfficers[i].storageRooms.length;j++){
            listStorageRoomsName.push(this.listDetailOfficers[i].storageRooms[j].storageRoomName)
          }
          if(listStorageRoomsName!=[]){
           officer.storageRooms=listStorageRoomsName.join(", ");
          }

          if(tam.emt==2){
            officer.emt="x";
          }
          else{
           officer.emt="";
          }
          if(tam.workStatus==1){
            officer.workStatus="x";
          }
          else{
            officer.workStatus="";
          }
          this.tam.push(officer);
        }
        this.dataExport.data=this.tam;
        console.log(this.dataExport.data)

      });
    },
    // hieern thị xác nhận thêm
    showComfirm(){
      this.isShowComfirm=!this.isShowComfirm;
    },
    showDialogAdd() {
      this.isShowTheDialogEmployee=true;
    },
    deleteAllSelected() {
      this.isShowComfirm=false;
      this.$emit('deleteAllSelected');
    },
    showDeleteAll(){
      this.isShowBtnDeleteAll=!this.isShowBtnDeleteAll;
    },
    closeTheDialogEmployee(status){
      this.isShowTheDialogEmployee = false;
      if (status == "success") {
        this.isShowToastSuccessAdd=true;
        setTimeout(function () {
          this.isShowToastSuccessAdd = false;
        }.bind(this), 3000);
        this.$emit("reload");
      }
      else if (status == "fail") {
        this.isShowToastSuccessAddFail=true;
        setTimeout(function () {
          this.isShowToastSuccessAddFail = false;
        }.bind(this), 3000);
      }
    },
    talkWithParent(){
      this.$emit("findByKeyword",this.keyword);
    this.callData_detailOfficers();

    },
    abc(){
      alert(this.keyword)
    }
  },
};
</script>
<style scoped>
@import url(@/css/layout/header.css);
@import url(@/css/base/icon.css);
@import url(@/css/base/input.css);
@import url(@/css/base/button.css);
#delete-all {
  position: relative;
}
.btn__deleteAll {
    position: absolute;
    height: 36px;
    width: 96px;
    display: flex;
    background-color: #ffffff;
    border-radius: 5px;
    padding: 0px 10px;
    box-shadow: 0 1px 4px 1px rgb(0 0 0 / 25%);
    right: 0px;
    top: 36px;
    z-index: 1;
}
.btn__deleteAll > div {
  margin: auto 0;
}
.btn__deleteAll > p {
  margin: auto 10px;
}
</style>