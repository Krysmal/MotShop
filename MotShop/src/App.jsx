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
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "Arial" }}>
      
      <div style={{ marginBottom: "30px", padding: "20px", borderRadius: "16px", background: "linear-gradient(135deg, #1f2937, #111827)", color: "white", boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}>
        <h1 style={{ margin: 0, fontSize: "32px" }}>🚗 AutoParts Pro</h1>
        <p style={{ marginTop: "8px", opacity: 0.8 }}>
          Profesjonalne części samochodowe w najlepszych cenach
        </p>

        {/* KATEGORIE W NAGŁÓWKU */}
        <div style={{ marginTop: "15px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                padding: "8px 14px",
                borderRadius: "20px",
                border: "none",
                cursor: "pointer",
                background: category === cat ? "#2563eb" : "#374151",
                color: "white",
                fontSize: "14px"
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

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
          {/* STOPKA */}
      <footer style={{ marginTop: "40px", padding: "20px", background: "#111827", color: "#e5e7eb", borderRadius: "12px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          <div>
            <h3>AutoParts Pro</h3>
            <p>Twój zaufany dostawca części samochodowych od 2015 roku.</p>
          </div>

          <div>
            <h4>Kontakt</h4>
            <p>Email: kontakt@autopartspro.pl</p>
            <p>Tel: +48 512 345 678</p>
          </div>

          <div>
            <h4>Adres</h4>
            <p>ul. Krakowska 12</p>
            <p>32-800 Brzesko</p>
            <p>Polska</p>
          </div>
        </div>

        <div style={{ marginTop: "20px", textAlign: "center", fontSize: "14px", opacity: 0.7 }}>
          © {new Date().getFullYear()} AutoParts Pro. Wszelkie prawa zastrzeżone.
        </div>
      </footer>
      </div>
    );
}
