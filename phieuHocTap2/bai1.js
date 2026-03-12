// 1. Sử dụng querySelector để chọn một phần tử bất kỳ (thường chọn theo class hoặc tên thẻ)
const firstDescription = document.querySelector('.description');

// 2. Sử dụng querySelectorAll để lấy danh sách các phần tử (NodeList)
const allDescriptions = document.querySelectorAll('.description');

// 3. Sử dụng getElementById để truy cập trực tiếp qua ID
const title = document.getElementById('main-title');

// --- Kiểm tra kết quả trong tab Console ---
console.log("--- Kết quả chọn phần tử ---");
console.log("Sử dụng querySelector (phần tử đầu tiên tìm thấy):", firstDescription);
console.log("Sử dụng querySelectorAll (danh sách tất cả):", allDescriptions);
console.log("Sử dụng getElementById (chọn theo ID duy nhất):", title);