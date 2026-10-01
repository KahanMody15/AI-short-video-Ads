import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Check, 
    Zap, 
    Sparkles, 
    ShieldCheck, 
    HelpCircle, 
    ChevronDown, 
    ChevronUp, 
    CreditCard, 
    Lock, 
    ArrowRight, 
    Flame, 
    Award, 
    Sliders,
    X,
    Star,
    CheckCircle2
} from 'lucide-react';
import Title from '../components/Title';

interface Currency {
    symbol: string;
    code: string;
    rate: number; // multiplier relative to USD
}

const CURRENCIES: Currency[] = [
    { symbol: '$', code: 'USD', rate: 1 },
    { symbol: '₹', code: 'INR', rate: 83 },
    { symbol: '€', code: 'EUR', rate: 0.92 },
    { symbol: '£', code: 'GBP', rate: 0.79 },
];

export interface PricingPlan {
    id: string;
    name: string;
    badge?: string;
    tagline: string;
    monthlyPriceUSD: number;
    annualPriceUSD: number; // per month when billed annually
    videosPerMonth: number;
    resolution: string;
    isPopular?: boolean;
    features: string[];
    nonFeatures?: string[];
    buttonText: string;
    buttonVariant: 'primary' | 'secondary' | 'outline';
}

const PLANS: PricingPlan[] = [
    {
        id: 'free',
        name: 'Free Creator',
        tagline: 'Ideal for trying out AI video generation',
        monthlyPriceUSD: 0,
        annualPriceUSD: 0,
        videosPerMonth: 5,
        resolution: '720p HD',
        features: [
            '5 AI Short Videos / month',
            '720p HD Video Exports',
            'Standard AI Avatars (3 Models)',
            'Auto Captions & Subtitles',
            'Community Support',
            'Watermarked Exports'
        ],
        nonFeatures: [
            'No Watermark',
            '4K Ultra HD Export',
            'Custom Voice Cloning',
            'Commercial License'
        ],
        buttonText: 'Get Started Free',
        buttonVariant: 'outline'
    },
    {
        id: 'pro',
        name: 'Pro Creator',
        badge: 'MOST POPULAR',
        tagline: 'For viral social creators & marketers',
        monthlyPriceUSD: 29,
        annualPriceUSD: 23,
        videosPerMonth: 60,
        resolution: '1080p & 4K UHD',
        isPopular: true,
        features: [
            '60 AI Short Videos / month',
            '4K Ultra HD & 1080p 60fps Exports',
            'Full Access to 50+ Premium AI Avatars',
            'Custom Voice Cloning (1 Voice)',
            'No Watermark on Any Video',
            'Commercial Usage Rights',
            'Priority Fast Rendering Queue',
            'Auto Virality Captions & Emojis',
            'Direct Export to TikTok & Instagram'
        ],
        buttonText: 'Upgrade to Pro',
        buttonVariant: 'primary'
    },
    {
        id: 'agency',
        name: 'Agency & Studio',
        badge: 'BEST VALUE',
        tagline: 'Scale video output for multiple client brands',
        monthlyPriceUSD: 79,
        annualPriceUSD: 63,
        videosPerMonth: 200,
        resolution: '4K Ultra HD',
        features: [
            '200 AI Short Videos / month',
            '4K Ultra HD Cinema Quality',
            'Unlimited Custom Voice Clones',
            'Custom Avatar Upload & Training',
            '5 Team Seats Included',
            'Custom Brand Kits & Logo Overlays',
            'Full Commercial & Reselling Rights',
            'Ultra-Fast Priority Render (10s/video)',
            'Dedicated Account Manager & 24/7 VIP Support',
            'API Access & Webhook Integrations'
        ],
        buttonText: 'Start Agency Trial',
        buttonVariant: 'secondary'
    },
    {
        id: 'enterprise',
        name: 'Enterprise Custom',
        tagline: 'Custom AI infrastructure for high volume teams',
        monthlyPriceUSD: 199,
        annualPriceUSD: 159,
        videosPerMonth: 1000,
        resolution: 'Custom 4K/8K',
        features: [
            '1,000+ AI Short Videos / month',
            'Dedicated Private GPU Render Nodes',
            'Custom Proprietary AI Model Fine-tuning',
            'Unlimited Team Seats & Roles',
            'Custom SLA Guarantee (99.9% Uptime)',
            'SSO & Enterprise Security (SOC-2)',
            'Dedicated Success Manager & Training',
            'Custom Contract & Invoicing'
        ],
        buttonText: 'Contact Enterprise Sales',
        buttonVariant: 'outline'
    }
];

