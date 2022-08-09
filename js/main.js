var DanhSachQuanLy = [];

function clearForm() {
  document.getElementById("myModal").classList.remove("show");
  document.getElementsByClassName("modal-backdrop")[0].classList.remove("show");
  document.querySelector("#tknv").value = "";
  document.querySelector("#name").value = "";
  document.querySelector("#email").value = "";
  document.querySelector("#password").value = "";
  document.querySelector("#datepicker").value = "";
  document.querySelector("#luongCB").value = "";
  document.querySelector("#chucvu").value = "";
  document.querySelector("#gioLam").value = "";
  var spander = document.querySelectorAll(".sp-thongbao");
  var i;
  for (i = 0; i < spander.length; i++) {
    spander[i].style.display = "none";
  }
}

function TaoDanhSach() {
  var TaiKhoanID = document.querySelector("#tknv").value;
  var HoTenDayDu = document.querySelector("#name").value;
  var EmailAdress = document.querySelector("#email").value;
  var MatKhauPass = document.querySelector("#password").value;
  var NgayLamViec = document.querySelector("#datepicker").value;
  var LuongNV = document.querySelector("#luongCB").value;
  var ChucVuNV = document.querySelector("#chucvu").value;
  var GioLamNV = document.querySelector("#gioLam").value;
  var spander = document.querySelectorAll(".sp-thongbao");
  console.log(ChucVuNV);
  var i;
  for (i = 0; i < spander.length; i++) {
    spander[i].style.display = "block";
  }
  var NhanVien = new QuanLyNhanVien(
    TaiKhoanID,
    HoTenDayDu,
    EmailAdress,
    MatKhauPass,
    NgayLamViec,
    LuongNV,
    ChucVuNV,
    GioLamNV
  );

  var valid = true;

  valid &=
    kiemTraRong(NhanVien.ID, "#tbTKNV", "Mã Nhân Viên") &
    kiemTraRong(NhanVien.FullName, "#tbTen", "Tên Sinh Viên") &
    kiemTraRong(NhanVien.Email, "#tbEmail", "Email") &
    kiemTraRong(NhanVien.MatKhau, "#tbMatKhau", "Mật Khẩu") &
    kiemTraRong(NhanVien.Ngay, "#tbNgay", "Ngày") &
    kiemTraRong(NhanVien.Luong, "#tbLuongCB", "Lương") &
    kiemTraRong(NhanVien.ChucVu, "#tbChucVu", "Chức Vụ") &
    kiemTraRong(NhanVien.GioLam, "#tbGiolam", "Gio Làm");

  kiemTraChucVu();

  if (kiemTraRong(NhanVien.FullName, "#tbTen", "Tên Sinh Viên")) {
    valid &= kiemTraKyTu(NhanVien.FullName, "#tbTen", "Tên Sinh Viên");
  }
  if (kiemTraRong(NhanVien.Email, "#tbEmail", "Email")) {
    valid &= kiemTraEmail(NhanVien.Email, "#tbEmail", "Email");
  }

  if (kiemTraRong(NhanVien.MatKhau, "#tbMatKhau", "Mật Khẩu")) {
    valid &= kiemTraPass(NhanVien.MatKhau, "#tbMatKhau", "Mật Khẩu");
  }

  if (kiemTraRong(NhanVien.ID, "#tbTKNV", "Mã Nhân Viên")) {
    valid &=
      kiemTraSo(NhanVien.ID, "#tbTKNV", "Mã Nhân Viên") &&
      kiemTraDoDai(NhanVien.ID, "#tbTKNV", "Mã Nhân Viên", 2, 5);
  }
  if (kiemTraRong(NhanVien.Luong, "#tbLuongCB", "Lương")) {
    valid &= kiemTraGiaTri(
      NhanVien.Luong,
      "#tbLuongCB",
      "Lương",
      1000000,
      20000000
    );
  }
  if (kiemTraRong(NhanVien.GioLam, "#tbGiolam", "Gio Làm")) {
    valid &= kiemTraGiaTri(NhanVien.GioLam, "#tbGiolam", "Gio Làm", 80, 200);
  }

  if (!valid) {
    return;
  }

  DanhSachQuanLy.push(NhanVien);

  HienThiDanhSach(DanhSachQuanLy);

  save(DanhSachQuanLy, "arr");

  clearForm();
}

