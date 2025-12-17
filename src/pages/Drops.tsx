import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Bell, CheckCircle } from "lucide-react";
import { GrainOverlay, CursorGlow, OrganicShapes } from "@/components/VisualEffects";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/RevealOnScroll";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import sculpture1 from "@/assets/sculpture-1.jpg";
import sculpture2 from "@/assets/sculpture-2.jpg";
import sculpture3 from "@/assets/sculpture-3.jpg";
import sculpture4 from "@/assets/sculpture-4.jpg";

const drops = [
  {
    id: 1,
    image: sculpture3,
    title: "The Awakening",
    edition: 10,
    price: 2500,
    status: "upcoming",
    dropDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    description: "A limited series exploring consciousness and emergence.",
  },
  {
    id: 2,
    image: sculpture1,
    title: "Biomech Series I",
    edition: 5,
    price: 4500,
    status: "upcoming",
    dropDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    description: "The first in a series of biomechanical explorations.",
  },
  {
    id: 3,
    image: sculpture4,
    title: "Shadow Fragment",
    edition: 15,
    sold: 15,
    price: 1800,
    status: "sold_out",
    dropDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    description: "Capturing the essence of darkness in sculptural form.",
  },
  {
    id: 4,
    image: sculpture2,
    title: "Vessel Collection",
    edition: 8,
    sold: 5,
    price: 3200,
    status: "available",
    remaining: 3,
    description: "Organic vessels that seem to breathe with life.",
  },
];

const Countdown = ({ targetDate }: { targetDate: Date }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-4">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="text-center">
          <span className="font-display text-2xl md:text-3xl text-foreground block">
            {String(value).padStart(2, "0")}
          </span>
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
};

const Drops = () => {
  const [email, setEmail] = useState("");

  const handleNotify = (dropTitle: string) => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email to receive notifications.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Notification Set",
      description: `You'll be notified when "${dropTitle}" drops.`,
    });
    setEmail("");
  };

  const upcomingDrops = drops.filter(d => d.status === "upcoming");
  const availableDrops = drops.filter(d => d.status === "available");
  const pastDrops = drops.filter(d => d.status === "sold_out");

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
              Limited Editions
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-light mb-6">
              Timed Drops
            </h1>
            <div className="line-ornament w-24 mx-auto mb-8" />
            <p className="text-muted-foreground font-body max-w-lg mx-auto">
              Exclusive releases of limited edition sculptures. Each piece is numbered, 
              authenticated, and ships worldwide.
            </p>
          </RevealOnScroll>

          {/* Email Signup */}
          <RevealOnScroll className="max-w-md mx-auto mb-20">
            <div className="bg-card border border-border p-6">
              <div className="flex items-center gap-3 mb-4">
                <Bell className="w-4 h-4 text-primary" />
                <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
                  Get Notified
                </span>
              </div>
              <div className="flex gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-muted border-border"
                />
                <Button
                  onClick={() => handleNotify("all drops")}
                  className="shrink-0"
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </RevealOnScroll>

          {/* Upcoming Drops */}
          {upcomingDrops.length > 0 && (
            <section className="mb-20">
              <RevealOnScroll className="mb-12">
                <h2 className="font-display text-3xl font-light flex items-center gap-4">
                  <Clock className="w-6 h-6 text-primary" />
                  Upcoming
                </h2>
              </RevealOnScroll>

              <div className="grid md:grid-cols-2 gap-8">
                {upcomingDrops.map((drop, index) => (
                  <RevealOnScroll key={drop.id} delay={index * 0.1}>
                    <motion.div
                      className="bg-card border border-border overflow-hidden"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative aspect-video">
                        <img
                          src={drop.image}
                          alt={drop.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                        <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 text-xs tracking-wider uppercase">
                          Coming Soon
                        </div>
                      </div>
                      <div className="p-6">
                        <span className="text-xs tracking-[0.2em] uppercase text-primary block mb-2">
                          Edition of {drop.edition}
                        </span>
                        <h3 className="font-display text-2xl mb-2">{drop.title}</h3>
                        <p className="text-sm text-muted-foreground mb-6">{drop.description}</p>
                        
                        <div className="mb-6">
                          <span className="text-xs text-muted-foreground block mb-3">Drops in:</span>
                          <Countdown targetDate={drop.dropDate} />
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="font-display text-xl">${drop.price.toLocaleString()}</span>
                          <Button variant="outline" onClick={() => handleNotify(drop.title)}>
                            <Bell className="w-4 h-4 mr-2" />
                            Notify Me
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  </RevealOnScroll>
                ))}
              </div>
            </section>
          )}

          {/* Available Now */}
          {availableDrops.length > 0 && (
            <section className="mb-20">
              <RevealOnScroll className="mb-12">
                <h2 className="font-display text-3xl font-light flex items-center gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  Available Now
                </h2>
              </RevealOnScroll>

              <div className="grid md:grid-cols-2 gap-8">
                {availableDrops.map((drop, index) => (
                  <RevealOnScroll key={drop.id} delay={index * 0.1}>
                    <motion.div
                      className="bg-card border border-primary/30 overflow-hidden"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative aspect-video">
                        <img
                          src={drop.image}
                          alt={drop.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                        <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 text-xs tracking-wider uppercase">
                          {drop.remaining} Left
                        </div>
                      </div>
                      <div className="p-6">
                        <span className="text-xs tracking-[0.2em] uppercase text-primary block mb-2">
                          Edition of {drop.edition}
                        </span>
                        <h3 className="font-display text-2xl mb-2">{drop.title}</h3>
                        <p className="text-sm text-muted-foreground mb-6">{drop.description}</p>

                        <div className="flex items-center justify-between">
                          <span className="font-display text-xl">${drop.price.toLocaleString()}</span>
                          <Button>
                            Purchase
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  </RevealOnScroll>
                ))}
              </div>
            </section>
          )}

          {/* Past Drops */}
          {pastDrops.length > 0 && (
            <section>
              <RevealOnScroll className="mb-12">
                <h2 className="font-display text-3xl font-light text-muted-foreground">
                  Past Drops
                </h2>
              </RevealOnScroll>

              <div className="grid md:grid-cols-3 gap-6 opacity-60">
                {pastDrops.map((drop, index) => (
                  <RevealOnScroll key={drop.id} delay={index * 0.1}>
                    <div className="bg-card border border-border overflow-hidden">
                      <div className="relative aspect-video">
                        <img
                          src={drop.image}
                          alt={drop.title}
                          className="w-full h-full object-cover grayscale"
                        />
                        <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                          <span className="text-xs tracking-[0.2em] uppercase border border-border px-4 py-2">
                            Sold Out
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-display text-lg">{drop.title}</h3>
                        <span className="text-sm text-muted-foreground">Edition of {drop.edition}</span>
                      </div>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Drops;
