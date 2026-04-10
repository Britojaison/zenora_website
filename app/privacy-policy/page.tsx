import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export default function PrivacyPolicy() {
  return (
    <main className="bg-white min-h-screen">
      <SmoothScroll />
      <Navbar />
      
      <section className="bg-[#28362b] pt-40 pb-20">
        <div className="px-6 md:px-20 max-w-screen-xl mx-auto">
          <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] text-white mb-4">Privacy Policy</h1>
          <p className="font-body text-[#e1b258] text-sm md:text-base tracking-widest uppercase">ZenVistas Legal</p>
        </div>
      </section>

      <section className="py-20">
        <div className="px-6 md:px-20 max-w-screen-xl mx-auto">
          <div className="font-body text-[#594433] space-y-6 leading-relaxed max-w-4xl">
            <h2 className="font-display text-2xl text-[#28362b] mt-8 mb-4 flex items-start gap-3">
              <span className="font-body font-bold text-[#e1b258] mt-1">1.</span> Who We Are
            </h2>
            <p className="pl-6">
              ZenVistas Realty is the developer behind Zenora, a luxury villa community in Goldwins, Coimbatore, Tamil Nadu. Our website is zenvistas.co.in. This Privacy Policy explains what personal data we collect through this website, how we use it, who we share it with, and what rights you hold under Indian law.
            </p>

            <h2 className="font-display text-2xl text-[#28362b] mt-8 mb-4 flex items-start gap-3">
              <span className="font-body font-bold text-[#e1b258] mt-1">2.</span> What Information We Collect
            </h2>
            <ol className="list-decimal pl-10 space-y-2">
              <li><strong>Information you provide:</strong> When you submit the enquiry form on this website, you provide your full name, mobile number, and email address. This data is collected voluntarily.</li>
              <li><strong>Information collected automatically:</strong> When you visit our website, our analytics tools collect your IP address, browser type, device type, pages visited, and session duration.</li>
              <li><strong>Cookies and tracking data:</strong> This website uses Meta Pixel (Facebook advertising) and Google Tag Manager, which place cookies on your browser when you visit. These cookies activate only after you grant consent via the cookie banner on first visit.</li>
            </ol>

            <h2 className="font-display text-2xl text-[#28362b] mt-8 mb-4 flex items-start gap-3">
              <span className="font-body font-bold text-[#e1b258] mt-1">3.</span> How We Use Your Information
            </h2>
            <p className="pl-6">
              Your enquiry data (name, phone, email) is used to: respond to your property enquiry; arrange site visits; follow up via phone, email, and WhatsApp through Wati, our authorised messaging partner; and invite you to ZenVistas events including the Exclusive Dinner. We do not use your data for any purpose beyond those stated here.
            </p>

            <h2 className="font-display text-2xl text-[#28362b] mt-8 mb-4 flex items-start gap-3">
              <span className="font-body font-bold text-[#e1b258] mt-1">4.</span> Third-Party Services
            </h2>
            <ol className="list-decimal pl-10 space-y-2">
              <li><strong>Meta Platforms Inc.:</strong> The Meta Pixel on our site sends visit and event data to Meta for targeted advertisements on Facebook and Instagram.</li>
              <li><strong>Google LLC:</strong> Google Analytics and Google Tag Manager process anonymised traffic data.</li>
              <li><strong>Wati / Clare.AI Pte. Ltd.:</strong> We use Wati to send WhatsApp messages to prospects who have submitted an enquiry.</li>
            </ol>
            <p className="pl-6">
              We do not sell, rent, or trade your personal data to any third party for their own commercial purposes.
            </p>

            <h2 className="font-display text-2xl text-[#28362b] mt-8 mb-4 flex items-start gap-3">
              <span className="font-body font-bold text-[#e1b258] mt-1">5.</span> Cookies and Tracking
            </h2>
            <ol className="list-decimal pl-10 space-y-2">
              <li><strong>Essential cookies:</strong> Required for basic website functionality. Cannot be disabled.</li>
              <li><strong>Analytics cookies (Google Analytics):</strong> Track pages visited and session data. Activated only after your consent.</li>
              <li><strong>Advertising cookies (Meta Pixel, Google Tag Manager):</strong> Enable retargeting on Facebook, Instagram, and Google. Activated only after your consent.</li>
            </ol>
            <p className="pl-6">
              You can manage preferences through the banner on this site, your browser settings, or by opting out at <a href="https://facebook.com/settings" target="_blank" rel="noopener noreferrer" className="text-[#e1b258] hover:underline">facebook.com/settings</a> and <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-[#e1b258] hover:underline">adssettings.google.com</a>.
            </p>

            <h2 className="font-display text-2xl text-[#28362b] mt-8 mb-4 flex items-start gap-3">
              <span className="font-body font-bold text-[#e1b258] mt-1">6.</span> Data Retention
            </h2>
            <p className="pl-6">
              Enquiry data is retained for 24 months and then securely deleted or anonymised. Analytics and advertising data retention is governed by Google and Meta's own policies respectively.
            </p>

            <h2 className="font-display text-2xl text-[#28362b] mt-8 mb-4 flex items-start gap-3">
              <span className="font-body font-bold text-[#e1b258] mt-1">7.</span> 
              <span>Your Rights Under the DPDP Act <span className="font-body">2023</span></span>
            </h2>
            <p className="pl-6">
              Under India's Digital Personal Data Protection Act 2023, you have the right to: access a summary of the personal data we hold about you; request correction of inaccurate or incomplete data; request erasure of your data; and raise a grievance with our Grievance Officer. To exercise any of these rights, write to <a href="mailto:privacy@zenvistas.co.in" className="text-[#e1b258] hover:underline">privacy@zenvistas.co.in</a>.
            </p>

            <h2 className="font-display text-2xl text-[#28362b] mt-8 mb-4 flex items-start gap-3">
              <span className="font-body font-bold text-[#e1b258] mt-1">8.</span> Data Security
            </h2>
            <p className="pl-6">
              This website uses HTTPS encryption for all data in transit. Internal access to personal data is restricted to team members who require it for their specific function. We implement reasonable technical and organisational safeguards.
            </p>

            <h2 className="font-display text-2xl text-[#28362b] mt-8 mb-4 flex items-start gap-3">
              <span className="font-body font-bold text-[#e1b258] mt-1">9.</span> Children's Privacy
            </h2>
            <p className="pl-6">
              This website is not directed at persons under 18. We do not knowingly collect personal data from minors.
            </p>

            <h2 className="font-display text-2xl text-[#28362b] mt-8 mb-4 flex items-start gap-3">
              <span className="font-body font-bold text-[#e1b258] mt-1">10.</span> Changes to This Policy
            </h2>
            <p className="pl-6">
              This policy may be updated periodically. The current version will always be available on this page with the date of last revision.
            </p>
            <h2 className="font-display text-2xl text-[#28362b] mt-8 mb-4 flex items-start gap-3">
              <span className="font-body font-bold text-[#e1b258] mt-1">11.</span> Contact
            </h2>
            <ol className="list-decimal pl-10 space-y-2">
              <li>Email: <a href="mailto:info@zenvistas.co.in" className="text-[#e1b258] hover:underline">info@zenvistas.co.in</a></li>
              <li>Phone: <a href="tel:+918870044213" className="text-[#e1b258] hover:underline">+91 88700 44213</a></li>
              <li>Address: ZenVistas Realty, Goldwins, Coimbatore, Tamil Nadu — 641014</li>
            </ol>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
