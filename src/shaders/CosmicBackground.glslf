#version 300 es
precision mediump float;

uniform sampler2D texture0;
uniform float uZoom;
uniform float uScrollSpeedFactor;
uniform float uBrightness;
uniform float uTime;
uniform vec3 uFrontColor;
uniform vec3 uBackColor;

//Custom
uniform int uIterations;
uniform vec2 uDirection;

in vec2 vTexCoord;
in vec3 vVertexColor;

out vec4 fragmentColor;

void main(){
	vec3 result = vec3(0);
	float volumetricLayerFade = 1.0;

	for (int i = 0; i < uIterations; i++){
        float time = uTime / volumetricLayerFade;

        vec2 p = (vTexCoord - vec2(0.5)) * uZoom;
        p.y += 1.5;
        p.x -= 2.3;
        p += -uDirection * time * uScrollSpeedFactor;
        p /= volumetricLayerFade;

        float totalChange = texture(texture0, p).r;
        vec3 layerColor = mix(uFrontColor, uBackColor, float(i) / float(uIterations));
        result += layerColor * totalChange * volumetricLayerFade;

        volumetricLayerFade *= 0.9;
    }

	result.rgb = pow(result.rgb * 0.010714, vec3(1.6)) * uBrightness * vVertexColor;
	fragmentColor = vec4(result, 1.0);
}
