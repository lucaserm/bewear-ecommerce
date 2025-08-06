import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LogInIcon } from "lucide-react";
import Link from "next/link";

export const AvatarContent = () => {
  const { data: session } = authClient.useSession();
  return (
    <div className="px-5">
      {session?.user ? (
        <>
          <div className="flex justify-between space-y-6">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={session?.user?.image as string | undefined} />
                <AvatarFallback>
                  {session?.user?.name?.split(" ")?.[0]?.[0]}
                  {session?.user?.name?.split(" ")?.[1]?.[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{session?.user?.name}</h3>
                <span className="text-muted-foreground block text-xs">
                  {session?.user?.email}
                </span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Olá. Faça seu login!</h2>
          <Button size="icon" asChild variant="outline">
            <Link href="/authentication">
              <LogInIcon />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};
