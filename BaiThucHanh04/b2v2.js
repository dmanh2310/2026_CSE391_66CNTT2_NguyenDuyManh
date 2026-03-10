const prices = { "Laptop": 20000000, "iPhone": 25000000, "Tai nghe": 2000000 };

// --- Các hàm tiện ích ---
function showError(id, msg) {
    document.getElementById(`${id}-err`).innerText = msg;
    if(document.getElementById(id)) document.getElementById(id).classList.add('invalid');
}

function clearError(id) {
    document.getElementById(`${id}-err`).innerText = "";
    if(document.getElementById(id)) document.getElementById(id).classList.remove('invalid');
}

// --- Logic Tính Tiền ---
function calculateTotal() {
    const product = document.getElementById('product').value;
    const qty = parseInt(document.getElementById('quantity').value) || 0;
    const total = (prices[product] || 0) * qty;
    document.getElementById('displayTotal').innerText = total.toLocaleString('vi-VN') + "đ";
    return total;
}

// --- Các hàm Validate ---
function validateProduct() {
    if (!document.getElementById('product').value) return showError('product', "Vui lòng chọn sản phẩm"), false;
    clearError('product'); return true;
}

function validateQuantity() {
    const q = document.getElementById('quantity').value;
    if (q < 1 || q > 99) return showError('quantity', "Số lượng từ 1 đến 99"), false;
    clearError('quantity'); return true;
}

function validateDate() {
    const dateInput = document.getElementById('deliveryDate').value;
    if (!dateInput) return showError('deliveryDate', "Vui lòng chọn ngày"), false;
    
    const selected = new Date(dateInput).setHours(0,0,0,0);
    const now = new Date().setHours(0,0,0,0);
    const maxDate = new Date().setDate(new Date().getDate() + 30);

    if (selected < now) return showError('deliveryDate', "Không được chọn ngày quá khứ"), false;
    if (selected > maxDate) return showError('deliveryDate', "Không quá 30 ngày từ hôm nay"), false;
    
    clearError('deliveryDate'); return true;
}

function validateAddress() {
    if (document.getElementById('address').value.trim().length < 10) 
        return showError('address', "Địa chỉ phải ít nhất 10 ký tự"), false;
    clearError('address'); return true;
}

function validateNote() {
    const val = document.getElementById('note').value;
    if (val.length > 200) return showError('note', "Ghi chú quá dài"), false;
    clearError('note'); return true;
}

function validatePayment() {
    const checked = document.querySelector('input[name="payment"]:checked');
    if (!checked) return showError('payment', "Vui lòng chọn phương thức thanh toán"), false;
    clearError('payment'); return true;
}

// --- Sự kiện ---
document.getElementById('product').addEventListener('change', () => { validateProduct(); calculateTotal(); });
document.getElementById('quantity').addEventListener('input', () => { validateQuantity(); calculateTotal(); });
document.getElementById('deliveryDate').addEventListener('blur', validateDate);
document.getElementById('address').addEventListener('blur', validateAddress);
document.getElementById('address').addEventListener('input', () => clearError('address'));

// Realtime Char Count cho Ghi chú
document.getElementById('note').addEventListener('input', function() {
    const len = this.value.length;
    const countEl = document.getElementById('charCount');
    countEl.innerText = `${len}/200`;
    if (len > 200) {
        countEl.classList.add('limit');
        showError('note', "Vượt quá giới hạn ký tự");
    } else {
        countEl.classList.remove('limit');
        clearError('note');
    }
});

// Xử lý Submit & Modal
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const isValid = validateProduct() & validateQuantity() & validateDate() & validateAddress() & validateNote() & validatePayment();

    if (isValid) {
        const summary = `
            <p><strong>Sản phẩm:</strong> ${document.getElementById('product').value}</p>
            <p><strong>Số lượng:</strong> ${document.getElementById('quantity').value}</p>
            <p><strong>Tổng tiền:</strong> ${document.getElementById('displayTotal').innerText}</p>
            <p><strong>Ngày giao:</strong> ${document.getElementById('deliveryDate').value}</p>
        `;
        document.getElementById('summary').innerHTML = summary;
        document.getElementById('confirmBox').style.display = 'flex';
    }
});

document.getElementById('finalCancel').onclick = () => document.getElementById('confirmBox').style.display = 'none';
document.getElementById('finalOk').onclick = () => {
    alert("Đặt hàng thành công! 🎉");
    location.reload();
};