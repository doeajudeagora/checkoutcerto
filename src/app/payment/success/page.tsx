"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PartyPopper, ArrowLeft } from "lucide-react";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { useRouter } from 'next/navigation';

export default function PaymentSuccessPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-background font-body flex flex-col">
            <main className="w-full flex-grow flex items-center justify-center p-4">
                <Card className="w-full max-w-md mx-auto shadow-lg rounded-xl overflow-hidden">
                    <CardHeader className="text-center pt-8 pb-4 bg-card">
                        <div className="mx-auto mb-4">
                            <Image src="/logo.png" alt="Vakinha Logo" width={140} height={40} />
                        </div>
                    </CardHeader>
                    <CardContent className="px-6 py-8 text-center">
                        <div className="flex flex-col items-center justify-center">
                            <PartyPopper className="w-16 h-16 text-primary mb-4" />
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">
                                Doação recebida!
                            </h1>
                            <p className="text-gray-600 mb-6">
                                Muito obrigado por sua contribuição. Sua ajuda faz toda a diferença para a jornada da Gabriela.
                            </p>
                            <Button onClick={() => router.push('/')}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Voltar para o início
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </main>
            <Toaster />
            <Footer />
        </div>
    );
}
