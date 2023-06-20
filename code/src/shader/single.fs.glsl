/**
 * a phong shader implementation
 * Created by Samuel Gratzl on 29.02.2016.
 */
precision mediump float;

struct Light {
	vec4 ambient;
	vec4 diffuse;
	vec4 specular;
};

struct Spotlight {
	vec4 ambient;
	vec4 diffuse;
	vec4 specular;
	float cufoff;
	vec3 direction;
	vec3 position;
};

//uniform Material u_material;
uniform Light u_light;
uniform Light u_lightButton;
uniform Light u_lightOrb;
uniform Light u_lightBeam1;
uniform Light u_lightBeam2;
uniform Light u_lightBeam3;
uniform Spotlight u_spotlight;

void main() {
//	gl_FragColor = vec4(1, 0, 0, 2);
//	vec4 c = u_light.diffuse;
	vec4 c = vec4(1, 1, 1, 1);
	gl_FragColor = vec4(c);
}
