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


