"use client";

import { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { PartyPopper, X } from 'lucide-react';

interface DonationNotificationProps {
    name: string;
    amount: number;
    onClose: () => void;
}

const ConfettiPiece = ({ style }: { style: React.CSSProperties }) => (
    <div className="absolute w-2 h-4" style={style}></div>
);

const DonationNotification = ({ name, amount, onClose }: DonationNotificationProps) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 5500); // Garante que feche um pouco antes do próximo
        return () => clearTimeout(timer);
    }, [onClose]);

    const confetti = Array.from({ length: 30 }).map((_, index) => {
        const style: React.CSSProperties = {
            left: `${Math.random() * 100}%`,
            top: `${-20 + Math.random() * 40}px`,
            backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
            transform: `rotate(${Math.random() * 360}deg)`,
            animation: `fall 2s ease-out ${index * 0.05}s forwards`,
        };
        return <ConfettiPiece key={index} style={style} />;
    });

    return (
        <>
            <style jsx>{`
                @keyframes fall {
                    to {
                        transform: translateY(80px) rotate(${Math.random() * 360}deg);
                        opacity: 0;
                    }
                }
                @keyframes slide-in-bottom {
                    from {
                        transform: translateY(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                .notification-card {
                    animation: slide-in-bottom 0.5s ease-out forwards;
                }
            `}</style>
            <div className="fixed bottom-4 left-4 z-50 w-full max-w-sm px-4">
                 <Card className="notification-card relative shadow-2xl bg-white p-4 rounded-xl flex items-center space-x-3 overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none">{confetti}</div>
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <PartyPopper className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                        <p className="font-semibold text-gray-800">{name}</p>
                        <p className="text-sm text-gray-600">
                            contribuiu com{" "}
                            <span className="font-bold">
                                R$ {amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </span>
                        </p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={18} />
                    </button>
                 </Card>
            </div>
        </>
    );
};

export default DonationNotification;
