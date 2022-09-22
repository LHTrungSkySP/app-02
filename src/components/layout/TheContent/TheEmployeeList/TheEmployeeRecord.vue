<template>
  <tr :class="{ 'bg-selected': isSelected }">
    <td>
      <TheCheckBox
        :isCheck="isSelected"
        @checkBox="selectedRecord()"
      ></TheCheckBox>
    </td>
    <td class="text-align--left">{{ officer.officerCode }}</td>
    <td style="color: #0dd469" @click="editDetailOfficer">{{ officer.officerName }}</td>
    <td>{{ officer.phoneNumber }}</td>
    <td>{{ officer.groupName }}</td>
    <td>
      {{subjects}}
    </td>
    <td>
      {{storageRooms}}
    </td>
    <td>
      <div
        class="check-box icon"
        :class="{ 'check-tick': isTickTrained }"
      ></div>
    </td>
    <td>
      <div class="check-box icon" :class="{ 'check-tick': isTickWorked }"></div>
    </td>
    <td style="width: 80px">
      <div class="item-align--center">
        <div @click="editDetailOfficer" class="icon-edit icon"></div>
        <div @click="deleteOfficer" class="icon-remove icon"></div>
      </div>
    </td>
  </tr>
</template>
<script>
// import axios from "axios";

import TheCheckBox from "@/components/base/TheCheckBox.vue";
export default {
  name: "TheOfficerList",
  components: {
    TheCheckBox,
  },
  data() {
    return {
      // di truyền check cho checkbox con
      isSelected: false,

      isTickTrained: false,
      isTickWorked: false,

      officer: this.officerDetail.officer,
      subjects: Object,
      storageRooms: this.officerDetail.storageRooms,
    };
  },
  props: [
    // thông tin chi tiết của 1 Officer
    "officerDetail",
    // biết được thằng cha ra lệnh (vểnh tai lên nghe) - vì thằng con lúc đầu nghe cha 
    //nhưng sau 1 vài thao tác 1 trong số nó lười ko nghe nữa, thằng cha phải nói lại
    // nội dung cũ -> nội dung ko thay đổi ->phải lắng tai nghe.
    "parentSpeak",
    // nội dung thằng cha nói ( check all hay remove all)
    "contentSpeak",
    "toggleDeleteAll"
  ],
  created() {
    //hiển thị môn
      var tam=[];
      for(var i=0;i<this.officerDetail.subjects.length;i++){
        tam.push(this.officerDetail.subjects[i].subjectName);
      }
      this.subjects=tam.join(" ,");

    //hiển thị kho phòng
    tam=[];
      for(i=0;i<this.officerDetail.storageRooms.length;i++){
        tam.push(this.officerDetail.storageRooms[i].storageRoomName);
      }
      this.storageRooms=tam.join(" ,");

    // hiển thị tình trạng đào tạo và làm việc
      if (this.officer.emt > 1) {
        this.isTickTrained = true;
      }
      if (this.officer.workStatus == 1) {
        this.isTickWorked = true;
      }
  },
  watch: {
    // if the parent speak (check all or remove check all for me) then:
    parentSpeak: function(){
      //thằng cha bảo check all
      if(this.contentSpeak){
        if(this.isSelected==false){// chưa được chọn thì chọn và báo cho thằng cha
          this.$emit("selected", true); // gửi lên thằng cha tôi đã được select
          this.isSelected=true;
        }
      }
      //thằng cha bảo remove check all
      else{
        if(this.isSelected==true){// được chọn rồi thì bỏ chọn và báo cho thằng cha
          this.$emit("selected", false); // gửi lên thằng cha tôi đã remove select
          this.isSelected=false;
        } 
      }
    },
    // lắng nghe khi user muốn xóa nhiều
    toggleDeleteAll: function(){
      if(this.isSelected==true){
        this.$emit("getOfficerID",this.officer.officerID);
      }
    },
  },
  methods: {
    selectedRecord() {
      this.isSelected = !this.isSelected;
      this.$emit("selected", this.isSelected);
    },
    editDetailOfficer(){
      this.$emit("editDetailOfficer",this.officerDetail);
      console.log(this.officerDetail)
    },
    deleteOfficer(){
      // axios.delete("http://localhost:3269/api/Officers/"+this.officer.officerID);
      this.$emit("deleteOfficer",this.officer.officerID);
    }
  },
};
</script>
<style scoped>
@import url(@/css/main.css);
@import url(@/css/base/table.css);
@import url(@/css/base/icon.css);
.bg-selected {
  background-color: #CCE8FF !important;
}
</style>