import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Region = 'US' | 'SG' | 'UK';

interface RegionConfig {
  region: Region;
  insuranceName: string;
  insuranceAbbr: string;
  insuranceLogo: string;
  insuranceMotto: string;
  coverageAmount: string;
  coverageAmountFull: string;
  insuranceFullName: string;
  memberLabel: string;
  currency: string;
  phoneNumber: string;
  phoneDisplay: string;
  buyBackAmount: string;
}

const regionConfigs: Record<Region, RegionConfig> = {
  US: {
    region: 'US',
    insuranceName: 'FDIC',
    insuranceAbbr: 'FDIC',
    insuranceLogo: '/fdic-logo.svg',
    insuranceMotto: 'FDIC-Insured - Backed by the full faith and credit of the U.S. Government',
    coverageAmount: '$250K',
    coverageAmountFull: '$250,000',
    insuranceFullName: 'Federal Deposit Insurance Corporation',
    memberLabel: 'Member FDIC',
    currency: 'USD',
    phoneNumber: '+18002272597',
    phoneDisplay: '1-800-BARCLAYS',
    buyBackAmount: '$2,000,000',
  },
  SG: {
    region: 'SG',
    insuranceName: 'SDIC',
    insuranceAbbr: 'SDIC',
    insuranceLogo: '/sdic-logo.png',
    insuranceMotto: 'Deposit Insurance — Policyowners\' Protection',
    coverageAmount: 'S$100K',
    coverageAmountFull: 'S$100,000',
    insuranceFullName: 'Singapore Deposit Insurance Corporation',
    memberLabel: 'DI Scheme Member',
    currency: 'SGD',
    phoneNumber: '+6563083858',
    phoneDisplay: '+65 6308 3858',
    buyBackAmount: 'S$2,000,000',
  },
  UK: {
    region: 'UK',
    insuranceName: 'FSCS',
    insuranceAbbr: 'FSCS',
    insuranceLogo: '/fscs-logo.png',
    insuranceMotto: 'FSCS Protected - Up to £85,000 per eligible person, per institution',
    coverageAmount: '£85K',
    coverageAmountFull: '£85,000',
    insuranceFullName: 'Financial Services Compensation Scheme',
    memberLabel: 'FSCS Protected',
    currency: 'GBP',
    phoneNumber: '+442071161000',
    phoneDisplay: '+44 207 116 1000',
    buyBackAmount: '£2,000,000',
  },
};

interface RegionContextType {
  region: Region;
  config: RegionConfig;
  setRegion: (region: Region) => void;
}

const RegionContext = createContext<RegionContextType | undefined>(undefined);

const allRegions: Region[] = ['US', 'SG', 'UK'];

function detectRegion(): Region {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz?.startsWith('Europe/London') || tz?.startsWith('Europe/Belfast')) return 'UK';
    if (tz?.startsWith('Asia/Singapore')) return 'SG';
    const lang = navigator.language || '';
    if (lang.includes('SG') || lang === 'zh-SG' || lang === 'en-SG') return 'SG';
    if (lang === 'en-GB') return 'UK';
  } catch {}
  return 'US';
}

export const RegionProvider = ({ children }: { children: ReactNode }) => {
  const [region, setRegion] = useState<Region>(() => {
    const saved = localStorage.getItem('barclays-region') as Region;
    return allRegions.includes(saved) ? saved : detectRegion();
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