function HienThiDanhSach(arr) {
  result = "";
  for (var i = 0; i < arr.length; i++) {
    var obj = arr[i];

    obj.TongLuong = function () {
      var x = arr[i].ChucVu;
      if (x === "sep") {
        return arr[i].Luong * 3;
      } else if (x === "truongphong") {
        return arr[i].Luong * 2;
      } else if (x === "nhanvien") {
        return arr[i].Luong;
      }
    };

    obj.XepLoai = function () {
      if (this.GioLam >= 192) {
        return "Xuất sắc";
      } else if (this.GioLam >= 176) {
        return "Gioi";
      } else if (this.GioLam >= 160) {
        return "Khá";
      } else {
        return "Trung Bình";
      }
    };
    var td = `
        <tr>
        <td>${obj.ID}</td>
        <td>${obj.FullName}</td>
        <td>${obj.Email}</td>
        <td>${obj.Ngay}</td>
        <td>${obj.ChucVu}</td>
        <td>${obj.TongLuong()}</td>
        <td>${obj.XepLoai()}</td>
        <td>
        <button class="btn btn-danger my-1" onclick="del('${
          obj.ID
        }')">Xóa</button>
        <button class="btn btn-warning"  data-toggle="modal"
        data-target="#myModal" onclick="edit('${obj.ID}')">Sửa</button>
        </td>
        </tr>
        `;
    result += td;
  }
  document.querySelector("#tableDanhSach").innerHTML = result;
  return result;
}

function del(arrID) {
  var del = -1;
  for (var i = 0; i < DanhSachQuanLy.length; i++) {
    if (DanhSachQuanLy[i].ID == arrID) {
      del = i;
      break;
    }
  }
  if (del !== -1) {
    DanhSachQuanLy.splice(i, 1);
    HienThiDanhSach(DanhSachQuanLy);
    save(DanhSachQuanLy, "arr");
  }
}

function edit(arrID) {
  var edit = null;
  for (var i = 0; i < DanhSachQuanLy.length; i++) {
    if (DanhSachQuanLy[i].ID == arrID) {
      edit = DanhSachQuanLy[i];
      break;
    }
  }
  if (edit !== null) {
    document.querySelector("#tknv").value = edit.ID;
    document.querySelector("#name").value = edit.FullName;
    document.querySelector("#email").value = edit.Email;
    document.querySelector("#password").value = edit.MatKhau;
    document.querySelector("#datepicker").value = edit.Ngay;
    document.querySelector("#luongCB").value = edit.Luong;
    document.querySelector("#chucvu").value = edit.ChucVu;
    document.querySelector("#gioLam").value = edit.GioLam;
  }
}

function update() {
  var update = new QuanLyNhanVien();
  update.ID = document.querySelector("#tknv").value;
  update.FullName = document.querySelector("#name").value;
  update.Email = document.querySelector("#email").value;
  update.MatKhau = document.querySelector("#password").value;
  update.Ngay = document.querySelector("#datepicker").value;
  update.Luong = document.querySelector("#luongCB").value;
  update.ChucVu = document.querySelector("#chucvu").value;
  update.GioLam = document.querySelector("#gioLam").value;

  var indexEdit = -1;
  for (let i = 0; i < DanhSachQuanLy.length; i++) {
    if (DanhSachQuanLy[i].ID == update.ID) {
      indexEdit = i; //1
      break;
    }
  }
  if (indexEdit !== -1) {
    //Neu tim thay vi tri trong mang thi lay object trong mang gan lai = object tren giao dien nguoi dung thay doi
    DanhSachQuanLy[indexEdit].ID = update.ID;
    DanhSachQuanLy[indexEdit].FullName = update.FullName;
    DanhSachQuanLy[indexEdit].Email = update.Email;
    DanhSachQuanLy[indexEdit].MatKhau = update.MatKhau;
    DanhSachQuanLy[indexEdit].Ngay = update.Ngay;
    DanhSachQuanLy[indexEdit].Luong = update.Luong;
    DanhSachQuanLy[indexEdit].ChucVu = update.ChucVu;
    DanhSachQuanLy[indexEdit].GioLam = update.GioLam;
    //Goi ham rendertable truyen cho ham mang moi
    HienThiDanhSach(DanhSachQuanLy);
    save(DanhSachQuanLy, "arr");
    clearForm();
  }
}

function save(ob, key) {
  var strOBJ = JSON.stringify(ob);
  localStorage.setItem(key, strOBJ);
}

function get(key) {
  if (localStorage.getItem(key)) {
    var str = localStorage.getItem(key);
    var ob = JSON.parse(str);
    return ob;
  }
  return undefined;
}

var searchDS = function () {
  //input: tuKhoa : string
  var tuKhoa = document.querySelector("#searchName").value; //a
  tuKhoa = removeVietnameseTones(tuKhoa);
  //output: ?? []
  var output = [];

  for (var i = 0; i < DanhSachQuanLy.length; i++) {
    var tenSV = removeVietnameseTones(DanhSachQuanLy[i].XepLoai());

    if (
      tenSV.toLowerCase().search(tuKhoa) != -1 ||
      DanhSachQuanLy[i].ID == tuKhoa
    ) {
      //tim thay => add object tai vi tri do vao output

      output.push(DanhSachQuanLy[i]);
    }
  }

  HienThiDanhSach(output);
};
document.querySelector("#searchName").oninput = searchDS;
document.querySelector("#btnTimNV").onclick = searchDS;

function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    " "
  );
  return str;
}

window.onload = function () {
  DanhSachQuanLy = get("arr");
  if (DanhSachQuanLy == undefined) {
    DanhSachQuanLy = [];
  }
  console.log(DanhSachQuanLy);
  HienThiDanhSach(DanhSachQuanLy);
};
