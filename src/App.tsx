import './App.css'
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { fetchProducts, fetchCategories } from "./features/products/productsThunks";
import { addProduct, updateProduct, deleteProduct } from "./features/products/productsSlice";
import { ProductForm } from "./features/products/ProductForm";
import { ProductCard } from "./features/products/ProductCard";
import { Modal } from "./components/Modal";
import { Provider } from "react-redux";
import { store } from "./app/store";

function AppContent() {
  const dispatch = useAppDispatch();
  const { list, categories, loading } = useAppSelector((s) => s.products);
  const [showAdd, setShowAdd] = useState(false);
  const [active, setActive] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div>
      <h1>Менеджер товаров</h1>
      <button onClick={() => setShowAdd(true)} className="form-button submit">Добавить товар</button>

      {loading && <p>Загрузка...</p>}

      <div className='product-grid'>
        {list.map((p) => (
          <ProductCard key={p.id} product={p} onClick={() => setActive(p)} />
        ))}
      </div>

      {showAdd && (
        <Modal onClose={() => setShowAdd(false)}>
          <h2>Добавить товар</h2>
          <ProductForm
            categories={categories}
            onSubmit={(data) => {
              dispatch(addProduct(data));
              setShowAdd(false);
            }}
            onCancel={() => setShowAdd(false)}
          />
        </Modal>
      )}

      {active && (
        <Modal onClose={() => setActive(null)}>
          <h2>{active.title}</h2>
          <ProductForm
            categories={categories}
            initial={active}
            onSubmit={(data) => {
              dispatch(updateProduct({ ...active, ...data }));
              setActive(null);
            }}
            onCancel={() => setActive(null)}
          />
          <button onClick={() => { dispatch(deleteProduct(active.id)); setActive(null); }} className="form-button del">Удалить</button>
        </Modal>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
