// src/pages/Inicio.tsx

import Carousel from "../components/Carousel/Carousel";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";
import Promotions from "../components/Promotions/Promotions";
import QuickViewSection from "../components/QuickViewSection/QuickViewSection";

export default function HomePage() {
  return (
    <div className="p-4">
      {/* Carousel Section */}
      <Carousel interval={5000} />
      
      {/* Quick View Section
      <div className="mt-8">
        <QuickViewSection />
      </div> */}

      {/* Featured Products Section */}
      <div className="mt-8">
        <FeaturedProducts />
      </div>

      {/* Promotions Section
      <div className="mt-8">
        <Promotions />
      </div> */}
    </div>
  );
}
