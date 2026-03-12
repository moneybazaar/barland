import LegalPageLayout from '@/components/landing/LegalPageLayout';

const Disclosures = () => {
  return (
    <LegalPageLayout title="Disclosures">
      <section>
        <h2 className="text-xl font-semibold text-secondary dark:text-foreground mb-4">Status Disclosure</h2>
        <p>
          Barclays Bank PLC. Authorised by the Prudential Regulation Authority and regulated by the Financial Conduct Authority and the Prudential Regulation Authority. Registered in England. Registered No: 1026167. Registered Office: 1 Churchill Place, London E14 5HP.
        </p>
        <p>
          Barclays Capital Inc., an affiliate of Barclays Bank PLC, is a US registered broker/dealer and a member of SIPC, FINRA and NFA. Barclays Capital Inc. operates out of 745 Seventh Avenue, New York, NY 10019.
        </p>
        <p>
          Barclays Bank Ireland PLC, is regulated by the Central Bank of Ireland. Registered in Ireland. Registered Number: 396330. Registered Office: One Molesworth Street, Dublin 2, D02 RF29.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-secondary dark:text-foreground mb-4">Regulatory Disclosures</h2>
        <p>
          Barclays is required to make certain disclosures regarding its financial condition, regulatory capital and other regulatory matters. These disclosures are made in accordance with the requirements of the applicable regulatory authorities.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-secondary dark:text-foreground mb-4">MiFID II Disclosures</h2>
        <p>
          In accordance with Directive 2014/65/EU on Markets in Financial Instruments ("MiFID II") and relevant implementing measures, Barclays makes available certain information to clients and prospective clients regarding its services, costs and charges, conflicts of interest, and order execution and handling arrangements.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-secondary dark:text-foreground mb-4">Pillar 3 Disclosures</h2>
        <p>
          As required under CRD IV and the PRA's and FCA's rules, Barclays publishes Pillar 3 disclosures which provide information on risk management, risk exposures and capital adequacy. These disclosures are available in our annual Pillar 3 report.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-secondary dark:text-foreground mb-4">Conflicts of Interest</h2>
        <p>
          Barclays has established, implemented and maintains a Conflicts of Interest Policy to identify, manage and, where necessary, disclose conflicts of interest arising in the normal course of business. Potential conflicts of interest may exist within Barclays in the normal course of carrying out the activities of Barclays and the operations of other divisions, teams, and/or entities within Barclays' group.
        </p>
      </section>
    </LegalPageLayout>
  );
};

export default Disclosures;
