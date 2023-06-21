/**
 * a phong shader implementation
 * Created by Samuel Gratzl on 29.02.2016.
 */
attribute vec3 a_position;
attribute vec3 a_normal;
attribute vec2 a_texCoord;

uniform mat4 u_modelView;
uniform mat3 u_normalMatrix;
uniform mat4 u_modelMatrix;
uniform mat4 u_projection;

uniform vec3 u_lightPos;
uniform vec3 u_lightButtonPos;
uniform vec3 u_lightOrbPos;
uniform vec3 u_lightBeam1Pos;
uniform vec3 u_lightBeam2Pos;
uniform vec3 u_lightBeam3Pos;
uniform vec3 u_spotlightPos;
uniform vec3 u_spotlightDir;

//output of this shader
varying vec3 v_normalVec;
varying vec3 v_eyeVec;
varying vec3 v_lightVec;
varying vec3 v_lightButtonVec;
varying vec3 v_lightOrbVec;
varying vec3 v_lightBeam1Vec;
varying vec3 v_lightBeam2Vec;
varying vec3 v_lightBeam3Vec;
varying vec3 v_spotlightVec;
varying vec2 v_texCoord;
varying vec3 v_spotlightDir;


void main() {
    vec4 eyePosition = u_modelView * vec4(a_position, 1);

    v_normalVec = u_normalMatrix * a_normal;
    v_eyeVec = -eyePosition.xyz;

    //light position as uniform
    v_lightVec = u_lightPos - eyePosition.xyz;
    v_lightButtonVec = u_lightButtonPos - eyePosition.xyz;
    v_lightOrbVec = u_lightOrbPos - eyePosition.xyz;
    v_lightBeam1Vec = u_lightBeam1Pos - eyePosition.xyz;
    v_lightBeam2Vec = u_lightBeam2Pos - eyePosition.xyz;
    v_lightBeam3Vec = u_lightBeam3Pos - eyePosition.xyz;
    v_spotlightVec = u_spotlightPos - eyePosition.xyz;

    v_texCoord = a_texCoord;

    gl_Position = u_projection * eyePosition;
}
