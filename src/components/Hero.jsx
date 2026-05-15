import React from 'react';
import bannerImg from '../assets/Image/backgrounds/Banner-board-800x420 2.png';
import promo1 from '../assets/Image/backgrounds/Group 969.png';
import promo2 from '../assets/Image/backgrounds/Group 982.png';
const Hero = ({ setPage, setCategory }) => {
  const categories = [
    { name: "Automobiles", value: "Automobiles" },
    { name: "Clothes and wear", value: "Clothing" },
    { name: "Home interiors", value: "Home & Kitchen" },
    { name: "Computer and tech", value: "Laptops" },
    { name: "Tools, equipments", value: "Tools" },
    { name: "Sports and outdoor", value: "Sports" },
    { name: "Electronics", value: "Electronics" },
    { name: "Smartphones", value: "Smartphones" },
    { name: "All products", value: "" },
  ];

  return (
    <section className="bg-white border border-shade-border rounded-lg mt-6 overflow-hidden">
      <div className="flex p-4 gap-4 h-[400px]">
        {/* Left Categories */}
        <div className="w-64 flex-shrink-0">
          <ul className="space-y-1">
            {categories.map((cat, index) => (
              <li
                key={index}
                onClick={() => setCategory(cat.value)}
                className="px-4 py-2 rounded-md cursor-pointer transition-colors text-dark-light hover:bg-primary hover:text-white"
              >
                {cat.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Main Banner */}
        <div
          className="flex-1 relative rounded-lg p-10 flex flex-col justify-center bg-cover bg-no-repeat bg-center"
          style={{ backgroundImage: `url("${bannerImg}")` }}
        >
          <div className="relative z-10 w-1/2">
            <h3 className="text-2xl font-normal text-dark mb-1">Latest trending</h3>
            <h2 className="text-[32px] font-bold text-dark leading-tight mb-6">Electronic items</h2>
            <button
              onClick={() => setCategory('')}
              className="bg-white text-primary px-6 py-2 rounded-lg font-medium hover:bg-primary hover:text-white transition-colors"
            >
              Shop Now
            </button>
          </div>
        </div>

        {/* Promo 1 */}
        <div
          className="bg-orange p-3 rounded-lg flex-1 text-white bg-cover bg-no-repeat bg-center cursor-pointer hover:opacity-90 transition-opacity"
          style={{ backgroundImage: `url("${promo1}")` }}
          onClick={() => setCategory('Electronics')}
        >
          <p className="text-sm font-normal leading-tight w-2/3">Get US $10 off with a new supplier</p>
        </div>

        {/* Promo 2 */}
        <div
          className="bg-teal p-3 rounded-lg flex-1 text-white bg-cover bg-no-repeat bg-center cursor-pointer hover:opacity-90 transition-opacity"
          style={{ backgroundImage: `url("${promo2}")` }}
          onClick={() => setCategory('Smartphones')}
        >
          <p className="text-sm font-normal leading-tight w-2/3">Send quotes with supplier preferences</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;