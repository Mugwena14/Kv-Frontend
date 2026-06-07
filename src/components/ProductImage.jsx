import React, { useState } from "react";


export default function ProductImage({ product, size = 138 }) {
  const [broken, setBroken] = useState(false);

  if (product?.image && !broken) {
    return (
      <img
        src={product.image}
        alt={product.name}
        loading="lazy"
        onError={() => setBroken(true)}
        className="absolute inset-0 w-full h-full object-cover"
      />
    );
  }

}