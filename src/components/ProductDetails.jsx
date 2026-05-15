import React, { useState, useEffect } from 'react';
import { Star, Heart, MessageSquare, ShoppingBag, ShieldCheck, Globe, ChevronRight, Check } from 'lucide-react';
import flagDE from '../assets/Layout1/Image/flags/DE@2x.png';

const ProductDetails = ({ setPage }) => {
  const [product, setProduct] = useState(null);
  const [selectedThumb, setSelectedThumb] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('selectedProduct');
    if (saved) {
      setProduct(JSON.parse(saved));
    }
  }, []);

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <p className="text-[#8B96A5] text-lg mb-4">No product selected.</p>
        <button onClick={() => setPage('listing')} className="bg-primary text-white px-6 py-2 rounded-lg">
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-[#8B96A5] text-sm mb-6">
        <span className="cursor-pointer hover:text-primary" onClick={() => setPage('home')}>Home</span>
        <ChevronRight className="w-4 h-4" />
        <span className="cursor-pointer hover:text-primary" onClick={() => setPage('listing')}>Products</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-[#1C1C1C] font-normal">{product.name}</span>
      </div>

      {/* Main Content */}
      <div className="bg-white border border-[#DEE2E7] rounded-lg p-5 lg:p-8 flex flex-col lg:flex-row gap-8 mb-8 shadow-sm">

        {/* Image Section */}
        <div className="lg:w-[450px] flex-shrink-0">
          <div className="border border-[#DEE2E7] rounded-lg p-8 mb-4 flex items-center justify-center bg-[#F7F7F7] aspect-square overflow-hidden">
            {product.image ? (
              <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-500" />
            ) : (
              <div className="text-6xl">📦</div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 text-[#00B517] mb-2">
            <Check size={20} />
            <span className="text-sm font-medium">
              {product.stock > 0 ? `In stock (${product.stock} available)` : 'Out of stock'}
            </span>
          </div>

          <h1 className="text-xl lg:text-2xl font-bold text-[#1C1C1C] mb-4">
            {product.name}
          </h1>

          {/* Ratings */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              {Array(5).fill(0).map((_, i) => (
                <Star key={i} size={16} className={i < 4 ? "fill-[#FF9017] text-[#FF9017]" : "text-[#D1D3D3]"} />
              ))}
              <span className="text-[#FF9017] text-sm ml-1">4.0</span>
            </div>
            <div className="flex items-center gap-1 text-[#8B96A5] text-sm">
              <MessageSquare size={16} />
              <span>Reviews</span>
            </div>
            <div className="flex items-center gap-1 text-[#8B96A5] text-sm">
              <ShoppingBag size={16} />
              <span>{product.stock} in stock</span>
            </div>
          </div>

          {/* Price */}
          <div className="bg-[#FFF0DF] p-4 rounded-lg flex items-center gap-8 mb-6">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-[#FA3434]">${product.price}</span>
              <span className="text-xs text-[#505050]">Per item</span>
            </div>
          </div>

          {/* Product Meta */}
          <div className="space-y-4 mb-8">
            <div className="grid grid-cols-4 gap-4 text-sm">
              <span className="text-[#8B96A5]">Category:</span>
              <span className="col-span-3 text-[#505050]">{product.category}</span>
            </div>
            <div className="grid grid-cols-4 gap-4 text-sm border-t border-[#DEE2E7] pt-4">
              <span className="text-[#8B96A5]">Description:</span>
              <span className="col-span-3 text-[#505050]">{product.description}</span>
            </div>
            <div className="grid grid-cols-4 gap-4 text-sm border-t border-[#DEE2E7] pt-4">
              <span className="text-[#8B96A5]">Stock:</span>
              <span className="col-span-3 text-[#00B517]">{product.stock} units available</span>
            </div>
          </div>

          <div className="h-[1px] bg-[#DEE2E7] mb-6"></div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              className="flex-1 min-w-[150px] bg-primary hover:opacity-90 text-white py-3 rounded-lg font-bold transition-colors"
              onClick={() => setPage('cart')}
            >
              Buy Now
            </button>
            <button
              className="flex-1 min-w-[150px] bg-[#E3F0FF] hover:bg-[#D1E9FF] text-primary py-3 rounded-lg font-bold transition-colors"
              onClick={() => setPage('cart')}
            >
              Add to Cart
            </button>
            <button className="w-12 h-12 flex items-center justify-center border border-[#DEE2E7] rounded-lg text-primary hover:bg-shade transition-colors">
              <Heart size={20} />
            </button>
          </div>
        </div>

        {/* Seller Sidebar */}
        <div className="lg:w-[280px] space-y-4">
          <div className="bg-white border border-[#DEE2E7] rounded-lg p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-md bg-[#E3F0FF] flex items-center justify-center text-primary font-bold text-xl">S</div>
              <div className="flex flex-col">
                <span className="text-[#1C1C1C] font-normal">Supplier</span>
                <span className="text-[#505050] text-sm">Verified Seller</span>
              </div>
            </div>
            <div className="h-[1px] bg-[#DEE2E7] mb-4"></div>
            <div className="space-y-3 mb-5">
              <div className="flex items-center gap-3 text-sm text-[#8B96A5]">
                <img src={flagDE} alt="DE" className="w-5 h-3 rounded-sm" />
                <span>Germany, Berlin</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#8B96A5]">
                <ShieldCheck size={18} />
                <span>Verified Seller</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#8B96A5]">
                <Globe size={18} />
                <span>Worldwide shipping</span>
              </div>
            </div>
            <div className="space-y-2">
              <button className="w-full bg-primary text-white py-2 rounded-lg text-sm font-medium hover:opacity-90">Send inquiry</button>
              <button className="w-full bg-white text-primary border border-[#DEE2E7] py-2 rounded-lg text-sm font-medium hover:bg-shade">Seller's profile</button>
            </div>
          </div>
          <div className="text-center p-4">
            <button className="flex items-center justify-center gap-2 text-primary font-medium hover:underline text-sm w-full">
              <Heart size={18} />
              <span>Save for later</span>
            </button>
          </div>
        </div>
      </div>

      {/* Description Tab */}
      <div className="bg-white border border-[#DEE2E7] rounded-lg p-6 mb-8">
        <h3 className="font-bold text-[#1C1C1C] text-lg mb-4">Product Description</h3>
        <p className="text-[#505050] text-sm leading-relaxed">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
