function kiemTraRong(value,select,name) {
var valid = true;
    if(value === ''){
        document.querySelector(select).innerHTML = name + ' không được để trống';
        valid = false;
      }else{
        document.querySelector(select).innerHTML = '';
      }

      return valid;
}

function kiemTraKyTu(value,select,name){
    var regex = /^[A-Z a-z]+$/;
    if(regex.test(value)){
        document.querySelector(select).innerHTML = '';
        return true;
    }
    document.querySelector(select).innerHTML = name + ' tất cả phải là chữ';
    return false;
}

// function kiemTraSo(value,select,name){
//     var regex = /^[0-9]+$/;
//     if(regex.test(value)){
//         document.querySelector(select).innerHTML = '';
//         return true;
//     }
//     document.querySelector(select).innerHTML = name + ' tất cả phải là số';
//     return false;
// }

function kiemTraSo(value,select,name){
    var regex = /^[0-9]+$/;
    if(regex.test(value)){
        document.querySelector(select).innerHTML = '';
        return true;
    }
    document.querySelector(select).innerHTML = name + ' tất cả phải là số';
    return false;
}

function kiemTraEmail(value,select,name){
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(regex.test(value)){
        document.querySelector(select).innerHTML = '';
        return true;
    }
    document.querySelector(select).innerHTML = name + ' phải đúng định dạng! Ví dụ : abc@domain.com';
    return false;
}

function kiemTraDoDai(value,select,name, minLength, maxLength){
    if(value.length > maxLength || value.length < minLength){
        document.querySelector(select).innerHTML = name + ' từ ' + minLength +
        ' đến ' + maxLength + ' ký tự !';
        return false;
    }
    document.querySelector(select).innerHTML = '';
    return true;
}
function kiemTraPass(value,select,name){
    var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/;
    if(regex.test(value)){
        document.querySelector(select).innerHTML = '';
        return true;
    }
    document.querySelector(select).innerHTML = name + ' từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)';
    return false;
}

function kiemTraGiaTri(value, select, name, minValue, maxValue){
    if(Number(value) < minValue || Number(value) > maxValue || value.trim() === ''){
        document.querySelector(select).innerHTML = name + ' từ ' + minValue + ' đến ' + maxValue + '!'
        return false;
    }
    document.querySelector(select).innerHTML = '';
    return true;
}

function kiemTraChucVu(){
    var x = document.getElementById("chucvu").value;
    if(x === ""){
        document.getElementById("tbChucVu").innerHTML = "Phải chọn chức vụ hợp lệ"
        return false;
    }
}
