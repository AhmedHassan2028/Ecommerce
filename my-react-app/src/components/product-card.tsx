import { PRODUCTS } from "../products";

//I was getting a type error so this fixes it (help by copilot)
function ProductCard({ filters, onAdd }: { filters: any; onAdd: (id: number) => void }) {
  const visibleProducts = PRODUCTS.filter((product) => {
    //This is here so that whenever no filters we show all the products but if the filter is applied it only shows those items
    const matchesCategory = filters.categories.length === 0 || filters.categories.includes(product.category);
    const matchesDietary = filters.dietary.length === 0 || filters.dietary.every((d: string) => product.dietary.includes(d));
    const matchesBrand = filters.brands.length === 0 || filters.brands.includes(product.brand);

    return matchesCategory && matchesDietary && matchesBrand;
  });

  return (
    
    <div style={{ background: '#ffffff', padding: '24px', minHeight: '100vh' }}>
      <h2 style={{ color: '#10140e', marginBottom: '20px' }}>
        Fresher Food, Better Prices
      </h2>
      <div
        style={{
          display: 'grid',
          //I did this in a previous personal project for the grid layout
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '20px',
        }}
      >
        {/* So we can display each of the products */}
        {visibleProducts.map((p) => (
          <div
            key={p.id}
            style={{
              background: '#ffffff',
              border: '1px solid #c9c5bb',
              borderRadius: '10px',
              padding: '15px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '12px' }}>
                {/* The emoji will be like the image */}
              {p.emoji}
            </div>
            
            <span
              style={{
                fontSize: '0.7rem',
                color: '#5e6454',
                textTransform: 'uppercase',
                marginBottom: '4px',
              }}
            >
              {p.category}
            </span>
            <h3 style={{ fontSize: '1rem', margin: '0 0 6px 0', color: '#24331e' }}>
              {p.name}
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#59604d', margin: '0 0 10px 0' }}>
              {p.note}
            </p>
            {/* Incite to action? only for sale items */}
            {p.deal && (
              <p style={{ color: '#c72525', fontWeight: 700, fontSize: '0.8rem', margin: '0 0 8px 0' }}>
                On sale, grab it before it's gone!
              </p>
            )}
            <div
              style={{
                marginTop: 'auto',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
             {/* IF theres a deal show it if not show regular price */}
              <span style={{ fontWeight: 700, color: '#254e2a' }}>
                ${p.deal ? p.dealPrice : p.price}/{p.unit}
              </span>
              <button
                onClick={() => onAdd(p.id)}
                style={{
                  background: '#224e27',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '6px 12px',
                  cursor: 'pointer',
                }}
              >
                {/* We want that once the button is clicked add it to cart (later) */}
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductCard;
