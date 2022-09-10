<template>
  <div class="combobox" :class="{ 'col-4': isBig }">
    <div class="combobox__feild">
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
      <TheContentSelect
        v-for="selected in listSelected"
        :key="selected"
        :content="selected"
        @remove="removeSelect"
      />
    </div>

    <div class="combobox__selector" v-show="isShowCbx">
      <!-- header -->
      <div class="grid">
        <TheCheckBox :isCheck="isCheckBoxHeader" @checkBox="checkBoxHeader" />
        <p>Tất cả</p>
      </div>
      <div class="sperate_row"></div>
      <!-- các sự lựa chọn  -->

      <TheComboboxOption
        :parentSpeak="meSpeak"
        :contentSpeak="contentSpeak"
        @selected="countRecordBeSelected"
        v-for="post in this.listOption"
        :key="post"
        :option="post"
        :parentSelect="selectContent"
        :dataIn="dataIn"
      />
    </div>
  </div>
</template>
<script>
import TheCheckBox from "@/components/base/TheCheckBox.vue";
import TheComboboxOption from "./TheComboboxOption.vue";
import TheContentSelect from "./TheContentSelect.vue";
export default {
  name: "TheCombobox",
  components: {
    TheCheckBox,
    TheComboboxOption,
    TheContentSelect,
  },
  props: {
    listOption: Object,
    type: String,

    dataIn: [],
    parentSpeak: Boolean,
  },
  data() {
    return {
      isShowCbx: false,
      txtGroup: "",

      // số lượng bản ghi được chọn
      numberOfRecordsSelected: 0,

      // trạng thái của check box header
      isCheckBoxHeader: false,
      // liên hệ vs các bản ghi con
      meSpeak: false,
      contentSpeak: false,

      // tổng nhân viên đc load trên trang
      countOption: this.listOption.length,
      isBig: false,

      listSelected: [],
      selectContent: "",
    };
  },
  created() {
    if (this.type == "big") {
      this.isBig = true;
    }
    if(this.dataIn!=[]){
      for(var i=0;i<this.dataIn.length;i++){
        this.numberOfRecordsSelected++;
        // console.log(this.listOption.length)
        if (this.numberOfRecordsSelected >= this.listOption.length) {
          this.isCheckBoxHeader = true;
        }
        this.listSelected.push(this.dataIn[i]);
      }
    }
  },
  watch: {
    parentSpeak: function(){
      this.$emit("selectPost",this.listSelected);
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
    countRecordBeSelected(isSelected, option) {
      if (isSelected) {
        this.numberOfRecordsSelected++;
        if (this.numberOfRecordsSelected == this.listOption.length) {
          this.isCheckBoxHeader = true;
        }
        this.listSelected.push(option);
        this.$emit("selectPost",this.listSelected);
      } else {
        this.numberOfRecordsSelected--;
        if (this.numberOfRecordsSelected < this.listOption.length) {
          this.isCheckBoxHeader = false;
        }
        this.listSelected.splice(this.listSelected.indexOf(option), 1);
        this.$emit("selectPost",this.listSelected);
      }
    },
    checkBoxHeader() {
      this.isCheckBoxHeader = !this.isCheckBoxHeader;
      this.meSpeak = !this.meSpeak;
      if (this.isCheckBoxHeader == true) {
        this.contentSpeak = true;
      } else {
        this.contentSpeak = false;
      }
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

    removeSelect(content) {
      this.listSelected.splice(this.listSelected.indexOf(content), 1);
      this.selectContent=content;
      this.numberOfRecordsSelected--;
      this.isCheckBoxHeader = false;
      this.$emit("selectPost",this.listSelected);
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
.combobox>.combobox__feild{
  min-height: unset;
}
</style>
