import { useState } from 'react';
import { X, Plus, Minus, Star, ShieldCheck, Truck, RefreshCw, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToBag: (product: Product, quantity: number, size: string) => void;
}

export default function ProductModal({
  product,
  onClose,
  onAddToBag,
}: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [isAdded, setIsAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<'desc' | 'materials' | 'shipping'>('desc');

  if (!product) return null;

  // Define sizing options based on category
  const sizeOptions =
    product.category === 'rings'
      ? ['US 5', 'US 6', 'US 7', 'US 8']
      : product.category === 'necklaces'
      ? ['Standard (42cm)']
      : product.category === 'earrings'
      ? ['Standard (Pair)']
      : ['Standard (18cm)'];

  // Automatically select the first size option if not chosen
  if (!selectedSize && sizeOptions.length > 0) {
    setSelectedSize(sizeOptions[0]);
  }

  const handleAddToBag = () => {
    setIsAdded(true);
    onAddToBag(product, quantity, selectedSize);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Content container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="bg-white max-w-4xl w-full rounded-sm shadow-2xl relative z-10 overflow-hidden grid grid-cols-1 md:grid-cols-2 max-h-[90vh] md:max-h-none overflow-y-auto"
          id={`product-modal-${product.id}`}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-neutral-800 hover:text-black shadow-sm border border-neutral-100 transition-all duration-300"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Beautiful Product Image */}
          <div className="relative bg-neutral-50 h-[300px] sm:h-[400px] md:h-full flex items-center justify-center overflow-hidden border-r border-neutral-100">
            {product.isNew && (
              <span className="absolute top-6 left-6 z-10 bg-black text-white text-[9px] font-sans tracking-widest font-medium px-2.5 py-1 uppercase rounded-sm">
                NEW IN
              </span>
            )}
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: Fine Details Panel */}
          <div className="p-6 sm:p-8 flex flex-col justify-between overflow-y-auto text-left">
            <div className="space-y-4">
              <span className="text-[10px] font-sans tracking-[0.25em] text-neutral-400 uppercase">
                {product.category} COLLECTION
              </span>
              
              <h2 className="font-serif text-2xl sm:text-3xl font-light tracking-wide text-neutral-900">
                {product.name}
              </h2>

              {/* Star Rating */}
              <div className="flex items-center space-x-1.5">
                <div className="flex text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <span className="text-[10px] text-neutral-400 font-sans tracking-wider uppercase">
                  (5.0 — 12 REVIEWS)
                </span>
              </div>

              {/* Price Row */}
              <div className="flex items-center space-x-3 py-1 border-y border-neutral-100">
                {product.originalPrice ? (
                  <>
                    <span className="text-sm line-through text-neutral-400 font-sans">
                      £ {product.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-xl font-sans font-medium text-neutral-900">
                      £ {product.price.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-gold-600 bg-gold-50 border border-gold-100 px-2 py-0.5 font-sans uppercase">
                      SAVE £ {(product.originalPrice - product.price).toFixed(0)}
                    </span>
                  </>
                ) : (
                  <span className="text-xl font-sans font-medium text-neutral-900">
                    £ {product.price.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Size Selector */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs tracking-wider">
                  <span className="text-neutral-500">SELECT SIZE</span>
                  <button className="text-neutral-400 underline hover:text-black">SIZE GUIDE</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizeOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSelectedSize(opt)}
                      className={`px-4 py-2 text-xs tracking-widest border transition-all duration-300 rounded-sm ${
                        selectedSize === opt
                          ? 'border-black bg-black text-white font-medium'
                          : 'border-neutral-200 text-neutral-600 hover:border-neutral-400 bg-transparent'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-2">
                <span className="text-xs text-neutral-500 tracking-wider">QUANTITY</span>
                <div className="flex items-center border border-neutral-200 w-28 h-10 rounded-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex-1 h-full flex items-center justify-center text-neutral-500 hover:text-black hover:bg-neutral-50"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="flex-1 text-center font-sans text-sm text-neutral-900 font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex-1 h-full flex items-center justify-center text-neutral-500 hover:text-black hover:bg-neutral-50"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Accordion Tabs */}
              <div className="pt-2">
                <div className="flex border-b border-neutral-100 text-xs tracking-wider">
                  <button
                    onClick={() => setActiveTab('desc')}
                    className={`pb-2 pr-4 font-light border-b transition-all duration-300 ${
                      activeTab === 'desc' ? 'border-black text-black font-medium' : 'border-transparent text-neutral-400 hover:text-neutral-600'
                    }`}
                  >
                    DESCRIPTION
                  </button>
                  <button
                    onClick={() => setActiveTab('materials')}
                    className={`pb-2 px-4 font-light border-b transition-all duration-300 ${
                      activeTab === 'materials' ? 'border-black text-black font-medium' : 'border-transparent text-neutral-400 hover:text-neutral-600'
                    }`}
                  >
                    SPECS & DETAILS
                  </button>
                  <button
                    onClick={() => setActiveTab('shipping')}
                    className={`pb-2 pl-4 font-light border-b transition-all duration-300 ${
                      activeTab === 'shipping' ? 'border-black text-black font-medium' : 'border-transparent text-neutral-400 hover:text-neutral-600'
                    }`}
                  >
                    DELIVERY
                  </button>
                </div>

                <div className="py-3 text-xs leading-relaxed text-neutral-500 min-h-24">
                  {activeTab === 'desc' && (
                    <p>{product.description}</p>
                  )}
                  {activeTab === 'materials' && (
                    <ul className="list-disc pl-4 space-y-1">
                      {product.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  )}
                  {activeTab === 'shipping' && (
                    <div className="space-y-2">
                      <p className="flex items-center gap-2"><Truck className="w-3.5 h-3.5 text-neutral-400" /> Complimentary standard shipping inside UK & Europe.</p>
                      <p className="flex items-center gap-2"><RefreshCw className="w-3.5 h-3.5 text-neutral-400" /> Return within 30 days in its original pristine condition.</p>
                      <p className="flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5 text-neutral-400" /> Includes official certificate of authenticity and 2-year warranty.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="flex gap-4 pt-4 border-t border-neutral-100">
              <button
                onClick={handleAddToBag}
                disabled={isAdded}
                className={`flex-1 h-12 uppercase text-xs tracking-[0.25em] font-light transition-all duration-300 flex items-center justify-center ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-black text-white hover:bg-neutral-800'
                }`}
              >
                {isAdded ? 'ADDED TO BAG' : 'ADD TO BAG'}
              </button>
              
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`w-12 h-12 border border-neutral-200 flex items-center justify-center rounded-sm transition-all duration-300 ${
                  isWishlisted ? 'text-rose-500 border-rose-200 bg-rose-50/20' : 'text-neutral-400 hover:text-black hover:border-neutral-400'
                }`}
                aria-label="Add to wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
