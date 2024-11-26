import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addToCartApi, getProductsApi } from "../../apis/Api";

const Search = () => {
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [cart, setCart] = useState({});

  useEffect(() => {
    getProductsApi().then((res) => {
      console.log("Products fetched:", res.data.products);
      setProducts(res.data.products);
      setSearchResults(res.data.products); 
    });
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();

    // Filter products based on the search query
    const filteredProducts = products.filter((product) =>
      product.productName.toLowerCase().includes(query)
    );

    setSearchResults(filteredProducts);
  };

  const handleAddToCart = (productId) => {
    console.log("Adding to cart:", productId); 
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1,
    }));

    addToCartApi({
      productId: productId,
      quantity: 1,
    })
      .then((res) => {
        console.log("API response:", res); 
        if (res && res.data) {
          toast.success(res.data);
        } else {
          console.error("Unexpected API response format:", res);
        }
      })
      .catch((error) => {
        console.error("Error adding to cart:", error); 
      });
  };

  const handleIncrement = (productId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: prevCart[productId] + 1,
    }));
  };

  const handleDecrement = (productId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: Math.max(prevCart[productId] - 1, 0),
    }));
  };

  const styles = {
    container: {
      marginTop: "80px", 
    },
    input: {
      width: "75%",
    },
    button: {
      backgroundColor: "green",
      color: "white",
      border: "none",
    },
  };

  return (
    <div className="container" style={styles.container}>
      <div className="d-flex justify-content-between">
        <h1>Searching Products!</h1>
        <div className="d-flex flex-row">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            onChange={handleSearchChange}
            style={styles.input}
          />
        </div>
      </div>

      {searchResults.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-4 g-4 mt-3">
          {searchResults.map((product) => (
            <div className="col" key={product._id}>
              <div className="card h-100">
                <img
                  src={`http://localhost:5000/products/${product.productImage}`}
                  className="card-img-top"
                  alt={product.productName}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.productName}</h5>
                  <p className="card-text">NPR {product.productPrice}</p>
                  <button
                    className="btn btn-primary"
                    style={styles.button}
                    onClick={() => handleAddToCart(product._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

export default Search;
