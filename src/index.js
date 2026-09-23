const AD_MEDIA_URL = "https://videos.mvzen.com/ads/haribo.mp4";

export default {
    async fetch(request, env, ctx) {
        if (request.method === "OPTIONS") {
            return new Response(null, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
                    "Access-Control-Allow-Headers": "*",
                },
            });
        }

        const vastXml = `<?xml version="1.0" encoding="UTF-8"?>
<VAST version="3.0">
  <Ad id="test-ad-01">
    <InLine>
      <AdSystem version="1.0">MVZen Mock Ad Server</AdSystem>
      <AdTitle>Test 10s Promo</AdTitle>
      <Impression><![CDATA[https://ads.mvzen.com/tracking/impression]]></Impression>
      <Creatives>
        <Creative id="creative-01">
          <Linear>
            <Duration>00:00:10</Duration>
            <TrackingEvents>
              <Tracking event="start"><![CDATA[https://ads.mvzen.com/tracking/start]]></Tracking>
              <Tracking event="firstQuartile"><![CDATA[https://ads.mvzen.com/tracking/q1]]></Tracking>
              <Tracking event="midpoint"><![CDATA[https://ads.mvzen.com/tracking/mid]]></Tracking>
              <Tracking event="thirdQuartile"><![CDATA[https://ads.mvzen.com/tracking/q3]]></Tracking>
              <Tracking event="complete"><![CDATA[https://ads.mvzen.com/tracking/complete]]></Tracking>
            </TrackingEvents>
            <MediaFiles>
              <MediaFile id="media-01" delivery="progressive" type="video/mp4" width="1920" height="1080" bitrate="4500">
                <![CDATA[${AD_MEDIA_URL}]]>
              </MediaFile>
            </MediaFiles>
          </Linear>
        </Creative>
      </Creatives>
    </InLine>
  </Ad>
</VAST>`;

        return new Response(vastXml.trim(), {
            headers: {
                "Content-Type": "application/xml; charset=utf-8",
                "Cache-Control": "no-store, no-cache, must-revalidate",
                "Access-Control-Allow-Origin": "*",
            },
        });
    },
};
