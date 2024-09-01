import mongoose from "mongoose";
import { Schema , model } from "mongoose";

const PaymentSchema = new Schema({
    from_user: { type: String , required: true },
    name: { type: String },
    oid: { type: String , required: true },
    to_user: { type: String , required: true },
    message: { type: String },
    amount: { type: String , required: true },
    createdAt : {type: Date , default: Date.now()},
    updatedAt : {type: Date , default: Date.now()},
    done : {type: Boolean , default: false}
});

export default mongoose.models.Payment || model('Payment', PaymentSchema);