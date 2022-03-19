#version 300 es

precision highp float;

uniform sampler2D u_colorTexture;
uniform sampler2D u_depthTexture;
uniform int u_maxCoCRadius;
uniform float u_radiusScale;

layout(location = 0) out vec4 verticalBlurColor;
layout(location = 1) out vec4 diagnoalBlurColor;

#pragma glslify: blur = require('./hex-blur.glsl', tex=texture, texSize=textureSize)

#define PI 3.141593

void main() {
    vec2 uv = gl_FragCoord.xy / vec2(textureSize(u_colorTexture, 0));

    blur(
        uv,
        vec2(0., -1.),
        u_maxCoCRadius,
        u_radiusScale,
        u_colorTexture,
        u_depthTexture,
        vec2(0.5),
        verticalBlurColor
    );

    blur(
        uv,
        vec2(cos(PI / 6.), sin(PI / 6.)),
        u_maxCoCRadius,
        u_radiusScale,
        u_colorTexture,
        u_depthTexture,
        vec2(0.5),
        diagnoalBlurColor
    );

    diagnoalBlurColor = verticalBlurColor + diagnoalBlurColor;
}