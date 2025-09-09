"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Bus, Utensils, Box, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().optional(),
  anonymous: z.boolean().default(false),
  amount: z.coerce.number().min(10, { message: "Valor mínimo da doação é de R$ 10,00" }),
});

const boostDonations = [
  { id: "transport", label: "Auxílio transporte", amount: 10, icon: <Bus className="w-8 h-8 mx-auto mb-2 text-gray-400" /> },
  { id: "meals", label: "Auxílio de refeições", amount: 10, icon: <Utensils className="w-8 h-8 mx-auto mb-2 text-gray-400" /> },
  { id: "basic", label: "Auxílio cesta básica mensal", amount: 80, icon: <Box className="w-8 h-8 mx-auto mb-2 text-gray-400" /> },
];

export default function DonationForm() {
    const router = useRouter();
    const [boostedAmount, setBoostedAmount] = useState(0);
    const [selectedBoosts, setSelectedBoosts] = useState<string[]>([]);
    const [displayAmount, setDisplayAmount] = useState("0,00");
    const [showBoostWarning, setShowBoostWarning] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            anonymous: false,
            amount: 0,
        },
    });

    const watchAmount = form.watch("amount");
    const watchAnonymous = form.watch("anonymous");
    const total = (watchAmount || 0) + boostedAmount;

    function handleBoostClick(id: string, amount: number) {
        const currentAmount = form.getValues("amount");
        if (currentAmount < 10) {
            setShowBoostWarning(true);
            return;
        }

        const newSelectedBoosts = selectedBoosts.includes(id)
            ? selectedBoosts.filter(i => i !== id)
            : [...selectedBoosts, id];

        const newBoostedAmount = newSelectedBoosts.reduce((total, boostId) => {
            const boost = boostDonations.find(b => b.id === boostId);
            return total + (boost ? boost.amount : 0);
        }, 0);
        
        setSelectedBoosts(newSelectedBoosts);
        setBoostedAmount(newBoostedAmount);
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        const finalTotal = values.amount + boostedAmount;
        console.log("Donation Submitted:", { ...values, boostedAmount, total: finalTotal });
        
        const params = new URLSearchParams();
        params.append("amount", finalTotal.toString());
        if (!values.anonymous && values.name) {
            params.append("name", values.name);
        }

        router.push(`/payment?${params.toString()}`);
    }

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value.replace(/\D/g, "");
      const numericValue = parseInt(rawValue, 10) || 0;
      const floatValue = numericValue / 100;
      
      form.setValue("amount", floatValue, { shouldValidate: true });

      if (floatValue >= 10) {
        setShowBoostWarning(false);
      }

      const formattedValue = new Intl.NumberFormat('pt-BR', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(floatValue);

      setDisplayAmount(formattedValue);
    };

    return (
        <Card className="w-full max-w-md mx-auto shadow-lg rounded-xl overflow-hidden">
            <CardHeader className="text-center pt-8 pb-4 bg-card">
                <div className="mx-auto mb-4">
                  <Image src="/logo.png" alt="Vakinha Logo" width={140} height={40} />
                </div>
                <h1 className="text-lg font-semibold text-gray-800">Ajude Gabriela nessa jornada tão difícil</h1>
                <p className="text-sm text-gray-500">ID: 4411341</p>
            </CardHeader>
            <CardContent className="px-6 py-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <h3 className="font-semibold text-gray-700 mb-2">Identificação</h3>
                            <FormField control={form.control} name="name" render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Digite seu nome" {...field} className="text-base" disabled={watchAnonymous} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField
                                control={form.control}
                                name="anonymous"
                                render={({ field }) => (
                                    <FormItem className="flex items-center space-x-2 mt-3">
                                        <FormControl>
                                            <Checkbox 
                                                checked={field.value} 
                                                onCheckedChange={(checked) => {
                                                    const isChecked = checked === true;
                                                    field.onChange(isChecked);
                                                    if (isChecked) {
                                                        form.setValue("name", "");
                                                    }
                                                }} 
                                                id="anonymous" 
                                            />
                                        </FormControl>
                                        <label htmlFor="anonymous" className="text-sm font-medium text-gray-600 cursor-pointer">
                                            Quero doar anonimamente
                                        </label>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div>
                             <FormField control={form.control} name="amount" render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                      <div className="relative">
                                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">R$</span>
                                          <Input
                                            type="text"
                                            placeholder="0,00"
                                            value={displayAmount}
                                            onChange={handleAmountChange}
                                            className="pl-9 text-base text-left"
                                          />
                                      </div>
                                    </FormControl>
                                    <FormMessage />
                                    {!form.formState.errors.amount && <p className="text-xs text-primary mt-1">Valor mínimo da doação é de R$ 10,00</p>}
                                </FormItem>
                            )} />
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-700 mb-2">Forma de pagamento</h3>
                            <Button variant="outline" className="w-full justify-start border-primary text-primary hover:bg-primary/10 hover:text-primary">
                                <Image src="/pix-icon.png" alt="Pix Icon" width={20} height={20} />
                                <span className="ml-2 font-semibold">Pix</span>
                            </Button>
                        </div>

                        <div>
                            {showBoostWarning && (
                                <div className="flex items-center text-orange-500 text-xs mb-2">
                                    <AlertTriangle className="w-4 h-4 mr-1 text-orange-500" />
                                    <span>Para turbinar sua doação, o valor mínimo é de R$ 10,00.</span>
                                </div>
                            )}
                            <h3 className="font-semibold text-gray-700 mb-3">Turbine sua doação</h3>
                            <div className="grid grid-cols-3 gap-3 text-center">
                                {boostDonations.map(boost => (
                                    <button 
                                      type="button" 
                                      key={boost.id}
                                      onClick={() => handleBoostClick(boost.id, boost.amount)}
                                      className={
                                        `p-3 rounded-lg border-2 transition-colors duration-200 ` + 
                                        (selectedBoosts.includes(boost.id) ? 'border-primary bg-primary/10' : 'border-gray-200 bg-gray-50 hover:border-gray-300') +
                                        (watchAmount < 10 && !selectedBoosts.includes(boost.id) ? ' cursor-pointer' : '')
                                      }
                                    >
                                        {boost.icon}
                                        <p className="text-xs font-medium text-gray-600">{boost.label}</p>
                                        <p className="text-xs font-bold text-gray-800 mt-1">R$ {boost.amount.toFixed(2)}</p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <Separator />
                        
                        <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Contribuição:</span>
                                <span className="font-semibold text-gray-800">R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg">
                                <span className="text-gray-800">Total:</span>
                                <span className="text-gray-800">R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                        </div>

                        <Button type="submit" className="w-full text-base font-semibold" size="lg" disabled={form.formState.isSubmitting || total < 10 }>
                            CONTRIBUIR
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
