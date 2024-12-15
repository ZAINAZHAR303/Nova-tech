import React from "react";
import { FaWhatsapp, FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
          <div>
            <h3 className="text-lg font-semibold mb-4">About Nova Tech</h3>
            <p className="text-sm">
              Nova Tech offers a premium selection of watches for every occasion. Discover timeless designs and innovative technology at unbeatable prices.
            </p>
          </div>

       
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="text-sm space-y-2">
              <li><a href="/about" className="hover:underline">About Us</a></li>
              <li><a href="/contact" className="hover:underline">Contact Us</a></li>
              <li><a href="/policy" className="hover:underline">Privacy Policy</a></li>
              <li><a href="/faq" className="hover:underline">FAQs</a></li>
            </ul>
          </div>

       
          <div>
            <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
            <p className="text-sm mb-2">Email: Itxhuzi6@gmail.com</p>
            <p className="text-sm">Phone: +92 3184322655</p>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://wa.me/+923184322655"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 text-2xl hover:opacity-80"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
              <a
                href="https://www.instagram.com/direct/t/17842654239186788"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 text-2xl hover:opacity-80"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61568484572950&mibextid=wwXIfr&rdid=cyUjJ4uU9mybfVZC&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18gC21Mh5B%2F%3Fmibextid%3DwwXIfr#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 text-2xl hover:opacity-80"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              {/* <a
                href="https://twitter.com/your_twitter_handle"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 text-2xl hover:opacity-80"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a> */}
            </div>
          </div>
        </div>

        
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
          <p>© {new Date().getFullYear()} Nova Tech. All Rights Reserved.</p>
          <p className="mt-2">
            Powered by <a href="https://nova-tech-nu.vercel.app/" className="hover:underline text-blue-400">Nova Tech</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
