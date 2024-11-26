import React, { useEffect, useState } from "react";
import { getCouponsApi } from "../../apis/Api";

const Offer = () => {
  // Corrected the component name
  const [discounts, setDiscounts] = useState([]); // State for all fetched discounts

  useEffect(() => {
    getCouponsApi()
      .then((res) => {
        setDiscounts(res.data.discounts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container mt-4 p-3 bg-light text-center">
      <h2>Get Amazing Offers</h2>
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {discounts.map((discount) => (
          <div className="col" key={discount.id}>
            <div className="card">
              <div className="card-body">
                <img
                  src={`http://localhost:5000/discounts/${discount.couponImage}`}
                  className="card-img-top fixed-size-image"
                  alt="..."
                />
                <h5 className="card-title">{discount.couponName}</h5>

                <p className="card-text">{discount.couponType}</p>
              </div>
            </div> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offer;
