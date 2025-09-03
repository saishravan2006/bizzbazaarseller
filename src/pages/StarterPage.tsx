import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Smartphone, Store, Users } from 'lucide-react';

const StarterPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/');
  };

  // Animation variants
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const imageVariants = {
    initial: { opacity: 0, scale: 0.8, y: 50 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.3
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.8
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(102, 51, 153, 0.3)",
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <><div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10 flex flex-col"></div>
      /* Background decorative elements */
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/3 to-transparent rounded-full" />
      </div><motion.div
        className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {/* Header Section */}
        <motion.div
          className="text-center mb-8 sm:mb-12"
          variants={{
            initial: { opacity: 0, y: 30 },
            animate: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                ease: "easeInOut"
              }
            }
          }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 tracking-tight"
            style={{
              fontFamily: 'Manrope, system-ui, sans-serif',
              background: 'linear-gradient(135deg, hsl(266 64% 45%) 0%, hsl(145 63% 42%) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Welcome to Bizz Bazaar
          </motion.h1>
          <motion.p
            className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            Your gateway to connecting local stores with customers
          </motion.p>
        </motion.div>

        {/* Main Image Section */}
        </motion.div>
        <motion.div
          className="relative mb-8 sm:mb-12"
          variants={{
            initial: { opacity: 0, scale: 0.8, y: 50 },
            animate: {
              opacity: 1,
              scale: 1,
              y: 0,
              transition: {
                duration: 1,
                ease: "easeOut",
                delay: 0.3
              }
            },
            hover: {
              scale: 1.05,
              transition: {
                duration: 0.3,
                ease: "easeOut"
              }
            }
          }}
          whileHover="hover"
        >
          {/* Glow effect behind image */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl scale-110" />

          {/* Main image container */}
          <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20">
            <img
              src="/images/hero-image.jpg" />
