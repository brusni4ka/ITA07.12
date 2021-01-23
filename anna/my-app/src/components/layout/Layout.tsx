import React from 'react';
import Header from '../header';
import Footer from '../footer';
import './layout.css';

interface ILayoutProps  {
  children: React.ReactNode,
  className?: string,
  pageName: string  
}

const Layout: React.FC<ILayoutProps> = (props) => {

  const { children, className, pageName } = props;

   return (
    <div  className={className}>
      <Header pageName={pageName}/>
      <main className="main">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;