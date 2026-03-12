import LegalPageLayout from '@/components/landing/LegalPageLayout';

const CookiesPolicy = () => {
  return (
    <LegalPageLayout title="Cookies Policy" description="Information about how Barclays Investment Bank uses cookies, the types of cookies we use, and how to manage your cookie preferences.">
      <section>
        <h2 className="text-xl font-semibold text-secondary dark:text-foreground mb-4">What Are Cookies</h2>
        <p>
          Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the owners of the site.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-secondary dark:text-foreground mb-4">How We Use Cookies</h2>
        <p>We use the following types of cookies:</p>
        <ul className="list-disc pl-6 space-y-3">
          <li>
            <strong>Strictly Necessary Cookies</strong> — These cookies are essential for the website to function properly. They enable core functionality such as security, network management, and account access. You cannot opt out of these cookies.
          </li>
          <li>
            <strong>Performance Cookies</strong> — These cookies collect information about how visitors use our website, such as which pages are visited most often. This data helps us improve how the website works.
          </li>
          <li>
            <strong>Functional Cookies</strong> — These cookies allow the website to remember choices you make (such as your region or language preference) and provide enhanced, more personalised features.
          </li>
          <li>
            <strong>Targeting Cookies</strong> — These cookies are used to deliver content that is more relevant to you and your interests. They may be used to deliver targeted advertising or to limit the number of times you see an advertisement.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-secondary dark:text-foreground mb-4">Email Cookies</h2>
        <p>
          In addition to the cookies we use on our website, we also use cookies and similar technologies in some emails and push notifications. These help us to understand whether you have opened the email and how you have interacted with it. If you have enabled images, cookies may be set on your computer or mobile device. Cookies will also be set if you click on any link within the email.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-secondary dark:text-foreground mb-4">Managing Cookies</h2>
        <p>
          Most web browsers allow you to control cookies through their settings. You can set your browser to refuse cookies or to alert you when cookies are being sent. Please note that if you disable or refuse cookies, some parts of this website may become inaccessible or not function properly.
        </p>
        <p>
          You can find information about how to manage cookies in your browser at the following links:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Chrome</a></li>
          <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mozilla Firefox</a></li>
          <li><a href="https://support.microsoft.com/en-gb/help/17442/windows-internet-explorer-delete-manage-cookies" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Microsoft Edge</a></li>
          <li><a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Apple Safari</a></li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-secondary dark:text-foreground mb-4">Changes to This Policy</h2>
        <p>
          We may update this cookies policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this page periodically.
        </p>
      </section>
    </LegalPageLayout>
  );
};

export default CookiesPolicy;
