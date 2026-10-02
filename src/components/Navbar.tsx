import { MenuIcon, XIcon, LogOutIcon } from 'lucide-react';
import { PrimaryButton } from './Buttons';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from "react-router-dom";
import { assets } from '../assets/assets';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    const navLinks = [
        { name: 'Home', href: '/#' },
        { name: 'Showcase', href: '/#showcase-slider' },
        { name: 'Create', href: '/generate' },
        { name: 'Location', href: '/#location-map' },
        { name: 'Community', href: '/community' },
        { name: 'Plans', href: '/plans' },
    ];

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        navigate('/');
        setIsOpen(false);
    }

    return (
        <motion.nav className='fixed top-5 left-0 right-0 z-50 px-4'
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
        >
            <div className='max-w-6xl mx-auto flex items-center justify-between bg-black/50 backdrop-blur-md border border-white/4 rounded-2xl p-3'>
                <Link to='/' onClick={()=> scrollTo(0, 0)}>
                    <img src={assets.logo} alt="logo" className="h-8" />
                </Link>

                <div className='hidden md:flex items-center gap-8 text-sm font-medium text-gray-300'>
                    {navLinks.map((link) => (
                        <Link onClick={()=> scrollTo(0, 0)} to={link.href} key={link.name} className="hover:text-white transition">
                            {link.name}
                        </Link>
                    ))}
                    {user && (
                         <Link onClick={()=> scrollTo(0, 0)} to='/my-generations' className="hover:text-white transition">
                         My Generations
                     </Link>
                    )}
                </div>

                <div className='hidden md:flex items-center gap-3'>
                    {user ? (
                         <button onClick={handleSignOut} className='flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition max-sm:hidden'>
                             <LogOutIcon className='size-4'/> Sign out
                         </button>
                    ) : (
                        <>
                        <Link to='/auth' className='text-sm font-medium text-gray-300 hover:text-white transition max-sm:hidden'>
                            Sign in
                        </Link>
                        <Link to='/auth'>
                            <PrimaryButton className='max-sm:text-xs hidden sm:inline-block'>Get Started</PrimaryButton>
                        </Link>
                        </>
                    )}
                </div>

                <button onClick={() => setIsOpen(!isOpen)} className='md:hidden'>
                    <MenuIcon className='size-6' />
                </button>
            </div>
            <div className={`flex flex-col items-center justify-center gap-6 text-lg font-medium fixed inset-0 bg-black/40 backdrop-blur-md z-50 transition-all duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
                {navLinks.map((link) => (
                    <a key={link.name} href={link.href} onClick={() => setIsOpen(false)}>
                        {link.name}
                    </a>
                ))}
                
                {user && (
                     <Link to='/my-generations' onClick={() => setIsOpen(false)}>
                     My Generations
                 </Link>
                )}

                {user ? (
                     <button onClick={handleSignOut} className='font-medium text-red-400 hover:text-red-300 transition'>
                     Sign out
                 </button>
                ) : (
                    <>
                    <Link to='/auth' onClick={() => setIsOpen(false)} className='font-medium text-gray-300 hover:text-white transition'>
                        Sign in
                    </Link>
                    <Link to='/auth' onClick={() => setIsOpen(false)}>
                        <PrimaryButton>Get Started</PrimaryButton>
                    </Link>
                    </>
                )}

                <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-md bg-white p-2 text-gray-800 ring-white active:ring-2 mt-4"
                >
                    <XIcon />
                </button>
            </div>
        </motion.nav>
    );
};