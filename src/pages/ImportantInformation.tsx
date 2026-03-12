import LegalPageLayout from '@/components/landing/LegalPageLayout';

const ImportantInformation = () => {
  return (
    <LegalPageLayout title="Important Information" description="Important legal information about the use of the Barclays Investment Bank website, including terms of use, intellectual property, and liability.">
      <section>
        <h2 className="text-xl font-semibold text-secondary dark:text-foreground mb-4">General</h2>
        <p>
          This website is owned and operated by Barclays Bank PLC. References on this website to "Barclays" means Barclays Bank PLC together with its subsidiaries and affiliated undertakings. Barclays Bank PLC is authorised by the Prudential Regulation Authority and regulated by the Financial Conduct Authority and the Prudential Regulation Authority (Financial Services Register No. 122702). Registered in England. Registered No: 1026167. Registered office: 1 Churchill Place, London E14 5HP.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-secondary dark:text-foreground mb-4">Use of this Website</h2>
        <p>
          The information, materials and opinions contained on this website are for general information purposes only, are not intended to constitute legal or other professional advice, and should not be relied on or treated as a substitute for specific advice relevant to particular circumstances.
        </p>
        <p>
          We do not warrant or represent that the content of this website is accurate, complete or up to date. While every effort is made to ensure that the information on this website is correct, no warranty, express or implied, is made as to its accuracy and we do not accept any liability for error or omission.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-secondary dark:text-foreground mb-4">Intellectual Property</h2>
        <p>
          Unless otherwise stated, the copyright and other intellectual property rights in all material on this website (including without limitation photographs and graphical images) are owned by Barclays or its licensors. For the purposes of these terms and conditions, any use of extracts from this website other than in accordance with these terms is prohibited.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-secondary dark:text-foreground mb-4">Limitation of Liability</h2>
        <p>
          Barclays will not be liable for any damages (including, without limitation, damages for loss of business or loss of profits) arising in contract, tort or otherwise from the use of, or inability to use, this website, or any material contained in it, or from any action or decision taken as a result of using this website or any such material.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-secondary dark:text-foreground mb-4">Third Party Websites</h2>
        <p>
          This website may contain links to third party websites. Such links are provided for reference only. Barclays does not control such third party websites and is not responsible for their content. The inclusion of links to third party websites does not imply any endorsement of the material on such websites or any association with their operators.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-secondary dark:text-foreground mb-4">Governing Law</h2>
        <p>
          These terms and conditions shall be governed by and construed in accordance with English law. Disputes arising in connection with these terms and conditions shall be subject to the exclusive jurisdiction of the English courts.
        </p>
      </section>
    </LegalPageLayout>
  );
};

export default ImportantInformation;
