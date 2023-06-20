//the OpenGL context
var gl = null,
    program = null;


//Camera
var camera = null;
var cameraPos = vec3.create();
var cameraCenter = vec3.create();
var cameraAnimation = null;

// scenegraph root node
var root = null;

var rotateBeamLights;

var grassToSnow;

// time in last render step
var previousTime = 0;

let floor = null;

let penguinMain = null;
let penguin1TNode = null;
let penguin2TNode = null;
let penguin3TNode = null;
let penguin4TNode = null;

let pillButtonTNode = null;

let ufoTNodes = null;

let penguinMainWaddle = null;
let penguin1Waddle = null;
let penguin2Waddle = null;
let penguin3Waddle = null;
let penguin4Waddle = null;

let penguinMainJump = null;
let penguin1Jump = null;
let penguin2Jump = null;
let penguin3Jump = null;
let penguin4Jump = null;

let buttonAnim = null;
let ufoFlight = null;
let startedPenguins = true;

let orb = null;
let orbAnim = null;

let penguinArmUp = null;
let penguinArmDown = null;

let grassToSnowTNode;

let cubeMapTex = null;

let lights = null;

let partsys = null;

//load the shader resources using a utility function
loadResources({
    vs: './src/shader/phong.vs.glsl',
    fs: './src/shader/phong.fs.glsl',
    vs_single: './src/shader/single.vs.glsl',
    fs_single: './src/shader/single.fs.glsl',
    ps_vs: './src/shader/particles.vs.glsl',
    ps_fs: './src/shader/particles.fs.glsl',

    // Objects
    penguinBody: './src/models/penguin/penguinBodyFeet.obj',
    penguinHeadBeak: './src/models/penguin/penguinHeadBeak.obj',
    penguinLeftWing: './src/models/penguin/penguinLeftWing.obj',
    // penguinRightWing: './src/models/penguin/penguinRightWing.obj',
    penguinFull: './src/models/penguin/penguin2.obj',
    penguinRightWing: './src/models/penguin/penguinRightWing_textured.obj',

    penguinTex: './src/models/penguin/texture_test.png',

    ufoFixedParts: './src/models/ufo/ufoFixedParts.obj',
    ufoUpperDisk: './src/models/ufo/ufoUpperDisk.obj',
    ufoLowerDisk: './src/models/ufo/ufoLowerDisk.obj',
    ufoBeam: './src/models/ufo/ufoBeam.obj',

    pillarWRing: './src/models/pillar/pillarWCircle.obj',
    pillarButton: './src/models/pillar/pillarButton.obj',

    tree0Top: './src/models/trees/tree000Top.obj',
    tree0Trunk: './src/models/trees/tree000Trunk.obj',

    tree1Top: './src/models/trees/tree001Top.obj',
    tree1Trunk: './src/models/trees/tree001Trunk.obj',

    tree2Top: './src/models/trees/tree002Top.obj',
    tree2Trunk: './src/models/trees/tree002Trunk.obj',

    tree3Top: './src/models/trees/tree003Top.obj',
    tree3Trunk: './src/models/trees/tree003Trunk.obj',

    tree4Top: './src/models/trees/tree004Top.obj',
    tree4Trunk: './src/models/trees/tree004Trunk.obj',

    orb: './src/models/orb/orb.obj',

    particle: './src/models/particle.obj',

    env_pos_x: './src/textures/env_pos_x.png',
    env_pos_y: './src/textures/env_pos_y.png',
    env_pos_z: './src/textures/env_pos_z.png',
    env_neg_x: './src/textures/env_pos_x.png',
    env_neg_y: './src/textures/env_pos_y.png',
    env_neg_z: './src/textures/env_pos_z.png',

}).then(function (resources /*an object containing our keys with the loaded resources*/) {
    init(resources);

    render(0);
});

/**

 * initializes OpenGL context, compile shader, and load buffers
 */
