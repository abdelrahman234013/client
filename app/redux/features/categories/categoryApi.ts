import { apiSlice } from "../api/apiSlice";

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: "/categories/get-categories",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    UpdateCategories: builder.mutation({
      query: (data) => ({
        url: "/categories/add-categories",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetCategoriesQuery, useUpdateCategoriesMutation } = categoryApi;

