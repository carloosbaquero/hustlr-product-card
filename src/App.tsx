import { useEffect, useState } from 'react'
import './App.css'
import ProductCard from './components/ProductCard';

interface Product {
  id: string;
  image: string;
  name: string;
  price: number;
  variants: Array<{
    id: string;
    options: string[];
  }>;
  inStock: boolean;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products.map(product => (
        <div key={product.id} className="w-full">
          <ProductCard {...product} />
        </div>
      ))}
    </div>
  );
}

export default App
