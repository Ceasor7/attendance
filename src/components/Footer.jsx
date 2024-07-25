const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p>&copy; {currentYear} Developed by Joseph Gateru Kimani</p>
      </div>
    </footer>
  );
};

export default Footer;
