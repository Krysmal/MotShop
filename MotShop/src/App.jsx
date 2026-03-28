import { useState } from "react";

const productsData = [
  { id: 1, name: "Filtr oleju", price: 30 },
  { id: 2, name: "Klocki hamulcowe", price: 120 },
  { id: 3, name: "Akumulator", price: 350 },
  { id: 4, name: "Świeca zapłonowa", price: 25 },
];

export default function CarPartsShop() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Sklep z częściami samochodowymi</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {productsData.map((product) => (
          <div key={product.id} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "10px" }}>
            <h2>{product.name}</h2>
            <p>Cena: {product.price} zł</p>
            <button onClick={() => addToCart(product)}>Dodaj do koszyka</button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "30px" }}>
        <h2>Koszyk</h2>
        {cart.length === 0 ? (
          <p>Brak produktów w koszyku</p>
        ) : (
          <ul>
            {cart.map((item, index) => (
              <li key={index}>{item.name} - {item.price} zł</li>
            ))}
          </ul>
        )}
        <p><strong>Suma: {total} zł</strong></p>
      </div>
    </div>
  );
}
