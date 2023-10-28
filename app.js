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

//Dữ liệu
    // Biến toàn cục để lưu trữ giá trị nhiệt độ và độ ẩm
    let nhietDo = 28; // Giả sử nhiệt độ ban đầu là 28°C
    let doAm = 60;   // Giả sử độ ẩm ban đầu là 60%
  
    // Hàm lấy thời gian thực
    function getCurrentTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1
      const date = now.getDate();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
    }

    // Hàm thêm dữ liệu vào bảng với thời gian thực
    function addDataToTable(data) {
      const { doAmDat } = data;
      const tbody = document.querySelector('.data-table tbody');
      const rowCount = tbody.rows.length;
      const row = tbody.insertRow(1);
      const cellStt = row.insertCell(0);
      const cellThoiGian = row.insertCell(1);
      const cellNhietDo = row.insertCell(2);
      const cellDoAm = row.insertCell(3);
      const cellDoAmDat = row.insertCell(4);

      // Cộng thêm 1 đơn vị cho nhiệt độ và độ ẩm mỗi lần cập nhật
      nhietDo += 1;
      doAm += 1;

      cellStt.innerHTML = rowCount;
      cellThoiGian.innerHTML = getCurrentTime();
      cellNhietDo.innerHTML = `${nhietDo}°C`;
      cellDoAm.innerHTML = `${doAm}%`;
      cellDoAmDat.innerHTML = `${doAmDat}%`;
    }

  // Đoạn mã này chỉ là ví dụ và cần được thay thế bằng cách lấy dữ liệu thực tế
    function fetchDataPeriodically() {
      // Thực hiện lấy dữ liệu từ hệ thống hoặc nguồn dữ liệu khác ở đây
      // Ví dụ:
      const sampleData = {
          thoiGian: "2023-10-27 08:00",
          doAmDat: 30
      };

      addDataToTable(sampleData);
  }

    // Cập nhật dữ liệu sau mỗi khoảng thời gian
    setInterval(fetchDataPeriodically, 60000); // Cập nhật dữ liệu sau mỗi x giây (x000 ms)

    // Tạo các trường tìm kiếm
    const searchThoiGian = document.getElementById('searchThoiGian');
    const searchNhietDo = document.getElementById('searchNhietDo');
    const searchDoAm = document.getElementById('searchDoAm');
    const searchDoAmDat = document.getElementById('searchDoAmDat');

    // Lắng nghe sự kiện khi người dùng nhấn nút tìm kiếm
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', filterTable);

    // Hàm bộ lọc
    function filterTable() {
      const filterThoiGian = searchThoiGian.value.toLowerCase();
      const filterNhietDo = searchNhietDo.value.toLowerCase();
      const filterDoAm = searchDoAm.value.toLowerCase();
      const filterDoAmDat = searchDoAmDat.value.toLowerCase();

      const rows = document.querySelectorAll('.data-table tbody tr');

      rows.forEach(row => {
        const thoiGian = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
        const nhietDo = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
        const doAm = row.querySelector('td:nth-child(4)').textContent.toLowerCase();
        const doAmDat = row.querySelector('td:nth-child(5)').textContent.toLowerCase();

        const thoiGianMatch = thoiGian.includes(filterThoiGian);
        const nhietDoMatch = nhietDo.includes(filterNhietDo);
        const doAmMatch = doAm.includes(filterDoAm);
        const doAmDatMatch = doAmDat.includes(filterDoAmDat);

      if (thoiGianMatch && nhietDoMatch && doAmMatch && doAmDatMatch) {
        row.classList.remove('hide-row'); // Loại bỏ lớp hide-row nếu điều kiện lọc đúng
      } else {
        row.classList.add('hide-row'); // Thêm lớp hide-row nếu điều kiện lọc sai
      }
    });
  }
    // Lắng nghe sự kiện khi người dùng thay đổi giá trị trường tìm kiếm
    searchThoiGian.addEventListener('input', handleSearchInput);
    searchNhietDo.addEventListener('input', handleSearchInput);
    searchDoAm.addEventListener('input', handleSearchInput);
    searchDoAmDat.addEventListener('input', handleSearchInput);
    
    // Hàm xử lý khi giá trị trường tìm kiếm thay đổi
    function handleSearchInput() {
      // Kiểm tra giá trị của tất cả các trường tìm kiếm
      const thoiGianValue = searchThoiGian.value.trim().toLowerCase();
      const nhietDoValue = searchNhietDo.value.trim().toLowerCase();
      const doAmValue = searchDoAm.value.trim().toLowerCase();
      const doAmDatValue = searchDoAmDat.value.trim().toLowerCase();

      // Kiểm tra xem tất cả các trường tìm kiếm có giá trị trống không
      if (thoiGianValue === '' && nhietDoValue === '' && doAmValue === '' && doAmDatValue === '') {
        // Nếu tất cả trống, xóa lọc và hiển thị tất cả các dòng
        const rows = document.querySelectorAll('.data-table tbody tr');
        rows.forEach(row => {
          row.classList.remove('hide-row');
        });
      }
    }

