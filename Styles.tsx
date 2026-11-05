import React from 'react';

export const COLORS = {
  bgDark: '#0A0A0A',
  bgLight: '#F5F1E8',
  bgNight: '#1A1A2E',
  bgRoomDark: '#2D1B2D',
  textWhite: '#FFFFFF',
  textBlack: '#1A1A1A',
  dangerRed: '#D32F2F',
  dangerLight: '#FF3B30',
  ghostGreen: '#00D084',
  accentOrange: '#FF8C00',
  subtitleBg: '#FFFFFF',
  subtitleBorder: '#E0E0E0',
  ecomBlue: '#0066FF',
  locationGreen: '#8BC34A',
  yearRed: '#FF3B30',
};

export const FONTS = {
  // Noto Sans Bengali - best for Bangla rendering
  bengali: "'Noto Sans Bengali', 'Hind Siliguri', 'Nirmala UI', sans-serif",
  bengaliBold: "'Noto Sans Bengali', sans-serif",
  mono: "'JetBrains Mono', 'Consolas', monospace",
  sans: "'Inter', sans-serif",
};

export const LAYOUT = {
  width: 1080,
  height: 1920,
  fps: 30,
};

export const TYPOGRAPHY = {
  // Auto font sizing based on text length - for Bangla
  getSubtitleFontSize: (text: string) => {
    const len = text.length;
    if(len > 90) return 26;
    if(len > 70) return 28;
    if(len > 50) return 30;
    if(len > 30) return 32;
    return 34;
  },
  getLineHeight: (fontSize: number) => fontSize * 1.42,
  subtitlePadding: '22px 26px',
  subtitleRadius: 18,
};

// Bengali number map for count-up
export const BANGLA_NUMBERS: Record<string, string> = {
  '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
  '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯'
};

export function toBanglaNumber(num: string | number): string {
  return String(num).split('').map(c => BANGLA_NUMBERS[c] || c).join('');
}

export function formatBanglaMoney(amount: number): string {
  // 1000000 -> ১০,০০,০০০
  const en = amount.toLocaleString('en-IN'); // 10,00,000
  return toBanglaNumber(en);
}
