import * as THREE from "three";

export const uniforms = {
  uTexture: { value: null },
  uTextureAlt: { value: null },
  uTime: { value: 0 },
  uMouse: { value: new THREE.Vector2(0.5, 0.5) },
  uResolution: { value: new THREE.Vector2(1, 1) },
  uStrength: { value: 1.0 },
  uNoiseScale: { value: 2.0 },
  uNoiseSpeed: { value: 0.25 },
  uFeather: { value: 0.85 },
};

export const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main () {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const simplex = /* glsl */ `
vec3 mod289(vec3 x){return x - floor(x * (1.0/289.0)) * 289.0;}
vec2 mod289(vec2 x){return x - floor(x * (1.0/289.0)) * 289.0;}
vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865, 0.366025404, -0.577350269, 0.024390244);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.792842914 - 0.853734721 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.y  = a0.y  * x12.x + h.y  * x12.y;
  g.z  = a0.z  * x12.z + h.z  * x12.w;
  return 130.0 * dot(m, g);
}
`;

export const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;

  uniform sampler2D uTexture;
  uniform sampler2D uTextureAlt;
  uniform vec2  uResolution;
  uniform vec2  uMouse;
  uniform float uTime;
  uniform float uStrength;
  uniform float uNoiseScale;
  uniform float uNoiseSpeed;
  uniform float uFeather;

  ${simplex}

  float radialFalloff(vec2 uv, vec2 center, float feather, vec2 resolution){
    // アスペクト比を考慮した距離計算
    vec2 aspect = vec2(1.0, resolution.y / resolution.x);
    vec2 delta = (uv - center) * aspect;
    float d = length(delta);
    float r = 0.15;
    float edge = smoothstep(r - feather, r, d);
    return edge;
  }

  void main () {
    vec2 uv = vUv;

    // 時間ベースのノイズアニメーション
    float n  = snoise(uv * uNoiseScale + uTime * uNoiseSpeed);
    float n2 = snoise(uv * (uNoiseScale*2.0) - uTime * (uNoiseSpeed*0.5));
    float turbulence = (n*0.6 + n2*0.4);
    turbulence = 0.5 + 0.5 * turbulence;

    // マウス位置中心のフォールオフ（アスペクト比を考慮）
    float brush = radialFalloff(uv, uMouse, uFeather, uResolution);

    // マスクの計算（マウスから離れた部分でエフェクトが適用される）
    float mask = turbulence * brush * 1.0;

    // テクスチャの取得
    vec4 baseCol = texture2D(uTexture, uv);
    vec4 altCol  = texture2D(uTextureAlt, uv);

    // エフェクトが見えるように調整
    float m = smoothstep(0.1, 0.8, mask);

    // 色の反転エフェクトを強くする
    vec3 invertedColor = 1.0 - baseCol.rgb;
    vec3 color = mix(baseCol.rgb, invertedColor, m);

    // 時間ベースの色調変化も追加（デバッグ用）
    float timeEffect = sin(uTime * 2.0) * 0.1 * uStrength;
    color += vec3(timeEffect,timeEffect, timeEffect);

    gl_FragColor = vec4(color, 1.0);
  }
`;
