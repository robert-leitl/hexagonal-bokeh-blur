bool inNearField(float radiusPixels) {
    return radiusPixels > 0.25;
}

float getRadius(float depth) {
    return clamp(smoothstep(.65, 1., depth), 0.001, 1.);
}

void blur(
    in vec2 A,
    in vec2 direction,
    in int maxCoCRadius,
    in float radiusScale,
    in sampler2D inTexture,
    in sampler2D depthTexture,
    in vec2 off,
    out vec4 outColor
) {
    vec4 resultColor = vec4(0.);
    float weightSum = 0.;

    // position of the current pixel
    vec2 texelSize = 1. / vec2(texSize(inTexture, 0));
    vec4 colorA = tex(inTexture, A);
    float depthA = tex(depthTexture, A).x;
    float rA = getRadius(depthA) * float(maxCoCRadius);
    int irA = int(floor(rA)) * 2;


    // scatter as you gather loop
    for(int delta = 0; delta <= irA; ++delta) {

        // get the CoC radius at this tap
        vec2 B = A + direction * ((float(delta) * radiusScale + off) * texelSize);
        vec4 colorB = tex(inTexture, B);
        float depthB = tex(depthTexture, B).x;
        float rB = getRadius(depthB) * float(maxCoCRadius);

        // get the effect of the CoC at B on the current pixel at A
        float blurWeight = clamp((rB / float(maxCoCRadius)) * 4., 0., 1.);

        // only consider if B is in front of A
        float bNearerWeight = clamp(abs(rA) - abs(rB) + 1.5, 0., 1.);

        // get the weight for mid and far field values
        float weight = bNearerWeight * blurWeight;

        // update the mid/far result
        weightSum += weight;
        resultColor.rgb += colorB.rgb * weight;
    }

    // apply total weights
    resultColor.rgb /= weightSum;
    resultColor.a = rA / float(maxCoCRadius);

    outColor = resultColor;
}

#pragma glslify: export(blur)