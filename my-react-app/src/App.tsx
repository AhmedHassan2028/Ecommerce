import { useState } from 'react';
import './App.css'
import NavbarCart from './components/navbar-cart.jsx'
import ProductCard from './components/product-card.tsx'
import { Filters } from './components/filters.jsx'
import CartDrawer from './components/cart-sidebar.tsx'
import CheckoutWizard from './components/checkout.tsx'
import { PRODUCTS } from './products'
import Survey from './components/survey.tsx'

function App() {
  const [tempFilters, setTempFilters] = useState({ categories: [], dietary: [], brands: [] });
  const [appliedFilters, setAppliedFilters] = useState({ categories: [], dietary: [], brands: [] });

  const [surveyOpen, setSurveyOpen] = useState(false);
  //Copilot helped with types
  const [cart, setCart] = useState<{ id: number; qty: number }[]>([]); // we will take an id and quantity for each item to display later
  //for when we open the cart on the
  const [cartOpen, setCartOpen] = useState(false);

  //for when we open the checkout wizard
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const subtotal = cart.reduce((sum, item) => {
    const product = PRODUCTS.find((p) => p.id === item.id);

    if (!product) {
      return sum;
    }

    const price = product.deal ? product.dealPrice : product.price;
    return sum + price * item.qty;
  },0);

  const addToCart = (id: number) => {
    setCart((currentCart) => {
      //checks if that item is already in the cart
      const existingItem = currentCart.find((item) => item.id === id);

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item
        );
      }

      //Take current cart array and make new one with new the new item
      return [...currentCart, { id, qty: 1 }];
    });
  };

  //Then a couple small functions to update cart values

  const changeQty = (id: number, change: number) => {
  setCart((currentCart) =>
    currentCart.map((item) => (item.id === id ? { ...item, qty: item.qty + change } : item)).filter((item) => item.qty > 0) // drops the line if qty hits 0
  );
  };

  const removeFromCart = (id: number) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== id));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      <NavbarCart cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', padding: '20px' }}>
        <div style={{ width: '270px' }}>
          <Filters filters={tempFilters} setFilters={setTempFilters} />
          
          <button
            onClick={() => setAppliedFilters(tempFilters)}
            style={{ marginTop: '12px', padding: '8px 12px', cursor: 'pointer' }}
          >
            Apply
          </button>
        </div>
        <div style={{ flex: 1 }}>
          <ProductCard filters={appliedFilters} onAdd={addToCart} />
        </div>
      </div>
      {/* to open cart */}
      {cartOpen && (
        <CartDrawer
          cart={cart}
          onClose={() => setCartOpen(false)}
          onChangeQty={changeQty}
          onRemove={removeFromCart}
          onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }}
        />
      )}
      {/* to checkout */}
      {checkoutOpen && (
        <CheckoutWizard
          subtotal={subtotal}
          onClose={() => setCheckoutOpen(false)}
          onComplete={() => { setCart([]); setCheckoutOpen(false); }}
          onLeaveFeedback={() => { setCart([]); setCheckoutOpen(false); setSurveyOpen(true); }}
        />
      )}
      {/* to leave feedback */}
      {surveyOpen && (
        <Survey onClose={() => setSurveyOpen(false)} />
      )}
    </>
  )
}

export default App