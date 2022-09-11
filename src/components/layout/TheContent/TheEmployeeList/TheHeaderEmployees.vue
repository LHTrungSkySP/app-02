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
      <button class="btn btn--white">Xuất khẩu</button>
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
  type="add" v-if="isShowTheDialogEmployee" 
  @closeDialog="closeTheDialogEmployee"
  officerDetail=""
  />
</template>
<script>
import TheDialogEmployee from '../../dialog/TheDialogEmployee.vue';
import TheDialogConfirm from '../../dialog/TheDialogConfirm.vue';
export default {
  name: "TheHeaderEmployees",
  components:{
    TheDialogEmployee,
    TheDialogConfirm,
  },
  data(){
    return{
      isShowBtnDeleteAll: false,
      isShowTheDialogEmployee: false,
      isShowComfirm: false,
      isShowComfirmAdd: false,

      // từ khóa để search (mã NV, họ tên, Số đt)
      keyword: "",
    }
  },
  methods: {
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
      this.isShowTheDialogEmployee=false;
      if(status=="success"){
        this.$emit("reload");
      }
    },
    talkWithParent(){
      this.$emit("findByKeyword",this.keyword);
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