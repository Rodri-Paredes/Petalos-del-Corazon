import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { CartItem } from '../types';

interface CreateOrderData {
  customerName: string;
  customerPhone: string;
  items: CartItem[];
  totalAmount: number;
}

export function useOrders() {
  const [loading, setLoading] = useState(false);

  const createOrder = async (orderData: CreateOrderData) => {
    try {
      setLoading(true);
      
      // Generar número de orden único
      const { data: orderNumber, error: funcError } = await supabase
        .rpc('generate_order_number');

      if (funcError) throw funcError;

      const { data, error } = await supabase
        .from('orders')
        .insert([{
          order_number: orderNumber,
          customer_name: orderData.customerName,
          customer_phone: orderData.customerPhone,
          items: orderData.items,
          total_amount: orderData.totalAmount,
          status: 'pending'
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Error al crear orden');
    } finally {
      setLoading(false);
    }
  };

  const getOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Error al obtener órdenes');
    }
  };

  return {
    loading,
    createOrder,
    getOrders
  };
}