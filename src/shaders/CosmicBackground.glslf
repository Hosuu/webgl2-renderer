#version 300 es
precision mediump float;

uniform sampler2D texture0;
uniform float uZoom;
uniform float uScrollSpeedFactor;
uniform float uBrightness;
uniform float uTime;
uniform vec3 uFrontColor;
uniform vec3 uBackColor;

in vec2 vTexCoord;
in vec4 vVertexColor;

out vec4 fragmentColor;

vec4 PixelShaderFunction(vec4 sampleColor, vec2 coords)
{
    vec4 result = vec4(0);
    float volumetricLayerFade = 1.0;
    for (int i = 0; i < 10; i++)
    {
        float time = uTime / volumetricLayerFade;
        vec2 p = coords * uZoom;
        p.y += 1.5;

        p += vec2(time * uScrollSpeedFactor, time * uScrollSpeedFactor);
        p /= volumetricLayerFade;

        float totalChange = texture(texture0, p).r;
        vec4 layerColor = vec4(mix(uFrontColor, uBackColor, float(i) / 12.0), 1.0);
        result += layerColor * totalChange * volumetricLayerFade;

        volumetricLayerFade *= 0.9;
    }

    // Account for the accumulated scale from the fractal noise.

    result.rgb = pow(result.rgb * 0.010714, vec3(1.6)) * uBrightness;
    return result * sampleColor;
}

void main(){
  fragmentColor = PixelShaderFunction(vVertexColor, vTexCoord);
}
