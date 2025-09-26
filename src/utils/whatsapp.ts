import { CartItem } from '../types';

export function generateWhatsAppMessage(
  customerName: string,
  items: CartItem[],
  total: number,
  orderNumber?: string
): string {
  const greeting = `¡Hola! Soy ${customerName} y me gustaría realizar este pedido desde *Pétalos del Corazón*:\n\n`;
  
  const orderInfo = orderNumber ? `📋 *Orden:* ${orderNumber}\n\n` : '';
  
  const itemsList = items
    .map(item => 
      `🌸 *${item.product.name}*\n` +
      `   • Cantidad: ${item.quantity}\n` +
      `   • Precio unitario: $${item.product.price.toFixed(2)}\n` +
      `   • Subtotal: $${(item.product.price * item.quantity).toFixed(2)}\n`
    )
    .join('\n');

  const totalInfo = `\n💰 *Total: $${total.toFixed(2)}*\n\n`;
  
  const footer = `Por favor, confirmen la disponibilidad y el tiempo de entrega. ¡Gracias! 😊`;

  return greeting + orderInfo + itemsList + totalInfo + footer;
}

export function sendWhatsAppMessage(phoneNumber: string, message: string) {
  // Limpiar el número de teléfono (quitar espacios, guiones, etc.)
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  
  // Codificar el mensaje para URL
  const encodedMessage = encodeURIComponent(message);
  
  // Crear la URL de WhatsApp
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
  
  // Abrir WhatsApp en una nueva ventana
  window.open(whatsappUrl, '_blank');
}