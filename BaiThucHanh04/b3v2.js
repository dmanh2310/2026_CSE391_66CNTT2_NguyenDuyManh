let currentStep = 0;
const formSteps = document.querySelectorAll(".form-step");
const circles = document.querySelectorAll(".step-circle");
const progress = document.getElementById("progress");

// --- Hàm chuyển bước ---
function updateFormSteps() {
    formSteps.forEach((step, index) => {
        step.classList.toggle("active", index === currentStep);
    });

    // Cập nhật thanh tiến trình
    circles.forEach((circle, index) => {
        if (index < currentStep) circle.className = "step-circle completed";
        else if (index === currentStep) circle.className = "step-circle active";
        else circle.className = "step-circle";
    });

    const activeCircles = document.querySelectorAll(".completed").length;
    progress.style.width = (activeCircles / (circles.length - 1)) * 100 + "%";

    if (currentStep === 2) showSummary();
}

function nextStep() {
    if (validateCurrentStep()) {
        currentStep++;
        updateFormSteps();
    }
}

function prevStep() {
    currentStep--;
    updateFormSteps();
}

// --- Hàm hiển thị tóm tắt ---
function showSummary() {
    const summary = document.getElementById("summary");
    summary.innerHTML = `
        <p><strong>Họ tên:</strong> ${document.getElementById('fullname').value}</p>
        <p><strong>Ngày sinh:</strong> ${document.getElementById('dob').value}</p>
        <p><strong>Giới tính:</strong> ${document.getElementById('gender').value}</p>
        <p><strong>Email:</strong> ${document.getElementById('email').value}</p>
    `;
}

// --- Hàm Validate ---
function validateCurrentStep() {
    let isValid = true;
    const err = (id, msg) => {
        document.getElementById(id + "-err").innerText = msg;
        return false;
    };
    const clear = (id) => document.getElementById(id + "-err").innerText = "";

    if (currentStep === 0) {
        const name = document.getElementById('fullname').value.trim();
        const dob = document.getElementById('dob').value;
        const gender = document.getElementById('gender').value;

        if (name.length < 3) isValid = err('fullname', "Họ tên quá ngắn"); else clear('fullname');
        if (!dob) isValid = err('dob', "Vui lòng chọn ngày sinh"); else clear('dob');
        if (!gender) isValid = err('gender', "Vui lòng chọn giới tính"); else clear('gender');
    } 
    else if (currentStep === 1) {
        const email = document.getElementById('email').value;
        const pass = document.getElementById('password').value;
        const confirm = document.getElementById('confirmPass').value;

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) isValid = err('email', "Email không hợp lệ"); else clear('email');
        if (pass.length < 6) isValid = err('password', "Mật khẩu ít nhất 6 ký tự"); else clear('password');
        if (pass !== confirm) isValid = err('confirmPass', "Mật khẩu không khớp"); else clear('confirmPass');
    }

    return isValid;
}

// Gắn sự kiện submit cuối cùng
document.getElementById('multiStepForm').onsubmit = (e) => {
    e.preventDefault();
    alert("Chúc mừng! Bạn đã đăng ký thành công tài khoản.");
};