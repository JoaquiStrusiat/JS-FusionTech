import React from 'react';
import style from './styles/category.module.css';

const SlideCard = ({ category, image, index }) => {
  if (index === 0) {
    return (
      <div className="carousel-item active">
        <img src={image} className="d-block w-100" alt={category.name} />
        <div className="carousel-caption d-block p-0">
          <h4 className='text-danger fs-1'>{category.name}</h4>
        </div>
      </div>
    );
  }
  return (
    <div className="carousel-item">
      <img src={image} className="d-block w-100" alt={category.name} />
      <div className="carousel-caption d-block p-0">
        <h4 className='text-danger fs-1'>{category.name}</h4>
      </div>
    </div>
  );
};

function Category({ listadeproductos }) {
  const listaNueva = [];

  for (const producto of listadeproductos) {
    const existe = listaNueva.some((p) => p.id === producto.category.id);

    if (!existe) {
      listaNueva.push(producto.category);
    }
  }
  return (
    <section className={style.category} id="category">
      <div className={style.case_category}>
        <h3>Categorías</h3>
        <div className={style.box} >
          <div id="carouselExampleCaptions" className="carousel slide">
            <div className="carousel-inner">
              {listaNueva.map((category, index) => (
                <SlideCard
                  category={category}
                  key={category.id}
                  image={category.image}
                  index={index}
                />
              ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
              <span className="carousel-control-prev-icon btn btn-danger" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next text-danger" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
              <span className="carousel-control-next-icon btn btn-danger" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Category;