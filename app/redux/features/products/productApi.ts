import { apiSlice } from "../api/apiSlice";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "/products/get-products",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/products/get-single-product/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: `/products/create-product`,
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ data, id }) => ({
        url: `/products/update-product/${id}`,
        method: "PUT",
        body: { data },
        credentials: "include" as const,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/delete-product/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productApi;
