/**
 * Initializes light sources.
 * @param gl        GL context.
 * @param root      Our own scenegraph created in {@link #init}.
 * @param resources An object containing defined keys with loaded resources.
 * @return An array with the defined light sources.
 */
function initLights(gl, root, resources) {
    let buttonLight = createLight(gl, resources, [2.5, 0.49, -4], [10,10,10,255], [255,0,0,255], [255,0,0,255], 0.1, "Button");
    enableLight(buttonLight, root);

    let orbLight = createLight(gl, resources, [0, 0, 0], [25,25,25,255], [0,255,220,255], [0,255,220,255], 0.05, "Orb");
    // enable later

    // lights highlighting the bottom of the ice beam
    let beamLight1 = createLight(gl, resources, [0.5, -4.7, 0.5], [25, 25, 25, 255], [90,50,255,255], [90,50,255,255], 0.05, "Beam1");
    let beamLight2 = createLight(gl, resources, [-0.5, -4.7, 0.5], [25, 25, 25, 255], [90,50,255,255], [90,50,255,255], 0.05, "Beam2");
    let beamLight3 = createLight(gl, resources, [0, -4.7, -0.5], [25, 25, 25, 255], [90,50,255,255], [90,50,255,255], 0.05, "Beam3");
    let beamLights = [beamLight1, beamLight2, beamLight3];
    // enable later

    // illuminates the whole scene
    let sunLight = createLight(gl, resources, [-5, 30, 0], [180, 180, 150, 255], [255,247,208,255], [255,247,208,255], 1, "");
    enableLight(sunLight, root);

    return [buttonLight, orbLight, beamLights];
}


/**
 * Creates a light source based on the given parameters.
 * @param gl        GL context.
 * @param resources An object containing defined keys with loaded resources.
 * @param position  The coordinates the light source should be created at.
 * @param ambient   Color specified for ambient part of phong shading.
 * @param diffuse   Color specified for diffuse part of phong shading.
 * @param specular  Color specified for specular part of phong shading.
 * @param radius    The light spheres' radius.
 * @param name      A name used to identify the lights correlating uniform.
 * @return The light source.
 */
function createLight(gl, resources, position, ambient, diffuse, specular, radius, name) {
    let light = new LightSGNode();
    light.ambient = rgbToPercent(ambient);
    light.diffuse = rgbToPercent(diffuse);
    light.specular = rgbToPercent(specular);
    light.position = position;
    // light._worldPosition = position;
    light.uniform = "u_light" + name;
    light.append(createLightSphere( resources, radius));

    return light;
}


/**
 * Creates a sphere on which a different shader is used in order to make it a light sphere.
 * @param resources An object containing defined keys with loaded resources.
 * @param radius    The spheres radius.
 * @return The created sphere.
 */
function createLightSphere(resources, radius) {
    return new ShaderSGNode(createProgram(gl, resources.vs_single, resources.fs_single), [
        new RenderSGNode(makeSphere(radius, 10, 10))
    ]);
}


/**
 * Enables a light source by appending it to the corresponding root node.
 * @param lightSource   The light source to be turned on.
 * @param lightRoot     The transformation node the light source gets appended to.
 */
function enableLight(lightSource, lightRoot) {
    // add light to scenegraph
    lightRoot.append(lightSource);
}


/**
 * Disables a light source by setting all of its values to 0.
 * @param   lightSource The light source to be turned off.
 */
function disableLight(lightSource) {
    lightSource.diffuse = [0, 0, 0, 0];
    lightSource.specular = [0, 0, 0, 0];
    lightSource.ambient = [0, 0, 0, 0];
}


function createSpotlight( root, resources, position, ambient, diffuse, specular, radius, cutoff, direction) {
    let light = new SpotlightSGNode(cutoff, direction, position, []);
    // light.ambient = ambient;
    light.append(createLightSphere(gl, resources, radius));
    root.append(light);
    return light;
}


class SpotlightSGNode extends LightSGNode {
    constructor(cutoff, direction, position, children) {
        // let u_isSpotlight = new SetUniformSGNode("u_isSpotlight", isSpotlight);
        // let u_cutoff = new SetUniformSGNode("u_cutoff");
        // let u_spotDir = new SetUniformSGNode("u_spotDir");
        // children.push(u_cutoff, u_spotDir);
        super(position, children);

        this.uniform = "u_spotlight";
        this.cutoff = Math.cos(glm.deg2rad(cutoff));
        this.direction = direction;

    }

    render(context) {
        // gl.uniform1i(gl.getUniformLocation(context.shader, "u_isSpotlight"), 1);
        // gl.uniformMatrix4fv(gl.getUniformLocation(context.shader, "u_modelMatrix"), false, context.sceneMatrix);
        gl.uniform3fv(gl.getUniformLocation(context.shader, this.uniform + ".position"), this.position);
        gl.uniform1f(gl.getUniformLocation(context.shader, this.uniform +"+.cutoff"), this.cutoff);
        gl.uniform3fv(gl.getUniformLocation(context.shader, this.uniform + ".direction"), this.direction);
        super.render(context);
        // gl.uniform1i(gl.getUniformLocation(context.shader, "u_isSpotlight"), 0);
    }
}