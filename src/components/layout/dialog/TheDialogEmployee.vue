<template>
  <div id="dialogFormEmployee" class="dialog-container">
    <!-- màn phủ  -->
    <div class="dialog">
      <!-- phần chứa nọi dung bên trong dialog-->
      <div class="dialog__content">
        <!-- icon đóng dialog  -->
        <div
            @click="closeDialog"
            class="icon--24 icon-closeDialog icon close-dialog"
          />

        <!-- phần chọn ảnh ở bên trái -->
        <div class="dialog__content--left">
          <div class="img-selected icon">
            <button class="btn">Chọn ảnh</button>
          </div>
          <p class="title">{{txtEmployeeFullNameLeft}}</p>
          <p>{{txtEmployeeCodeLeft}}</p>
        </div>
        <div class="seperate"></div>
        <!-- phần form bên phải      -->
        <div class="dialog__content--right">
          <div class="dialog-grid">
            <div class="header dialog-grid__item">
              <p>{{ title }}</p>
            </div>
            <!-- row 1 -->
            <label class="dialog-grid__item" for="">Số hiệu cán bộ <span style="color:red;">*</span></label>
            <div class="input-container">
              <input
                ref="EmloyeeCode"
                v-model="txtEmployeeCode"
                tabindex="1"
                required
                id="so_hieu_can_bo"
                type="text"
                name-property="Số hiệu cán bộ"
                class="input"
                :class="{ 'border--red': !isValidate[0] }"
              />
              <div class="input input-msg" v-if="!isValidate[0]">
                <div id="triangle-right"></div>
                <p>Số hiệu cán bộ không được bỏ trống.</p>
              </div>
              <div class="input input-msg" v-if="!isValidate[1]">
                <div id="triangle-right"></div>
                <p>Số hiệu cán bộ đã tồn tại!</p>
              </div>
            </div>

            <label class="dialog-grid__item">Họ và tên <span style="color:red;">*</span></label>
            <div class="input-container">
              <input
                v-model="txtEmployeeFullName"
                tabindex="2"
                required
                id="txtName"
                type="text"
                class="input"
                name-property="Học và tên"
                :class="{ 'border--red': !isValidate[2] }"
              />
              <div class="input input-msg" v-if="!isValidate[2]">
                <div id="triangle-right"></div>
                <p>Họ tên cán bộ không được bỏ trống.</p>
              </div>
            </div>

            <!-- row 2 -->

            <label class="dialog-grid__item">Số điện thoại</label>
            <div class="input-container">
              <input
                v-model="txtNumberPhone"
                tabindex="3"
                required
                id="txtPhone"
                type=""
                class="input"
                name-property="Số điện thoại"
              />
            </div>

            <!-- email  -->
            <label class="dialog-grid__item">Email</label>
            <div class="input-container">
              <input
                v-model="txtEmployeeEmail"
                tabindex="4"
                required
                id="txtEmail"
                type="email"
                class="input"
                name-property="Email"
              />
            </div>
            <!-- row 3 -->
            <label class="dialog-grid__item">Tổ bộ môn</label>
            <TheCombobox
              tabindex="5"
              @selectPost="groupToPost"
              :parentSpeak="isPostAPI"
              :listOptionSelected="officer.groupName"
              :listOption="listOptionOfGroupName"
            />
            <label class="dialog-grid__item">QL theo môn</label>
            <TheComboboxCheck
              tabindex="7"
              @selectPost="addSubjectPost"
              :dataIn="subjects"
              :listOption="listOptionOfSubjectName"
            />
            <!-- row 4 -->
            <label class="dialog-grid__item">QL kho, phòng</label>
            <!-- <div class="combobox col-4"> -->
            <TheComboboxCheck
              tabindex="9"
              @selectPost="addStorageRoomPost"
              :dataIn="storageRooms"
              type="big"
              :listOption="listOptionOfStorageRoomName"
            />

            <!-- trạng thái đào tạo -->
            <div class="tick-status-employee dialog-grid__item">
              <div class="status">
                <TheCheckBox
                  tabindex="10"
                  @keydown.enter="isTrain = true"
                  @checkBox="isTrain = !isTrain"
                  :isCheck="isTrain"
                />
                <div>Trình độ nghiệp vụ QLTB</div>
              </div>
              <div class="status">
                <TheCheckBox
                  tabindex="11"
                  @keydown.enter="isWork = true"
                  @checkBox="isWork = !isWork"
                  :isCheck="isWork"
                />
                <div>Đang làm việc</div>
              </div>
              <div class="dataTime">
                <div class="input-container">
                  <label for="">Ngày nghỉ việc</label>
                  <span>
                    <input type="date" name="date">
                  </span>
                </div>
              </div>
            </div>

            <div class="footer dialog-grid__item">
              <button tabindex="12" @click="showComfirm" class="btn">
                Đồng ý
              </button>
              <button
                tabindex="12"
                @click="closeDialog"
                class="btn btn--white close-dialog"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <TheDialogConfirm
    v-if="isShowConfirmAdd"
    title="Thông báo thêm mới"
    msg="Bạn có chắc chắn muốn thêm nhân viên bạn vừa nhập không?"
    @close="isShowConfirmAdd = false"
    @agree="addEmployee()"
  />
  <TheDialogConfirm
    v-if="isShowConfirmEdit"
    title="Thông báo sửa"
    msg="Bạn có chắc chắn muốn sửa thông tin nhân viên bạn vừa chọn không?"
    @close="isShowConfirmEdit = false"
    @agree="editEmployee()"
  />
