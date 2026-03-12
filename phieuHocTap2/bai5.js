const inputBox = document.getElementById('input-box');

inputBox.addEventListener('keydown', (event) => {
    console.log(`Bạn vừa nhấn phím: ${event.key}`);
});

const form = document.getElementById('my-form');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Ngăn trang web bị load lại
    console.log("Form đã được gửi thành công mà không load lại trang!");
});

const parent = document.getElementById('parent-box');
const child = document.getElementById('child-btn');

child.addEventListener('click', (e) => {
    alert("Click tại THẺ CON");
    // Nếu muốn dừng nổi bọt, dùng: e.stopPropagation();
});

parent.addEventListener('click', () => {
    alert("Click tại THẺ CHA (do sự kiện nổi bọt từ con lên)");
});

const list = document.getElementById('todo-list');

list.addEventListener('click', (event) => {
    // Kiểm tra xem mục tiêu click có phải là nút có class 'delete-btn' không
    if (event.target.classList.contains('delete-btn')) {
        const li = event.target.parentElement;
        console.log("Đã xóa:", li.textContent.replace("Xóa", "").trim());
        li.remove();
    }
});

