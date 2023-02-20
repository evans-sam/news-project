import Footer from './footer';
import React from 'react';

type Props = {
  preview?: boolean;
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
          <main>{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
};

export default Layout;
