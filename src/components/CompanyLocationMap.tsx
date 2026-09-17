import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    MapPin, 
    Navigation, 
    Phone, 
    Mail, 
    Clock, 
    Building2, 
    ExternalLink, 
    CheckCircle2, 
    Copy, 
    Globe, 
    Compass
} from 'lucide-react';
import Title from './Title';

export interface CompanyLocation {
    id: string;
    city: string;
    country: string;
    officeName: string;
    address: string;
    zipCode: string;
    phone: string;
    email: string;
    hours: string;
    status: string;
    lat: number;
    lng: number;
    embedUrl: string;
    googleMapsLink: string;
}

const COMPANY_OFFICES: CompanyLocation[] = [
    {
        id: "india-hq",
        city: "Bengaluru",
        country: "India",
        officeName: "India Global HQ & AI Tech Hub",
        address: "Outer Ring Road, Embassy TechVillage, Devarabeesanahalli",
        zipCode: "Bengaluru, Karnataka 560103, India",
        phone: "+91 (80) 4567 8900",
        email: "india-hq@aishortvideo.com",
        hours: "Mon - Fri: 9:30 AM - 6:30 PM IST",
        status: "Open Now",
        lat: 12.9260,
        lng: 77.6841,
        embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.751682335191!2d77.6841!3d12.9260!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13a40b991bfd%3A0x660ec05f013d80a1!2sEmbassy%20TechVillage%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
        googleMapsLink: "https://maps.google.com/?q=Embassy+TechVillage,+Bengaluru,+Karnataka,+India"
    },
    {
        id: "ny-studio",
        city: "New York",
        country: "USA",
        officeName: "East Coast Creative Lab",
        address: "350 5th Ave, Floor 42 (Empire State Building)",
        zipCode: "New York, NY 10118",
        phone: "+1 (212) 555-0188",
        email: "nyc@aishortvideo.com",
        hours: "Mon - Fri: 9:00 AM - 6:00 PM EST",
        status: "Open Now",
        lat: 40.7484,
        lng: -73.9857,
        embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.617540960814!2d-73.9882706!3d40.7484405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus",
        googleMapsLink: "https://maps.google.com/?q=Empire+State+Building,+New+York,+NY+10118"
    },
    {
        id: "london-hub",
        city: "London",
        country: "UK",
        officeName: "European Innovation Centre",
        address: "30 St Mary Axe (The Gherkin)",
        zipCode: "London EC3A 8EP, United Kingdom",
        phone: "+44 20 7946 0912",
        email: "uk@aishortvideo.com",
        hours: "Mon - Fri: 9:00 AM - 5:00 PM GMT",
        status: "Open Now",
        lat: 51.5145,
        lng: -0.0803,
        embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.907932684872!2d-0.0828751!3d51.5144883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487603b719460a57%3A0xe2da24a3501a350e!2s30%20St%20Mary%20Axe!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus",
        googleMapsLink: "https://maps.google.com/?q=30+St+Mary+Axe,+London+EC3A+8EP"
    },
    {
        id: "tokyo-lab",
        city: "Tokyo",
        country: "Japan",
        officeName: "Asia-Pacific R&D Hub",
        address: "Roppongi Hills Mori Tower 28F, Minato-ku",
        zipCode: "Tokyo 106-6108, Japan",
        phone: "+81 3 5555 0144",
        email: "tokyo@aishortvideo.com",
        hours: "Mon - Fri: 9:00 AM - 6:00 PM JST",
        status: "Open Now",
        lat: 35.6605,
        lng: 139.7292,
        embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.74797541604!2d139.726625!3d35.6605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188b771e8c715f%3A0x6334a1796118d361!2sRoppongi%20Hills%20Mori%20Tower!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus",
        googleMapsLink: "https://maps.google.com/?q=Roppongi+Hills+Mori+Tower,+Tokyo"
    }
];

