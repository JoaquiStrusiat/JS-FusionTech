import style from './styles/mainProducts.module.css';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Card({image, title, price, description}){
    return(
        <div className={style.card}>
            <div className={style.imgbox}>
                <img className={style.img} src={image} alt={title}/>
            </div>
            <div className={style.text}>
                <h2>{title}</h2>
                <h5 className='price'>$ {price}</h5>
                <p>{description}</p>    
            </div>
        </div>
    )
}

function MainProduct({ listadeproductos }){
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 1200 },
          items: 4
        },
        desktop: {
          breakpoint: { max: 1200, min: 850 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 850, min: 580 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 580, min: 20 },
          items: 1
        }
    };
    return(
        <section className={style.mainproducts} id="main-products">
            <div className={style.case_mainproducts}>
            <h3>Lista de Products</h3>
            <Carousel responsive={responsive} className={style.carousel}>
                {listadeproductos.map((product) => (
                    < Card 
                    key={product.id}
                    image={product.images} 
                    title={product.title}
                    price={product.price}
                    description={product.description}
                    />
                ))}
            </Carousel>
            </div>
        </section>
    )
}

export default MainProduct;
