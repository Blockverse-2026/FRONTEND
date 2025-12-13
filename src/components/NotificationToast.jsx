import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationToast = ({ isOpen, message, type = 'info', onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '100%' }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          className={`fixed bottom-8 right-8 z-50 p-4 border backdrop-blur-md max-w-sm
            ${type === 'error' ? 'border-danger bg-danger/10 text-danger' : 'border-accent bg-accent/10 text-accent'}
            shadow-[0_0_15px_rgba(0,0,0,0.5)]
          `}
        >
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <h4 className="font-orbitron text-sm mb-1 uppercase tracking-wider">
                {type === 'error' ? 'System Alert' : 'Incoming Message'}
              </h4>
              <p className="text-sm font-spacemono text-white/90">
                {message}
              </p>
            </div>
            <button 
              onClick={onClose}
              className="hover:text-white transition-colors"
            >
              ×
            </button>
          </div>
          {/* Decorative corner */}
          <div className={`absolute top-0 right-0 w-2 h-2 border-t border-r ${type === 'error' ? 'border-danger' : 'border-accent'}`}></div>
          <div className={`absolute bottom-0 left-0 w-2 h-2 border-b border-l ${type === 'error' ? 'border-danger' : 'border-accent'}`}></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationToast;
