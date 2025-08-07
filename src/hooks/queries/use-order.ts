import { useQuery } from "@tanstack/react-query";

import { getOrders } from "@/actions/order/get-orders";

export const getUseOrdersQueryKey = () => ["order"] as const;

export const useOrders = () => {
  return useQuery({
    queryKey: getUseOrdersQueryKey(),
    queryFn: () => getOrders(),
  });
};