</template>
<script>
import axios from "axios";
import TheCombobox from "@/components/base/TheCombobox/TheCombobox.vue";
import TheComboboxCheck from "@/components/base/TheCombobox/TheComboboxCheck.vue";
import TheCheckBox from "@/components/base/TheCheckBox.vue";
import Employee from "@/javascript/Employee";
import TheDialogConfirm from "./TheDialogConfirm.vue";
// import Subject from "@/javascript/Subject";
// import StorageRoom from "@/javascript/StorageRoom";
import officerDetail from "@/javascript/OfficerDetail";
// import group from "@/javascript/Group";

export default {
  name: "TheDialog",
  components: {
    TheCombobox,
    TheComboboxCheck,
    TheCheckBox,
    TheDialogConfirm,
  },
  created() {
    this.callAPI();

  },
  mounted() {
    this.$refs.EmloyeeCode.focus();
  },
  props: ["type", "title", "officerDetail"],
 
  data() {
    return {
      isShowConfirmEdit: false,
      isShowConfirmAdd: false,

      isWork: false,
      isTrain: false,
      // combobox tổ bộ môn
      listOptionOfGroup: [],
      // combobox môn
      listOptionOfSubject: [],
      // combobox quản lý phòng kho
      listOptionOfStorageRoom: [],

      listOptionOfSubjectName: [],
      listOptionOfStorageRoomName: [],
      listOptionOfGroupName: [],

      // validate
      isValidate: [true, true,true],

      txtEmployeeCode: "",
      txtEmployeeFullName: "",
      txtNumberPhone: "",
      txtEmployeeEmail: "",

      txtEmployeeFullNameLeft: "Họ và tên",
      txtEmployeeCodeLeft: "Số hiệu cán bộ",

      officer: Object,
      subjects: [],
      storageRooms: [],

      // sẵn sàng gọi api thêm hoạc sửa chưa
      isPostAPI: false,

      employee: Employee,
      officerDetailPost: officerDetail,
    };
  },
  watch: {
    groupPost: function () {
      // alert(this.groupPost)
    },
    txtEmployeeFullName: function(){
      if(this.txtEmployeeFullName!=""){
        this.txtEmployeeFullNameLeft=this.txtEmployeeFullName;
      }
      else{
        this.txtEmployeeFullNameLeft= "Họ và tên";
      }
    },
    txtEmployeeCode: function(){
      if(this.txtEmployeeCode!=""){
        this.txtEmployeeCodeLeft=this.txtEmployeeCode;
      }
      else{
        this.txtEmployeeCodeLeft="Số hiệu cán bộ";
      }
    },
  },
  methods: {
    showComfirm() {
      if (this.validate()) {
        if (this.type == "add") {
          this.isShowConfirmAdd = true;
        } else if (this.type == "edit") {
          this.isShowConfirmEdit = true;
        }
      }
    },

    addSubjectPost(ob) {
      var tam = [];
      for (var i = 0; i < ob.length; i++) {
        for (var j = 0; j < this.listOptionOfSubject.length; j++) {
          if (this.listOptionOfSubject[j].SubjectName == ob[i]) {
            tam.push(this.listOptionOfSubject[j]);
          }
        }
        // var pos=this.listOptionOfSubject.indexOf(ob[i]);
        // =this.listOptionOfSubject[pos];
      }
      this.officerDetailPost.subjects = tam;
    },
    addStorageRoomPost(ob) {
      var tam = [];
      this.storageRoomsPost = ob;
      for (var i = 0; i < ob.length; i++) {
        for (var j = 0; j < this.listOptionOfStorageRoom.length; j++) {
          if (this.listOptionOfStorageRoom[j].StorageRoomName == ob[i]) {
            tam.push(this.listOptionOfStorageRoom[j]);
          }
        }
        // var pos=this.listOptionOfSubject.indexOf(ob[i]);
        // =this.listOptionOfSubject[pos];
      }
      this.officerDetailPost.storageRooms = tam;
    },
    closeDialog() {
      this.$emit("closeDialog");
    },
    // actionAgree() {
    //   this.isPostAPI=true;
    //   if (this.type == "add") {
    //     this.addEmployee();
    //   } else {
    //     this.editEmployee();
    //   }
    // },
    addEmployee() {
      // console.log(this.groupPost)

      this.officerDetailPost.officer.officerCode = this.txtEmployeeCode;
      this.officerDetailPost.officer.officerName = this.txtEmployeeFullName;
      this.officerDetailPost.officer.email = this.txtEmployeeEmail;
      this.officerDetailPost.officer.phoneNumber = this.txtNumberPhone;
      if (this.isTrain == true) {
        this.officerDetailPost.officer.emt = 2;
      } else {
        this.officerDetailPost.officer.emt = 1;
      }
      if (this.isWork == true) {
        this.officerDetailPost.officer.workStatus = 1;
      } else {
        this.officerDetailPost.officer.workStatus = 0;
      }

      console.log(this.officerDetailPost.officer);
      console.log(this.officerDetailPost.subjects);
      console.log(this.officerDetailPost.storageRooms);
      axios
        .post(
          "http://localhost:3269/api/Officers/officerDetail",
          this.officerDetailPost
        )
        .then((response) => {
          if(response.status==207){
            this.isValidate[1]=false;
            this.$emit("closeDialog", "fail");
          }
          else{
            console.log(response);
            this.$emit("closeDialog", "success");

          }
        });
    },
    editEmployee() {
        this.officerDetailPost.officer.officerID =
          this.officerDetail.officer.officerID;
        this.officerDetailPost.officer.officerCode = this.txtEmployeeCode;
        this.officerDetailPost.officer.officerName = this.txtEmployeeFullName;
        this.officerDetailPost.officer.email = this.txtEmployeeEmail;
        this.officerDetailPost.officer.phoneNumber = this.txtNumberPhone;
        
        if (this.isTrain == true) {
          this.officerDetailPost.officer.emt = 2;
        } else {
          this.officerDetailPost.officer.emt = 1;
        }
        if (this.isWork == true) {
          this.officerDetailPost.officer.workStatus = 1;
        } else {
          this.officerDetailPost.officer.workStatus = 0;
        }
        console.log(this.officerDetailPost);
        axios
          .put(
            "http://localhost:3269/api/Officers/officerDetail",
            this.officerDetailPost
          )
          .then((response) => {
            this.$emit("closeDialog", "success");
            console.log(response);
          });
      
    },
    validate() {
      this.isValidate = [true, true,true];
      if (this.txtEmployeeCode == "") {
        // alert("không được để trống Số hiệu cán bộ");
        this.isValidate[0] = false;
      }
      if (this.txtEmployeeFullName == "") {
        // alert("không được để trống Họ và tên");
        this.isValidate[2] = false;
      }
      if (this.isValidate.includes(false)) {
        return false;
      }
      return true;
    },
    callAPI() {
      if (this.type == "add") {
        axios
          .get("http://localhost:3269/api/Officers/NewCode")
          .then((response) => {
            this.txtEmployeeCode = response.data;
          });
      }
      if (this.type == "edit") {
        this.officer = this.officerDetail.officer;
        for (var i = 0; i < this.officerDetail.subjects.length; i++) {
          this.subjects.push(this.officerDetail.subjects[i].subjectName);
        }
        for (var j = 0; j < this.officerDetail.storageRooms.length; j++) {
          this.storageRooms.push(
            this.officerDetail.storageRooms[j].storageRoomName
          );
        }

        this.txtEmployeeCode = this.officer.officerCode;
        this.txtEmployeeFullName = this.officer.officerName;
        this.txtEmployeeEmail = this.officer.email;
        this.txtNumberPhone = this.officer.phoneNumber;
        this.officerDetailPost.officer.groupID = this.officerDetail.officer.groupID;
    this.officerDetailPost.officer.groupName = this.officerDetail.officer.groupName;

        this.officer.emt > 1 ? (this.isTrain = true) : (this.isTrain = false);
        this.officer.workStatus == 1  ? (this.isWork = true) : (this.isWork = false);
      }
      // get data to cbx Subject
      axios.get("http://localhost:3269/api/Subjects").then((response) => {
        for (var i = 0; i < response.data.length; i++) {
          this.listOptionOfSubject.push(response.data[i]);
          this.listOptionOfSubjectName.push(response.data[i].SubjectName);
        }
      });
      //get data to cbx StorageRoom
      axios.get("http://localhost:3269/api/StorageRooms").then((response) => {
        for (var i = 0; i < response.data.length; i++) {
          this.listOptionOfStorageRoom.push(response.data[i]);
          this.listOptionOfStorageRoomName.push(
            response.data[i].StorageRoomName
          );
        }
      });
      // get data to cbx Group
      axios.get("http://localhost:3269/api/Groups").then((response) => {
        for (var i = 0; i < response.data.length; i++) {
          this.listOptionOfGroup.push(response.data[i]);
          this.listOptionOfGroupName.push(response.data[i].GroupName);
        }
      });
    },
    groupToPost(ob) {
      for (var i = 0; i < this.listOptionOfGroup.length; i++) {
        if (ob == this.listOptionOfGroup[i].GroupName) {
          this.officerDetailPost.officer.groupID =this.listOptionOfGroup[i].GroupID;
          this.officerDetailPost.officer.groupName =this.listOptionOfGroup[i].GroupName;
          
        }
      }
    },
  },
};
</script>
<style scoped>
@import url(../../../css/base/icon.css);
@import url(../../../css/base/button.css);
@import url(../../../css/base/combobox.css);
@import url(../../../css/base/input.css);
@import url(../../../css/main.css);
@import url(../../../css/layout.css);
@import url(../../../css/base/dialog.css);
@import url(../../../css/base/geometri.css);
.border--red {
  border-color: red;
}
.input-container {
  position: relative;
  display: block;
}
.dataTime span {
  margin-left: 20px;
  right: 0;
}
.dataTime {
  position: absolute;
  right: 16px;
}
.status {
  display: flex;
}
.status {
  line-height: 24px;
}

/* căn giữa các thành phần bên trong dialog  */
</style>