import './HomePage.css'
import { Header } from '../../components/Header';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ProductsGrid } from './ProductsGrid';
import { useSearchParams } from 'react-router-dom';

export function HomePage({cart, loadCart}) { 
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getHomeData = async () => {
      const urlPath = search ? `/api/products?search=${search}` : '/api/products';
      const response = await axios.get(urlPath);

      setProducts(response.data);
    } 
    getHomeData();
  }, [search]);
  
  return (
    <>
      <link rel="icon" href="home-favicon.png" />
      <title>Ecommerce Project</title>
      <Header cart={cart}/>

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}
