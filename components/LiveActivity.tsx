'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Heart, Users, MessageSquare } from 'lucide-react';

const MOCK_EVENTS = [
  { id: 1, text: "Someone from Nairobi just tuned in", icon: MapPin, color: "text-blue-500" },
  { id: 2, text: "Listener in Kampala sent a ❤️", icon: Heart, color: "text-red-500" },
  { id: 3, text: "New prayer request from Dar es Salaam", icon: MessageSquare, color: "text-green-500" },
  { id: 4, text: "A family in Nakuru is listening together", icon: Users, color: "text-purple-500" },
  { id: 5, text: "Listener from Eldoret joined the stream", icon: MapPin, color: "text-blue-500" },
  { id: 6, text: "Someone in Kigali sent a blessing", icon: MessageSquare, color: "text-accent" },
  { id: 7, text: "Mombasa listener sent a ❤️", icon: Heart, color: "text-red-500" },
  { id: 8, text: "New person from Entebbe listening", icon: MapPin, color: "text-blue-500" },
];

export function LiveActivity() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % MOCK_EVENTS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const event = MOCK_EVENTS[currentIndex];
  const Icon = event.icon;

  return (
    <div className="bg-card rounded-lg p-6 border border-border h-full flex flex-col justify-center overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Live Community Activity</h3>
      </div>

      <div className="relative h-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className={`p-2 rounded-full bg-secondary ${event.color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium text-foreground leading-tight">
              {event.text}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex gap-1">
        {MOCK_EVENTS.map((_, i) => (
          <div 
            key={i} 
            className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i === currentIndex ? 'bg-accent' : 'bg-secondary'}`} 
          />
        ))}
      </div>
    </div>
  );
}
