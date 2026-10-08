"use client";

import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, RoundedBox } from "@react-three/drei";
import { CatmullRomCurve3, Group, Vector3 } from "three";
import { Pause, Play, Rotate3D } from "lucide-react";
import { CityIllustration } from "../illustrations";
import { Building, Car, MapPin3D, Phone, Scooter, Tree } from "./models";

function Fallback() {
  return <div className="scene-fallback" data-fallback role="img" aria-label="Minh họa thành phố iMove với ô tô, tuyến đường và điện thoại"><CityIllustration /></div>;
}

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <Fallback /> : this.props.children; }
}

const route = new CatmullRomCurve3([
  new Vector3(-3.65,.19,2.38), new Vector3(-2.78,.19,1.84),
  new Vector3(-2.13,.19,-.7), new Vector3(-.42,.19,-.93),
  new Vector3(.12,.19,.05), new Vector3(2.78,.19,.18),
  new Vector3(3.3,.19,-1.22),
], false, "catmullrom", .18);

function City({ animate, reducedMotion }: { animate: boolean; reducedMotion: boolean }) {
  const invalidate = useThree((state) => state.invalidate);
  const movingPoint = useRef<Group>(null);
  const floatPhone = useRef<Group>(null);
  const scroll = useRef({ progress: 0 });
  const elapsed = useRef(0);
  const frames = useRef(0);
  const target = useRef(new Vector3());

  useEffect(() => {
    let cancelled = false;
    let revert = () => {};
    if (!reducedMotion) {
      Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
          gsap.to(scroll.current, {
            progress: 1, ease: "none",
            scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: .8 },
          });
        });
        revert = () => ctx.revert();
      });
    }
    return () => { cancelled = true; revert(); };
  }, [reducedMotion]);

  useEffect(() => { invalidate(); }, [animate, reducedMotion, invalidate]);
  useFrame((state, delta) => {
    const { camera, gl } = state;
    frames.current++;
    gl.domElement.dataset.sceneReady = "true";
    gl.domElement.dataset.frame = String(frames.current);
    if (animate) {
      elapsed.current += Math.min(delta, .05);
      const progress = scroll.current.progress;
      const angle = .53 + progress * .37 + state.pointer.x * .04;
      target.current.set(Math.sin(angle) * 12.3, 8.25 - progress * 1.8 + state.pointer.y * .16, Math.cos(angle) * 12.3);
      camera.position.lerp(target.current, 1 - Math.exp(-delta * 4));
      camera.lookAt(0, .9, -.25);
      if (movingPoint.current) movingPoint.current.position.copy(route.getPointAt((elapsed.current * .065) % 1));
      if (floatPhone.current) floatPhone.current.position.y = Math.sin(elapsed.current * 1.1) * .08;
    } else {
      if (reducedMotion) { camera.position.set(6.2, 8.25, 10.7); camera.lookAt(0,.9,-.25); }
    }
    gl.domElement.dataset.camera = camera.position.toArray().map(n => n.toFixed(3)).join(",");
    if (movingPoint.current) gl.domElement.dataset.routeMarker = movingPoint.current.position.toArray().map(n => n.toFixed(3)).join(",");
  });

  return <>
    <ambientLight intensity={.9} />
    <directionalLight position={[3,8,4]} intensity={2.6} color="#fff8ee" />
    <directionalLight position={[-5,3,-2]} intensity={1.3} color="#eef5f7" />
    <Environment resolution={128} frames={1}>
      <Lightformer position={[0,5,-3]} scale={[10,5,1]} intensity={2} />
      <Lightformer position={[-5,2,1]} rotation={[0,Math.PI/2,0]} scale={[5,5,1]} intensity={1.5} />
    </Environment>
    <group position={[0,-.35,0]}>
      <RoundedBox args={[8.75,.24,6.45]} position={[0,0,0]} radius={.1} smoothness={4} receiveShadow><meshStandardMaterial color="#e5e5da" roughness={.9} /></RoundedBox>
      <RoundedBox args={[8.66,.025,6.35]} position={[0,.135,0]} radius={.01} smoothness={3}><meshStandardMaterial color="#f4f2e9" roughness={1} /></RoundedBox>
      {[-2.48, .32, 2.57].map(x => <mesh key={x} position={[x,.153,0]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[.5,6.06]} /><meshStandardMaterial color="#fffefa" /></mesh>)}
      {[-1.25,1.08].map(z => <mesh key={z} position={[0,.157,z]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[8.36,.48]} /><meshStandardMaterial color="#fffefa" /></mesh>)}
      <mesh><tubeGeometry args={[route,100,.055,8,false]} /><meshStandardMaterial color="#d92736" emissive="#d92736" emissiveIntensity={.18} roughness={.55} /></mesh>
      <group ref={movingPoint} position={[-3.65,.2,2.38]}>
        <mesh position={[0,.08,0]}><sphereGeometry args={[.11,16,12]} /><meshStandardMaterial color="#fff5ed" emissive="#ee484e" emissiveIntensity={.4} /></mesh>
      </group>
      <Car /><Scooter /><group ref={floatPhone}><Phone /></group>
      <Building x={-3.45} z={-2.24} height={1.4} width={.72} />
      <Building x={-2.52} z={-2.32} height={1.02} width={.56} />
      <Building x={-1.69} z={-2.44} height={1.74} width={.74} />
      <Building x={-.76} z={-2.3} height={.68} width={.54} />
      <Building x={3.43} z={-2.46} height={.98} width={.7} />
      <Building x={3.42} z={1.81} height={.54} width={.75} />
      {[[-3.55,.02],[-3.82,-1.08],[-.95,2.55],[3.68,.64],[2.7,-2.65],[-.09,-2.54]].map(([x,z]) => <Tree key={x} x={x} z={z} />)}
      <MapPin3D position={[-3.65,.18,2.38]} /><MapPin3D position={[3.3,.18,-1.22]} />
      <ContactShadows position={[0,-.139,0]} opacity={.36} scale={16} blur={2.7} far={6} resolution={256} frames={1} color="#525348" />
    </group>
  </>;
}

