'use client';
import React from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Main/navbar";
import Navbar2 from "../components/Main/pNavbar/pNav";
import Footer from "../components/Main/Footer/footer";
import Hero from "../components/Main/Hero/Hero";

const Home = () => {
  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <div id="navbar1">
            <Navbar />
          </div>
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Navbar2 />
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Hero />
          </m.div>

          <m.main
            style={{ paddingTop: "160px" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          ></m.main>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <Footer />
          </m.div>
        </m.div>
      </AnimatePresence>
    </LazyMotion>
  );
};

export default Home;