const FAQ_ITEMS = [
    {
        q: 'How do video credits work?',
        a: 'Each generated AI short video (up to 60 seconds in duration) consumes 1 video credit. Unused credits roll over for up to 60 days on Pro and Agency plans.'
    },
    {
        q: 'Can I switch or cancel my plan anytime?',
        a: 'Yes! You can upgrade, downgrade, or cancel your subscription at any time directly from your account settings. There are no cancellation fees or hidden lock-ins.'
    },
    {
        q: 'Do I own the commercial rights to generated videos?',
        a: 'On all paid plans (Pro, Agency, Enterprise), you retain 100% full commercial rights to use, monetize, or sell the generated short videos on YouTube Shorts, TikTok, Instagram Reels, or client ads.'
    },
    {
        q: 'What payment methods do you accept?',
        a: 'We accept all major International Credit/Debit Cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and UPI / NetBanking for users in India.'
    },
    {
        q: 'Is there a money-back guarantee?',
        a: 'Absolutely. We offer a 14-day hassle-free money-back guarantee. If you are not satisfied with our AI video quality, contact support within 14 days for a full refund.'
    },
    {
        q: 'What is Custom Voice Cloning?',
        a: 'Custom Voice Cloning allows you to record a short 30-second audio sample of your own voice or a brand ambassador voice. Our AI will synthesize and narrate any short script using that exact voice.'
    }
];

