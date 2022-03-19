#version 300 es

precision highp float;

uniform sampler2D u_verticalBlurTexture;
uniform sampler2D u_diagonalBlurTexture;
uniform sampler2D u_depthTexture;
uniform int u_maxCoCRadius;
uniform float u_radiusScale;

layout(location = 0) out vec4 outColor;

#pragma glslify: blur = require('./hex-blur.glsl', tex=texture, texSize=textureSize)

#define PI 3.141593

void main() {
    vec2 uv = gl_FragCoord.xy / vec2(textureSize(u_verticalBlurTexture, 0));
    vec4 verticalBlurColor = texture(u_verticalBlurTexture, uv);
    vec4 diagnoalBlurColor = texture(u_diagonalBlurTexture, uv);
    float depth = texture(u_depthTexture, uv).x;
    vec4 resultColor1;
    vec4 resultColor2;

    blur(
        uv,
        vec2(cos(PI / 6.), sin(PI / 6.)),
        u_maxCoCRadius,
        u_radiusScale,
        u_verticalBlurTexture,
        u_depthTexture,
        vec2(0.5),
        resultColor1
    );

    blur(
        uv,
        vec2(cos((5. * PI) / 6.), sin((5. * PI) / 6.)),
        u_maxCoCRadius,
        u_radiusScale,
        u_diagonalBlurTexture,
        u_depthTexture,
        vec2(0.5),
        resultColor2
    );

    diagnoalBlurColor = (resultColor1 + resultColor2) * .5;

    outColor = diagnoalBlurColor;
}