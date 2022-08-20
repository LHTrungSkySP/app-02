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
            <input
              v-model="txtEmployeeCode"
              tabindex="1"
              required
              id="so_hieu_can_bo"
              type="text"
              name-property="Số hiệu cán bộ"
              class="input"
            />

            <label class="dialog-grid__item">Học và tên</label>
            <input
              v-model="txtEmployeeFullName"
              tabindex="2"
              required
              id="txtName"
              type="text"
              class="input"
              name-property="Học và tên"
            />

            <!-- row 2 -->

            <label class="dialog-grid__item">Số điện thoại</label>
            <input
              v-model="txtNumberPhone"
              tabindex="3"
              required
              id="txtPhone"
              type=""
              class="input"
              name-property="Số điện thoại"
            />
            <label class="dialog-grid__item">Email</label>
            <input
              v-model="txtEmployeeEmail"
              tabindex="4"
              required
              id="txtEmail"
              type="email"
              class="input"
              name-property="Email"
            />

            <!-- row 3 -->

            <label class="dialog-grid__item">Tổ bộ môn</label>
            <TheCombobox :listOption="listOptionOfGroup"/>


            <label class="dialog-grid__item">QL theo môn</label>
            <TheComboboxCheck :listOption="listOptionOfSubject"/>
            <!-- <div class="combobox">
              <div class="combobox__feild">
                <input
                  tabindex="6"
                  id="input_cbx_Ql_theo_mon"
                  type="text"
                  class="input combobox__input"
                />
                <button
                  id="btn_ql_theo_mon"
                  class="combobox__btn btn-icon btn--white"
                >
                  <img
                    class="icon--24"
                    src="../../../assets/Icons/ic_Chevron.png"
                    alt=""
                  />
                </button>
              </div>

              <div id="cbx_QL_theo_mon" class="combobox__selector">
                <div class="combobox__option">Kho phòng chung</div>
                <div class="combobox__option">Phòng Toán-Lý-Hóa</div>
                <div class="combobox__option">Phòng họp</div>
              </div>
            </div> -->
            <!-- row 4 -->
            <label class="dialog-grid__item">QL kho, phòng</label>
            <div class="combobox col-4">
              <div class="combobox__feild">
                <input
                  tabindex="7"
                  id="input_cbx_ql_kho_phong"
                  type="text"
                  class="input combobox__input"
                />
                <button
                  id="btn_ql_phong_kho"
                  class="combobox__btn btn-icon btn--white"
                >
                  <img
                    class="icon--24"
                    src="../../../assets/Icons/ic_Chevron.png"
                    alt=""
                  />
                </button>
              </div>

              <div id="cbx_QL_phong_kho" class="combobox__selector" hidden>
                <div class="combobox__option">Kho phòng chung</div>
                <div class="combobox__option">Phòng Toán-Lý-Hóa</div>
                <div class="combobox__option">Phòng họp</div>
              </div>
            </div>
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
              <button class="btn">Đồng ý</button>
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
      listOptionOfSubject:[
        {option: "Toán"},
        {option: "Lý"},
        {option: "Hóa"},
        {option: "Sinh"},
        {option: "Ngữ văn"},
        {option: "Lịch sử"},
      ],
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

/* căn giữa các thành phần bên trong dialog  */
</style>