export default function Hero() {
  return (
    <section
      className="hero"
      style={{
        backgroundImage:
          "url('https://readdy.ai/api/search-image?query=Fresh%20organic%20grocery%20store%20interior%20with%20abundant%20colorful%20fruits%20and%20vegetables%20displayed%20in%20wooden%20crates%20and%20baskets%2C%20natural%20lighting%20streaming%20through%20large%20windows%2C%20clean%20modern%20design%20with%20white%20walls%20and%20wooden%20shelves%2C%20eco-friendly%20atmosphere%20with%20green%20plants%2C%20minimalist%20aesthetic%20perfect%20for%20healthy%20lifestyle%20branding&width=1200&height=400&seq=hero001&orientation=landscape')"
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-inner">
        <div className="hero-content">
          <h2 className="hero-title">
            Fresh Groceries Delivered to Your Door
          </h2>
          <p className="hero-text">
            Shop from the comfort of your home and get farm-fresh produce,
            organic foods, and daily essentials delivered within hours.
          </p>
          <div className="button-row">
            <button className="btn-primary">Start Shopping</button>
            <button className="btn-secondary">View Offers</button>
          </div>
        </div>
      </div>
    </section>
  );
}