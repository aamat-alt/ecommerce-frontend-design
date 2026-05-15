import React, { useState, useEffect } from 'react';
import { ChevronRight, Grid, List, ChevronDown, Star, Heart, X, Search, SlidersHorizontal } from 'lucide-react';
import API from '../api';

const ProductListing = ({ setPage, initialCategory, searchQuery }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(initialCategory || '');

  useEffect(() => {
    if (initialCategory !== undefined) {
      setCategory(initialCategory);
    }
  }, [initialCategory]);

  // ✅ NEW: sync searchQuery from Header into local search state
  useEffect(() => {
    if (searchQuery !== undefined && searchQuery !== '') {
      setSearch(searchQuery);
      setCurrentPage(1);
    }
  }, [searchQuery]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false);
  const [categories, setCategories] = useState([]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await API.get('/products', {
        params: { search, category, page: currentPage, limit: 9 }
      });
      const productList = data.products || data;
      setProducts(productList);
      setTotalPages(data.totalPages || 1);
      setTotal(data.total || productList.length);

      if (categories.length === 0) {
        const allCats = [...new Set(productList.map(p => p.category).filter(Boolean))];
        setCategories(allCats);
      }
    } catch (err) {
      setError('Failed to load products. Is your backend running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, [search, category, currentPage]);

  const handleCategory = (cat) => {
    setCategory(cat === category ? '' : cat);
    setCurrentPage(1);
    setShowSidebar(false);
  };

  const clearFilters = () => {
    setSearch('');
    setCategory('');
    setCurrentPage(1);
  };

  const Sidebar = () => (
    <aside className="w-full space-y-2">
      <div className="border-t border-[#DEE2E7] py-3">
        <h4 className="font-bold text-[#1C1C1C] mb-3 flex justify-between items-center">
          Category <ChevronDown className="w-4 h-4 opacity-50" />
        </h4>
        <ul className="space-y-3 text-[#505050] text-sm">
          <li
            onClick={() => handleCategory('')}
            className={`cursor-pointer hover:text-primary transition-colors ${category === '' ? 'text-primary font-semibold' : ''}`}
          >
            All Products
          </li>
          {categories.map(cat => (
            <li
              key={cat}
              onClick={() => handleCategory(cat)}
              className={`cursor-pointer hover:text-primary transition-colors flex items-center justify-between ${category === cat ? 'text-primary font-semibold' : ''}`}
            >
              {cat}
              {category === cat && <X size={14} className="text-primary" />}
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-[#DEE2E7] py-3">
        <h4 className="font-bold text-[#1C1C1C] mb-3 flex justify-between items-center cursor-pointer">
          Price range <ChevronDown className="w-4 h-4 opacity-50" />
        </h4>
        <div className="flex gap-2">
          <div className="flex-1">
            <p className="text-xs mb-1">Min</p>
            <input type="text" placeholder="0" className="w-full border border-[#DEE2E7] rounded-md px-3 py-2 text-sm outline-none focus:border-primary" />
          </div>
          <div className="flex-1">
            <p className="text-xs mb-1">Max</p>
            <input type="text" placeholder="9999" className="w-full border border-[#DEE2E7] rounded-md px-3 py-2 text-sm outline-none focus:border-primary" />
          </div>
        </div>
        <button className="w-full mt-3 bg-white border border-[#DEE2E7] text-primary py-2 rounded-md text-sm font-medium hover:bg-gray-50">
          Apply
        </button>
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

      {(search || category) && (
        <button
          onClick={clearFilters}
          className="w-full bg-red-50 text-red-500 border border-red-200 py-2 rounded-md text-sm font-medium hover:bg-red-100"
        >
          Clear All Filters
        </button>
      )}
    </aside>
  );

  return (
    <div className="container py-4">
      <div className="flex items-center gap-2 text-[#8B96A5] text-sm mb-6">
        <span className="cursor-pointer hover:text-primary transition-colors" onClick={() => setPage('home')}>Home</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-[#1C1C1C] font-normal">
          {category || 'All Products'}
        </span>
      </div>

      <div className="flex gap-2 mb-6">
        <div className="flex-1 flex items-center border border-[#DEE2E7] rounded-lg px-4 py-2 bg-white shadow-sm">
          <Search size={18} className="text-[#8B96A5] mr-2 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="flex-1 outline-none text-sm text-[#1C1C1C]"
          />
          {search && <X size={16} className="text-[#8B96A5] cursor-pointer flex-shrink-0" onClick={() => setSearch('')} />}
        </div>
        <button
          onClick={fetchProducts}
          className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Search
        </button>
        <button
          className="lg:hidden bg-white border border-[#DEE2E7] px-4 py-2 rounded-lg flex items-center gap-2 text-sm"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>
      </div>

      {showSidebar && (
        <div className="lg:hidden bg-white border border-[#DEE2E7] rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-[#1C1C1C]">Filters</h3>
            <X size={18} className="cursor-pointer" onClick={() => setShowSidebar(false)} />
          </div>
          <Sidebar />
        </div>
      )}

      <div className="flex gap-6">
        <div className="hidden lg:block w-[240px] flex-shrink-0">
          <Sidebar />
        </div>

        <main className="flex-1 min-w-0">
          <div className="bg-white border border-[#DEE2E7] rounded-lg p-4 flex items-center justify-between mb-4 shadow-sm">
            <span className="text-[#1C1C1C] text-sm">
              <span className="font-bold">{total}</span> items found
              {category && <span className="text-primary ml-2">in <b>{category}</b></span>}
              {search && <span className="text-primary ml-2">for "<b>{search}</b>"</span>}
            </span>
            <div className="flex items-center gap-2">
              <div className="flex border border-[#DEE2E7] rounded-md overflow-hidden">
                <div
                  className={`p-2 border-r border-[#DEE2E7] cursor-pointer transition-colors ${viewMode === 'grid' ? 'bg-[#EFF2F4]' : 'hover:bg-gray-50'}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid size={18} className="text-[#1C1C1C]" />
                </div>
                <div
                  className={`p-2 cursor-pointer transition-colors ${viewMode === 'list' ? 'bg-[#EFF2F4]' : 'hover:bg-gray-50'}`}
                  onClick={() => setViewMode('list')}
                >
                  <List size={18} className="text-[#1C1C1C]" />
                </div>
              </div>
            </div>
          </div>

          {(search || category) && (
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {category && (
                <div className="flex items-center gap-2 px-3 py-1.5 border border-primary rounded-md bg-white text-sm text-primary">
                  <span>{category}</span>
                  <X size={14} className="cursor-pointer" onClick={() => setCategory('')} />
                </div>
              )}
              {search && (
                <div className="flex items-center gap-2 px-3 py-1.5 border border-primary rounded-md bg-white text-sm text-primary">
                  <span>"{search}"</span>
                  <X size={14} className="cursor-pointer" onClick={() => setSearch('')} />
                </div>
              )}
              <button className="text-primary text-sm hover:underline" onClick={clearFilters}>
                Clear all
              </button>
            </div>
          )}

          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 text-sm">
              {error}
            </div>
          )}

          {!loading && !error && products.length === 0 && (
            <div className="flex flex-col justify-center items-center py-20 gap-4">
              <div className="text-5xl">🔍</div>
              <div className="text-[#8B96A5] text-lg">No products found!</div>
              {(search || category) && (
                <button onClick={clearFilters} className="text-primary hover:underline text-sm">
                  Clear filters and try again
                </button>
              )}
            </div>
          )}

          {!loading && !error && products.length > 0 && (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white border border-[#DEE2E7] rounded-lg p-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center cursor-pointer"
                    onClick={() => { localStorage.setItem('selectedProduct', JSON.stringify(product)); setPage('details'); }}
                  >
                    <div className="w-full aspect-square flex items-center justify-center mb-4 bg-[#F7F7F7] rounded-md p-4 overflow-hidden">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="max-w-[85%] max-h-[85%] object-contain group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                        />
                      ) : null}
                      <div className="text-5xl hidden items-center justify-center">📦</div>
                    </div>
                    <div className="w-full">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-bold text-[#1C1C1C]">${product.price}</span>
                        <button
                          className="w-8 h-8 border border-[#DEE2E7] rounded-md flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Heart size={16} />
                        </button>
                      </div>
                      <div className="flex gap-0.5 mb-2">
                        {Array(5).fill(0).map((_, i) => (
                          <Star key={i} size={12} className={i < 4 ? "fill-[#FF9017] text-[#FF9017]" : "text-[#D1D3D3]"} />
                        ))}
                      </div>
                      <h3 className="text-[#505050] text-[13px] leading-[1.4] line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      {product.category && (
                        <span
                          className="text-xs bg-[#EFF2F4] text-[#505050] px-2 py-1 rounded cursor-pointer hover:bg-primary hover:text-white transition-colors"
                          onClick={(e) => { e.stopPropagation(); handleCategory(product.category); }}
                        >
                          {product.category}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white border border-[#DEE2E7] rounded-lg p-5 flex gap-4 hover:shadow-md transition-shadow cursor-pointer relative"
                    onClick={() => { localStorage.setItem('selectedProduct', JSON.stringify(product)); setPage('details'); }}
                  >
                    <div className="w-[150px] h-[150px] flex-shrink-0 flex items-center justify-center bg-[#F7F7F7] rounded-lg p-3">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain" />
                      ) : (
                        <div className="text-4xl">📦</div>
                      )}
                    </div>
                    <button
                      className="absolute right-5 top-5 w-10 h-10 border border-[#DEE2E7] rounded-md flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Heart size={20} />
                    </button>
                    <div className="flex-1 py-1">
                      <h3 className="text-[#1C1C1C] text-base font-semibold mb-2 hover:text-primary pr-12">{product.name}</h3>
                      <span className="text-xl font-bold text-[#1C1C1C]">${product.price}</span>
                      <div className="flex gap-0.5 my-2">
                        {Array(5).fill(0).map((_, i) => (
                          <Star key={i} size={14} className={i < 4 ? "fill-[#FF9017] text-[#FF9017]" : "text-[#D1D3D3]"} />
                        ))}
                      </div>
                      <p className="text-[#505050] text-sm line-clamp-2 mb-3">{product.description}</p>
                      <div className="flex items-center gap-3">
                        {product.category && (
                          <span
                            className="text-xs bg-[#EFF2F4] text-[#505050] px-2 py-1 rounded cursor-pointer hover:bg-primary hover:text-white transition-colors"
                            onClick={(e) => { e.stopPropagation(); handleCategory(product.category); }}
                          >
                            {product.category}
                          </span>
                        )}
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
              <div className="flex border border-[#DEE2E7] rounded-md overflow-hidden bg-white shadow-sm">
                <button
                  className="px-3 py-2 border-r border-[#DEE2E7] hover:bg-gray-50 disabled:opacity-30 text-sm"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >{"<"}</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 border-r border-[#DEE2E7] text-sm transition-colors ${currentPage === page ? 'bg-primary text-white font-bold' : 'hover:bg-gray-50 text-dark'}`}
                  >{page}</button>
                ))}
                <button
                  className="px-3 py-2 hover:bg-gray-50 disabled:opacity-30 text-sm"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >{">"}</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductListing;
