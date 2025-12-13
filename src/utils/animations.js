export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 100
    }
  }
};

export const textReveal = {
  hidden: { opacity: 0, clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' },
  visible: {
    opacity: 1,
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    transition: {
      duration: 0.8,
      ease: [0.6, 0.05, 0.01, 0.9]
    }
  }
};

export const glitchVariant = {
  hidden: { skew: 0 },
  visible: {
    skew: [0, 5, -5, 0],
    x: [0, 2, -2, 0],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatType: "mirror",
      repeatDelay: 3
    }
  }
};
