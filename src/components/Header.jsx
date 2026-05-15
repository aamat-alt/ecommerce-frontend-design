import React from 'react';
import { Search, User, MessageSquare, Heart, ShoppingCart, Menu, ChevronDown } from 'lucide-react';
import logo from '../assets/Layout/Brand/logo-colored.png';

const Header = ({ setPage }) => {
  const user = localStorage.getItem('user');

  return (
    <header className="bg-white border-b border-shade-border lg:sticky top-0 z-50 shadow-sm">
      {/* Top Header */}
      <div className="container py-4 flex items-center justify-between gap-6">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setPage('home')}>
          <img src={logo} alt="Brand" className="h-[46px]" />
        </div>

        <div className="flex-1 max-w-2xl flex border-2 border-primary rounded-lg overflow-hidden">
          <input type="text" placeholder="Search" className="flex-1 px-4 py-2 outline-none" />
          <div className="flex items-center border-l px-4 py-2 bg-white cursor-pointer hover:bg-gray-50">
            <span className="text-sm">All category</span>
            <ChevronDown className="w-4 h-4 ml-2" />
          </div>
          <button className="bg-primary hover:opacity-90 text-white px-8 py-2 font-medium" onClick={() => setPage('listing')}>
            Search
          </button>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center cursor-pointer text-secondary hover:text-primary transition-colors"
            onClick={() => {
              if (user) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.reload();
              } else {
                setPage('login');
              }
            }}>
            <User className="w-5 h-5 mb-1" />
            <span className="text-xs">{user ? JSON.parse(user).name.split(' ')[0] : 'Login'}</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer text-secondary hover:text-primary transition-colors" onClick={() => setPage('message')}>
            <MessageSquare className="w-5 h-5 mb-1" />
            <span className="text-xs">Message</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer text-secondary hover:text-primary transition-colors" onClick={() => setPage('orders')}>
            <Heart className="w-5 h-5 mb-1" />
            <span className="text-xs">Orders</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer text-secondary hover:text-primary transition-colors" onClick={() => setPage('cart')}>
            <ShoppingCart className="w-5 h-5 mb-1" />
            <span className="text-xs">My cart</span>
          </div>
        </div>
      </div>

      {/* Bottom Header */}
      <div className="border-t border-shade-border bg-white overflow-x-auto no-scrollbar">
        <div className="container py-3 flex items-center whitespace-nowrap gap-4">
          <nav className="flex items-center gap-6 font-medium text-dark">
            <div className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors" onClick={() => setPage('listing')}>
              <Menu className="w-5 h-5" />
              <span>All category</span>
            </div>
            <a href="#" className="hover:text-primary transition-colors" onClick={(e) => { e.preventDefault(); setPage('listing'); }}>Hot offers</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;