import style from './styles/index.module.css';
import imgIphone from '../../img/productos/fotoInicio.png';

function Index (){
    return(
        <section className={style.index} id="index">
            <div className={style.case_index}>
                <div className={style.text}>
                    <h3>Nuevos Ingresos </h3>
                    <h2>Iphone 15 Pro Max</h2>
                    <p>
                        Descubre la excelencia con el iPhone 15 Pro. 
                        Su pantalla Super Retina XDR Pro, potentes cámaras 
                        y chip A15 Bionic ofrecen un rendimiento excepcional. 
                        ¡Hazlo tuyo y sé parte del futuro ahora!
                    </p>
                </div>
                <div className={style.image}>
                    <img src={imgIphone} alt="Producto" />
                </div>
            </div>
        </section>
    )
}

export default Index;