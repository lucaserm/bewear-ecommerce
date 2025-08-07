"use client";

import Image from "next/image";
import Link from "next/link";

import { Cart } from "./cart";
import { Menu } from "./menu";

export const Header = () => {
  return (
    <header className="flex items-center justify-between p-5 sm:bg-gray-100 md:bg-gray-200 lg:bg-gray-300">
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
