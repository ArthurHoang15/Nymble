# Nymble - Nimble Knowledge Collector

**Nymble** là một công cụ cá nhân giúp bạn thu thập, sắp xếp và tìm lại những kiến thức, bài viết, và công cụ lập trình quý giá bị trôi đi trên dòng thời gian của mạng xã hội.

## Vấn Đề

Là một lập trình viên, chúng ta thường xuyên lướt Facebook, các group cộng đồng và thấy vô số bài viết hay: một thủ thuật code mới, một thư viện GitHub đột phá, hay một bài phân tích chuyên sâu. Chúng ta bấm "Share" về tường cá nhân với ý định "sẽ xem lại sau". Nhưng rồi sao?

- **Bị trôi đi**: Hàng trăm bài share khiến những kiến thức cũ bị chôn vùi.
- **Khó tìm kiếm**: Facebook không phải là công cụ tìm kiếm hiệu quả cho kho kiến thức cá nhân.
- **Thiếu tổ chức**: Mọi thứ hỗn loạn, không có nhãn, không có mức độ ưu tiên, không có ghi chú.

Nymble được sinh ra để giải quyết chính xác vấn đề này.

## Giới Thiệu Nymble

Nymble là "bộ não thứ hai" của bạn, một thư viện kiến thức cá nhân được thiết kế để nắm bắt và sắp xếp những thông tin quan trọng một cách nhanh chóng và hiệu quả.

## ✨ Tính Năng Cốt Lõi

### 📚 Lưu Trữ Tập Trung

- Nhanh chóng lưu lại mọi thông tin quan trọng: link bài viết, nội dung, tác giả, link GitHub/tool...

### 🏷️ Tổ Chức Thông Minh

- Gán nhiều **nhãn** (tags) linh hoạt cho mỗi bài viết
- Đánh giá **mức độ quan trọng** theo thang điểm 5 sao
- Cập nhật **trạng thái** (Chưa đọc, Đã đọc, Cần xem lại)
- Thêm **ghi chú cá nhân** để lưu lại ý tưởng của bạn

### 🔍 Tìm Kiếm & Lọc Mạnh Mẽ

- Tìm kiếm toàn văn bản (full-text search) theo tiêu đề, nội dung, ghi chú
- Lọc chính xác theo nhãn, trạng thái, và mức độ quan trọng
- Sắp xếp kết quả theo ngày lưu hoặc độ quan trọng

### 🚀 Giao Diện Hiện Đại

- Giao diện tối giản, tập trung vào nội dung, được xây dựng với Tailwind CSS.

## 💻 Công Nghệ Sử Dụng (Tech Stack)

Kiến trúc của dự án được xây dựng trên các công nghệ hiện đại, hiệu năng cao và thân thiện với lập trình viên:

| Phần         | Công nghệ                                                                                                 |
| ------------ | --------------------------------------------------------------------------------------------------------- |
| Frontend     | [Vite](https://vitejs.dev/), [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/) |
| Styling      | [Tailwind CSS](https://tailwindcss.com/)                                                                  |
| Backend & DB | [Supabase](https://supabase.io/)                                                                          |

## 🛠️ Hướng Dẫn Cài Đặt và Chạy Dự Án

Bạn muốn tự mình trải nghiệm hoặc đóng góp cho dự án? Hãy làm theo các bước sau:

### 1. Clone Repository

    git clone https://github.com/your-username/nymble-app.git
    cd nymble-app

### 2. Cài đặt Dependencies

    npm install

### 3. Thiết lập Môi trường (Supabase)

- Truy cập [Supabase](https://supabase.io/) và tạo một project mới
- Vào mục Project Settings > API
- Tạo một file mới ở thư mục gốc của dự án tên là `.env`
- Sao chép nội dung dưới đây vào file `.env` và điền các khóa của bạn từ Supabase:

      VITE_SUPABASE_URL="YOUR_SUPABASE_URL"
      VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"

### 4. Khởi động Development Server

    npm run dev

Mở trình duyệt và truy cập `http://localhost:5173`.

## 🤝 Đóng Góp

Dự án này là một dự án cá nhân nhưng tôi rất hoan nghênh các ý kiến đóng góp, báo lỗi hoặc các pull request để làm cho Nymble tốt hơn!
