import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import NeonButton from './NeonButton';
import { useGame } from '../context/GameContext';

const AVATAR_URL = "https://images.unsplash.com/photo-1514846326710-1f9e3e6f34f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80";

const GUIDE_STEPS = {
  '/dashboard': [
    { id: 'missions', selector: '[data-guide-id=\"active-missions\"]', titleKey: 'missions_title', contentKey: 'missions_body', placement: 'right', delay: 150 }
  ],
  '/round1': [
    { id: 'grid', selector: '[data-guide-id=\"round1-grid\"]', titleKey: 'grid_title', contentKey: 'grid_body', placement: 'right', delay: 150 },
    { id: 'log', selector: '[data-guide-id=\"mission-log\"]', titleKey: 'log_title', contentKey: 'log_body', placement: 'left', delay: 150 }
  ]
};

const I18N = {
  en: {
    enter_title: 'Enter Genova Realm',
    enter_body: 'Start the connection sequence from here.',
    missions_title: 'Active Missions',
    missions_body: 'Launch rounds and access Secure Chat.',
    grid_title: 'Firewall Grid',
    grid_body: 'Tap a red node to attempt a bypass.',
    log_title: 'Mission Log',
    log_body: 'Objectives and system status are summarized here.',
    next: 'Next',
    prev: 'Previous',
    skip: 'Skip',
    done: 'Done'
  },
  es: {
    enter_title: 'Entrar al Reino Genova',
    enter_body: 'Inicia la secuencia de conexión aquí.',
    missions_title: 'Misiones Activas',
    missions_body: 'Inicia rondas y accede al Chat Seguro.',
    grid_title: 'Cortafuegos',
    grid_body: 'Pulsa un nodo rojo para intentar el acceso.',
    log_title: 'Registro de Misión',
    log_body: 'Resumen de objetivos y estado del sistema.',
    next: 'Siguiente',
    prev: 'Anterior',
    skip: 'Saltar',
    done: 'Hecho'
  }
};

