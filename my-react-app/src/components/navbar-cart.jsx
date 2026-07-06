function ColorSchemesExample({ cartCount = 0, onOpenCart }) {
  return (
    <nav
      style={{
        background: '#2f6636',
        color: '#fff',
        padding: '12px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        boxSizing: 'border-box',
        margin: 0,
      }}
    >
      <a
        href="#home"
        style={{
          color: '#ffffff',
          textDecoration: 'none',
          fontWeight: 700,
          fontSize: '1.4rem',
        }}
      >
        Fresh First Grocery
      </a>
      <button
        type="button"
        onClick={onOpenCart}
        style={{
          background: 'transparent',
          color: '#ffffff',
          border: '1px solid white',
          borderRadius: '3px',
          padding: '6px 12px',
          cursor: 'pointer',
        }}
      >
        Cart ({cartCount})
      </button>
    </nav>
  );
}

export default ColorSchemesExample;