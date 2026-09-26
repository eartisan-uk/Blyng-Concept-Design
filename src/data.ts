import { Product, HeroSlide } from './types';

// Import all original product images so Vite bundles them correctly in the production build
import imgLurexDiamondRing from './assets/images/lurex_diamond_ring_1782909823298.jpg';
import imgAeroDropEarrings from './assets/images/aero_drop_earrings_1782909837075.jpg';
import imgAmuletChainNecklace from './assets/images/amulet_chain_necklace_1782909847508.jpg';
import imgChloeSignetRing from './assets/images/chloe_signet_ring_1782909887499.jpg';
import imgConnieLayeredRing from './assets/images/connie_layered_ring_1782909900520.jpg';
import imgEclipseStackingRing from './assets/images/eclipse_stacking_ring_1782909873973.jpg';
import imgRefinedTennisNecklace from './assets/images/refined_tennis_necklace_1782909858375.jpg';

// Import all generated luxury earring designs
import imgFloraBaguetteDrops from './assets/images/flora_baguette_drops_1784277579307.jpg';
import imgKnotTeardropDrops from './assets/images/knot_teardrop_drops_1784277602241.jpg';
import imgEmeraldHaloDrops from './assets/images/emerald_halo_drops_1784277615613.jpg';
import imgRubyMarquiseHalos from './assets/images/ruby_marquise_halos_1784277631124.jpg';
import imgAmethystRoyalChandeliers from './assets/images/amethyst_royal_chandeliers_1784277645238.jpg';
import imgEmpressWreathHoops from './assets/images/empress_wreath_hoops_1784277660423.jpg';

// Import hero images & slider campaign assets
import imgBlackWomanHero from './assets/images/black_woman_hero_1784277530659.jpg';
import imgBlyngHeroBanner from './assets/images/blyng_hero_banner_1782909809880.jpg';
import imgHeroSlideGemstones from './assets/images/hero_slide_gemstone_stack_1790154536849.jpg';
import imgHeroSlideAmberNecklace from './assets/images/hero_slide_amber_necklace_1790154546800.jpg';
import imgHeroSlideBaguetteRings from './assets/images/hero_slide_baguette_rings_1790154557189.jpg';
import imgHeroSlidePinkSapphire from './assets/images/hero_slide_pink_sapphire_1790154568470.jpg';

