"use client";

import DonationForm from "@/components/donation-form";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { useState, useEffect } from 'react';
import DonationNotification from "@/components/donation-notification";

// Lista de nomes femininos comuns no Brasil
const brazilianFemaleNames = [
  "Maria", "Ana", "Francisca", "Antônia", "Adriana", "Juliana", "Marcia", "Fernanda", "Patricia", "Aline",
  "Sandra", "Camila", "Amanda", "Bruna", "Jéssica", "Leticia", "Vanessa", "Mariana", "Gabriela", "Vera",
  "Lucia", "Terezinha", "Rosa", "Raquel", "Cristiane", "Sofia", "Isabela", "Laura", "Alice", "Valentina",
  "Helena", "Manuela", "Luiza", "Yasmin", "Beatriz", "Catarina", "Clara", "Elisa", "Heloísa", "Lorena",
  "Olívia", "Pietra", "Sarah", "Lívia", "Esther", "Melissa", "Marina", "Cecília", "Eloá", "Rafaela"
];

// Função para gerar um valor de doação aleatório
const getRandomAmount = () => {
    const amounts = [15, 20, 25, 40];
    return amounts[Math.floor(Math.random() * amounts.length)];
};

export default function Home() {
  const [notification, setNotification] = useState<{ name: string; amount: number; id: number } | null>(null);

  useEffect(() => {
    const showRandomNotification = () => {
      const randomName = brazilianFemaleNames[Math.floor(Math.random() * brazilianFemaleNames.length)];
      const randomAmount = getRandomAmount();
      setNotification({ name: randomName, amount: randomAmount, id: Date.now() });

      // Esconde a notificação após 6 segundos
      setTimeout(() => {
        setNotification(null);
      }, 6000);
    };

    // Mostra a primeira notificação após um breve delay inicial
    const initialTimeout = setTimeout(showRandomNotification, 3000);
    
    // Configura o intervalo para mostrar notificações a cada 12 segundos
    const interval = setInterval(showRandomNotification, 12000);

    // Limpa os timers quando o componente é desmontado
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background font-body flex flex-col">
      {notification && (
          <DonationNotification
              key={notification.id}
              name={notification.name}
              amount={notification.amount}
              onClose={() => setNotification(null)}
          />
      )}
      <main className="w-full flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <DonationForm />
        </div>
      </main>
      <Toaster />
      <Footer />
    </div>
  );
}
