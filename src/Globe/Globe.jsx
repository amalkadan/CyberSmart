import { useEffect, useRef, useState } from "react";
import GlobeGL from "react-globe.gl";

import "./Globe.css";

const locations = [
  { name: "القدس", lat: 31.77, lng: 35.21 },
  { name: "لندن", lat: 51.5, lng: -0.12 },
  { name: "نيويورك", lat: 40.71, lng: -74 },
  { name: "طوكيو", lat: 35.67, lng: 139.65 },
  { name: "دبي", lat: 25.2, lng: 55.27 },
  { name: "سنغافورة", lat: 1.35, lng: 103.81 },
  { name: "سيدني", lat: -33.86, lng: 151.2 },
  { name: "باريس", lat: 48.85, lng: 2.35 },
  { name: "برلين", lat: 52.52, lng: 13.4 },
  { name: "تورنتو", lat: 43.65, lng: -79.38 },
  { name: "ساو باولو", lat: -23.55, lng: -46.63 },
  { name: "كيب تاون", lat: -33.92, lng: 18.42 },
];

const threats = Array.from({ length: 70 }, (_, index) => {
  const source = locations[Math.floor(Math.random() * locations.length)];

  let destination = locations[Math.floor(Math.random() * locations.length)];

  while (destination.name === source.name) {
    destination = locations[Math.floor(Math.random() * locations.length)];
  }

  const blocked = Math.random() > 0.35;

  return {
    id: index,
    source,
    destination,
    status: blocked ? "تم منعه" : "تم اكتشافه",
    color: blocked ? "#22c55e" : "#ef4444",

    transparentColor: blocked
      ? "rgba(34, 197, 94, 0.28)"
      : "rgba(239, 68, 68, 0.28)",
  };
});

/*
  لكل تهديد يوجد خطان:

  base:
  الخط المتواصل الشفاف.

  moving:
  الضوء المتحرك فوق الخط.
*/

const displayedThreats = threats.flatMap((threat) => [
  {
    ...threat,
    layer: "base",
  },
  {
    ...threat,
    layer: "moving",
  },
]);

function Globe() {
  const globeRef = useRef();
  const containerRef = useRef();

  const [globeSize, setGlobeSize] = useState({
    width: 800,
    height: 700,
  });

  /*
    يجعل حجم الكرة متوافقًا مع حجم القسم
    ولا يجعلها تغطي LoginPanel.
  */

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return undefined;
    }

    function updateSize() {
      setGlobeSize({
        width: container.clientWidth,
        height: container.clientHeight,
      });
    }

    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  function handleGlobeReady() {
    const globe = globeRef.current;

    if (!globe) {
      return;
    }

    globe.pointOfView(
      {
        lat: 25,
        lng: 20,
        altitude: 2.1,
      },
      1000,
    );

    const controls = globe.controls();

    controls.autoRotate = false;
    controls.enableZoom = true;
    controls.enableRotate = true;
  }

  return (
    <div className="globe-container" ref={containerRef}>
      <GlobeGL
        ref={globeRef}
        width={globeSize.width}
        height={globeSize.height}
        onGlobeReady={handleGlobeReady}
        globeImageUrl="https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg"
        backgroundColor="rgba(0, 0, 0, 0)"
        arcsData={displayedThreats}
        arcStartLat={(threat) => threat.source.lat}
        arcStartLng={(threat) => threat.source.lng}
        arcEndLat={(threat) => threat.destination.lat}
        arcEndLng={(threat) => threat.destination.lng}
        arcColor={(threat) =>
          threat.layer === "base" ? threat.transparentColor : threat.color
        }
        arcStroke={() => 0.6}
        arcDashLength={(threat) => (threat.layer === "base" ? 1 : 0.08)}
        arcDashGap={(threat) => (threat.layer === "base" ? 0 : 0.92)}
        arcDashInitialGap={(threat) =>
          threat.layer === "base" ? 0 : threat.id / threats.length
        }
        arcDashAnimateTime={(threat) => (threat.layer === "base" ? 0 : 1000)}
        pointsData={locations}
        pointLat="lat"
        pointLng="lng"
        pointLabel="name"
        pointColor={() => "#f59e0b"}
        pointAltitude={0}
        pointRadius={0.08}
        showAtmosphere={true}
        atmosphereColor="#38bdf8"
        atmosphereAltitude={0.18}
      />

      <div className="globe-live-status">
        <span className="globe-live-dot" />
        مراقبة التهديدات مباشرة
      </div>
    </div>
  );
}

export default Globe;
