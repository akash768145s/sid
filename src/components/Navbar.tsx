'use client';
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React, { useState } from "react";

// Import PNG icons
import ProductsIcon from '../../public/products.png';
import ServicesIcon from '../../public/services.png';
import PricingIcon from '../../public/pricing.png';
import AboutUsIcon from '../../public/aboutus.png';
import ContactIcon from '../../public/contact.png';

export default function Navbar() {
    const [isClick, setIsClick] = useState(false);

    const toggleNavbar = () => {
        setIsClick(!isClick);
    };

    return (
        <nav className='bg-black h-[81px] shadow-md sticky top-0 z-10'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-full'>
                    <div className='flex items-center'>
                        <Link href='/' passHref>
                            <Image src="/inno3.png" alt="Spice N' Oil Logo" width="300" height="64" className='ml-0' />
                        </Link>
                    </div>
                    <div className='hidden md:flex space-x-4'>
                        <NavItem href='/' title='Products' icon={ProductsIcon} />
                        <NavItem href='/products' title='Services' icon={ServicesIcon} />
                        <NavItem href='/pricing' title='Clients' icon={PricingIcon} />  
                        <NavItem href='/about-us' title='About Us' icon={AboutUsIcon} />
                        <NavItem href='/contact' title='Contact' icon={ContactIcon} contact={true} />
                    </div>
                    <div className='md:hidden'>
                        <button
                            className='inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                            aria-label='Toggle navigation'
                            onClick={toggleNavbar}>
                            {isClick ? (
                                <CloseIcon />
                            ) : (
                                <MenuIcon />
                            )}
                        </button>
                    </div>
                </div>
            </div>
            {isClick && (
                <div className="md:hidden bg-[#000000]">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <NavItem href='/' title='Products' icon={ProductsIcon} mobile={true} />
                        <NavItem href='/products' title='Services' icon={ServicesIcon} mobile={true} />
                        <NavItem href='/pricing' title='Clients' icon={PricingIcon} mobile={true} />
                        <NavItem href='/about-us' title='About Us' icon={AboutUsIcon} mobile={true} />
                        <NavItem href='/contact' title='Contact' icon={ContactIcon} mobile={true} contact={true} />
                    </div>
                </div>
            )}
        </nav>
    );
}

interface NavItemProps {
    href: string;
    title: string;
    icon: StaticImageData;
    mobile?: boolean; // Optional property
    contact?: boolean; // Optional property for contact icon size
}

const NavItem: React.FC<NavItemProps> = ({ href, title, icon, mobile, contact }) => (
    <Link
        href={href}
        className={`flex items-center space-x-2  ${mobile ? 'text-white' : 'text-white'} hover:bg-light-red hover:ring-2 hover:ring-white hover:ring-opacity-60 hover:rounded-[30px] rounded-lg px-3 py-2 font-semibold transition-all`}
        passHref
    >
        <Image
            src={icon}
            alt={title}
            width={contact ? 25 : 30}
            height={contact ? 25 : 30}
            className="flex-shrink-0"
        />
        <span>{title}</span>
    </Link>
);

const MenuIcon = () => (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#ffffff">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
);

const CloseIcon = () => (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#ffffff">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);
