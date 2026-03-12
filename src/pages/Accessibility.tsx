import LegalPageLayout from '@/components/landing/LegalPageLayout';

const Accessibility = () => {
  return (
    <LegalPageLayout title="Accessibility">
      <section>
        <h2 className="text-xl font-semibold text-secondary dark:text-foreground mb-4">Our Commitment</h2>
        <p>
          Barclays is committed to ensuring that our website is accessible to all users, including those with disabilities. We strive to meet the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-secondary dark:text-foreground mb-4">Accessibility Features</h2>
        <p>We have implemented the following features to support accessibility:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Alternative text for images</li>
          <li>Keyboard navigation support</li>
          <li>Consistent navigation structure</li>
          <li>Clear and readable fonts</li>
          <li>Sufficient colour contrast</li>
          <li>Resizable text without loss of functionality</li>
          <li>Descriptive link text</li>
          <li>Form labels and error messages</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-secondary dark:text-foreground mb-4">Browser Compatibility</h2>
        <p>
          This website is designed to be compatible with recent versions of major browsers including Google Chrome, Mozilla Firefox, Microsoft Edge, and Apple Safari. We recommend keeping your browser up to date for the best experience.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-secondary dark:text-foreground mb-4">Assistive Technologies</h2>
        <p>
          This website is designed to be compatible with assistive technologies such as screen readers, screen magnifiers, and speech recognition software. If you experience any issues using assistive technology with our website, please let us know.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-secondary dark:text-foreground mb-4">Feedback</h2>
        <p>
          We welcome your feedback on the accessibility of this website. If you encounter any accessibility barriers or have suggestions for improvement, please contact us at Barclays Bank PLC, 1 Churchill Place, London E14 5HP.
        </p>
      </section>
    </LegalPageLayout>
  );
};

export default Accessibility;
