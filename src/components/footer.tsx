import Image from 'next/image';
import { ShieldCheck, Twitter, Youtube } from 'lucide-react';

const PinterestIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 4.887 3.585 8.973 8.206 9.853.14.025.26-.104.22-.243-.1-.355-.32-1.345-.398-1.645-.095-.38-.57-2.42.57-2.42 1.05 0 1.845.83 1.845 2.15 0 1.297-.81 3.23-1.83 3.23-.98 0-1.71-.85-1.48-1.87.27-1.18.81-2.44.81-3.3 0-.79-.44-1.45-1.34-1.45-1.07 0-1.95.99-1.95 2.3 0 .85.3 1.48.3 1.48s-1.02 4.35-1.2 5.13c-.27 1.15-.02 2.5.21 3.1.05.15.2.2.3.1.3-.3 1.05-1.24 1.37-2.34.09-.32.53-2.1.53-2.1.24-.46.7-.87.7-1.9 0-1.3-.78-2.52-2.32-2.52-1.9 0-3.3 1.42-3.3 3.6 0 1.35.5 2.81.5 2.81s-1.57 6.6-1.84 7.75c-.32 1.35-1.74 3-1.74 3.65 0 .5.3.9.7.9.6 0 2.22-1.15 2.8-2.2.14-.25.46-1.06.6-1.7.17-.7.96-3.75.96-3.75.4.78 1.56 1.44 2.8 1.44 3.52 0 5.5-2.6 5.5-6.14 0-2.9-2-5.1-5-5.1-3.4 0-5.4 2.5-5.4 5.2 0 .8.3 1.6.7 2.1.1.1.1.3 0 .4-.1.1-.3.1-.4-.1-.5-.5-1-1.6-1-3 0-2.5 1.8-4.8 5.1-4.8 2.8 0 4.9 2 4.9 4.6 0 2.8-1.7 5.1-4.1 5.1-.8 0-1.5-.4-1.7-.9 0 0-.4 1.4-.5 1.8-.2.7-.8 1.6-1.2 2.2 0 0-.1.3-.1.5 0 .4.2.8.6.8 1.3 0 2.4-2 2.8-3.1.1-.3.5-1.8.5-1.8s.5-.9 1.2-1.9c.7-1.1 1-2.4 1-3.8 0-3.4-2.5-6.3-6.9-6.3-4.8 0-8.2 3.4-8.2 7.6 0 3.3 2 6.3 5.1 6.3.9 0 1.8-.4 2.4-.8.1.1.2.3.1.5-.1.3-.4.6-.5.7-.5.5-1.3.9-2.2.9-2.5 0-4.7-2.1-4.7-5.3 0-2.8 2.2-5.7 6.3-5.7 3.4 0 6.1 2.4 6.1 5.7 0 3.2-1.9 6-4.9 6-.8 0-1.5-.3-1.5-.3s-.3.9-.4 1.3c-.3 1.2-1.2 2.4-1.2 2.4s-.1.4.1.5c.3.2.7 0 .8-.2.2-.3.9-1.2 1.2-2.1.2-.7.8-3.3.8-3.3s.4-.7.4-1.5c0-1.2-.9-2.3-2.1-2.3-1.4 0-2.6 1.2-2.6 2.7 0 1.1.4 1.9.4 1.9s-1.2 5.1-1.5 6.2C6.9 21.4 5.2 24 3.6 24c-1 0-1.8-.8-1.8-1.8 0-1.2 1-3.1 1.4-4.2.5-1.4 1-2.8 1.4-4.3.2-.8.3-1.5.3-2.2 0-2.2-1.5-4-3.7-4-2.9 0-5.1 2.3-5.1 5.1 0 2.1 1.1 4.1 2.7 5 .1.1.1.2.1.3s-.1.2-.2.2c-.2.1-.4.1-.5.1h-.1c-1.3-.3-2.3-1.4-2.3-2.8 0-2.1 1.6-4.2 4.1-4.2 2.1 0 3.8 1.3 3.8 3.4 0 1.2-.4 2.3-.9 3-.1.2.1.4.3.4.1 0 .2-.1.3-.1.7-.5 1-1.3 1-2.2 0-1.7-1.1-3.2-3.1-3.2-1.9 0-3.4 1.6-3.4 3.7 0 1.2.5 2.4 1.1 3 .1.1.1.3 0 .4-.1.2-.3.2-.4.2-1-.4-1.6-1.5-1.6-2.7 0-2.3 1.9-4.3 4.5-4.3s4.5 2 4.5 4.3c0 2.3-1.9 4.3-4.5 4.3z"/>
    </svg>
);

export default function Footer() {
    return (
        <footer className="bg-[#212834] text-gray-300 font-body">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Logo and Social */}
                    <div className="space-y-4">
                        <Image src="/logo.png" alt="Vakinha Logo" width={110} height={32} />
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-white"><PinterestIcon /></a>
                            <a href="#" className="hover:text-white"><Twitter size={20}/></a>
                            <a href="#" className="hover:text-white"><Youtube size={20} /></a>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-semibold text-primary mb-4 text-green-500">Links rápidos</h3>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white">Quem somos</a></li>
                                <li><a href="#" className="hover:text-white">Vaquinhas</a></li>
                                <li><a href="#" className="hover:text-white">Criar vaquinhas</a></li>
                                <li><a href="#" className="hover:text-white">Login</a></li>
                                <li><a href="#" className="hover:text-white">Vaquinhas mais amadas</a></li>
                                <li><a href="#" className="hover:text-white">Política de privacidade</a></li>
                                <li><a href="#" className="hover:text-white">Termos de uso</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-primary mb-4 invisible">.</h3>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white">Dúvidas frequentes</a></li>
                                <li><a href="#" className="hover:text-white">Taxas e prazos</a></li>
                                <li><a href="#" className="hover:text-white">Loja de corações</a></li>
                                <li><a href="#" className="hover:text-white">Vakinha Premiada</a></li>
                                <li><a href="#" className="hover:text-white">Blog da Vakinha</a></li>
                                <li><a href="#" className="hover:text-white">Segurança e transparência</a></li>
                                <li><a href="#" className="hover:text-white">Busca por recibo</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Fale Conosco */}
                    <div>
                        <h3 className="font-semibold text-primary mb-4 text-green-500">Fale conosco</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white">Clique aqui para falar conosco</a></li>
                            <li>De Segunda à Sexta</li>
                            <li>Das 9:30 às 17:00</li>
                            <li className="flex items-center space-x-2 pt-2">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white">
                                    <ShieldCheck size={20} />
                                </span>
                                <div className="flex flex-col">
                                  <span className="text-xs font-bold">SELO DE</span>
                                  <span className="text-xs font-bold">SEGURANÇA</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-xs">
                    <p>&copy; 2025 - Todos direitos reservados</p>
                </div>
            </div>
        </footer>
    );
}
