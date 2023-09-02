import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white my-4 py-4 text-center">
      <div className="container mx-auto">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
