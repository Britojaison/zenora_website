import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export default function CookiesPage() {
  return (
    <main className="bg-white min-h-screen">
      <SmoothScroll />
      <Navbar />
      
      <section className="bg-[#28362b] pt-40 pb-20">
        <div className="px-6 md:px-20 max-w-screen-xl mx-auto">
          <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] text-white mb-4">Cookie Policy</h1>
          <p className="font-body text-[#e1b258] text-sm md:text-base tracking-widest uppercase">ZenVistas Legal</p>
        </div>
      </section>

      <section className="py-20">
        <div className="px-6 md:px-20 max-w-screen-xl mx-auto">
          <div className="font-body text-[#594433] space-y-6 leading-relaxed max-w-4xl">
            <h2 className="font-display text-2xl text-[#28362b] mt-8 mb-4 flex items-start gap-3">
              <span className="font-body font-bold text-[#e1b258] mt-1">1.</span> What Are Cookies
            </h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Cookies are small text files stored on your device by your browser when you visit a website.</li>
              <li>They allow websites to remember information about your visit.</li>
              <li>Some cookies are necessary for the site to function, while others are used for analytics and advertising.</li>
            </ol>

            <h2 className="font-display text-2xl text-[#28362b] mt-8 mb-4 flex items-start gap-3">
              <span className="font-body font-bold text-[#e1b258] mt-1">2.</span> Cookies We Use on This Website
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-[#ab948a]/20">
                <thead>
                  <tr className="bg-[#28362b] text-[#e1d5c9]">
                    <th className="p-3 border border-[#ab948a]/20">Cookie</th>
                    <th className="p-3 border border-[#ab948a]/20">Set by</th>
                    <th className="p-3 border border-[#ab948a]/20">Purpose</th>
                    <th className="p-3 border border-[#ab948a]/20">Duration</th>
                    <th className="p-3 border border-[#ab948a]/20">Consent</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-[#ab948a]/20 font-medium text-[#28362b]">Session cookie</td>
                    <td className="p-3 border border-[#ab948a]/20">ZenVistas</td>
                    <td className="p-3 border border-[#ab948a]/20">Required for website function. Stores your session state.</td>
                    <td className="p-3 border border-[#ab948a]/20">Session only</td>
                    <td className="p-3 border border-[#ab948a]/20">Not required</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-[#ab948a]/20 font-medium text-[#28362b]">_fbp, _fbc</td>
                    <td className="p-3 border border-[#ab948a]/20">Meta (Facebook)</td>
                    <td className="p-3 border border-[#ab948a]/20">Records your visit so we can serve relevant Zenora ads on Facebook and Instagram.</td>
                    <td className="p-3 border border-[#ab948a]/20">Up to 90 days</td>
                    <td className="p-3 border border-[#ab948a]/20">Required</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-[#ab948a]/20 font-medium text-[#28362b]">_ga, _gid</td>
                    <td className="p-3 border border-[#ab948a]/20">Google Analytics</td>
                    <td className="p-3 border border-[#ab948a]/20">Tracks pages visited and session duration to help us understand how visitors use the site.</td>
                    <td className="p-3 border border-[#ab948a]/20">Up to 2 years</td>
                    <td className="p-3 border border-[#ab948a]/20">Required</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-[#ab948a]/20 font-medium text-[#28362b]">_gcl_au</td>
                    <td className="p-3 border border-[#ab948a]/20">Google Tag Manager</td>
                    <td className="p-3 border border-[#ab948a]/20">Conversion tracking for Google Ads campaigns.</td>
                    <td className="p-3 border border-[#ab948a]/20">90 days</td>
                    <td className="p-3 border border-[#ab948a]/20">Required</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="font-display text-2xl text-[#28362b] mt-8 mb-4 flex items-start gap-3">
              <span className="font-body font-bold text-[#e1b258] mt-1">3.</span> Managing Your Preferences
            </h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>When you first visit our website, a consent banner will appear allowing you to accept all cookies, decline non-essential cookies, or manage individual preferences.</li>
              <li>Non-essential cookies (Meta Pixel, Google Analytics, Google Tag Manager) will only be placed after you give explicit consent.</li>
              <li>You can withdraw or change your consent at any time. To opt out of Meta advertising cookies, visit <a href="https://facebook.com/settings" target="_blank" rel="noopener noreferrer" className="text-[#e1b258] hover:underline">facebook.com/settings</a> and navigate to Ads.</li>
              <li>To opt out of Google advertising, visit <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-[#e1b258] hover:underline">adssettings.google.com</a>. Cookie preferences can also be managed through your browser settings.</li>
            </ol>

            <h2 className="font-display text-2xl text-[#28362b] mt-8 mb-4 flex items-start gap-3">
              <span className="font-body font-bold text-[#e1b258] mt-1">4.</span> Contact
            </h2>
            <p className="pl-6">
              For questions about our use of cookies: <a href="mailto:info@zenvistas.co.in" className="text-[#e1b258] hover:underline">info@zenvistas.co.in</a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
