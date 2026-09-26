import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Filter, SlidersHorizontal, ArrowUp } from 'lucide-react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PromoTicker from './components/PromoTicker';
import ProductCard from './components/ProductCard';
import BrandBanner from './components/BrandBanner';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';

import { PRODUCTS } from './data';
import { Product, CartItem } from './types';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('blyng_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error parsing cart from storage', e);
      }
    }
  }, []);

  // Save cart to localStorage on state changes
  useEffect(() => {
    localStorage.setItem('blyng_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Monitor scroll height to show floating scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddToCart = (product: Product, quantity = 1, size = 'Standard') => {
    setCartItems((prevItems) => {
      const existingIdx = prevItems.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );

      if (existingIdx > -1) {
        const updated = [...prevItems];
        updated[existingIdx].quantity += quantity;
        triggerToast(`Added ${quantity}x ${product.name} (${size}) to your bag.`);
        return updated;
      } else {
        triggerToast(`Added ${product.name} (${size}) to your bag.`);
        return [...prevItems, { product, quantity, selectedSize: size }];
      }
    });
  };

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    // Quick add default size based on product type
    const defaultSize =
      product.category === 'rings'
        ? 'US 7'
        : product.category === 'necklaces'
        ? 'Standard (42cm)'
        : product.category === 'earrings'
        ? 'Standard (Pair)'
        : 'Standard (18cm)';
    handleAddToCart(product, 1, defaultSize);
  };

  const handleUpdateQuantity = (productId: string, quantity: number, size = 'Standard') => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId && item.selectedSize === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string, size = 'Standard') => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.product.id === productId && item.selectedSize === size))
    );
    triggerToast('Item removed from your shopping bag.');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleStoryClick = () => {
    const bannerEl = document.getElementById('brand-story-banner');
    if (bannerEl) {
      bannerEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter lists based on screen layout (Home layout vs Categorized Catalog View)
  const newInProducts = PRODUCTS.filter((p) => p.isNew);
  const bestsellerProducts = PRODUCTS.filter((p) => p.isBestseller);

  // Catalog filtering
  const filteredCatalogProducts = PRODUCTS.filter((product) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'sale') return !!product.isSale;
    return product.category === activeCategory;
  });

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex flex-col justify-between selection:bg-gold-200 selection:text-gold-900" id="blyng-root">
      
      {/* Toast Notification Bar */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white text-xs tracking-wider font-light px-5 py-4 shadow-2xl flex items-center gap-3 border border-neutral-800 rounded-sm"
          >
            <Sparkles className="w-4 h-4 text-gold-300 animate-pulse" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <Navbar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        cartCount={cartCount}
        onCartOpen={() => setIsCartOpen(true)}
        onProductClick={setSelectedProduct}
      />

      {/* Header Promo Message */}
      <div className="bg-neutral-50 py-2 text-center text-[10px] tracking-[0.25em] text-neutral-500 uppercase border-b border-neutral-100 font-sans">
        COMPLIMENTARY ENGRAVING ON ALL BESPOKE DIAMOND BANDS
      </div>

      {/* Main Body */}
      <main className="flex-grow">
        
        {/* If 'all' is active, show the exquisite visual storefront exactly like the requested screens */}
        {activeCategory === 'all' ? (
          <>
            {/* 1. Hero Section Slider */}
            <Hero onShopClick={(cat) => {
              if (cat && cat !== 'all') {
                setActiveCategory(cat as any);
              }
              const gridEl = document.getElementById('products-section');
              if (gridEl) {
                gridEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }} />

            {/* 2. Promo Marquee Ticker */}
            <PromoTicker />

            {/* 3. New In Grid Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" id="products-section">
              <div className="flex justify-between items-end mb-10 border-b border-neutral-100 pb-4">
                <div className="text-left">
                  <span className="text-[10px] font-sans tracking-[0.3em] text-neutral-400 font-light uppercase">
                    NEW ARRIVALS
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-light text-neutral-900 tracking-wide mt-1">
                    NEW IN
                  </h2>
                </div>
                <button
                  onClick={() => setActiveCategory('all')}
                  className="text-xs tracking-widest text-neutral-500 hover:text-black transition-colors uppercase font-light flex items-center gap-1 group"
                >
                  VIEW ALL
                  <span className="group-hover:translate-x-1.5 transition-transform">→</span>
                </button>
              </div>

              {/* Grid Layout of products in elegant 4 columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {newInProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onProductClick={setSelectedProduct}
                    onAddToCart={handleQuickAdd}
                  />
                ))}
              </div>
            </section>

            {/* 4. Brand Intermediate Banner */}
            <BrandBanner onStoryClick={handleStoryClick} />

            {/* 5. Bestsellers Grid Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <div className="flex justify-between items-end mb-10 border-b border-neutral-100 pb-4">
                <div className="text-left">
                  <span className="text-[10px] font-sans tracking-[0.3em] text-neutral-400 font-light uppercase">
                    OUR FAVORITES
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-light text-neutral-900 tracking-wide mt-1">
                    BESTSELLERS
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    // smooth scroll to grid
                    const gridEl = document.getElementById('products-section');
                    if (gridEl) gridEl.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs tracking-widest text-neutral-500 hover:text-black transition-colors uppercase font-light flex items-center gap-1 group"
                >
                  VIEW ALL
                  <span className="group-hover:translate-x-1.5 transition-transform">→</span>
                </button>
              </div>

              {/* Grid Layout of 4 products (larger card items, as in bento list) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {bestsellerProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onProductClick={setSelectedProduct}
                    onAddToCart={handleQuickAdd}
                  />
                ))}
              </div>
            </section>
          </>
        ) : (
          /* Active Filtered Catalog View (Rings, Necklaces, Sale, etc.) */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left" id="products-section">
            
            {/* Breadcrumbs */}
            <div className="flex items-center space-x-2 text-[10px] tracking-widest text-neutral-400 uppercase mb-4">
              <a href="/" onClick={(e) => { e.preventDefault(); setActiveCategory('all'); }} className="hover:text-black">HOME</a>
              <span>/</span>
              <span className="text-neutral-950 font-medium">{activeCategory}</span>
            </div>

            {/* Heading Header */}
            <div className="border-b border-neutral-200 pb-8 mb-10">
              <h2 className="font-serif text-4xl sm:text-5xl font-light tracking-wide text-neutral-900 uppercase">
                {activeCategory}
              </h2>
              <p className="text-xs text-neutral-500 font-light mt-3 max-w-2xl leading-relaxed">
                Discover our range of handcrafted, dazzling {activeCategory} pieces meticulously designed and detailed with high-clarity diamonds of exceptional fire.
              </p>
            </div>

            {/* Catalog Controls bar */}
            <div className="flex justify-between items-center bg-neutral-50 p-4 border border-neutral-100 rounded-sm mb-8">
              <div className="flex items-center gap-2 text-xs text-neutral-600">
                <SlidersHorizontal className="w-4 h-4 text-neutral-400" />
                <span>SHOWING {filteredCatalogProducts.length} DESIGNS</span>
              </div>
              <div className="flex items-center gap-4 text-xs font-light text-neutral-500">
                <button
                  onClick={() => setActiveCategory('all')}
                  className="hover:text-black transition-colors"
                >
                  CLEAR FILTERS
                </button>
              </div>
            </div>

            {/* Catalog Grid */}
            {filteredCatalogProducts.length === 0 ? (
              <div className="py-24 text-center text-sm text-neutral-400 tracking-widest font-light">
                No items found in this section. Explore our other collections!
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCatalogProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onProductClick={setSelectedProduct}
                    onAddToCart={handleQuickAdd}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Dynamic Trust Highlight bar */}
        <section className="bg-neutral-50 border-y border-neutral-100 py-12 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <h4 className="font-serif text-base tracking-wide text-neutral-900 font-normal">SOCIALLY RESPONSIBLE</h4>
              <p className="text-xs text-neutral-500 font-light leading-relaxed max-w-xs mx-auto">
                Every BLYNG gemstone is ethically sourced and conflict-free conforming to Kimberly standards.
              </p>
            </div>
            <div className="space-y-2 border-y md:border-y-0 md:border-x border-neutral-200 py-6 md:py-0">
              <h4 className="font-serif text-base tracking-wide text-neutral-900 font-normal">BESPOKE PACKAGING</h4>
              <p className="text-xs text-neutral-500 font-light leading-relaxed max-w-xs mx-auto">
                Orders arrive beautifully cocooned in custom soft velvet suede boxes with satin ribbon detailing.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-serif text-base tracking-wide text-neutral-900 font-normal">LIFETIME ASSURANCES</h4>
              <p className="text-xs text-neutral-500 font-light leading-relaxed max-w-xs mx-auto">
                We provide a comprehensive complimentary lifetime validation and stone tightening guarantee.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer
        onCategoryClick={setActiveCategory}
        onStoryClick={handleStoryClick}
      />

      {/* Floating Scroll-to-Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 left-6 z-40 w-11 h-11 bg-white hover:bg-neutral-900 hover:text-white border border-neutral-200 rounded-full flex items-center justify-center shadow-lg transition-all"
            title="Scroll to Top"
            id="scroll-to-top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Product Quick View / Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToBag={(prod, qty, size) => handleAddToCart(prod, qty, size)}
      />

      {/* Slide-out Shopping Bag Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
