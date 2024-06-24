import { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PizzaContext } from "../context/PizzaContext";
import { capitalizarPalabras, agregaAlCarrito, actualizaTotal} from './Home';
import { Card } from "react-bootstrap";

export const encuentraPizza = (listaPizza, idPizza) => {
	return listaPizza.find(pizza => pizza.id === idPizza);
}

const Pizza = () => {
	const { id } = useParams();
	const { pizzas, carrito, setCarrito, setTotal } = useContext(PizzaContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (pizzas.length == 0) {
			console.log("No hay pizzas");
			navigate("/");
		}
	}, [pizzas, navigate]);

	const pizza = encuentraPizza(pizzas, id);

	const agregarPizza = (carro, idPizza, cantidad) => {
		const nuevoCarrito = agregaAlCarrito(carro, idPizza, cantidad);
		setCarrito(nuevoCarrito);
		setTotal(actualizaTotal(nuevoCarrito, pizzas));
		navigate("/carrito");
	};

	return (
		<>
			<main>
        {pizza ? (
          <section className="pizza-detalle">
            <Card>
              <Card.Body>
                <div className="pizza-detalle-img">
                  <Card.Img src={`${pizza.img}`} className="pizza-img" />
                </div>
                <div className="pizza-detalle-info">
                  <Card.Title>
                    {capitalizarPalabras(pizza.name)}
                  </Card.Title>
                  <hr />
                  <p className="desc">{pizza.desc}</p>
                  <p className="card-subtitle">Ingredientes:</p>
                  {pizza.ingredients.map((ingredient, index) => (
                    <p className="ingredientes" key={index}>
                      🍕 {capitalizarPalabras(ingredient)}
                    </p>
                  ))}
                  <div className="pizza-detalle-precio">
                    <p className="card-precio">
                      Precio: $ {pizza.price.toLocaleString("es-CL")}
                    </p>
                    <button
                      className="button-anadir"
                      onClick={() =>
                        agregarPizza(carrito, pizza.id, 1)
                      }>
                      Añadir <span className="carro">🛒</span>
                    </button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </section>
        ) : (
          <h1>Por favor, ingrese por el Home a nuestra pizzería presionando el botón de abajo.</h1>
        )}
				<button className="volver" onClick={() => navigate("/")}>
					Volver
				</button>
			</main>
		</>
	);
}

export default Pizza;