import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 mt-10 py-8">
      <div className="container  mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        {/* Social Icons */}
        <div className="flex space-x-4 mb-4 md:mb-0">
          <a href="#" className="text-gray-300 hover:text-white">
            <FaFacebook className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            <FaTwitter className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            <FaInstagram className="w-6 h-6" />
          </a>
        </div>

        {/* Navigation */}
        <nav className="text-gray-300">
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:text-white">About Us</a>
            </li>
            <li>
              <a href="#" className="hover:text-white">Contact</a>
            </li>
            <li>
              <a href="#" className="hover:text-white">Privacy Policy</a>
            </li>
            {/* Add more necessary items as needed */}
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
