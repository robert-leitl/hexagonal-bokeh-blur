#version 300 es

precision highp float;

uniform sampler2D u_texture;

out vec4 outColor;

void main() {
    vec2 uv = gl_FragCoord.xy / vec2(textureSize(u_texture, 0));
    outColor = texture(u_texture, uv);
}