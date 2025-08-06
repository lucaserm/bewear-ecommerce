import {
  HomeIcon,
  LogOutIcon,
  LucideIcon,
  MenuIcon,
  ShoppingBagIcon,
  TruckIcon,
} from "lucide-react";
import Link from "next/link";

import { AvatarContent } from "@/components/common/avatar-content";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

export const Menu = () => {
  const { data: session } = authClient.useSession();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <AvatarContent />
        <div className="flex flex-col gap-3 p-5">
          <Separator />
          <MenuItem Icon={HomeIcon} text="Início" href={"/"} />
          <MenuItem Icon={TruckIcon} text="Meus pedidos" href={"/"} />
          <MenuItem Icon={ShoppingBagIcon} text="Carrinho" href={"/"} />
          <Separator />
          {session?.user && (
            <MenuItem
              Icon={LogOutIcon}
              text="Sair da conta"
              href={"/"}
              classNameOverride="text-muted-foreground"
              onClick={() => authClient.signOut()}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

function MenuItem({
  Icon,
  text,
  href,
  classNameOverride,
  onClick,
}: {
  Icon: LucideIcon;
  text: string;
  href: string;
  classNameOverride?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex gap-3 font-semibold hover:underline",
        classNameOverride,
      )}
      onClick={onClick}
    >
      <Icon />
      <p>{text}</p>
    </Link>
  );
}
