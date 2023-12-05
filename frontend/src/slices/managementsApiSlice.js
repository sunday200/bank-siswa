import { apiSlice } from './apiSlice'
import { MANAGEMENT_URL } from '../constans.js'

export const managementApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getManagement: builder.query({
      query: ({ amountData, pageNumber, keyword, keywordClass }) => ({
        url: MANAGEMENT_URL,
        params: {
          amountData,
          pageNumber,
          keyword,
          keywordClass,
        },
      }),

      providesTags: ['Management'],
      keepUnusedDataFor: 1,
    }),

    createManagement: builder.mutation({
      query: (data) => ({
        url: MANAGEMENT_URL,
        method: 'POST',
        body: data,
      }),
      providesTags: ['Management'],
    }),

    deleteManagement: builder.mutation({
      query: (id) => ({
        url: `${MANAGEMENT_URL}/${id}`,
        method: 'DELETE',
      }),
      providesTags: ['Management'],
    }),
  }),
})

export const {
  useGetManagementQuery,
  useCreateManagementMutation,
  useDeleteManagementMutation,
} = managementApiSlice
