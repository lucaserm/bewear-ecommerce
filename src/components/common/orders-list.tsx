"use client";

import { OrderItem } from "@/components/common/order-item";
import { Card } from "@/components/ui/card";
import {
  orderItemTable,
  orderTable,
  productTable,
  productVariantTable,
} from "@/db/schema";

export type Order = typeof orderTable.$inferSelect & {
  items: (typeof orderItemTable.$inferSelect & {
    productVariant: typeof productVariantTable.$inferSelect & {
      product: typeof productTable.$inferSelect;
    };
  })[];
};

export const OrdersList = ({ orders }: { orders: Order[] }) => {
  return (
    <div>
      {orders.map((order, idx) => (
        <Card key={order.id} className="mt-4">
          <OrderItem idx={String(idx + 1).padStart(3, "0")} order={order} />
        </Card>
      ))}
    </div>
  );
};
