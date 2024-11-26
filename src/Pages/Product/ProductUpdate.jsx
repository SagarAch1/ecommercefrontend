import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getSingleProductApi, updateProduct } from "../../apis/Api";

const UpdateProduct = () => {
  const { id } = useParams();

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [oldImage, setOldImage] = useState("");

  const categories = [
    { _id: 1, categoryName: "Electronics" },
    { _id: 2, categoryName: "Clothing" },
    { _id: 3, categoryName: "Books" },
    { _id: 4, categoryName: "Home Appliances" },
    // Add more categories as needed
  ];

  useEffect(() => {
    getSingleProductApi(id)
      .then((res) => {
        console.log(res.data);
        setProductName(res.data.product.productName);
        setProductPrice(res.data.product.productPrice);
        setProductCategory(res.data.product.productCategory);
        setProductDescription(res.data.product.productDescription);
        setOldImage(res.data.product.productImage);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleImage = (event) => {
    const file = event.target.files[0];
    setProductImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productPrice", productPrice);
    formData.append("productCategory", productCategory);
    formData.append("productDescription", productDescription);

    if (productImage) {
      formData.append("productImage", productImage);
    }

    updateProduct(id, formData)
      .then((res) => {
        if (res.status === 201) {
          toast.success(res.data.message);
        }
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message);
        }
      });
  };

  return (
    <div className="container mt-3">
      <h2>
        Update product for <span className="text-danger">{productName}</span>
      </h2>
      <div className="d-flex gap-3">
        <form>
          <label>Product Name</label>
          <input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="form-control"
            type="text"
            placeholder="Enter your product name"
          />

          <label className="mt-2">Product Price</label>
          <input
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="form-control"
            type="number"
            placeholder="Enter your product price"
          />

          <label className="mt-2">Choose category</label>
          <select
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            className="form-control"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category.categoryName}>
                {category.categoryName}
              </option>
            ))}
          </select>

          <label className="mt-2">Enter description</label>
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            className="form-control"
          ></textarea>

          <label className="mt-2">Choose product Image</label>
          <input onChange={handleImage} type="file" className="form-control" />

          <button onClick={handleUpdate} className="btn btn-danger w-100 mt-2">
            Update Product
          </button>
        </form>

        <div className="image-section">
          <h6>Previewing old images</h6>
          <img
            height={"150px"}
            width={"250px"}
            className="image-fluid rounded-4 object-fit-cover"
            src={`http://localhost:5000/products/${oldImage}`}
            alt=""
          />
          {previewImage && (
            <>
              <h6>New Image</h6>
              <img
                height={"150px"}
                width={"250px"}
                className="image-fluid rounded-4 object-fit-cover"
                src={previewImage}
                alt=""
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
