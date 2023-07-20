import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    //fixed-bottom no se usa al final
    <footer className="footer footer--fixed-bottom">
      <div className="footer__content">
        <a
          className='footer__link'
          href="https://github.com/Pipetboy2001"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub className="footer__github-icon" />
          Pipetboy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
