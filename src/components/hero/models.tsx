"use client";

import { useEffect, useMemo } from "react";
import { RoundedBox } from "@react-three/drei";
import { CanvasTexture, SRGBColorSpace } from "three";

const red = "#d92736";
const charcoal = "#202928";

export function Car() {
  return (
    <group position={[-1.7, .14, .7]} rotation={[0, -.12, 0]} scale={1.1}>
      <RoundedBox args={[2.85, .52, 1.32]} position={[0, .55, 0]} radius={.18} smoothness={4} castShadow>
        <meshStandardMaterial color={red} roughness={.24} metalness={.24} />
      </RoundedBox>
      <RoundedBox args={[1.52, .67, 1.08]} position={[-.15, 1.05, 0]} radius={.17} smoothness={4} castShadow>
        <meshStandardMaterial color={charcoal} roughness={.19} metalness={.45} />
      </RoundedBox>
      <RoundedBox args={[1.39, .12, 1.05]} position={[-.15, 1.38, 0]} radius={.06} smoothness={3} castShadow>
        <meshStandardMaterial color="#fffaf1" roughness={.32} />
      </RoundedBox>
      <RoundedBox args={[.06, .54, 1.11]} position={[-.27, 1.1, 0]} radius={.02} smoothness={2}>
        <meshStandardMaterial color={red} roughness={.35} />
      </RoundedBox>
      <RoundedBox args={[1.15, .04, 1.24]} position={[.8, .83, 0]} radius={.02} smoothness={2}>
        <meshStandardMaterial color={red} roughness={.22} metalness={.3} />
      </RoundedBox>
      {[-.92, .94].flatMap(x => [-.68, .68].map(z => (
        <group key={x + "," + z} position={[x, .38, z]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh castShadow><cylinderGeometry args={[.36, .36, .18, 32]} /><meshStandardMaterial color="#1e2423" roughness={.85} /></mesh>
          <mesh position={[0, z > 0 ? .095 : -.095, 0]}><cylinderGeometry args={[.22, .22, .015, 16]} /><meshStandardMaterial color="#b8bfba" metalness={.85} roughness={.22} /></mesh>
          <mesh position={[0, z > 0 ? .109 : -.109, 0]}><cylinderGeometry args={[.1, .1, .017, 12]} /><meshStandardMaterial color="#303b3b" metalness={.6} /></mesh>
        </group>
      )))}
      {[-.47, .47].map(z => <group key={z}>
        <RoundedBox args={[.06, .15, .25]} position={[1.42, .65, z]} radius={.04} smoothness={2}><meshStandardMaterial color="#fff3d1" emissive="#fff5dc" emissiveIntensity={.6} /></RoundedBox>
        <RoundedBox args={[.06, .13, .23]} position={[-1.43, .67, z]} radius={.04} smoothness={2}><meshStandardMaterial color="#741226" emissive="#ed2835" emissiveIntensity={.3} /></RoundedBox>
        <RoundedBox args={[.25, .06, .045]} position={[-.02, .7, z > 0 ? .668 : -.668]} radius={.02} smoothness={2}><meshStandardMaterial color="#e5e3df" metalness={.7} /></RoundedBox>
        <RoundedBox args={[.18, .11, .23]} position={[.55, .99, z > 0 ? .73 : -.73]} radius={.04} smoothness={2}><meshStandardMaterial color={red} metalness={.25} /></RoundedBox>
      </group>)}
      <RoundedBox args={[.09, .16, .51]} position={[1.44, .39, 0]} radius={.035} smoothness={2}><meshStandardMaterial color="#1f2826" /></RoundedBox>
      <mesh position={[.24, .6, .67]}><planeGeometry args={[.56, .2]} /><meshBasicMaterial color="#fffdf8" /></mesh>
      <mesh position={[.24, .6, .675]}><planeGeometry args={[.36, .035]} /><meshBasicMaterial color={red} /></mesh>
    </group>
  );
}

export function Scooter() {
  return (
    <group position={[1.6, .12, 1.9]} rotation={[0, -.22, 0]} scale={.92}>
      {[-.73, .77].map(x => <group key={x} position={[x, .34, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh castShadow><cylinderGeometry args={[.33, .33, .15, 28]} /><meshStandardMaterial color="#252c29" roughness={.8} /></mesh>
        <mesh position={[0, .08, 0]}><cylinderGeometry args={[.19, .19, .015, 16]} /><meshStandardMaterial color="#c8ceca" metalness={.8} roughness={.25} /></mesh>
      </group>)}
      <RoundedBox args={[1.12, .19, .5]} position={[-.15, .4, 0]} radius={.07} smoothness={3} castShadow><meshStandardMaterial color={red} roughness={.3} /></RoundedBox>
      <RoundedBox args={[.8, .51, .53]} position={[-.51, .69, 0]} radius={.13} smoothness={3} castShadow><meshStandardMaterial color={red} roughness={.25} metalness={.15} /></RoundedBox>
      <RoundedBox args={[.97, .15, .55]} position={[-.38, 1.01, 0]} radius={.07} smoothness={3} castShadow><meshStandardMaterial color="#28312f" roughness={.7} /></RoundedBox>
      <RoundedBox args={[.32, .89, .48]} position={[.56, .91, 0]} rotation={[0, 0, -.15]} radius={.1} smoothness={3} castShadow><meshStandardMaterial color="#fff7ec" roughness={.32} /></RoundedBox>
      <RoundedBox args={[.29, .29, .54]} position={[.7, 1.37, 0]} radius={.08} smoothness={3} castShadow><meshStandardMaterial color={red} roughness={.27} /></RoundedBox>
      <mesh position={[.854, 1.4, 0]} rotation={[0, Math.PI / 2, 0]}><circleGeometry args={[.1, 24]} /><meshStandardMaterial color="#fff6da" emissive="#fff2dc" emissiveIntensity={.7} /></mesh>
      <mesh position={[.55, 1.39, 0]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[.035, .035, 1.04, 12]} /><meshStandardMaterial color="#273330" metalness={.8} /></mesh>
      {[-.46, .46].map(z => <group key={z}>
        <mesh position={[.55, 1.63, z]} rotation={[.08, 0, .12]}><cylinderGeometry args={[.013, .013, .4, 8]} /><meshStandardMaterial color="#363e3b" metalness={.7} /></mesh>
        <mesh position={[.57, 1.85, z]} scale={[1, .65, .25]}><sphereGeometry args={[.13, 16, 12]} /><meshStandardMaterial color="#c5d2ce" metalness={.85} roughness={.18} /></mesh>
      </group>)}
      <RoundedBox args={[.56, .53, .56]} position={[-.8, 1.37, 0]} radius={.06} smoothness={2} castShadow><meshStandardMaterial color="#eac49a" roughness={.8} /></RoundedBox>
      <mesh position={[-.8, 1.64, 0]}><boxGeometry args={[.13, .012, .55]} /><meshStandardMaterial color="#fff0d9" /></mesh>
    </group>
  );
}

function rounded(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number, fill: string) {
  ctx.fillStyle = fill;
  ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.fill();
}

function createPhoneTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512; canvas.height = 1024;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#fffdf8"; ctx.fillRect(0, 0, 512, 1024);
  ctx.fillStyle = charcoal; ctx.font = "600 22px Arial"; ctx.fillText("9:41", 32, 38);
  rounded(ctx, 420, 22, 42, 18, 5, charcoal);
  ctx.fillStyle = red; ctx.font = "bold 53px Arial"; ctx.fillText("iMove.", 32, 125);
  ctx.fillStyle = "#626660"; ctx.font = "23px Arial"; ctx.fillText("Cùng bạn mỗi ngày", 33, 166);
  rounded(ctx, 22, 198, 468, 490, 24, "#efeee7");
  ctx.strokeStyle = "#ffffff"; ctx.lineWidth = 22;
  [[20, 286, 491, 405], [15, 506, 492, 543], [170, 213, 129, 687], [366, 205, 396, 682]].forEach(([x,y,x2,y2]) => {ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x2,y2);ctx.stroke();});
  [[54,226,65,54],[228,310,65,91],[421,420,48,65],[211,579,70,70],[50,541,58,82]].forEach(([x,y,w,h]) => rounded(ctx,x,y,w,h,5,"#dbddd3"));
  ctx.strokeStyle = red; ctx.lineWidth = 9; ctx.lineCap = "round"; ctx.lineJoin = "round";
  ctx.beginPath(); ctx.moveTo(108, 592); ctx.lineTo(132, 441); ctx.lineTo(309, 466); ctx.lineTo(344, 327); ctx.stroke();
  [[108,592],[344,327]].forEach(([x,y]) => {ctx.fillStyle=red;ctx.beginPath();ctx.arc(x,y,17,0,Math.PI*2);ctx.fill();ctx.fillStyle="#fff";ctx.beginPath();ctx.arc(x,y,7,0,Math.PI*2);ctx.fill();});
  rounded(ctx, 42, 220, 292, 54, 27, "#ffffff");
  ctx.fillStyle = charcoal; ctx.font = "600 20px Arial"; ctx.fillText("Hành trình của bạn", 62, 253);
  ctx.fillStyle = charcoal; ctx.font = "600 27px Arial"; ctx.fillText("Hôm nay bạn cần gì?", 30, 737);
  ["Đi xe", "Giao hàng", "Đồ ăn", "Mua hộ"].forEach((text, i) => {
    rounded(ctx, 29 + i * 120, 771, 91, 86, 17, i === 0 ? "#ffe9e7" : "#f0f0e9");
    ctx.fillStyle = i === 0 ? red : "#798372";
    ctx.beginPath(); ctx.arc(74 + i * 120, 806, 15, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = charcoal; ctx.font = "17px Arial"; ctx.textAlign = "center";ctx.fillText(text,74+i*120,845);
  });
  ctx.textAlign = "left";
  rounded(ctx, 28, 900, 456, 70, 18, red);
  ctx.fillStyle = "#fff";ctx.font="600 24px Arial";ctx.textAlign="center";ctx.fillText("Bắt đầu hành trình  →",256,944);
  const texture = new CanvasTexture(canvas); texture.colorSpace = SRGBColorSpace;
  return texture;
}

export function Phone() {
  const texture = useMemo(() => createPhoneTexture(), []);
  useEffect(() => () => texture.dispose(), [texture]);
  return <group position={[1.46, 2.55, -1.55]} rotation={[-.1, .12, -.1]} scale={1.05}>
    <RoundedBox args={[1.58, 3.15, .18]} radius={.18} smoothness={4} castShadow><meshStandardMaterial color="#36413c" metalness={.72} roughness={.23} /></RoundedBox>
    <RoundedBox args={[1.49, 3.06, .025]} position={[0,0,.102]} radius={.14} smoothness={4}><meshBasicMaterial color="#fffdf8" /></RoundedBox>
    <mesh position={[0, -.03, .119]}><planeGeometry args={[1.39,2.83]} /><meshBasicMaterial map={texture} toneMapped={false} /></mesh>
    <RoundedBox args={[.47,.1,.02]} position={[0,1.37,.132]} radius={.046} smoothness={3}><meshBasicMaterial color="#192321" /></RoundedBox>
    <RoundedBox args={[.45,.024,.01]} position={[0,-1.4,.132]} radius={.01} smoothness={2}><meshBasicMaterial color="#27332e" /></RoundedBox>
    <mesh position={[.803,.67,0]}><boxGeometry args={[.025,.32,.05]} /><meshStandardMaterial color="#909b96" metalness={.7} /></mesh>
  </group>;
}

export function Building({ x, z, height = 1, width = .65 }: { x: number; z: number; height?: number; width?: number }) {
  return <group position={[x,.13,z]}>
    <RoundedBox args={[width,height,width * .8]} position={[0,height/2,0]} radius={.04} smoothness={2} castShadow receiveShadow><meshStandardMaterial color="#eeece4" roughness={.85} /></RoundedBox>
    <mesh position={[0,height+.025,0]}><boxGeometry args={[width*.74,.045,width*.59]} /><meshStandardMaterial color="#d1d8ca" /></mesh>
    {Array.from({length: Math.floor(height/.25)}, (_,i) => <mesh key={i} position={[0,.2+i*.25,width*.405]}><boxGeometry args={[width*.65,.07,.01]} /><meshStandardMaterial color="#c1ccc8" /></mesh>)}
  </group>;
}

export function Tree({ x, z }: { x: number; z: number }) {
  return <group position={[x,.12,z]}>
    <mesh position={[0,.32,0]} castShadow><cylinderGeometry args={[.045,.06,.55,8]} /><meshStandardMaterial color="#b0a389" /></mesh>
    <mesh position={[0,.71,0]} scale={[1,1.28,1]} castShadow><icosahedronGeometry args={[.29,2]} /><meshStandardMaterial color="#a5b49a" roughness={1} /></mesh>
  </group>;
}

export function MapPin3D({ position }: { position: [number, number, number] }) {
  return <group position={position}>
    <mesh position={[0,.52,0]} rotation={[0,0,Math.PI]} castShadow><coneGeometry args={[.19,.34,24]} /><meshStandardMaterial color={red} roughness={.35} /></mesh>
    <mesh position={[0,.76,0]} castShadow><sphereGeometry args={[.24,24,16]} /><meshStandardMaterial color={red} roughness={.3} /></mesh>
    <mesh position={[0,.79,.215]}><circleGeometry args={[.082,16]} /><meshBasicMaterial color="#fffdf5" /></mesh>
    <mesh rotation={[-Math.PI/2,0,0]} position={[0,.011,0]}><ringGeometry args={[.13,.23,32]} /><meshBasicMaterial color={red} transparent opacity={.18} /></mesh>
  </group>;
}
