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
    <section id="products" className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4 section-title">
            FDIC-Insured Investment Solutions
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-8">
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
          className="flex flex-wrap justify-center gap-2 mb-10"
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
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="product-card p-8 md:p-10 max-w-5xl mx-auto"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-4 font-serif">
            {activeProduct.title}
          </h3>
          <p className="text-muted-foreground text-lg mb-8">
            {activeProduct.description}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {activeProduct.features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="feature-icon flex-shrink-0">
                  <feature.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-secondary mb-1">{feature.title}</h4>
                  <p className="text-muted-foreground text-sm">{feature.desc}</p>
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
