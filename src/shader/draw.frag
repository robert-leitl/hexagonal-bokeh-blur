#version 300 es

precision highp float;

in vec3 v_normal;
in vec2 v_uv;
in vec3 v_surfaceToView;

out vec4 outColor;

void main() {
    vec3 n = normalize(v_normal);
    vec3 v = normalize(v_surfaceToView);
    float nDv = dot(n, v);
    vec3 r = nDv * n * 2. - v;
    r = normalize(r);

    outColor = vec4(r * 0.5 + 0.5, 1.);
}
