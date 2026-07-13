import { LegalLayout } from './LegalLayout'

export function TermsPage({ onHome }) {
  return (
    <LegalLayout title="Terms of Service" updated="July 12, 2026" onHome={onHome}>
      <section>
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing or using FrameDiff ("the Service"), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service.</p>
      </section>
      <section>
        <h2>2. Description of the Service</h2>
        <p>FrameDiff provides informational summaries of changes between versions of compliance frameworks and standards (such as NIST CSF, NIST SP 800-53, PCI DSS, ISO/IEC 27001, HIPAA, SOC 2, PCAOB standards, IRS Publication 4812, and DISA STIGs). The Service is provided for general informational purposes only.</p>
      </section>
      <section>
        <h2>3. No Professional Advice — Accuracy Disclaimer</h2>
        <p>The Service does not provide legal, audit, compliance, or professional advice. Content may contain errors, omissions, or outdated information. <strong>Always verify any change against the official framework documentation published by the relevant standards body before making compliance decisions.</strong> You are solely responsible for decisions made based on information from the Service.</p>
      </section>
      <section>
        <h2>4. Intellectual Property and Third-Party Content</h2>
        <p>Framework names and content are the property of their respective publishers (NIST, PCI SSC, ISO/IEC, AICPA, HHS, PCAOB, IRS, DISA). FrameDiff is not affiliated with, endorsed by, or sponsored by any framework publisher. For copyrighted frameworks (including ISO/IEC 27001 and SOC 2), the Service presents structural and metadata summaries only; full text is available exclusively from the official publisher. Summaries of PCI DSS changes are based on official PCI SSC Summary of Changes documents, © PCI Security Standards Council.</p>
      </section>
      <section>
        <h2>5. Acceptable Use</h2>
        <p>You may not use the Service to: scrape or bulk-download content for resale; misrepresent the Service's content as official framework documentation; or interfere with the operation of the Service.</p>
      </section>
      <section>
        <h2>6. Disclaimer of Warranties</h2>
        <p>THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF ACCURACY, MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
      </section>
      <section>
        <h2>7. Limitation of Liability</h2>
        <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, FRAMEDIFF AND ITS OPERATOR SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS ARISING FROM COMPLIANCE DECISIONS, AUDIT OUTCOMES, OR REGULATORY ACTIONS, RESULTING FROM YOUR USE OF THE SERVICE.</p>
      </section>
      <section>
        <h2>8. Changes to the Service and Terms</h2>
        <p>We may modify or discontinue the Service, or update these Terms, at any time. Continued use after changes constitutes acceptance of the updated Terms.</p>
      </section>
      <section>
        <h2>9. Contact</h2>
        <p>Questions about these Terms can be raised by <a href="https://github.com/aworeham-hash/framediff/issues" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-800">opening an issue on GitHub</a>.</p>
      </section>
    </LegalLayout>
  )
}
