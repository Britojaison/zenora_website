// components/TaboolaPixel.tsx
"use client";

import Script from "next/script";

export default function TaboolaPixel() {
  return (
    <Script
      id="taboola-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window._tfa = window._tfa || [];
          window._tfa.push({notify: 'event', name: 'page_view', id: 2046888});
          !function (t, f, a, x) {
            if (!document.getElementById(x)) {
              t.async = 1;
              t.src = a;
              t.id = x;
              f.parentNode.insertBefore(t, f);
            }
          }(
            document.createElement('script'),
            document.getElementsByTagName('script')[0],
            'https://cdn.taboola.com/libtrc/unip/2046888/tfa.js',
            'tb_tfa_script'
          );
        `,
      }}
    />
  );
}