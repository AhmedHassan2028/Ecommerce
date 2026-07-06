import { PRODUCTS } from '../products.js';

const CATEGORIES = [...new Set(PRODUCTS.map((p) => p.category))];
// I had to use flatMap to break up the arrays into one big array
const DIETARY_TAGS = [...new Set(PRODUCTS.flatMap((p) => p.dietary))];

const BRANDS = [...new Set(PRODUCTS.map((p) => p.brand))];

export function Filters({ filters, setFilters }) {
    //Claude helped with this toggle function to add or remove filters from the list
    const toggle = (key, value) => {
    setFilters((f) => {
      const list = f[key];
      const next = list.includes(value)
        ? list.filter((v) => v !== value)
        : [...list, value];
      return { ...f, [key]: next };
    });
  };

  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid #dcdfbb',
        borderRadius: '10px',
        padding: '16px',
        marginTop: '83px',
      }}
    >
      <h3 style={{ fontSize: '1rem', marginBottom: '15px', color: '#25361f' }}>
        Narrow your search
      </h3>

      {/* Claude helped with this div to make the category filter, based off what I learned I could make the other filters */}
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#5c6253' }}>
          Aisle
        </h4>
        {CATEGORIES.map((c) => (
          <label key={c} style={{ display: 'block', fontSize: '1rem', margin: '6px 0' }}>
            <input
              type="checkbox"
              checked={filters.categories.includes(c)}
              onChange={() => toggle('categories', c)}
              style={{ marginRight: '8px' }}
            />
            {c}
          </label>
        ))}
      </div>

    {/* filtering for dietary and brand up next */}
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#5c6253' }}>
          Dietary
        </h4>
        {DIETARY_TAGS.map((d) => (
          <label key={d} style={{ display: 'block', fontSize: '1rem', margin: '6px 0' }}>
            <input
              type="checkbox"
              checked={filters.dietary.includes(d)}
              onChange={() => toggle('dietary', d)}
              style={{ marginRight: '8px' }}
            />
            {d}
          </label>
        ))}
      </div>

      <div>
        <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#5c6253' }}>
          Brand
        </h4>
        {BRANDS.map((b) => (
          <label key={b} style={{ display: 'block', fontSize: '1rem', margin: '6px 0' }}>
            <input
              type="checkbox"
              checked={filters.brands.includes(b)}
              onChange={() => toggle('brands', b)}
              style={{ marginRight: '8px' }}
            />
            {b}
          </label>
        ))}
      </div>
    </div>
  );
}