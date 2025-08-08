import { useState, type JSX } from "react";

interface Variant {
  id: string;
  options: string[];
}

interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  variants: Variant[];
  inStock: boolean;
}

function ProductCard({ image, name, price, variants, inStock }: ProductCardProps): JSX.Element {
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    variants.forEach(variant => {
      if (variant.options.length > 0) {
        initial[variant.id] = variant.options[0];
      }
    });
    return initial;
  });
  const [isAdded, setIsAdded] = useState(false);

  const getColorClass = (color: string) => {
    const specialColors = {
      'black': 'bg-black',
      'white': 'bg-white',
    };
    
    return specialColors[color.toLowerCase() as keyof typeof specialColors] || `bg-${color}-500`;
  };

  const handleVariantSelection = (variantId: string, option: string) => {
    setSelectedVariants(prev => ({
      ...prev,
      [variantId]: option
    }));
  };

  const handleAddToCart = () => {
    setIsAdded(!isAdded);
  };

  const getImageUrl = () => {
    const selectedColor = selectedVariants['color'];
    if (selectedColor && image.includes('-')) {
      const imageParts = image.split('-');
      imageParts[0] = selectedColor.toLowerCase();
      return imageParts.join('-');
    }
    return image;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full h-full hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <img 
        src={getImageUrl()} 
        alt={name} 
        className="w-full h-64 object-cover flex-shrink-0"
      />
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex items-start justify-between mb-2 gap-2">
          {/* NAME */}
          <h2 className="text-xl font-bold text-gray-800 flex-1 min-w-0">{name}</h2>
          {/* Add To Cart */}
          {inStock ? (
            <button 
              onClick={handleAddToCart}
              className={`text-white text-sm font-medium px-3 py-1 rounded-md transition-all duration-300 transform flex-shrink-0 ${
                isAdded 
                  ? 'bg-green-500 scale-110 animate-pulse' 
                  : 'bg-blue-500 hover:bg-blue-600 hover:scale-105'
              }`}
            >
              {isAdded ? (
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Added
                </span>
              ) : (
                'Add to Cart'
              )}
            </button>
          ) : (
            <span className="bg-red-100 text-red-600 text-sm font-medium px-3 py-1 rounded-md flex-shrink-0">
              Out of Stock
            </span>
          )}
        </div>
        <p className="text-2xl font-semibold text-green-600 mb-3">
          ${price.toFixed(2)}
        </p>
        <div className="flex flex-col gap-1 mt-auto">
          {variants.map((variant) => (
            <>
            <div className="flex flex-wrap gap-2" key={variant.id}>
              {variant.id === 'color' && 
                variant.options.map((option) => {
                  const isSelected = selectedVariants[variant.id] === option;
                  return (
                    <span 
                      key={option}
                      onClick={() => handleVariantSelection(variant.id, option)}
                      className={`w-8 h-8 rounded-full border-2 cursor-pointer hover:scale-110 transition-all duration-200 ${
                        isSelected 
                          ? 'border-blue-500 ring-2 ring-blue-200' 
                          : 'border-gray-300'
                      } ${getColorClass(option)}`}
                      title={option}
                    />
                  );
                })
              }
              </div>
              <div className="flex flex-wrap gap-2">
              {variant.id !== 'color' && (
                <div className="flex flex-wrap items-center gap-2">
                <label className="text-md font-medium text-gray-700">{variant.id.charAt(0).toUpperCase() + variant.id.slice(1).toLowerCase()}:</label>
                  {variant.options.map((option) => {
                    const isSelected = selectedVariants[variant.id] === option;
                    return (
                      <span 
                        key={option}
                        onClick={() => handleVariantSelection(variant.id, option)}
                        className={`border max-h-6 rounded-md p-2 cursor-pointer transition-all duration-200 flex items-center justify-center ${
                          isSelected 
                            ? 'border-blue-500 bg-blue-50 text-blue-700' 
                            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                        }`}
                      >
                        {option}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;