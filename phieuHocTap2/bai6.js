//Tự tạo một Promise mô phỏng việc lấy dữ liệu (delay 2s)
const fetchData = new Promise((resolve, reject) => {
    console.log("Đang lấy dữ liệu...");
    setTimeout(() => {
        const success = true; // Giả lập trạng thái thành công/thất bại
        if (success) {
            resolve({ id: 1, name: "Dữ liệu mẫu" });
        } else {
            reject("Lỗi: Không thể kết nối máy chủ!");
        }
    }, 2000);
});




// Xử lý kết quả
fetchData
    .then((data) => {
        console.log("Dữ liệu nhận được:", data);
    })
    .catch((error) => {
        console.error(error);
    });

const step1 = () => new Promise(resolve => setTimeout(() => resolve("Bước 1 hoàn tất"), 1000));
const step2 = (msg) => new Promise(resolve => setTimeout(() => resolve(msg + " -> Bước 2 hoàn tất"), 1000));
const step3 = (msg) => new Promise((resolve, reject) => {
    // Giả lập một lỗi ở bước 3
    const errorOccurred = false; 
    if (errorOccurred) {
        reject("Lỗi tại Bước 3!");
    } else {
        resolve(msg + " -> Bước 3 hoàn tất");
    }
});

step1()
    .then(res1 => step2(res1))
    .then(res2 => step3(res2))
    .then(finalRes => console.log("Kết quả cuối cùng:", finalRes))
    .catch(err => console.error("Xử lý lỗi tập trung:", err));

    // Hàm callback truyền thống
function traditionalTask(name, callback) {
    setTimeout(() => {
        if (!name) {
            callback("Tên không hợp lệ", null);
        } else {
            callback(null, `Xin chào ${name}`);
        }
    }, 1000);
}

// Chuyển sang dạng Promise
const taskWithPromise = (name) => {
    return new Promise((resolve, reject) => {
        traditionalTask(name, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

// Sử dụng
taskWithPromise("Thế Anh")
    .then(res => console.log(res))
    .catch(err => console.error(err));