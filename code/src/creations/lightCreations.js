
// maybe spawn all lights and collect in array

/**
 * Initializes light sources.
 * @param gl        GL context.
 * @param root      Our own scenegraph created in {@link #init}.
 * @param resources An object containing defined keys with loaded resources.
 * @return An array with the defined light sources.
 */
function initLights(gl, root, resources) {
    let buttonLight = createLight(gl, root, resources, [2.5, 0.49, -4], [255,255,255,255], [255,255,255,255], [255,255,255,255], 0.1);
    let orbLight = createLight(gl, root, resources, [2.5, -2, -4], [255,255,255,255], [255,255,255,255], [255,255,255,255], 0.1);

    // lights highlighting the bottom of the ice beam
    let beamLight1 = createLight(gl, root, resources, [4, 2, -4], [255,255,255,255], [255,255,255,255], [255,255,255,255], 0.05)
    let beamLight2 = createLight(gl, root, resources, [4, 3, -4], [255,255,255,255], [255,255,255,255], [255,255,255,255], 0.05)
    let beamLight3 = createLight(gl, root, resources, [4, 4, -4], [255,255,255,255], [255,255,255,255], [255,255,255,255], 0.05)

    return [buttonLight, orbLight, beamLight1, beamLight2, beamLight3];
}

/**
 * Creates a light source based on the given parameters.
 * @param gl        GL context.
 * @param root      Our own scenegraph created in {@link #init}.
 * @param resources An object containing defined keys with loaded resources.
 * @param position  The coordinates the light source should be created at.
 * @param ambient   Color specified for ambient part of phong shading.
 * @param diffuse   Color specified for diffuse part of phong shading.
 * @param specular  Color specified for specular part of phong shading.
 * @param radius    The light spheres' radius.
 * @return The light source.
 */
function createLight(gl, root, resources, position, ambient, diffuse, specular, radius) {
    // create white light node
    let light = new LightSGNode();
    light.ambient = rgbToPercent(ambient);
    light.diffuse = rgbToPercent(diffuse);
    light.specular = rgbToPercent(specular);
    light.position = position;
    light.append(createLightSphere(gl, resources, radius));
    // add light to scenegraph
    root.append(light);
    return light;
}

// create node with different shaders

/**
 * Creates a sphere on which a different shader is used in order to make it a light sphere.
 * @param gl        GL context.
 * @param resources An object containing defined keys with loaded resources.
 * @param radius    The spheres radius.
 * @return The created sphere.
 */
function createLightSphere(gl, resources, radius) {
    return new ShaderSGNode(createProgram(gl, resources.vs_single, resources.fs_single), [
        new RenderSGNode(makeSphere(radius, 10, 10))
    ]);
}