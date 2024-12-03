import mongoose from 'mongoose';

export function connectdb(){
    mongoose.connect('mongodb://localhost:27017/apitour')
.then(() => console.log('Kết nối mongodb thành công!'))
.catch(err => console.error("Connection error:", err));
}