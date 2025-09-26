import React, { useState } from 'react';
import { ShoppingCart, Heart, User, LogOut, Package } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Cart } from './Cart';

interface HeaderProps {
  onAdminClick: () => void;
}

export function Header({ onAdminClick }: HeaderProps) {
  const { cart } = useCart();
  const { user, signOut } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Heart className="w-8 h-8 text-pink-500 fill-current" />
              <h1 className="text-2xl font-bold text-gray-800">Pétalos del Corazón</h1>
            </div>

            {/* Navigation */}
            <div className="flex items-center space-x-4">
              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-600 hover:text-pink-500 transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {cart.itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.itemCount}
                  </span>
                )}
              </button>

              {/* Admin/Auth Section */}
              {user ? (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={onAdminClick}
                    className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-pink-500 transition-colors"
                  >
                    <Package className="w-4 h-4" />
                    <span className="hidden sm:inline">Admin</span>
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-red-500 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Salir</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={onAdminClick}
                  className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-pink-500 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Admin</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Cart Sidebar */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}