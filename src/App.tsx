import React, { useState } from 'react';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Header } from './components/Header';
import { ProductGrid } from './components/ProductGrid';
import { LoginForm } from './components/admin/LoginForm';
import { AdminPanel } from './components/admin/AdminPanel';
import { Loader2 } from 'lucide-react';

type ViewType = 'store' | 'login' | 'admin';

function AppContent() {
  const { user, loading } = useAuth();
  const [currentView, setCurrentView] = useState<ViewType>('store');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-pink-500 mx-auto mb-4" />
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  // Si el usuario está autenticado y está en vista de login, mostrar admin
  if (user && currentView === 'login') {
    setCurrentView('admin');
  }

  // Si el usuario no está autenticado y está en vista de admin, mostrar login
  if (!user && currentView === 'admin') {
    setCurrentView('login');
  }

  const handleAdminClick = () => {
    if (user) {
      setCurrentView('admin');
    } else {
      setCurrentView('login');
    }
  };

  const handleBackToStore = () => {
    setCurrentView('store');
  };

  if (currentView === 'login') {
    return <LoginForm onBack={handleBackToStore} />;
  }

  if (currentView === 'admin' && user) {
    return <AdminPanel />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onAdminClick={handleAdminClick} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Bienvenidos a Pétalos del Corazón
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre nuestra hermosa colección de flores frescas y arreglos florales 
            que llenarán de color y alegría tu hogar o el de tus seres queridos.
          </p>
        </div>

        {/* Products Grid */}
        <ProductGrid />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              © 2025 Pétalos del Corazón. Hecho con 💖 para compartir la belleza de las flores.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;