// Exquisite luxury jewelry statement pieces featuring the complete product collection
export const PRODUCTS: Product[] = [
  {
    id: 'lurex-diamond-ring',
    name: 'Lurex Diamond Ring',
    price: 380,
    image: imgLurexDiamondRing,
    category: 'rings',
    isNew: true,
    description: 'A classic yellow gold ring centering a sparkling, hand-selected round brilliant cut diamond in a clean, four-prong micro-pave setting.',
    details: [
      '18ct Yellow Gold band',
      '0.35 carat brilliant-cut round diamond',
      'Clarity: VS1, Color: G',
      'Polished luxury finish',
      'Made in London'
    ]
  },
  {
    id: 'aero-drop-earrings',
    name: 'Aero Drop Earrings',
    price: 150,
    image: imgAeroDropEarrings,
    category: 'earrings',
    isNew: true,
    isBestseller: true,
    description: 'Elegantly proportioned double teardrop earrings in 18ct yellow gold, embellished with delicate micropavé brilliant-cut diamonds that catch the light from every angle.',
    details: [
      '18ct Yellow Gold drop framing',
      'Total diamond weight: 0.22 carats',
      'Height: 28mm, Width: 12mm',
      'Secured with high-comfort butterfly backing',
      'Presented in a luxury velvet BLYNG signature box'
    ]
  },
  {
    id: 'flora-baguette-drops',
    name: 'Flora Baguette Drops',
    price: 450,
    image: imgFloraBaguetteDrops,
    category: 'earrings',
    isNew: true,
    description: 'A pair of exquisite diamond flower drop earrings, featuring cascading flower-like petals made of brilliant baguette-cut diamonds in a platinum setting.',
    details: [
      'Platinum-mounted settings',
      'Total diamond weight: 1.85 carats of baguette-cut diamonds',
      'Height: 35mm, Width: 18mm',
      'Secured with high-comfort butterfly backing',
      'Presented in a luxury velvet BLYNG signature box'
    ]
  },
  {
    id: 'amulet-chain-necklace',
    name: 'Amulet Chain Necklace',
    price: 190,
    image: imgAmuletChainNecklace,
    category: 'necklaces',
    isNew: true,
    description: 'A stunningly minimalist necklace featuring a delicate 18ct white gold chain and a circular medallion pendant encrusted with pave-set diamonds.',
    details: [
      '18ct White Gold fine chain',
      'Pendant diameter: 8mm',
      'Adjustable chain length: 40cm - 45cm',
      'Secured with a sturdy lobster clasp',
      'Ideal for everyday luxury layering'
    ]
  },
  {
    id: 'dual-coil-bracelet',
    name: 'Dual Coil Bracelet',
    price: 330,
    image: imgChloeSignetRing, // Elegant coil ring/bracelet style using the beautiful gold band
    category: 'bracelets',
    isNew: true,
    description: 'A signature sculptural piece designed to wrap around beautifully. Crafted in high-polish sterling silver with rows of micropavé diamond detailing.',
    details: [
      '925 Sterling Silver base with rhodium plating',
      'Genuine round brilliant accent diamonds',
      'Flexible wrap design for a comfortable fit',
      'Weight: 14.2g',
      'Designed in our studio'
    ]
  },
  {
    id: 'eclipse-stacking-ring',
    name: 'Eclipse Stacking Ring',
    price: 110,
    image: imgEclipseStackingRing,
    category: 'rings',
    isNew: true,
    description: 'An elegant rose gold band designed to be stacked, boasting a delicate crescent-shaped array of pave diamonds that nestles perfectly with other pieces.',
    details: [
      '18ct Rose Gold band',
      'Micropavé diamonds (0.08ct total weight)',
      'Band width: 1.5mm',
      'Faceted edge for optimal light reflection',
      'Engraved BLYNG hallmark'
    ]
  },
  {
    id: 'knot-teardrop-drops',
    name: 'Knot Teardrop Drops',
    price: 380,
    image: imgKnotTeardropDrops,
    category: 'earrings',
    isNew: true,
    description: 'A pair of luxury drop earrings featuring a tri-color gold (rose, yellow, and white gold) paved knot on top, dangling a textured and faceted teardrop made of brilliant yellow gold.',
    details: [
      '18ct Rose, Yellow, and White Gold combination',
      'Intricate pavé micro-diamonds (0.42ct total weight)',
      'Sculptural dangling teardrop pendants',
      'Comfort-fit post backings',
      'Handcrafted in our London studio'
    ]
  },
  {
    id: 'solar-pendant',
    name: 'Solar Pendant',
    price: 300,
    originalPrice: 410,
    image: imgAmuletChainNecklace, // similar style necklace
    category: 'necklaces',
    isNew: true,
    isSale: true,
    description: 'The Solar Pendant radiates timeless grace, showcasing a floating diamond sunburst suspended from a delicate polished 18ct gold chain.',
    details: [
      '18ct Yellow Gold chain and pendant mount',
      'A central 0.15ct diamond surrounded by 12 sunbeam micro-diamonds',
      'Adjustable chain length: 42cm - 47cm',
      'Signature lobster clasp closure',
      'Special collection celebratory release'
    ]
  },
  {
    id: 'emerald-halo-drops',
    name: 'Emerald Halo Drops',
    price: 520,
    image: imgEmeraldHaloDrops,
    category: 'earrings',
    isBestseller: true,
    description: 'A pair of luxury drop earrings featuring glowing green oval-cut emerald gemstones in the center, surrounded by micro-pave diamond halos, set in platinum.',
    details: [
      'Natural Colombian emeralds (1.20ct total weight)',
      'Surrounding micro-pavé diamonds: 0.35ct',
      'Height: 25mm, Width: 10mm',
      'Platinum 950 mounts',
      'Certified authentic by BLYNG Jewelry'
    ]
  },
  {
    id: 'chloe-signet-ring',
    name: 'Chloë Signet Ring',
    price: 210,
    image: imgChloeSignetRing,
    category: 'rings',
    isBestseller: true,
    description: 'A contemporary take on the classic signet ring. A clean circular face encrusted with dense white diamond pavé on a wide, comfortable band.',
    details: [
      '18ct White Gold high-gloss finish',
      'Pave diamond face cluster (0.25 carats)',
      'Tapered band for comfortable all-day wear',
      'BLYNG exclusive contemporary silhouette',
      'Handmade in our London workshop'
    ]
  },
  {
    id: 'ruby-marquise-halos',
    name: 'Ruby Marquise Halos',
    price: 490,
    image: imgRubyMarquiseHalos,
    category: 'earrings',
    isNew: true,
    description: 'A pair of high-end drop earrings featuring a stunning crimson red marquise-cut ruby in the center, framed by a double halo of brilliant round-cut diamonds, set in white gold.',
    details: [
      'A-grade Burmese rubies (1.10ct total weight)',
      'Double-tier brilliant round diamond halos (0.50ct total)',
      '18ct White Gold setting and post',
      'Length: 28mm',
      'Exceptional saturation and eye-clean clarity'
    ]
  },
  {
    id: 'connie-layered-ring',
    name: 'Connie Layered Ring',
    price: 270,
    image: imgConnieLayeredRing,
    category: 'rings',
    isBestseller: true,
    description: 'Create the effortless look of layered bands in a single, comfortable statement piece. Features alternating rows of high-polished gold and sparkling diamonds.',
    details: [
      '18ct Yellow Gold multi-band fusion',
      'Three interlinked bands with 0.18ct total diamond pave',
      'Width of stacked band: 6mm',
      'Durable, smooth interior profile',
      'Best seller worldwide'
    ]
  },
  {
    id: 'amethyst-royal-chandeliers',
    name: 'Amethyst Royal Chandeliers',
    price: 340,
    image: imgAmethystRoyalChandeliers,
    category: 'earrings',
    isBestseller: true,
    description: 'A pair of exquisite purple amethyst chandelier drop earrings, featuring dangling pear-shaped amethyst gemstones and micro-pave diamond filigree, set in white gold.',
    details: [
      'Deep purple pear-shaped amethysts',
      'Vibrant diamond pavé filigree accenting (0.28ct)',
      '18ct White Gold fine chandelier framing',
      'Height: 45mm, Width: 20mm',
      'Dramatically catching the light with movement'
    ]
  },
  {
    id: 'empress-wreath-hoops',
    name: 'Empress Wreath Hoops',
    price: 610,
    image: imgEmpressWreathHoops,
    category: 'earrings',
    isBestseller: true,
    description: 'A pair of royal emerald and blue sapphire open hoop earrings, forming an elegant floral wreath with sparkling marquise-cut diamonds, set in platinum.',
    details: [
      'Vivid green emeralds and royal blue sapphires',
      'Selected marquise-cut diamonds: 0.45ct total weight',
      'Platinum 950 wreath structure',
      'Diameter: 22mm',
      'Exquisite multi-stone setting showing incredible contrast'
    ]
  },
  {
    id: 'refined-tennis-necklace',
    name: 'Refined Tennis Necklace',
    price: 1200,
    image: imgRefinedTennisNecklace,
    category: 'necklaces',
    isBestseller: true,
    description: 'The ultimate investment of sophistication. A continuous stream of hand-selected brilliant-cut diamonds draped on a fluid white gold collar setting that rests perfectly.',
    details: [
      '18ct White Gold prong settings',
      'Total diamond weight: 4.5 carats',
      'Clarity: VS2, Color: F-G',
      'Length: 42cm',
      'Concealed security clasp with double safety latches',
      'Certified authentic by BLYNG Jewelry'
    ]
  }
];

