#version 300 es

precision highp float;

uniform sampler2D u_texture;

out vec4 outColor;

void main() {
    vec2 uv = gl_FragCoord.xy / vec2(textureSize(u_texture, 0));
    vec4 color = texture(u_texture, uv);
    float s1 = 0.5;
    float s2 = 0.8;
    vec4 boost = smoothstep(s1, s2, color) - smoothstep(s2, s2 + 0.1 , color);
    outColor = color + boost.rrra * 0.6;
}