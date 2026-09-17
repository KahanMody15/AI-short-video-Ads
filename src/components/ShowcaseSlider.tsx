import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Play, 
    Pause, 
    ChevronLeft, 
    ChevronRight, 
    Sparkles, 
    Maximize2, 
    X, 
    CheckCircle2, 
    Share2, 
    Video, 
    Smartphone
} from 'lucide-react';
import Title from './Title';

export interface ShowcaseSlide {
    id: number;
    title: string;
    category: string;
    aspectRatio: string;
    duration: string;
    views: string;
    mainImage: string;
    videoUrl?: string;
    description: string;
    tags: string[];
    thumbnails: string[];
}

const SAMPLE_SLIDES: ShowcaseSlide[] = [
    {
        id: 1,
        title: "E-Commerce Lifestyle Campaign",
        category: "Social-ready",
        aspectRatio: "9:16 & 16:9",
        duration: "0:15",
        views: "142K views",
        mainImage: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?q=80&w=1600&auto=format&fit=crop",
        description: "AI-generated photorealistic brand team collaboration video optimized for Instagram Reels and TikTok ads.",
        tags: ["Viral Shorts", "Commercial", "AI Models"],
        thumbnails: [
            "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=200",
            "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=200",
            "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=200",
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=200"
        ]
    },
    {
        id: 2,
        title: "SaaS Product Demo & Motion Graphics",
        category: "Product Launch",
        aspectRatio: "16:9 4K",
        duration: "0:30",
        views: "98K views",
        mainImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1600&auto=format&fit=crop",
        description: "High-converting software feature overview with dynamic lighting and synthetic voiceover commentary.",
        tags: ["SaaS Tech", "High CTR", "Feature Demo"],
        thumbnails: [
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=200",
            "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=200",
            "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=200",
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=200"
        ]
    },
    {
        id: 3,
        title: "Fashion & Luxury Apparel Reel",
        category: "UGC Shorts",
        aspectRatio: "9:16 Vertical",
        duration: "0:12",
        views: "230K views",
        mainImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop",
        description: "Cinematic outfit styling slideshow created instantly from single static garment photos.",
        tags: ["Lookbook", "Trend Music", "Fashion AI"],
        thumbnails: [
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=200",
            "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=200",
            "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=200",
            "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=200"
        ]
    },
    {
        id: 4,
        title: "Cyberpunk Tech Gadget Teaser",
        category: "3D Animation",
        aspectRatio: "16:9 & 9:16",
        duration: "0:24",
        views: "185K views",
        mainImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600&auto=format&fit=crop",
        description: "Futuristic hardware reveal with particle lighting and immersive background soundscape design.",
        tags: ["Cyberpunk", "Hardware", "Neon Glow"],
        thumbnails: [
            "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=200",
            "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=200",
            "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=200",
            "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=200"
        ]
    }
];

const CATEGORIES = ["All Videos", "Social-ready", "Product Launch", "UGC Shorts", "3D Animation"];

