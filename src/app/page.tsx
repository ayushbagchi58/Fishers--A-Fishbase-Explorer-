import Banner from "../components/Banner/Banner";
import BlogSection from "../components/blogs";
import FishGallery from "../components/fishGallery";
import VideoSection from "../components/promoVidSec";
import SearchSec from "../components/searchSec";
import TestimonialSection from "../components/testimonial";
import WhyChooseUs from "../components/whyChoose";


export default function HomePage() {
  return (
    <main>
      <Banner />
      <WhyChooseUs/>
      <SearchSec/>
      <VideoSection/>
      <FishGallery/>
      <TestimonialSection/>
      <BlogSection/>
    </main>
  );
}
