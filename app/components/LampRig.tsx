"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function LampRig({ open: _open }: { open: boolean }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !window.WebGLRenderingContext) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0.1, 9);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    host.appendChild(renderer.domElement);

    const whiteMetal = new THREE.MeshStandardMaterial({ color: 0xe9e9e6, metalness: 0.84, roughness: 0.23 });
    const warmBulb = new THREE.MeshBasicMaterial({ color: 0xffca78 });
    const pendulum = new THREE.Group();
    pendulum.position.y = 2.5;
    const cableLength = 2.6;
    const cable = new THREE.Mesh(new THREE.CylinderGeometry(0.034, 0.034, cableLength, 18), whiteMetal);
    cable.position.y = -cableLength / 2;
    const socket = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.16, 0.34, 24), whiteMetal);
    socket.position.y = -cableLength - 0.15;
    const shade = new THREE.Mesh(new THREE.ConeGeometry(0.72, 0.27, 36, 1, true), whiteMetal);
    shade.position.y = -cableLength - 0.42;
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.125, 20, 14), warmBulb);
    bulb.position.y = -cableLength - 0.57;
    const warmLight = new THREE.PointLight(0xffc36b, 6, 6);
    warmLight.position.set(0, -cableLength - 0.57, 0.3);
    pendulum.add(cable, socket, shade, bulb, warmLight);
    scene.add(pendulum);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x242321, 1.45));

    let angle = 0;
    let velocity = 0;
    let dragging = false;
    let frame = 0;
    let lastFrame = performance.now();
    let lastDrag = performance.now();
    const paint = () => {
      pendulum.rotation.z = angle;
      const bulbOffset = Math.sin(angle) * 18;
      document.documentElement.style.setProperty("--lamp-x", `${50 + bulbOffset}%`);
      document.documentElement.style.setProperty("--beam-tilt", `${angle * 57.2958}deg`);
      document.documentElement.style.setProperty("--beam-strength", `${0.88 + Math.min(Math.abs(angle), 0.5) * 0.12}`);
      renderer.render(scene, camera);
    };
    const settle = (now: number) => {
      const dt = Math.min((now - lastFrame) / 1000, 0.032);
      lastFrame = now;
      if (!dragging) {
        const gravity = -5.4 * Math.sin(angle);
        const damping = -1.12 * velocity;
        velocity += (gravity + damping) * dt;
        angle += velocity * dt;
      }
      paint();
      if (dragging || Math.abs(angle) > 0.001 || Math.abs(velocity) > 0.002) frame = requestAnimationFrame(settle);
      else { angle = 0; velocity = 0; paint(); frame = 0; }
    };
    const startSettling = () => {
      if (frame) cancelAnimationFrame(frame);
      lastFrame = performance.now();
      frame = requestAnimationFrame(settle);
    };
    const resize = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      paint();
    };
    const down = (event: PointerEvent) => {
      dragging = true;
      velocity = 0;
      lastDrag = performance.now();
      if (frame) { cancelAnimationFrame(frame); frame = 0; }
      host.setPointerCapture(event.pointerId);
      host.classList.add("is-dragging");
    };
    const move = (event: PointerEvent) => {
      if (!dragging) return;
      const rect = host.getBoundingClientRect();
      const normalized = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const nextAngle = THREE.MathUtils.clamp(normalized * 0.58, -0.58, 0.58);
      const now = performance.now();
      const dt = Math.max((now - lastDrag) / 1000, 0.016);
      velocity = THREE.MathUtils.clamp((nextAngle - angle) / dt, -2.4, 2.4);
      angle = nextAngle;
      lastDrag = now;
      paint();
    };
    const up = (event: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      host.classList.remove("is-dragging");
      if (host.hasPointerCapture(event.pointerId)) host.releasePointerCapture(event.pointerId);
      startSettling();
    };
    host.addEventListener("pointerdown", down);
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerup", up);
    host.addEventListener("pointercancel", up);
    window.addEventListener("resize", resize);
    resize();
    return () => {
      if (frame) cancelAnimationFrame(frame);
      host.removeEventListener("pointerdown", down);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerup", up);
      host.removeEventListener("pointercancel", up);
      window.removeEventListener("resize", resize);
      renderer.dispose();
      scene.traverse((item) => {
        if (item instanceof THREE.Mesh) {
          item.geometry.dispose();
          const materials = Array.isArray(item.material) ? item.material : [item.material];
          materials.forEach((material) => material.dispose());
        }
      });
      if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="lamp-rig" ref={hostRef} role="button" tabIndex={0} aria-label="Drag and release the hanging light to make it sway" />;
}
