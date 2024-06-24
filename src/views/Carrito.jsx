import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PizzaContext } from "../context/PizzaContext";
import { capitalizarPalabras, actualizaTotal } from "./Home";
import { encuentraPizza } from "./Pizza";

const Carrito = () => {
	const { pizzas, carrito, setCarrito, total, setTotal } = useContext(PizzaContext);
	const navigate = useNavigate();

    const aumentarCantidad = (idPizza) => {
        const nuevoCarrito = carrito.map((item) =>
            item.id === idPizza ? { ...item, cantidad: item.cantidad + 1 } : item
        );
        setCarrito(nuevoCarrito);
        setTotal(actualizaTotal(nuevoCarrito, pizzas));
    }

    const disminuirCantidad = (idPizza) => {
        const cantidadActual = carrito.find((item) => item.id === idPizza).cantidad;
        let nuevoCarrito = [];

        if (cantidadActual > 1) {
            nuevoCarrito = carrito.map((item) =>
                item.id === idPizza ? { ...item, cantidad: item.cantidad - 1 } : item
            );
        } else {
            nuevoCarrito = carrito.filter((item) => item.id !== idPizza);
        }
        setCarrito(nuevoCarrito);
        setTotal(actualizaTotal(nuevoCarrito, pizzas));
    }

	return (
		<>
			<main>
                <section className="carrito">
                    <div className="cuadro-detalle">
                        <h5>Detalles del pedido:</h5>
                        <div className="cuadro-detalle-unitario">
                            {carrito.map((item) => {
                                const pizza = encuentraPizza(pizzas, item.id);
                                return (
                                    <div className="detalle-unitario" key={item.id} >
                                        <div className="unitario-pizza" key={item.id} >
                                            <div className="img-nombre">
                                                <img src={pizza.img} alt="Foto pizza" />
                                                <p className="nombre-carrito">{capitalizarPalabras(pizza.name)}</p>
                                            </div>
                                            <div className="precio-cantidad">
                                                <p className="precio-carrito">${pizza.price.toLocaleString('es-CL')}</p>
                                                <button disabled={item.cantidad === 0} className="boton-disminuir" onClick={() => disminuirCantidad(pizza.id)}>-</button>
                                                <p className="cantidad-carrito">{item.cantidad}</p>
                                                <button className="boton-aumentar" onClick={() => aumentarCantidad(pizza.id)}>+</button>
                                            </div>  
                                        </div>
                                        <hr />
                                    </div>    
                                );
                            })}
                            <div className="total-carrito">
                                <p className="precio-total">Total: ${total.toLocaleString('es-CL')}</p>
                                <button disabled={total === 0} className="pagar" onClick={() => alert("Pago con Tarjeta")}>Ir a Pagar</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className="volver" onClick={() => navigate("/")}>Seguir comprando</button>
                    </div>
                </section>
            </main>
		</>
	);
};

export default Carrito;
