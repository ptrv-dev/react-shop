import React from 'react';
import {
  BrandItem,
  BrandResponse,
  ProductItem,
  ProductResponse,
} from '../../@types/serverResponse';
import appAxios from '../../axios';
import BrandCard from '../../components/BrandCard';
import BrandCardSkeleton from '../../components/BrandCardSkeleton';
import Button from '../../components/Button';
import ProductCard from '../../components/ProductCard';
import ProductCardSkeleton from '../../components/ProductCardSkeleton';

const HomePage: React.FC = () => {
  const [products, setProducts] = React.useState<ProductItem[]>([]);
  const [isMore, setIsMore] = React.useState(false);
  const [brands, setBrands] = React.useState<BrandItem[]>([]);

  const fetchProducts = async () => {
    const { data } = await appAxios.get<ProductResponse>('/product');
    setIsMore(data.pagesCount > 1);
    setProducts(data.data);
  };
  const fetchBrands = async () => {
    const { data } = await appAxios.get<BrandResponse>('/brand');
    setBrands(data.data);
  };

  React.useEffect(() => {
    fetchProducts();
    fetchBrands();
  }, []);

  console.log(products);

  return (
    <div
      className="container"
      style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}
    >
      <div className="section">
        <div className="section__header">
          <h2 className="section__title">Featured</h2>
        </div>
        <div className="section__body">
          <div className="section__grid">
            {products.length
              ? products.map((product) => (
                  <ProductCard key={product._id} {...product} />
                ))
              : [...Array(8)].map((_, idx) => (
                  <ProductCardSkeleton key={idx} />
                ))}
          </div>
          {isMore && <Button href="/all-items">View all</Button>}
        </div>
      </div>
      <div className="section">
        <div className="section__header">
          <h2 className="section__title">Brands</h2>
        </div>
        <div className="section__body">
          <div className="section__grid section__grid_5">
            {brands.length
              ? brands.map((brand) => <BrandCard key={brand._id} {...brand} />)
              : [...Array(10)].map((_, idx) => <BrandCardSkeleton key={idx} />)}
          </div>
          <Button href="/brands">View all</Button>
        </div>
      </div>
      <div className="info">
        <h4>XZstore44 offers exclusive clothing for a cheap price</h4>
        <p>
          The owner of this store spent some time abroad meeting the best
          clothing manufactureres personally, and created a resource for all
          people to be able to access best quality clothing for an affordable
          price
        </p>
      </div>
    </div>
  );
};

export default HomePage;
