import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Region = 'US' | 'SG';

interface RegionConfig {
  region: Region;
  insuranceName: string;
  insuranceAbbr: string;
  insuranceLogo: string;
  insuranceMotto: string;
  coverageAmount: string;
  insuranceFullName: string;
  memberLabel: string;
  currency: string;
}

const regionConfigs: Record<Region, RegionConfig> = {
  US: {
    region: 'US',
    insuranceName: 'FDIC',
    insuranceAbbr: 'FDIC',
    insuranceLogo: '/fdic-logo.svg',
    insuranceMotto: 'Each depositor insured to at least $250,000',
    coverageAmount: '$250K',
    insuranceFullName: 'Federal Deposit Insurance Corporation',
    memberLabel: 'Member FDIC',
    currency: 'USD',
  },
  SG: {
    region: 'SG',
    insuranceName: 'SDIC',
    insuranceAbbr: 'SDIC',
    insuranceLogo: '/sdic-logo.png',
    insuranceMotto: 'Deposit Insurance — Policyowners\' Protection',
    coverageAmount: 'S$100K',
    insuranceFullName: 'Singapore Deposit Insurance Corporation',
    memberLabel: 'DI Scheme Member',
    currency: 'SGD',
  },
};

interface RegionContextType {
  region: Region;
  config: RegionConfig;
  setRegion: (region: Region) => void;
}

const RegionContext = createContext<RegionContextType | undefined>(undefined);

function detectRegion(): Region {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz?.startsWith('Asia/Singapore')) return 'SG';
    const lang = navigator.language || '';
    if (lang.includes('SG') || lang === 'zh-SG' || lang === 'en-SG') return 'SG';
  } catch {}
  return 'US';
}

export const RegionProvider = ({ children }: { children: ReactNode }) => {
  const [region, setRegion] = useState<Region>(() => {
    const saved = localStorage.getItem('barclays-region') as Region;
    return saved === 'US' || saved === 'SG' ? saved : detectRegion();
  });

  useEffect(() => {
    localStorage.setItem('barclays-region', region);
  }, [region]);

  return (
    <RegionContext.Provider value={{ region, config: regionConfigs[region], setRegion }}>
      {children}
    </RegionContext.Provider>
  );
};

export const useRegion = () => {
  const ctx = useContext(RegionContext);
  if (!ctx) throw new Error('useRegion must be used within RegionProvider');
  return ctx;
};
