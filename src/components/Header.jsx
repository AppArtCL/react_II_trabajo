import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { PizzaContext } from "../context/PizzaContext";

const Header = () => {
  const {total} = useContext(PizzaContext);

  return (
    <header>
        <div className='logo-marca'>
          <NavLink to="/">
            <div className='logo'>🍕</div>
          </NavLink>            
          <NavLink to="/">
            <div className='marca'>Pizzería Mamma Mia!</div>
          </NavLink>
        </div>
        <div className='carro-precio'>
          <NavLink to="/carrito" className="link-carro">
            <div className='carro'>🛒</div>
          </NavLink>
            <div className='precio'>$ {total.toLocaleString('es-CL')}</div>
        </div>
    </header>
  )
}

export default Header;