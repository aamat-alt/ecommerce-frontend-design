import React, { useState, useEffect } from 'react';
import { ChevronRight, Grid, List, ChevronDown, Star, Heart, X, Search } from 'lucide-react';
import API from '../api';

const ProductListing = ({ setPage }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const categories = ['Electronics', 'Smartphones', 'Footwear', 'Clothing', 'Home & Kitchen'];

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/products', {
        params: { search, category, page: currentPage, limit: 9 }
      });
      setProducts(data.products || data);
      setTotalPages(data.totalPages || 1);
      setTotal(data.total || (data.products || data).length);
    } catch (err) {
      setError('Failed to load products. Is your backend running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, [search, category, currentPage]);

  const handleCategory = (cat) => { setCategory(cat === category ? '' : cat); setCurrentPage(1); };
  const clearFilters = () => { setSearch(''); setCategory(''); setCurrentPage(1); };

  return (
    <div className="container py-4">
      <div className="flex items-center gap-2 text-[#8B96A5] text-sm mb-6">
        <span className="cursor-pointer hover:text-primary" onClick={() => setPage('home')}>Home</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-[#1C1C1C] font-normal">Products</span>
      </div>

      {/* Search Bar */}
      <div className="flex gap-2 mb-6">
        <div className="flex-1 flex items-center border border-[#DEE2E7] rounded-lg px-4 py-2 bg-white">
          <Search size={18} className="text-[#8B96A5] mr-2" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="flex-1 outline-none text-sm text-[#1C1C1C]"
          />
          {search && <X size={16} className="text-[#8B96A5] cursor-pointer" onClick={() => setSearch('')} />}
        </div>
        <button onClick={fetchProducts} className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-medium hover:opacity-90">
          Search
        </button>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className="w-[240px] flex-shrink-0 space-y-2">
          <div className="border-t border-[#DEE2E7] py-3">
            <h4 className="font-bold text-[#1C1C1C] mb-3 flex justify-between items-center">
              Category <ChevronDown className="w-4 h-4 opacity-50" />
            </h4>
            <ul className="space-y-3 text-[#505050] text-sm">
              {categories.map(cat => (
                <li key={cat} onClick={() => handleCategory(cat)}
                  className={`cursor-pointer hover:text-primary transition-colors ${category === cat ? 'text-primary font-semibold' : ''}`}>
                  {cat}
                </li>
              ))}
              <li className="text-primary cursor-pointer mt-1" onClick={clearFilters}>Clear filters</li>
            </ul>
          </div>

          <div className="border-t border-[#DEE2E7] py-3">
            <h4 className="font-bold text-[#1C1C1C] mb-3">Price range</h4>
            <div className="flex gap-2">
              <div className="flex-1">
                <p className="text-xs mb-1">Min</p>
                <input type="text" placeholder="0" className="w-full border border-[#DEE2E7] rounded-md px-3 py-2 text-sm outline-none" />
              </div>
              <div className="flex-1">
                <p className="text-xs mb-1">Max</p>
                <input type="text" placeholder="9999" className="w-full border border-[#DEE2E7] rounded-md px-3 py-2 text-sm outline-none" />
              </div>
            </div>
            <button className="w-full mt-3 bg-white border border-[#DEE2E7] text-primary py-2 rounded-md text-sm font-medium">Apply</button>
          </div>

          <div className="border-t border-[#DEE2E7] py-3 pb-4">
            <h4 className="font-bold text-[#1C1C1C] mb-3">Ratings</h4>
            <div className="space-y-2">
              {[5, 4, 3, 2].map((stars) => (
                <label key={stars} className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-[#DEE2E7]" />
                  <div className="flex gap-0.5">
                    {Array(5).fill(0).map((_, i) => (
                      <Star key={i} size={14} className={i < stars ? "fill-[#FF9017] text-[#FF9017]" : "text-[#D1D3D3]"} />
                    ))}
                  </div>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1">
          <div className="bg-white border border-[#DEE2E7] rounded-lg p-4 flex items-center justify-between mb-4">
            <span className="text-[#1C1C1C] text-sm">
              <span className="font-bold">{total}</span> items found
              {category && <span className="text-primary ml-2">in {category}</span>}
              {search && <span className="text-primary ml-2">for "{search}"</span>}
            </span>
            <div className="flex border border-[#DEE2E7] rounded-md overflow-hidden">
              <div className={`p-2 border-r border-[#DEE2E7] cursor-pointer ${viewMode === 'grid' ? 'bg-[#EFF2F4]' : 'hover:bg-shade'}`} onClick={() => setViewMode('grid')}>
                <Grid size={18} />
              </div>
              <div className={`p-2 cursor-pointer ${viewMode === 'list' ? 'bg-[#EFF2F4]' : 'hover:bg-shade'}`} onClick={() => setViewMode('list')}>
                <List size={18} />
              </div>
            </div>
          </div>

          {(search || category) && (
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {category && <div className="flex items-center gap-2 px-3 py-1.5 border border-primary rounded-md text-sm">{category}<X size={14} className="cursor-pointer" onClick={() => setCategory('')} /></div>}
              {search && <div className="flex items-center gap-2 px-3 py-1.5 border border-primary rounded-md text-sm">"{search}"<X size={14} className="cursor-pointer" onClick={() => setSearch('')} /></div>}
              <button className="text-primary text-sm hover:underline" onClick={clearFilters}>Clear all</button>
            </div>
          )}

          {loading && <div className="flex justify-center py-20 text-[#8B96A5]">Loading products...</div>}
          {error && <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 text-sm">{error}</div>}
          {!loading && !error && products.length === 0 && <div className="flex justify-center py-20 text-[#8B96A5]">No products found!</div>}

          {!loading && !error && products.length > 0 && (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                  <div key={product._id} className="bg-white border border-[#DEE2E7] rounded-lg p-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center cursor-pointer" onClick={() => { localStorage.setItem('selectedProduct', JSON.stringify(product)); setPage('details'); }}>
                    <div className="w-full aspect-square flex items-center justify-center mb-4 bg-[#F7F7F7] rounded-md p-6 overflow-hidden">
                      {product.image ? <img src={product.image} alt={product.name} className="max-w-[85%] max-h-[85%] object-contain group-hover:scale-110 transition-transform duration-300" /> : <div className="text-5xl">📦</div>}
                    </div>
                    <div className="w-full">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-bold text-[#1C1C1C]">${product.price}</span>
                        <button className="w-8 h-8 border border-[#DEE2E7] rounded-md flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all" onClick={(e) => e.stopPropagation()}><Heart size={16} /></button>
                      </div>
                      <div className="flex gap-0.5 mb-2">{Array(5).fill(0).map((_, i) => <Star key={i} size={12} className={i < 4 ? "fill-[#FF9017] text-[#FF9017]" : "text-[#D1D3D3]"} />)}</div>
                      <h3 className="text-[#505050] text-[13px] leading-[1.4] line-clamp-2 mb-2">{product.name}</h3>
                      <span className="text-xs bg-[#EFF2F4] text-[#505050] px-2 py-1 rounded">{product.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {products.map((product) => (
                  <div key={product._id} className="bg-white border border-[#DEE2E7] rounded-lg p-5 flex gap-6 hover:shadow-md transition-shadow cursor-pointer relative" onClick={() => { localStorage.setItem('selectedProduct', JSON.stringify(product)); setPage('details'); }}>
                    <div className="w-[180px] h-[180px] flex-shrink-0 flex items-center justify-center bg-[#F7F7F7] rounded-lg p-4">
                      {product.image ? <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain" /> : <div className="text-4xl">📦</div>}
                    </div>
                    <button className="absolute right-5 top-5 w-10 h-10 border border-[#DEE2E7] rounded-md flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all" onClick={(e) => e.stopPropagation()}><Heart size={20} /></button>
                    <div className="flex-1 py-1">
                      <h3 className="text-[#1C1C1C] text-base font-semibold mb-2">{product.name}</h3>
                      <span className="text-xl font-bold text-[#1C1C1C]">${product.price}</span>
                      <div className="flex gap-0.5 my-2">{Array(5).fill(0).map((_, i) => <Star key={i} size={14} className={i < 4 ? "fill-[#FF9017] text-[#FF9017]" : "text-[#D1D3D3]"} />)}</div>
                      <p className="text-[#505050] text-sm line-clamp-2 mb-3">{product.description}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-xs bg-[#EFF2F4] px-2 py-1 rounded">{product.category}</span>
                        <span className="text-[#00B517] text-sm">Stock: {product.stock}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}

          {totalPages > 1 && (
            <div className="flex justify-end mt-8">
              <div className="flex border border-[#DEE2E7] rounded-md overflow-hidden bg-white">
                <button className="px-3 py-2 border-r border-[#DEE2E7] hover:bg-shade disabled:opacity-30" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>{"<"}</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button key={page} onClick={() => setCurrentPage(page)} className={`px-4 py-2 border-r border-[#DEE2E7] text-sm ${currentPage === page ? 'bg-primary text-white font-bold' : 'hover:bg-shade'}`}>{page}</button>
                ))}
                <button className="px-3 py-2 hover:bg-shade disabled:opacity-30" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>{">"}</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductListing;
