"use client";

import { Suspense } from 'react';
import PaymentPix from "@/components/payment-pix";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { useSearchParams } from "next/navigation";

function PaymentContent() {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount") || "0";
  const name = searchParams.get("name");

  return <PaymentPix amount={parseFloat(amount)} name={name} />;
}

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-background font-body flex flex-col">
      <main className="w-full flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Suspense fallback={<div>Carregando...</div>}>
            <PaymentContent />
          </Suspense>
        </div>
      </main>
      <Toaster />
      <Footer />
    </div>
  );
}
