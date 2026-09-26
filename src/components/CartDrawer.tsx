import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, CheckCircle, CreditCard, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number, size?: string) => void;
  onRemoveItem: (productId: string, size?: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'details' | 'success'>('cart');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [card, setCard] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 150;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingCost = isFreeShipping ? 0 : 15;
  const total = subtotal + shippingCost;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !address) return;
    setCheckoutStep('success');
  };

  const resetCheckout = () => {
    onClearCart();
    setCheckoutStep('cart');
    setName('');
    setEmail('');
    setAddress('');
    setCard('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            className="fixed top-0 bottom-0 right-0 w-full sm:w-[450px] bg-white z-50 flex flex-col justify-between shadow-2xl overflow-hidden border-l border-neutral-100 text-left"
            id="shopping-cart-drawer"
          >
            {/* Header */}
            <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg tracking-[0.15em] text-neutral-900 uppercase">
                  {checkoutStep === 'cart' && `SHOPPING BAG (${cartItems.length})`}
                  {checkoutStep === 'details' && 'SHIPPING DETAILS'}
                  {checkoutStep === 'success' && 'ORDER CONFIRMED'}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-neutral-400 hover:text-black transition-colors rounded-full"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-6">
              
              {checkoutStep === 'cart' && (
                <>
                  {/* Free Shipping Progress Widget */}
                  {cartItems.length > 0 && (
                    <div className="bg-neutral-50 p-4 border border-neutral-100 rounded-sm mb-6 space-y-2">
                      <div className="flex justify-between items-center text-xs tracking-wider">
                        <span className="text-neutral-500">
                          {isFreeShipping ? 'CONGRATULATIONS!' : 'FREE SHIPPING TRACKER'}
                        </span>
                        <span className="font-medium text-neutral-900">
                          {isFreeShipping ? '£0.00' : `£ ${(freeShippingThreshold - subtotal).toFixed(2)} to go`}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-black transition-all duration-500"
                          style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-neutral-400 font-sans tracking-wide">
                        {isFreeShipping
                          ? 'You qualify for complimentary premium shipping inside Europe.'
                          : 'Spend £150.00 or more to unlock complimentary premium shipping.'}
                      </p>
                    </div>
                  )}

                  {cartItems.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                      <div className="w-16 h-16 rounded-full bg-neutral-50 flex items-center justify-center border border-neutral-100">
                        <X className="w-6 h-6 text-neutral-300" />
                      </div>
                      <h3 className="font-serif text-lg tracking-wider text-neutral-800">Your bag is empty</h3>
                      <p className="text-xs text-neutral-400 max-w-xs font-light">
                        Discover elegant, handcrafted rings, necklaces and earrings of matchless brilliance to begin.
                      </p>
                      <button
                        onClick={onClose}
                        className="px-6 py-2.5 bg-black text-white hover:bg-neutral-800 text-xs tracking-[0.2em] uppercase font-light mt-4"
                      >
                        CONTINUE SHOPPING
                      </button>
                    </div>
                  ) : (
                    /* Cart list */
                    <div className="space-y-6">
                      {cartItems.map((item) => (
                        <div
                          key={`${item.product.id}-${item.selectedSize}`}
                          className="flex gap-4 pb-6 border-b border-neutral-100 items-start"
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            referrerPolicy="no-referrer"
                            className="w-20 h-20 object-cover bg-neutral-50 rounded-sm border border-neutral-100 shrink-0"
                          />
                          
                          <div className="flex-1 space-y-1.5 min-w-0">
                            <div className="flex justify-between items-start gap-2">
                              <h4 className="font-serif text-[14px] font-normal text-neutral-900 leading-tight truncate">
                                {item.product.name}
                              </h4>
                              <button
                                onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                                className="text-neutral-300 hover:text-rose-500 transition-colors p-1"
                                title="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <p className="text-[10px] text-neutral-400 tracking-wider">
                              SIZE: <span className="text-neutral-700 font-medium">{item.selectedSize || 'N/A'}</span>
                            </p>

                            <div className="flex justify-between items-end pt-1">
                              {/* Quantity selection inside cart */}
                              <div className="flex items-center border border-neutral-200 h-7 w-20 rounded-sm bg-neutral-50">
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1), item.selectedSize)}
                                  className="flex-1 h-full flex items-center justify-center text-neutral-500 hover:text-black"
                                >
                                  <Minus className="w-2.5 h-2.5" />
                                </button>
                                <span className="flex-1 text-center font-sans text-xs text-neutral-900">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1, item.selectedSize)}
                                  className="flex-1 h-full flex items-center justify-center text-neutral-500 hover:text-black"
                                >
                                  <Plus className="w-2.5 h-2.5" />
                                </button>
                              </div>

                              <span className="text-xs font-sans text-neutral-900 font-medium">
                                £ {(item.product.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {checkoutStep === 'details' && (
                <form onSubmit={handleCheckoutSubmit} className="space-y-4" id="checkout-form">
                  <div className="bg-neutral-50 p-4 border border-neutral-100 rounded-sm mb-4">
                    <p className="text-xs text-neutral-500 tracking-wide font-light">
                      Securing payment for your exquisite selection of <strong className="text-black">{cartItems.length} items</strong>.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] tracking-widest text-neutral-400 uppercase">FULL NAME</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full h-11 px-4 text-xs border border-neutral-200 rounded-sm outline-none focus:border-black"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] tracking-widest text-neutral-400 uppercase">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane.doe@example.com"
                      className="w-full h-11 px-4 text-xs border border-neutral-200 rounded-sm outline-none focus:border-black"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] tracking-widest text-neutral-400 uppercase">SHIPPING ADDRESS</label>
                    <textarea
                      required
                      rows={3}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Flat 4B, 12 Park Lane, London, W1K 7AA"
                      className="w-full p-4 text-xs border border-neutral-200 rounded-sm outline-none focus:border-black resize-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] tracking-widest text-neutral-400 uppercase flex items-center justify-between">
                      <span>CARD DETAIL (SIMULATED)</span>
                      <CreditCard className="w-3.5 h-3.5 text-neutral-400" />
                    </label>
                    <input
                      type="text"
                      required
                      value={card}
                      onChange={(e) => setCard(e.target.value)}
                      placeholder="4000 1234 5678 9010"
                      className="w-full h-11 px-4 text-xs border border-neutral-200 rounded-sm outline-none focus:border-black"
                    />
                  </div>

                  <div className="pt-4 flex items-center gap-2 text-[10px] text-neutral-400">
                    <ShieldCheck className="w-4 h-4 text-neutral-500 shrink-0" />
                    <span>Your transaction is encrypted by a secure simulated merchant gateway.</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full h-12 bg-black text-white hover:bg-neutral-800 text-xs tracking-[0.25em] font-light uppercase flex items-center justify-center gap-2 mt-6"
                  >
                    AUTHORIZE £ {total.toFixed(2)}
                  </button>

                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="w-full text-center text-xs text-neutral-400 hover:text-black tracking-wider pt-2 underline"
                  >
                    BACK TO BAG
                  </button>
                </form>
              )}

              {checkoutStep === 'success' && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-5 py-12" id="checkout-success">
                  <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-emerald-600" />
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-[10px] text-gold-600 tracking-[0.3em] font-light uppercase flex items-center justify-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-gold-500" /> ORDER ACQUIRED
                    </p>
                    <h3 className="font-serif text-2xl tracking-wide text-neutral-900">Thank you, {name}!</h3>
                    <p className="text-xs text-neutral-500 font-light max-w-xs leading-relaxed">
                      We have secured your order for exquisite BLYNG pieces. A signature certificate and delivery details have been transmitted to <strong className="text-black">{email}</strong>.
                    </p>
                  </div>

                  <div className="bg-neutral-50 p-4 border border-neutral-100 rounded-sm w-full text-xs font-mono space-y-1.5 text-neutral-600">
                    <div className="flex justify-between">
                      <span>ORDER NUMBER:</span>
                      <span className="font-semibold text-black">#BY-883902</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SHIP TO:</span>
                      <span className="text-black truncate max-w-40">{address}</span>
                    </div>
                  </div>

                  <button
                    onClick={resetCheckout}
                    className="px-8 py-3 bg-black text-white hover:bg-neutral-800 text-xs tracking-[0.2em] uppercase font-light w-full"
                  >
                    RETURN STOREFRONT
                  </button>
                </div>
              )}

            </div>

            {/* Footer Summary (Cart Subtotal & Checkout Button) */}
            {cartItems.length > 0 && checkoutStep === 'cart' && (
              <div className="p-6 border-t border-neutral-100 bg-neutral-50 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs tracking-wider text-neutral-500">
                    <span>SUBTOTAL</span>
                    <span className="font-sans font-medium text-neutral-900">
                      £ {subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs tracking-wider text-neutral-500">
                    <span>PREMIUM COURIER DELIVERY</span>
                    <span className="font-sans font-medium text-neutral-900">
                      {isFreeShipping ? 'FREE' : `£ ${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="border-t border-neutral-200 my-2 pt-2 flex justify-between text-sm tracking-widest text-neutral-900 font-semibold">
                    <span>ESTIMATED TOTAL</span>
                    <span className="font-sans font-medium">
                      £ {total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <button
                    onClick={() => setCheckoutStep('details')}
                    className="w-full h-12 bg-black text-white hover:bg-neutral-800 text-xs tracking-[0.25em] font-light uppercase flex items-center justify-center gap-2 transition-colors"
                  >
                    PROCEED TO CHECKOUT
                    <ArrowRight className="w-4 h-4 text-gold-300" />
                  </button>
                  <p className="text-[10px] text-center text-neutral-400 font-sans tracking-wide">
                    Complimentary jewelry polish pouch included with every order.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
