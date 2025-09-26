import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useOrders } from '../hooks/useOrders';
import { generateWhatsAppMessage, sendWhatsAppMessage } from '../utils/whatsapp';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const WHATSAPP_NUMBER = '+59172200745'; // Cambiar por el número real

export function Cart({ isOpen, onClose }: CartProps) {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const { createOrder, loading } = useOrders();
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = async () => {
    if (!customerName.trim() || !customerPhone.trim()) {
      alert('Por favor, completa todos los campos');
      return;
    }

    try {
      // Crear orden en la base de datos
      const order = await createOrder({
        customerName,
        customerPhone,
        items: cart.items,
        totalAmount: cart.total
      });

      // Generar mensaje de WhatsApp
      const message = generateWhatsAppMessage(
        customerName,
        cart.items,
        cart.total,
        order.order_number
      );

      // Enviar por WhatsApp
      sendWhatsAppMessage(WHATSAPP_NUMBER, message);

      // Limpiar carrito y cerrar
      clearCart();
      setCustomerName('');
      setCustomerPhone('');
      setShowCheckout(false);
      onClose();

      alert('¡Pedido enviado! Te redirigiremos a WhatsApp.');
    } catch (error) {
      console.error('Error al procesar pedido:', error);
      alert('Error al procesar el pedido. Intenta nuevamente.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5" />
              <span>Mi Carrito ({cart.itemCount})</span>
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {cart.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                <p className="text-gray-500 mb-2">Tu carrito está vacío</p>
                <p className="text-sm text-gray-400">Agrega algunos productos hermosos</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                    <img
                      src={item.product.image_url || 'https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg'}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800 text-sm line-clamp-1">
                        {item.product.name}
                      </h3>
                      <p className="text-pink-500 font-semibold text-sm">
                        ${item.product.price.toFixed(2)}
                      </p>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                            className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-sm font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                            className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-500 hover:text-red-700 transition-colors text-sm"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.items.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-800">Total:</span>
                <span className="text-xl font-bold text-pink-500">
                  ${cart.total.toFixed(2)}
                </span>
              </div>

              {showCheckout ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Tu nombre completo"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                  <input
                    type="tel"
                    placeholder="Tu número de WhatsApp"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setShowCheckout(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleCheckout}
                      disabled={loading}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors disabled:opacity-50"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{loading ? 'Enviando...' : 'Enviar'}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowCheckout(true)}
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors font-medium"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Comprar por WhatsApp</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}