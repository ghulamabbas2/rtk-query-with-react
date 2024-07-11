import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setIsFetched } from "../features/productSlice";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
};

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "/products",
      transformResponse: (response: any) => response.products,
      transformErrorResponse: (response) => {
        return response.data;
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("data from onquerystarted", data);

          dispatch(setIsFetched(true));
        } catch (error) {
          console.log(error);
        }
      },

      providesTags: ["Products"],
    }),
    getProductById: builder.query<{ product: Product }, string>({
      query: (id) => `/products/${id}`,
    }),
    createProduct: builder.mutation<Product, Partial<Product>>({
      query: (product) => ({
        url: "/products",
        method: "POST",
        body: product,
      }),
    }),
    updateProduct: builder.mutation<Product, { id: string } & Partial<Product>>(
      {
        query: ({ id, ...product }) => ({
          url: `/products/${id}`,
          method: "PUT",
          body: product,
        }),
      }
    ),
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
