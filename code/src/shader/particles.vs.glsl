//#version 100
//precision mediump float;
//
//attribute vec3 a_position;
//attribute vec3 a_direction;
//attribute float a_ttl;
//attribute vec2 a_texCoord;
//
//uniform mat4 u_modelView;
//uniform mat4 u_projection;
//
//varying vec2 v_texCoord;
//
//void main() {
//    gl_Position = u_projection * u_modelView * vec4(a_position+a_direction, 1);
//    v_texCoord = a_texCoord;
//}

precision mediump float;

attribute vec3 a_position;
attribute vec2 a_texCoord;
attribute vec3 a_normal;
//attribute vec3 a_centerOffset;
//attribute vec3 a_velocity;
//attribute float a_maxAge;

//uniform vec3 u_center;
uniform mat4 u_modelView;
uniform mat4 u_projection;
//uniform float u_age;
varying vec2 v_texCoord;

void main() {
//    float curAge = mod(u_age, a_maxAge);

    gl_Position = u_projection * u_modelView * vec4((a_position), 1);
    v_texCoord = a_texCoord;
}