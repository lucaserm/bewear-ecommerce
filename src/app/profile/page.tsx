import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { OrdersList } from "@/components/common/orders-list";
import { db } from "@/db";
import { auth } from "@/lib/auth";

const ProfilePage = async () => {
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
      <OrdersList orders={orders} />
    </div>
  );
};

export default ProfilePage;
