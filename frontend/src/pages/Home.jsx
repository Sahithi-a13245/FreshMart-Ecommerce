import Hero from "../components/Hero.jsx";
import FeaturedCategories from "../components/FeaturedCategories.jsx";
import FeaturedProducts from "../components/FeaturedProducts.jsx";
import SpecialOffers from "../components/SpecialOffers.jsx";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <FeaturedProducts />
      <SpecialOffers />
    </>
  );
}