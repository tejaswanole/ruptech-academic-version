'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  X,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  ShieldCheck,
  Layers,
  ArrowRight,
  LayoutGrid,
  Columns,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

/* ══════════════════════════════════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════════════════════════════════ */

const categories = [
  'All',
  'Panels & Enclosures',
  'Cable Management',
  'Storage Racks',
  'Facility & Machinery',
];

const galleryItems = [
  // ── Panels & Enclosures ───────────────────────────────────────────────────
  {
    id: 1,
    category: 'Panels & Enclosures',
    label: 'Single Door Industrial Panel Box',
    code: 'RUP-010 to RUP-0150',
    material: 'CRCA Steel (1.2mm – 2.0mm)',
    specs: 'IP55 / IP65 Protected • Seamless PU Gasket • 15 Standard Sizes',
    finish: 'RAL 7032 / RAL 7035 Powder Coated',
    src: '/images/products/panel-box/panel_box_0.webp',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 2,
    category: 'Panels & Enclosures',
    label: 'EV Charger Fast Station Enclosure',
    code: 'RUP-EV-20A / 10A',
    material: 'Mild Steel / Outdoor CRCA',
    specs: 'Weatherproof IP65 • Heavy-duty Hinges • Glass/Acrylic Display Window',
    finish: 'UV-Resistant Dual-Tone Powder Coating',
    src: '/images/products/ev-charger-box/ev_charger_box_0.webp',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 3,
    category: 'Panels & Enclosures',
    label: 'EV Charger Compact Enclosure (Interior View)',
    code: 'RUP-EV-10A-INT',
    material: 'CRCA Steel with Component Plate',
    specs: 'Pre-punched DIN Rail Mounts • Cable Gland Knockouts • Earthing Studs',
    finish: 'RAL 7035 Electrostatic Powder Coat',
    src: '/images/products/ev-charger-box/ev_charger_box_1.webp',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 4,
    category: 'Panels & Enclosures',
    label: 'M.S. Distribution Box 800×800',
    code: 'RUP-DBM-02',
    material: 'CRCA Mild Steel (1.6mm)',
    specs: '800W × 800H × 250D mm • Busbar Chamber • Dual Door Locks',
    finish: '7-Tank Pretreatment Powder Coated',
    src: '/images/products/distribution-box/mseb_box_0.webp',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 5,
    category: 'Panels & Enclosures',
    label: '100A Double Circuit MSEB Distribution Box',
    code: 'RUP-DBEL-04',
    material: 'Heavy-Gauge CRCA Steel',
    specs: '1000W × 1000H × 250D mm • 100A Incomer Rating • Padlocking Facility',
    finish: 'Anti-Corrosion Phosphatized Finish',
    src: '/images/products/distribution-box/mseb_box_1.webp',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 6,
    category: 'Panels & Enclosures',
    label: 'MCCB Heavy Duty Enclosure Box',
    code: 'RUP-MCB250A',
    material: 'Mild Steel (1.6mm – 2.0mm)',
    specs: '160A – 250A Capacity • 400W × 600H × 130D mm • Rotary Handle Provision',
    finish: 'Industrial Pebble Grey (RAL 7032)',
    src: '/images/products/mcb-box/mccb_box_0.webp',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 7,
    category: 'Panels & Enclosures',
    label: '3 or 4 Pole Modular MCB Box',
    code: 'RUP-MCB32-100A',
    material: 'CRCA Steel (1.2mm)',
    specs: '250W × 310H × 130D mm • Transparent Polycarbonate Flap • Din Rail',
    finish: 'Smooth RAL 7035 Powder Coat',
    src: '/images/products/mcb-box/mcb_box_0.webp',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 8,
    category: 'Panels & Enclosures',
    label: 'Double Door Solar Generation Meter Box',
    code: 'RUP-GMSM02',
    material: 'CRCA Sheet Metal (1.6mm)',
    specs: '1000W × 1000H × 350D mm • Dual Chamber • Toughened Viewing Glass',
    finish: 'Outdoor Weatherproof Powder Coat',
    src: '/images/products/generation-meter-box/generation_meter_box_0.webp',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 9,
    category: 'Panels & Enclosures',
    label: 'Single & Three Phase Energy Meter Box',
    code: 'RUP-1PHE / 3PHE-METER',
    material: 'Mild Steel with Tamper-Proof Latches',
    specs: '250W × 300H × 125D mm • Utility Approved • Lead Wire Sealable',
    finish: 'Corrosion-Resistant Powder Finish',
    src: '/images/products/meter-box/meter_boxsinglethree_0.webp',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 10,
    category: 'Panels & Enclosures',
    label: 'Agriculture Pump Starter & Motor Control Box',
    code: 'RUP-AGM-02',
    material: 'Rugged Mild Steel Construction',
    specs: '400W × 500H × 175D mm • Dust & Splash Resistant • Canopy Hood',
    finish: 'UV-Stabilized Green / Grey Finish',
    src: '/images/products/agriculture-box/agriculture_box_0.webp',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 11,
    category: 'Panels & Enclosures',
    label: 'AC Box 3 Way SP MCB with Clad Metal Socket',
    code: 'RUP-AC20ASP3W',
    material: 'CRCA Steel with Brass Earthing',
    specs: '234W × 230H × 60D mm • 20A Metal Clad Sockets • Compact Footprint',
    finish: 'Scratch-Proof Industrial Grey',
    src: '/images/products/panel-enclosures/mcb_plus_clad_socket_box_0.webp',
    aspect: 'aspect-[4/3]',
  },

  // ── Cable Management ──────────────────────────────────────────────────────
  {
    id: 12,
    category: 'Cable Management',
    label: 'G.I. Perforated Cable Tray with Interlocking Cover',
    code: 'RUP-CT-15050 / RUP-CT-30050',
    material: 'Pre-Galvanized Iron (G.I.) / Hot-Dip Galvanized',
    specs: '50mm – 400mm Widths • 2500mm Standard Length • High Load-Bearing Capacity',
    finish: 'Corrosion-Proof Zinc Coating (120–275 GSM)',
    src: '/images/products/cable-trays/cable_tray_0.webp',
    aspect: 'aspect-[4/3]',
  },

  // ── Storage Racks ─────────────────────────────────────────────────────────
  {
    id: 13,
    category: 'Storage Racks',
    label: 'Heavy-Duty Industrial Slotted Angle Rack',
    code: 'RUP-SR-SLOTTED-01',
    material: 'High-Tensile Cold Rolled Steel',
    specs: '1200W × 2440H × 600D mm (4ft × 8ft) • 5 Adjustable Shelves • 150kg/shelf',
    finish: 'Durable Anti-Scratch Powder Coating',
    src: '/images/products/storage-racks/slotted_angle_rack_0.webp',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 14,
    category: 'Storage Racks',
    label: 'Retail Super Shop & Supermarket Display Rack',
    code: 'RUP-SR-SUPERSHOP-02',
    material: 'Formed Mild Steel with Perforated Backing',
    specs: '900W × 2135H × 450D mm (3ft × 7ft) • Front Stopper Brackets • Modular',
    finish: 'Glossy Off-White / Custom Brand Colors',
    src: '/images/products/storage-racks/mall_rack_0.webp',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 15,
    category: 'Storage Racks',
    label: 'Heavy Parts & Hardware Storage Bin Rack',
    code: 'RUP-SR-HARDWARE-03',
    material: 'Welded Structural Steel Frame',
    specs: '1200W × 2135H × 300D mm • High-Density Shelving for Machine Tooling',
    finish: 'Industrial Grey Epoxy Powder Coating',
    src: '/images/products/storage-racks/hardware_rack_0.webp',
    aspect: 'aspect-[3/4]',
  },

  // ── Facility & Machinery ──────────────────────────────────────────────────
  {
    id: 16,
    category: 'Facility & Machinery',
    label: 'CNC Fiber Laser Cutting Machine (3KW, 1.5m × 3m)',
    code: 'FAC-LASER-3KW',
    material: '3KW Fiber Laser • 1.5m × 3.0m Bed',
    specs: 'Positional Accuracy ±0.05mm • Cuts CRCA up to 6mm, SS up to 3mm',
    finish: 'Clean Burr-Free Nitrogen Assist Cutting',
    src: '/images/facility/laser-cutting-full.webp',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 17,
    category: 'Facility & Machinery',
    label: 'CNC Turret Punching Machine (Amada)',
    code: 'FAC-TURRET-AMADA',
    material: 'Amada CNC Turret Punch Press',
    specs: 'Multi-Tool Punching • Complex Hole Patterns, Louvres & Embossing',
    finish: 'High-Speed Precision Punching',
    src: '/images/facility/cnc-turret-punch-amada.webp',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 18,
    category: 'Facility & Machinery',
    label: 'CNC Shearing Machine',
    code: 'FAC-SHEAR-3M',
    material: 'NC Shearing Machine (3m, 5mm)',
    specs: 'Clean Straight Cuts • Large Sheets up to 5mm Thickness',
    finish: 'Precise Edge Quality',
    src: '/images/facility/cnc-shearing-machine.webp',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 19,
    category: 'Facility & Machinery',
    label: 'CNC Forming / Press Brake Machine',
    code: 'FAC-FORM-CNC',
    material: 'CNC Hydraulic Press Brake',
    specs: 'Multi-Bend Sequential Tooling • Precise Bend Angle Consistency',
    finish: 'Seamless Gasket Flange Forming',
    src: '/images/facility/cnc-forming-machine.webp',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 20,
    category: 'Facility & Machinery',
    label: 'Powder Coating Oven & Curing Line',
    code: 'FAC-COAT-OVEN',
    material: 'Conveyorized Curing Oven',
    specs: 'Uniform Heat Distribution • 60–80 Micron Film Thickness',
    finish: 'High-Durability Powder Coat Finish',
    src: '/images/facility/powder-coating-oven.webp',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 21,
    category: 'Facility & Machinery',
    label: 'Spot Welding Station',
    code: 'FAC-SPOT-WELD',
    material: 'Resistance Spot Welding Machine',
    specs: 'Fast & Consistent Joints • Sheet Metal Assemblies',
    finish: 'Clean Weld Points',
    src: '/images/facility/spot-welding-new.webp',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 22,
    category: 'Facility & Machinery',
    label: 'Sheet Metal Fabrication Workshop',
    code: 'FAC-WORKSHOP-01',
    material: 'Integrated Fabrication Line',
    specs: 'Cutting, Bending, Welding & Assembly — All In-House',
    finish: 'MIDC Ahmednagar Facility',
    src: '/images/facility/sheet-metal-fabrication-1.webp',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 23,
    category: 'Facility & Machinery',
    label: 'Factory Floor — Production Area',
    code: 'FAC-FACTORY-01',
    material: 'MIDC Ahmednagar Manufacturing Plant',
    specs: '10,000+ sqft Combined Area • 2 Dedicated Facilities',
    finish: 'Organized Production Layout',
    src: '/images/facility/factory-interior-1.webp',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 24,
    category: 'Facility & Machinery',
    label: 'Powder Coating with Canopy Setup',
    code: 'FAC-COAT-CANOPY',
    material: 'Electrostatic Powder Coating Booth',
    specs: 'Powder Recovery System • Even Coat Distribution',
    finish: 'UV-Resistant Durable Finish',
    src: '/images/facility/powder-coating-canopy-1.webp',
    aspect: 'aspect-[4/3]',
  },

  // ── Additional Products ───────────────────────────────────────────────────
  {
    id: 25,
    category: 'Panels & Enclosures',
    label: 'Agriculture Panel Box with Canopy (Single Door)',
    code: 'RUP-AGRI-CANOPY-01',
    material: 'Rugged Mild Steel Construction',
    specs: 'Outdoor Rated • Canopy Hood for Rain Protection • Dust Resistant',
    finish: 'UV-Stabilized Green / Grey Finish',
    src: '/images/products/agri-panel-canopy.webp',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 26,
    category: 'Panels & Enclosures',
    label: 'Agriculture Panel Double Door with Canopy',
    code: 'RUP-AGRI-CANOPY-02',
    material: 'Heavy-Gauge Mild Steel',
    specs: 'Double Door Access • Weatherproof Canopy • Padlock Facility',
    finish: 'Anti-Corrosion Powder Coated',
    src: '/images/products/agri-panel-double-door-canopy.webp',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 27,
    category: 'Panels & Enclosures',
    label: 'Fire Safety Product Enclosure',
    code: 'RUP-FIRE-PANEL-01',
    material: 'Heavy-Duty Mild Steel (1.6mm – 2.0mm)',
    specs: 'Fire Safety Rated • High-Visibility Finish • Industrial Grade',
    finish: 'Fire-Rated Red Powder Coating',
    src: '/images/products/fire-product-panel.webp',
    aspect: 'aspect-[3/4]',
  },
];

