// 1. Hàm async để xử lý bất đồng bộ
async function displayUsers() {
    const listElement = document.getElementById('user-list');
    listElement.innerHTML = "Đang tải..."; // Thông báo trạng thái

    // 3. Quản lý lỗi bằng khối try/catch
    try {
        // 2. Sử dụng Fetch API để gọi API công khai
        // await giúp dừng code tại đây cho đến khi có phản hồi
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        // Kiểm tra nếu kết nối lỗi (vd: sai URL)
        if (!response.ok) {
            throw new Error("Không thể lấy dữ liệu từ server");
        }

        // 4. Xử lý dữ liệu JSON
        const users = await response.json();

        // 5. Hiển thị dữ liệu lên giao diện (DOM)
        listElement.innerHTML = ""; // Xóa dòng "Đang tải..."
        
        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `${user.name} - Email: ${user.email}`;
            listElement.appendChild(li);
        });

        console.log("Dữ liệu đã được hiển thị!");

    } catch (error) {
        // Xử lý khi có lỗi (mất mạng, lỗi API...)
        console.error("Có lỗi xảy ra:", error.message);
        listElement.innerHTML = `<li style="color: red;">Lỗi: ${error.message}</li>`;
    }
}

// Lắng nghe sự kiện click nút để chạy hàm
document.getElementById('btnLoad').addEventListener('click', displayUsers);