"use client";

import Image from "next/image";
import Link from "next/link";

import { authClient } from "@/lib/auth-client";
import { Cart } from "./cart";
import { Menu } from "./menu";

export const Header = () => {
  const { data: session } = authClient.useSession();
  return (
    <header className="flex items-center justify-between p-5">
      <Link href="/">
        <Image src="/logo.svg" alt="BEWEAR" width={100} height={26.14} />
      </Link>
      <div className="flex items-center gap-3">
        {/* {session?.user &&  */}
        <Cart />
        {/* } */}
        <Menu />
      </div>
    </header>
  );
};
