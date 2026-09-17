import Hero from "../components/Hero";
import ShowcaseSlider from "../components/ShowcaseSlider";
import Features from "../components/Features";
import CompanyLocationMap from "../components/CompanyLocationMap";
import Pricing from "../components/Pricing";
import Faq from "../components/Faq";
import CTA from "../components/CTA";

export default function Home() {
    return (
        <>
            <Hero />
            <ShowcaseSlider />
            <Features />
            <CompanyLocationMap />
            <Pricing />
            <Faq />
            <CTA />
        </>
    )
}