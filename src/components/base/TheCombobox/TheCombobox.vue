<template>  
  <div ref="cbxParent"  @keyup.down="ShowCbxByTab" class="combobox">
    <div class="combobox__feild">
      <input  v-model="txtGroup"
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
    <div tabindex="6" ref="cbx"  @keyup.enter="this.$emit('selectPost',this.txtGroup);this.isShowCbx=false;"  @keyup.down="posDown" @keyup.up="posUp" id="cbx_to_bo_mon" class="combobox__selector" v-show="isShowCbx">
      <div 
      class="combobox__option"      
      v-for="option in listOption" :key="option"
      :class="{'bg': option==txtGroup}"
      @click="selectOption(option)" 
      >{{option}}</div>
    </div>    
  </div>
</template>
<script>

export default {
    name: "TheCombobox",
    props:{
        listOption: Object,
        listOptionSelected: Object,
        parentSpeak: Boolean,
      },
    data(){
      return{
        isShowCbx: false,
        txtGroup: this.listOptionSelected,

        // ví trí focus
        posFocus: -1,
      }
    },
    watch:{
      parentSpeak: function(){
        this.$emit("selectPost",this.txtGroup);
      },
      txtGroup: function(){
        this.$emit("selectPost",this.txtGroup);
      }
    },
    created() {
    },
    methods:{
      posDown(){
        if(this.posFocus<this.listOption.length-1){
          this.posFocus++;
          this.txtGroup=this.listOption[this.posFocus];

        }
      },
      posUp(){
        if(this.posFocus>=1){
          this.posFocus--;
          this.txtGroup=this.listOption[this.posFocus];
        }
      },
      ShowCbx(){
        this.isShowCbx=!this.isShowCbx;
      },
      selectOption(str){
        this.isShowCbx=false;
        this.txtGroup=str;

      },

      ShowCbxByTab(){
        this.isShowCbx=true;
        this.$refs.cbx.focus();
      }
        

    }
}
</script>
<style scoped>
@import url(../../../css/base/button.css);
@import url(../../../css/base/combobox.css);
@import url(../../../css/base/input.css);
.combobox>.combobox__feild>.combobox__btn{
  position: relative;
    top: -100%;
}
.bg{
  background-color: #CCE8FF;
}
</style>
