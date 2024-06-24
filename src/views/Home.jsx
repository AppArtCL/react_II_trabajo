import { useState, useEffect, useContext } from "react";
import { Card } from "react-bootstrap";
import { PizzaContext } from "../context/PizzaContext";
import { useNavigate } from "react-router-dom";

export const capitalizarPalabras = (palabra) => {
	return palabra
		.split(" ")
		.map((word) => word[0].toUpperCase() + word.slice(1))
		.join(" ");
}

export const agregaAlCarrito = (carritoActual, idPizza, cantidadNueva) => {
	const pizzaEnCarrito = carritoActual.find((item) => item.id === idPizza);
	if (pizzaEnCarrito) {
		const nuevoCarrito = carritoActual.map((item) =>
			item.id === idPizza ? { ...item, cantidad: item.cantidad + cantidadNueva } : item
		);
		return nuevoCarrito;
	}
	return [...carritoActual, { id: idPizza, cantidad: cantidadNueva }];
}

export const actualizaTotal = (carritoActual, listadoPizzas) => {
	const totalNuevo = carritoActual.reduce((acc, item) => {
		const pizza = listadoPizzas.find((pizza) => pizza.id === item.id);
		return acc + pizza.price * item.cantidad;
	}, 0);
	return totalNuevo;
}

const Home = () => {
    const {pizzas, setPizzas, carrito, setCarrito, total, setTotal} = useContext(PizzaContext);
	const navigate = useNavigate();

	const getPizzas = async () => {
		const response = await fetch("/pizzas.json");
		const data = await response.json();
		setPizzas(data);
	};

    useEffect(() => {
        getPizzas();
    }, []);

 	const irAPizza = (idPizza) => {
		if (idPizza!= "" || idPizza != undefined) {
			navigate(`/pizza/${idPizza}`);
		}
	};

	const agregarPizza = (carro, idPizza, cantidad) => {
		const nuevoCarrito = agregaAlCarrito(carro, idPizza, cantidad);
		setCarrito(nuevoCarrito);
		setTotal(actualizaTotal(nuevoCarrito, pizzas));
		navigate("/carrito");
	};

	return (
		<>
			<div className="hero">
				<img src="/hero.jpg" alt="Foto de pizza." />
				<div className="hero-texts">
					<p className="hero-text">¡Pizzería Mamma Mia!</p>
					<p className="hero-tag">
						¡Tenemos las mejores pizzas que podrás encontrar!
					</p>
					<hr className="hero-line" />
				</div>
			</div>
			<main>
				<section className="pizzas">
					{pizzas.map((pizza) => (
						<Card key={pizza.id} >
							<Card.Img
								variant="top"
								src={`${pizza.img}`}
							/>
							<Card.Body>
								<Card.Title>{capitalizarPalabras(pizza.name)}</Card.Title>
                                <hr />
                                <p className="card-subtitle">Ingredientes:</p>
                                {pizza.ingredients.map((ingredient, index) => (
                                    <p className="ingredientes" key={index}>🍕 {capitalizarPalabras(ingredient)}</p>
                                ))}
							</Card.Body>
                            <Card.Footer>
                                <p className="card-precio">$ {pizza.price.toLocaleString('es-CL')}</p>
                                <div className="card-botones">
                                    <button className="button-ver" onClick={() => irAPizza(pizza.id)}>Ver Más <span className="ojos">👀</span></button>
                                    <button className="button-anadir" onClick={() => agregarPizza(carrito, pizza.id, 1) }>Añadir <span className="carro">🛒</span></button>
                                </div>
                            </Card.Footer>
						</Card>
					))}
				</section>
			</main>
		</>
	);
};

export default Home;
