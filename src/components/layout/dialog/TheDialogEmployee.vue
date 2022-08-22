<template>
  <div id="dialogFormEmployee" class="dialog-container">
    <!-- màn phủ  -->
    <div class="dialog">
      <!-- phần chứa nọi dung bên trong dialog-->
      <div class="dialog__content">
        <!-- icon đóng dialog  -->
        <img
          @click="closeDialog"
          class="icon--24 close-dialog icon"
          src="../../../assets/Icons/ic_X_2.png"
          alt=""
        />

        <!-- phần chọn ảnh ở bên trái -->
        <div class="dialog__content--left">
          <div class="img-selected icon">
            <button class="btn">Chọn ảnh</button>
          </div>
          <p class="title">Họ và tên</p>
          <p>Số hiệu cán bộ</p>
        </div>
        <div class="seperate"></div>
        <!-- phần form bên phải      -->
        <div class="dialog__content--right">
          <div class="dialog-grid">
            <div class="header dialog-grid__item">
              <p>{{ title }}</p>
            </div>
            <!-- row 1 -->
            <label class="dialog-grid__item" for="">Số hiệu cán bộ</label>
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
            </div>

            <label class="dialog-grid__item">Họ và tên</label>
            <div class="input-container">
              <input
                v-model="txtEmployeeFullName"
                tabindex="2"
                required
                id="txtName"
                type="text"
                class="input"
                name-property="Học và tên"
                :class="{ 'border--red': !isValidate[1] }"
              />
              <div class="input input-msg" v-if="!isValidate[1]">
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
                :class="{ 'border--red': !isValidate[2] }"
              />
              <div class="input input-msg" v-if="!isValidate[2]">
                <div id="triangle-right"></div>
                <p>Số điện thoại cán bộ không được bỏ trống.</p>
              </div>
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
                :class="{ 'border--red': !isValidate[3] }"
              />
              <div class="input input-msg" v-if="!isValidate[3]">
                <div id="triangle-right"></div>
                <p>Email cán bộ không được bỏ trống.</p>
              </div>
            </div>

            <!-- row 3 -->

            <label class="dialog-grid__item">Tổ bộ môn</label>
            <TheCombobox :listOption="listOptionOfGroup" />

            <label class="dialog-grid__item">QL theo môn</label>
            <TheComboboxCheck :listOption="listOptionOfSubject" />
            <!-- row 4 -->
            <label class="dialog-grid__item">QL kho, phòng</label>
            <!-- <div class="combobox col-4"> -->
            <TheComboboxCheck
              type="big"
              :listOption="listOptionOfStorageRoom"
            />
            <!-- </div> -->
            <div class="tick-status-employee dialog-grid__item">
              <div class="check-box--normal icon"></div>
              <div>Trình độ nghiệp vụ QLTB</div>
              <div class="check-box--normal icon"></div>
              <div>Đang làm việc</div>
              <div class="dataTime">
                <div class="input-container">
                  <label for="">Ngày nghỉ việc</label>

                  <div><input type="date" name="" id="" /></div>

                  <!-- <div class="input-include-icon">
                                        <input type="text" class="input">
                                        <img class="input-icon icon--24" src="../assets/Icons/Ic_seerch.png" alt="">
                                        <div sty class="input-icon seperate"></div>
                                    </div> -->
                </div>
              </div>
            </div>

            <div class="footer dialog-grid__item">
              <button @click="actionAgree" class="btn">Đồng ý</button>
              <button @click="closeDialog" class="btn btn--white close-dialog">
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import TheCombobox from "@/components/base/TheCombobox/TheCombobox.vue";
import TheComboboxCheck from "@/components/base/TheCombobox/TheComboboxCheck.vue";
export default {
  name: "TheDialog",
  components: {
    TheCombobox,
    TheComboboxCheck,
  },
  created() {
    if (this.type == "add") {
      axios
        .get("https://amis.manhnv.net/api/v1/Employees/NewEmployeeCode")
        .then((response) => {
          this.txtEmployeeCode = response.data;
        });
    }
  },
  mounted() {
    this.$refs.EmloyeeCode.focus();
  },
  props: {
    type: String,
    title: String,
  },
  data() {
    return {
      // combobox tổ bộ môn
      listOptionOfGroup: [
        { option: "Tổ Toán - Tin" },
        { option: "Tổ Lý - Hóa" },
        { option: "Tổ Sinh - Sử - Địa" },
        { option: "Tổ Anh văn" },
        { option: "Tổ Ngữ văn" },
        { option: "Tổ Văn phòng" },
      ],
      // combobox môn
      listOptionOfSubject: [
        { option: "Toán" },
        { option: "Lý" },
        { option: "Hóa" },
        { option: "Sinh" },
        { option: "Ngữ văn" },
        { option: "Lịch sử" },
      ],
      // combobox quản lý phòng kho
      listOptionOfStorageRoom: [
        { option: "Phòng Toán - Lý" },
        { option: "Phòng Hóa Sinh" },
        { option: "Kho phòng chung" },
      ],

      // validate
      isValidate: [true, true, true, true],

      txtEmployeeCode: "",
      txtEmployeeFullName: "",
      txtNumberPhone: "",
      txtEmployeeEmail: "",
    };
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    actionAgree() {
      if (this.type == "add") {
        this.addEmployee();
      } else {
        this.editEmployee();
      }
    },
    addEmployee() {
      if (this.validate()) {
        this.$emit("closeDialog", "success");
      }
    },
    editEmployee() {
      this.validate();
    },
    validate() {
      this.isValidate = [true, true, true, true];
      if (this.txtEmployeeCode == "") {
        // alert("không được để trống Số hiệu cán bộ");
        this.isValidate[0] = false;
      }
      if (this.txtEmployeeFullName == "") {
        // alert("không được để trống Họ và tên");
        this.isValidate[1] = false;
      }
      if (this.txtNumberPhone == "") {
        // alert("không được để trống Số điện thoại");
        this.isValidate[2] = false;
      }
      if (this.txtEmployeeEmail == "") {
        // alert("không được để trống Email");
        this.isValidate[3] = false;
      }
      if (this.isValidate.includes(false)) {
        return false;
      }
      return true;
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

/* căn giữa các thành phần bên trong dialog  */
</style>