const StoryGuide = () => {
  const location = useLocation();
  const { lang = 'en' } = useGame();
  const [isOpen, setIsOpen] = useState(false);
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState(null);
  const [delayedReady, setDelayedReady] = useState(false);
  const [panelPos, setPanelPos] = useState({ left: 24, top: 24 });
  const overlayRef = useRef(null);

  const t = (key) => (I18N[lang] && I18N[lang][key]) || I18N.en[key];

  const storageKey = (suffix) => `guide:${location.pathname}:${suffix}:${lang}`;
  const metricsKey = () => `guideMetrics:${location.pathname}:${lang}`;

  const recordMetric = (type) => {
    const raw = localStorage.getItem(metricsKey());
    const data = raw ? JSON.parse(raw) : { views: 0, skips: 0, completes: 0 };
    if (type === 'view') data.views += 1;
    if (type === 'skip') data.skips += 1;
    if (type === 'complete') data.completes += 1;
    localStorage.setItem(metricsKey(), JSON.stringify(data));
  };

  useEffect(() => {
    const completed = localStorage.getItem(storageKey('completed')) === 'true';
    const routeSteps = GUIDE_STEPS[location.pathname] || [];
    setSteps(routeSteps);
    if (routeSteps.length && !completed) {
      setIsOpen(true);
      setStepIndex(Number(localStorage.getItem(storageKey('step')) || 0));
      recordMetric('view');
    } else {
      setIsOpen(false);
    }
  }, [location.pathname, lang]);

  useEffect(() => {
    if (!isOpen || !steps[stepIndex]) return;
    const delay = steps[stepIndex].delay || 0;
    const timer = setTimeout(() => setDelayedReady(true), delay);
    return () => clearTimeout(timer);
  }, [isOpen, steps, stepIndex]);

  useEffect(() => {
    if (!isOpen || !steps[stepIndex] || !delayedReady) return;
    const target = document.querySelector(steps[stepIndex].selector);
    if (target) {
      const rect = target.getBoundingClientRect();
      setTargetRect({ x: rect.left, y: rect.top, w: rect.width, h: rect.height });
      const panelW = 360;
      const panelH = 220;
      const margin = 16;
      const viewportW = window.innerWidth;
      const viewportH = window.innerHeight;
      let left = 24;
      let top = 24;
      if (viewportW - (rect.right + margin) >= panelW + 24) {
        left = rect.right + margin;
        top = Math.min(rect.top, viewportH - panelH - 24);
      } else if (viewportH - (rect.bottom + margin) >= panelH + 24) {
        left = Math.min(Math.max(24, rect.left), viewportW - panelW - 24);
        top = rect.bottom + margin;
      } else if (rect.left - margin >= panelW + 24) {
        left = rect.left - panelW - margin;
        top = Math.min(rect.top, viewportH - panelH - 24);
      } else {
        left = Math.min(Math.max(24, rect.left), viewportW - panelW - 24);
        top = Math.max(24, rect.top - panelH - margin);
      }
      setPanelPos({ left, top });
    } else {
      setTargetRect(null);
      setPanelPos({ left: 24, top: 24 });
    }
  }, [isOpen, steps, stepIndex, delayedReady]);

  useEffect(() => {
    const onResize = () => {
      if (!isOpen || !steps[stepIndex]) return;
      const target = document.querySelector(steps[stepIndex].selector);
      if (target) {
        const rect = target.getBoundingClientRect();
        setTargetRect({ x: rect.left, y: rect.top, w: rect.width, h: rect.height });
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isOpen, steps, stepIndex]);

  useEffect(() => {
    const handleKey = (e) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') handleSkip();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, stepIndex, steps]);

  const handleNext = () => {
    if (stepIndex < steps.length - 1) {
      const next = stepIndex + 1;
      setStepIndex(next);
      localStorage.setItem(storageKey('step'), String(next));
      setDelayedReady(false);
    } else {
      localStorage.setItem(storageKey('completed'), 'true');
      recordMetric('complete');
      setIsOpen(false);
    }
  };

  const handlePrev = () => {
    const prev = Math.max(0, stepIndex - 1);
    setStepIndex(prev);
    localStorage.setItem(storageKey('step'), String(prev));
    setDelayedReady(false);
  };

  const handleSkip = () => {
    localStorage.setItem(storageKey('completed'), 'true');
    recordMetric('skip');
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            aria-hidden="true"
          />

          {targetRect && (
            <div 
              ref={overlayRef}
              className="fixed z-50 pointer-events-none"
              style={{ 
                left: targetRect.x - 8, 
                top: targetRect.y - 8, 
                width: targetRect.w + 16, 
                height: targetRect.h + 16 
              }}
            >
              <div className="w-full h-full rounded-md border-2 border-cyan-400 shadow-[0_0_20px_rgba(0,229,255,0.6)]" />
            </div>
          )}

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            role="dialog"
            aria-label="In-game guide"
            className="fixed z-50 max-w-sm p-6 bg-black/95 border border-cyan-500/50 rounded shadow-[0_0_25px_rgba(0,229,255,0.5)] backdrop-blur-md text-white overflow-hidden"
            style={{ left: panelPos.left, top: panelPos.top, width: 360 }}
          >
            <h4 className="text-cyan-300 font-orbitron text-xs tracking-widest uppercase mb-2">
              {t(steps[stepIndex]?.titleKey)}
            </h4>
            <p className="text-white/95 font-spacemono text-sm leading-relaxed">
              {t(steps[stepIndex]?.contentKey)}
            </p>

            <div className="mt-4 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <NeonButton onClick={handlePrev} className="text-xs px-3 py-1">{t('prev')}</NeonButton>
                <NeonButton onClick={handleNext} className="text-xs px-3 py-1">
                  {stepIndex < steps.length - 1 ? t('next') : t('done')}
                </NeonButton>
              </div>
              <button 
                onClick={handleSkip}
                className="text-white/70 hover:text-white text-xs font-spacemono"
                aria-label="Skip guide"
              >
                {t('skip')}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default StoryGuide;
