const ExportStyle={
    columns : [
        {
            label: "STT",
            field: "stt",
        },
        {
            label: "Số hiệu cán bộ",
            field: "officerCode",
        },
        {
            label: "Họ và tên",
            field: "officerName",
        },
        {
            label: "Số điện thoại",
            field: "phoneNumber",
        },
        {
            label: "Tổ chuyên môn",
            field: "groupName",
        },
        {
            label: "Quản lý thiết bị môn",
            field: "subjects"
        },
        {
            label: "Quản lý kho - phòng",
            field: 'storageRooms',
        },        
        {
            label: "Đào tạo QLTB",
            field: "emt",
        },        {
            label: "Đang làm việc",
            field: "workStatus",
        },
    ],
    data : [
        {
            stt:1,
            officerCode: "Beverage",
            officerName:  "NV01",      
            phoneNumber: "0385482258",
            groupName: "Trung",
            subjects: "abc",
            storageRooms:"cba",
            emt: "x",
            workStatus: "x",
        }
    ],

}
export default ExportStyle;