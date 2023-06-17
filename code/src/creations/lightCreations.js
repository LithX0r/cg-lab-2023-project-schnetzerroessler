
// maybe spawn all lights and collect in array
function initLights() {

}

function createLight(gl, root, resources, position, ambient, diffuse, specular, radius) {
    // create white light node
    let light = new LightSGNode();
    light.ambient = ambient;
    light.diffuse = diffuse;
    light.specular = specular;
    light.position = position;
    light.append(createLightSphere(gl, resources, radius));
    // add light to scenegraph
    root.append(light);
    return light;
}

// create node with different shaders
function createLightSphere(gl, resources, radius) {
    return new ShaderSGNode(createProgram(gl, resources.vs_single, resources.fs_single), [
        new RenderSGNode(makeSphere(radius, 10, 10))
    ]);
}