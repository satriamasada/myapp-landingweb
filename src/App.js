import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [layout, setLayout] = useState('full');

  useEffect(() => {
    const clientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY || 'SB-Mid-client-xxxxxxxxxxxxxxxxxxxxxxxx';
    const isProd = (process.env.REACT_APP_MIDTRANS_IS_PRODUCTION || 'false').toLowerCase() === 'true';
    const scriptUrl = isProd
      ? 'https://app.midtrans.com/snap/snap.js'
      : 'https://app.sandbox.midtrans.com/snap/snap.js';

    let script = document.querySelector('script[data-midtrans-snap]');
    if (!script) {
      script = document.createElement('script');
      script.dataset.midtransSnap = 'true';
      script.type = 'text/javascript';
      script.src = scriptUrl;
      script.dataset.clientKey = clientKey;
      script.async = true;
      document.body.appendChild(script);
    } else {
      script.src = scriptUrl;
      script.dataset.clientKey = clientKey;
    }

    return () => {
      const existing = document.querySelector('script[data-midtrans-snap]');
      if (existing) existing.remove();
    };
  }, []);

  const [theme, setTheme] = useState('dark');
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    pesan: ''
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const { nama, email, pesan } = formData;
    if (!nama || !email || !pesan) {
      alert('Mohon isi semua field');
      return;
    }

    const message = `Halo, nama saya ${nama}. Email: ${email}. Pesan: ${pesan}`;
    const waLink = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
    window.open(waLink, '_blank');

    setFormData({ nama: '', email: '', pesan: '' });
  };

  const services = [
    { icon: '💡', title: 'Solusi Digital', text: 'Pengembangan software custom, aplikasi web dan mobile.' },
    { icon: '☁️', title: 'Cloud & Infrastruktur', text: 'Migrasi cloud, manajemen server, dan DevOps otomatis.' },
    { icon: '🔒', title: 'Keamanan Siber', text: 'Audit sistem, penetration testing, dan proteksi data.' },
    { icon: '🤖', title: 'AI & Otomasi', text: 'Machine learning, analytics, dan robot process automation.' },
    { icon: '📊', title: 'Data Analytics', text: 'Business intelligence, dashboard, dan insight berbasis data.' },
    { icon: '🔗', title: 'Integrasi Sistem', text: 'API development, middleware, dan sistem enterprise.' },
  ];

  const portfolio = [
    { logo: '🖥️', title: 'Sistem ERP', desc: 'ERP untuk manufaktur skala menengah hingga besar.' },
    { logo: '📱', title: 'Aplikasi Mobile', desc: 'Aplikasi Android/iOS untuk layanan fintech & healthtech.' },
    { logo: '🛍️', title: 'E-commerce', desc: 'Platform marketplace, payment gateway, dan analytics.' },
    { logo: '🏥', title: 'Sistem Kesehatan', desc: 'Elektronik health record, telemedicine, dan IoT medis.' },
    { logo: '🏦', title: 'Fintech Platform', desc: 'Digital banking, payment processing, dan crypto wallet.' },
    { logo: '🎓', title: 'E-Learning', desc: 'Platform pembelajaran online, LMS, dan virtual classroom.' },
  ];

  const products = [
    { icon: '📊', name: 'MitraBI', detail: 'Business Intelligence & dashboard interaktif real-time.' },
    { icon: '📦', name: 'MitraFlow', detail: 'Automasi workflow dan integrasi ERP/CRM.' },
    { icon: '💼', name: 'MitraSecure', detail: 'Solusi IAM, SSO, dan manajemen risiko TI.' },
    { icon: '🌐', name: 'MitraWeb', detail: 'Framework web modern, PWA, dan headless CMS.' },
    { icon: '📱', name: 'MitraMobile', detail: 'SDK mobile cross-platform, hybrid apps.' },
    { icon: '☁️', name: 'MitraCloud', detail: 'Managed cloud services, serverless, dan edge computing.' },
  ];

  const pricingPlans = [
    {
      id: 'landing',
      title: 'Landing Page',
      price: 350000,
      description: 'Satu halaman promosi produk/kampanye dengan form kontak dan analytics.',
      features: ['Desain responsif', 'SEO dasar', 'Form kontak + integrasi WA'],
    },
    {
      id: 'profil',
      title: 'Web Profil Perusahaan',
      price: 850000,
      description: 'Website korporat 5-10 halaman untuk profil, layanan, team, dan portfolio.',
      features: ['CMS ringan', 'Gallery & testimoni', 'Kontak & Google Maps'],
    },
    {
      id: 'custom',
      title: 'Custom Web',
      price: 2500000,
      description: 'Solusi web full custom dengan integrasi sistem dan fitur unik sesuai kebutuhan.',
      features: ['Fitur kustom', 'Admin panel', 'Integrasi API & payment gateway'],
    },
  ];

  const [orderStatus, setOrderStatus] = useState('');

  const handleOrder = async (plan) => {
    setOrderStatus(`Memproses order ${plan.title} (Rp ${plan.price.toLocaleString('id-ID')}) ...`);

    if (typeof window === 'undefined' || !window.snap) {
      setOrderStatus('Midtrans Snap JS belum tersedia. Pastikan script Midtrans telah dimuat di public/index.html.');
      return;
    }

    try {
      // Bersihkan slash di akhir apiBase jika ada
      const apiBase = (process.env.REACT_APP_API_URL || 'http://localhost:4000').replace(/\/$/, "");
      const timestamp = new Date().toISOString();

      // ========== PAYLOAD YANG AKAN DIKIRIM ==========
      const payloadData = {
        packageId: plan.id,
        packageName: plan.title,
        gross_amount: plan.price,
      };

      console.log('%c=== MIDTRANS POST REQUEST START ===', 'color: #0066ff; font-weight: bold; font-size: 14px;');
      console.log(`%cTimestamp: ${timestamp}`, 'color: #666; font-style: italic;');
      console.log(`%cEndpoint: ${apiBase}/api/midtrans/create-transaction`, 'color: #f0ad4e; font-weight: bold;');
      console.log('%cPayload (Request Body):', 'color: #28a745; font-weight: bold;');
      console.table(payloadData);
      console.log('%cPayload (JSON):', 'color: #28a745; font-weight: bold;');
      console.log(JSON.stringify(payloadData, null, 2));

      // Gunakan URL yang bersih tanpa double slash
      const response = await fetch(`${apiBase}/api/midtrans/create-transaction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payloadData),
      });

      console.log(`%cResponse Status: ${response.status} ${response.statusText}`, 'color: #17a2b8; font-weight: bold;');
      console.log('%cResponse Headers:', 'color: #17a2b8; font-weight: bold;');
      console.log('Content-Type:', response.headers.get('Content-Type'));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('%cError Response Body:', 'color: #dc3545; font-weight: bold;');
        console.error(errorText);
        throw new Error(`Gagal membuat transaksi Midtrans (Status ${response.status}). Periksa konfigurasi backend.`);
      }

      // ========== RESPONSE DARI SERVER ==========
      const responseData = await response.json();
      console.log('%cResponse Data (dari Backend):', 'color: #6f42c1; font-weight: bold;');
      console.table(responseData);
      console.log('%cResponse Data (JSON):', 'color: #6f42c1; font-weight: bold;');
      console.log(JSON.stringify(responseData, null, 2));

      const { token } = responseData;
      if (!token) {
        console.error('%cERROR: Token Midtrans tidak diterima dari backend!', 'color: #dc3545; font-weight: bold;');
        throw new Error('Token Midtrans tidak diterima dari backend.');
      }

      console.log(`%cToken Midtrans diterima: ${token.substring(0, 20)}...`, 'color: #28a745; font-weight: bold;');
      console.log('%c=== MIDTRANS POST REQUEST END (Sukses) ===', 'color: #0066ff; font-weight: bold; font-size: 14px;');

      // ========== PAYMENT CALLBACKS ==========
      window.snap.pay(token, {
        onSuccess: (result) => {
          console.log('%c=== MIDTRANS PAYMENT SUCCESS ===', 'color: #28a745; font-weight: bold; font-size: 14px;');
          console.log('%cTransaction Result:', 'color: #28a745; font-weight: bold;');
          console.table(result);
          setOrderStatus('Pembayaran berhasil: ' + (result.transaction_status || 'sukses'));
        },
        onPending: (result) => {
          console.log('%c=== MIDTRANS PAYMENT PENDING ===', 'color: #f0ad4e; font-weight: bold; font-size: 14px;');
          console.log('%cTransaction Result:', 'color: #f0ad4e; font-weight: bold;');
          console.table(result);
          setOrderStatus('Pembayaran pending: ' + (result.transaction_status || 'pending'));
        },
        onError: (result) => {
          console.log('%c=== MIDTRANS PAYMENT ERROR ===', 'color: #dc3545; font-weight: bold; font-size: 14px;');
          console.log('%cTransaction Result:', 'color: #dc3545; font-weight: bold;');
          console.table(result);
          setOrderStatus('Kesalahan pembayaran: ' + (result.status_message || 'error'));
        },
        onClose: () => {
          console.log('%c=== MIDTRANS PAYMENT CLOSED ===', 'color: #999; font-weight: bold; font-size: 14px;');
          console.log('User menutup modal pembayaran tanpa menyelesaikan transaksi');
          setOrderStatus('Pembayaran dibatalkan. Anda dapat mencoba lagi.');
        },
      });
    } catch (error) {
      console.error('%c=== MIDTRANS POST REQUEST END (ERROR) ===', 'color: #dc3545; font-weight: bold; font-size: 14px;');
      console.error('%cError Details:', 'color: #dc3545; font-weight: bold;');
      console.error(error);
      console.error('Stack Trace:', error.stack);
      setOrderStatus('Terjadi kesalahan saat memproses pembayaran: ' + error.message);
    }
  };

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

      <section className="section cards parallax" id="pricing">
        <h2>Pricing Paket Web</h2>
        <p className="section-desc">
          Pilih paket yang paling cocok untuk kebutuhan landing page atau profil perusahaan Anda.
        </p>
        <div className="grid">
          {pricingPlans.map((plan) => (
            <article key={plan.id} className="card">
              <div className="card-icon">💰</div>
              <h3>{plan.title}</h3>
              <p>{plan.description}</p>
              <p className="price">Rp {plan.price.toLocaleString('id-ID')}</p>
              <ul>
                {plan.features.map((feat, idx) => (
                  <li key={idx}>{feat}</li>
                ))}
              </ul>
              <button className="cta" onClick={() => handleOrder(plan)}>
                Order via Midtrans
              </button>
            </article>
          ))}
        </div>
        {orderStatus && <p className="order-status">{orderStatus}</p>}
        {/* <p className="section-desc" style={{ marginTop: '0.8rem', fontSize: '0.9rem' }}>
          Untuk integrasi penuh, siapkan endpoint backend `/api/midtrans/create-transaction` yang mengembalikan `token` Snap.
        </p> */}
      </section>

      <section className="section parallax" id="contact">
        <h2>Hubungi Kami Sekarang</h2>
        <p className="section-desc">
          Siap untuk memulai transformasi digital? Tim ahli kami siap membantu mewujudkan visi teknologi Anda.
        </p>
        <div className="contact-wrapper">
          <div className="contact-form floating-card">
            <h3>Kirimi kami pesan</h3>
            <form onSubmit={handleFormSubmit}>
              <label>
                Nama
                <input
                  type="text"
                  name="nama"
                  placeholder="Nama Anda"
                  value={formData.nama}
                  onChange={handleFormChange}
                  required
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="email@contoh.com"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                />
              </label>
              <label>
                Pesan
                <textarea
                  rows="4"
                  name="pesan"
                  placeholder="Tuliskan kebutuhan IT Anda"
                  value={formData.pesan}
                  onChange={handleFormChange}
                  required
                />
              </label>
              <button type="submit" className="cta">
                Kirim Pesan via WhatsApp
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
