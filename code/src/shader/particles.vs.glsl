#version 100
precision mediump float;

attribute vec3 a_position;
attribute vec3 a_direction;
attribute float a_ttl;
attribute vec2 a_texCoord;

uniform mat4 u_modelView;
uniform mat4 u_projection;

varying vec2 v_texCoord;

void main() {
    gl_Position = u_projection * u_modelView * vec4(a_position+a_direction, 1);
    v_texCoord = a_texCoord;
}