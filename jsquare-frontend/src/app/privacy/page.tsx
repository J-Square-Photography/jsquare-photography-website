import type { Metadata } from 'next'
import Link from 'next/link'
import { Navigation } from '@/components/navigation/Navigation'
import { Footer } from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy | J Square Photography',
  description:
    'Privacy Policy for J Square Photography — how we collect, use, and protect your personal data in accordance with Singapore law.',
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-8"
          >
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>

          <h1 className="text-4xl md:text-5xl font-light mb-4">Privacy Policy</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-light mb-12">
            Last updated: 13 February 2025
          </p>

          <div className="space-y-10 text-gray-700 dark:text-gray-300 font-light leading-relaxed text-[15px]">
            <section>
              <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-3">1. Introduction</h2>
              <p>
                J Square Photography (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is a media and photography
                company registered in Singapore. We are committed to protecting your personal data in accordance with
                the Personal Data Protection Act 2012 (&quot;PDPA&quot;) of Singapore. This Privacy Policy explains how
                we collect, use, disclose, and safeguard your information when you visit our website, engage our
                services, or otherwise interact with us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-3">2. Information We Collect</h2>
              <p className="mb-3">We may collect the following types of personal data:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-gray-900 dark:text-white">Contact Information:</strong> Name, email address,
                  phone number, and mailing address provided when you enquire about or book our services.
                </li>
                <li>
                  <strong className="text-gray-900 dark:text-white">Event Details:</strong> Date, venue, type of event,
                  and other particulars relevant to the services you engage us for.
                </li>
                <li>
                  <strong className="text-gray-900 dark:text-white">Visual Media:</strong> Photographs and videos
                  captured during events or sessions as part of our services.
                </li>
                <li>
                  <strong className="text-gray-900 dark:text-white">Payment Information:</strong> Billing details
                  necessary for processing payments, though we do not store full payment card details on our servers.
                </li>
                <li>
                  <strong className="text-gray-900 dark:text-white">Technical Data:</strong> IP address, browser type,
                  device information, and browsing behaviour collected automatically when you visit our website.
                </li>
                <li>
                  <strong className="text-gray-900 dark:text-white">Account Information:</strong> Username, password,
                  and profile details if you create an account on our platform.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-3">3. How We Use Your Information</h2>
              <p className="mb-3">We use the personal data we collect for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide, manage, and deliver our photography, videography, and media services.</li>
                <li>To communicate with you regarding bookings, enquiries, quotes, and project updates.</li>
                <li>To process payments and manage invoicing.</li>
                <li>To showcase our work in our portfolio, website, and social media channels (with your consent where required).</li>
                <li>To improve our website, services, and customer experience.</li>
                <li>To send you marketing communications about our services, promotions, and updates (you may opt out at any time).</li>
                <li>To comply with legal obligations under Singapore law.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-3">4. Portfolio & Media Usage</h2>
              <p>
                As a photography and videography company, we may use selected images and videos from our engagements
                for portfolio display, marketing materials, social media content, and our website. We will seek your
                consent before using identifiable images for promotional purposes. If you wish to opt out of portfolio
                usage, please inform us prior to or during your engagement, and we will respect your wishes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-3">5. Disclosure of Your Information</h2>
              <p className="mb-3">We may share your personal data with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-gray-900 dark:text-white">Service Providers:</strong> Third-party vendors who
                  assist us with payment processing, cloud storage, website hosting, and other operational needs.
                </li>
                <li>
                  <strong className="text-gray-900 dark:text-white">Event Organisers:</strong> Where necessary, to
                  coordinate and deliver services for your event.
                </li>
                <li>
                  <strong className="text-gray-900 dark:text-white">Legal Authorities:</strong> When required by law,
                  regulation, or legal process under Singapore jurisdiction.
                </li>
              </ul>
              <p className="mt-3">
                We do not sell, rent, or trade your personal data to third parties for their marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-3">6. Data Retention</h2>
              <p>
                We retain your personal data only for as long as necessary to fulfil the purposes for which it was
                collected, or as required by applicable laws in Singapore. Photographs and videos from completed projects
                are typically retained for a reasonable period to allow for client access and re-orders, after which they
                may be archived or securely deleted.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-3">7. Data Security</h2>
              <p>
                We implement appropriate technical and organisational measures to protect your personal data against
                unauthorised access, alteration, disclosure, or destruction. This includes the use of encryption,
                secure servers, and access controls. However, no method of transmission over the Internet or electronic
                storage is completely secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-3">8. Cookies & Tracking Technologies</h2>
              <p>
                Our website may use cookies and similar tracking technologies to enhance your browsing experience,
                analyse website traffic, and understand user behaviour. You can control cookie preferences through your
                browser settings. Disabling cookies may affect certain features of our website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-3">9. Your Rights Under the PDPA</h2>
              <p className="mb-3">
                Under the Personal Data Protection Act 2012, you have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Request access to the personal data we hold about you.</li>
                <li>Request correction of any inaccurate or incomplete personal data.</li>
                <li>Withdraw your consent for the collection, use, or disclosure of your personal data at any time.</li>
                <li>Request that we cease using your personal data for marketing purposes.</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, please contact us using the details provided below. We will respond to
                your request within a reasonable timeframe as prescribed by the PDPA.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-3">10. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites and services. We are not responsible for the
                privacy practices or content of these external sites. We encourage you to review the privacy policies
                of any third-party sites you visit.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-3">11. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices or applicable
                laws. Any updates will be posted on this page with a revised &quot;Last updated&quot; date. We
                encourage you to review this policy periodically.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-3">12. Contact Us</h2>
              <p className="mb-3">
                If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your
                personal data, please contact us:
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 space-y-2">
                <p><strong className="text-gray-900 dark:text-white">J Square Photography</strong></p>
                <p>Singapore</p>
                <p>
                  Email:{' '}
                  <a href="mailto:Jsquarephotographysg@gmail.com" className="text-gray-900 dark:text-white underline underline-offset-4">
                    Jsquarephotographysg@gmail.com
                  </a>
                </p>
                <p>
                  Phone:{' '}
                  <a href="tel:+6580373735" className="text-gray-900 dark:text-white underline underline-offset-4">
                    +65 8037 3735
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
