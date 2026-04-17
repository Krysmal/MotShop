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
  const [view, setView] = useState("shop"); // 🔥 NOWY STAN

  const categories = ["Wszystkie", ...new Set(productsData.map(p => p.category))];

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

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "Arial" }}>

      {/* HEADER */}
      <header style={{ padding: "20px", background: "linear-gradient(135deg, #1f2937, #111827)", color: "white" }}>
        <h1 style={{ margin: 10 }}>🚗 AutoParts Pro</h1>
        <p style={{ opacity: 0.8, marginTop: 10 }}>Profesjonalne części samochodowe w najlepszych cenach</p>

        <div style={{ marginTop: "15px", display: "flex", gap: "10px", flexWrap: "wrap" }}>

          {/* O NAS */}
          <button
            onClick={() => setView("about")}
            style={{
              padding: "8px 14px",
              borderRadius: "20px",
              border: "none",
              cursor: "pointer",
              background: view === "about" ? "#2563eb" : "#374151",
              color: "white"
            }}
          >
            O nas
          </button>

          {/* KATEGORIE */}
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                setView("shop");
              }}
              style={{
                padding: "8px 14px",
                borderRadius: "20px",
                border: "none",
                cursor: "pointer",
                background: category === cat && view === "shop" ? "#2563eb" : "#374151",
                color: "white"
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* CONTENT */}
      <main style={{ flex: 1, padding: "20px", justifyContent:"center" }}>

        {view === "about" ? (
          <div style={{ }}>
            <h2>O nas</h2>
            <p>
              AutoParts Pro to dynamicznie rozwijająca się firma z branży motoryzacyjnej,
              działająca na rynku od 2015 roku. Specjalizujemy się w sprzedaży wysokiej jakości
              części samochodowych dla klientów indywidualnych oraz warsztatów.
            </p>

            <p>
              Naszą misją jest dostarczanie sprawdzonych produktów w konkurencyjnych cenach
              oraz zapewnienie szybkiej i profesjonalnej obsługi.
            </p>

            <p>
              Współpracujemy z renomowanymi producentami, dzięki czemu masz pewność,
              że kupujesz części, które naprawdę działają.
            </p>

            <h3>Dlaczego my?</h3>
            <ul>
              <li>✔ Ponad 10 000 zadowolonych klientów</li>
              <li>✔ Szybka realizacja zamówień</li>
              <li>✔ Fachowe doradztwo</li>
              <li>✔ Sprawdzeni dostawcy</li>
            </ul>
          </div>
        ) : (
          <>
            {/* BANER */}
            <div style={{ marginBottom: "30px", padding: "20px", borderRadius: "12px", background: "#f3f4f6" }}>
              <h2 style={{ color: "grey" }}>🔥 Promocje tygodnia</h2>
              <p>Sprawdź najlepsze oferty na części samochodowe – nawet do -30%!</p>
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
            <h2>🛒 Produkty</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginTop: "10px" }}>
              {filteredProducts.map((product) => (
                <div key={product.id} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "10px", background: "white" }}>
                  <h3>{product.name}</h3>
                  <p>Kategoria: {product.category}</p>
                  <p><strong>{product.price} zł</strong></p>
                  <button onClick={() => addToCart(product)}>Dodaj do koszyka</button>
                </div>
              ))}
            </div>

            {/* ZALETY */}
            <div style={{ marginTop: "40px", padding: "20px", background: "#f9fafb", borderRadius: "12px" }}>
              <h2 style={{ color: "grey" }}>Dlaczego warto u nas kupować?</h2>
              <ul>
                <li>✔ Szybka wysyłka (24h)</li>
                <li>✔ Gwarancja jakości</li>
                <li>✔ Zwrot do 14 dni</li>
                <li>✔ Pomoc techniczna</li>
              </ul>
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
                      <button onClick={() => removeFromCart(item.id)} style={{ marginLeft: "10px" }}>
                        Usuń
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <p><strong>Suma: {total} zł</strong></p>
            </div>
          </>
        )}

      </main>

      {/* FOOTER */}
      <footer style={{ padding: "20px", background: "#111827", color: "#cfd0d3" }}>
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
          © {new Date().getFullYear()} AutoParts Pro
        </div>
      </footer>

    </div>
  );
}
