import { useReducer } from "react";

const initialState = [];

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.find(p => p.name === action.payload.name);
      if (existingItem) {
        // Se già presente, aumentiamo la quantità
        return state.map(p =>
          p.name === action.payload.name
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      } else {
        // Altrimenti aggiungiamo nuovo prodotto
        return [...state, { ...action.payload, quantity: 1 }];
      }
    }

    case 'REMOVE_ITEM':
      return state.filter(p => p.name !== action.payload.name);

    case 'UPDATE_QUANTITY': {
      const newQuantity = parseInt(action.payload.quantity);
      if (isNaN(newQuantity) || newQuantity < 1) return state;

      return state.map(p =>
        p.name === action.payload.name
          ? { ...p, quantity: newQuantity }
          : p
      );
    }

    default:
      return state;
  }
}

function App() {

  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  const [cart, dispatch] = useReducer(cartReducer, initialState);

  const handleAddToCart = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const handleRemoveFromCart = (name) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { name } });
  };

  const handleQuantityChange = (name, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { name, quantity } });
  };

  const calculateTotal = () =>
    cart
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);


  return (
    <>

      <h1>Lista della spesa</h1>
      <h2>Lista prodotti disponibili:</h2>
      <div>
        <ul>
          {products.map((product, index) => (
            <li key={index}>
              <strong>{product.name}</strong>: <span>€{product.price.toFixed(2)}</span>
              <button className="addBtn" onClick={() => handleAddToCart(product)}>
                Aggiungi al carrello
              </button>
            </li>
          ))}
        </ul>
      </div>

      {cart.length > 0 && (
        <div>
          <h2>Prodotti nel carrello:</h2>
          <ul>
            {cart.map((product, index) => (
              <li key={index}>
                <strong>{product.name}</strong>: <span>€{product.price.toFixed(2)}</span> ×
                <input
                  type="number"
                  min='1'
                  step='1'
                  value={product.quantity}
                  onChange={(e) => handleQuantityChange(product.name, e.target.value)}
                />
                <button className="removeBtn" onClick={() => handleRemoveFromCart(product.name)}>
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





