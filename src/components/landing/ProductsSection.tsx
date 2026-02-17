import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Shield, 
  Calendar, 
  ArrowLeftRight, 
  Percent,
  Flag,
  FileText,
  Gauge,
  Layers,
  Building2,
  TrendingUp,
  DollarSign,
  Wallet
} from 'lucide-react';

const products = [
  {
    id: 'cds',
    title: 'FDIC-Insured Brokered CDs',
    description: 'Access certificates of deposit from multiple FDIC-insured institutions through a single brokerage account, maximizing insurance coverage while optimizing yield.',
    features: [
      { icon: Shield, title: 'FDIC Insurance', desc: 'Up to $250,000 per depositor, per insured bank' },
      { icon: Calendar, title: 'Term Flexibility', desc: '3 months to 5 years with competitive rates' },
      { icon: ArrowLeftRight, title: 'Secondary Market Liquidity', desc: 'Tradable before maturity without early withdrawal penalties' },
      { icon: Percent, title: 'Yield Advantage', desc: 'Typically higher rates than direct bank CDs' },
    ],
  },
  {
    id: 'treasuries',
    title: 'U.S. Treasury Securities',
    description: 'Direct obligations of the U.S. Government with the highest credit quality, offering tax advantages and deep market liquidity.',
    features: [
      { icon: Flag, title: 'Full Faith & Credit', desc: 'Backed by the U.S. Government' },
      { icon: FileText, title: 'Tax Advantages', desc: 'Exempt from state and local income taxes' },
      { icon: Gauge, title: 'High Liquidity', desc: 'Most actively traded securities globally' },
      { icon: Layers, title: 'Portfolio Foundation', desc: 'Core allocation for capital preservation' },
    ],
  },
  {
    id: 'agency',
    title: 'Government Agency Bonds',
    description: 'Bonds issued by government-sponsored enterprises offering higher yields than Treasuries with implicit government backing.',
    features: [
      { icon: Building2, title: 'Implicit Backing', desc: 'Issued by GSEs with government support' },
      { icon: TrendingUp, title: 'Yield Enhancement', desc: 'Higher yields than comparable Treasuries' },
      { icon: Shield, title: 'High Credit Quality', desc: 'AAA/AA rated securities' },
      { icon: Calendar, title: 'Various Maturities', desc: 'Short to long-term options available' },
    ],
  },
  {
    id: 'annuities',
    title: 'Fixed Annuity Solutions',
    description: 'Guaranteed lifetime income products designed for retirement security, offering predictable payments and tax-deferred growth.',
    features: [
      { icon: DollarSign, title: 'Guaranteed Income', desc: 'Lifetime payment options available' },
      { icon: Shield, title: 'Principal Protection', desc: 'Protected by state guarantee associations' },
      { icon: FileText, title: 'Tax-Deferred Growth', desc: 'Compound growth without annual taxes' },
      { icon: Wallet, title: 'Estate Planning', desc: 'Beneficiary designation options' },
    ],
  },
];

const ProductsSection = () => {
  const [activeTab, setActiveTab] = useState('cds');
  const activeProduct = products.find(p => p.id === activeTab)!;

  return (
    <section id="products" className="py-24 md:py-32 section-gray">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl section-title">
            FDIC-Insured Investment Solutions
          </h2>
          <p className="section-description">
            A comprehensive suite of fixed income solutions designed to preserve capital
            and generate predictable income streams.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {products.map((product) => (
            <button
              key={product.id}
              onClick={() => setActiveTab(product.id)}
              className={`tab-button ${activeTab === product.id ? 'active' : ''}`}
            >
              {product.id === 'cds' && 'Brokered CDs'}
              {product.id === 'treasuries' && 'Treasuries'}
              {product.id === 'agency' && 'Agency Bonds'}
              {product.id === 'annuities' && 'Fixed Annuities'}
            </button>
          ))}
        </motion.div>

        {/* Product Card */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-card rounded-2xl p-10 md:p-12 max-w-5xl mx-auto"
          style={{ boxShadow: '0 8px 40px rgba(0, 0, 0, 0.06)' }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-secondary dark:text-foreground mb-4">
            {activeProduct.title}
          </h3>
          <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
            {activeProduct.description}
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {activeProduct.features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-5"
              >
                <div className="feature-icon flex-shrink-0">
                  <feature.icon strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-bold text-secondary dark:text-foreground mb-1.5">{feature.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;
