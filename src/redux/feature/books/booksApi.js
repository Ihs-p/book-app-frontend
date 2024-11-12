import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'; 
import getBaseURL from '../../../utils/baseUrl';

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseURL()}/api/books`,
    credentials: 'include',  
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const booksApi = createApi({
    reducerPath: 'booksApi',
    baseQuery,
    tagTypes: ['books'],
    endpoints: (builder) => ({
        fetchAllBooks: builder.query({
            query: () => "/",
            providesTags: ["books"]
        }),
        fetchBookById:builder.query({
            query:(id)  =>  `/${id}` ,
             providesTags:(result,error,id ) => [{type:'books',id}]

            }),

        addBook:builder.mutation({
            query:(newBook)=> ({
                url:`/create-book`,
                method:"POST",
                body:newBook
            }),
            invalidatesTags:["books"]
        }),
        updateBook:builder.mutation({
            query:({id,...rest})=> ({
                url:`/edit/${id}`,
                method:"PUT",
                body:rest,
                headers:{
                    'content-type':"application/json"
                }
            }),
            invalidatesTags:["books"]
        }),
        deleteBook:builder.mutation({
            query:(id)=> ({
                url:`/delete/${id}`,
                method:"DELETE",
            }),
            invalidatesTags:["books"]
        })

        
    }),
});

export const { useFetchAllBooksQuery,useFetchBookByIdQuery,useAddBookMutation,
    useUpdateBookMutation,useDeleteBookMutation } = booksApi;  
export default booksApi;
