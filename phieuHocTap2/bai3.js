// 1. Chọn phần tử
const imgElement = document.getElementById('my-image');
const textElement = document.getElementById('text-sample');
const toggleBtn = document.getElementById('toggle-btn');

// 2. Thay đổi thuộc tính 'src' của thẻ <img>
imgElement.src = "https://via.placeholder.com/200/0000FF/808080"; 

// 3. Sử dụng dot notation để gán giá trị cho các properties (ví dụ: alt, title)
imgElement.alt = "Ảnh đã được thay đổi qua JS";
imgElement.title = "Đây là tooltip mới";

// 4. Thêm và xóa class bằng classList.add / remove
textElement.classList.add('highlight'); // Thêm class để đổi màu nền
// textElement.classList.remove('highlight'); // (Bỏ comment dòng này nếu muốn xóa ngay lập tức)

// 5. Sử dụng classList.toggle để bật/tắt một trạng thái
toggleBtn.addEventListener('click', () => {
    textElement.classList.toggle('highlight');
    
    // 6. Kiểm tra sự tồn tại của class bằng classList.contains
    if (textElement.classList.contains('highlight')) {
        console.log("Trạng thái: Đang bật Highlight");
    } else {
        console.log("Trạng thái: Đã tắt Highlight");
    }
});