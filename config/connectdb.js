
import mongoose from 'mongoose';

export function connectdb() {
    // Lấy chuỗi kết nối MongoDB Atlas từ biến môi trường (hoặc bạn có thể thay chuỗi kết nối trực tiếp tại đây)
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://hra101237:12345@apinode.wjba8.mongodb.net/tourapp';

    // Kết nối tới MongoDB Atlas
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Kết nối MongoDB Atlas thành công!');
    })
    .catch(err => {
        console.error("Lỗi kết nối:", err);
    });
}