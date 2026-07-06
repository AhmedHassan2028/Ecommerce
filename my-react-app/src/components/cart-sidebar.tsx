import { PRODUCTS } from '../products';

//Copilot helped creating these two types with more details
type CartItem = {
  id: number;
  qty: number;
};

type CartDrawerProps = {
  cart: CartItem[];
  onClose: () => void;
  onChangeQty: (id: number, change: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
};

function CartDrawer({ cart, onClose, onChangeQty, onRemove, onCheckout }: CartDrawerProps) {

    //Claude helped with the logic of this function in the next 15ish lines, this basically makes it easier to show the product name and info in the cart sidebar
  const lines = cart.map((line) => {
    const product = PRODUCTS.find((p) => p.id === line.id);

    if (!product) {
      return { ...line, product: null, price: 0 };
    }

    const price = product.deal ? product.dealPrice : product.price;
    return { ...line, product, price };
  });

  const subtotal = lines.reduce((sum, line) => sum + line.price * line.qty, 0);


  return (
    <>
      {/* Background when shopping cart is opened to look nicer */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.3)',
        }}
      />
      {/* Claude helped the most with this sidebar, it was a bit hard to get the layout and all the correct content to display correctly  */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '360px',
          maxWidth: '90vw',
          background: '#fff',
          zIndex: 50,
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-4px 0 12px rgba(0,0,0,0.15)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, color: '#24331e' }}>Your Cart</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
        </div>

        {lines.length === 0 && <p style={{ color: '#59604d' }}>Your cart is empty.</p>}

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {lines.map((line) => (
            <div key={line.id} style={{ display: 'flex', gap: '12px', marginBottom: '16px', borderBottom: '1px solid #e5e2d8', paddingBottom: '12px' }}>
              <div style={{ fontSize: '1.8rem' }}>{line.product?.emoji ?? '🛒'}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{line.product?.name ?? 'Unknown item'}</div>
                <div style={{ fontSize: '0.8rem', color: '#59604d' }}>${line.price.toFixed(2)} / {line.product?.unit ?? 'item'}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                  <button onClick={() => onChangeQty(line.id, -1)} style={{ width: '24px', cursor: 'pointer' }}>−</button>
                  <span>{line.qty}</span>
                  <button onClick={() => onChangeQty(line.id, 1)} style={{ width: '24px', cursor: 'pointer' }}>+</button>
                  <button onClick={() => onRemove(line.id)} style={{ marginLeft: 'auto', color: '#a33', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem' }}>
                    Remove
                  </button>
                </div>
              </div>
              <div style={{ fontWeight: 700 }}>${(line.price * line.qty).toFixed(2)}</div>
            </div>
          ))}
        </div>

        {lines.length > 0 && (
          <div style={{ borderTop: '1px solid #e5e2d8', paddingTop: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, marginBottom: '12px' }}>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button
              onClick={onCheckout}
              style={{ width: '100%', background: '#224e27', color: '#fff', border: 'none', borderRadius: '4px', padding: '10px', cursor: 'pointer' }}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CartDrawer;