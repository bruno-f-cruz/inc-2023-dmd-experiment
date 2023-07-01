#version 400
uniform vec2 shift = vec2(0,0);
uniform vec2 scale = vec2(1,1);
uniform sampler2D tex;
uniform sampler2D lut_X;
uniform sampler2D lut_Y;
uniform int debug = 0;
in vec2 texCoord;
out vec4 fragColor;

void main()
{
  vec2 coord = texCoord * scale + shift;
  vec2 coord_luted = vec2(texture(lut_X, coord).r, texture(lut_Y, coord).r);
  coord_luted.r = coord_luted.r;
  coord_luted.g = coord_luted.g;
  vec4 texel = texture(tex, coord_luted);
  if (debug == 1)
  {
    fragColor = texture(lut_X, coord);
  }
  else if (debug == 2)
  {
    fragColor = texture(lut_Y, coord);
  }
  else if (debug == 3)
  {
    fragColor = vec4(coord_luted.r, coord_luted.g, 0, 1);
  }
  else if (debug == 4)
  {
    fragColor = texture(tex, coord);;
  }
  else{
    fragColor = texel;
    }

}
