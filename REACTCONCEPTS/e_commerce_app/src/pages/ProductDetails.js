import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import "../styles/ProductDetails.css";

// Utility function to extract brand from product title
const extractBrand = (title) => {
  const brands = ["wd", "seagate", "toshiba", "samsung", "hitachi"];
  for (let brand of brands) {
    if (title.toLowerCase().includes(brand)) {
      return brand;
    }
  }
  return null;
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook for navigation
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setSelectedProduct(data);
        const lowerTitle = data.title.toLowerCase();

        if (lowerTitle.includes("hard drive")) {
          const { data: allProducts } = await axios.get("https://fakestoreapi.com/products");
          const hardDriveProducts = allProducts.filter(
            (p) => p.title.toLowerCase().includes("hard drive") && p.id !== data.id
          );

          const currentBrand = extractBrand(data.title);
          let uniqueBrandProducts = [];
          let seenBrands = new Set();
          hardDriveProducts.forEach((p) => {
            const brand = extractBrand(p.title);
            if (brand && brand !== currentBrand && !seenBrands.has(brand)) {
              seenBrands.add(brand);
              uniqueBrandProducts.push(p);
            }
          });

          if (uniqueBrandProducts.length === 0) {
            uniqueBrandProducts = hardDriveProducts;
          }
          setSimilarProducts(uniqueBrandProducts.slice(0, 5));
        } else {
          const { data: productsInCategory } = await axios.get(
            `https://fakestoreapi.com/products/category/${data.category}`
          );
          const filtered = productsInCategory.filter((p) => p.id !== data.id).slice(0, 5);
          setSimilarProducts(filtered);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (!selectedProduct) return <p>Loading product details...</p>;

  // ✅ Handle Buy Now Click
  const handleBuyNow = () => {
    navigate("/payment", { state: { selectedProduct } }); // Pass product details to the payment page
  };

  return (
    <div className="product-details-page">
      {/* Selected Product Details */}
      <div className="selected-product">
        <img
          src={selectedProduct.image}
          alt={selectedProduct.title}
          className="product-image"
          onClick={() => setIsModalOpen(true)}
        />
        <div className="product-info">
          <h1>{selectedProduct.title}</h1>
          <p>{selectedProduct.description}</p>
          <p className="product-price">Price: ${selectedProduct.price.toFixed(2)}</p>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="add-to-cart">Add to Cart</button>
            <button className="wishlist-btn">❤️ Add to Wishlist</button>
            <button className="buy-now" onClick={handleBuyNow}>🛒 Buy Now</button> 
          </div>
        </div>
      </div>

      {/* Similar Products Section */}
      <h2>Similar Products</h2>
      <div className="similar-products">
        {similarProducts.length > 0 ? (
          similarProducts.map((p) => (
            <div key={p.id} className="product-card">
              <Link to={`/product/${p.id}`}>
                <img src={p.image} alt={p.title} className="product-image" />
                <h4>{p.title}</h4>
                <p className="product-price">${p.price.toFixed(2)}</p>
              </Link>
            </div>
          ))
        ) : (
          <p>No similar products found.</p>
        )}
      </div>

      {/* Full Image Modal */}
      {isModalOpen && (
        <div className="image-modal" onClick={() => setIsModalOpen(false)}>
          <img src={selectedProduct.image} alt="Full Product" className="full-image" />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
