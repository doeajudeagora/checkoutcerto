"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState, useEffect, useRef } from "react";
import { Copy, Timer, Smartphone, Lightbulb, PartyPopper } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createPixPayment, CreatePixPaymentOutput, checkPixPaymentStatus } from "@/lib/actions";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from 'next/navigation';

// Define a interface para a função fbq do Facebook Pixel
declare global {
    interface Window {
        fbq: (...args: any[]) => void;
    }
}

interface PaymentPixProps {
  amount: number;
  name?: string | null;
}

export default function PaymentPix({ amount, name }: PaymentPixProps) {
  const { toast } = useToast();
  const [paymentData, setPaymentData] = useState<CreatePixPaymentOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    async function generatePix() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await createPixPayment({
          amount,
          payerName: name || "Doador Anônimo",
        });
        setPaymentData(data);
      } catch (e) {
        console.error(e);
        setError("Não foi possível gerar o código PIX. Tente novamente mais tarde.");
        toast({
            variant: "destructive",
            title: "Erro ao gerar PIX",
            description: "Houve um problema ao se comunicar com o sistema de pagamentos. Por favor, atualize a página e tente novamente.",
        });
      } finally {
        setIsLoading(false);
      }
    }
    generatePix();
  }, [amount, name, toast]);

  useEffect(() => {
    if (paymentData?.transactionId) {
      pollingIntervalRef.current = setInterval(async () => {
        try {
          const { status } = await checkPixPaymentStatus(paymentData.transactionId);
          if (status === 'paid') {
            if (pollingIntervalRef.current) {
              clearInterval(pollingIntervalRef.current);
            }
            
            // Dispara o evento de Purchase imediatamente após a confirmação
            if (typeof window.fbq === 'function') {
                window.fbq('track', 'Purchase');
            }

            router.push('/payment/success');
          }
        } catch (err) {
            console.error("Polling error:", err)
        }
      }, 5000); // Poll every 5 seconds
    }

    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [paymentData, router]);


  const handleCopy = () => {
    if (paymentData?.pixCopyPaste) {
      navigator.clipboard.writeText(paymentData.pixCopyPaste);
      toast({
        title: "Código Pix copiado!",
        description: "Use o código no seu app de pagamentos.",
      });
    }
  };
  
  const paymentSteps = [
      { text: "Copie o código PIX acima clicando no botão verde ao lado." },
      { text: "Abra o aplicativo do seu banco (Itaú, Bradesco, Santander, Caixa, etc.)" },
      { text: "Procure por \"PIX\" no menu principal do aplicativo" },
      { text: "Escolha \"Pagar com PIX\" ou \"PIX Copia e Cola\"" },
      { text: "Cole o código que você copiou no passo 1" },
      { text: `Confirme o pagamento - O valor será R$ ${amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` },
  ];

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg rounded-xl overflow-hidden">
      <CardHeader className="text-center pt-8 pb-4 bg-card">
        <div className="mx-auto mb-4">
          <Image src="/logo.png" alt="Vakinha Logo" width={140} height={40} />
        </div>
        <h1 className="text-lg font-semibold text-gray-800">
          Ajude Gabriela nessa jornada tão difícil
        </h1>
        <p className="text-sm text-gray-500">ID da vaquinha: 4411341</p>
      </CardHeader>
      <CardContent className="px-6 py-4 text-center">
        <div className="flex flex-col items-center justify-center">
            <p className="text-sm text-gray-600 mb-2">Valor da contribuição</p>
            <p className="text-3xl font-bold text-gray-800 mb-4">
                R$ {amount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>

            <div className="p-2 border border-gray-200 rounded-lg bg-white inline-block h-[236px] w-[236px]">
              {isLoading ? (
                  <Skeleton className="w-full h-full" />
              ) : paymentData?.qrCode ? (
                  <Image
                    src={paymentData.qrCode}
                    alt="QR Code Pix"
                    width={220}
                    height={220}
                    unoptimized
                  />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 text-gray-500">
                    <p>Erro ao carregar QR Code</p>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-2">Leia o QR Code com seu app de pagamentos.</p>
        </div>
        
        <div className="my-6">
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-gray-500">ou</span>
                </div>
            </div>
        </div>

        <div className="space-y-4">
            <p className="text-sm text-gray-600">Copie o código e pague no seu app:</p>
            <div className="flex items-center w-full">
              {isLoading ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                <>
                  <input 
                      type="text" 
                      readOnly 
                      value={paymentData?.pixCopyPaste || ""}
                      className="w-full p-2 border border-gray-300 rounded-l-md bg-gray-50 text-xs truncate" 
                      placeholder={error || "Gerando código..."}
                  />
                  <Button onClick={handleCopy} className="rounded-l-none" aria-label="Copiar código Pix" disabled={!paymentData?.pixCopyPaste}>
                      <Copy className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>
        </div>

        <div className="mt-8 text-left bg-green-50/50 border border-green-200 rounded-lg p-4">
            <h3 className="flex items-center font-semibold text-base text-gray-800 mb-4">
                <Smartphone className="w-5 h-5 mr-2 text-primary" />
                Como pagar com PIX - Passo a passo
            </h3>
            <div className="space-y-3">
                {paymentSteps.map((step, index) => (
                    <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                            {index + 1}
                        </div>
                        <p className="text-sm text-gray-700">{step.text}</p>
                    </div>
                ))}
            </div>
            <div className="mt-4 bg-green-100/70 border-l-4 border-primary text-gray-700 p-3 rounded-r-lg text-sm">
                <div className="flex">
                    <Lightbulb className="w-5 h-5 mr-2 text-primary flex-shrink-0" />
                    <div>
                        <span className="font-semibold">Dica:</span> O pagamento PIX é instantâneo e seguro. Após confirmar, sua doação será processada imediatamente!
                    </div>
                </div>
            </div>
        </div>

        <div className="mt-6 text-sm flex items-center justify-center text-primary">
            <Timer className="w-4 h-4 mr-2" />
            <span>Aguardando confirmação de pagamento...</span>
        </div>
      </CardContent>
    </Card>
  );
}
