import { motion } from "framer-motion";
import { DarkVignette, CursorGlow } from "@/components/VisualEffects";
import MysticalAtmosphere from "@/components/MysticalAtmosphere";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/RevealOnScroll";
import sculpture1 from "@/assets/sculpture-1.jpg";
import sculpture2 from "@/assets/sculpture-2.jpg";

const exhibitions = [
  { year: "2024", title: "Shadows & Bones", venue: "Dark Arts Gallery, Berlin" },
  { year: "2023", title: "Biomechanical Dreams", venue: "The Underground, London" },
  { year: "2023", title: "Collective Unconscious", venue: "Noir Gallery, Paris" },
  { year: "2022", title: "Emergence", venue: "Shadow Space, Los Angeles" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <MysticalAtmosphere />
      <DarkVignette />
      <CursorGlow />
      <Navigation />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <RevealOnScroll className="text-center mb-20">
            <span className="text-xs tracking-[0.3em] uppercase text-primary font-body block mb-4">
              The Artist
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-light mb-6">
              MRTZ
            </h1>
            <div className="line-ornament w-24 mx-auto" />
          </RevealOnScroll>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-16 mb-32">
            {/* Image */}
            <RevealOnScroll direction="left">
              <div className="relative">
                <motion.img
                  src={sculpture1}
                  alt="MRTZ at work"
                  className="w-full aspect-[4/5] object-cover"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
                />
                <div className="absolute -inset-4 border border-border/30 -z-10" />
              </div>
            </RevealOnScroll>

            {/* Bio */}
            <RevealOnScroll direction="right" delay={0.2}>
              <div className="lg:py-12">
                <h2 className="font-display text-3xl mb-8">Artist Statement</h2>
                <div className="space-y-6 text-muted-foreground font-body leading-relaxed">
                  <p>
                    I work in the liminal space between beauty and darkness, where organic forms 
                    twist into something both familiar and alien. My sculptures are born from 
                    the collision of biomechanical precision and primal, visceral emotion.
                  </p>
                  <p>
                    Inspired by the masters who came before—Giger's nightmarish elegance, 
                    the baroque drama of Bernini, the raw power of African ceremonial art—I 
                    seek to create objects that feel as though they've always existed, 
                    waiting to be discovered rather than created.
                  </p>
                  <p>
                    Each piece begins as a conversation with the material itself. Bronze, 
                    resin, bone, and found organic matter speak in their own language. My 
                    role is to listen and guide, to coax form from the void until something 
                    emerges that exists on the boundary between the living and the eternal.
                  </p>
                  <p>
                    The work is meant to be felt before it is understood. It should create 
                    a physical response—a quickening of breath, a moment of recognition, 
                    the sensation of being watched by something ancient.
                  </p>
                </div>

                <div className="mt-12 pt-8 border-t border-border">
                  <span className="text-xs tracking-[0.2em] uppercase text-primary block mb-4">
                    Philosophy
                  </span>
                  <blockquote className="font-display text-2xl italic text-foreground">
                    "In darkness, we find the truest forms. In elegance, we make them eternal."
                  </blockquote>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Process Section */}
          <section className="mb-32">
            <RevealOnScroll className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-light">The Process</h2>
            </RevealOnScroll>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <RevealOnScroll direction="left">
                <motion.img
                  src={sculpture2}
                  alt="Work in progress"
                  className="w-full aspect-square object-cover"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
                />
              </RevealOnScroll>

              <RevealOnScroll direction="right" delay={0.2}>
                <div className="space-y-8">
                  {[
                    {
                      title: "Concept",
                      text: "Every piece begins in the space between sleep and waking, where forms emerge unbidden. I sketch obsessively, filling journals with shapes that demand to exist."
                    },
                    {
                      title: "Material",
                      text: "I collect fragments—bones discovered in forests, antique metal components, organic matter preserved through natural processes. Each element carries its own history."
                    },
                    {
                      title: "Creation",
                      text: "The studio becomes a ritual space. Hours disappear as material transforms under my hands. I work until the piece reaches its own completion, telling me when to stop."
                    },
                    {
                      title: "Refinement",
                      text: "Surface treatment is where elegance emerges. Patinas are built layer by layer, creating depth that shifts with light and viewing angle."
                    },
                  ].map((item, index) => (
                    <div key={item.title}>
                      <h3 className="font-display text-xl mb-2 text-primary">{item.title}</h3>
                      <p className="text-muted-foreground font-body">{item.text}</p>
                    </div>
                  ))}
                </div>
              </RevealOnScroll>
            </div>
          </section>

          {/* Exhibitions */}
          <section>
            <RevealOnScroll className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-light">Selected Exhibitions</h2>
            </RevealOnScroll>

            <div className="max-w-2xl mx-auto">
              {exhibitions.map((exhibition, index) => (
                <RevealOnScroll key={exhibition.title} delay={index * 0.1}>
                  <div className="flex items-baseline gap-8 py-6 border-b border-border">
                    <span className="text-2xl font-display text-primary">{exhibition.year}</span>
                    <div>
                      <h3 className="font-display text-xl">{exhibition.title}</h3>
                      <p className="text-sm text-muted-foreground">{exhibition.venue}</p>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
