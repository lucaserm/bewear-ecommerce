"use client";

import { getAddresses } from "@/actions/get-adresses";
import { getCart } from "@/actions/get-cart";
import { AddressForm } from "@/app/identification/components/address-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { shippingAddressTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

type Address = typeof shippingAddressTable.$inferSelect;

function Identification() {
  const { data: addresses, isPending: addressesIsLoading } = useQuery({
    queryKey: ["addresses"],
    queryFn: () => getAddresses(),
  });

  const { data: cart, isPending: cartIsLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  });

  const [radioValue, setRadioValue] = useState<string>(
    addresses?.addresses[0]?.id ?? "new",
  );

  function formatAddressLabel(address: Address) {
    return `${address.recipientName}, ${address.street}, ${address.number},
                ${address.complement}, ${address.neighborhood}, ${address.zipCode},
                ${address.city}, ${address.state}, ${address.country}`;
  }

  return (
    <div className="space-y-6 p-5">
      <div className="border p-5">
        <h3 className="font-semibold">Identificação</h3>
        <RadioGroup
          defaultValue={radioValue}
          value={radioValue}
          onValueChange={setRadioValue}
        >
          {addresses?.addresses.map((address) => (
            <RadioItem
              key={address.id}
              id={address.id}
              label={formatAddressLabel(address)}
            />
          ))}
          <RadioItem id="new" label="Adicionar novo" />
        </RadioGroup>
        {radioValue === "new" ? (
          <div className="space-y-5 p-5">
            <Separator />
            <AddressForm setRadioValue={setRadioValue} />
          </div>
        ) : (
          <>
            <Separator />
            <Button type="submit" className="w-full">
              Continuar com o pagamento
            </Button>
          </>
        )}
      </div>
      <div className="w-full space-y-6 border p-5">
        <h3 className="font-bold">Seu pedido</h3>
        <div>
          <div className="flex justify-between">
            <h2 className="font-semibold">Subtotal</h2>
            <h2>{formatCentsToBRL(cart?.totalPriceInCents ?? 0)}</h2>
          </div>
          <div className="flex justify-between">
            <h2 className="font-semibold">Transporte e Manuseio</h2>
            <h2>Grátis</h2>
          </div>
          <div className="flex justify-between">
            <h2 className="font-semibold">Taxa Estimada</h2>
            <h2>-</h2>
          </div>
          <div className="flex justify-between">
            <h2 className="font-semibold">Total</h2>
            <h2>{formatCentsToBRL(cart?.totalPriceInCents ?? 0)}</h2>
          </div>
        </div>
        <Separator />
        <div className="flex h-full flex-col gap-8">
          {cart?.items.map((item) => (
            <div className="flex gap-5" key={item.id}>
              <Image
                alt={item.productVariant.name}
                src={item.productVariant.imageUrl}
                width={100}
                height={100}
                className="h-auto rounded-3xl object-cover"
              />
              <div>
                <h2 className="font-semibold">
                  {item.productVariant.product.name}
                </h2>
                <h3>{item.productVariant.name}</h3>
                <h3>{item.quantity}</h3>
                <h2 className="font-semibold">
                  {formatCentsToBRL(
                    item.quantity * item.productVariant.priceInCents,
                  )}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RadioItem({ id, label }: { id: string; label: string }) {
  return (
    <div className="flex min-h-[50px] w-full items-center gap-3 rounded-2xl border p-5">
      <RadioGroupItem value={id} id={id} />
      <Label htmlFor={id} className="font-semibold">
        {label}
      </Label>
    </div>
  );
}

export default Identification;
