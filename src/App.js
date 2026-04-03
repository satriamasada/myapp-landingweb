import { useState } from 'react';
import './App.css';

function App() {
  const [layout, setLayout] = useState('full');
  const [theme, setTheme] = useState('dark');

  const services = [
    {icon: '💡', title: 'Solusi Digital', text: 'Pengembangan software custom, aplikasi web dan mobile.'},
    {icon: '☁️', title: 'Cloud & Infrastruktur', text: 'Migrasi cloud, manajemen server, dan DevOps otomatis.'},
    {icon: '🔒', title: 'Keamanan Siber', text: 'Audit sistem, penetration testing, dan proteksi data.'},
    {icon: '🤖', title: 'AI & Otomasi', text: 'Machine learning, analytics, dan robot process automation.'},
    {icon: '📊', title: 'Data Analytics', text: 'Business intelligence, dashboard, dan insight berbasis data.'},
    {icon: '🔗', title: 'Integrasi Sistem', text: 'API development, middleware, dan sistem enterprise.'},
  ];

  const portfolio = [
    {logo: '🖥️', title: 'Sistem ERP', desc: 'ERP untuk manufaktur skala menengah hingga besar.'},
    {logo: '📱', title: 'Aplikasi Mobile', desc: 'Aplikasi Android/iOS untuk layanan fintech & healthtech.'},
    {logo: '🛍️', title: 'E-commerce', desc: 'Platform marketplace, payment gateway, dan analytics.'},
    {logo: '🏥', title: 'Sistem Kesehatan', desc: 'Elektronik health record, telemedicine, dan IoT medis.'},
    {logo: '🏦', title: 'Fintech Platform', desc: 'Digital banking, payment processing, dan crypto wallet.'},
    {logo: '🎓', title: 'E-Learning', desc: 'Platform pembelajaran online, LMS, dan virtual classroom.'},
  ];

  const products = [
    {icon: '📊', name: 'MitraBI', detail: 'Business Intelligence & dashboard interaktif real-time.'},
    {icon: '📦', name: 'MitraFlow', detail: 'Automasi workflow dan integrasi ERP/CRM.'},
    {icon: '💼', name: 'MitraSecure', detail: 'Solusi IAM, SSO, dan manajemen risiko TI.'},
    {icon: '🌐', name: 'MitraWeb', detail: 'Framework web modern, PWA, dan headless CMS.'},
    {icon: '📱', name: 'MitraMobile', detail: 'SDK mobile cross-platform, hybrid apps.'},
    {icon: '☁️', name: 'MitraCloud', detail: 'Managed cloud services, serverless, dan edge computing.'},
  ];

  return (
    <div className={`landing ${layout}-layout ${theme}-theme`}>
      <nav className="navbar">
        <div className="brand">Mitra Semesta Persada</div>
        <div className="nav-links">
          <a href="#about">Tentang Kami</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#products">Produk</a>
          <a href="#contact">Kontak</a>
        </div>
        <div className="nav-controls">
          <button title={layout === 'full' ? 'Switch to Boxed' : 'Switch to Fullscreen'} onClick={() => setLayout(layout === 'full' ? 'boxed' : 'full')}>
            {layout === 'full' ? '⊡' : '⛶'}
          </button>
          <button title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            {theme === 'light' ? '☽' : '☀'}
          </button>
        </div>
      </nav>

      <section className="hero parallax" id="home">
        <div className="hero-content">
          <div className="floating-card hero-card">
            <i className="fa-solid fa-rocket" />
            <h4>Start Up Ready</h4>
            <p>Mengakselerasi ide teknologi dengan cepat dan aman.</p>
            <a className="small-cta" href="#services">Kunjungi Layanan</a>
          </div>
          <h1>Mitra Solusi Teknologi Anda</h1>
          <p>Kami membantu bisnis tumbuh dengan transformasi digital dan sistem cerdas.</p>
          <a className="cta" href="#contact">Hubungi Kami Sekarang</a>
        </div>
      </section>

      <section className="section parallax about" id="about">
        <h2>Tentang Kami</h2>
        <p className="section-desc">
          Mitra Semesta Persada adalah mitra terpercaya dalam transformasi digital. Dengan pengalaman lebih dari 10 tahun,
          kami menghadirkan solusi teknologi inovatif yang mendorong pertumbuhan bisnis Anda ke level berikutnya.
        </p>
      </section>

      <section className="section cards parallax" id="services">
        <h2>Layanan Unggulan Kami</h2>
        <p className="section-desc">
          Dari konsep hingga implementasi, kami menyediakan layanan teknologi end-to-end yang disesuaikan dengan kebutuhan bisnis modern.
        </p>
        <div className="grid">
          {services.map((item) => (
            <article key={item.title} className="card">
              <div className="card-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section cards parallax" id="portfolio">
        <h2>Portfolio Proyek Kami</h2>
        <p className="section-desc">
          Beragam proyek sukses yang telah kami kembangkan untuk klien dari berbagai industri, membuktikan keahlian kami dalam dunia teknologi.
        </p>
        <div className="grid">
          {portfolio.map((item) => (
            <article key={item.title} className="card">
              <div className="card-icon">{item.logo}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section cards parallax" id="products">
        <h2>Produk Inovatif Kami</h2>
        <p className="section-desc">
          Platform dan tools siap pakai yang dirancang untuk mempercepat digitalisasi bisnis Anda dengan teknologi terkini.
        </p>
        <div className="grid">
          {products.map((item) => (
            <article key={item.name} className="card">
              <div className="card-icon">{item.icon}</div>
              <h3>{item.name}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section parallax" id="contact">
        <h2>Hubungi Kami Sekarang</h2>
        <p className="section-desc">
          Siap untuk memulai transformasi digital? Tim ahli kami siap membantu mewujudkan visi teknologi Anda.
        </p>
        <div className="contact-wrapper">
          <div className="contact-form floating-card">
            <h3>Kirimi kami pesan</h3>
            <form>
              <label>
                Nama
                <input type="text" placeholder="Nama Anda" />
              </label>
              <label>
                Email
                <input type="email" placeholder="email@contoh.com" />
              </label>
              <label>
                Pesan
                <textarea rows="4" placeholder="Tuliskan kebutuhan IT Anda" />
              </label>
              <button type="submit" className="cta">
                Kirim Pesan
              </button>
            </form>
          </div>

          <div className="contact-map">
            <div className="map-float-icon">
              <i className="fa-solid fa-location-dot"></i>
            </div>
            <div className="map-frame">
              <iframe
                title="Mitra Semesta Persada Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126054.79251707867!2d106.73096892384106!3d-6.177249926682578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f17f4e5f3f5d%3A0x5dfd23c5d90ff483!2sJakarta!5e0!3m2!1sen!2sid!4v1700000000000"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Mitra Semesta Persada. Semua hak cipta dilindungi.</p>
      </footer>
    </div>
  );
}

export default App;
