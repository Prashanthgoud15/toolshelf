import {
  Scissors, Combine, QrCode, FileImage, Minimize2, Send, Sparkles,
  Wrench, FileText, Image, Share2, Type, Zap, Archive, Palette, Link2,
} from 'lucide-react';

// Add an icon here, then use its key as `icon` in src/data/tools.js
export const ICONS = {
  Scissors, Combine, QrCode, FileImage, Minimize2, Send, Sparkles,
  Wrench, FileText, Image, Share2, Type, Zap, Archive, Palette, Link2,
};

export const getIcon = (name) => ICONS[name] || Wrench;