function init(resources) {
    //create a GL context
    gl = createContext();

    //setup camera
    cameraStartPos = vec3.fromValues(2, 1, -10);
    camera = new UserControlledCamera(gl.canvas, cameraStartPos);
    //setup an animation for the camera, moving it into position

    //change between camera animation and manual camera controls by commenting out code
    cameraAnimation = new Animation(camera,[{matrix: addKeyFrame([2,1,-10],0,-45, 0), duration: 10}], false);
    // cameraAnimation = addCameraAnimation(camera);
    cameraAnimation.start();



    // cubeMapTex = initCubeMap(resources);

    //TODO create your own scenegraph

    root = createSceneGraph(gl, resources);


    // let skybox = new EnvironmentSGNode(cubeMapTex, 4, false, makeSphere(50, 10, 10));


    // Animation creation
    penguinMainWaddle = createPenguinWaddle(penguinMain, [-3.8, 0, -1.5], [2, 0, -4], 125, 0);
    penguin1Waddle = createPenguinWaddle(penguin1TNode, [-4.8, 0, 0.8], [1, 0, -4.5], 121, 10)
    penguin2Waddle = createPenguinWaddle(penguin2TNode, [-4, 0, 2], [2, 0, -2.5], 132, 25);
    penguin3Waddle = createPenguinWaddle(penguin3TNode, [-3.5, 0, -0.2], [1, 0, -3], 132, -5);
    penguin4Waddle = createPenguinWaddle(penguin4TNode, [-6.2, 0, 1.3], [0, 0, -4.4], 129, -30);

    buttonAnim = createButtonAnim(pillButtonTNode);

    ufoFlight = createUfoAnim(ufoTNodes, [[100, 5, -30], [8, 5, 0], [8, 5, 0], [5, 5, -5], [0, 5, -8], [-5, 5, -5], [-2, 5, 0], [3, 5, 3]]);

    orbAnim = createOrbAnim(orb, [2.5, 1, -4], [2.5, 20, -4]);

    penguinMainJump = createPenguinJump(penguinMain, [2, 0, -4], 0, 0.3);
    penguin1Jump = createPenguinJump(penguin1TNode, [1, 0, -4.5], 10, 0.33);
    penguin2Jump = createPenguinJump(penguin2TNode, [2, 0, -2.5], 25, 0.28);
    penguin3Jump = createPenguinJump(penguin3TNode, [1, 0, -3], -5, 0.32);
    penguin4Jump = createPenguinJump(penguin4TNode, [0, 0, -4.4], -30, 0.31);

    let penguinArm = createPenguinWingRotation(penguinMain);
    penguinArmUp = penguinArm[0];
    penguinArmDown = penguinArm[1];

    //
    grassToSnowTNode = new TransformationSGNode(mat4.fromValues(
        floor.ambient[0], floor.ambient[1], floor.ambient[2], floor.ambient[3],
        floor.diffuse[0], floor.diffuse[1], floor.diffuse[2], floor.diffuse[3],
        floor.specular[0], floor.specular[1], floor.specular[2], floor.specular[3],
        floor.emission[0], floor.emission[1], floor.emission[2], floor.emission[3]));

    let whiteFloorMatrix = mat4.fromValues(
        1, 1, 1, 1,
        1, 1, 1, 1,
        1, 1, 1, 1,
        1, 1, 1, 1);

    grassToSnow = new Animation(grassToSnowTNode, [
        {matrix: grassToSnowTNode.matrix, duration: 4000},
        {matrix: whiteFloorMatrix, duration: 8000}],
        false);
    grassToSnow.start();

}

function initCubeMap(resources) {
    let envCubeTexture = gl.createTexture();

    gl.activeTexture(gl.TEXTURE0);

    gl.bindTexture(gl.TEXTURE_CUBE_MAP, envCubeTexture);

    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);

    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);


    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);


    gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, resources.env_pos_x);
    gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, resources.env_neg_x);
    gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, resources.env_pos_y);
    gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, resources.env_neg_y);
    gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, resources.env_pos_z);
    gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, resources.env_neg_z);



    gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
    return envCubeTexture;
}


function createSceneGraph(gl, resources) {
    //create scenegraph
    const root = new ShaderSGNode(createProgram(gl, resources.vs, resources.fs))

    // Object creation

    // let u_enableObjTex = new SetUniformSGNode("u_enableObjectTexture", true);
    // cubeMapTex = initCubeMap(resources); TODO finish skybox
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); // TODO: explain

    ufoTNodes = createUFO(root, resources);

    pillButtonTNode = createPillar(root, resources);

    createForest(root, resources);

    orb = createOrb(root, resources);

    penguinMain = createMainPenguin(root, resources);
    penguin1TNode = createPenguin(root, resources, [-4.8, 0, 0.8], glm.rotateY(121));
    penguin2TNode = createPenguin(root, resources, [-4, 0, 2], glm.rotateY(132));
    penguin3TNode = createPenguin(root, resources, [-3.5, 0, -0.2], glm.rotateY(132));
    penguin4TNode = createPenguin(root, resources, [-6.2, 0, 1.3], glm.rotateY(129));

    // Light creation
    lights = initLights(gl, root, resources, orb, ufoTNodes);
    rotateBeamLights = [createLightTransformNode(lights[2][0]), createLightTransformNode(lights[2][1]), createLightTransformNode(lights[2][2])]

    // let spotlight = createSpotlight(gl, root, resources, [0, 10, 0], 0, 0, 0, .2, 10, [0, -1, 0]);

    partsys = new ShaderSGNode(createProgram(gl, resources.ps_vs, resources.ps_fs), new ParticleSystemNode(resources.particle, resources.penguinTex, 20, true, [0, -4.7, 0]));
    ufoTNodes[3].append(partsys);
    partsys.children[0].init();
    partsys.children[0].spawn();

    floor = createFloor(root);

    // let sky = new TexturedObjectNode()


    return root;
}

/**
 * render one frame
 */