export default function ShowcaseSlider() {
    const [slides] = useState<ShowcaseSlide[]>(SAMPLE_SLIDES);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeCategory, setActiveCategory] = useState("All Videos");
    const [selectedThumbnail, setSelectedThumbnail] = useState<number>(0);
    const [isAutoplay, setIsAutoplay] = useState(true);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const filteredSlides = activeCategory === "All Videos" 
        ? slides 
        : slides.filter(slide => slide.category === activeCategory);

    const currentSlide = filteredSlides[currentIndex] || slides[0];

    // Autoplay slide rotation
    useEffect(() => {
        if (!isAutoplay || isPreviewOpen) return;
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredSlides.length);
            setSelectedThumbnail(0);
        }, 5000);
        return () => clearInterval(interval);
    }, [isAutoplay, filteredSlides.length, isPreviewOpen]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredSlides.length);
        setSelectedThumbnail(0);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + filteredSlides.length) % filteredSlides.length);
        setSelectedThumbnail(0);
    };

    const handleCategoryChange = (cat: string) => {
        setActiveCategory(cat);
        setCurrentIndex(0);
        setSelectedThumbnail(0);
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="showcase-slider" className="py-20 relative z-10 overflow-hidden">
            {/* Background Glow Accents */}
            <div className="absolute top-1/3 -left-32 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 -right-32 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4">
                {/* Header Title */}
                <Title 
                    title="Interactive Showcase"
                    heading="Interactive Video Slider Showcase"
                    description="Explore high-impact AI video templates designed for multi-platform social media ads, commercials, and product showcases."
                />

                {/* Category Filters */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-10 mt-6">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryChange(cat)}
                            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                                activeCategory === cat
                                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 scale-105"
                                    : "bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Main Showcase Container */}
                <div className="bg-linear-to-b from-gray-900/90 to-black/90 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative">
                    {/* Top Controls Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
                        <div className="flex items-center gap-3">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
                                <Sparkles className="size-3.5" />
                                {currentSlide.category}
                            </span>
                            <span className="text-xs text-gray-400 font-mono flex items-center gap-1">
                                <Smartphone className="size-3.5 text-gray-500" />
                                {currentSlide.aspectRatio}
                            </span>
                        </div>

                        {/* Slide Navigation Controls & Autoplay */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsAutoplay(!isAutoplay)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
                                    isAutoplay 
                                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" 
                                        : "bg-white/5 text-gray-400 border border-white/10"
                                }`}
                                title="Toggle Autoplay"
                            >
                                {isAutoplay ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
                                <span>{isAutoplay ? "Autoplay On" : "Autoplay Paused"}</span>
                            </button>

                            <button
                                onClick={handleShare}
                                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 transition"
                                title="Share Showcase"
                            >
                                {copied ? <CheckCircle2 className="size-4 text-green-400" /> : <Share2 className="size-4" />}
                            </button>

                            <div className="flex items-center gap-1 ml-2">
                                <button
                                    onClick={handlePrev}
                                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 transition"
                                    aria-label="Previous Slide"
                                >
                                    <ChevronLeft className="size-4" />
                                </button>
                                <span className="text-xs text-gray-400 px-2 font-mono">
                                    {currentIndex + 1} / {filteredSlides.length}
                                </span>
                                <button
                                    onClick={handleNext}
                                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 transition"
                                    aria-label="Next Slide"
                                >
                                    <ChevronRight className="size-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Slide Card Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        {/* Left: Main Preview Player Display */}
                        <div className="lg:col-span-7">
                            <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-black aspect-16/10 group">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={`${currentSlide.id}-${selectedThumbnail}`}
                                        src={currentSlide.thumbnails[selectedThumbnail] || currentSlide.mainImage}
                                        alt={currentSlide.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.02 }}
                                        transition={{ duration: 0.4 }}
                                    />
                                </AnimatePresence>

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                                {/* Aspect Tag Badge */}
                                <div className="absolute left-4 top-4 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md text-xs text-gray-200 font-medium border border-white/10 flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                                    {currentSlide.category} • {currentSlide.aspectRatio}
                                </div>

                                {/* Duration Tag */}
                                <div className="absolute right-4 top-4 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md text-xs text-gray-300 font-mono border border-white/10">
                                    {currentSlide.duration}
                                </div>

                                {/* Preview Button Overlay */}
                                <div className="absolute left-4 bottom-4 flex items-center gap-2">
                                    <button
                                        onClick={() => setIsPreviewOpen(true)}
                                        className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs sm:text-sm backdrop-blur-md shadow-lg shadow-indigo-600/30 transition duration-300 hover:scale-105"
                                    >
                                        <Play className="size-4 fill-white" />
                                        <span>Preview Video</span>
                                    </button>
                                </div>

                                <div className="absolute right-4 bottom-4">
                                    <button
                                        onClick={() => setIsPreviewOpen(true)}
                                        className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white backdrop-blur-md transition"
                                        title="Expand Fullscreen"
                                    >
                                        <Maximize2 className="size-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Thumbnail Selector Strip */}
                            <div className="mt-4 flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                                {currentSlide.thumbnails.map((thumb, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedThumbnail(idx)}
                                        className={`relative w-20 h-14 rounded-xl overflow-hidden border-2 transition-all duration-300 flex-shrink-0 ${
                                            selectedThumbnail === idx
                                                ? "border-indigo-500 scale-105 shadow-md shadow-indigo-500/30 ring-2 ring-indigo-500/40"
                                                : "border-white/10 opacity-70 hover:opacity-100"
                                        }`}
                                    >
                                        <img
                                            src={thumb}
                                            alt={`Thumbnail ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                        {selectedThumbnail === idx && (
                                            <div className="absolute inset-0 bg-indigo-600/20" />
                                        )}
                                    </button>
                                ))}

                                <div className="text-xs text-gray-400 flex items-center gap-2 px-3 py-3 rounded-xl bg-white/5 border border-white/10 flex-shrink-0">
                                    <div className="relative flex h-3 w-3 items-center justify-center">
                                        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                                        <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                                    </div>
                                    <span className="font-semibold text-gray-200">+20 templates</span>
                                </div>
                            </div>
                        </div>

                        {/* Right: Slide Details Info & Action Panel */}
                        <div className="lg:col-span-5 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <Video className="size-4 text-indigo-400" />
                                    <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider font-semibold">
                                        Featured Template
                                    </span>
                                </div>

                                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
                                    {currentSlide.title}
                                </h3>

                                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                                    {currentSlide.description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {currentSlide.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300 font-medium"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Highlights Stats Box */}
                                <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 mb-6">
                                    <div className="text-center">
                                        <div className="text-xs text-gray-400">Total Views</div>
                                        <div className="text-sm font-bold text-indigo-300 mt-1">{currentSlide.views}</div>
                                    </div>
                                    <div className="text-center border-x border-white/10">
                                        <div className="text-xs text-gray-400">Render Time</div>
                                        <div className="text-sm font-bold text-emerald-400 mt-1">~12 Sec</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-xs text-gray-400">Ratio</div>
                                        <div className="text-sm font-bold text-sky-400 mt-1">{currentSlide.aspectRatio.split(' ')[0]}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="flex items-center gap-4">
                                <a
                                    href="/generate"
                                    className="flex-1 text-center py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 transition duration-300 hover:scale-[1.02]"
                                >
                                    Use This Slide Template
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Pagination Indicators Dots */}
                    <div className="flex items-center justify-center gap-2 mt-8 pt-4 border-t border-white/10">
                        {filteredSlides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setCurrentIndex(idx);
                                    setSelectedThumbnail(0);
                                }}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    currentIndex === idx ? "w-8 bg-indigo-500" : "w-2 bg-white/20 hover:bg-white/40"
                                }`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Video Preview Modal */}
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
                            className="relative w-full max-w-4xl bg-gray-900 border border-white/20 rounded-3xl overflow-hidden shadow-2xl"
                        >
                            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/50">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="size-4 text-indigo-400" />
                                    <h4 className="text-white font-semibold text-sm sm:text-base">
                                        {currentSlide.title} - Full Video Preview
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
                                    src={currentSlide.thumbnails[selectedThumbnail] || currentSlide.mainImage}
                                    alt="Video Preview"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-6">
                                    <div className="w-16 h-16 rounded-full bg-indigo-600/90 text-white flex items-center justify-center shadow-xl shadow-indigo-600/50 mb-4 animate-pulse">
                                        <Play className="size-8 fill-white ml-1" />
                                    </div>
                                    <h5 className="text-white font-bold text-lg mb-1">{currentSlide.title}</h5>
                                    <p className="text-gray-300 text-xs sm:text-sm max-w-md">
                                        High-definition preview player rendered with AI neural video pipeline.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
