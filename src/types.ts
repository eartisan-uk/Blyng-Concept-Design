export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'rings' | 'necklaces' | 'earrings' | 'bracelets';
  isNew?: boolean;
  isSale?: boolean;
  isBestseller?: boolean;
  description: string;
  details: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export interface HeroSlide {
  id: string;
  image: string;
  tag: string;
  seasonBadge: string;
  titleLine1: string;
  titleHighlight: string;
  titleLine2?: string;
  description: string;
  ctaText: string;
  category: 'all' | 'rings' | 'necklaces' | 'earrings' | 'bracelets';
  featuredMaterial: string;
}
