<template>
  <div class="combobox" :class="{ 'col-4': isBig }">
    <div class="combobox__feild">
      <input
        v-model="txtGroup"
        tabindex="5"
        type="text"
        class="input combobox__input"
      />
      <button
        id="btn_to_bo_mon"
        class="combobox__btn btn-icon btn--white"
        @click="ShowCbx"
      >
        <img
          class="icon--24"
          src="../../../assets/Icons/ic_Chevron.png"
          alt=""
        />
      </button>
    </div>

    <div class="combobox__selector" v-if="isShowCbx">
      <!-- header -->
      <div class="grid">
        <TheCheckBox
          :isCheckHeader="isCheckHeader"
          type="header"
          @toggleCheckAll="toggleCheckAll"
        />
        <p>Tất cả</p>
      </div>
      <div class="sperate_row"></div>
      <!-- các sự lựa chọn  -->
      <TheComboboxOption
        @conutSelected="conutSelected"
        :isCheckAll="isCheckAll"
        v-for="post in this.listOption"
        :key="post.EmployeeCode"
        :post="post"
      />
    </div>
  </div>
</template>
<script>
import TheCheckBox from "@/components/base/TheCombobox/TheCheckBox.vue";
import TheComboboxOption from "./TheComboboxOption.vue";
export default {
  name: "TheCombobox",
  components: {
    TheCheckBox,
    TheComboboxOption,
  },
  props: {
    listOption: Object,
    type: String,
  },
  data() {
    return {
      isShowCbx: false,
      txtGroup: "",
      // check toàn bộ không
      isCheckAll: false,
      // có check nút ở header ko
      isCheckHeader: false,
      // tổng row đc chọn
      countSeleceted: 0,
      // tổng nhân viên đc load trên trang
      countOption: this.listOption.length,
      isBig: false,
    };
  },
  created() {    
      if (this.type == "big") {
        this.isBig = true;
      }
    },
  watch: {

    countSeleceted: function () {
      if (this.countSeleceted == 0) {
        this.isCheckAll = false;
        this.isCheckHeader = false;
      } else if (this.countSeleceted < this.countOption) {
        this.isCheckHeader = false;
      }
      // if(this.countSeleceted==0){
      //   this.isCheckAll=false;
      // }
      else {
        this.isCheckHeader = true;
        this.isCheckAll = true;
      }
      //   this.isCheckAll=this.isCheckHeader;
    },
  },
  methods: {
    ShowCbx() {
      this.isShowCbx = !this.isShowCbx;
    },
    selectOption(str) {
      this.isShowCbx = false;
      this.txtGroup = str;
    },
    // check all check box
    toggleCheckAll() {
      this.isCheckAll = !this.isCheckAll;
      //   if (this.isCheckAll) {
      //     this.countSeleceted = this.countOption;
      //   } else {
      //     this.countSeleceted = 0;
      //   }
    },
    // count checkbox have selected
    conutSelected(isCheck, str) {
      if (isCheck) {
        this.txtGroup += str + " ";
        this.countSeleceted++;
      } else {
        this.txtGroup = this.txtGroup.replace(str + " ", "");
        this.countSeleceted--;
      }
    },
  },
};
</script>
<style scoped>
@import url(../../../css/base/button.css);
@import url(../../../css/base/combobox.css);
@import url(../../../css/base/input.css);
@import url(../../../css/base/table.css);

.grid {
  display: grid;
  grid-template-columns: 50px auto;
}
.combobox__option.grid {
  padding: 0;
  background-color: #ffffff;
}
.sperate_row {
  height: 1.5px;
  width: 80%;
  background-color: #ddd;
  margin: 10px auto;
}
</style>
