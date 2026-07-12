import { LegalLayout } from './LegalLayout'

export function PrivacyPage({ onHome }) {
  return (
    <LegalLayout title="Privacy Policy" updated="July 12, 2026" onHome={onHome}>
      <section>
        <h2>1. Overview</h2>
        <p>FrameDiff is designed to collect as little personal data as possible. No account is required to use the Service, and we do not sell or share personal data with third parties for advertising.</p>
      </section>
      <section>
        <h2>2. What We Collect</h2>
        <p><strong>Email address (optional):</strong> If you sign up for framework version alerts, we collect the email address you provide, along with which framework you subscribed from. We use it only to send version-release notifications. You can unsubscribe at any time by replying to any alert email.</p>
        <p><strong>Local preferences:</strong> Interface preferences (such as sidebar state) are stored in your browser's local storage and never leave your device.</p>
        <p><strong>Hosting logs:</strong> Our hosting provider (Vercel) may log standard technical data such as IP address and browser type for security and operations. See Vercel's privacy policy for details.</p>
      </section>
      <section>
        <h2>3. What We Don't Do</h2>
        <p>We do not use advertising trackers, sell data, or build profiles of users. We do not require login or collect names, payment details, or any sensitive personal data.</p>
      </section>
      <section>
        <h2>4. Data Processing</h2>
        <p>Alert signups are processed via a form-forwarding service and delivered to our operator inbox. Emails are retained only as long as needed to operate the alert list. To request deletion of your email from the list, contact aworeham@gmail.com.</p>
      </section>
      <section>
        <h2>5. Children's Privacy</h2>
        <p>The Service is intended for professional use and is not directed at children under 16.</p>
      </section>
      <section>
        <h2>6. Changes to This Policy</h2>
        <p>We will update this page if our data practices change. Material changes will be noted with a new "last updated" date.</p>
      </section>
      <section>
        <h2>7. Contact</h2>
        <p>Privacy questions or deletion requests: aworeham@gmail.com</p>
      </section>
    </LegalLayout>
  )
}
