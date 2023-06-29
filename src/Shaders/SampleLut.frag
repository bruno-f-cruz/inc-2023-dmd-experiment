#version 400
uniform vec2 shift = vec2(0,0);
uniform vec2 scale = vec2(1,1);
uniform sampler2D tex;
uniform sampler2D lut_X;
uniform sampler2D lut_Y;
uniform float correctionFactor = pow(2, 16);
uniform vec2 resolution = vec2(1920, 1080);
in vec2 texCoord;
out vec4 fragColor;

void main()
{
  vec2 coord = texCoord * scale + shift;
  vec2 coord_luted = vec2(texture(lut_X, coord).r, texture(lut_Y, coord).r);
  coord_luted.r = coord_luted.r * (correctionFactor) / resolution.r;
  coord_luted.g = coord_luted.g * (correctionFactor) / resolution.g;
  vec4 texel = texture(tex, coord_luted);
  fragColor = texel;
}
