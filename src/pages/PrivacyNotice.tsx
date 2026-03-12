import LegalPageLayout from '@/components/landing/LegalPageLayout';

const PrivacyNotice = () => {
  return (
    <LegalPageLayout title="Privacy Notice" description="Learn how Barclays Investment Bank collects, uses, and protects your personal data. Our privacy notice outlines your rights and our data handling practices.">
      <section>
        <h2 className="text-xl font-semibold text-secondary dark:text-foreground mb-4">Introduction</h2>
        <p>
          Barclays Bank PLC ("we", "us", "our") is committed to protecting your privacy and handling your data in an open and transparent manner. This privacy notice explains how we collect, use and protect information about you when you use this website and our services.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-secondary dark:text-foreground mb-4">Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Identity Data</strong> — first name, last name, title</li>
          <li><strong>Contact Data</strong> — email address, telephone number</li>
          <li><strong>Technical Data</strong> — IP address, browser type, operating system, time zone, location data</li>
          <li><strong>Usage Data</strong> — information about how you use our website and services</li>
          <li><strong>Marketing and Communications Data</strong> — your preferences in receiving marketing and communications</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-secondary dark:text-foreground mb-4">How We Use Your Information</h2>
        <p>We use your information for the following purposes:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>To provide and improve our services</li>
          <li>To communicate with you about your enquiries</li>
          <li>To comply with legal and regulatory obligations</li>
          <li>To detect and prevent fraud</li>
          <li>For internal analytics and research</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-secondary dark:text-foreground mb-4">Data Sharing</h2>
        <p>
          We may share your personal data with selected third parties including business partners, service providers, regulators and other authorities where required by law. We require all third parties to respect the security of your personal data and to treat it in accordance with the law.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-secondary dark:text-foreground mb-4">Data Security</h2>
        <p>
          We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. We limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-secondary dark:text-foreground mb-4">Your Rights</h2>
        <p>Under applicable data protection laws, you have the right to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Request access to your personal data</li>
          <li>Request correction of your personal data</li>
          <li>Request erasure of your personal data</li>
          <li>Object to processing of your personal data</li>
          <li>Request restriction of processing</li>
          <li>Request data portability</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-secondary dark:text-foreground mb-4">Contact Us</h2>
        <p>
          If you have any questions about this privacy notice or our privacy practices, please contact our Data Protection Officer at Barclays Bank PLC, 1 Churchill Place, London E14 5HP.
        </p>
      </section>
    </LegalPageLayout>
  );
};

export default PrivacyNotice;
