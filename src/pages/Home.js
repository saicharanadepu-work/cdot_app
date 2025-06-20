import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Cigar Distributors Of Texas</h1>
        <p>Premium platform for licensed retailers and wholesalers.</p>
      </header>

      <main className="home-main container">
        {/* <div className="text-center"> */}
          {/* <img src="/assets/tobacco-products.jpg" alt="Tobacco Display" className="img-fluid rounded shadow" /> */}
          {/* <p className="mt-4">Browse our premium tobacco products tailored for your business. Log in to view prices based on your membership type.</p> */}
        {/* </div> */}
      </main>

      <footer className="home-footer bg-dark text-white text-center py-3">
        <p>&copy; 2025 Cigar Distributors Of Texas. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;