export default function CompanyLocationMap() {
    const [selectedOffice, setSelectedOffice] = useState<CompanyLocation>(COMPANY_OFFICES[0]);
    const [copiedAddress, setCopiedAddress] = useState(false);

    const handleCopyAddress = () => {
        const fullAddr = `${selectedOffice.officeName}, ${selectedOffice.address}, ${selectedOffice.zipCode}`;
        navigator.clipboard.writeText(fullAddr);
        setCopiedAddress(true);
        setTimeout(() => setCopiedAddress(false), 2000);
    };

    return (
        <section id="location-map" className="py-20 relative z-10 overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4">
                {/* Section Title */}
                <Title 
                    title="Global Reach"
                    heading="Pin Our Company Location" 
                    description="Visit our global offices or find us on Google Maps. Select an office location below to update map coordinates and pin details."
                />

                {/* Office Location Switcher Tabs */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-10 mt-6">
                    {COMPANY_OFFICES.map((office) => {
                        const isSelected = selectedOffice.id === office.id;
                        return (
                            <button
                                key={office.id}
                                onClick={() => setSelectedOffice(office)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                                    isSelected
                                        ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 scale-105"
                                        : "bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10"
                                }`}
                            >
                                <MapPin className={`size-4 ${isSelected ? "text-white animate-bounce" : "text-indigo-400"}`} />
                                <span>{office.city}</span>
                                <span className="text-[10px] opacity-75 font-mono">({office.country})</span>
                            </button>
                        );
                    })}
                </div>

                {/* Main Interactive Map & Details Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* Left Column: Embedded Google Map & Interactive Floating Pin Marker */}
                    <div className="lg:col-span-8 relative">
                        <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-gray-900 h-[450px] sm:h-[520px] group">
                            {/* Embedded Google Maps iFrame */}
                            <AnimatePresence mode="wait">
                                <motion.iframe
                                    key={selectedOffice.id}
                                    title={`Google Map - ${selectedOffice.officeName}`}
                                    src={selectedOffice.embedUrl}
                                    className="w-full h-full border-0 filter grayscale contrast-125 brightness-90 hover:grayscale-0 transition-all duration-500"
                                    allowFullScreen={false}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                />
                            </AnimatePresence>

                            {/* Floating Custom Location Pin Marker Card */}
                            <motion.div 
                                className="absolute top-6 left-6 right-6 sm:right-auto sm:max-w-xs z-20"
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.4, delay: 0.2 }}
                            >
                                <div className="p-4 rounded-2xl bg-gray-950/90 backdrop-blur-xl border border-indigo-500/40 shadow-2xl shadow-black/80">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/40 flex-shrink-0 animate-pulse">
                                            <MapPin className="size-5" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-semibold font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                                    {selectedOffice.status}
                                                </span>
                                            </div>
                                            <h4 className="text-white font-bold text-sm mt-1">
                                                {selectedOffice.officeName}
                                            </h4>
                                            <p className="text-gray-300 text-xs mt-0.5 line-clamp-2">
                                                {selectedOffice.address}, {selectedOffice.zipCode}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Center Pin Indicator Badge */}
                            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                                <div className="relative flex items-center justify-center">
                                    <span className="absolute inline-flex h-16 w-16 rounded-full bg-indigo-500/30 animate-ping" />
                                    <div className="relative p-3 rounded-full bg-indigo-600 text-white shadow-2xl shadow-indigo-500/80 border-2 border-white">
                                        <Compass className="size-6 animate-spin-slow" />
                                    </div>
                                </div>
                            </div>

                            {/* Map Control Bar Overlay */}
                            <div className="absolute bottom-4 left-4 right-4 sm:right-auto flex items-center gap-2 z-20">
                                <a
                                    href={selectedOffice.googleMapsLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold backdrop-blur-md shadow-lg shadow-indigo-600/30 transition hover:scale-105"
                                >
                                    <Navigation className="size-3.5" />
                                    <span>Open in Google Maps</span>
                                    <ExternalLink className="size-3" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Office Location Details & Contact Info Panel */}
                    <div className="lg:col-span-4 flex flex-col justify-between">
                        <div className="p-6 sm:p-8 rounded-3xl bg-gray-900/90 border border-white/10 backdrop-blur-xl shadow-2xl h-full flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <Building2 className="size-5 text-indigo-400" />
                                    <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider font-semibold">
                                        Company Pin Location
                                    </span>
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-2">
                                    {selectedOffice.city} Office
                                </h3>
                                <p className="text-gray-400 text-xs font-medium mb-6">
                                    {selectedOffice.officeName}
                                </p>

                                <div className="space-y-4 text-sm">
                                    {/* Address */}
                                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500/30 transition">
                                        <MapPin className="size-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <div className="text-xs text-gray-400 font-semibold">Full Address</div>
                                            <div className="text-gray-200 text-xs mt-0.5 font-medium">
                                                {selectedOffice.address}
                                            </div>
                                            <div className="text-gray-400 text-[11px]">
                                                {selectedOffice.zipCode}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500/30 transition">
                                        <Phone className="size-4 text-emerald-400 flex-shrink-0" />
                                        <div>
                                            <div className="text-xs text-gray-400 font-semibold">Phone Support</div>
                                            <a href={`tel:${selectedOffice.phone}`} className="text-gray-200 text-xs hover:text-indigo-300 font-medium">
                                                {selectedOffice.phone}
                                            </a>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500/30 transition">
                                        <Mail className="size-4 text-sky-400 flex-shrink-0" />
                                        <div>
                                            <div className="text-xs text-gray-400 font-semibold">Email Contact</div>
                                            <a href={`mailto:${selectedOffice.email}`} className="text-gray-200 text-xs hover:text-indigo-300 font-medium">
                                                {selectedOffice.email}
                                            </a>
                                        </div>
                                    </div>

                                    {/* Hours */}
                                    <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500/30 transition">
                                        <Clock className="size-4 text-purple-400 flex-shrink-0" />
                                        <div>
                                            <div className="text-xs text-gray-400 font-semibold">Working Hours</div>
                                            <div className="text-gray-200 text-xs mt-0.5 font-medium">
                                                {selectedOffice.hours}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-8 space-y-3">
                                <button
                                    onClick={handleCopyAddress}
                                    className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-medium text-xs flex items-center justify-center gap-2 transition duration-300"
                                >
                                    {copiedAddress ? (
                                        <>
                                            <CheckCircle2 className="size-4 text-emerald-400" />
                                            <span>Address Copied to Clipboard!</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="size-4 text-gray-300" />
                                            <span>Copy Full Office Address</span>
                                        </>
                                    )}
                                </button>

                                <a
                                    href={selectedOffice.googleMapsLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition duration-300 hover:scale-[1.02]"
                                >
                                    <Globe className="size-4" />
                                    <span>Get Google Maps Directions</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
