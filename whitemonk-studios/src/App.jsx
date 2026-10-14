import React from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import Journey from "./components/Journey.jsx";
import Services from "./components/Services.jsx";
import Work from "./components/Work.jsx";
import Proof from "./components/Proof.jsx";
import Contact from "./components/Contact.jsx";

export default function App() {
  return (
    <div className="grain relative min-h-screen bg-ink text-white">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Journey />
        <Services />
        <Work />
        <Proof />
        <Contact />
      </main>
    </div>
  );
}
