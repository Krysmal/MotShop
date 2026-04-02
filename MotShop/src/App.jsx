import { useState } from "react";

const productsData = [
  { id: 1, name: "Filtr oleju", price: 30, category: "Silnik" },
  { id: 2, name: "Klocki hamulcowe", price: 120, category: "Hamulce" },
  { id: 3, name: "Akumulator", price: 350, category: "Elektryka" },
  { id: 4, name: "Świeca zapłonowa", price: 25, category: "Silnik" },
  { id: 5, name: "Olej silnikowy 5W-30", price: 150, category: "Płyny" },
  { id: 6, name: "Płyn hamulcowy", price: 40, category: "Płyny" },
];

export default function CarPartsShop() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Wszystkie");

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const filteredProducts = productsData.filter((product) => {
    return (
      (category === "Wszystkie" || product.category === category) &&
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const categories = ["Wszystkie", ...new Set(productsData.map(p => p.category))];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Sklep z częściami samochodowymi</h1>

      {/* FILTRY */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Szukaj części..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: "8px" }}
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* PRODUKTY */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <h2>{product.name}</h2>
            <p>Kategoria: {product.category}</p>
            <p>Cena: {product.price} zł</p>
            <button onClick={() => addToCart(product)}>
              Dodaj do koszyka
            </button>
          </div>
        ))}
      </div>

      {/* KOSZYK */}
      <div style={{ marginTop: "30px" }}>
        <h2>Koszyk</h2>
        {cart.length === 0 ? (
          <p>Brak produktów w koszyku</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} x{item.quantity} - {item.price * item.quantity} zł
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Usuń
                </button>
              </li>
            ))}
          </ul>
        )}
        <p>
          <strong>Suma: {total} zł</strong>
        </p>
      </div>
    </div>
  );
}
