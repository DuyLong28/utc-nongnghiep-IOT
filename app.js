//Cài đặt menu
var activeButton = null;

function showContent(sectionId) {
    // Lấy phần nội dung cần hiển thị dựa vào sectionId
    var content = document.getElementById(sectionId);

    // Ẩn tất cả nội dung trước khi hiển thị nội dung mới
    var allContent = document.querySelectorAll(".content");
    for (var i = 0; i < allContent.length; i++) {
        allContent[i].style.display = "none";
    }

    // Hiển thị nội dung tương ứng với sectionId
    if (content) {
        content.style.display = "block";
    }

    // Loại bỏ lớp "active" khỏi nút đang được chọn (nếu có)
    if (activeButton) {
        activeButton.classList.remove('active');
    }

    // Thêm lớp "active" cho nút đang được click
    event.currentTarget.classList.add('active');

    // Lưu nút đang được chọn vào biến activeButton
    activeButton = event.currentTarget;
}

// Thêm sự kiện click cho toàn bộ màn hình chính
document.querySelector('.menu').addEventListener('click', function(event) {
    // Kiểm tra xem sự kiện click có xảy ra trên button không
    if (!event.target.classList.contains('value')) {
        // Nếu không, không cần làm gì cả
        return;
    }
});

// Thêm sự kiện click cho toàn bộ màn hình chính (ngoài nút)
document.querySelector('.menu').addEventListener('click', function(event) {
    // Kiểm tra xem sự kiện click có xảy ra trên button không
    if (!event.target.classList.contains('value')) {
        // Nếu không, loại bỏ lớp "active" của nút đang được chọn (nếu có)
        if (activeButton) {
            activeButton.classList.remove('active');
        }
    }
});

//Login
$(document).ready(function(){
    $('#eye').click(function(){
        $(this).toggleClass('open');
        $(this).children('i').toggleClass('fa-eye-slash fa-eye');
        if($(this).hasClass('open')){
            $(this).prev().attr('type', 'text');
        }else{
            $(this).prev().attr('type', 'password');
        }
    });
});

//Bấm nút đăng nhập
document.getElementById("btnUser").addEventListener("click", function() {
    // Hiển thị phần tài khoản
    const taikhoan = document.getElementById("taikhoan");
    taikhoan.style.display = "block";
});

// Trạng thái đăng nhập (ví dụ: đang đăng nhập hoặc không đăng nhập)
let isAuthenticated = false;
let authenticatedUserName = "";

// Lấy phần tử "userName"
const userNameElement = document.getElementById("userName");

// Hàm cập nhật nội dung của phần tử "userName" dựa vào trạng thái đăng nhập
function updateUserNameDisplay() {
  if (isAuthenticated) {
    // Đã đăng nhập: Hiển thị tên người dùng
    userNameElement.textContent = authenticatedUserName;
  } else {
    // Chưa đăng nhập: Hiển thị chữ "Đăng nhập"
    userNameElement.textContent = "Đăng nhập";
  }
}

// Lấy phần tử input và button đăng nhập
const inputUsername = document.querySelector(".input-login-user");
const inputPassword = document.querySelector(".input-login-password");
const btnLogin = document.querySelector(".button-login");

// Hàm kiểm tra đăng nhập
function login() {
  if (isAuthenticated) {
    alert("Bạn đã đăng nhập.");
    return;
  }
  if (inputUsername.value === "" || inputPassword.value === "") {
    alert("Vui lòng không để trống");
  } else {
    const username = inputUsername.value;
    const password = inputPassword.value;

    // Sử dụng Fetch API để tải tệp JSON chứa thông tin tài khoản
    fetch('accounts.json')
      .then(response => response.json())
      .then(data => {
        const users = data.users;
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
          alert("Đăng Nhập Thành Công");
          // Gỡ bỏ thuộc tính disabled sau khi đăng nhập thành công
          const lockMaybom = document.getElementById("lock-maybom");
          lockMaybom.removeAttribute("disabled");
          const lockQuatgio = document.getElementById("lock-quatgio");
          lockQuatgio.removeAttribute("disabled");
          const lockLed1 = document.getElementById("lock-led1");
          lockLed1.removeAttribute("disabled");
          const lockLed2 = document.getElementById("lock-led2");
          lockLed2.removeAttribute("disabled");

          // Cập nhật trạng thái đăng nhập và tên người dùng
          isAuthenticated = true;
          authenticatedUserName = user.username;

          // Cập nhật nội dung của phần tử "userName"
          updateUserNameDisplay();

          // Ẩn form đăng nhập
          const loginForm = document.querySelector(".login");
          loginForm.style.display = "none";

          // Hiển thị phần tài khoản và nút đăng xuất
          const inforTaikhoan = document.getElementById("infor-taikhoan");
          inforTaikhoan.style.display = "block";
        } else {
          alert("Đăng Nhập Thất Bại");
        }
      })
      .catch(error => console.error(error));
  }
}
// Gọi hàm cập nhật trạng thái ban đầu
updateUserNameDisplay();

//Thao tác khi bấm vào nút đăng nhập
btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  login();
});

//Lấy phần tử nút đăng xuất
const btnLogout = document.getElementById("btnLogout");

// Sự kiện click cho nút đăng xuất
btnLogout.addEventListener("click", () => {
  isAuthenticated = false;
  authenticatedUserName = "";
  // Cập nhật nội dung của phần tử "userName" sau khi đăng xuất
  updateUserNameDisplay();

  // Ẩn phần tài khoản và nút đăng xuất
  const inforTaikhoan = document.getElementById("infor-taikhoan");
  inforTaikhoan.style.display = "none";

  // Hiển thị lại form đăng nhập
  const loginForm = document.querySelector(".login");
  loginForm.style.display = "block";
  
  // Đặt lại thuộc tính disabled sau khi đăng xuất thành công
  const lockMaybom = document.getElementById("lock-maybom");
  lockMaybom.disabled = true;
  const lockQuatgio = document.getElementById("lock-quatgio");
  lockQuatgio.disabled = true;
  const lockLed1 = document.getElementById("lock-led1");
  lockLed1.disabled = true;
  const lockLed2 = document.getElementById("lock-led2");
  lockLed2.disabled = true;
});

// Gọi hàm kiểm tra đăng nhập khi nhấn Enter trên trường mật khẩu
inputPassword.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    login();
  }
});