function render(timeInMilliseconds) {
    // check for resize of browser window and adjust canvas sizes
    checkForWindowResize(gl);

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    //set background color to light blue
    gl.clearColor(0.87, 0.87, 1.0, 1.0);
    //clear the buffer
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    //enable depth test to let objects in front occluse objects further away
    gl.enable(gl.DEPTH_TEST);

    // gl.enable(gl.BLEND);
    // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    //Create projection Matrix and context for rendering.
    const context = createSGContext(gl);
    context.projectionMatrix = mat4.perspective(mat4.create(), glm.deg2rad(30), gl.drawingBufferWidth / gl.drawingBufferHeight, 0.01, 100);
    context.viewMatrix = mat4.lookAt(mat4.create(), [0, 1, -10], [0, 0, 0], [0, 1, 0]);



    var deltaTime = timeInMilliseconds - previousTime;
    previousTime = timeInMilliseconds;

    //update animation BEFORE camera
    cameraAnimation.update(deltaTime);
    camera.update(deltaTime);

    //At the end of the automatic flight, switch to manual control
    if (!cameraAnimation.running && !camera.control.enabled) {
        camera.control.enabled = true;
    }

    //TODO use your own scene for rendering

    partsys.children[0].update();
    // /*
    ufoTNodes[1].setMatrix(mat4.multiply(mat4.create(), glm.rotateY(1.7), ufoTNodes[1].matrix));
    ufoTNodes[2].setMatrix(mat4.multiply(mat4.create(), glm.rotateY(-1.7), ufoTNodes[2].matrix));
    if (startedPenguins) {

        penguinMainWaddle.forEach(e => e.update(deltaTime));

        penguin1Waddle.forEach(e => e.update(deltaTime));
        penguin2Waddle.forEach(e => e.update(deltaTime));
        penguin3Waddle.forEach(e => e.update(deltaTime));
        penguin4Waddle.forEach(e => e.update(deltaTime));
        startedPenguins = penguinMainWaddle[0].running;

    } else {

        penguinMainWaddle[1].running = false;
        penguin1Waddle[1].running = false;
        penguin2Waddle[1].running = false;
        penguin3Waddle[1].running = false;
        penguin4Waddle[1].running = false;

        penguinArmUp.update(deltaTime);

        if(!penguinArmUp.running) {
            penguinArmDown.update(deltaTime);
            buttonAnim.update(deltaTime);
        }

        if (!buttonAnim.running) {
            disableLight(lights[0]); // disable buttonLight after button is pressed
            enableLight(lights[1], orb[0]); // enable orbLight after button is pressed
            orbAnim.forEach(e => e.update(deltaTime));
        }

        if (!orbAnim[0].running) {
            orbAnim[1].running = false;
            if(lights[1].uniform === 'u_lightOrb') { // disable orbLight before removing the orb from the scene
                disableLight(lights[1]);
            }
            ufoFlight[0].update(deltaTime);
        }

        if (!ufoFlight[0].running) {
            root.remove(orb[0]); // let orb disappear after it is no longer needed
            ufoFlight[1].update(deltaTime);
            // ufoFlight[2].update(deltaTime);
            ufoTNodes[3].setMatrix(glm.translate(0, 0, 0));

            rotateBeamLights.forEach(l => enableLight(l, ufoTNodes[3])); // append beam light rotations when beam is activated
            rotateBeamLights.forEach(l => (l.matrix = glm.rotateY(timeInMilliseconds*0.2))) //enable beam light rotation

            //grassToSnow.update();
            //floor.ambient = [grassToSnowTNode.matrix[0], grassToSnowTNode.matrix[1], grassToSnowTNode.matrix[2], grassToSnowTNode.matrix[3]];
        }

        if (!ufoFlight[1].running) {
            makeFloorSnow(floor);
            // ufoFlight[2].running = false;
            ufoTNodes[3].setMatrix(glm.translate(0, -7, 0));
            lights[2].forEach(l => disableLight(l)); // disable beam lights
            // lights[2].forEach(l => ufoTNodes[3].remove(l));
            penguinMainJump.update(deltaTime);
            penguin1Jump.update(deltaTime);
            penguin2Jump.update(deltaTime);
            penguin3Jump.update(deltaTime);
            penguin4Jump.update(deltaTime);
        }
    }


    // */

    //Apply camera
    camera.render(context);

    //Render scene
    root.render(context);

    //request another call as soon as possible
    requestAnimationFrame(render);
}


/*
class EnvironmentSGNode extends SGNode {

    constructor(envtexture, textureunit, doReflect , children ) {
        super(children);
        this.envtexture = envtexture;
        this.textureunit = textureunit;
        this.doReflect = doReflect;
    }

    render(context)
    {
        //set additional shader parameters

        let invView3x3 = mat3.fromMat4(mat3.create(), mat4.invert(mat4.create(), context.viewMatrix)); //reduce to 3x3 matrix since we only process direction vectors (ignore translation)
        gl.uniformMatrix3fv(gl.getUniformLocation(context.shader, 'u_invView'), false, invView3x3);
        gl.uniform1i(gl.getUniformLocation(context.shader, 'u_texCube'), this.textureunit);
        gl.uniform1i(gl.getUniformLocation(context.shader, 'u_useReflection'), this.doReflect)

        //activate and bind texture
        gl.activeTexture(gl.TEXTURE0 + this.textureunit);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.envtexture);

        //render children
        super.render(context);

        //clean up
        gl.activeTexture(gl.TEXTURE0 + this.textureunit);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
    }
}

 */