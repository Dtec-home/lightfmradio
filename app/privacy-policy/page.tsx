import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Player } from '@/components/Player';
import { Footer } from '@/components/Footer';
import { PageHeader } from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how Light FM collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <Player />

      <main className="pt-16 pb-24">
        <PageHeader title="Privacy policy" intro="Last updated: April 23, 2026" />

        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex max-w-prose flex-col gap-10 text-lg leading-relaxed text-foreground/90">
              <p>
                Light FM ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy
                explains how we collect, use, and safeguard your information when you use our website.
              </p>

              <div>
                <h2 className="mb-3 font-display text-2xl font-semibold uppercase">1. Information We Collect</h2>
                <ul className="flex list-disc flex-col gap-2 pl-6 text-muted-foreground">
                  <li>
                    <span className="text-foreground">Contact details:</span> such as your name and email address
                    when you submit forms.
                  </li>
                  <li>
                    <span className="text-foreground">Message content:</span> information you provide through prayer
                    requests or contact submissions.
                  </li>
                  <li>
                    <span className="text-foreground">Technical data:</span> non-personal analytics such as browser
                    type, pages visited, and general usage metrics.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="mb-3 font-display text-2xl font-semibold uppercase">2. How We Use Information</h2>
                <ul className="flex list-disc flex-col gap-2 pl-6 text-muted-foreground">
                  <li>To respond to messages, prayer requests, and ministry inquiries.</li>
                  <li>To improve website content, performance, and user experience.</li>
                  <li>To support ministry communication and outreach efforts.</li>
                </ul>
              </div>

              <div>
                <h2 className="mb-3 font-display text-2xl font-semibold uppercase">3. Sharing of Information</h2>
                <p className="text-muted-foreground">
                  We do not sell your personal information. We may share limited data with trusted service providers
                  who help us operate the website, and only when necessary.
                </p>
              </div>

              <div>
                <h2 className="mb-3 font-display text-2xl font-semibold uppercase">4. Data Security</h2>
                <p className="text-muted-foreground">
                  We use reasonable administrative and technical safeguards to protect your information. However, no
                  online method of transmission or storage is completely secure.
                </p>
              </div>

              <div>
                <h2 className="mb-3 font-display text-2xl font-semibold uppercase">5. Your Choices</h2>
                <p className="text-muted-foreground">
                  You may request updates or deletion of the personal information you have shared with us by contacting
                  our ministry team.
                </p>
              </div>

              <div>
                <h2 className="mb-3 font-display text-2xl font-semibold uppercase">6. Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have questions about this Privacy Policy, contact us at{' '}
                  <a href="mailto:lcministries254@gmail.com" className="text-primary hover:underline">
                    lcministries254@gmail.com
                  </a>{' '}
                  or call 0713710041.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
