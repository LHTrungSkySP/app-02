<template>
  <div @click="selectedRecord()" class="combobox__option grid" :class="{'bg': isFocus}">
    <TheCheckBox
        :isCheck="isSelected"
        @checkBox="selectedRecord();selectedRecord()"
      ></TheCheckBox>
    <p>{{option}}</p>
  </div>
</template>
<script>
import TheCheckBox from "@/components/base/TheCheckBox.vue";
export default {
  name: "TheComboboxOption",
  data() {
    return {
      isSelected: false,
      isFocus: false,
    };
  },
  created(){
    for(var i=0;i<this.dataIn.length;i++){
      if(this.option==this.dataIn[i]){
        this.isSelected=true;
      }
    }
  },
  props: [
    //  option
    "option",
    // biết được thằng cha ra lệnh (vểnh tai lên nghe) - vì thằng con lúc đầu nghe cha 
    //nhưng sau 1 vài thao tác 1 trong số nó lười ko nghe nữa, thằng cha phải nói lại
    // nội dung cũ -> nội dung ko thay đổi ->phải lắng tai nghe.
    "parentSpeak",
    // nội dung thằng cha nói ( check all hay remove all)
    "contentSpeak",

    "parentSelect",
    "dataIn",
    "txtOption",
    "havePicked",
  ],
  components: {
    TheCheckBox,
  },
  watch: {
    txtOption: function(){
      for(var i=0;i<this.dataIn.length;i++){
        if(this.option==this.dataIn[i]){
          this.isSelected=true;
        }
      }
      if(this.txtOption==this.option){
        this.isFocus=true;
        this.isSelected=true;
      }
      else{
        this.isFocus=false;
        this.isSelected=false;

      }
    },
    havePicked: function(){
      this.isSelected=false;
    },
 // if the parent speak (check all or remove check all for me) then:
 parentSpeak: function(){
      //thằng cha bảo check all
      if(this.contentSpeak){
        if(this.isSelected==false){// chưa được chọn thì chọn và báo cho thằng cha
          this.$emit("selected", true,this.option); // gửi lên thằng cha tôi đã được select
          this.isSelected=true;
        }
      }
      //thằng cha bảo remove check all
      else{
        if(this.isSelected==true){// được chọn rồi thì bỏ chọn và báo cho thằng cha
          this.$emit("selected", false,this.option); // gửi lên thằng cha tôi đã remove select
          this.isSelected=false;
        } 
      }
    },
    parentSelect: function(){
      if(this.option==this.parentSelect){
        this.isSelected=false;
      }
    },
  },

  methods: {
    selectedRecord() {
      this.isSelected = !this.isSelected;
      this.$emit("selected", this.isSelected,this.option);
    },
  },
};
</script>
<style scoped>
.grid {
  display: grid;
  grid-template-columns: 50px auto;
}
.combobox__option.grid {
  padding: 0;
}
.combobox__option:hover{
    background-color: #CCE8FF;
    cursor: pointer;
}
.bg{
  background-color: #CCE8FF !important;

}
</style>