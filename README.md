# BlackMagic Restaurant Ordering System

A comprehensive QR-based restaurant ordering system with three main applications: Customer Ordering App, Kitchen Display System, and Admin Management Dashboard.

## Features

### Customer Ordering App (Mobile-First PWA)
- QR code scanning and manual table entry
- Browse menu with categories and filters
- Search functionality
- Add items to cart with quantity selector
- Special instructions per item
- Order placement and tracking
- Real-time order status updates

### Kitchen Display System
- Real-time order queue display
- Orders categorized by status (New, Preparing, Ready)
- Time tracking for each order
- Special instructions highlighting
- Quick action buttons for status updates

### Admin Management Dashboard
- Daily analytics overview
- Order management
- Menu management
- Table management
- User management
- Revenue tracking

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Build Tool**: Vite

## Design System

### Colors
- **Primary**: Black (#000000)
- **Secondary**: Orange (#FF6B35)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)
- **Veg**: Green (#059669)
- **Non-Veg**: Red (#DC2626)

### Typography
- **Primary Font**: Inter
- **Heading Font**: Poppins

## Project Structure

```
src/
├── components/
│   ├── common/          # Reusable components (Button, Input, Card)
│   ├── customer/        # Customer-specific components
│   ├── kitchen/         # Kitchen-specific components
│   └── admin/           # Admin-specific components
├── pages/
│   ├── customer/        # Customer app pages
│   ├── kitchen/         # Kitchen display pages
│   └── admin/           # Admin dashboard pages
├── services/            # API service layers
├── stores/              # Zustand state stores
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
└── hooks/               # Custom React hooks
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file:
```bash
cp .env.example .env
```

3. Configure the API URL in `.env`:
```
VITE_API_URL=http://localhost:8080
```

### Development

Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Build for production:
```bash
npm run build
```

### Routes

#### Customer App
- `/` - Landing page (QR scan/table entry)
- `/menu` - Browse menu
- `/cart` - Cart and checkout

#### Admin Dashboard
- `/admin/login` - Admin login
- `/admin/dashboard` - Dashboard overview
- `/admin/orders` - Order management
- `/admin/menu` - Menu management
- `/admin/tables` - Table management

#### Kitchen Display
- `/kitchen` - Kitchen display system

## API Integration

The application expects a backend API with the following endpoints:

### Customer Endpoints
- `POST /api/customer/session/start` - Start session
- `GET /api/customer/menu` - Get menu
- `POST /api/customer/orders` - Create order
- `GET /api/customer/session/{sessionCode}/orders` - Get orders
- `POST /api/customer/payments/initiate` - Initiate payment
- `POST /api/customer/payments/verify` - Verify payment

### Admin Endpoints
- `POST /api/admin/login` - Admin login
- `GET /api/admin/analytics/daily/{date}` - Get daily analytics
- `GET /api/admin/orders` - Get orders
- `GET /api/admin/tables` - Get tables
- `POST /api/admin/tables` - Create table
- `GET /api/admin/users` - Get users

## State Management

### Cart Store
Manages shopping cart state with actions for:
- Adding items
- Removing items
- Updating quantities
- Clearing cart
- Calculating total

### Auth Store
Manages authentication state with actions for:
- Login
- Logout
- Check authentication status

## Security

- JWT token-based authentication for admin routes
- Protected routes using React Router
- Automatic token refresh
- Secure API client with interceptors

## Performance

- Code splitting with React.lazy
- Optimized images
- Debounced search
- Efficient re-renders with Zustand

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.
