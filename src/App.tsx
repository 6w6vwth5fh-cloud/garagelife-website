import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Menu as MenuIcon, X, Instagram, MapPin, Clock, Phone, ArrowUpRight, Check } from 'lucide-react';

// --- Types & Constants ---

type Language = 'en' | 'ja';

interface MenuItem {
  id: string;
  category: 'burgers' | 'sets' | 'drinks' | 'sides';
  name: { en: string; ja: string };
  description: { en: string; ja: string };
  price: string;
  image: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'b1',
    category: 'burgers',
    name: { en: 'Classic Burger', ja: 'クラシックバーガー' },
    description: { en: '100% beef patty with lettuce, tomato, onion, pickles.', ja: '100%ビーフパティ、レタス、トマト、オニオン、ピクルス' },
    price: '¥980',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'b2',
    category: 'burgers',
    name: { en: 'Soki Burger', ja: 'ソーキバーガー' },
    description: { en: 'Okinawan soki pork, flame-grilled with house BBQ sauce.', ja: '沖縄ソーキを炙り、自家製BBQソースで' },
    price: '¥1,100',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3ecc50f1?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'b3',
    category: 'burgers',
    name: { en: 'Chicken Burger', ja: 'チキンバーガー' },
    description: { en: 'Juicy chicken thigh in our house marinade.', ja: 'ジューシーなチキンに特製マリネ' },
    price: '¥1,050',
    image: 'https://images.unsplash.com/photo-1626700051175-656fc72eea8a?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'b4',
    category: 'burgers',
    name: { en: 'Double Stack', ja: 'ダブルスタック' },
    description: { en: 'Two patties, double cheese — for the hungry ones.', ja: 'パティ2枚＆ダブルチーズ、ガッツリ派へ' },
    price: '¥1,380',
    image: 'https://images.unsplash.com/photo-1534790561517-415b7e4dcb18?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 's1',
    category: 'sets',
    name: { en: 'Burger Set', ja: 'バーガーセット' },
    description: { en: 'Add fries & a drink to any burger.', ja: 'ポテト＆ドリンクをバーガーにプラス' },
    price: '+¥400',
    image: 'https://images.unsplash.com/photo-1536964541577-02fe9e576ef2?auto=format&fit=crop&q=80&w=400'
  }
];

const TRANSLATIONS = {
  en: {
    hero_badge: "★ Since 2018 — Okinawa",
    hero_sub: "American diner & bar in Nanjo, Okinawa. Hand-pressed beef burgers, craft drinks, good times — served loud and raw, right out of the garage.",
    hero_cta1: "View Menu",
    hero_cta2: "Reserve",
    badge_top: "HANDCRAFTED",
    badge_bot: "& GOOD TIMES",
    badge_star: "HOT SAUCE",
    about_title: "OUR STORY",
    visit_title: "VISIT US"
  },
  ja: {
    hero_badge: "★ 2018年創業 — 沖縄",
    hero_sub: "沖縄・つきしろのアメリカンダイナー。本格ビーフバーガーと、クラフトドリンクを。ガレージの中で味わう、無骨でうまい一皿を。",
    hero_cta1: "メニューを見る",
    hero_cta2: "予約する",
    badge_top: "HANDCRAFTED",
    badge_bot: "& GOOD TIMES",
    badge_star: "HOT SAUCE",
    about_title: "こだわりの3つ",
    visit_title: "店舗案内"
  }
};

// --- Components ---

