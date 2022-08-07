function QuanLyNhanVien(ID,FullName,Email,MatKhau,Ngay,Luong,ChucVu,GioLam){
    this.ID = ID;
    this.FullName = FullName;
    this.Email = Email;
    this.MatKhau = MatKhau;
    this.Ngay = Ngay;
    this.Luong = Luong;
    this.ChucVu = ChucVu;
    this.GioLam = GioLam;
    this.TongLuong = function () {
        var x = document.getElementById("chucvu").value;
        if (x === "sep") {
          return Number(this.Luong) * 3;
        } if (x === "truongphong") {
          return Number(this.Luong) * 2;
        } if(x === "nhanvien") {
          return Number(this.Luong);
        }
    }
    this.XepLoai = function(){
        if(this.GioLam >= 192){
            return("Nhan vien xuat sac");
        }else if(this.GioLam >= 176){
            return("Nhan vien gioi");
        }else if(this.GioLam >= 160){
            return("Nhan vien khá")
        }else{
            return("Nhan vien Trung Binh");
        }

    }
}