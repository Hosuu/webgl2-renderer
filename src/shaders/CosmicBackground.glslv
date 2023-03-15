#version 300 es

uniform float uAspect;

layout (location = 0) in vec2 aPosition;
layout (location = 1) in vec2 aTexCoord;
layout (location = 2) in vec3 aVertexColor;

out vec2 vTexCoord;
out vec3 vVertexColor;

void main(){
  vTexCoord = aTexCoord;
  vVertexColor = vec3(aVertexColor);

  float posX = aPosition.x;
  float posY = aPosition.y * uAspect;

  //Always fit to whole screen
  if(abs(posX) < 1.0){
    posX *= 1.0 / abs(posX);
    posY *= 1.0 / abs(posX);
  }
  if(abs(posY) < 1.0){
    posX *= 1.0 / abs(posY);
    posY *= 1.0 / abs(posY);
  }

  gl_Position = vec4(posX, posY, 0.0, 1.0);
}
