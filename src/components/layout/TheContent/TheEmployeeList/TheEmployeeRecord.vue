<template>
  <tr :class="{ 'bg-selected': isSelected }">
    <td>
      <TheCheckBox
        :isCheck="isSelected"
        @checkBox="selectedRecord"
      ></TheCheckBox>
    </td>
    <td class="text-align--center">{{ officer.officerCode }}</td>
    <td>{{ officer.officerName }}</td>
    <td>{{ officer.phoneNumber }}</td>
    <td>{{ officer.groupName }}</td>
    <td>
      <span v-for="subject in subjects" :key="subject">
        {{ subject.subjectName }}&nbsp;,
      </span>
    </td>
    <td>
      <span v-for="storageRoom in storageRooms" :key="storageRoom">
        {{ storageRoom.storageRoomName }}&nbsp;,
      </span>
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
        <div @click="showDialogEdit" class="icon-edit icon"></div>
        <div @click="showDialogAdd" class="icon-remove icon"></div>
      </div>
    </td>
  </tr>
</template>
<script>
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
      subjects: this.officerDetail.subjects,
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
  ],
  created() {
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
    }
  },
  methods: {
    selectedRecord() {
      this.isSelected = !this.isSelected;
      this.$emit("selected", this.isSelected);
    },
    
  },
};
</script>
<style scoped>
@import url(@/css/main.css);
@import url(@/css/base/table.css);
@import url(@/css/base/icon.css);
.bg-selected {
  background-color: #f5f6fa;
}
</style>
<!-- 
data() {
  return {
    isSelected: false,
  };
},
props: {
  post: Object,
  isCheckAll: Boolean,
},
components: {
  TheCheckBox,
},
watch: {
  isCheckAll: function () {
    this.isSelected = this.isCheckAll;
  },
},

methods: {
  // gửi sự kiện đc chọn lên Elist
  toggleCheck(ischeck) {
    this.isSelected = ischeck;
    this.$emit("conutSelected",ischeck,this.post.OfficerCode);
  },

  
  editOfficer(){
    this.$emit("editOfficer",this.post.OfficerCode)
  },
  deleteOfficer(){
    this.$emit("deleteOfficer",this.post.OfficerCode)
  }
}, -->