const Navbar = ({ lang, setLang }: { lang: Language; setLang: (l: Language) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-md border-b-3 border-ink">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#top" className="group flex items-center gap-2 text-2xl font-display text-diner-red">
          <Star className="w-5 h-5 text-mustard fill-mustard text-stroke-ink" />
          Garage<em className="not-italic text-diner-navy">Life</em>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
          {['about', 'menu', 'visit', 'reserve'].map((item) => (
            <a 
              key={item} 
              href={`#${item}`} 
              className="px-4 py-2 text-xs font-bold tracking-widest uppercase hover:text-diner-red transition-colors"
            >
              {item}
            </a>
          ))}
          <div className="flex border-2 border-ink rounded ml-4 overflow-hidden">
            <button 
              onClick={() => setLang('en')}
              className={`px-3 py-1 text-[10px] font-bold ${lang === 'en' ? 'bg-ink text-mustard' : 'bg-transparent text-ink'}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLang('ja')}
              className={`px-3 py-1 text-[10px] font-bold ${lang === 'ja' ? 'bg-ink text-mustard' : 'bg-transparent text-ink'}`}
            >
              JA
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-ink" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-8 h-8" /> : <MenuIcon className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-cream border-b-3 border-ink px-6 pb-6 pt-2 flex flex-col gap-4"
          >
            {['about', 'menu', 'visit', 'reserve'].map((item) => (
              <a 
                key={item} 
                href={`#${item}`} 
                onClick={() => setIsOpen(false)}
                className="text-sm font-bold tracking-[0.2em] uppercase py-3 border-b border-ink/10"
              >
                {item}
              </a>
            ))}
            <div className="flex gap-4 pt-2">
              <button onClick={() => { setLang('en'); setIsOpen(false); }} className={`flex-1 py-3 border-2 border-ink rounded font-bold text-xs ${lang === 'en' ? 'bg-ink text-mustard' : ''}`}>EN</button>
              <button onClick={() => { setLang('ja'); setIsOpen(false); }} className={`flex-1 py-3 border-2 border-ink rounded font-bold text-xs ${lang === 'ja' ? 'bg-ink text-mustard' : ''}`}>JP</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ lang }: { lang: Language }) => {
  const t = TRANSLATIONS[lang];

  return (
    <section id="top" className="relative min-h-[100dvh] pt-32 pb-16 overflow-hidden flex items-center">
      {/* Background Dots */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#1a1a1a 1.2px, transparent 1.5px)', backgroundSize: '22px 22px' }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,420px] items-center gap-12 lg:gap-20">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-center lg:text-left"
          >
            <span className="inline-block px-4 py-1.5 bg-cream-dark border-2 border-ink rounded-full text-[10px] sm:text-xs font-bungee tracking-widest text-diner-red shadow-[3px_3px_0_theme(colors.ink)]">
              {t.hero_badge}
            </span>
            
            <h1 className="mt-6 mb-6 font-display text-4xl sm:text-6xl xl:text-7xl leading-none tracking-tight">
              <span className="text-diner-red drop-shadow-[5px_5px_0_theme(colors.mustard)]">
                {lang === 'en' ? 'AMERICAN' : 'アメリカン'}
              </span><br />
              <span className="text-diner-navy drop-shadow-[5px_5px_0_theme(colors.mustard)]">
                {lang === 'en' ? 'DINER' : 'ダイナー'}
              </span><br />
              <span className="drop-shadow-[5px_5px_0_theme(colors.mustard)]">
                & BAR
              </span>
            </h1>

            <p className="max-w-[42ch] mx-auto lg:mx-0 text-base sm:text-lg font-medium text-ink/80 leading-relaxed mb-10">
              {t.hero_sub}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#menu" className="group relative inline-flex items-center justify-center px-8 py-4 bg-diner-red text-white border-3 border-ink rounded font-display tracking-widest uppercase transition-all shadow-[5px_5px_0_theme(colors.ink)] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_theme(colors.ink)] active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0_theme(colors.ink)]">
                {t.hero_cta1}
              </a>
              <a href="#reserve" className="inline-flex items-center justify-center px-8 py-4 bg-diner-navy text-white border-3 border-ink rounded font-display tracking-widest uppercase transition-all shadow-[5px_5px_0_theme(colors.ink)] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_theme(colors.ink)]">
                {t.hero_cta2}
              </a>
            </div>
          </motion.div>

          {/* Visual Content (The Badge) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            className="relative w-full max-w-[280px] sm:max-w-[340px] xl:max-w-[420px] mx-auto aspect-square flex items-center justify-center"
          >
            {/* Main Badge */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full bg-diner-red border-5 border-ink shadow-[12px_12px_0_theme(colors.ink)] flex flex-col items-center justify-center text-white text-center p-8 overflow-hidden"
            >
              <div className="absolute inset-4 rounded-full border-2 border-dashed border-white/30" />
              <span className="font-bungee text-[10px] sm:text-xs tracking-[0.3em] mb-2">{t.badge_top}</span>
              <strong className="font-display text-4xl sm:text-5xl xl:text-6xl text-mustard leading-none">BURGER</strong>
              <span className="font-bungee text-[10px] sm:text-xs tracking-[0.2em] mt-2">{t.badge_bot}</span>
            </motion.div>

            {/* Corner Star */}
            <motion.div 
              initial={{ rotate: -15 }}
              whileHover={{ rotate: 0, scale: 1.1 }}
              className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-16 h-16 sm:w-24 sm:h-24 bg-mustard border-4 border-ink rounded-full flex items-center justify-center text-center font-bungee text-[10px] sm:text-sm leading-none shadow-[4px_4px_0_theme(colors.ink)] z-20"
            >
              HOT<br />SAUCE
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

const AboutSection = ({ lang }: { lang: Language }) => {
  const t = TRANSLATIONS[lang];

  const points = [
    { num: '01', title: { en: '100% BEEF', ja: '100% ビーフ' }, desc: { en: 'Only the finest beef. Hand-pressed patties, seared hot, served on housemade buns.', ja: '厳選した牛肉のみを使用。焼きたてのパティと、こだわりのバンズで仕上げる本格派です。' } },
    { num: '02', title: { en: 'HOMEMADE', ja: 'ホームメイド' }, desc: { en: 'Sauces, pickles, buns — made in-house with local Okinawa ingredients.', ja: 'ソース、ピクルス、バンズまで店内で手作り。アメリカンの味を沖縄素材とともに。' } },
    { num: '03', title: { en: 'GOOD TIMES', ja: '最高の時間' }, desc: { en: 'Inside the garage, cold craft beer in hand. Unpretentious, loud, delicious.', ja: 'ガレージの中で、キンキンのビールを。気取らず、無骨に、最高のひとときを。' } }
  ];

  return (
    <section id="about" className="py-24 bg-cream-dark border-y-3 border-ink">
      <div className="container mx-auto px-6">
        <span className="inline-block px-4 py-1.5 bg-cream border-2 border-ink rounded-full text-xs font-bungee tracking-widest text-diner-red shadow-[3px_3px_0_theme(colors.ink)] mb-4">
          Our Commitment
        </span>
        <h2 className="text-4xl sm:text-6xl font-display mb-12">
          <em className="not-italic text-diner-red">OUR</em> <span className="text-diner-navy">STORY</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {points.map((p) => (
            <div key={p.num} className="bg-cream border-3 border-ink p-8 rounded shadow-[6px_6px_0_theme(colors.ink)] hover:-translate-y-1 hover:shadow-[9px_9px_0_theme(colors.ink)] transition-all">
              <div className="font-display text-5xl text-diner-red leading-none mb-4 text-stroke-ink-thick drop-shadow-[3px_3px_0_theme(colors.ink)]">
                {p.num}
              </div>
              <h3 className="font-display text-xl mb-3 text-diner-navy uppercase tracking-wider">{p.title[lang]}</h3>
              <p className="text-sm leading-relaxed text-ink/80">{p.desc[lang]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MenuSection = ({ lang }: { lang: Language }) => {
  const [activeTab, setActiveTab] = useState<MenuItem['category']>('burgers');

  return (
    <section id="menu" className="py-24">
      <div className="container mx-auto px-6">
        <span className="inline-block px-4 py-1.5 bg-cream-dark border-2 border-ink rounded-full text-xs font-bungee tracking-widest text-diner-red shadow-[3px_3px_0_theme(colors.ink)] mb-4">
          The Garage Grill
        </span>
        <h2 className="text-4xl sm:text-6xl font-display mb-12 uppercase">
          Eat <em className="not-italic text-diner-red">&</em> <span className="text-diner-navy">Drink</span>
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {(['burgers', 'sets', 'drinks', 'sides'] as MenuItem['category'][]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded border-3 border-ink font-display text-sm uppercase tracking-wider transition-all shadow-[3px_3px_0_theme(colors.ink)] ${activeTab === tab ? 'bg-diner-red text-white' : 'bg-cream hover:bg-mustard'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {MENU_ITEMS.filter(it => it.category === activeTab).map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border-3 border-ink rounded overflow-hidden shadow-[5px_5px_0_theme(colors.ink)]"
              >
                <div className="h-48 overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                  <img src={item.image} alt={item.name[lang]} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 flex flex-col h-full">
                  <h4 className="font-display text-lg mb-2 text-diner-navy">{item.name[lang]}</h4>
                  <p className="text-xs text-muted mb-4 line-clamp-2">{item.description[lang]}</p>
                  <div className="mt-auto">
                    <span className="inline-block px-3 py-1 bg-diner-red text-white border-2 border-ink rounded font-display text-sm shadow-[2px_2px_0_theme(colors.ink)]">
                      {item.price}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const VisitSection = ({ lang }: { lang: Language }) => {
  const t = TRANSLATIONS[lang];

  return (
    <section id="visit" className="py-24 bg-diner-navy text-white border-y-3 border-ink">
      <div className="container mx-auto px-6">
        <span className="inline-block px-4 py-1.5 bg-mustard border-2 border-white rounded-full text-xs font-bungee tracking-widest text-ink shadow-[3px_3px_0_white] mb-4">
          Find Us
        </span>
        <h2 className="text-4xl sm:text-6xl font-display mb-12">
          <em className="not-italic text-mustard">{lang === 'en' ? 'VISIT' : '店舗'}</em> <span>{lang === 'en' ? 'US' : '案内'}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Hours */}
          <div className="bg-diner-navy-dark border-3 border-white p-8 rounded shadow-[6px_6px_0_theme(colors.mustard)]">
            <h3 className="font-display text-2xl text-mustard border-b-2 border-dashed border-white/20 pb-4 mb-6">HOURS</h3>
            <ul className="space-y-4">
              <li className="flex justify-between items-center text-sm">
                <span className="font-bungee text-[10px] tracking-widest text-mustard">Lunch</span>
                <span>11:30 – 15:00</span>
              </li>
              <li className="flex justify-between items-center text-sm">
                <span className="font-bungee text-[10px] tracking-widest text-mustard">Dinner</span>
                <span>19:00 – 03:00</span>
              </li>
              <li className="flex justify-between items-center text-sm">
                <span className="font-bungee text-[10px] tracking-widest text-diner-red">Closed</span>
                <span>Thursday</span>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div className="bg-diner-navy-dark border-3 border-white p-8 rounded md:col-span-2 shadow-[6px_6px_0_theme(colors.mustard)]">
            <h3 className="font-display text-2xl text-mustard border-b-2 border-dashed border-white/20 pb-4 mb-6">LOCATION</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <MapPin className="w-5 h-5 text-mustard shrink-0" />
                  <p className="text-sm font-medium">
                    〒901-1407<br />
                    沖縄県南城市つきしろ1600-24
                  </p>
                </div>
                <div className="flex gap-4">
                  <Clock className="w-5 h-5 text-mustard shrink-0" />
                  <p className="text-sm">ランチ歓迎 • 夜は予約推奨</p>
                </div>
                <div className="pt-4 flex gap-3">
                  <a href="https://maps.google.com" className="px-4 py-2 bg-white text-ink text-[10px] font-bold uppercase tracking-wider rounded border-2 border-mustard">Open in Maps</a>
                </div>
              </div>
              <div className="h-48 rounded-lg overflow-hidden border-2 border-white/20 sm:block hidden">
                 {/* Map Placeholder */}
                 <div className="w-full h-full bg-ink relative flex items-center justify-center p-4">
                    <img src="https://images.unsplash.com/photo-1541339907198-e08759df9a73?auto=format&fit=crop&q=80&w=600" className="absolute inset-0 w-full h-full object-cover opacity-60" alt="map" />
                    <Star className="relative z-10 w-12 h-12 text-mustard fill-mustard animate-bounce" />
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-ink pt-20 pb-10 text-cream relative mt-20">
      <div className="absolute top-0 left-0 right-0 h-4 stripes-bg -translate-y-4" />
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="space-y-6">
            <a href="#top" className="text-3xl font-display text-mustard tracking-tight">Garage<em className="not-italic text-white">Life</em></a>
            <p className="text-sm text-cream-dark/60 leading-relaxed max-w-sm">
              American diner & bar in Nanjo, Okinawa. Hand-pressed burgers and craft drinks, raw and bold. Since 2018.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-3 bg-white/5 hover:bg-diner-red rounded-full transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="p-3 bg-white/5 hover:bg-diner-navy rounded-full transition-colors"><MapPin className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div className="space-y-6">
            <h5 className="font-display text-mustard uppercase tracking-widest text-sm">Navigation</h5>
            <div className="flex flex-col gap-3">
              {['about', 'menu', 'visit', 'reserve'].map(it => (
                <a key={it} href={`#${it}`} className="text-sm hover:text-mustard transition-colors capitalize">★ {it}</a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h5 className="font-display text-mustard uppercase tracking-widest text-sm">Newsletter</h5>
            <p className="text-xs text-cream-dark/60">Get latest event news and coupons.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Your Email" className="flex-1 bg-white/5 border border-white/20 px-4 py-2 text-xs rounded focus:outline-none focus:border-mustard" />
              <button className="bg-mustard text-ink px-4 py-2 rounded font-bold text-xs">JOIN</button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:row items-center justify-between gap-4">
          <p className="text-[10px] font-bungee tracking-[0.2em] opacity-40">
            © {new Date().getFullYear()} GARAGELIFE — STARS, STRIPES & BURGERS
          </p>
          <div className="flex gap-6 text-[10px] font-bold opacity-60">
            <a href="#" className="hover:text-mustard">Privacy</a>
            <a href="#" className="hover:text-mustard">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App Component ---

export default function App() {
  const [lang, setLang] = useState<Language>('ja');

  // Detect browse lang
  useEffect(() => {
    const userLang = navigator.language.startsWith('ja') ? 'ja' : 'en';
    setLang(userLang as Language);
  }, []);

  return (
    <div className="selection:bg-mustard selection:text-ink">
      <div className="h-2.5 stripes-bg" />
      <Navbar lang={lang} setLang={setLang} />
      
      <main>
        <Hero lang={lang} />
        <AboutSection lang={lang} />
        <MenuSection lang={lang} />
        <VisitSection lang={lang} />
        
        {/* Simple Reservation CTA */}
        <section id="reserve" className="py-24">
          <div className="container mx-auto px-6">
             <div className="bg-mustard border-4 border-ink p-12 rounded text-center shadow-[10px_10px_0_theme(colors.ink)]">
                <h2 className="font-display text-4xl sm:text-6xl mb-6 uppercase drop-shadow-[3px_3px_0_theme(colors.white)]">Reserve Now</h2>
                <p className="max-w-xl mx-auto font-medium text-lg mb-10 leading-relaxed">
                  {lang === 'en' ? "We're a walk-in friendly joint, but groups of 3+ should book ahead!" : "ランチタイムはウォークイン大歓迎！夜の営業や3名以上のグループはご予約をおすすめします。"}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                   <button className="bg-diner-red text-white border-3 border-ink px-8 py-4 font-display tracking-widest uppercase hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0_theme(colors.ink)] transition-all flex items-center justify-center gap-3">
                      <Instagram className="w-5 h-5" /> Instagram DM
                   </button>
                   <button className="bg-white text-ink border-3 border-ink px-8 py-4 font-display tracking-widest uppercase hover:translate-x-1 hover:translate-y-1 transition-all">
                      {lang === 'en' ? 'Call Us' : '電話で予約'}
                   </button>
                </div>
             </div>
          </div>
        </section>
      </main>

      <Footer />
      <div className="h-2.5 stripes-bg" />
    </div>
  );
}
