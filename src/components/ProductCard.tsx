import React from 'react';
import { Eye, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  key?: string | number;
}

export default function ProductCard({
  product,
  onProductClick,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div
      onClick={() => onProductClick(product)}
      className="group relative flex flex-col justify-between bg-white overflow-hidden cursor-pointer p-3 border border-neutral-100 hover:border-neutral-200 transition-all duration-500"
      id={`product-card-${product.id}`}
    >
      {/* Badge container */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
        {product.isNew && (
          <span className="bg-black text-white text-[9px] font-sans tracking-widest font-medium px-2.5 py-1 uppercase rounded-sm">
            NEW
          </span>
        )}
        {product.isSale && (
          <span className="bg-neutral-800 text-white text-[9px] font-sans tracking-widest font-medium px-2.5 py-1 uppercase rounded-sm">
            SALE
          </span>
        )}
        {product.isBestseller && (
          <span className="bg-gold-500 text-white text-[9px] font-sans tracking-widest font-medium px-2.5 py-1 uppercase rounded-sm">
            BESTSELLER
          </span>
        )}
      </div>

      {/* Image container with ratio 1:1 */}
      <div className="relative aspect-square w-full overflow-hidden bg-neutral-50 mb-4 rounded-sm">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Dynamic Hover Action Overlay */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onProductClick(product);
            }}
            className="w-10 h-10 rounded-full bg-white text-black shadow-md hover:bg-neutral-900 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product, e);
            }}
            className="w-10 h-10 rounded-full bg-white text-black shadow-md hover:bg-neutral-900 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
            title="Add to Bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="flex flex-col space-y-1.5 px-1 pb-1">
        <p className="text-[10px] font-sans tracking-widest text-neutral-400 uppercase">
          {product.category}
        </p>
        <h3 className="font-serif text-[15px] font-normal text-neutral-900 tracking-wide line-clamp-1 group-hover:text-gold-600 transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center space-x-2 pt-0.5">
          {product.originalPrice ? (
            <>
              <span className="text-xs line-through text-neutral-400 font-sans">
                £ {product.originalPrice.toFixed(2)}
              </span>
              <span className="text-sm font-sans font-medium text-neutral-900">
                £ {product.price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-sm font-sans font-medium text-neutral-900">
              £ {product.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
