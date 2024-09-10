import { apiSlice } from "../api/apiSlice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    createOrder: builder.mutation({
      query: (data: any) => ({
        url: "/orders/create-order",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: "/orders/get-orders",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, status }: any) => ({
        url: `/orders/update-order-status/${id}`,
        method: "PUT",
        body: { status },
        credentials: "include" as const,
      }),
    }),
    getSingleOrder: builder.query({
      query: (id: any) => ({
        url: `/orders/get-order/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteOrder: builder.mutation({
      query: (id: any) => ({
        url: `/orders/delete-order/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
  useGetSingleOrderQuery,
  useDeleteOrderMutation,
} = orderApi;
