#version 400
uniform vec2 shift = vec2(0,0);
uniform vec2 scale = vec2(1,1);
uniform sampler2D tex;
uniform sampler2D lut_X;
uniform sampler2D lut_Y;
in vec2 texCoord;
out vec4 fragColor;

void main()
{
  vec2 coord = texCoord * scale + shift;
  vec2 coord_luted = vec2(texture(lut_X, coord).r, texture(lut_Y, coord).r);
  vec4 texel = texture(tex, coord_luted);
  fragColor = texel;
}
