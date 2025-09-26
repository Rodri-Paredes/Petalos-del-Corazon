import React, { useState } from 'react';
import { Plus, Package, List, BarChart3 } from 'lucide-react';
import { ProductList } from './ProductList';
import { ProductForm } from './ProductForm';
import { OrdersList } from './OrdersList';

type AdminView = 'products' | 'add-product' | 'edit-product' | 'orders';

export function AdminPanel() {
  const [currentView, setCurrentView] = useState<AdminView>('products');
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setCurrentView('edit-product');
  };

  const handleProductSaved = () => {
    setCurrentView('products');
    setEditingProduct(null);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'add-product':
        return (
          <ProductForm
            onCancel={() => setCurrentView('products')}
            onSave={handleProductSaved}
          />
        );
      case 'edit-product':
        return (
          <ProductForm
            product={editingProduct}
            onCancel={() => setCurrentView('products')}
            onSave={handleProductSaved}
          />
        );
      case 'orders':
        return <OrdersList />;
      default:
        return <ProductList onEdit={handleEditProduct} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-semibold text-gray-800">Panel de Administración</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => window.location.href = '/'}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
              >
                Volver al Inicio
              </button>
              {currentView === 'products' && (
                <button
                  onClick={() => setCurrentView('add-product')}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nuevo Producto</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="bg-white rounded-lg shadow-sm p-4">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setCurrentView('products')}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                      currentView === 'products' || currentView === 'add-product' || currentView === 'edit-product'
                        ? 'bg-pink-100 text-pink-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Package className="w-4 h-4" />
                    <span>Productos</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentView('orders')}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                      currentView === 'orders'
                        ? 'bg-pink-100 text-pink-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <List className="w-4 h-4" />
                    <span>Órdenes</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}