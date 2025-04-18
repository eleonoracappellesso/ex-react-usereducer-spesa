import { useState } from "react";

function App() {

  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  const [addedProducts, setAddedProducts] = useState([]);

  const addToCart = (product) => {
    const isAlreadyInCart = addedProducts.find(p => p.name === product.name);
    if (!isAlreadyInCart) {
      setAddedProducts([...addedProducts, { ...product, quantity: 1 }]);
    }
  };

  return (
    <>

      <h1>Lista della spesa</h1>
      <h2>Lista prodotti disponibili:</h2>
      <div>
        <ul>
          {products.map((product, index) => (
            <li key={index} style={{ marginBottom: '8px' }}>
              <strong>{product.name}</strong>: <span>€{product.price.toFixed(2)}</span>
              <button onClick={() => addToCart(product)}>
                Aggiungi al carrello
              </button>
            </li>
          ))}
        </ul>
      </div>

      {addedProducts.length > 0 && (
        <div>
          <h2>Prodotti nel carrello:</h2>
          <ul>
            {addedProducts.map((product, index) => (
              <li key={index}>
                {product.name} - €{product.price.toFixed(2)} × {product.quantity}
              </li>
            ))}
          </ul>
        </div>
      )}

    </>
  );
}

export default App
