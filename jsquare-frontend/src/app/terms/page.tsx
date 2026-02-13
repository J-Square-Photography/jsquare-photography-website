import type { Metadata } from 'next'
import Link from 'next/link'
import { Navigation } from '@/components/navigation/Navigation'
import { Footer } from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service | J Square Photography',
  description:
    'Terms of Service for J Square Photography — the terms and conditions governing the use of our services and website.',
}

export default function TermsOfServicePage() {
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

          <h1 className="text-4xl md:text-5xl font-light mb-4">Terms of Service</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-light mb-12">
            Last updated: 13 February 2025
          </p>

          <div className="space-y-10 text-gray-700 dark:text-gray-300 font-light leading-relaxed text-[15px]">
            <section>
              <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-3">1. Introduction</h2>
              <p>
                These Terms of Service (&quot;Terms&quot;) govern your use of the website and services provided by
                J Square Photography (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), a media and photography
                company based in Singapore. By accessing our website or engaging our services, you agree to be bound
                by these Terms. If you do not agree, please do not use our website or services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-3">2. Services</h2>
              <p>
                J Square Photography provides professional photography, videography, photobooth, and related media
                services. The specific scope, deliverables, and timelines for each engagement will be outlined in a
                separate booking confirmation, quotation, or service agreement provided to you prior to the
                commencement of work.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-3">3. Bookings & Confirmations</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  All bookings are subject to availability and are only confirmed upon receipt of a signed agreement
                  or written confirmation (including email) and any required deposit payment.
                </li>
                <li>
                  We reserve the right to decline any booking at our discretion.
                </li>
                <li>
                  Event details (date, time, venue, and requirements) should be confirmed at least 7 days prior to the
                  event date. Changes made after this period may be subject to additional charges or may not be
                  accommodable.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-3">4. Payment Terms</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  A non-refundable deposit (as specified in the quotation) is required to secure your booking. The
                  remaining balance is due on or before the date of the event or as otherwise agreed.
                </li>
                <li>
                  Payment may be made via bank transfer, PayNow, or other methods as communicated by us.
                </li>
                <li>
                  All prices are quoted in Singapore Dollars (SGD) and are inclusive of GST where applicable.
                </li>
                <li>
                  Late payments may incur additional charges at our discretion.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-3">5. Cancellations & Rescheduling</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Cancellations must be communicated in writing (email or message). The deposit paid is non-refundable
                  for confirmed bookings.
                </li>
                <li>
                  Rescheduling requests are subject to availability and must be made at least 14 days before the
                  original event date. Rescheduling within 14 days of the event may incur additional fees.
                </li>
                <li>
                  In the event of cancellation due to unforeseen circumstances on our part (e.g., illness, emergency),
                  we will make every effort to arrange a suitable replacement or offer a full refund including the
                  deposit.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-3">6. Intellectual Property & Copyright</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  All photographs, videos, and media content produced by J Square Photography are protected under the
                  Copyright Act 2021 of Singapore. We retain full copyright and ownership of all works unless
                  otherwise agreed in writing.
                </li>
                <li>
                  Clients are granted a non-exclusive, personal, non-transferable licence to use the delivered media
                  for personal purposes unless a commercial licence is specifically agreed upon.
                </li>
                <li>
                  You may not sell, sublicence, or commercially distribute our work without prior written consent.
                </li>
                <li>
                  We reserve the right to use any work produced for portfolio display, marketing, social media, and
                  promotional purposes unless you have opted out in writing prior to the engagement.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-3">7. Deliverables & Turnaround</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Estimated delivery timelines will be communicated at the time of booking. While we strive to meet
                  these timelines, they are estimates and not guaranteed.
                </li>
                <li>
                  Edited photos and videos will be delivered via online gallery, cloud storage, or other agreed-upon
                  methods.
                </li>
                <li>
                  Raw, unedited files are not included in our deliverables unless explicitly stated in the service
                  agreement.
                </li>
                <li>
                  Requests for additional editing or revisions beyond the agreed scope may incur extra charges.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-3">8. Client Responsibilities</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  You are responsible for obtaining any necessary permissions or permits required for photography or
                  videography at the event venue.
                </li>
                <li>
                  You agree to provide accurate event details and cooperate with our team to ensure smooth service
                  delivery.
                </li>
                <li>
                  We are not liable for missed shots or incomplete coverage resulting from restrictions imposed by the
                  venue, event organisers, or other third parties.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-3">9. Limitation of Liability</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  To the fullest extent permitted by law, J Square Photography shall not be liable for any indirect,
                  incidental, consequential, or special damages arising from the use of our services or website.
                </li>
                <li>
                  Our total liability for any claim shall not exceed the total fees paid by you for the specific
                  engagement giving rise to the claim.
                </li>
                <li>
                  In the unlikely event of equipment failure, data loss, or other technical issues beyond our control,
                  our liability is limited to a refund of the fees paid for the affected portion of the services.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-3">10. Website Use</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  All content on this website, including text, images, logos, and design elements, is the property of
                  J Square Photography and is protected by intellectual property laws.
                </li>
                <li>
                  You may not reproduce, distribute, modify, or create derivative works from any content on this
                  website without our prior written consent.
                </li>
                <li>
                  We reserve the right to modify, suspend, or discontinue any aspect of the website at any time
                  without notice.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-3">11. User Accounts</h2>
              <p>
                If you create an account on our platform, you are responsible for maintaining the confidentiality of
                your login credentials. You agree to notify us immediately of any unauthorised use of your account.
                We reserve the right to suspend or terminate accounts that violate these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-3">12. Force Majeure</h2>
              <p>
                We shall not be liable for any failure or delay in performing our obligations due to circumstances
                beyond our reasonable control, including but not limited to natural disasters, pandemics, government
                restrictions, civil unrest, or other force majeure events. In such cases, we will work with you to
                reschedule or make alternative arrangements where possible.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-3">13. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless J Square Photography, its owners, employees, and contractors
                from any claims, damages, losses, or expenses arising out of your breach of these Terms, misuse of
                our services, or violation of any applicable laws in Singapore.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-3">14. Governing Law & Dispute Resolution</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the Republic of
                Singapore. Any disputes arising from or in connection with these Terms shall be subject to the
                exclusive jurisdiction of the courts of Singapore. Both parties agree to attempt to resolve any
                disputes amicably before pursuing legal action.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-3">15. Changes to These Terms</h2>
              <p>
                We reserve the right to update or modify these Terms at any time. Changes will be effective upon
                posting on this page with a revised &quot;Last updated&quot; date. Your continued use of our website
                or services after any changes constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-3">16. Contact Us</h2>
              <p className="mb-3">
                If you have any questions or concerns about these Terms, please contact us:
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
