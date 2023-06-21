/**
 * a phong shader implementation
 * Created by Samuel Gratzl on 29.02.2016.
 */
precision mediump float;

/**
 * definition of a material structure containing common properties
 */
struct Material {
    vec4 ambient;
    vec4 diffuse;
    vec4 specular;
    vec4 emission;
    float shininess;
};

/**
 * definition of the light properties related to material properties
 */
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

uniform Material u_material;
uniform Light u_light;
uniform Light u_lightButton;
uniform Light u_lightOrb;
uniform Light u_lightBeam1;
uniform Light u_lightBeam2;
uniform Light u_lightBeam3;
uniform Spotlight u_spotlight;

//varying vectors for light computation
varying vec3 v_normalVec;
varying vec3 v_eyeVec;
varying vec3 v_lightVec;
varying vec3 v_lightButtonVec;
varying vec3 v_lightOrbVec;
varying vec3 v_lightBeam1Vec;
varying vec3 v_lightBeam2Vec;
varying vec3 v_lightBeam3Vec;

// texture related variables
varying vec2 v_texCoord;
uniform sampler2D u_tex;
uniform bool u_enableObjectTexture;

// spotlight
uniform float u_cufoff;
varying vec3 v_spotlightDir;
varying vec3 v_spotlightVec;


vec4 calculateSimplePointLight(Light light, Material material, vec3 lightVec, vec3 normalVec, vec3 eyeVec, vec4 textureColor) {
    // You can find all built-in functions (min, max, clamp, reflect, normalize, etc.)
    // and variables (gl_FragCoord, gl_Position) in the OpenGL Shading Language Specification:
    // https://www.khronos.org/registry/OpenGL/specs/gl/GLSLangSpec.4.60.html#built-in-functions
    lightVec = normalize(lightVec);
    normalVec = normalize(normalVec);
    eyeVec = normalize(eyeVec);

    //compute diffuse term
    float diffuse = max(dot(normalVec,lightVec),0.0);

    //compute specular term
    vec3 reflectVec = reflect(-lightVec,normalVec);
    float spec = pow( max( dot(reflectVec, eyeVec), 0.0) , material.shininess);

    if(u_enableObjectTexture)
    {
        material.diffuse = textureColor;
        material.ambient = textureColor;
    }

    vec4 c_amb  = clamp(light.ambient * material.ambient, 0.0, 1.0);
    vec4 c_diff = clamp(diffuse * light.diffuse * material.diffuse, 0.0, 1.0);
    vec4 c_spec = clamp(spec * light.specular * material.specular, 0.0, 1.0);
    vec4 c_em   = material.emission;

    return c_amb + c_diff + c_spec + c_em;
}


vec4 calculateSpotlight(Spotlight spotlight, Material material, vec3 lightVec, vec3 normalVec, vec3 eyeVec, vec4 textureColor) {

    lightVec = normalize(spotlight.position - lightVec);
    normalVec = normalize(normalVec);
    eyeVec = normalize(eyeVec);

    // implement phong shader

    //compute diffuse term
    float diffuse = max(dot(normalVec, lightVec), 0.0);

    //compute specular term
    vec3 reflectVec = reflect(-lightVec, normalVec);
    float spec = pow(max(dot(reflectVec, eyeVec), 0.0), material.shininess);


    if (u_enableObjectTexture)
    {
        material.diffuse = textureColor;
        material.ambient = textureColor;
    }


    vec4 c_amb = clamp(spotlight.ambient * material.ambient, 0.0, 1.0);
    vec4 c_diff = clamp(diffuse * spotlight.diffuse * material.diffuse, 0.0, 1.0);
    vec4 c_spec = clamp(spec * spotlight.specular * material.specular, 0.0, 1.0);
    vec4 c_em = material.emission;


    float theta = dot(lightVec, normalize(-spotlight.direction));
    if (theta > spotlight.cufoff) {
        return c_amb + c_diff + c_spec + c_em;
    } else {
        return c_amb + c_em;
    }
}


void main() {

    vec4 textureColor = vec4(0, 0, 0, 1);
    if (u_enableObjectTexture)
    {
        textureColor = texture2D(u_tex, v_texCoord);
    }

    gl_FragColor = calculateSimplePointLight(u_light, u_material, v_lightVec, v_normalVec, v_eyeVec, textureColor)
    + calculateSimplePointLight(u_lightButton, u_material, v_lightButtonVec, v_normalVec, v_eyeVec, textureColor)
    + calculateSimplePointLight(u_lightOrb, u_material, v_lightOrbVec, v_normalVec, v_eyeVec, textureColor)
    + calculateSimplePointLight(u_lightBeam1, u_material, v_lightBeam1Vec, v_normalVec, v_eyeVec, textureColor)
    + calculateSimplePointLight(u_lightBeam2, u_material, v_lightBeam2Vec, v_normalVec, v_eyeVec, textureColor)
    + calculateSimplePointLight(u_lightBeam3, u_material, v_lightBeam3Vec, v_normalVec, v_eyeVec, textureColor);
//  + calculateSpotlight(u_spotlight, u_material, v_spotlightVec, v_normalVec, v_eyeVec, textureColor);

}
