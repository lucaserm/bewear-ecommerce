import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Orders } from "@/app/my-orders/components/orders";
import { db } from "@/db";
import { auth } from "@/lib/auth";

const MyOrdersPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user.id) {
    redirect("/");
  }
  const orders = await db.query.orderTable.findMany({
    where: (order, { eq }) => eq(order.userId, session.user.id),
    with: {
      items: {
        with: {
          productVariant: {
            with: {
              product: true,
            },
          },
        },
      },
    },
    orderBy: (order, { asc }) => [asc(order.createdAt)],
  });
  return (
    <div className="px-5">
      <h2 className="font-bold">Meus pedidos</h2>
      <Orders
        orders={orders.map((order) => {
          return {
            id: order.id,
            totalPriceInCents: order.totalPriceInCents,
            status: order.status,
            createdAt: order.createdAt,
            items: order.items.map((item) => {
              return {
                id: item.id,
                imageUrl: item.productVariant.imageUrl,
                productName: item.productVariant.product.name,
                productVariantName: item.productVariant.name,
                quantity: item.quantity,
                priceInCents: item.productVariant.priceInCents,
              };
            }),
          };
        })}
      />
    </div>
  );
};

export default MyOrdersPage;
