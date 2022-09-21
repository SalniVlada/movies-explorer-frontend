import './pageNotFound.css';
import { Link } from 'react-router-dom';

function pageNotFound() {
  return (
    <div className="pageMotFound">
      <h2 className="pageNotFound__title">404</h2>
      <p className="pageNotFound__text">Страница не найдена</p>
      <Link className='pageNotFound__link' to={-1}>Назад</Link>
    </div>
  );
}

export default pageNotFound;