export const HERO_IMAGE_URL = imgBlackWomanHero;
export const BLYNG_HERO_BANNER_URL = imgBlyngHeroBanner;

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'gemstone-spectrum',
    image: imgHeroSlideGemstones,
    tag: 'THE SPECTRUM COLLECTION',
    seasonBadge: 'NEW CAMPAIGN 2026',
    titleLine1: 'WEAR WHAT',
    titleHighlight: 'DAZZLES',
    titleLine2: 'UNAPOLOGETICALLY.',
    description: 'Vibrant rainbow eternity bands set with saturated Colombian emeralds, Burmese rubies, and royal blue sapphires in solid 18ct yellow gold.',
    ctaText: 'EXPLORE RINGS',
    category: 'rings',
    featuredMaterial: '18ct Gold · Emerald · Ruby · Sapphire'
  },
  {
    id: 'amber-sunset-suite',
    image: imgHeroSlideAmberNecklace,
    tag: 'THE ATELIER SUITE',
    seasonBadge: 'HAUTE JOAILLERIE',
    titleLine1: 'ARCHITECTURAL',
    titleHighlight: 'RADIANCE',
    titleLine2: 'IN SILK & GOLD.',
    description: 'Emerald-cut sunset sapphires and golden micropavé halos engineered with architectural precision for grand evening entrances.',
    ctaText: 'EXPLORE SUITES',
    category: 'necklaces',
    featuredMaterial: '18ct Yellow Gold · Sunset Sapphires · Pavé Diamonds'
  },
  {
    id: 'baguette-harmony-stacks',
    image: imgHeroSlideBaguetteRings,
    tag: 'ETERNITY IN HARMONY',
    seasonBadge: 'SIGNATURE ESSENTIALS',
    titleLine1: 'STACKED',
    titleHighlight: 'PERFECTION',
    titleLine2: 'EVERYDAY BRILLIANCE.',
    description: 'Hand-selected baguette-cut diamonds interwoven across yellow, white, and rose gold bands for effortless modern layering.',
    ctaText: 'SHOP ETERNITY BANDS',
    category: 'rings',
    featuredMaterial: 'Tri-Gold 18ct · Hand-Selected Baguette Diamonds'
  },
  {
    id: 'pink-sapphire-blossom',
    image: imgHeroSlidePinkSapphire,
    tag: 'BLOSSOM MAJESTY',
    seasonBadge: 'LIMITED ATELIER EDITION',
    titleLine1: 'POETRY IN',
    titleHighlight: 'BLOSSOM',
    titleLine2: 'ROYAL HIGH JEWELRY.',
    description: 'Rare untreated pink sapphire floral garlands matched with articulated chandelier earrings and fluid couture wrist silhouettes.',
    ctaText: 'DISCOVER HIGH JEWELRY',
    category: 'earrings',
    featuredMaterial: 'Platinum & 18ct White Gold · Natural Pink Sapphires'
  }
];
