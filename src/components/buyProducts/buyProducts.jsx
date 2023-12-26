import React, { useState, useEffect } from 'react';
import useQueryData from '../../customHooks/useQueryData';
import Loader from '../loader-error/loader';
import Error from '../loader-error/error';
import style from './buyProducts.module.css';

const localStorageKey = 'cartShop';

function BuyProducts() {
  const product = useQueryData('https://api.escuelajs.co/api/v1/products');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(cart));
  }, [cart]);

  const uniqueCategories = Array.from(new Set(product.data.map((item) => item.category.id)));

  const filteredProducts = product.data.filter((item) => {
    return categoryFilter === 'all' || item.category.id === parseInt(categoryFilter);
  });

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }

    setTotalPrice((prevTotal) => prevTotal + item.price);
  };

  const removeFromCart = (itemId) => {
    const removedItem = cart.find((item) => item.id === itemId);

    if (removedItem) {
      const updatedCart = cart.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
      );

      const filteredCart = updatedCart.filter((item) => item.quantity > 0);
      setCart(filteredCart);

      if (removedItem.quantity === 1) {
        setTotalPrice((prevTotal) => prevTotal - removedItem.price);
      } else {
        setTotalPrice((prevTotal) => prevTotal - removedItem.price);
      }
    }
  };

  const calculateSubtotal = () => {
    return totalPrice;
  };

  if (product.status === 'pending') {
    return <Loader />;
  }

  if (product.status === 'error' || product.data.length <= 0) {
    return <Error />;
  }

  return (
    <div className={style.container}>
      <div className={style.box}>
        <div className={style.submenu}>
          <div className={style.filterContainer}>
            <label>
              Filtrar por Categoría:
              <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                <option value="all">Todo</option>
                {uniqueCategories.map((categoryId) => (
                  <option key={categoryId} value={categoryId}>
                    {product.data.find((item) => item.category.id === categoryId)?.category.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className={style.cart}>
            <h5>Carrito de Compras</h5>
            <ul>
              {cart.map((cartItem) => (
                <li key={cartItem.id}>
                  <div className={style.item}>
                    <p>{cartItem.title} - Cantidad: {cartItem.quantity}</p>
                  </div>
                  <div className={style.price}>
                    <span>${cartItem.price * cartItem.quantity}</span>
                    <button className='btn btn-danger' onClick={() => removeFromCart(cartItem.id)}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>
            <div>
              <strong>Subtotal:</strong> ${calculateSubtotal()}
            </div>
          </div>
        </div>

        <ul className="list-group">
          {filteredProducts.map((item) => (
            <li key={item.id} className="list-group-item">
              <div className="row">
                <div className="col-md-3">
                  <div id={`carousel-${item.id}`} className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                      {item.images.map((image, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                          <img src={image} className="d-block w-100" alt={`${item.title} - ${index + 1}`} />
                        </div>
                      ))}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target={`#carousel-${item.id}`} data-bs-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target={`#carousel-${item.id}`} data-bs-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>
                <div className="col-md-9">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.description}</p>
                  <p className="card-text">Price: ${item.price}</p>
                  <button className="btn btn-primary" onClick={() => addToCart(item)}>
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BuyProducts;
