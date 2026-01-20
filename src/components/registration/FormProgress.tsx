import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface FormProgressProps {
  percentage: number;
  currentSection: number;
  totalSections: number;
}

const SECTION_NAMES = [
  'Account Type',
  'Personal Information',
  'Address Information',
  'Employment',
  'Contact Details',
  'Account Credentials',
  'Joint Account',
  'Investment Sources',
  'Investment Experience',
  'Risk Tolerance',
  'Financial Information',
  'Accredited Investor',
  'Legal Disclaimers',
];

const FormProgress = ({ percentage, currentSection, totalSections }: FormProgressProps) => {
  return (
    <div className="progress-container">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Top row: Section info and percentage */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">
              Section {currentSection} of {totalSections}
            </span>
            <span className="text-muted-foreground hidden sm:inline">•</span>
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {SECTION_NAMES[currentSection - 1] || 'Getting Started'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {percentage === 100 && (
              <CheckCircle className="w-4 h-4 text-accent" />
            )}
            <span className="text-sm font-bold text-primary">
              {percentage}% Complete
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="progress-bar">
          <motion.div 
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>

        {/* Section dots */}
        <div className="flex justify-between mt-2">
          {Array.from({ length: totalSections }).map((_, idx) => (
            <div
              key={idx}
              className={`section-dot ${idx < currentSection ? 'complete' : ''} ${idx === currentSection - 1 ? 'current' : ''}`}
              title={SECTION_NAMES[idx]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormProgress;
