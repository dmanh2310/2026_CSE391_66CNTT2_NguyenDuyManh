// --- 1. KHỞI TẠO DỮ LIỆU ---
let students = []; 
let sortDirection = 0; // 0: none, 1: tăng, -1: giảm

// DOM Elements
const nameInput = document.getElementById('txtName');
const scoreInput = document.getElementById('txtScore');
const btnAdd = document.getElementById('btnAdd');
const studentBody = document.getElementById('studentBody');
const statsArea = document.getElementById('statsArea');
const searchInput = document.getElementById('searchName');
const rankSelect = document.getElementById('filterRank');
const sortScoreBtn = document.getElementById('sortScore');
const sortIcon = document.getElementById('sortIcon');

// --- 2. LOGIC NGHIỆP VỤ (Hàm bổ trợ) ---
function getRank(score) {
    if (score >= 8.5) return "Giỏi";
    if (score >= 7.0) return "Khá";
    if (score >= 5.0) return "Trung bình";
    return "Yếu";
}

// --- 3. TRÁI TIM CỦA ỨNG DỤNG: APPLY FILTERS ---
function applyFilters() {
    const keyword = searchInput.value.toLowerCase();
    const selectedRank = rankSelect.value;

    // Lọc dữ liệu từ mảng gốc
    let filtered = students.filter(sv => {
        const matchesName = sv.name.toLowerCase().includes(keyword);
        const rank = getRank(sv.score);
        const matchesRank = (selectedRank === "All" || rank === selectedRank);
        return matchesName && matchesRank;
    });

    // Sắp xếp dữ liệu đã lọc
    if (sortDirection !== 0) {
        filtered.sort((a, b) => {
            return sortDirection === 1 ? a.score - b.score : b.score - a.score;
        });
    }

    renderTable(filtered);
}

// --- 4. HIỂN THỊ (RENDER) ---
function renderTable(dataToRender) {
    let html = '';
    let totalScore = 0;

    if (dataToRender.length === 0) {
        studentBody.innerHTML = '<tr><td colspan="5">Không tìm thấy sinh viên nào</td></tr>';
        statsArea.innerHTML = `Tổng số SV: 0 | Điểm trung bình: 0.0`;
        return;
    }

    dataToRender.forEach((sv, index) => {
        const rank = getRank(sv.score);
        const rowClass = sv.score < 5 ? 'class="low-score"' : '';
        totalScore += sv.score;

        html += `
            <tr ${rowClass}>
                <td>${index + 1}</td>
                <td>${sv.name}</td>
                <td>${sv.score.toFixed(1)}</td>
                <td>${rank}</td>
                <td><button class="delete-btn" data-id="${sv.id}">Xóa</button></td>
            </tr>
        `;
    });

    studentBody.innerHTML = html;
    const avg = (totalScore / dataToRender.length).toFixed(2);
    statsArea.innerHTML = `Đang hiển thị: ${dataToRender.length}/${students.length} SV | ĐTB: ${avg}`;
}

// --- 5. XỬ LÝ SỰ KIỆN ---

// Thêm sinh viên
btnAdd.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const score = parseFloat(scoreInput.value);

    if (!name || isNaN(score) || score < 0 || score > 10) {
        alert("Dữ liệu không hợp lệ!");
        return;
    }

    // Quan trọng: Dùng ID duy nhất thay vì Index
    students.push({ id: Date.now(), name, score });
    
    nameInput.value = "";
    scoreInput.value = "";
    nameInput.focus();

    applyFilters(); // Sau khi thêm, chạy bộ lọc để cập nhật bảng
});

// Xóa sinh viên (Event Delegation)
studentBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const idToDelete = e.target.getAttribute('data-id');
        // Lọc bỏ sinh viên có ID trùng với ID nút bấm
        students = students.filter(sv => sv.id != idToDelete);
        applyFilters();
    }
});

// Các sự kiện realtime
searchInput.addEventListener('input', applyFilters);
rankSelect.addEventListener('change', applyFilters);
scoreInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') btnAdd.click(); });

// Sắp xếp
sortScoreBtn.addEventListener('click', () => {
    sortDirection = (sortDirection === 0 || sortDirection === -1) ? 1 : -1;
    sortIcon.innerText = sortDirection === 1 ? '▲' : '▼';
    applyFilters();
});

/*
// 1. Khởi tạo mảng lưu trữ
let students = [];

const nameInput = document.getElementById('txtName');
const scoreInput = document.getElementById('txtScore');
const btnAdd = document.getElementById('btnAdd');
const studentBody = document.getElementById('studentBody');
const statsArea = document.getElementById('statsArea');

// 2. Hàm xếp loại và trả về class CSS nếu cần
function getRank(score) {
    if (score >= 8.5) return "Giỏi";
    if (score >= 7.0) return "Khá";
    if (score >= 5.0) return "Trung bình";
    return "Yếu";
}

// 3. Hàm render (vẽ) lại bảng và thống kê
function renderTable() {
    let html = '';
    let totalScore = 0;

    students.forEach((sv, index) => {
        const rank = getRank(sv.score);
        const rowClass = sv.score < 5 ? 'class="low-score"' : '';
        totalScore += sv.score;

        html += `
            <tr ${rowClass}>
                <td>${index + 1}</td>
                <td>${sv.name}</td>
                <td>${sv.score.toFixed(1)}</td>
                <td>${rank}</td>
                <td><button class="delete-btn" data-index="${index}">Xóa</button></td>
            </tr>
        `;
    });

    studentBody.innerHTML = html;

    // Cập nhật thống kê
    const avg = students.length > 0 ? (totalScore / students.length).toFixed(2) : 0;
    statsArea.innerHTML = `Tổng số SV: ${students.length} | Điểm trung bình: ${avg}`;
}

// 4. Hàm xử lý thêm sinh viên
function addStudent() {
    const name = nameInput.value.trim();
    const score = parseFloat(scoreInput.value);

    // Kiểm tra hợp lệ
    if (name === "" || isNaN(score) || score < 0 || score > 10) {
        alert("Vui lòng nhập họ tên và điểm hợp lệ (0-10)!");
        return;
    }

    // Thêm vào mảng
    students.push({ name, score });

    // Reset form
    nameInput.value = "";
    scoreInput.value = "";
    nameInput.focus();

    renderTable();
}

// 5. Sự kiện: Click nút Thêm
btnAdd.addEventListener('click', addStudent);

// 6. Sự kiện: Nhấn Enter tại ô điểm
scoreInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addStudent();
});

// 7. Event Delegation: Xử lý nút Xóa trên tbody
studentBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const index = e.target.getAttribute('data-index');
        students.splice(index, 1); // Xóa phần tử khỏi mảng
        renderTable(); // Vẽ lại bảng
    }
});
*/

