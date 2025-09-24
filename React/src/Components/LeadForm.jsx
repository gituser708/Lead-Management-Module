import React from "react";
import AlerMessage from "./AlerMessage";
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom";
import { leadFormAPI } from '../API/LeadAPI';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const validationSchema = Yup.object({
    fullName: Yup.string().required('Full name is required!'),
    email: Yup.string()
        .email('Please enter a valid email!')
        .required('Email is required!'),
  phone: Yup.string().required('Phone is required!')
    .matches(/^\d{10}$/, 'Enter a valid phone number!'),
    age: Yup.number()
        .min(18, 'You must be 18 years old!')
        .max(60, 'Avobe 60 yeras not allowed!')
        .required('Age is required!'),
    gender: Yup.string()
        .oneOf(['male','female','other'], 'Please select one!')
        .required('Gender is required!'),
    source: Yup.string()
        .oneOf(['from linkedIn', 'from facebook', 'from youtube',
            'from friend', 'other',], 'Please select one!')
        .required('This is required!'),
    message: Yup.string().required('Plase fill this section!'),
});


export default function LeadForm() {
    const [alert, setAlert] = React.useState(null);
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: leadFormAPI,
        mutationKey: ['lead-form'],
        onMutate: () => {
            setAlert({ type: 'loading', message: 'Please hold on, while loading...' });
        },
        onSuccess: () => {
            setTimeout(() => {
                setAlert({ type: 'success', message: 'Form Submited, Thank You.' });
                setTimeout(() => {
                    setAlert(null);
                    navigate('/lead-lists');
                }, 3000);
            }, 3000);
        },
        onError: (error) => {
            const message = error?.response?.data?.message || error?.message || 'Faild To Submit!';
            setTimeout(() => {
                setAlert({ type: 'error', message });
                setTimeout(() => {
                    setAlert(null);
                }, 3000);
            }, 3000);
        },
    });


    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            phone: '',
            age: '',
            gender: '',
            source: '',
            message: ''
        },
        validationSchema,
        onSubmit: (values) => {
          const fullPhone = `+91${values.phone}`;
          mutation.mutateAsync({
            ...values,
            phone: fullPhone
          });
        },
    });

    return (
      <div className='min-h-20 flex items-center justify-center'>
        <div
          className='max-w-xl w-full rounded-lg shadow-xl p-8 m-4
            transition-shadow duration-300 ease-in-out'>
          <h2 className='text-red-800 text-center text-3xl font-sans antialiased font-semibold'>
            Please Fill The Details Below!
          </h2>

          {alert && <AlerMessage type={alert.type} message={alert.message} />}

          <form onSubmit={formik.handleSubmit} className='space-y-6 mt-5'>
            <div>
              <label
                className='text-xl font-medium text-black block mb-2'
                htmlFor='fullName'>
                Full Name:
              </label>
              <input
                type='text'
                id='fullName'
                {...formik.getFieldProps('fullName')}
                className='w-full px-3 py-2  rounded-xl outline-none focus:border-red-800 focus:border-2
                            text-lg font-semibold shadow-md placeholder-gray-500'
                placeholder='Enter Your Full Name'
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <div className='text-red-500 mt-1'>
                  {formik.errors.fullName}
                </div>
              )}
            </div>

            <div>
              <label
                className='text-xl font-medium text-black block mb-2'
                htmlFor='email'>
                Your Email:
              </label>
              <input
                type='email'
                id='email'
                {...formik.getFieldProps('email')}
                className='w-full px-3 py-2  rounded-xl outline-none focus:border-red-800 focus:border-2
                            text-lg font-semibold shadow-md placeholder-gray-500'
                placeholder='Enter Your Email'
              />
              {formik.touched.email && formik.errors.email && (
                <div className='text-red-500 mt-1'>{formik.errors.email}</div>
              )}
            </div>

            <div>
              <label
                className='text-xl font-medium text-black block mb-2'
                htmlFor='phone'>
                Your Phone:
              </label>
              <input
                type='tel'
                id='phone'
                {...formik.getFieldProps('phone')}
                onChange={(e) => {
                  const digitOnly = e.target.value
                    .replace(/\D/g, '')
                    .slice(0, 10);
                  formik.setFieldValue('phone', digitOnly);
                }}
                className='!w-full px-3 py-2  rounded-xl outline-none focus:border-red-800 focus:border-2
                text-lg font-semibold shadow-md placeholder-gray-500'
                placeholder='Enter Your Phone Number'
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className='text-red-500 mt-1'>{formik.errors.phone}</div>
              )}
            </div>

            <div>
              <label
                className='text-xl font-medium text-black block mb-2'
                htmlFor='age'>
                Your Age:
              </label>
              <input
                type='number'
                id='age'
                {...formik.getFieldProps('age')}
                className='w-full px-3 py-2  rounded-xl outline-none focus:border-red-800 focus:border-2
                            text-lg font-semibold shadow-md placeholder-gray-500'
                placeholder='Enter Your Age'
              />
              {formik.touched.age && formik.errors.age && (
                <div className='text-red-500 mt-1'>{formik.errors.age}</div>
              )}
            </div>

            <div>
              <label
                className='text-xl font-medium text-black block mb-2'
                htmlFor='gender'>
                Your Gender
              </label>
              <select
                id='gender'
                name='gender'
                className='w-full px-3 py-2  rounded-xl outline-none focus:border-red-800 focus:border-2
                 text-lg font-semibold shadow-md placeholder-gray-500'
                {...formik.getFieldProps('gender')}>
                <option value='' label='Select Your Gender' />
                <option value='male' label='Male' />
                <option value='female' label='Female' />
                <option value='other' label='Other' />
              </select>

              {formik.touched.gender && formik.errors.gender && (
                <div className='text-red-500 mt-1'>{formik.errors.gender}</div>
              )}
            </div>

            <div>
              <label
                className='text-xl font-medium text-black block mb-2'
                htmlFor='source'>
                How You Knew About Us?
              </label>
              <select
                id='source'
                name='source'
                className='w-full px-3 py-2  rounded-xl outline-none focus:border-red-800 focus:border-2
                 text-lg font-semibold shadow-md placeholder-gray-500'
                {...formik.getFieldProps('source')}>
                <option value='' label='Select One' />
                <option value='from linkedIn' label='From LinkedIn' />
                <option value='from facebook' label='From Facebook' />
                <option value='from youtube' label='From Youtube' />
                <option value='from friend' label='From Friend' />
                <option value='other' label='Other' />
              </select>

              {formik.touched.source && formik.errors.source && (
                <div className='text-red-500 mt-1'>{formik.errors.source}</div>
              )}
            </div>

            <div>
              <label
                className='text-xl font-medium text-black block mb-2'
                htmlFor='message'>
                What you know about us?
              </label>
              <textarea
                className='w-full px-3 py-2  rounded-xl outline-none focus:border-red-800 focus:border-2
                 text-lg font-semibold shadow-md placeholder-gray-500'
                id='message'
                {...formik.getFieldProps('message')}
                placeholder='write somethingh here...'
                rows={3}
              />
              {formik.touched.message && formik.errors.message && (
                <div className='text-red-500 mt-1'>{formik.errors.message}</div>
              )}
            </div>

            <div className="btn">
              <button type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md 
            shadow-sm text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-105 
            focus:outline-none focus:ring-2 focus:ring-offset-2 delay-150 duration-300 ease-in-out hover:-translate-y-1">            
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
};