import React from "react";
import { Product } from "./productsSlice";
export const ProductCard: React.FC<{ product: Product; onClick: () => void }> = ({ product, onClick }) => (
  <div className="product-card" onClick={onClick}>
    <img src={product.image} alt={product.title} className="product-image" />
    <div className="product-content">
      <h3 className="product-title">{product.title}</h3>
      <div className="product-price">💰 ${product.price}</div>
      <div className="product-category">📦 {product.category}</div>
      <div className="product-rating">⭐ {product.rating?.rate ?? "—"}</div>
    </div>
  </div>
);
