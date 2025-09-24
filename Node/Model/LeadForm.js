import mongoose from "mongoose";

const leadFormSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const LeadForm = mongoose.model('LeadForm', leadFormSchema);

export default LeadForm;

