#version 300 es

precision highp float;

flat in vec3 v_normal;
in vec2 v_uv;
in vec3 v_surfaceToView;

out vec4 outColor;

void main() {
    outColor = vec4(1., 0., 0., 1.);
}
