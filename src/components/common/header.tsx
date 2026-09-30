import { TruckIcon } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

import CategoriesList from "@/components/common/categories-list";
import { Menu } from "@/components/common/menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";

import { Cart } from "./cart";

export const Header = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <header className="border-b bg-background">
      <div className="site-shell flex flex-col py-4 lg:py-5">
        <div className="flex items-center">
          <div className="hidden flex-1 items-center lg:flex">
            {session?.user && (
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={session?.user?.image as string | undefined}
                  />
                  <AvatarFallback>
                    {session?.user?.name?.split(" ")?.[0]?.[0]}
                    {session?.user?.name?.split(" ")?.[1]?.[0]}
                  </AvatarFallback>
                </Avatar>
                <h2>Olá, {session?.user.name}</h2>
              </div>
            )}
          </div>
          <Link
            href="/"
            className="flex flex-1 items-center justify-center lg:flex-[2]"
          >
            <Image
              src="/logo.svg"
              alt="BEWEAR"
              width={118}
              height={26}
              className="mx-auto"
            />
          </Link>
          <div className="flex flex-1 items-center justify-end gap-3">
            {session?.user && (
              <Button variant="outline" size="icon" asChild>
                <Link href="/my-orders" aria-label="Meus pedidos">
                  <TruckIcon />
                </Link>
              </Button>
            )}
            <Cart />
            <div className="lg:hidden">
              <Menu />
            </div>
          </div>
        </div>
        <CategoriesList />
      </div>
    </header>
  );
};
