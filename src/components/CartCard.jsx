// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchCartItems = async () => {
//       try {
//         const response = await axios.get("/api/get-cart", {
//           params: { userId: "USER_ID" }, 
//         });
//         setCartItems(response.data);
//       } catch (error) {
//         console.error("Error fetching cart items", error);
//         setError("Error fetching cart items");
//       }
//     };

//     fetchCartItems();
//   }, []);

//   return (
//     <div>
//       <h1>Your Cart</h1>
//       {error && <p>{error}</p>}
//       {cartItems.length > 0 ? (
//         cartItems.map((item) => (
//           <div key={item.productId._id}>
//             <h2>{item.productId.productName}</h2>
//             <p>Quantity: {item.quantity}</p>
//             <p>Price: {item.productId.productPrice}</p>
//           </div>
//         ))
//       ) : (
//         <p>Your cart is empty</p>
//       )}
//     </div>
//   );
// };

// export default Cart;
