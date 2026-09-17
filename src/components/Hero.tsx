import { ArrowRightIcon, PlayIcon, ZapIcon, CheckIcon, ChevronLeft, ChevronRight, X, Sparkles } from 'lucide-react';
import { PrimaryButton, GhostButton } from './Buttons';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Hero() {

    const trustedUserImages = [
        'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=50',
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50',
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop'
    ];

    const galleryImages = [
        {
            url: 'https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?q=80&w=1600&auto=format&fit=crop',
            title: 'Social Team Commercial',
            tag: 'Social-ready • 9:16 & 16:9'
        },
        {
            url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1600&auto=format&fit=crop',
            title: 'E-Commerce Product Showcase',
            tag: 'Product Reel • 9:16'
        },
        {
            url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1600&auto=format&fit=crop',
            title: 'Creative Studio Lifestyle',
            tag: 'Commercial Ad • 16:9'
        },
        {
            url: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1600&auto=format&fit=crop',
            title: 'Tech Modern Reveal',
            tag: 'Viral Short • 9:16'
        }
    ];

    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [isAutoSlide, setIsAutoSlide] = useState(true);

    useEffect(() => {
        if (!isAutoSlide || isPreviewOpen) return;
        const interval = setInterval(() => {
            setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [isAutoSlide, isPreviewOpen]);

    const trustedLogosText = [
        'Adobe',
        'Figma',
        'Canva',
        'Shopify',
        'Webflow'
    ];

    return (
        <>
            <section id="home" className="relative z-10">
                <div className="max-w-6xl mx-auto px-4 min-h-screen max-md:w-screen max-md:overflow-hidden pt-32 md:pt-26 flex items-center justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div className="text-left">
                            <motion.a href="https://prebuiltui.com/tailwind-templates?ref=pixel-forge" className="inline-flex items-center gap-3 pl-3 pr-4 py-1.5 rounded-full bg-white/10 mb-6 justify-start"
                                initial={{ y: 60, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
                            >
                                <div className="flex -space-x-2">
                                    {trustedUserImages.map((src, i) => (
                                        <img
                                            key={i}
                                            src={src}
                                            alt={`Client ${i + 1}`}
                                            className="size-6 rounded-full border border-black/50"
                                            width={40}
                                            height={40}
                                        />
                                    ))}
                                </div>
                                <span className="text-xs text-gray-200/90">
                                    Trusted by many creators 
                                </span>
                            </motion.a>

                            <motion.h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 max-w-xl"
                                initial={{ y: 60, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.1 }}
                            >
                                Create viral UGC <br />
                                <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-300 to-indigo-400">
                                    in seconds
                                </span>
                            </motion.h1>

                            <motion.p className="text-gray-300 max-w-lg mb-8"
                                initial={{ y: 60, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.2 }}
                            >
                                Upload product images and a model photo - Our AI instantly produces professional lifestyle imagery and short-form videos optimized for commercials and reels.
                            </motion.p>

                            <motion.div className="flex flex-col sm:flex-row items-center gap-4 mb-8"
                                initial={{ y: 60, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.3 }}
                            >
                                <a href="/generate" className="w-full sm:w-auto">
                                    <PrimaryButton className="max-sm:w-full py-3 px-7">
                                        Start generating 
                                        <ArrowRightIcon className="size-4" />
                                    </PrimaryButton>
                                </a>

                                <GhostButton 
                                    onClick={() => setIsPreviewOpen(true)}
                                    className="max-sm:w-full max-sm:justify-center py-3 px-5 cursor-pointer"
                                >
                                    <PlayIcon className="size-4" />
                                    Watch demo
                                </GhostButton>
                            </motion.div>

                            <motion.div className="flex sm:inline-flex overflow-hidden items-center max-sm:justify-center text-sm text-gray-200 bg-white/10 rounded"
                                initial={{ y: 60, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.1 }}
                            >
                                <div className="flex items-center gap-2 p-2 px-3 sm:px-6.5 hover:bg-white/3 transition-colors">
                                    <ZapIcon className="size-4 text-sky-500" />
                                    <div>
                                        <div>Seconds to create</div>
                                        <div className="text-xs text-gray-400">
                                            Optimized social formats
                                        </div>
                                    </div>
                                </div>

                                <div className="hidden sm:block h-6 w-px bg-white/6" />

                                <div className="flex items-center gap-2 p-2 px-3 sm:px-6.5 hover:bg-white/3 transition-colors">
                                    <CheckIcon className="size-4 text-cyan-500" />
                                    <div>
                                        <div>Commercial rights</div>
                                        <div className="text-xs text-gray-400">
                                            Use anywhere, no fuss
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right: Interactive mockup card with photo sliding */}
                        <motion.div className="mx-auto w-full max-w-lg"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.5 }}
                        >
                            <motion.div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-linear-to-b from-black/80 to-gray-900 relative group">
                                <div className="relative aspect-16/10 bg-gray-900 overflow-hidden">
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={activeImageIndex}
                                            src={galleryImages[activeImageIndex].url}
                                            alt="agency-work-preview"
                                            className="w-full h-full object-cover object-center"
                                            initial={{ opacity: 0, scale: 1.05 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.4 }}
                                        />
                                    </AnimatePresence>

                                    {/* Tag Badge */}
                                    <div className="absolute left-4 top-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs border border-white/10 text-gray-200">
                                        {galleryImages[activeImageIndex].tag}
                                    </div>

                                    {/* Prev/Next Slide Arrows */}
                                    <button 
                                        onClick={() => {
                                            setIsAutoSlide(false);
                                            setActiveImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
                                        }}
                                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                                        aria-label="Previous image"
                                    >
                                        <ChevronLeft className="size-4" />
                                    </button>

                                    <button 
                                        onClick={() => {
                                            setIsAutoSlide(false);
                                            setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
                                        }}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                                        aria-label="Next image"
                                    >
                                        <ChevronRight className="size-4" />
                                    </button>

                                    {/* Interactive Preview Button */}
                                    <div className="absolute right-4 bottom-4">
                                        <button 
                                            onClick={() => setIsPreviewOpen(true)}
                                            className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-indigo-600/90 hover:bg-indigo-500 backdrop-blur-md text-white shadow-lg shadow-indigo-600/30 transition hover:scale-105 cursor-pointer"
                                        >
                                            <PlayIcon className="size-4 fill-white" />
                                            <span className="text-xs font-semibold">Preview</span>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Interactive Gallery Thumbnails Bar */}
                            <div className="mt-4 flex gap-3 items-center justify-start">
                                {galleryImages.slice(1).map((item, idx) => {
                                    const actualIndex = idx + 1;
                                    const isSelected = activeImageIndex === actualIndex;
                                    return (
                                        <motion.button
                                            key={idx}
                                            onClick={() => {
                                                setIsAutoSlide(false);
                                                setActiveImageIndex(actualIndex);
                                            }}
                                            initial={{ y: 20, opacity: 0 }}
                                            whileInView={{ y: 0, opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.1 + idx * 0.1 }}
                                            className={`w-14 h-10 rounded-lg overflow-hidden border transition-all duration-300 cursor-pointer ${
                                                isSelected 
                                                    ? "border-indigo-500 scale-110 shadow-md shadow-indigo-500/50 ring-2 ring-indigo-500/40" 
                                                    : "border-white/10 opacity-70 hover:opacity-100"
                                            }`}
                                        >
                                            <img
                                                src={item.url}
                                                alt="project-thumbnail"
                                                className="w-full h-full object-cover"
                                            />
                                        </motion.button>
                                    );
                                })}

                                <motion.a 
                                    href="#showcase-slider"
                                    className="text-sm text-gray-400 ml-2 flex items-center gap-2 hover:text-indigo-300 transition"
                                    initial={{ y: 60, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.2 }}
                                >
                                    <div className="relative flex h-3.5 w-3.5 items-center justify-center">
                                        <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping duration-300" />
                                        <span className="relative inline-flex size-2 rounded-full bg-green-600" />
                                    </div>
                                    +20 more
                                </motion.a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Video Modal Preview */}
            <AnimatePresence>
                {isPreviewOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                        onClick={() => setIsPreviewOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-3xl bg-gray-900 border border-white/20 rounded-3xl overflow-hidden shadow-2xl"
                        >
                            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/60">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="size-4 text-indigo-400" />
                                    <h4 className="text-white font-semibold text-sm">
                                        {galleryImages[activeImageIndex].title} - AI Video Preview
                                    </h4>
                                </div>
                                <button
                                    onClick={() => setIsPreviewOpen(false)}
                                    className="p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition"
                                >
                                    <X className="size-5" />
                                </button>
                            </div>

                            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
                                <img
                                    src={galleryImages[activeImageIndex].url}
                                    alt="Video Preview"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-6">
                                    <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-xl shadow-indigo-600/50 mb-4 animate-pulse">
                                        <PlayIcon className="size-8 fill-white ml-1" />
                                    </div>
                                    <h5 className="text-white font-bold text-lg mb-1">{galleryImages[activeImageIndex].title}</h5>
                                    <p className="text-gray-300 text-xs sm:text-sm max-w-md">
                                        Instant AI video generation demo.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* LOGO MARQUEE */}
            <motion.section className="border-y border-white/6 bg-white/1 max-md:mt-10"
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
            >
                <div className="max-w-6xl mx-auto px-6">
                    <div className="w-full overflow-hidden py-6">
                        <div className="flex gap-14 items-center justify-center animate-marquee whitespace-nowrap">
                            {trustedLogosText.concat(trustedLogosText).map((logo, i) => (
                                <span
                                    key={i}
                                    className="mx-6 text-sm md:text-base font-semibold text-gray-400 hover:text-gray-300 tracking-wide transition-colors"
                                >
                                    {logo}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.section>
        </>
    );
};