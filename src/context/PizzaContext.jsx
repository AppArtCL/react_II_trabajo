import { createContext, useState } from "react";

export const PizzaContext = createContext();

const PizzaProvider = ({ children }) => {
   
  const [pizzas, setPizzas] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);

  return (
    <PizzaContext.Provider value={{ pizzas, setPizzas, carrito, setCarrito, total, setTotal }}>
      {children}
    </PizzaContext.Provider>
  );
};

export default PizzaProvider;