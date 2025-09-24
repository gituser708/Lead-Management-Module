import React from "react";
import AlertMessage from './AlerMessage';
import { useQuery } from '@tanstack/react-query';
import { leadListsAPI, leadTotalAPI } from '../API/LeadAPI';


export default function LeadLists() {
    const { data: totalLeads } = useQuery({
        queryKey: ['totalLeads'],
        queryFn: leadTotalAPI,
    });

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['leadLists'],
        queryFn: leadListsAPI
    });

    console.log(data);
    

    return (
      <React.Fragment>
        <div className='mt-10 text-center'>
          <p className='font-semibold '>
            Total Leads:{' '}
            <span className='text-red-400 font-semibold'>
              {totalLeads} Form Submited.
            </span>
          </p>
        </div>

        {isLoading && (
          <AlertMessage type='loading' message='Fetching Lists...' />
        )}
        {isError && (
          <AlertMessage
            type='error'
            message={
              error?.response?.data?.message ||
              error?.message ||
              'Faild To Fetch!'
            }
          />
        )}

        <div className='overflow-x-auto rounded-lg shadow-md mt-10'>
          <table className='min-w-full table-auto border-collapse'>
            <thead className='bg-gray-100 text-gray-700'>
              <tr>
                <th className='px-4 py-2 text-left'>Full Name</th>
                <th className='px-4 py-2 text-left'>Email</th>
                <th className='px-4 py-2 text-left'>Phone</th>
                <th className='px-4 py-2 text-left'>Age</th>
                <th className='px-4 py-2 text-left'>Gender</th>
                <th className='px-4 py-2 text-left'>Created At</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((lead) => (
                <tr key={lead?._id} className='border-b border-gray-400'>
                  <td className='px-4 py-2 font-semibold text-gray-600'>
                    {lead?.fullName}
                  </td>
                  <td className='px-4 py-2 font-semibold text-gray-600'>
                    {lead?.email}
                  </td>
                  <td className='px-4 py-2 font-semibold text-gray-600'>
                    {lead?.phone}
                  </td>
                  <td className='px-4 py-2 font-semibold text-gray-600'>
                    {lead?.age}
                  </td>
                  <td className='px-4 py-2 font-semibold text-gray-600'>
                    {lead?.gender}
                  </td>
                  <td className='px-4 py-2 font-semibold text-gray-600'>
                    {new Date(lead?.createdAt).toDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
};