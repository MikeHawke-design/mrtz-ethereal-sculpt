import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Upload, CheckCircle } from "lucide-react";
import { GrainOverlay, CursorGlow, OrganicShapes } from "@/components/VisualEffects";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/RevealOnScroll";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import sculpture4 from "@/assets/sculpture-4.jpg";

const pricingTiers = [
  {
    name: "Essence",
    startingPrice: 1500,
    size: "Small (up to 12\")",
    timeline: "4-6 weeks",
    includes: ["Consultation", "Concept sketches", "Single revision", "Certificate of authenticity"],
  },
  {
    name: "Statement",
    startingPrice: 4000,
    size: "Medium (12-24\")",
    timeline: "8-12 weeks",
    includes: ["Extended consultation", "3D mockup", "Two revisions", "Process documentation", "Certificate of authenticity"],
    featured: true,
  },
  {
    name: "Monument",
    startingPrice: 10000,
    size: "Large (24\"+)",
    timeline: "12-20 weeks",
    includes: ["Full creative partnership", "Multiple concepts", "Unlimited revisions", "Full documentation", "Installation support", "Certificate of authenticity"],
  },
];

const processSteps = [
  {
    number: "01",
    title: "Initial Consultation",
    description: "We discuss your vision, space requirements, and aesthetic preferences to understand the soul of your commission.",
  },
  {
    number: "02",
    title: "Concept Development",
    description: "I create preliminary sketches and 3D mockups, exploring different approaches to bring your vision to life.",
  },
  {
    number: "03",
    title: "Material Selection",
    description: "Together we select the perfect materials—bronze, resin, bone, found objects—to achieve the desired effect.",
  },
  {
    number: "04",
    title: "Creation",
    description: "The piece comes to life. You receive progress updates and documentation throughout the creation process.",
  },
  {
    number: "05",
    title: "Delivery & Installation",
    description: "Your sculpture is carefully prepared for transport and, if needed, I provide guidance or assistance with installation.",
  },
];

const Commission = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tier: "",
    description: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.description) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    setIsSubmitted(true);
    toast({
      title: "Request Received",
      description: "I'll be in touch within 48 hours to discuss your vision.",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <GrainOverlay />
      <CursorGlow />
      <OrganicShapes />
      <Navigation />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <RevealOnScroll className="text-center mb-20">
            <span className="text-xs tracking-[0.3em] uppercase text-primary font-body block mb-4">
              Bespoke Creations
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-light mb-6">
              Commission a Piece
            </h1>
            <div className="line-ornament w-24 mx-auto mb-8" />
            <p className="text-muted-foreground font-body max-w-lg mx-auto">
              Transform your vision into sculptural reality. Each commission is a 
              collaborative journey into the realm of form and shadow.
            </p>
          </RevealOnScroll>

          {/* Process Section */}
          <section className="mb-32">
            <RevealOnScroll className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-light">The Process</h2>
            </RevealOnScroll>

            <div className="grid md:grid-cols-5 gap-8">
              {processSteps.map((step, index) => (
                <RevealOnScroll key={step.number} delay={index * 0.1}>
                  <div className="text-center md:text-left">
                    <span className="font-display text-4xl text-primary/30 block mb-4">
                      {step.number}
                    </span>
                    <h3 className="font-display text-lg mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </section>

          {/* Pricing Tiers */}
          <section className="mb-32">
            <RevealOnScroll className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-light">Investment Tiers</h2>
              <p className="text-muted-foreground mt-4">Starting prices. Final pricing based on complexity and materials.</p>
            </RevealOnScroll>

            <div className="grid md:grid-cols-3 gap-8">
              {pricingTiers.map((tier, index) => (
                <RevealOnScroll key={tier.name} delay={index * 0.1}>
                  <motion.div
                    className={`border p-8 h-full flex flex-col ${
                      tier.featured 
                        ? "border-primary bg-primary/5" 
                        : "border-border"
                    }`}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {tier.featured && (
                      <span className="text-xs tracking-[0.2em] uppercase text-primary mb-4">
                        Most Popular
                      </span>
                    )}
                    <h3 className="font-display text-2xl mb-2">{tier.name}</h3>
                    <div className="mb-4">
                      <span className="text-xs text-muted-foreground">Starting at</span>
                      <span className="font-display text-3xl block">${tier.startingPrice.toLocaleString()}</span>
                    </div>
                    <div className="text-sm text-muted-foreground mb-6 space-y-1">
                      <p>{tier.size}</p>
                      <p>{tier.timeline}</p>
                    </div>
                    <ul className="space-y-3 flex-grow">
                      {tier.includes.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm">
                          <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant={tier.featured ? "default" : "outline"}
                      className="mt-8 w-full"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, tier: tier.name }));
                        document.getElementById("commission-form")?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Select {tier.name}
                    </Button>
                  </motion.div>
                </RevealOnScroll>
              ))}
            </div>
          </section>

          {/* Commission Form */}
          <section id="commission-form" className="max-w-2xl mx-auto">
            <RevealOnScroll className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-light">Begin Your Commission</h2>
            </RevealOnScroll>

            {isSubmitted ? (
              <RevealOnScroll>
                <div className="text-center py-16 border border-primary/30 bg-primary/5">
                  <CheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
                  <h3 className="font-display text-2xl mb-4">Request Received</h3>
                  <p className="text-muted-foreground">
                    Thank you for your interest. I'll review your request and reach out within 48 hours.
                  </p>
                </div>
              </RevealOnScroll>
            ) : (
              <RevealOnScroll>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">
                        Name
                      </label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="bg-muted border-border"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">
                        Email
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="bg-muted border-border"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">
                      Interest Tier
                    </label>
                    <select
                      value={formData.tier}
                      onChange={(e) => setFormData(prev => ({ ...prev, tier: e.target.value }))}
                      className="w-full bg-muted border border-border px-4 py-2 text-foreground"
                    >
                      <option value="">Select a tier (optional)</option>
                      {pricingTiers.map((tier) => (
                        <option key={tier.name} value={tier.name}>
                          {tier.name} - Starting at ${tier.startingPrice.toLocaleString()}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">
                      Your Vision
                    </label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      className="bg-muted border-border min-h-[150px]"
                      placeholder="Describe your vision, the space it's intended for, and any inspirations or references..."
                    />
                  </div>

                  <div className="border border-dashed border-border p-8 text-center">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Reference images (optional)
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Upload will be available after backend integration
                    </p>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <Send className="w-4 h-4 mr-2" />
                    Submit Commission Request
                  </Button>
                </form>
              </RevealOnScroll>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Commission;
