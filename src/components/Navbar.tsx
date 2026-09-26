import { useState } from 'react';
import { Search, User, ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { PRODUCTS } from '../data';

interface NavbarProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  cartCount: number;
  onCartOpen: () => void;
  onProductClick: (product: Product) => void;
}

export default function Navbar({
  activeCategory,
  setActiveCategory,
  cartCount,
  onCartOpen,
  onProductClick
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { label: 'NEW IN', value: 'all' },
    { label: 'RINGS', value: 'rings' },
    { label: 'NECKLACES', value: 'necklaces' },
    { label: 'EARRINGS', value: 'earrings' },
    { label: 'BRACELETS', value: 'bracelets' },
    { label: 'SALE', value: 'sale' },
  ];

  const filteredSearchResults = searchQuery.trim()
    ? PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleCategoryClick = (categoryVal: string) => {
    setActiveCategory(categoryVal);
    setIsMobileMenuOpen(false);
    // Smooth scroll to product grid if we are on the page
    const gridEl = document.getElementById('products-section');
    if (gridEl) {
      gridEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-neutral-100" id="main-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Mobile hamburger - Left */}
          <button
            id="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 text-neutral-600 hover:text-black transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Brand Logo - Left (centered on mobile, left-aligned on desktop) */}
          <div className="flex-1 md:flex-none">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setActiveCategory('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="font-serif text-2xl sm:text-3xl font-normal tracking-[0.2em] text-neutral-900 block text-center md:text-left hover:opacity-85 transition-opacity"
              id="brand-logo"
            >
              BLYNG
            </a>
          </div>

          {/* Desktop Nav - Centered */}
          <nav className="hidden md:flex space-x-8 items-center" id="desktop-nav">
            {navItems.map((item) => {
              const isActive = activeCategory === item.value;
              return (
                <button
                  key={item.value}
                  onClick={() => handleCategoryClick(item.value)}
                  className={`relative text-xs tracking-[0.25em] font-light py-2 transition-all duration-300 hover:text-neutral-950 ${
                    isActive ? 'text-black font-semibold' : 'text-neutral-500'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-black"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Utility Icons - Right */}
          <div className="flex items-center space-x-2 sm:space-x-4" id="utility-nav">
            <button
              id="search-toggle"
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-neutral-600 hover:text-black transition-colors rounded-full hover:bg-neutral-50"
              aria-label="Search items"
            >
              <Search className="w-4 h-4 sm:w-5 h-5" />
            </button>
            <button
              id="profile-btn"
              className="p-2 text-neutral-600 hover:text-black transition-colors rounded-full hover:bg-neutral-50 hidden sm:inline-block"
              aria-label="User Account"
            >
              <User className="w-4 h-4 sm:w-5 h-5" />
            </button>
            <button
              id="cart-toggle"
              onClick={onCartOpen}
              className="p-2 text-neutral-600 hover:text-black transition-colors rounded-full hover:bg-neutral-50 relative"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-black text-white text-[9px] font-sans font-medium w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-50 md:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 bottom-0 left-0 w-4/5 max-w-sm bg-white z-50 p-6 flex flex-col justify-between shadow-2xl md:hidden"
              id="mobile-drawer"
            >
              <div>
                <div className="flex justify-between items-center mb-10">
                  <span className="font-serif text-xl tracking-[0.2em] text-neutral-900">BLYNG</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-neutral-500 hover:text-black transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex flex-col space-y-6">
                  {navItems.map((item) => (
                    <button
                      key={item.value}
                      onClick={() => handleCategoryClick(item.value)}
                      className={`text-left text-sm tracking-[0.2em] font-light py-2 border-b border-neutral-50 hover:pl-2 transition-all duration-300 ${
                        activeCategory === item.value ? 'text-black font-semibold border-neutral-800' : 'text-neutral-500'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-100 flex flex-col space-y-4">
                <button className="flex items-center gap-3 text-xs tracking-wider text-neutral-600">
                  <User className="w-4 h-4" /> Account Profile
                </button>
                <div className="text-[10px] text-neutral-400 font-sans">
                  © 2026 BLYNG Jewelry. London.
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Top Slide-down Search Bar Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 border-b border-neutral-200"
            id="search-overlay"
          >
            <div className="max-w-4xl mx-auto px-6 py-6">
              <div className="flex items-center justify-between border-b border-neutral-300 pb-3">
                <div className="flex items-center flex-1 mr-4">
                  <Search className="w-5 h-5 text-neutral-400 mr-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for diamonds, rings, necklaces, bestsellers..."
                    className="w-full text-base font-light text-neutral-800 placeholder-neutral-400 bg-transparent outline-none border-none py-1"
                    autoFocus
                  />
                </div>
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="p-2 text-neutral-400 hover:text-black transition-colors rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Instant Search Results */}
              <div className="mt-4 max-h-96 overflow-y-auto">
                {searchQuery.trim() === '' ? (
                  <div className="py-6 text-center text-xs text-neutral-400 tracking-widest font-light">
                    Type to search our fine collections
                  </div>
                ) : filteredSearchResults.length === 0 ? (
                  <div className="py-6 text-center text-xs text-neutral-400 tracking-widest font-light">
                    No results found for "{searchQuery}"
                  </div>
                ) : (
                  <div className="space-y-4 py-2">
                    <p className="text-[10px] font-sans tracking-widest text-neutral-400 uppercase">
                      MATCHING PIECES ({filteredSearchResults.length})
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {filteredSearchResults.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => {
                            onProductClick(product);
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="flex gap-4 items-center p-2 rounded-lg hover:bg-neutral-50 cursor-pointer transition-colors"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 object-cover bg-neutral-100 rounded border border-neutral-100 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-serif font-medium text-neutral-900 truncate">
                              {product.name}
                            </h4>
                            <p className="text-[10px] text-neutral-400 tracking-wider capitalize">
                              {product.category}
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-xs text-neutral-900 font-sans font-medium">
                              £ {product.price.toFixed(2)}
                            </span>
                            <ArrowRight className="w-3 h-3 text-neutral-400 inline ml-2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
