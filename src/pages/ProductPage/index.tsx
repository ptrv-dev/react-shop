import React from 'react';
import { useParams } from 'react-router-dom';
import { isAxiosError } from 'axios';
import appAxios from '../../axios';

import LoadingPage from '../LoadingPage';

import { ProductItem } from '../../@types/serverResponse';
import InputNumber from '../../components/InputNumber';
import Button from '../../components/Button';

const ProductPage: React.FC = () => {
  const { id } = useParams();

  const [product, setProduct] = React.useState<ProductItem>();
  const [notFound, setNotFound] = React.useState(false);

  const [quantity, setQuantity] = React.useState<number>(1);

  const fetchProduct = async () => {
    try {
      const { data } = await appAxios.get<ProductItem>(`/product/${id}`);
      setProduct(data);
    } catch (error) {
      if (!isAxiosError(error)) return;
      if (error.response?.status === 404) {
        setNotFound(true);
      }
    }
  };

  React.useEffect(() => {
    fetchProduct();
  }, []);

  if (notFound)
    return (
      <div className="container">
        <h1>Not Found!</h1>
      </div>
    );

  if (!product) return <LoadingPage />;

  return (
    <div className="product">
      <div className="product__container container">
        <div className="product__col">
          <div className="product__images product-images">
            <div className="product-images__root">
              <img src={`\\${product.images[0]}`} alt={product.title} />
            </div>
            <div className="product-images__list">
              {product.images.slice(1).map((image, idx) => (
                <div key={idx} className="product-images__img">
                  <img src={`\\${image}`} alt={product.title} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="product__col">
          <h1 className="product__title">{product.title}</h1>
          <p className="product__price">
            {Number(product.price.$numberDecimal).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </p>
          {product.sizes && product.sizes.length && (
            <div className="product__field">
              <label htmlFor="sizes">Size</label>
              <select id="sizes" className="select">
                {product.sizes.map((size, idx) => (
                  <option key={idx}>{size}</option>
                ))}
              </select>
            </div>
          )}
          <div className="product__field">
            <label htmlFor="quantity">Quantity</label>
            <InputNumber
              value={quantity}
              setValue={setQuantity}
              max={10}
              name="quantity"
            />
          </div>
          <div className="product__buttons">
            <Button className="product__button">Add to cart</Button>
            <Button className="product__button" style="filled">
              Buy it now
            </Button>
          </div>
          {product.description && (
            <div className="product__field">
              <label>Description</label>
              <p className="product__description">{product.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;