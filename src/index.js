const AD_INVENTORY = [
    {
        id: "haribo-30s",
        title: "Haribo",
        duration: "00:00:30",
        url: "https://videos.mvzen.com/ads/haribo.mp4",
    },
    //   {
    //     id: "promo-15s",
    //     title: "15s Summer Sale",
    //     duration: "00:00:15",
    //     url: "https://videos.mvzen.com/ads/sample_ad_15s.mp4",
    //   },
    //   {
    //     id: "promo-30s",
    //     title: "30s Main Feature",
    //     duration: "00:00:30",
    //     url: "https://videos.mvzen.com/ads/sample_ad_30s.mp4",
    //   },
];

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);

        if (request.method === "OPTIONS") {
            return new Response(null, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
                    "Access-Control-Allow-Headers": "*",
                },
            });
        }

        if (url.pathname === "/vast") {
            // Pick a random ad from inventory
            const ad = AD_INVENTORY[Math.floor(Math.random() * AD_INVENTORY.length)];

            const vastXml = `<?xml version="1.0" encoding="UTF-8"?>
<VAST version="3.0">
  <Ad id="${ad.id}">
    <InLine>
      <AdSystem version="1.0">Zen Ad Server</AdSystem>
      <AdTitle>${ad.title}</AdTitle>
      <Impression><![CDATA[https://ads.mvzen.com/tracking/impression?adId=${ad.id}]]></Impression>
      <Creatives>
        <Creative id="creative-${ad.id}">
          <Linear>
            <Duration>${ad.duration}</Duration>
            <TrackingEvents>
              <Tracking event="start"><![CDATA[https://ads.mvzen.com/tracking/start?adId=${ad.id}]]></Tracking>
              <Tracking event="complete"><![CDATA[https://ads.mvzen.com/tracking/complete?adId=${ad.id}]]></Tracking>
            </TrackingEvents>
            <MediaFiles>
              <MediaFile id="media-${ad.id}" delivery="progressive" type="video/mp4" width="1920" height="1080" bitrate="4500">
                <![CDATA[${ad.url}]]>
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
        }

        return new Response("Not Found", { status: 404 });
    },
};
