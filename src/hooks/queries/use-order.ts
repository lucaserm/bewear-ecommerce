import { getOrders } from "@/actions/order/get-orders";
import { useQuery } from "@tanstack/react-query";

export const getUseOrdersQueryKey = () => ["order"] as const;

export const useOrders = () => {
  return useQuery({
    queryKey: getUseOrdersQueryKey(),
    queryFn: () => getOrders(),
  });
};
