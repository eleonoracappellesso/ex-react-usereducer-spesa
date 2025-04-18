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
    if (isAlreadyInCart) {
      updateProductQuantity(product.name);
    } else {
      setAddedProducts([...addedProducts, { ...product, quantity: 1 }]);
    }
  };

  const updateProductQuantity = (productName) => {
    setAddedProducts(prev =>
      prev.map(p =>
        p.name === productName ? { ...p, quantity: p.quantity + 1 } : p
      )
    );
  };

  const removeFromCart = (productName) => {
    setAddedProducts(prev => prev.filter(p => p.name !== productName));
  };

  const calculateTotal = () => {
    return addedProducts.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0).toFixed(2);
  };

  return (
    <>

      <h1>Lista della spesa</h1>
      <h2>Lista prodotti disponibili:</h2>
      <div>
        <ul>
          {products.map((product, index) => (
            <li key={index}>
              <strong>{product.name}</strong>: <span>€{product.price.toFixed(2)}</span>
              <button className="addBtn" onClick={() => addToCart(product)}>
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
                <strong>{product.name}</strong>: <span>€{product.price.toFixed(2)}</span> × {product.quantity}
                <button className="removeBtn" onClick={() => removeFromCart(product.name)}>
                  Rimuovi dal carrello
                </button>
              </li>
            ))}
          </ul>
          <h3>Totale: €{calculateTotal()}</h3>
        </div>
      )}

    </>
  );
}

export default App