export default function CityScene() {
  const host = useRef<HTMLDivElement>(null);
  const contextCleanup = useRef<() => void>(() => {});
  const [capable, setCapable] = useState<boolean | null>(null);
  const [contextLost, setContextLost] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [paused, setPaused] = useState(false);
  const [inViewport, setInViewport] = useState(true);
  const [visible, setVisible] = useState(true);
  const [maxDpr, setMaxDpr] = useState(1);
  const animate = !reducedMotion && !paused && inViewport && visible;

  useEffect(() => {
    const canvas = document.createElement("canvas");
    let context: WebGL2RenderingContext | null = null;
    try { context = canvas.getContext("webgl2"); } catch { /* Restricted contexts use the same fallback as unsupported WebGL. */ }
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 650px)");
    const setup = window.requestAnimationFrame(() => {
      setCapable(Boolean(context)); setReducedMotion(media.matches);
      setMaxDpr(mobile.matches ? 1 : 1.5);
      context?.getExtension("WEBGL_lose_context")?.loseContext();
    });
    const change = () => setReducedMotion(media.matches);
    const qualityChange = () => setMaxDpr(mobile.matches ? 1 : 1.5);
    const visibility = () => setVisible(document.visibilityState === "visible");
    media.addEventListener("change", change);
    mobile.addEventListener("change", qualityChange);
    document.addEventListener("visibilitychange", visibility);
    const observer = new IntersectionObserver(([entry]) => setInViewport(entry.isIntersecting), { threshold: 0 });
    if (host.current) observer.observe(host.current);
    return () => { cancelAnimationFrame(setup); observer.disconnect(); media.removeEventListener("change", change); mobile.removeEventListener("change", qualityChange); document.removeEventListener("visibilitychange", visibility); contextCleanup.current(); };
  }, []);

  return <div ref={host} className="scene-host" role="group" aria-label="Không gian iMove: ô tô, xe máy, smartphone và bản đồ tuyến đường chuyển động">
    {capable && !contextLost ? <SceneBoundary><Canvas
      camera={{ position: [6.2,8.25,10.7], fov: 37 }}
      dpr={[1,maxDpr]} frameloop={animate ? "always" : "demand"}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      fallback={<Fallback />}
      onCreated={({ gl, camera }) => {
        gl.setClearColor("#faf9f6", 0); camera.lookAt(0,.9,-.25);
        gl.domElement.setAttribute("aria-hidden", "true");
        const handleLoss = (event: Event) => { event.preventDefault(); setContextLost(true); };
        gl.domElement.addEventListener("webglcontextlost", handleLoss);
        contextCleanup.current = () => gl.domElement.removeEventListener("webglcontextlost", handleLoss);
      }}
    ><City animate={animate} reducedMotion={reducedMotion} /></Canvas></SceneBoundary> : <Fallback />}
    <div className="scene-controls">
      {capable && !contextLost && !reducedMotion && <button type="button" aria-label={paused ? "Tiếp tục chuyển động 3D" : "Tạm dừng chuyển động 3D"} aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}{paused ? "Tiếp tục" : "Tạm dừng"}</button>}
      <span><Rotate3D size={13} aria-hidden="true" />{capable && !contextLost ? reducedMotion ? "Góc nhìn tĩnh" : "Cuộn để đổi góc nhìn" : "Thành phố kết nối"}</span>
    </div>
  </div>;
}
