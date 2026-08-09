'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { usePlayer } from '@/context/PlayerContext';
import { Card, CardContent } from '@/components/ui/card';

interface ShowCardProps {
  id: string;
  title: string;
  host: string;
  description: string;
  image: string;
  schedule: string;
}

export function ShowCard({ id, title, host, description, image, schedule }: ShowCardProps) {
  const { setIsPlaying, setCurrentTrack } = usePlayer();

  const handlePlay = () => {
    setCurrentTrack({
      title,
      artist: host,
      duration: 0,
    });
    setIsPlaying(true);
  };

  return (
    <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
      <Card className="group relative gap-0 overflow-hidden py-0 hover:border-accent transition-colors">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <div className="absolute inset-0 bg-gradient-to-br from-accent-alt/10 to-destructive/10" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
            <motion.button
              onClick={handlePlay}
              className="p-4 bg-accent rounded-full hover:bg-accent/90 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play size={24} className="text-accent-foreground fill-accent-foreground" />
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-6">
          <h3 className="text-lg font-serif font-bold text-foreground mb-2 line-clamp-2">
            {title}
          </h3>
          <p className="text-sm text-accent font-medium mb-3">{host}</p>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {description}
          </p>
          <p className="text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full inline-block">
            {schedule}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
