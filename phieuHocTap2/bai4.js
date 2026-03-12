// Chọn các phần tử
const btn = document.getElementById('main-btn');
const statusText = document.getElementById('status-text');
const box = document.getElementById('box');

// 1. Gán sự kiện click cho nút bấm
// 4. Thay đổi textContent khi người dùng click
btn.addEventListener('click', function() {
    statusText.textContent = "Bạn vừa click vào nút!";
    console.log("Sự kiện Click đã kích hoạt");
});

// 2. Thử nghiệm gán NHIỀU listeners cho cùng 1 phần tử
btn.addEventListener('click', function() {
    // 5. Toggle class để đổi màu nền khi click nút
    btn.classList.toggle('active-bg');
});

// 3. Lắng nghe sự kiện mouseenter / mouseleave (di chuột vào/ra)
box.addEventListener('mouseenter', () => {
    box.textContent = "Chuột đã đi vào!";
    box.style.borderColor = "red";
});

box.addEventListener('mouseleave', () => {
    box.textContent = "Chuột đã đi ra!";
    box.style.borderColor = "#ccc";
});