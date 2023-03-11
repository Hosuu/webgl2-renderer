#version 300 es

uniform float uAspect;

in vec2 aPosition;
in vec2 aTexCoord;
in vec3 aVertexColor;

out vec2 vTexCoord;
out vec4 vVertexColor;

void main(){
  vTexCoord = aTexCoord;
  vVertexColor = vec4(aVertexColor, 1.0);

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
