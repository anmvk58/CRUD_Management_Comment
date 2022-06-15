$(function(){
    $("#header").load("header.html"); 
    $("#body").load("body.html"); 
    $("#footer").load("footer.html"); 
  });

function HomePage(){
  $("#body").load("body.html"); 
}  

function ViewListEmployee(){
  $("#body").load("listEmployee.html"); 
  buildTable();
}

// Khai báo danh sách nhân viên
var employees = [];
var counter = 0;

// Hàm khởi tạo của đối tượng Employee
function Employee(name, department, phone) {
    this.id = ++counter;
    this.name = name;
    this.department = department;
    this.phone = phone;
}

// Hàm khởi tạo ra các dữ liệu Employees
function initEmployees() {
    if (null == employees || employees.length == 0) { 
        // init data
        employees.push(new Employee("Tùng Lê", "Tester", "0912358486"));
        employees.push(new Employee("Bảy Đăng", "Development", "0989268899"));
        employees.push(new Employee("Bùi Văn Điệu", "PM", "0365845215"));
        employees.push(new Employee("VTI School", "School", "09XXXXXX"));
        // $.get("https://61da6004ce86530017e3cd2d.mockapi.io/employees", function(data, status){
        //     data.forEach(function(item){
        //         // console.log(item.name)
        //         // console.log(item.deapartment)
        //         // console.log(item.phone)
        //         // console.log(item.id)
        //         employees.push(new Employee(item.name, item.department, item.phone))
        //     })
        //   })

    }
}

// Hàm dùng để in ra danh sách employees lên table html
function buildTable() {
    setTimeout(function name(params) {

        $('tbody').empty();
        initEmployees();

        employees.forEach(function(item) {
            $('tbody').append(
                '<tr>' +
                '<td>' + item.id + '</td>' +
                '<td>' + item.name + '</td>' +
                '<td>' + item.department + '</td>' +
                '<td>' + item.phone + '</td>' +
                '<td>' +
                '<a class="edit" title="Edit" data-toggle="tooltip" onclick="openUpdateModal(' + item.id + ')"><i class="material-icons">&#xE254;</i></a>' +
                '<a class="delete" title="Delete" data-toggle="tooltip" onClick="openConfirmDelete(' + item.id + ')"><i class="material-icons">&#xE872;</i></a>' +
                '</td>' +
                '</tr>')
        });

    }, 500);
}

// Hàm thực hiện confirm trước khi xóa
function openConfirmDelete(id) {
    // get index from employee's id
    var index = employees.findIndex(x => x.id == id);
    var name = employees[index].name;

    var result = confirm("Bạn có chắc chắn muốn xóa " + name + " ra khỏi danh sách?");
    if (result) {
        deleteEmployee(id);
    }
}

// Hàm để hiện thị modal thêm mới
function openAddModal() {
    resetForm();
    document.getElementById("title_modal").innerHTML = "Thêm mới nhân viên";
    openModal();
}

// Hàm xóa đi 1 Employee
function deleteEmployee(id) {
    // TODO validate
    var index = employees.findIndex(x => x.id === id);
    employees.splice(index, 1);

    showSuccessAlert();
    buildTable();
}

// Hàm để show thông báo khi thành công
function showSuccessAlert() {
    $("#success-alert").fadeTo(2000, 500).slideUp(500, function() {
        $("#success-alert").slideUp(500);
    });
}

// Hàm hiển thị modal
function openModal() {
    $('#myModal').modal('show');
}

// Hàm ẩn moal
function hideModal() {
    $('#myModal').modal('hide');
}

// Hàm để thêm 1 employee vào danh sách:
function addEmployee() {
    var name = document.getElementById("name").value;
    var department = document.getElementById("department").value;
    var phone = document.getElementById("phone").value;

    // TODO validate
    // then fail validate ==> return;

    employees.push(new Employee(name, department, phone));

    hideModal();
    showSuccessAlert();
    buildTable();
}

// Mở ra modal của đối tượng cần sửa thông tin
function openUpdateModal(id) {
    document.getElementById("title_modal").innerHTML = "Sửa thông tin nhân viên";
    // get index from employee's id
    var index = employees.findIndex(x => x.id == id);

    // fill data
    document.getElementById("id").value = employees[index].id;
    document.getElementById("name").value = employees[index].name;
    document.getElementById("department").value = employees[index].department;
    document.getElementById("phone").value = employees[index].phone;

    openModal();
}

// Hàm update thông tin của 1 employee
function updateEmployee() {
    var id = document.getElementById("id").value;
    var name = document.getElementById("name").value;
    var department = document.getElementById("department").value;
    var phone = document.getElementById("phone").value;

    // TODO validate
    // then fail validate ==> return;

    // get index from employee's id
    var index = employees.findIndex(x => x.id == id);

    // update employee
    employees[index].name = name;
    employees[index].department = department;
    employees[index].phone = phone;

    hideModal();
    showSuccessAlert();
    buildTable();
}

// Hàm chức năng cho nút Save ở Modal 
function save() {
    var id = document.getElementById("id").value;

    if (id == null || id == "") {
        addEmployee();
    } else {
        updateEmployee();
    }
}

// Hàm đưa các trường dữ liệu ở modal về rỗng 
function resetForm() {
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("department").value = "";
    document.getElementById("phone").value = "";
}

