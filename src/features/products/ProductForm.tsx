import React, { useState } from "react";
import { Product } from "./productsSlice";

export const ProductForm: React.FC<{
  categories: string[];
  initial?: Partial<Product>;
  onSubmit: (data: Omit<Product, "id">) => void;
  onCancel: () => void;
}> = ({ categories, initial, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [price, setPrice] = useState(initial?.price ?? 0);
  const [category, setCategory] = useState(initial?.category ?? categories[0] ?? "");
  const [image, setImage] = useState(initial?.image ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if(title.length != 0) {
      onSubmit({ title, price, category, image, description });
    }
    console.log(title)
  };

  return (
      <form className="product-form" onSubmit={submit}>
      <input
        className="form-input"
        placeholder="Название"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="form-input"
        type="number"
        placeholder="Цена"
        value={price}
        onChange={(e) => setPrice(+e.target.value)}
      />
      <select
        className="form-select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {categories.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
      <input
        className="form-input"
        placeholder="Изображение (URL)"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <textarea
        className="form-textarea"
        placeholder="Описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="form-buttons">
        <button type="button" className="form-button cancel" onClick={onCancel}>
          Отмена
        </button>
        <button type="submit" className="form-button submit">
          Сохранить
        </button>
      </div>
    </form>
  );
};
