"use client";
import { useForm } from "react-hook-form";

import { addAddress } from "@/actions/add-address";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  email: z.email("Email inválido."),
  recipientName: z
    .string()
    .trim()
    .min(2, "O nome do destinatário deve ter pelo menos 2 caracteres."),
  cpfOrCnpj: z
    .string()
    .trim()
    .min(11, "O CPF/CNPJ deve ter pelo menos 11 caracteres."),
  phone: z.string().trim().min(1, "Celular inválido."),
  zipCode: z.string().trim().min(1, "CEP inválido."),
  street: z.string().trim().min(1, "Endereço inválido."),
  number: z.string().trim().min(1, "Número inválido."),
  complement: z.string().trim(),
  neighborhood: z.string().trim().min(1, "Bairro inválido."),
  city: z.string().trim().min(1, "Cidade inválida."),
  state: z.string().trim().min(1, "Estado inválido."),
  country: z.string().trim().min(1, "País inválido."),
});

type FormValues = z.infer<typeof formSchema>;

export const AddressForm = ({
  setRadioValue,
}: {
  setRadioValue: (value: string) => void;
}) => {
  const queryClient = useQueryClient();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      recipientName: "",
      cpfOrCnpj: "",
      phone: "",
      zipCode: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      country: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["addAddress", (address: FormValues) => address.zipCode],
    mutationFn: (address: FormValues) => addAddress(address),
    onSuccess: (createdAddress) => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast.success("Endereço adicionado com sucesso!");
      setRadioValue(createdAddress!.at(0)!.id);
    },
  });

  function onSubmit(values: FormValues) {
    if (isPending) return;
    mutate(values);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="recipientName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Nome do destinatário" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cpfOrCnpj"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="CPF/CNPJ" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Celular" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="zipCode"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="CEP" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Endereço" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Número" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="complement"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Complemento"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="neighborhood"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Bairro" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Cidade" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Estado" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="País" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />
        <Button type="submit" className="w-full">
          Continuar com o pagamento
        </Button>
      </form>
    </Form>
  );
};
