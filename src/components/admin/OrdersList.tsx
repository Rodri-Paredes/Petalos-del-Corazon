import { useEffect, useState } from 'react';
import { Loader2, AlertCircle, MessageCircle, Calendar, User, Phone } from 'lucide-react';
import { useOrders } from '../../hooks/useOrders';
import { Order } from '../../types';

export function OrdersList() {
  const { getOrders } = useOrders();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [ordersPerPage] = useState<number>(10);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const ordersData = await getOrders();
      setOrders(ordersData || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar órdenes');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      // Lógica para actualizar el estado de la orden en la base de datos
      const updatedOrders = orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Error al cambiar el estado de la orden:', error);
      alert('No se pudo cambiar el estado de la orden.');
    }
  };

  const filteredOrders = orders.filter(order => 
    order.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.order_number.toString().includes(searchQuery)
  );

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-pink-500 mx-auto mb-4" />
            <p className="text-gray-600">Cargando órdenes...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Error al cargar órdenes</p>
            <p className="text-sm text-gray-500">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">
          Lista de Órdenes ({orders.length})
        </h2>
        <input
          type="text"
          placeholder="Buscar órdenes..."
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {orders.length === 0 ? (
        <div className="p-8 text-center">
          <p className="text-gray-600 mb-2">No hay órdenes registradas</p>
          <p className="text-sm text-gray-500">Las órdenes aparecerán aquí cuando los clientes realicen compras</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {paginatedOrders.map((order) => (
            <div key={order.id} className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Información de la orden */}
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-3">
                    <span className="font-mono text-sm font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded">
                      {order.order_number}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      order.status === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : order.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status === 'pending' ? 'Pendiente' : 
                       order.status === 'completed' ? 'Completada' : order.status}
                    </span>
                    {order.whatsapp_sent && (
                      <span className="flex items-center text-green-600 text-sm">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        WhatsApp enviado
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="w-4 h-4 mr-2" />
                      {order.customer_name || 'Sin nombre'}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      {order.customer_phone || 'Sin teléfono'}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(order.created_at).toLocaleString()}
                    </div>
                    <div className="font-semibold text-pink-600">
                      Total: ${order.total_amount.toFixed(2)}
                    </div>
                  </div>

                  {/* Items de la orden */}
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Productos:</h4>
                    <div className="space-y-1">
                      {Array.isArray(order.items) && order.items.map((item: any, index: number) => (
                        <div key={index} className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded">
                          <span className="font-medium">{item.product?.name || 'Producto desconocido'}</span>
                          <span className="text-gray-500"> × {item.quantity}</span>
                          <span className="float-right">${((item.product?.price || 0) * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Cambiar estado de la orden */}
                <div className="mt-4">
                  <label htmlFor="status" className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    Cambiar estado:
                  </label>
                  <select
                    id="status"
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="px-2 py-1 sm:px-3 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-xs sm:text-sm"
                  >
                    <option value="pending">Pendiente</option>
                    <option value="completed">Completada</option>
                    <option value="cancelled">Cancelada</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination controls */}
      <div className="flex justify-between items-center p-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
        >
          Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}