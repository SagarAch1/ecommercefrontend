import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteProduct, getProductsApi } from "../../apis/Api";

const New = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Product");
  };

  // State for all fetched products
  const [products, setProducts] = useState([]); // array

  // Call API initially (Page Load) - Set all fetched products to state
  useEffect(() => {
    getProductsApi()
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Function to handle delete operation
  const handleDelete = (id) => {
    const confirmDialog = window.confirm("Are you sure you want to delete?");
    if (confirmDialog) {
      deleteProduct(id)
        .then((res) => {
          if (res.status === 201) {
            toast.success(res.data.message);
            // Reload products after deletion
            setProducts(products.filter((product) => product._id !== id));
          }
        })
        .catch((error) => {
          if (error.response.status === 500) {
            toast.error(error.response.data.message);
          }
        });
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ textAlign: "right" }}>
        <button
          onClick={handleClick}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            marginTop: "40px",
            marginLeft: "20px",
            borderRadius: "8px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          New Product
        </button>
      </div>

      <table
        className="table mt-2"
        style={{
          marginTop: "20px",
          width: "100%",
          borderCollapse: "collapse",
          borderSpacing: "0",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          overflow: "hidden",
          border: "1px solid black",
        }}
      >
        <thead
          className="table-primary"
          style={{ backgroundColor: "#343a40", color: "black" }}
        >
          <tr>
            <th style={tableHeaderStyle}>Product Image</th>
            <th style={tableHeaderStyle}>Product Name</th>
            <th style={tableHeaderStyle}>Product Price</th>
            <th style={tableHeaderStyle}>Category</th>
            <th style={tableHeaderStyle}>Description</th>
            <th style={tableHeaderStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((singleProduct) => (
            <tr key={singleProduct._id}>
              <td>
                <img
                  width={"40px"}
                  height={"40px"}
                  src={`http://localhost:5000/products/${singleProduct.productImage}`}
                  alt=""
                />
              </td>
              <td>{singleProduct.productName}</td>
              <td>{singleProduct.productPrice}</td>
              <td>{singleProduct.productCategory}</td>
              <td>{singleProduct.productDescription}</td>
              <td>
                <Link
                  to={`/admin/update/${singleProduct._id}`}
                  className="btn btn-primary"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(singleProduct._id)}
                  className="btn btn-danger ms-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Style object for table headers and cells
const tableHeaderStyle = {
  padding: "12px",
  border: "1px solid black",
  textAlign: "left",
};

export default New;
