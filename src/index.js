import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './contexts/authContext';
import { CartProvider } from './contexts/CartContext';
import { ProductsProvider } from './contexts/ProductsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <ProductsProvider>
            <AuthProvider>
                <CartProvider>
                    <App />
                </CartProvider>
            </AuthProvider>
        </ProductsProvider>
    </BrowserRouter>

);