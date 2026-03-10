// --- 1. Đếm ký tự Họ tên ---
const fullnameInput = document.getElementById('fullname');
const fullnameCount = document.getElementById('fullnameCount');

fullnameInput.addEventListener('input', function() {
    const len = this.value.length;
    fullnameCount.innerText = `${len}/50`;
    if (len >= 50) fullnameCount.style.color = 'red';
    else fullnameCount.style.color = '#888';
});

// --- 2. Hiện/Ẩn mật khẩu ---
const passInput = document.getElementById('password');
const toggleBtn = document.getElementById('togglePass');

toggleBtn.addEventListener('click', function() {
    const type = passInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passInput.setAttribute('type', type);
    this.innerText = type === 'password' ? '👁️' : '🙈'; // Thay đổi icon
});

// --- 3. Thanh mức độ mạnh mật khẩu ---
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');

passInput.addEventListener('input', function() {
    const val = this.value;
    let score = 0;

    if (val.length >= 8) score++;      // Độ dài tối thiểu
    if (/[A-Z]/.test(val)) score++;    // Có chữ hoa
    if (/[a-z]/.test(val)) score++;    // Có chữ thường
    if (/[0-9]/.test(val)) score++;    // Có số
    if (/[^A-Za-z0-9]/.test(val)) score++; // Có ký tự đặc biệt

    updateStrengthUI(score, val.length);
});

function updateStrengthUI(score, length) {
    let width = "0%";
    let color = "#eee";
    let text = "";

    if (length === 0) {
        text = "";
    } else if (score <= 2) {
        width = "33%";
        color = "var(--err)";
        text = "Mức độ: Yếu";
    } else if (score <= 4) {
        width = "66%";
        color = "var(--mid)";
        text = "Mức độ: Trung bình";
    } else {
        width = "100%";
        color = "var(--strong)";
        text = "Mức độ: Mạnh";
    }

    strengthBar.style.width = width;
    strengthBar.style.backgroundColor = color;
    strengthText.innerText = text;
    strengthText.style.color = color;
}

// --- 4. Validate cơ bản (Thừa kế bài 2.1) ---
document.getElementById('upgradeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;

    // Reset lỗi
    document.getElementById('fullname-err').innerText = "";
    document.getElementById('password-err').innerText = "";

    if (fullnameInput.value.trim().length < 3) {
        document.getElementById('fullname-err').innerText = "Họ tên quá ngắn";
        isValid = false;
    }

    if (passInput.value.length < 8) {
        document.getElementById('password-err').innerText = "Mật khẩu tối thiểu 8 ký tự";
        isValid = false;
    }

    if (isValid) alert("Nâng cấp thành công!");
});