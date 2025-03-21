import React from 'react'

const ProductCard = ({ product, onAddToCart, onRemoveFromCart, onEditProduct, isAdmin }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative w-full h-48">
        <img
          src={product.images[0] || '/placeholder.svg'}
          alt={product.name}
          className="w-full h-full object-contain rounded-lg"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-2">
          {product.currency} {product.price}
        </p>
        <Button clickEvent={() => onAddToCart(product)} classes="bg-indigo-500 hover:bg-indigo-600 text-white w-full mb-2">
          Add to Cart
        </Button>

        {isAdmin && (
          <>
            <Button
              clickEvent={onEditProduct}
              classes="bg-yellow-500 hover:bg-yellow-600 text-white w-full mb-2"
            >
              Edit
            </Button>
            <Button
              clickEvent={() => onRemoveFromCart(product)}
              classes="bg-red-500 hover:bg-red-600 text-white w-full"
            >
              Delete
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