export default function Plans() {
    const [isAnnual, setIsAnnual] = useState(true);
    const [selectedCurrency, setSelectedCurrency] = useState<Currency>(CURRENCIES[0]);
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    
    // Calculator State
    const [desiredVideos, setDesiredVideos] = useState<number>(45);

    // Modal State
    const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<PricingPlan | null>(null);
    const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

    // Calculate formatted price based on currency and billing
    const getFormattedPrice = (plan: PricingPlan) => {
        const rawUsd = isAnnual ? plan.annualPriceUSD : plan.monthlyPriceUSD;
        if (rawUsd === 0) return 'Free';
        const converted = Math.round(rawUsd * selectedCurrency.rate);
        return `${selectedCurrency.symbol}${converted.toLocaleString()}`;
    };

    // Calculate recommended plan based on slider
    const getRecommendedPlanId = () => {
        if (desiredVideos <= 5) return 'free';
        if (desiredVideos <= 60) return 'pro';
        if (desiredVideos <= 200) return 'agency';
        return 'enterprise';
    };

    const recommendedPlanId = getRecommendedPlanId();

    const handleOpenCheckout = (plan: PricingPlan) => {
        setSelectedPlanForCheckout(plan);
        setIsPaymentSuccess(false);
    };

    const handleSimulatePayment = (e: React.FormEvent) => {
        e.preventDefault();
        setIsPaymentSuccess(true);
        setTimeout(() => {
            setSelectedPlanForCheckout(null);
            setIsPaymentSuccess(false);
        }, 3000);
    };

    return (
        <main className="pt-28 pb-20 relative z-10 overflow-hidden min-h-screen">
            {/* Background Glows */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/15 rounded-full blur-[160px] pointer-events-none" />
            <div className="absolute top-[600px] right-10 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4">
                {/* Hero Header */}
                <div className="text-center max-w-3xl mx-auto mb-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-6"
                    >
                        <Sparkles className="size-4 text-indigo-400" />
                        <span>Simple, Transparent Pricing • Scale as You Grow</span>
                    </motion.div>

                    <Title 
                        title="Subscription Plans"
                        heading="Flexible Plans for Creators & Agencies"
                        description="Produce viral short-form videos with realistic AI avatars, instant voiceovers, and 4K rendering. Choose the right plan for your workflow."
                    />

                    {/* Controls Row: Billing Toggle + Currency Selector */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-8 flex flex-wrap items-center justify-center gap-6"
                    >
                        {/* Billing Switcher */}
                        <div className="flex items-center gap-3 p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                            <button
                                onClick={() => setIsAnnual(false)}
                                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                                    !isAnnual 
                                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/40" 
                                        : "text-gray-400 hover:text-white"
                                }`}
                            >
                                Monthly Billing
                            </button>

                            <button
                                onClick={() => setIsAnnual(true)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                                    isAnnual 
                                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/40" 
                                        : "text-gray-400 hover:text-white"
                                }`}
                            >
                                <span>Annual Billing</span>
                                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold animate-pulse">
                                    SAVE 20%
                                </span>
                            </button>
                        </div>

                        {/* Currency Selector */}
                        <div className="flex items-center gap-2 p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs">
                            <span className="text-gray-400 pl-2">Currency:</span>
                            <div className="flex gap-1">
                                {CURRENCIES.map((curr) => (
                                    <button
                                        key={curr.code}
                                        onClick={() => setSelectedCurrency(curr)}
                                        className={`px-2.5 py-1 rounded-full text-xs font-mono font-semibold transition ${
                                            selectedCurrency.code === curr.code
                                                ? "bg-white/20 text-white border border-white/20"
                                                : "text-gray-400 hover:text-white"
                                        }`}
                                    >
                                        {curr.symbol} {curr.code}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Pricing Grid (4 Cards) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-20">
                    {PLANS.map((plan, index) => {
                        const isRecommended = plan.id === recommendedPlanId;
                        const formattedPrice = getFormattedPrice(plan);
                        
                        return (
                            <motion.div
                                key={plan.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index }}
                                className={`relative rounded-3xl p-6 flex flex-col justify-between backdrop-blur-xl transition-all duration-300 ${
                                    plan.isPopular 
                                        ? "bg-gradient-to-b from-indigo-950/80 via-gray-900/90 to-gray-950 border-2 border-indigo-500/80 shadow-2xl shadow-indigo-600/30 scale-[1.03] z-20"
                                        : isRecommended
                                        ? "bg-gray-900/90 border-2 border-emerald-500/60 shadow-xl shadow-emerald-500/20"
                                        : "bg-gray-900/60 border border-white/10 hover:border-white/20"
                                }`}
                            >
                                {/* Badge if Popular or Recommended */}
                                {plan.badge && (
                                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-lg shadow-indigo-500/50 flex items-center gap-1">
                                        <Flame className="size-3" />
                                        <span>{plan.badge}</span>
                                    </div>
                                )}

                                <div>
                                    {/* Plan Header */}
                                    <div className="mb-4 pt-2">
                                        <h3 className="text-xl font-bold text-white mb-1 flex items-center justify-between">
                                            <span>{plan.name}</span>
                                            {isRecommended && (
                                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                                    Ideal Match
                                                </span>
                                            )}
                                        </h3>
                                        <p className="text-gray-400 text-xs leading-relaxed min-h-[36px]">
                                            {plan.tagline}
                                        </p>
                                    </div>

                                    {/* Pricing Amount */}
                                    <div className="my-6 p-4 rounded-2xl bg-white/5 border border-white/10">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-3xl sm:text-4xl font-extrabold text-white">
                                                {formattedPrice}
                                            </span>
                                            {plan.monthlyPriceUSD > 0 && (
                                                <span className="text-gray-400 text-xs font-semibold">
                                                    / month
                                                </span>
                                            )}
                                        </div>

                                        {isAnnual && plan.monthlyPriceUSD > 0 && (
                                            <div className="text-[11px] text-emerald-400 mt-1 font-medium">
                                                Billed annually (Save {selectedCurrency.symbol}{Math.round((plan.monthlyPriceUSD - plan.annualPriceUSD) * 12 * selectedCurrency.rate)}/yr)
                                            </div>
                                        )}
                                        {!isAnnual && plan.monthlyPriceUSD > 0 && (
                                            <div className="text-[11px] text-gray-400 mt-1">
                                                Billed monthly
                                            </div>
                                        )}
                                    </div>

                                    {/* Key Highlight Metrics */}
                                    <div className="space-y-2 mb-6 text-xs border-b border-white/10 pb-6">
                                        <div className="flex justify-between items-center text-gray-300 font-medium">
                                            <span>Monthly Videos:</span>
                                            <span className="text-indigo-300 font-bold font-mono">{plan.videosPerMonth} shorts</span>
                                        </div>
                                        <div className="flex justify-between items-center text-gray-300 font-medium">
                                            <span>Quality:</span>
                                            <span className="text-white font-semibold">{plan.resolution}</span>
                                        </div>
                                    </div>

                                    {/* Features Checklist */}
                                    <div className="space-y-3 mb-8 text-xs">
                                        {plan.features.map((feat, fIdx) => (
                                            <div key={fIdx} className="flex items-start gap-2.5 text-gray-200">
                                                <div className="p-0.5 rounded-full bg-indigo-500/20 text-indigo-400 mt-0.5 flex-shrink-0">
                                                    <Check className="size-3.5" />
                                                </div>
                                                <span className="leading-tight">{feat}</span>
                                            </div>
                                        ))}

                                        {plan.nonFeatures?.map((nonFeat, nfIdx) => (
                                            <div key={nfIdx} className="flex items-start gap-2.5 text-gray-500 opacity-60">
                                                <X className="size-3.5 mt-0.5 flex-shrink-0 text-gray-500" />
                                                <span className="leading-tight line-through">{nonFeat}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Call to Action Button */}
                                <button
                                    onClick={() => handleOpenCheckout(plan)}
                                    className={`w-full py-3 px-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                                        plan.isPopular
                                            ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-xl shadow-indigo-600/40 hover:scale-[1.02]"
                                            : plan.buttonVariant === 'secondary'
                                            ? "bg-white text-gray-950 hover:bg-gray-200 font-extrabold shadow-lg"
                                            : "bg-white/10 hover:bg-white/20 text-white border border-white/15"
                                    }`}
                                >
                                    <span>{plan.buttonText}</span>
                                    <ArrowRight className="size-4" />
                                </button>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Interactive Credit & Video Volume Calculator */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-8 rounded-3xl bg-gradient-to-r from-gray-900 via-indigo-950/40 to-gray-900 border border-white/15 backdrop-blur-xl shadow-2xl mb-20"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-5">
                            <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-semibold uppercase mb-2">
                                <Sliders className="size-4" />
                                <span>Interactive Estimator</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">
                                How many videos do you create each month?
                            </h3>
                            <p className="text-gray-300 text-xs leading-relaxed">
                                Adjust the slider to estimate your required monthly video credits and see our automated plan recommendation.
                            </p>
                        </div>

                        <div className="lg:col-span-7 space-y-6">
                            <div className="p-6 rounded-2xl bg-black/40 border border-white/10">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-xs text-gray-400 font-medium">Monthly Short Videos:</span>
                                    <span className="text-2xl font-black text-indigo-400 font-mono">
                                        {desiredVideos} <span className="text-xs text-gray-300">videos/mo</span>
                                    </span>
                                </div>

                                <input 
                                    type="range"
                                    min={5}
                                    max={300}
                                    step={5}
                                    value={desiredVideos}
                                    onChange={(e) => setDesiredVideos(Number(e.target.value))}
                                    className="w-full h-2.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                />
                                <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-mono">
                                    <span>5 (Casual)</span>
                                    <span>60 (Pro Creator)</span>
                                    <span>200 (Agency)</span>
                                    <span>300+ (Enterprise)</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 rounded-2xl bg-indigo-600/20 border border-indigo-500/40">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 rounded-xl bg-indigo-600 text-white">
                                        <Award className="size-5" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-300 font-medium">Recommended Match:</div>
                                        <div className="text-white font-bold text-sm">
                                            {PLANS.find(p => p.id === recommendedPlanId)?.name} Tier
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleOpenCheckout(PLANS.find(p => p.id === recommendedPlanId)!)}
                                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition cursor-pointer"
                                >
                                    Select {PLANS.find(p => p.id === recommendedPlanId)?.name}
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Testimonial & Guarantee Ribbon */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    <div className="p-6 rounded-2xl bg-gray-900/60 border border-white/10 flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-indigo-500/20 text-indigo-400">
                            <ShieldCheck className="size-6" />
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-sm mb-1">14-Day Money Back Guarantee</h4>
                            <p className="text-gray-400 text-xs">Test all Pro & Agency features risk-free. If you aren't satisfied, get a 100% refund.</p>
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-gray-900/60 border border-white/10 flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400">
                            <Zap className="size-6" />
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-sm mb-1">Instant Render Pipeline</h4>
                            <p className="text-gray-400 text-xs">Generate 60-second HD short videos in less than 20 seconds powered by dedicated cloud GPUs.</p>
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-gray-900/60 border border-white/10 flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400">
                            <Star className="size-6 fill-amber-400" />
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-sm mb-1">Rated 4.9/5 by 10,000+ Creators</h4>
                            <p className="text-gray-400 text-xs">Trusted by YouTube Shorts creators, TikTok marketers, and e-commerce brand agencies globally.</p>
                        </div>
                    </div>
                </div>

                {/* FAQ Accordion Section */}
                <div className="max-w-3xl mx-auto mb-16">
                    <div className="text-center mb-10">
                        <div className="flex items-center justify-center gap-2 text-indigo-400 text-xs font-mono font-semibold uppercase mb-2">
                            <HelpCircle className="size-4" />
                            <span>Frequently Asked Questions</span>
                        </div>
                        <h3 className="text-3xl font-bold text-white">Got Questions? We Have Answers</h3>
                    </div>

                    <div className="space-y-4">
                        {FAQ_ITEMS.map((item, idx) => {
                            const isOpen = openFaq === idx;
                            return (
                                <div
                                    key={idx}
                                    className="rounded-2xl bg-gray-900/70 border border-white/10 overflow-hidden transition-all"
                                >
                                    <button
                                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                                        className="w-full p-5 text-left flex items-center justify-between text-white font-bold text-sm hover:text-indigo-300 transition cursor-pointer"
                                    >
                                        <span>{item.q}</span>
                                        {isOpen ? <ChevronUp className="size-5 text-indigo-400" /> : <ChevronDown className="size-5 text-gray-400" />}
                                    </button>

                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="px-5 pb-5 text-gray-300 text-xs leading-relaxed border-t border-white/5 pt-3"
                                            >
                                                {item.a}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Interactive Checkout Modal Simulator */}
            <AnimatePresence>
                {selectedPlanForCheckout && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                        onClick={() => setSelectedPlanForCheckout(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-lg bg-gray-900 border border-indigo-500/40 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8"
                        >
                            <button
                                onClick={() => setSelectedPlanForCheckout(null)}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition"
                            >
                                <X className="size-5" />
                            </button>

                            {!isPaymentSuccess ? (
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 rounded-2xl bg-indigo-600 text-white">
                                            <CreditCard className="size-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-lg">Checkout & Activation</h4>
                                            <p className="text-gray-400 text-xs">Simulated instant subscription setup</p>
                                        </div>
                                    </div>

                                    {/* Order Summary */}
                                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-6 space-y-2 text-xs">
                                        <div className="flex justify-between text-gray-300">
                                            <span>Selected Plan:</span>
                                            <span className="text-white font-bold">{selectedPlanForCheckout.name}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-300">
                                            <span>Billing Cycle:</span>
                                            <span className="text-indigo-400 font-semibold">{isAnnual ? 'Annual (20% Off)' : 'Monthly'}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-300">
                                            <span>Monthly Credits:</span>
                                            <span className="text-emerald-400 font-bold">{selectedPlanForCheckout.videosPerMonth} AI Videos</span>
                                        </div>
                                        <div className="pt-2 border-t border-white/10 flex justify-between text-sm text-white font-bold">
                                            <span>Total Due Today:</span>
                                            <span className="text-indigo-300">{getFormattedPrice(selectedPlanForCheckout)}</span>
                                        </div>
                                    </div>

                                    {/* Payment Form Simulator */}
                                    <form onSubmit={handleSimulatePayment} className="space-y-4 text-xs">
                                        <div>
                                            <label className="block text-gray-300 font-semibold mb-1">Account Email</label>
                                            <input 
                                                type="email" 
                                                required 
                                                defaultValue="creator@example.com"
                                                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 text-white focus:outline-none focus:border-indigo-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-gray-300 font-semibold mb-1">Card / UPI Details (Demo)</label>
                                            <div className="relative">
                                                <input 
                                                    type="text" 
                                                    required 
                                                    defaultValue="4242 •••• •••• 4242"
                                                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 text-white font-mono focus:outline-none focus:border-indigo-500"
                                                />
                                                <Lock className="absolute right-3 top-3.5 size-4 text-gray-400" />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/40 transition hover:scale-[1.02] cursor-pointer"
                                        >
                                            Confirm & Activate {selectedPlanForCheckout.name}
                                        </button>
                                    </form>
                                </div>
                            ) : (
                                <div className="text-center py-8 space-y-4">
                                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40 animate-bounce">
                                        <CheckCircle2 className="size-10" />
                                    </div>
                                    <h4 className="text-2xl font-bold text-white">Subscription Activated!</h4>
                                    <p className="text-gray-300 text-xs max-w-xs mx-auto">
                                        Your account has been upgraded to <strong className="text-indigo-400">{selectedPlanForCheckout.name}</strong>. Enjoy instant AI video generations!
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}