import * as THREE from "three";

export const uniforms = {
  uTexture: { value: null },
  uTime: { value: 0 },
  uMouse: { value: new THREE.Vector2(0.5, 0.5) },
  uResolution: { value: new THREE.Vector2(1, 1) },
  uGlitchIntensity: { value: 0.0 },
};

export const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main () {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;

  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform float uTime;
  uniform float uGlitchIntensity;
  // ランダム関数
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  // ビンテージVHS風グリッチエフェクト
  vec3 glitchEffect(vec2 uv, sampler2D tex, float intensity) {
    vec2 originalUV = uv;

    // VHS特有の水平同期ずれ（ランダムな行でシフト）
    float lineY = floor(uv.y * 300.0);
    float trackingError = random(vec2(lineY, floor(uTime * 2.0)));
    if(trackingError > 0.98) {
      uv.x += (random(vec2(lineY + 1.0, uTime)) - 0.5) * intensity * 0.1;
    }

    // VHS色にじみ（クロマ分離）
    vec2 chromaOffset = vec2(intensity * .03, 0.0);
    float r = texture2D(tex, uv + chromaOffset).r;
    float g = texture2D(tex, uv).g;
    float b = texture2D(tex, uv - chromaOffset).b;
    vec3 color = vec3(r, g, b);

    // アナログノイズライン
    float noiseLine = sin(originalUV.y * 800.0 + uTime * 50.0) * 0.5 + 0.5;
    float lineNoise = random(vec2(floor(originalUV.y * 200.0), uTime * 10.0));
    if(lineNoise > 0.97) {
      color += noiseLine * intensity * 0.2;
    }

    // VHS特有の彩度低下と暖色系の色味
    color = mix(color, color * vec3(1.1, 0.95, 0.8), intensity * 0.3);

    // 微細なアナログノイズ
    float analogNoise = random(originalUV + uTime * 0.01) * intensity * 0.03;
    color += analogNoise;

    return color;
  }

  void main () {
    vec2 uv = vUv;

    // マウス位置に基づくグリッチ強度
    float mouseDist = distance(uv, uMouse);
    float mouseInfluence = 1.0 - smoothstep(0.0, 0.3, mouseDist);
    float finalGlitchIntensity = uGlitchIntensity * (0.5 + mouseInfluence * 0.5);

    // グリッチエフェクトの適用
    vec3 color;
    if(finalGlitchIntensity > 0.0) {
      color = glitchEffect(uv, uTexture, finalGlitchIntensity);
    } else {
      color = texture2D(uTexture, uv).rgb;
    }

    gl_FragColor = vec4(color, 1.0);
  }
`;