/* ══════════════════════════════════════════════════════════════════════════
   COMPONENT
   ══════════════════════════════════════════════════════════════════════════ */

export default function GalleryPageClient() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('masonry');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  /* ── filtering ─────────────────────────────────────────────────────────── */
  const filteredItems = useMemo(() => {
    return galleryItems.filter((item) => {
      const matchesFilter =
        activeFilter === 'All' || item.category === activeFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.label.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.specs.toLowerCase().includes(q) ||
        item.material.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const activeItem =
    lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  /* ── keyboard nav ──────────────────────────────────────────────────────── */
  const handleKeyDown = useCallback(
    (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      else if (e.key === 'ArrowRight')
        setLightboxIndex((p) =>
          p < filteredItems.length - 1 ? p + 1 : 0
        );
      else if (e.key === 'ArrowLeft')
        setLightboxIndex((p) =>
          p > 0 ? p - 1 : filteredItems.length - 1
        );
    },
    [lightboxIndex, filteredItems.length]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    document.body.style.overflow =
      lightboxIndex !== null ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [lightboxIndex]);

  /* ── WhatsApp ──────────────────────────────────────────────────────────── */
  const getWhatsAppUrl = (item) => {
    const message = encodeURIComponent(
      `Hello Ruptech Engineers, I am viewing your online gallery and would like to request technical specifications and a quote for: "${item.label}" (Code: ${item.code}).`
    );
    return `https://wa.me/919322563294?text=${message}`;
  };

  /* ════════════════════════════════════════════════════════════════════════
     RENDER
     ════════════════════════════════════════════════════════════════════════ */
  return (
    <div className="min-h-screen" style={{ background: '#ffffff' }}>

      {/* ── 1. HERO — Light mode, secondary navy header ───────────────────── */}
      <section
        className="relative overflow-hidden border-b"
        style={{
          background: '#ffffff',
          borderColor: '#E1E4E4',
        }}
      >
        {/* Subtle engineering grid bg (DESIGN.md: bg-grid-pattern) */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(110,122,118,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(110,122,118,0.05) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Top accent bar — primary teal */}
        <div
          className="h-1 w-full"
          style={{ background: '#0E7C6B' }}
        />

        <div
          className="relative z-10 text-center"
          style={{
            maxWidth: '1280px',
            marginInline: 'auto',
            padding: '64px 24px 56px',
          }}
        >
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 mb-5"
            style={{
              padding: '6px 14px',
              borderRadius: '2px',
              border: '1px solid #E1E4E4',
              background: '#F5F7F7',
              color: '#0E7C6B',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-sans)',
            }}
          >
            <Sparkles size={14} />
            Inspection-Ready Fabrication Showcase
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(2.25rem, 1.5rem + 3vw, 3rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#1A1A1A',
              marginBottom: '16px',
            }}
          >
            Engineering & Product{' '}
            <span style={{ color: '#0E7C6B' }}>Visual Gallery</span>
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: 1.5,
              color: '#4A4A4A',
              maxWidth: '720px',
              marginInline: 'auto',
              marginBottom: '32px',
            }}
          >
            Explore high-resolution orthographic views of our custom electrical
            panel boxes, IP-rated enclosures, perforated cable trays, and
            precision manufacturing infrastructure in Pune &amp; Ahmednagar.
          </p>

          {/* Key Quality Metrics — DESIGN.md Level 1 cards (white bg, 1px border) */}
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
            style={{
              maxWidth: '800px',
              marginInline: 'auto',
              paddingTop: '24px',
              borderTop: '1px solid #E1E4E4',
            }}
          >
            {[
              {
                Icon: ShieldCheck,
                label: 'Enclosure Protection',
                value: 'IP54 to IP65 Certified',
              },
              {
                Icon: Layers,
                label: 'Sheet Materials',
                value: 'CRCA, SS304 & G.I.',
              },
              {
                Icon: CheckCircle2,
                label: 'Surface Finishing',
                value: '7-Tank Powder Coat',
              },
              {
                Icon: Sparkles,
                label: 'Manufacturing',
                value: '100% In-House MIDC',
              },
            ].map(({ Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-2.5 p-3"
                style={{
                  background: '#F5F7F7',
                  border: '1px solid #E1E4E4',
                  borderRadius: '8px',
                }}
              >
                <Icon
                  className="shrink-0"
                  size={20}
                  style={{ color: '#0E7C6B' }}
                />
                <div className="text-left">
                  <p
                    style={{
                      fontSize: '11px',
                      fontWeight: 500,
                      color: '#4A4A4A',
                      lineHeight: 1.2,
                    }}
                  >
                    {label}
                  </p>
                  <p
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#1A1A1A',
                      lineHeight: 1.3,
                    }}
                  >
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. STICKY TOOLBAR — Filter + Search ──────────────────────────── */}
      <section
        className="sticky top-16 z-30"
        style={{
          background: 'rgba(255,255,255,0.96)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #E1E4E4',
          padding: '14px 0',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            marginInline: 'auto',
            paddingInline: '24px',
          }}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0 no-scrollbar">
              {categories.map((cat) => {
                const count =
                  cat === 'All'
                    ? galleryItems.length
                    : galleryItems.filter((i) => i.category === cat).length;
                const isActive = activeFilter === cat;

                return (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className="inline-flex items-center gap-2 whitespace-nowrap transition-all duration-200 cursor-pointer"
                    style={{
                      padding: '8px 16px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 600,
                      background: isActive ? '#0E7C6B' : '#F5F7F7',
                      color: isActive ? '#ffffff' : '#4A4A4A',
                      border: isActive
                        ? '1px solid #0E7C6B'
                        : '1px solid #E1E4E4',
                    }}
                  >
                    <span>{cat}</span>
                    <span
                      style={{
                        padding: '2px 6px',
                        borderRadius: '2px',
                        fontSize: '10px',
                        fontWeight: 700,
                        background: isActive
                          ? 'rgba(255,255,255,0.2)'
                          : '#E1E4E4',
                        color: isActive ? '#ffffff' : '#4A4A4A',
                      }}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search & View Switcher */}
            <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
              {/* Search Box */}
              <div className="relative flex-1 sm:w-72">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: '#6e7a76' }}
                />
                <input
                  type="text"
                  placeholder="Search products, SKUs, materials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full transition-all"
                  style={{
                    paddingLeft: '36px',
                    paddingRight: '32px',
                    paddingTop: '8px',
                    paddingBottom: '8px',
                    fontSize: '13px',
                    borderRadius: '4px',
                    border: '1px solid #CED4D4',
                    background: '#ffffff',
                    color: '#1A1A1A',
                    outline: 'none',
                    fontFamily: 'var(--font-sans)',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#0E7C6B';
                    e.target.style.boxShadow =
                      'inset 0 0 0 1px #0E7C6B';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#CED4D4';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 cursor-pointer"
                    style={{ color: '#6e7a76' }}
                    title="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* View Toggle */}
              <div
                className="flex items-center shrink-0"
                style={{
                  padding: '4px',
                  background: '#F5F7F7',
                  borderRadius: '4px',
                  border: '1px solid #E1E4E4',
                }}
              >
                {[
                  { mode: 'masonry', Icon: Columns, title: 'Masonry' },
                  { mode: 'grid', Icon: LayoutGrid, title: 'Grid' },
                ].map(({ mode, Icon, title }) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className="cursor-pointer transition-colors"
                    style={{
                      padding: '6px',
                      borderRadius: '2px',
                      background:
                        viewMode === mode ? '#ffffff' : 'transparent',
                      color:
                        viewMode === mode ? '#0E7C6B' : '#6e7a76',
                      border:
                        viewMode === mode
                          ? '1px solid #E1E4E4'
                          : '1px solid transparent',
                    }}
                    title={title}
                  >
                    <Icon size={16} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. MAIN GALLERY ──────────────────────────────────────────────── */}
      <main
        style={{
          maxWidth: '1280px',
          marginInline: 'auto',
          paddingInline: '24px',
          paddingTop: '40px',
          paddingBottom: '56px',
        }}
      >
        {/* Count bar */}
        <div
          className="flex items-center justify-between mb-6"
          style={{
            paddingBottom: '8px',
            borderBottom: '1px solid #E1E4E4',
            fontSize: '13px',
            color: '#4A4A4A',
          }}
        >
          <div>
            Showing{' '}
            <span style={{ fontWeight: 700, color: '#1A1A1A' }}>
              {filteredItems.length}
            </span>{' '}
            items in{' '}
            <span style={{ fontWeight: 600, color: '#0E7C6B' }}>
              {activeFilter}
            </span>
            {searchQuery && (
              <span>
                {' '}
                matching &ldquo;
                <strong style={{ color: '#1A1A1A' }}>{searchQuery}</strong>
                &rdquo;
              </span>
            )}
          </div>
          <span
            className="hidden sm:inline"
            style={{ fontSize: '11px', color: '#6e7a76' }}
          >
            Click any image for high-resolution inspection &amp; WhatsApp RFQ
          </span>
        </div>

        {/* ── MASONRY VIEW ─────────────────────────────────────────────────── */}
        {viewMode === 'masonry' ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 space-y-5">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(index)}
                className="break-inside-avoid group relative overflow-hidden cursor-pointer transition-all duration-300"
                style={{
                  background: '#ffffff',
                  border: '1px solid #E1E4E4',
                  borderRadius: '8px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#0E7C6B';
                  e.currentTarget.style.boxShadow =
                    '0px 2px 4px rgba(0,0,0,0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E1E4E4';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Image Frame */}
                <div
                  className={`relative w-full overflow-hidden ${item.aspect}`}
                  style={{ background: '#F5F7F7' }}
                >
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  {/* Category badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '4px 10px',
                        borderRadius: '2px',
                        fontSize: '10px',
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        background: '#1D4E89',
                        color: '#ffffff',
                        fontFamily: 'var(--font-sans)',
                      }}
                    >
                      {item.category.split(' ')[0]}
                    </span>
                  </div>
                </div>

                {/* Card Bottom — always visible */}
                <div
                  style={{
                    padding: '14px',
                    background: '#ffffff',
                    borderTop: '1px solid #F5F7F7',
                  }}
                >
                  <h3
                    className="line-clamp-1 transition-colors"
                    style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      color: '#1A1A1A',
                      marginBottom: '6px',
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    {item.label}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        fontWeight: 600,
                        color: '#0E7C6B',
                        background: 'rgba(14,124,107,0.06)',
                        padding: '2px 8px',
                        borderRadius: '2px',
                        border: '1px solid rgba(14,124,107,0.15)',
                      }}
                    >
                      {item.code}
                    </span>
                    <span
                      style={{
                        fontSize: '11px',
                        color: '#6e7a76',
                        fontWeight: 500,
                      }}
                    >
                      View Specs →
                    </span>
                  </div>
                </div>

                {/* Hover overlay with quick actions */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between z-20 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(26,26,26,0.88) 0%, rgba(26,26,26,0.35) 50%, transparent 100%)',
                    padding: '16px',
                  }}
                >
                  {/* Zoom icon */}
                  <div className="flex justify-end">
                    <span
                      className="flex items-center justify-center"
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '4px',
                        background: 'rgba(255,255,255,0.2)',
                        backdropFilter: 'blur(8px)',
                        color: '#ffffff',
                        border: '1px solid rgba(255,255,255,0.15)',
                      }}
                    >
                      <Maximize2 size={16} />
                    </span>
                  </div>

                  {/* Bottom content */}
                  <div className="pointer-events-auto">
                    <p
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#98f3de',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: '4px',
                      }}
                    >
                      {item.category}
                    </p>
                    <h4
                      style={{
                        fontSize: '15px',
                        fontWeight: 700,
                        color: '#ffffff',
                        marginBottom: '6px',
                        lineHeight: 1.3,
                      }}
                    >
                      {item.label}
                    </h4>
                    <p
                      className="line-clamp-2"
                      style={{
                        fontSize: '12px',
                        color: 'rgba(255,255,255,0.8)',
                        marginBottom: '12px',
                        lineHeight: 1.5,
                      }}
                    >
                      {item.specs}
                    </p>

                    <div
                      className="flex items-center gap-2"
                      style={{
                        paddingTop: '8px',
                        borderTop: '1px solid rgba(255,255,255,0.15)',
                      }}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setLightboxIndex(index);
                        }}
                        className="flex-1 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                        style={{
                          padding: '7px 10px',
                          borderRadius: '4px',
                          background: '#0E7C6B',
                          color: '#ffffff',
                          fontSize: '12px',
                          fontWeight: 600,
                          border: 'none',
                        }}
                      >
                        <Maximize2 size={13} />
                        Inspect Details
                      </button>
                      <a
                        href={getWhatsAppUrl(item)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center justify-center cursor-pointer transition-colors"
                        style={{
                          padding: '7px',
                          borderRadius: '4px',
                          background: '#25D366',
                          color: '#ffffff',
                          border: 'none',
                        }}
                        title="Inquire on WhatsApp"
                      >
                        <MessageSquare size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ── UNIFORM GRID VIEW ─────────────────────────────────────────── */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(index)}
                className="group flex flex-col overflow-hidden cursor-pointer transition-all duration-300"
                style={{
                  background: '#ffffff',
                  border: '1px solid #E1E4E4',
                  borderRadius: '8px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#0E7C6B';
                  e.currentTarget.style.boxShadow =
                    '0px 2px 4px rgba(0,0,0,0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E1E4E4';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div
                  className="relative w-full aspect-video overflow-hidden"
                  style={{ background: '#F5F7F7' }}
                >
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: '2px',
                        fontSize: '10px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        background: '#1D4E89',
                        color: '#ffffff',
                      }}
                    >
                      {item.category.split(' ')[0]}
                    </span>
                  </div>
                </div>

                <div
                  className="flex-1 flex flex-col justify-between"
                  style={{ padding: '16px' }}
                >
                  <div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        fontWeight: 700,
                        color: '#0E7C6B',
                        background: 'rgba(14,124,107,0.06)',
                        border: '1px solid rgba(14,124,107,0.15)',
                        padding: '2px 8px',
                        borderRadius: '2px',
                        display: 'inline-block',
                        marginBottom: '6px',
                      }}
                    >
                      {item.code}
                    </span>
                    <h3
                      className="line-clamp-1 transition-colors"
                      style={{
                        fontSize: '14px',
                        fontWeight: 700,
                        color: '#1A1A1A',
                        marginBottom: '6px',
                      }}
                    >
                      {item.label}
                    </h3>
                    <p
                      className="line-clamp-2"
                      style={{
                        fontSize: '12px',
                        color: '#4A4A4A',
                        lineHeight: 1.5,
                        marginBottom: '12px',
                      }}
                    >
                      {item.specs}
                    </p>
                  </div>

                  <div
                    className="flex items-center justify-between"
                    style={{
                      paddingTop: '12px',
                      borderTop: '1px solid #F5F7F7',
                      fontSize: '12px',
                    }}
                  >
                    <span
                      className="truncate"
                      style={{
                        color: '#6e7a76',
                        fontWeight: 500,
                        maxWidth: '140px',
                        fontSize: '11px',
                      }}
                    >
                      {item.material.split('(')[0]}
                    </span>
                    <span
                      className="flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                      style={{
                        color: '#0E7C6B',
                        fontWeight: 600,
                        fontSize: '12px',
                      }}
                    >
                      Inspect <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div
            className="text-center"
            style={{
              padding: '80px 16px',
              background: '#F5F7F7',
              borderRadius: '8px',
              border: '1px dashed #CED4D4',
              maxWidth: '560px',
              marginInline: 'auto',
              marginTop: '32px',
            }}
          >
            <Search
              size={40}
              className="mx-auto mb-3"
              style={{ color: '#6e7a76' }}
            />
            <h3
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#1A1A1A',
                marginBottom: '4px',
              }}
            >
              No products found
            </h3>
            <p
              style={{
                fontSize: '14px',
                color: '#4A4A4A',
                marginBottom: '20px',
              }}
            >
              We couldn&apos;t find any engineering items matching &ldquo;
              {searchQuery}&rdquo; in {activeFilter}.
            </p>
            <button
              onClick={() => {
                setActiveFilter('All');
                setSearchQuery('');
              }}
              className="cursor-pointer transition-colors"
              style={{
                padding: '10px 20px',
                borderRadius: '4px',
                background: '#0E7C6B',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: 600,
                border: 'none',
              }}
            >
              Reset All Filters
            </button>
          </div>
        )}
      </main>

      {/* ── 4. LIGHTBOX MODAL — Light-mode sidebar ───────────────────────── */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(8px)',
            padding: '8px',
          }}
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative w-full flex flex-col md:flex-row overflow-hidden"
            style={{
              maxWidth: '1100px',
              maxHeight: '92vh',
              background: '#ffffff',
              borderRadius: '8px',
              border: '1px solid #E1E4E4',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-3 right-3 z-30 cursor-pointer transition-colors"
              style={{
                padding: '8px',
                borderRadius: '4px',
                background: '#F5F7F7',
                border: '1px solid #E1E4E4',
                color: '#1A1A1A',
              }}
              title="Close modal (Esc)"
            >
              <X size={20} />
            </button>

            {/* Image area */}
            <div
              className="relative flex-1 flex items-center justify-center"
              style={{
                background: '#F5F7F7',
                minHeight: '320px',
              }}
            >
              <Image
                src={activeItem.src}
                alt={activeItem.label}
                fill
                className="object-contain"
                style={{ padding: '16px' }}
                sizes="(max-width: 1024px) 100vw, 65vw"
                priority
              />

              {/* Prev/Next arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((p) =>
                    p > 0 ? p - 1 : filteredItems.length - 1
                  );
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer transition-colors"
                style={{
                  padding: '10px',
                  borderRadius: '4px',
                  background: '#ffffff',
                  border: '1px solid #E1E4E4',
                  color: '#1A1A1A',
                  boxShadow: '0px 2px 4px rgba(0,0,0,0.05)',
                }}
                title="Previous image (←)"
              >
                <ChevronLeft size={22} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((p) =>
                    p < filteredItems.length - 1 ? p + 1 : 0
                  );
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-colors"
                style={{
                  padding: '10px',
                  borderRadius: '4px',
                  background: '#ffffff',
                  border: '1px solid #E1E4E4',
                  color: '#1A1A1A',
                  boxShadow: '0px 2px 4px rgba(0,0,0,0.05)',
                }}
                title="Next image (→)"
              >
                <ChevronRight size={22} />
              </button>

              {/* Counter badge */}
              <div
                className="absolute bottom-3 left-3"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: '#4A4A4A',
                  background: 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(4px)',
                  padding: '4px 12px',
                  borderRadius: '4px',
                  border: '1px solid #E1E4E4',
                }}
              >
                {lightboxIndex + 1} / {filteredItems.length}
              </div>
            </div>

            {/* Right sidebar — technical specs (DESIGN.md: Technical Specs Component) */}
            <div
              className="overflow-y-auto flex flex-col justify-between w-full md:w-96 md:border-l md:border-t-0"
              style={{
                padding: '24px',
                background: '#ffffff',
                borderTop: '1px solid #E1E4E4',
                borderColor: '#E1E4E4',
              }}
            >

              <div>
                {/* Category & SKU */}
                <div
                  className="flex items-center gap-2 flex-wrap"
                  style={{ marginBottom: '12px' }}
                >
                  <span
                    style={{
                      padding: '3px 10px',
                      borderRadius: '2px',
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      background: 'rgba(14,124,107,0.08)',
                      color: '#0E7C6B',
                      border: '1px solid rgba(14,124,107,0.15)',
                    }}
                  >
                    {activeItem.category}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      fontWeight: 500,
                      color: '#4A4A4A',
                      background: '#F5F7F7',
                      padding: '3px 10px',
                      borderRadius: '2px',
                      border: '1px solid #E1E4E4',
                    }}
                  >
                    {activeItem.code}
                  </span>
                </div>

                {/* Product title */}
                <h2
                  style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#1A1A1A',
                    lineHeight: 1.3,
                    marginBottom: '20px',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  {activeItem.label}
                </h2>

                {/* Technical key-value specs (DESIGN.md: mono-label for values, label-caps for keys) */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    marginBottom: '24px',
                  }}
                >
                  {[
                    {
                      key: 'Material Specification',
                      value: activeItem.material,
                    },
                    {
                      key: 'Technical Characteristics',
                      value: activeItem.specs,
                    },
                    {
                      key: 'Surface Finish & Treatment',
                      value: activeItem.finish,
                    },
                  ].map(({ key, value }) => (
                    <div
                      key={key}
                      style={{
                        padding: '12px',
                        borderRadius: '4px',
                        background: '#F5F7F7',
                        border: '1px solid #E1E4E4',
                      }}
                    >
                      <p
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          color: '#0E7C6B',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          marginBottom: '4px',
                          fontFamily: 'var(--font-sans)',
                        }}
                      >
                        {key}
                      </p>
                      <p
                        style={{
                          fontSize: '13px',
                          fontWeight: 500,
                          color: '#1A1A1A',
                          lineHeight: 1.4,
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div
                style={{
                  paddingTop: '16px',
                  borderTop: '1px solid #E1E4E4',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <a
                  href={getWhatsAppUrl(activeItem)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '4px',
                    background: '#25D366',
                    color: '#ffffff',
                    fontWeight: 600,
                    fontSize: '13px',
                    border: 'none',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  <MessageSquare size={16} />
                  Inquire on WhatsApp (Instant RFQ)
                </a>

                <Link
                  href={`/quote?product=${encodeURIComponent(activeItem.label)}&code=${encodeURIComponent(activeItem.code)}`}
                  className="flex items-center justify-center gap-2 cursor-pointer transition-colors text-center"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '4px',
                    background: '#1D4E89',
                    color: '#ffffff',
                    fontWeight: 600,
                    fontSize: '13px',
                    border: 'none',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  Request Detailed Technical Quote
                </Link>

                <p
                  style={{
                    fontSize: '11px',
                    textAlign: 'center',
                    color: '#6e7a76',
                    paddingTop: '4px',
                  }}
                >
                  Custom punch holes, gland plates &amp; RAL colors available on
                  request.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 5. BOTTOM CTA — Light-mode version ───────────────────────────── */}
      <section
        style={{
          background: '#1D4E89',
          color: '#ffffff',
          padding: '56px 0',
          borderTop: '1px solid #E1E4E4',
        }}
      >
        <div
          className="text-center"
          style={{
            maxWidth: '1280px',
            marginInline: 'auto',
            paddingInline: '24px',
          }}
        >
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2"
            style={{
              padding: '6px 14px',
              borderRadius: '2px',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#98f3de',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            <CheckCircle2 size={14} /> Custom Fabrication Services
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1.625rem, 1.25rem + 1.5vw, 2rem)',
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
              color: '#ffffff',
              marginBottom: '12px',
            }}
          >
            Need Custom Dimensions or Bespoke Sheet Metal Enclosures?
          </h2>

          <p
            style={{
              fontSize: '15px',
              fontWeight: 400,
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.8)',
              maxWidth: '640px',
              marginInline: 'auto',
              marginBottom: '32px',
            }}
          >
            Our Bhosari MIDC plant specializes in rapid custom prototyping from
            client CAD blueprints. Share your dimensional requirements, IP rating
            needs, and batch quantities for an instant turnaround quote.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/quote"
              className="w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer transition-colors"
              style={{
                padding: '14px 28px',
                borderRadius: '4px',
                background: '#0E7C6B',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                border: 'none',
                textDecoration: 'none',
              }}
            >
              Request Custom RFQ Online <ArrowRight size={16} />
            </Link>

            <a
              href="https://wa.me/919322563294?text=Hello%20Ruptech%2C%20I%20have%20a%20custom%20fabrication%20requirement%20and%20would%20like%20to%20discuss%20with%20an%20engineer."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer transition-colors"
              style={{
                padding: '14px 28px',
                borderRadius: '4px',
                background: 'rgba(255,255,255,0.1)',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                border: '1px solid rgba(255,255,255,0.2)',
                textDecoration: 'none',
              }}
            >
              <MessageSquare size={16} style={{ color: '#25D366' }} />
              Chat with Sales Engineer
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
