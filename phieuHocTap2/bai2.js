// 1. Thay đổi văn bản tiêu đề bằng textContent
const title = document.getElementById('title');
title.textContent = "Tiêu đề đã được cập nhật!";

// 2. Chèn thêm mã HTML vào một div bằng innerHTML
const container = document.getElementById('container');
container.innerHTML = "<p style='color: blue;'>Đoạn văn này được chèn bằng <strong>innerHTML</strong>.</p>";

// 3. Sử dụng createElement để tạo một thẻ <li> mới
const newItem = document.createElement('li');
newItem.textContent = "Phần tử mới được tạo từ JS";

// 4. Append phần tử vừa tạo vào danh sách <ul>
const list = document.getElementById('my-list');
list.appendChild(newItem);

// 5. Thử xóa một phần tử bằng phương thức remove()
const itemToRemove = document.getElementById('remove-me');
if (itemToRemove) {
    itemToRemove.remove();
}