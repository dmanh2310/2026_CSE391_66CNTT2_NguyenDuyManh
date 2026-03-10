// --- Hàm tiện ích Hiển thị/Xóa lỗi ---
function showError(fieldId, message) {
    const inputElement = document.getElementById(fieldId);
    const errorElement = document.getElementById(`${fieldId}-err`);
    
    if (errorElement) {
        errorElement.innerText = message;
    }
    if (inputElement && inputElement.type !== "radio" && inputElement.type !== "checkbox") {
        inputElement.classList.add('invalid');
    }
}

function clearError(fieldId) {
    const inputElement = document.getElementById(fieldId);
    const errorElement = document.getElementById(`${fieldId}-err`);
    
    if (errorElement) {
        errorElement.innerText = "";
    }
    if (inputElement) {
        inputElement.classList.remove('invalid');
    }
}

// --- Các hàm Validate riêng biệt ---

function validateFullname() {
    const input = document.getElementById('fullname');
    const value = input.value.trim();
    const regex = /^[a-zA-ZÀ-ỹ\s]+$/; // Chỉ chứa chữ cái và khoảng trắng

    if (value === "") {
        showError('fullname', "Họ tên không được để trống.");
        return false;
    }
    if (value.length < 3) {
        showError('fullname', "Họ tên phải có ít nhất 3 ký tự.");
        return false;
    }
    if (!regex.test(value)) {
        showError('fullname', "Họ tên chỉ được chứa chữ cái.");
        return false;
    }
    clearError('fullname');
    return true;
}

function validateEmail() {
    const value = document.getElementById('email').value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value === "") {
        showError('email', "Email không được để trống.");
        return false;
    }
    if (!regex.test(value)) {
        showError('email', "Email sai định dạng (ví dụ: name@domain.com).");
        return false;
    }
    clearError('email');
    return true;
}

function validatePhone() {
    const value = document.getElementById('phone').value.trim();
    const regex = /^0\d{9}$/;
    if (value === "") {
        showError('phone', "Số điện thoại không được để trống.");
        return false;
    }
    if (!regex.test(value)) {
        showError('phone', "SĐT phải gồm 10 chữ số và bắt đầu bằng số 0.");
        return false;
    }
    clearError('phone');
    return true;
}

function validatePassword() {
    const value = document.getElementById('password').value;
    // Tối thiểu 8 ký tự, ít nhất 1 hoa, 1 thường, 1 số
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (value === "") {
        showError('password', "Mật khẩu không được để trống.");
        return false;
    }
    if (!regex.test(value)) {
        showError('password', "Mật khẩu yếu: cần ≥8 ký tự, gồm chữ hoa, thường và số.");
        return false;
    }
    clearError('password');
    return true;
}

function validateConfirm() {
    const pass = document.getElementById('password').value;
    const confirm = document.getElementById('confirmPassword').value;
    if (confirm === "") {
        showError('confirmPassword', "Vui lòng xác nhận mật khẩu.");
        return false;
    }
    if (confirm !== pass) {
        showError('confirmPassword', "Mật khẩu xác nhận không khớp.");
        return false;
    }
    clearError('confirmPassword');
    return true;
}

function validateGender() {
    const genders = document.getElementsByName('gender');
    let isChecked = false;
    for (const radio of genders) {
        if (radio.checked) {
            isChecked = true;
            break;
        }
    }
    if (!isChecked) {
        showError('gender', "Vui lòng chọn giới tính.");
        return false;
    }
    clearError('gender');
    return true;
}

function validateTerms() {
    const checkbox = document.getElementById('terms');
    if (!checkbox.checked) {
        showError('terms', "Bạn phải đồng ý với điều khoản.");
        return false;
    }
    clearError('terms');
    return true;
}

// --- Đăng ký sự kiện (Realtime & Input) ---

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');
    
    // Validate khi Blur
    document.getElementById('fullname').addEventListener('blur', validateFullname);
    document.getElementById('email').addEventListener('blur', validateEmail);
    document.getElementById('phone').addEventListener('blur', validatePhone);
    document.getElementById('password').addEventListener('blur', validatePassword);
    document.getElementById('confirmPassword').addEventListener('blur', validateConfirm);

    // Xóa lỗi khi Input
    const fields = ['fullname', 'email', 'phone', 'password', 'confirmPassword'];
    fields.forEach(id => {
        document.getElementById(id).addEventListener('input', () => clearError(id));
    });

    // Riêng cho radio và checkbox xóa lỗi khi thay đổi
    document.getElementsByName('gender').forEach(r => r.addEventListener('change', () => clearError('gender')));
    document.getElementById('terms').addEventListener('change', () => clearError('terms'));

    // Xử lý Submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Sử dụng toán tử & để đảm bảo TẤT CẢ các hàm validate đều được thực thi
        // giúp hiển thị tất cả lỗi cùng lúc.
        const isValid = 
            validateFullname() & 
            validateEmail() & 
            validatePhone() & 
            validatePassword() & 
            validateConfirm() & 
            validateGender() & 
            validateTerms();

        if (isValid) {
            const userName = document.getElementById('fullname').value;
            form.style.display = 'none';
            const successMsg = document.getElementById('successMsg');
            successMsg.style.display = 'block';
            successMsg.innerHTML = `
                <h2 style="color: #2ecc71;">Đăng ký thành công! 🎉</h2>
                <p>Chào mừng thành viên mới: <strong>${userName}</strong></p>
            `;
        }
    });
});