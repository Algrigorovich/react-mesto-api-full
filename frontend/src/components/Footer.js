const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer page__footer">
      <p className="footer__copyright">&copy; {currentYear} Mesto Russia</p>
    </footer>
  );
};

export default Footer;
