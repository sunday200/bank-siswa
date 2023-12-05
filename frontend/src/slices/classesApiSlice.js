import { apiSlice } from './apiSlice'
import { CLASSES_URL } from '../constans'

export const classesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClasses: builder.query({
      query: ({ amountData, pageNumber, keyword }) => ({
        url: CLASSES_URL,
        params: {
          amountData,
          pageNumber,
          keyword,
        },
      }),
      providesTags: ['Classes'],
      keepUnusedDataFor: 5,
    }),

    createClass: builder.mutation({
      query: (data) => ({
        url: CLASSES_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Classes'],
    }),

    editClasses: builder.mutation({
      query: (id) => ({
        url: `${CLASSES_URL}/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Classes', 'Management'],
    }),

    deleteClasses: builder.mutation({
      query: (id) => ({
        url: `${CLASSES_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Classes'],
    }),
  }),
})

export const {
  useGetClassesQuery,
  useCreateClassMutation,
  useEditClassesMutation,
  useDeleteClassesMutation,
} = classesApiSlice
