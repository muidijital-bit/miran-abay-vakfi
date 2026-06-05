import React, { useEffect, useRef, useState } from "react";
import SpiralHero from "./SpiralHero";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { ReactLenis } from "lenis/react";
import { motion } from "framer-motion";
import {
  FiHeart, FiMapPin, FiMail, FiPhone, FiSend, FiUsers,
  FiChevronLeft, FiChevronRight, FiMenu, FiX, FiZoomIn
} from "react-icons/fi";
import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-[#f4f2ef] min-h-screen text-[#111] font-sans selection:bg-[#c9a227] selection:text-[#060e20] relative">
        <ReactLenis root options={{ lerp: 0.05 }}>
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/neler-yapiyoruz" element={<NelerYapiyoruz />} />
            <Route path="/biz-kimiz" element={<BizKimiz />} />
            <Route path="/neler-yaptik" element={<NelerYaptik />} />
            <Route path="/neler-yapabilirsiniz" element={<NelerYapabilirsiniz />} />
            <Route path="/bize-ulasin" element={<BizeUlasin />} />
            <Route path="*" element={<Home />} />
          </Routes>
          <Footer />
        </ReactLenis>
      </div>
    </BrowserRouter>
  );
}

/* ── NAVBAR ── */
const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = isHome && !scrolled;

  const navLinks = [
    { name: "Ana Sayfa", path: "/" },
    { name: "Neler Yapıyoruz", path: "/neler-yapiyoruz" },
    { name: "Biz Kimiz", path: "/biz-kimiz" },
    { name: "Neler Yaptık", path: "/neler-yaptik" },
    { name: "Neler Yapabilirsiniz", path: "/neler-yapabilirsiniz" },
    { name: "Bize Ulaşın", path: "/bize-ulasin" },
  ];

  return (
    <nav className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500
      ${transparent
        ? "bg-transparent py-5"
        : "bg-white border-b border-gray-100 shadow-sm py-3"}`}>
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between gap-8">

        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img
            src="/logo-transparent.png"
            alt="Miran Abay Vakfı"
            className="h-20 w-auto object-contain"
          />
        </Link>

        {/* Orta linkler */}
        <div className="hidden lg:flex items-center gap-7 flex-1 justify-center">
          {navLinks.map((link, i) => {
            const active = location.pathname === link.path || (link.path !== "/" && location.pathname.startsWith(link.path));
            return (
              <Link key={i} to={link.path}
                className={`text-[12px] font-medium tracking-wide transition-all duration-200 py-1
                  ${active
                    ? "text-[#c9a227]"
                    : transparent
                    ? "text-white hover:text-[#c9a227]"
                    : "text-[#444] hover:text-[#0d1f3c]"}`}>
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Sağ — buton */}
        <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
          <Link to="/neler-yapabilirsiniz"
            className={`text-[11px] font-bold px-5 py-2.5 rounded-lg transition-all
              ${transparent
                ? "bg-white text-[#0d1f3c] hover:bg-[#c9a227] hover:text-white"
                : "bg-[#0d1f3c] text-white hover:bg-[#c9a227]"}`}>
            Bağış Yap
          </Link>
        </div>

        {/* Mobil hamburger */}
        <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen
            ? <FiX className={`text-xl ${transparent ? "text-white" : "text-[#0d1f3c]"}`} />
            : <FiMenu className={`text-xl ${transparent ? "text-white" : "text-[#0d1f3c]"}`} />}
        </button>
      </div>

      {/* Mobil menü */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-white border-t border-gray-100 px-6 py-5 flex flex-col gap-1 shadow-xl">
          {navLinks.map((link, i) => {
            const active = location.pathname === link.path || (link.path !== "/" && location.pathname.startsWith(link.path));
            return (
              <Link key={i} to={link.path} onClick={() => setMenuOpen(false)}
                className={`text-sm font-medium py-2.5 px-3 rounded-lg transition-colors
                  ${active ? "bg-[#f5f4f0] text-[#c9a227]" : "text-[#333] hover:bg-[#f5f4f0] hover:text-[#0d1f3c]"}`}>
                {link.name}
              </Link>
            );
          })}
          <Link to="/neler-yapabilirsiniz" onClick={() => setMenuOpen(false)}
            className="mt-3 bg-[#0d1f3c] text-white text-center text-sm font-bold py-3 rounded-lg hover:bg-[#c9a227] transition-colors">
            Bağış Yap
          </Link>
        </motion.div>
      )}
    </nav>
  );
};

/* ── DİYAGONAL GEÇİŞ ── */
const DiagDown = ({ from, to }: { from: string; to: string }) => (
  <div style={{ background: from, lineHeight: 0, display: "block" }}>
    <svg viewBox="0 0 1440 56" xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 56 }}>
      <polygon points="0,0 1440,56 1440,56 0,56" fill={from} />
      <polygon points="0,56 1440,0 1440,56" fill={to} />
    </svg>
  </div>
);

const DiagUp = ({ from, to }: { from: string; to: string }) => (
  <div style={{ background: from, lineHeight: 0, display: "block" }}>
    <svg viewBox="0 0 1440 56" xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 56 }}>
      <polygon points="0,56 1440,0 1440,56 0,56" fill={to} />
    </svg>
  </div>
);

/* ── 3D TİLT KARTI ── */
const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: y * 12, y: -x * 12 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      animate={{ rotateX: tilt.x, rotateY: tilt.y, scale: tilt.x !== 0 ? 1.02 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      style={{ transformStyle: "preserve-3d", perspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ── HOME ── */
const Home = () => (
  <div className="w-full">
    <SpiralHero />
    <DiagDown from="#060e20" to="#0d1f3c" />
    <ActionStrip />
    <DiagUp from="#0d1f3c" to="#ffffff" />
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <ProjelerSection />
        <MisyonSection />
      </div>
    </div>
    <HomeDestek />
  </div>
);

/* ── HERO ── */
const HeroZairity = () => (
  <div className="relative min-h-screen flex flex-col overflow-hidden">
    {/* Arka plan fotoğrafı */}
    <img
      src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2670&auto=format&fit=crop"
      className="absolute inset-0 w-full h-full object-cover"
      alt=""
    />
    {/* Koyu yeşil overlay */}
    <div className="absolute inset-0 bg-[#060e20]/72" />

    {/* İçerik */}
    <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 text-center pt-24 pb-16">
      <motion.p
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="text-[#c9a227] text-xs font-bold tracking-[0.35em] uppercase mb-6">
        Miran Abay Vakfı
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }}
        className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] max-w-4xl mb-6">
        Her El Bir Umut,<br />Her Adım Bir Değişim.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
        className="text-white/65 text-base md:text-lg max-w-xl leading-relaxed mb-12">
        İhtiyaç sahiplerine uzanan el, değişimin başlangıcıdır. Bağış yaparak veya gönüllü olarak fark yaratın.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
        className="flex flex-wrap gap-4 justify-center">
        <Link to="/neler-yapabilirsiniz"
          className="bg-[#c9a227] text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-[#b89320] transition-all shadow-xl shadow-[#c9a227]/30">
          Bağış Yapın
        </Link>
        <Link to="/neler-yapiyoruz"
          className="border border-white/30 text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-white/10 transition-all">
          Projelerimizi İnceleyin
        </Link>
      </motion.div>
    </div>

  </div>
);

/* ── ACTION STRIP ── */
const ActionStrip = () => (
  <div className="bg-[#0d1f3c] py-12">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        initial="initial" whileInView="animate" viewport={{ once: true }} transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600&auto=format&fit=crop", tag: null, title: "5+ Aktif Proje", sub: "Alanında sürdürülen çalışmalar" },
          { img: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=600&auto=format&fit=crop", tag: "Bağış", title: "Bağış Yapın", sub: "Yardımınız, bir hayatı değiştirebilir." },
          { img: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=600&auto=format&fit=crop", tag: "Gönüllü", title: "Gönüllü Olun", sub: "Becerilerinizi toplum için kullanın." },
        ].map((item, i) => (
          <motion.div key={i}
            variants={{ initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 } }}
            className="relative h-72 rounded-[20px] overflow-hidden group">
            <img src={item.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 bg-white rounded-2xl p-4 shadow-xl">
              {item.tag && <div className="text-[9px] font-bold text-[#c9a227] uppercase tracking-[0.25em] mb-1">{item.tag}</div>}
              <div className="font-bold text-[#0d1f3c] mb-1 text-sm">{item.title}</div>
              <p className="text-xs text-[#777] leading-relaxed mb-2">{item.sub}</p>
              <Link to="/neler-yapabilirsiniz" className="text-xs font-bold text-[#0d1f3c] hover:text-[#c9a227] transition-colors">
                Hemen Başla →
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </div>
);

/* ── PROJELER ── */
const ProjelerSection = () => (
  <section className="py-20">
    <div className="flex items-end justify-between mb-12">
      <div>
        <p className="text-[#c9a227] text-xs font-bold tracking-[0.3em] uppercase mb-3">Projelerimiz</p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#0d1f3c]">Neler Yapıyoruz?</h2>
      </div>
      <Link to="/neler-yapiyoruz" className="hidden md:flex items-center gap-1 text-sm font-bold text-[#0d1f3c] hover:text-[#c9a227] transition-colors">
        Tümünü Gör <FiChevronRight />
      </Link>
    </div>

    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="relative h-[380px] rounded-[28px] overflow-hidden mb-4 group cursor-pointer">
      <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1600&auto=format&fit=crop"
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#060e20]/85 via-[#060e20]/40 to-transparent" />
      <div className="absolute bottom-0 left-0 p-10 max-w-xl">
        <div className="text-[#c9a227] text-[9px] font-bold tracking-[0.3em] uppercase mb-3">Öne Çıkan Proje</div>
        <h3 className="text-3xl font-bold text-white mb-3">Yaşlılar Merkezi Projesi</h3>
        <p className="text-white/60 text-sm leading-relaxed">İhtiyaç sahibi yaşlılarımız için bedelsiz hizmet, bakım ve sosyal destek merkezi.</p>
      </div>
    </motion.div>

    <motion.div
      initial="initial" whileInView="animate" viewport={{ once: true }} transition={{ staggerChildren: 0.08 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[
        { title: "Yardım Hattı Projesi", desc: "Uzman kadromuzla bedelsiz danışmanlık hizmeti.", img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=600&auto=format&fit=crop" },
        { title: "Mobil Sağlık Projesi", desc: "Zor bölgelere sağlık hizmeti götürüyoruz.", img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600&auto=format&fit=crop" },
        { title: "Eğitim Desteği Projesi", desc: "Burs ve staj imkânlarıyla gençlere destek.", img: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?q=80&w=600&auto=format&fit=crop" },
      ].map((p, i) => (
        <motion.div key={i} variants={{ initial: { y: 16, opacity: 0 }, animate: { y: 0, opacity: 1 } }}>
          <TiltCard className="relative h-52 rounded-[20px] overflow-hidden group cursor-pointer block">
            <img src={p.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={p.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060e20]/80 via-[#060e20]/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="text-sm font-bold text-white mb-1">{p.title}</h3>
              <p className="text-white/55 text-xs leading-relaxed">{p.desc}</p>
            </div>
          </TiltCard>
        </motion.div>
      ))}
    </motion.div>
  </section>
);

/* ── MİSYON ── */
const MisyonSection = () => (
  <section className="pb-20">
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-8">
      <div>
        <p className="text-[#c9a227] text-xs font-bold tracking-[0.3em] uppercase mb-4">Hakkımızda</p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#0d1f3c] mb-6 leading-snug">
          Misyonumuz İnsanlığa<br />Hizmet Etmektir
        </h2>
        <p className="text-[#666] leading-relaxed mb-6 text-[15px]">
          Miran Abay Vakfı; çatışmalardan, doğal afetlerden ve yoksulluktan etkilenen insanlara insani yardım ulaştırmak için kurulmuştur.
        </p>
        <ul className="space-y-3 mb-8">
          {["İhtiyaç sahiplerine zamanında ulaşmak", "Eğitim ve sağlık desteği sunmak", "Toplumsal dayanışmayı güçlendirmek"].map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-sm text-[#555]">
              <span className="w-5 h-5 rounded-full bg-[#c9a227]/10 flex items-center justify-center text-[#c9a227] flex-shrink-0 text-xs font-bold">✓</span>
              {item}
            </li>
          ))}
        </ul>
        <Link to="/biz-kimiz" className="inline-flex items-center gap-1 text-sm font-bold text-[#0d1f3c] border-b border-[#0d1f3c] pb-0.5 hover:text-[#c9a227] hover:border-[#c9a227] transition-colors">
          Daha Fazla Öğren →
        </Link>
      </div>
      <div className="relative">
        <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop"
          className="w-full h-[420px] object-cover rounded-[28px] shadow-lg" alt="Misyon" />
        <div className="absolute -bottom-5 -left-5 bg-[#0d1f3c] text-white rounded-[18px] px-6 py-4 shadow-xl">
          <div className="text-2xl font-black">2024</div>
          <div className="text-white/50 text-[9px] uppercase tracking-widest">Kuruluş Yılı</div>
        </div>
      </div>
    </motion.div>

    <div className="bg-[#060e20] rounded-[24px] px-8 md:px-14 py-10 flex flex-col md:flex-row items-center gap-5">
      <div className="text-5xl text-[#c9a227] font-serif leading-none select-none flex-shrink-0">"</div>
      <p className="text-white/75 text-lg md:text-xl font-medium leading-relaxed text-center md:text-left">
        Hiç kimsenin yalnız kalmadığı, her insanın onurlu bir yaşam sürebildiği bir dünya.
      </p>
      <div className="text-5xl text-[#c9a227] font-serif leading-none select-none flex-shrink-0 self-end rotate-180">"</div>
    </div>
  </section>
);

/* ── İSTATİSTİK ── */
/* ── HOME DESTEK CTA ── */
const HomeDestek = () => (
  <section className="relative overflow-hidden" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2000&auto=format&fit=crop)", backgroundSize: "cover", backgroundPosition: "center" }}>
    <div className="absolute inset-0 bg-[#060e20]/80" />
    <div className="relative z-10 max-w-3xl mx-auto px-6 py-24 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <p className="text-[#c9a227] text-xs font-bold tracking-[0.3em] uppercase mb-5">Siz De Katılın</p>
        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-snug">
          Değişimin Parçası<br />Olun
        </h2>
        <p className="text-white/60 leading-relaxed mb-10 max-w-lg mx-auto">
          Küçük bir adım, büyük bir fark yaratabilir. Bağış yaparak veya gönüllü olarak ailemize katılın.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/neler-yapabilirsiniz"
            className="bg-[#c9a227] text-white px-10 py-4 rounded-full font-bold hover:bg-[#b89320] transition-colors shadow-lg shadow-[#c9a227]/30">
            Bağış Yap
          </Link>
          <Link to="/neler-yapabilirsiniz"
            className="border border-white/30 text-white px-10 py-4 rounded-full font-bold hover:bg-white/10 transition-colors">
            Gönüllü Ol
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

/* ── INNER HERO ── */
const InnerHero = ({ title, subtitle, img }: { title: string; subtitle: string; img: string }) => (
  <div className="bg-[#f5f4f0] pt-24 pb-10 border-b border-[#e2ddd6] relative overflow-hidden">
    {/* Sağ taraf fotoğraf dekorasyonu */}
    <div className="absolute right-0 top-0 w-2/5 h-full hidden md:block pointer-events-none">
      <img src={img} className="w-full h-full object-cover opacity-30" alt="" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#f5f4f0] via-[#f5f4f0]/60 to-transparent" />
    </div>
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
        className="text-[#c9a227] text-[10px] font-bold tracking-[0.3em] uppercase mb-3">{subtitle}</motion.p>
      <motion.h1 initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
        className="text-4xl md:text-6xl font-black text-[#0d1f3c] leading-tight">{title}</motion.h1>
    </div>
  </div>
);

/* ── NELER YAPIYORUZ ── */
const projects = [
  {
    title: "Yaşlılar Merkezi Projesi",
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1200&auto=format&fit=crop",
    content: "İhtiyaç sahibi ve herhangi bir hizmete ya da temel ihtiyaçlarına ulaşmakta zorlanan tüm yaşlılarımız için bedelsiz bir merkez kuruyoruz. Yaşlılarımızın yalnız hissetmemesi, sosyal ve tıbbi destek alabilmesi için çalışıyoruz.",
  },
  {
    title: "Yardım Hattı Projesi",
    img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop",
    content: "Ülke çapında farklı branşlardan uzmanlar eşliğinde, bedelsiz danışmanlık ve destek hizmeti sunuyoruz. Hukuki, psikolojik, sağlık ve sosyal destek konularında herkesin ulaşabileceği bir hat.",
  },
  {
    title: "Mobil Araç Projesi",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
    content: "Erişimi zor bölgelere KBB, göz muayene ve diş muayene üniteleriyle sağlık hizmeti götürüyoruz. Mobil araçlarımızla kırsal kesimdeki vatandaşlarımıza yerinde destek sağlıyoruz.",
  },
  {
    title: "Hayat Desteği Projesi",
    img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop",
    content: "İhtiyaç sahibi kişilerin temel ihtiyaçlarına kavuşmaları ve iş bulma konusunda destek almaları için çalışıyoruz. Gıda, giyim ve barınma desteğinin yanında mesleki gelişim imkânları sunuyoruz.",
  },
  {
    title: "Eğitim Desteği Projesi",
    img: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?q=80&w=1200&auto=format&fit=crop",
    content: "Yaş ya da milliyet ayrımı yapılmadan eğitim hayatı boyunca öğrencileri destekliyoruz. Burs imkânları, staj ve iş bağlantıları ile gençlerin geleceğe umutla bakmasını sağlıyoruz.",
  },
];

const NelerYapiyoruz = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white pb-32">
    <InnerHero title="Neler Yapıyoruz" subtitle="Projelerimiz" img="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2670&auto=format&fit=crop" />

    <div className="max-w-6xl mx-auto px-6 mt-16">

      {/* Kısa giriş */}
      <motion.p
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="text-[#666] text-lg max-w-2xl leading-relaxed mb-14">
        İhtiyaç sahibi bireylere ulaşmak için farklı alanlarda 5 aktif proje yürütüyoruz. Her proje, kalıcı bir değişim yaratma hedefiyle hayata geçirilmiştir.
      </motion.p>

      {/* Büyük featured kart — ilk proje */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="relative rounded-[28px] overflow-hidden mb-6 group cursor-pointer h-[420px]">
        <img src={projects[0].img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={projects[0].title} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060e20]/85 via-[#060e20]/50 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-10 md:p-14 max-w-2xl">
          <span className="text-[#c9a227] text-[10px] font-bold tracking-[0.3em] uppercase mb-3">Öne Çıkan Proje</span>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-snug">{projects[0].title}</h2>
          <p className="text-white/65 text-sm leading-relaxed">{projects[0].content}</p>
        </div>
      </motion.div>

      {/* 2×2 kart grid — kalan 4 proje */}
      <motion.div
        initial="initial" whileInView="animate" viewport={{ once: true }} transition={{ staggerChildren: 0.09 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {projects.slice(1).map((p, i) => (
          <motion.div key={i} variants={{ initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 } }}>
          <TiltCard className="bg-white border border-[#e2ddd6] rounded-[24px] overflow-hidden group hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col h-full">
            {/* Fotoğraf */}
            <div className="relative h-52 overflow-hidden flex-shrink-0">
              <img src={p.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={p.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060e20]/20 to-transparent" />
            </div>
            {/* İçerik */}
            <div className="p-7 flex flex-col flex-1">
              <div className="w-6 h-0.5 bg-[#c9a227] rounded-full mb-4" />
              <h3 className="text-lg font-bold text-[#0d1f3c] mb-3 leading-snug">{p.title}</h3>
              <p className="text-[#777] text-sm leading-relaxed flex-1">{p.content}</p>
              <div className="mt-5 flex items-center gap-1.5 text-xs font-bold text-[#0d1f3c] group-hover:text-[#c9a227] transition-colors">
                Daha Fazla <FiChevronRight size={13} />
              </div>
            </div>
          </TiltCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Alt CTA */}
      <div className="bg-[#060e20] rounded-[24px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Bu projelere destek olmak ister misiniz?</h3>
          <p className="text-white/50 text-sm">Bağış yaparak veya gönüllü olarak fark yaratabilirsiniz.</p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <Link to="/neler-yapabilirsiniz" className="bg-[#c9a227] text-white px-7 py-3 rounded-full text-sm font-bold hover:bg-[#b89320] transition-colors whitespace-nowrap">
            Bağış Yap
          </Link>
          <Link to="/neler-yapabilirsiniz" className="border border-white/20 text-white px-7 py-3 rounded-full text-sm font-bold hover:bg-white/10 transition-colors whitespace-nowrap">
            Gönüllü Ol
          </Link>
        </div>
      </div>
    </div>
  </motion.div>
);

/* ── BİZ KİMİZ ── */
const values = [
  { title: "Merhamet", desc: "Yardım kararlarımızın merkezinde her zaman insan vardır. Empatiyle hareket ediyor, her bireyin hikâyesine kulak veriyoruz." },
  { title: "Sorumluluk", desc: "Bize duyulan güveni sonuna kadar taşıyoruz. Yaptığımız her işin hesabını verebilecek şekilde çalışıyoruz." },
  { title: "Dürüstlük", desc: "Kaynaklarımızın nasıl kullanıldığını açıkça paylaşıyor, her adımda şeffaf bir yönetim anlayışı sergiliyoruz." },
  { title: "Kapsayıcılık", desc: "Dil, din, milliyet fark etmeksizin yardıma ihtiyaç duyan herkese eşit mesafede duruyoruz." },
  { title: "Dayanışma", desc: "Gönüllülerimiz, bağışçılarımız ve paydaşlarımızla birlikte hareket ederek ortak bir güç oluşturuyoruz." },
  { title: "Kalıcı Etki", desc: "Anlık çözümlerin ötesine geçerek toplumun kendi ayakları üzerinde durmasını sağlayan kalıcı projeler üretiyoruz." },
];

const BizKimiz = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white pb-32">
    <InnerHero title="Hakkımızda" subtitle="Biz Kimiz" img="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2670&auto=format&fit=crop" />

    <div className="max-w-5xl mx-auto px-6 mt-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 items-center">
        <div>
          <p className="text-[#c9a227] text-xs font-bold tracking-[0.3em] uppercase mb-4">Misyon & Vizyon</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0d1f3c] mb-6 leading-snug">
            Gerekli İnsani Yardımı<br />
            <span className="text-[#c9a227]">Dünyaya Ulaştırıyoruz</span>
          </h2>
          <p className="text-[#555] leading-relaxed mb-5 text-[15px]">
            Miran Abay Vakfı; çatışmalardan, doğal afetlerden, yoksulluktan veya hastalıktan etkilenen insanlara insani yardım ulaştırma misyonuyla kurulmuştur.
          </p>
          <p className="text-[#555] leading-relaxed text-[15px]">
            Temel özgürlükleri güçlendirirken adaletin, eşitliğin ve insan onurunun hâkim olduğu bir gelecek için çalışıyoruz. Vizyon olarak; yoksulluğun olmadığı, eğitime herkesin eşit ulaşabildiği bir dünya inşa etmeyi hedefliyoruz.
          </p>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-[#0d1f3c] rounded-[32px] translate-x-3 translate-y-3 opacity-20" />
          <img src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1000&auto=format&fit=crop"
            className="relative rounded-[32px] w-full h-[380px] object-cover shadow-lg" alt="Vakıf" />
        </div>
      </div>

      <div className="mb-16">
        <p className="text-[#c9a227] text-xs font-bold tracking-[0.3em] uppercase mb-3 text-center">Temel Değerlerimiz</p>
        <h3 className="text-2xl font-bold text-[#0d1f3c] mb-10 text-center">Altı İlkemiz</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {values.map((v, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              className="bg-[#f5f4f0] border border-[#e2ddd6] rounded-2xl p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="w-7 h-7 rounded-full bg-[#c9a227]/10 flex items-center justify-center mb-4">
                <FiHeart className="text-[#c9a227] text-xs" />
              </div>
              <h4 className="font-bold text-[#0d1f3c] mb-2">{v.title}</h4>
              <p className="text-[#666] text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-[#0d1f3c] rounded-[28px] p-8 md:p-12 text-white flex flex-col md:flex-row gap-10 items-center">
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-3">Faaliyet Alanlarımız</h3>
          <p className="text-white/60 text-sm leading-relaxed">Çatışma, afet, yoksulluk veya hastalıktan etkilenen; özellikle kadınlar, çocuklar ve engelliler olmak üzere tüm ihtiyaç sahiplerine yönelik çalışıyoruz.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 flex-shrink-0">
          {["Acil Müdahale", "Uzun Vadeli Kalkınma", "Yoksullukla Mücadele", "İnsan Hakları"].map((item, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-medium text-white/80">{item}</div>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

/* ── LIGHTBOX ── */
type LightboxState = { images: string[]; index: number; caption?: string } | null;

const Lightbox = ({ state, onClose, onPrev, onNext }: {
  state: LightboxState;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) => {
  useEffect(() => {
    if (!state) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [state, onClose, onPrev, onNext]);

  if (!state) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      {/* Kapat */}
      <button onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10">
        <FiX size={20} />
      </button>

      {/* Geri */}
      <button onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-8 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10">
        <FiChevronLeft size={22} />
      </button>

      {/* Fotoğraf */}
      <motion.img
        key={state.index}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        src={state.images[state.index].replace("w=800", "w=1600")}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl"
        alt=""
      />

      {/* İleri */}
      <button onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-8 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10">
        <FiChevronRight size={22} />
      </button>

      {/* Sayaç */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/50 text-xs font-medium tracking-widest">
        {state.index + 1} / {state.images.length}
      </div>
    </motion.div>
  );
};

/* ── NELER YAPTIK ── */
const galleryCategories = [
  {
    label: "Ramazan Gıda Yardımı — Abdurrahman Abay Anısına",
    description: "Vakfımız, rahmetli Abdurrahman ABAY anısına Ramazan ayı dolayısıyla ihtiyaç sahiplerine gıda yardımında bulunmuştur.",
    images: [
      "/gallery/ramazan/ramazan-1.jpeg",
      "/gallery/ramazan/ramazan-2.jpeg",
      "/gallery/ramazan/ramazan-3.jpeg",
      "/gallery/ramazan/ramazan-4.jpeg",
      "/gallery/ramazan/ramazan-5.jpeg",
      "/gallery/ramazan/ramazan-6.jpeg",
    ],
  },
  {
    label: "Eğitim Desteklerimiz",
    description: "",
    images: [
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?q=80&w=800",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800",
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=800",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800",
    ],
  },
  {
    label: "Hayat Destek Çalışmalarımız",
    description: "",
    images: [
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800",
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=800",
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=800",
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=800",
    ],
  },
  {
    label: "Mobil Sağlık Hizmetlerimiz",
    description: "",
    images: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800",
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800",
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?q=80&w=800",
      "https://images.unsplash.com/photo-1551190822-a9333d879b1f?q=80&w=800",
    ],
  },
];

const NelerYaptik = () => {
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  const openLightbox = (images: string[], index: number) => {
    setLightbox({ images, index });
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightbox(null);
    document.body.style.overflow = "";
  };

  const prev = () => setLightbox((s) => s && { ...s, index: (s.index - 1 + s.images.length) % s.images.length });
  const next = () => setLightbox((s) => s && { ...s, index: (s.index + 1) % s.images.length });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white pb-32">
      <Lightbox state={lightbox} onClose={closeLightbox} onPrev={prev} onNext={next} />
      <InnerHero title="Neler Yaptık" subtitle="Geçmiş Çalışmalarımız" img="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2670&auto=format&fit=crop" />

      <div className="max-w-6xl mx-auto px-6 mt-16">
        {galleryCategories.map((cat, ci) => (
          <div key={ci} className="mb-16">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-2 h-8 bg-[#c9a227] rounded-full flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-[#0d1f3c]">{cat.label}</h3>
                {cat.description && (
                  <p className="text-[#666] text-sm leading-relaxed mt-2 max-w-3xl">{cat.description}</p>
                )}
              </div>
            </div>
            <div className={`grid gap-3 ${cat.images.length === 6 ? "grid-cols-2 md:grid-cols-3" : "grid-cols-2 md:grid-cols-4"}`}>
              {cat.images.map((img, ii) => (
                <motion.div key={ii}
                  initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: ii * 0.06 }}
                  onClick={() => openLightbox(cat.images, ii)}
                  className="relative aspect-square rounded-2xl overflow-hidden group cursor-zoom-in">
                  <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                  <div className="absolute inset-0 bg-[#0d1f3c]/0 group-hover:bg-[#0d1f3c]/40 transition-colors duration-300 flex items-center justify-center">
                    <FiZoomIn className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-12 bg-[#f5f4f0] border border-[#e2ddd6] rounded-[24px] p-8 md:p-12 text-center">
          <h3 className="text-2xl font-bold text-[#0d1f3c] mb-4">Siz De Katkıda Bulunun</h3>
          <p className="text-[#666] mb-8 max-w-md mx-auto">Bu başarıları birlikte kazandık. Daha fazlası için sizin desteğinize ihtiyacımız var.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/neler-yapabilirsiniz" className="bg-[#c9a227] text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-[#b89320] transition-colors">Bağış Yapın</Link>
            <Link to="/neler-yapabilirsiniz" className="border-2 border-[#0d1f3c] text-[#0d1f3c] px-8 py-3 rounded-full text-sm font-bold hover:bg-[#0d1f3c] hover:text-white transition-colors">Gönüllü Olun</Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ── NELER YAPABİLİRSİNİZ ── */
const donationItems = [
  "Yetim çocukların eğitimine destek olun",
  "Hastanelerdeki hastalara umut olun",
  "Afet bölgelerindeki insanlara yardım ulaştırın",
  "Ailelerin gıda ihtiyaçlarını karşılayın",
];

const volunteerItems = [
  "Proje yönetimi ve destekleme",
  "Bilinçlendirme etkinlikleri",
  "Uzmanlık ve beceri paylaşımı",
  "Yardım lojistiği ve koordinasyon",
  "Sosyal medya tanıtımı",
];

const NelerYapabilirsiniz = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white pb-32">
    <InnerHero title="Nasıl Destek Olursunuz" subtitle="Katılım Yolları" img="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2670&auto=format&fit=crop" />

    <div className="max-w-5xl mx-auto px-6 mt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">

        {/* Bağış */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-[#0d1f3c] text-white rounded-[28px] p-8 md:p-10 flex flex-col">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6">
            <FiHeart className="text-[#c9a227] text-xl" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Bağış Yapabilirsiniz</h3>
          <p className="text-white/60 text-sm mb-6 leading-relaxed">Vakfımızın ailesine katılarak yaşamaları etkileyebilirsiniz. Her bağış, bir hayata dokunur.</p>
          <ul className="space-y-3 mb-8 flex-1">
            {donationItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                <span className="text-[#c9a227] mt-0.5 flex-shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <a href="mailto:info@miranabayvakfi.com"
            className="mt-auto bg-[#c9a227] text-white text-center py-3 rounded-full text-sm font-bold hover:bg-[#b89320] transition-colors">
            Bağış İçin İletişime Geçin
          </a>
        </motion.div>

        {/* Gönüllü */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="bg-[#f5f4f0] border border-[#e2ddd6] rounded-[28px] p-8 md:p-10 flex flex-col">
          <div className="w-12 h-12 rounded-full bg-[#c9a227]/10 flex items-center justify-center mb-6">
            <FiUsers className="text-[#c9a227] text-xl" />
          </div>
          <h3 className="text-2xl font-bold text-[#0d1f3c] mb-2">Gönüllü Olabilirsiniz</h3>
          <p className="text-[#666] text-sm mb-6 leading-relaxed">Fark yaratın. Becerilerinizi toplum için kullanın, kültürel çeşitliliği deneyimleyin ve kişisel gelişiminize katkı sağlayın.</p>
          <ul className="space-y-3 mb-8 flex-1">
            {volunteerItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-[#555]">
                <span className="text-[#0d1f3c] mt-0.5 flex-shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <Link to="/bize-ulasin"
            className="mt-auto border-2 border-[#0d1f3c] text-[#0d1f3c] text-center py-3 rounded-full text-sm font-bold hover:bg-[#0d1f3c] hover:text-white transition-colors">
            Gönüllü Olmak İstiyorum
          </Link>
        </motion.div>
      </div>

      <div className="bg-[#f5f4f0] border border-[#e2ddd6] rounded-[24px] p-8 text-center">
        <p className="text-[#c9a227] text-xs font-bold tracking-[0.3em] uppercase mb-3">İletişim</p>
        <h3 className="text-2xl font-bold text-[#0d1f3c] mb-2">Daha Fazla Bilgi İçin</h3>
        <p className="text-[#666] mb-6 text-sm">Bağış veya gönüllülük hakkında daha fazla bilgi almak için bize ulaşın.</p>
        <div className="flex flex-wrap gap-4 justify-center text-sm font-medium">
          <a href="mailto:info@miranabayvakfi.com" className="flex items-center gap-2 text-[#0d1f3c] hover:text-[#c9a227] transition-colors">
            <FiMail /> info@miranabayvakfi.com
          </a>
          <span className="flex items-center gap-2 text-[#0d1f3c]">
            <FiPhone /> Yakında Eklenecek
          </span>
        </div>
      </div>
    </div>
  </motion.div>
);

/* ── BİZE ULAŞIN ── */
const BizeUlasin = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white pb-32">
    <InnerHero title="İletişim" subtitle="Bize Ulaşın" img="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2670&auto=format&fit=crop" />

    <div className="max-w-6xl mx-auto px-6 mt-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

        {/* Harita - Adres eklendikten sonra güncellenecek */}
        <div className="h-[420px] rounded-[24px] overflow-hidden shadow-sm border border-[#e2ddd6] relative bg-[#f5f4f0] flex flex-col items-center justify-center gap-3 text-[#bbb]">
          <FiMapPin className="text-4xl text-[#e2ddd6]" />
          <span className="text-sm font-medium tracking-wide">Harita yakında eklenecek</span>
        </div>

        {/* İletişim Bilgileri */}
        <div className="flex flex-col justify-center">
          <p className="text-[#c9a227] text-xs font-bold tracking-[0.3em] uppercase mb-4">Adresimiz</p>
          <h3 className="text-3xl font-bold text-[#0d1f3c] mb-6">Bize Ulaşın</h3>
          <p className="text-[#666] mb-10 leading-relaxed">Bağış, gönüllülük veya projelerimiz hakkında bilgi almak için aşağıdaki kanallardan bize ulaşabilirsiniz.</p>
          <div className="space-y-5">
            {[
              { icon: <FiMapPin />, label: "Adres", value: "Yakında Eklenecek" },
              { icon: <FiPhone />, label: "Telefon", value: "Yakında Eklenecek" },
              { icon: <FiMail />, label: "E-Posta", value: "info@miranabayvakfi.com", href: "mailto:info@miranabayvakfi.com" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#f5f4f0] border border-[#e2ddd6] flex items-center justify-center text-[#c9a227] flex-shrink-0">{item.icon}</div>
                <div>
                  <div className="text-[10px] font-bold tracking-widest uppercase text-[#c9a227] mb-0.5">{item.label}</div>
                  {item.href
                    ? <a href={item.href} className="text-[#0d1f3c] font-medium hover:text-[#c9a227] transition-colors">{item.value}</a>
                    : <span className="text-[#0d1f3c] font-medium">{item.value}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-[#f5f4f0] border border-[#e2ddd6] rounded-[28px] p-8 md:p-12">
        <p className="text-[#c9a227] text-xs font-bold tracking-[0.3em] uppercase mb-3">Mesaj Gönderin</p>
        <h3 className="text-2xl font-bold text-[#0d1f3c] mb-2">Bizimle İletişime Geçin</h3>
        <p className="text-[#666] text-sm mb-8">Sorularınız, bağış teklifleriniz veya gönüllülük başvurularınız için formu doldurun.</p>
        <form className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-[#0d1f3c] block mb-1.5">Ad Soyad</label>
              <input type="text" className="w-full bg-white border border-[#e2ddd6] rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#c9a227] transition-colors text-sm" placeholder="Adınız Soyadınız" />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-[#0d1f3c] block mb-1.5">E-Posta</label>
              <input type="email" className="w-full bg-white border border-[#e2ddd6] rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#c9a227] transition-colors text-sm" placeholder="ornek@email.com" />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-[#0d1f3c] block mb-1.5">Telefon</label>
            <input type="tel" className="w-full bg-white border border-[#e2ddd6] rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#c9a227] transition-colors text-sm" placeholder="+90 5XX XXX XX XX" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-[#0d1f3c] block mb-1.5">Mesajınız</label>
            <textarea rows={4} className="w-full bg-white border border-[#e2ddd6] rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#c9a227] transition-colors resize-none text-sm" placeholder="Mesajınızı buraya yazın..." />
          </div>
          <div className="flex items-start gap-2 text-xs text-[#666]">
            <input type="checkbox" className="mt-0.5 accent-[#c9a227]" />
            <span>Kişisel verilerimin işlenmesini ve vakıf ile iletişim kurulmasını kabul ediyorum.</span>
          </div>
          <button type="button"
            className="bg-[#0d1f3c] text-white px-10 py-4 rounded-xl font-bold tracking-wider text-xs uppercase hover:bg-[#c9a227] transition-colors flex items-center gap-2">
            Gönder <FiSend />
          </button>
        </form>
      </div>
    </div>
  </motion.div>
);

/* ── FOOTER ── */
const Footer = () => (
  <footer className="bg-[#060e20] text-white pt-20 pb-8 relative overflow-hidden">
    <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
      <FiHeart className="text-[350px]" />
    </div>
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 mb-16 relative z-10">

      <div className="md:col-span-5">
        <div className="mb-6">
          <img src="/logo-transparent.png" alt="Miran Abay Vakfı" className="h-16 w-auto object-contain" />
        </div>
        <p className="text-white/50 text-sm leading-relaxed max-w-sm mb-6">
          Her el bir umut, her adım bir değişim. İhtiyaç sahiplerine ulaşmak için her gün çalışıyoruz.
        </p>
        <p className="text-white/30 text-xs">miranabayvakfi.com</p>
      </div>

      <div className="md:col-span-3">
        <h5 className="font-bold tracking-widest uppercase text-xs text-[#c9a227] mb-5">Sayfalar</h5>
        <ul className="space-y-3 text-sm text-white/60">
          {[
            { name: "Ana Sayfa", path: "/" },
            { name: "Neler Yapıyoruz", path: "/neler-yapiyoruz" },
            { name: "Biz Kimiz", path: "/biz-kimiz" },
            { name: "Neler Yaptık", path: "/neler-yaptik" },
            { name: "Neler Yapabilirsiniz", path: "/neler-yapabilirsiniz" },
            { name: "Bize Ulaşın", path: "/bize-ulasin" },
          ].map((l, i) => (
            <li key={i}><Link to={l.path} className="hover:text-white hover:translate-x-1 inline-block transition-all">{l.name}</Link></li>
          ))}
        </ul>
      </div>

      <div className="md:col-span-4">
        <h5 className="font-bold tracking-widest uppercase text-xs text-[#c9a227] mb-5">İletişim</h5>
        <ul className="space-y-4 text-sm text-white/60">
          <li className="flex items-start gap-3"><FiMapPin className="flex-shrink-0 mt-0.5 text-[#c9a227]" /><span>Yakında Eklenecek</span></li>
          <li className="flex items-center gap-3"><FiPhone className="text-[#c9a227]" /><span>Yakında Eklenecek</span></li>
          <li className="flex items-center gap-3"><FiMail className="text-[#c9a227]" /><a href="mailto:info@miranabayvakfi.com" className="hover:text-white transition-colors">info@miranabayvakfi.com</a></li>
        </ul>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
      <p className="text-white/30 text-xs tracking-wider">© {new Date().getFullYear()} Miran Abay Vakfı. Tüm hakları saklıdır.</p>
      <div className="flex gap-5 text-white/40">
        <a href="#" className="hover:text-[#c9a227] transition-colors"><FaInstagram size={18} /></a>
        <a href="#" className="hover:text-[#c9a227] transition-colors"><FaLinkedin size={18} /></a>
        <a href="#" className="hover:text-[#c9a227] transition-colors"><FaWhatsapp size={18} /></a>
      </div>
    </div>
  </footer>
);
