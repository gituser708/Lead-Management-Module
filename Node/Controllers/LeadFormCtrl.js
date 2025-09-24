import asyncHandler from 'express-async-handler';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import LeadForm from '../Model/LeadForm.js';

const LeadFormCtrl = {
    leadForm: asyncHandler(async (req, res) => {
        const { fullName, email, phone, age, gender, source, message } = req.body;
        
        if (!fullName || !email || !phone || !age || !gender || !source || !message) {
            throw new Error('All fields are required!');
        };

        //! check email exist or not
        const checkEmail = await LeadForm.findOne({ email });
        if (checkEmail) {
            throw new Error('Email already exist!');
        };

        //! check phone number exist or not
        const checkPhone = await LeadForm.findOne({ phone });
        if (checkPhone) {
            throw new Error('Phone number already exist!');
        };

        //! phone number validation and sanitization for valid country code
        const validatePhoneNumber = (phoneInput) => {
            const parsed = parsePhoneNumberFromString(phoneInput);

            if (parsed && parsed.isValid() && ['IN', 'US'].includes(parsed.country)) {
                const normalized = parsed.number;
                return { valid: true, normalized };
            } else {
                return { valid: false, error: 'Invlaid or unsupported phone number!' };
            };
        };

        const result = validatePhoneNumber(phone);
        if (!result.valid) {
            return res.status(400).json({ error: result.error });
        };
        
        const create = await LeadForm.create({
            fullName, email, phone: result.normalized, age, gender, source, message
        });

        return res.status(201).json({
            message: 'Successfully Created.',
            id: create._id,
            Full_Name: create.fullName,
            Email: create.email,
            Phone: create.phone,
            Age: create.age,
            Gender: create.gender,
            Source: create.source,
            Message: create.message,
            Created_At: new Date(create.createdAt).toDateString()
        });
    }),
    leadLists: asyncHandler(async (req, res) => {
        const getLeadLists = await LeadForm.find();

        if (getLeadLists) {
            res.status(200).json(getLeadLists);
            
        } else {
            throw new Error('Not found!');
        };
    }),
    totalLeads: asyncHandler(async (req, res) => {
        const getTotal = await LeadForm.countDocuments();
        if (getTotal > 0) {
            res.json(getTotal);
        } else {
            throw new Error('No form submited!');
        };
    }),
};

export default LeadFormCtrl;