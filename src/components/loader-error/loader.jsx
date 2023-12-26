import style from './loader.module.css';

function Loader() {
    return(
        <div className={style.container}>
            <div className={style.loader}></div>
        </div>
    );
}

export default Loader;