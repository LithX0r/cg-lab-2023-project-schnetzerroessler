precision mediump float;

attribute vec3 a_position;
attribute vec2 a_texCoord;
attribute vec3 a_normal;
attribute vec3 a_direction;
attribute float a_time;

uniform mat4 u_modelView;
uniform mat4 u_projection;
uniform float u_age;
uniform float u_birth;

varying vec2 v_texCoord;


void main() {
//  float age = (a_time-u_birth)/u_age; // would have been used to move particles according to time passed since spawn

    gl_Position = u_projection * u_modelView * vec4((a_position), 1);
    v_texCoord = a_texCoord;
}