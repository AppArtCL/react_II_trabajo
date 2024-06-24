import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./views/Home";
import Pizza from "./views/Pizza";
import Carrito from "./views/Carrito";

import PizzaProvider from "./context/PizzaContext";

const App = () => {
	return (
		<PizzaProvider>
			<Header />
			<Routes>
				<Route 
          path="/" 
          element={<Home />} 
        />
				<Route 
          path="/pizza/:id" 
          element={<Pizza />} 
        />
        <Route
          path="/carrito"
          element={<Carrito />}
        />
			</Routes>
		</PizzaProvider>
	);
}

export default App;
