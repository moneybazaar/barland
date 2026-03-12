import { ReactNode, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

interface LegalPageLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

const LegalPageLayout = ({ title, description, children }: LegalPageLayoutProps) => {
  useEffect(() => {
    document.title = `${title} | Barclays Investment Bank`;

    const setMeta = (name: string, content: string, attr = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('og:title', `${title} | Barclays Investment Bank`, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:type', 'website', 'property');

    // JSON-LD
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description,
      publisher: {
        '@type': 'Organization',
        name: 'Barclays Investment Bank',
        url: 'https://www.ib.barclays',
      },
      inLanguage: 'en',
    };
    let script = document.querySelector('script[data-legal-jsonld]') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-legal-jsonld', 'true');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);

    return () => {
      script?.remove();
    };
  }, [title, description]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary hover:underline text-sm mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-secondary dark:text-foreground mb-8">
            {title}
          </h1>
          <div className="prose prose-sm max-w-none text-muted-foreground dark:text-foreground/80 space-y-6">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LegalPageLayout;
