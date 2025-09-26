# Pétalos del Corazón - Tienda de Flores Online

Una hermosa tienda en línea para venta de flores y arreglos florales, desarrollada con React, Vite y Supabase.

## 🌸 Características

### Frontend
- **Catálogo de productos** con imágenes, descripciones y precios
- **Carrito de compras** funcional con agregar/eliminar productos
- **Integración con WhatsApp** para realizar pedidos
- **Diseño responsive** y moderno
- **Animaciones sutiles** y micro-interacciones

### Backend (Supabase)
- **Base de datos** con tablas para productos y órdenes
- **Autenticación** para panel administrativo
- **Storage** para imágenes de productos
- **Row Level Security** para protección de datos

### Panel Administrativo
- **Gestión completa de productos** (CRUD)
- **Subida de imágenes** automática
- **Vista de órdenes** realizadas
- **Autenticación segura**

## 🚀 Instalación y Configuración

### 1. Clonar e instalar dependencias
```bash
npm install
```

### 2. Configurar Supabase
1. Crea una cuenta en [Supabase](https://supabase.com)
2. Crea un nuevo proyecto
3. Ve a Settings → API para obtener tu URL y Anon Key
4. Crea un archivo `.env` basado en `.env.example`:
```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_anonima
```

### 3. Configurar la base de datos
Las migraciones se aplicarán automáticamente. Las tablas incluyen:
- `products`: Productos de la tienda
- `orders`: Órdenes realizadas por los clientes

### 4. Configurar Storage
1. Ve a Storage en tu dashboard de Supabase
2. Crea un bucket llamado `product-images`
3. Configúralo como público

### 5. Configurar autenticación
1. Ve a Authentication → Settings
2. Desactiva "Email confirmations" si deseas login inmediato
3. Crea un usuario administrador desde el dashboard

### 6. Configurar WhatsApp
Edita el archivo `src/components/Cart.tsx` y cambia la constante:
```javascript
const WHATSAPP_NUMBER = '+591XXXXXXXXX'; // Tu número de WhatsApp
```

## 🏃‍♀️ Ejecutar el proyecto

```bash
npm run dev
```

Visita `http://localhost:5173` para ver la tienda.

## 📱 Funcionalidades Principales

### Para Clientes
- Navegar catálogo de productos
- Agregar productos al carrito
- Modificar cantidades
- Realizar pedido por WhatsApp con formato profesional

### Para Administradores
- Iniciar sesión en `/admin`
- Agregar nuevos productos
- Editar productos existentes
- Subir imágenes de productos
- Ver historial de órdenes

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Iconos**: Lucide React
- **Estado**: Context API

## 📂 Estructura del Proyecto

```
src/
├── components/           # Componentes de UI
│   ├── admin/           # Componentes del panel admin
│   ├── Cart.tsx         # Carrito de compras
│   ├── Header.tsx       # Encabezado principal
│   ├── ProductCard.tsx  # Tarjeta de producto
│   └── ProductGrid.tsx  # Grilla de productos
├── contexts/            # Contextos de React
│   ├── AuthContext.tsx  # Manejo de autenticación
│   └── CartContext.tsx  # Manejo del carrito
├── hooks/               # Hooks personalizados
│   ├── useProducts.ts   # CRUD de productos
│   └── useOrders.ts     # Gestión de órdenes
├── lib/                 # Configuración de librerías
│   └── supabase.ts     # Cliente de Supabase
├── types/              # Definiciones de TypeScript
│   └── index.ts        # Interfaces y tipos
├── utils/              # Utilidades
│   └── whatsapp.ts     # Integración con WhatsApp
└── App.tsx             # Componente principal
```

## 🔧 Personalización

### Colores
Los colores principales están definidos en Tailwind CSS:
- Rosa principal: `pink-500` (#EC4899)
- Rosa claro: `pink-100` (#FCE7F3)
- Verde: `green-500` (#10B981)

### WhatsApp
Puedes personalizar el mensaje de WhatsApp editando la función `generateWhatsAppMessage` en `src/utils/whatsapp.ts`.

### Imágenes por defecto
Si no se sube imagen para un producto, se usa una imagen de Pexels como placeholder.

## 🚀 Deployment

### Preparar para producción
```bash
npm run build
```

### Variables de entorno en producción
Asegúrate de configurar las variables de entorno en tu plataforma de hosting:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 📞 Soporte

Si tienes alguna pregunta o necesitas ayuda con la configuración, no dudes en abrir un issue o contactarnos.

---

**Desarrollado con 💖 para compartir la belleza de las flores**