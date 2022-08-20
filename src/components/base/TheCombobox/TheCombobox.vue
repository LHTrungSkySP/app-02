<template>
  <div class="combobox">
    <div class="combobox__feild">
      <input v-model="txtGroup"
        tabindex="5"
        type="text"
        class="input combobox__input"
      />
      <button id="btn_to_bo_mon" class="combobox__btn btn-icon btn--white" @click="ShowCbx">
        <img
          class="icon--24"
          src="../../../assets/Icons/ic_Chevron.png"
          alt=""
        />
      </button>
    </div>

    <div id="cbx_to_bo_mon" class="combobox__selector" v-if="isShowCbx">
      <div 
      class="combobox__option" 
      v-for="option in listOption" :key="option.name"
      @click="selectOption(option.option)" 
      >{{option.option}}</div>
    </div>
  </div>
</template>
<script>
export default {
    name: "TheCombobox",
    props:{
        listOption: Object,
    },
    data(){
        return{
            isShowCbx: false,
            txtGroup: "",
        }
    },
    methods:{
        ShowCbx(){
            this.isShowCbx=!this.isShowCbx;
        },
        selectOption(str){
            this.isShowCbx=false;
            this.txtGroup=str;
        }

    }
}
</script>
<style scoped>
@import url(../../../css/base/button.css);
@import url(../../../css/base/combobox.css);
@import url(../../../css/base/input.css);
</style>
