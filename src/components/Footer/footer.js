import './footer.css';

function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__line"></div>
      <div className="footer__info">
        <h2 className="footer__caption">&#169; 2022</h2>
        <div className="footer__links">
          <a className="footer__link" href="https://practicum.yandex.ru" rel="noreferrer" target="_blank">Яндекс.Практикум</a>
          <a className="footer__link" href="https://github.com/SalniVlada" rel="noreferrer" target="_blank">Github</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;