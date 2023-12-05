import { apiSlice } from './apiSlice'
import { STUDENTS_URL } from '../constans'

export const studentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: ({ amountData, pageNumber, keyword }) => ({
        url: STUDENTS_URL,
        params: {
          amountData,
          pageNumber,
          keyword,
        },
      }),
      providesTags: ['Students'],
      keepUnusedDataFor: 5,
    }),

    createStudent: builder.mutation({
      query: (data) => ({
        url: STUDENTS_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Students'],
    }),

    editStudent: builder.mutation({
      query: (data) => ({
        url: `${STUDENTS_URL}/${data._id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Students'],
    }),

    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `${STUDENTS_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Students'],
    }),
  }),
})

export const {
  useGetStudentsQuery,
  useCreateStudentMutation,
  useEditStudentMutation,
  useDeleteStudentMutation,
} = studentsApiSlice
