// Importacion de componentes
import Loader from '../loader-error/loader.jsx';
import Error from '../loader-error/error.jsx';
import Index from './sections/index.jsx';
import Category from './sections/category.jsx';
import MainProduct from './sections/MainProducts.jsx';

//Importacion de estilo
import style from './container.module.css';

//Importacion de customHooks
import useQueryData from '../../customHooks/useQueryData.jsx';

function Container() {
  const product = useQueryData('https://api.escuelajs.co/api/v1/products');

  if (product.status === 'pending') {
    return < Loader/>;
  }
  
  if (product.status === 'error' || product.data.length <= 0) {
    return < Error/>;
  }

  if(product.data.length > 0){
    
    return (
      <div className={style.container}>
        < Index/>
        < Category listadeproductos={product.data}/>
        < MainProduct listadeproductos={product.data}/>
      </div>
    );
  }
}

export default Container;
