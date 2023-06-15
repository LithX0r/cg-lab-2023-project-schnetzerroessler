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

// time in last render step
var previousTime = 0;

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

//load the shader resources using a utility function
loadResources({
    vs: './src/shader/phong.vs.glsl',
    fs: './src/shader/phong.fs.glsl',
    vs_single: './src/shader/single.vs.glsl',
    fs_single: './src/shader/single.fs.glsl',

    // Objects
    penguinBody: './src/models/penguin/penguinBodyFeet.obj',
    penguinHeadBeak: './src/models/penguin/penguinHeadBeak.obj',
    penguinLeftWing: './src/models/penguin/penguinLeftWing.obj',
    penguinRightWing: './src/models/penguin/penguinRightWing.obj',
    penguinFull: './src/models/penguin/penguin2.obj',
    penguinRightWing_separate: './src/models/penguin/penguinRightWing_separate.obj',

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

    orb: './src/models/orb/orb.obj'


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

    // cameraAnimation = new Animation(camera,[{matrix: addKeyFrame([2,1,-10],0,-45, 0), duration: 10}], false);
    cameraAnimation = addCameraAnimation(camera);
    cameraAnimation.start();



    //TODO create your own scenegraph
    root = createSceneGraph(gl, resources);

    // Object creation

    ufoTNodes = createUFO(root, resources);

    pillButtonTNode = createPillar(root, resources);

    createForest(root, resources);

    penguinMain = createMainPenguin(root, resources);
    penguin1TNode = createPenguin(root, resources, [-4.8, 0, 0.8], glm.rotateY(121));
    penguin2TNode = createPenguin(root, resources, [-4, 0, 2], glm.rotateY(132));
    penguin3TNode = createPenguin(root, resources, [-3.5, 0, -0.2], glm.rotateY(132));
    penguin4TNode = createPenguin(root, resources, [-6.2, 0, 1.3], glm.rotateY(129));






    // orb = createOrb(root, resources);
    // Animation creation
    penguinMainWaddle = createPenguinWaddle(penguinMain, [-3.8, 0, -1.5], [2, 0, -4], 125, 0);
    penguin1Waddle = createPenguinWaddle(penguin1TNode, [-4.8, 0, 0.8], [1, 0, -4.5], 121, 10)
    penguin2Waddle = createPenguinWaddle(penguin2TNode, [-4, 0, 2], [2, 0, -2.5], 132, 25);
    penguin2Waddle = createPenguinWaddle(penguin2TNode, [-4, 0, 2], [2, 0, -2.5], 132, 25);
    penguin3Waddle = createPenguinWaddle(penguin3TNode, [-3.5, 0, -0.2], [1, 0, -3], 132, -5);
    penguin4Waddle = createPenguinWaddle(penguin4TNode, [-6.2, 0, 1.3], [0, 0, -4.4], 129, -30);

    /*
    let test = new MaterialSGNode([new RenderSGNode(resources.penguinRightWing_separate)]);
    testNode = new TransformationSGNode(glm.translate(0,0,0), [test]);
    root.append(testNode);

     // */
    // testNode.setMatrix(glm.rotateX(50));


    // /*
    buttonAnim = new Animation(pillButtonTNode, [{
        matrix: mat4.translate(mat4.create(), mat4.create(), [0, 0, 0]),
        duration: 1
    }, {
        matrix: mat4.translate(mat4.create(), mat4.create(), [0, -0.05, 0]),
        duration: 350
    }], false);
    buttonAnim.start();


    ufoFlight = createFlight(ufoTNodes, [[100, 5, -30], [8, 5, 0], [8, 5, 0], [5, 5, -5], [0, 5, -8], [-5, 5, -5], [-2, 5, 0], [3, 5, 3]]);


    orbAnim = createOrbAnim(orb, [2.5, 1, -4], [2.5, 20, -4]);


    penguinMainJump = createJump(penguinMain, [2, 0, -4], 0, 0.3);
    penguin1Jump = createJump(penguin1TNode, [1, 0, -4.5], 10, 0.33);
    penguin2Jump = createJump(penguin2TNode, [2, 0, -2.5], 25, 0.28);
    penguin3Jump = createJump(penguin3TNode, [1, 0, -3], -5, 0.32);
    penguin4Jump = createJump(penguin4TNode, [0, 0, -4.4], -30, 0.31);


     // */


    penguinArmUp = new Animation(penguinMain[3], [
        {matrix: addKeyFrame([-0.145811, 0.947348, -0.00042], -70, 0, 0), duration: 1000}], false);
    penguinArmUp.start()

    penguinArmDown = new Animation(penguinMain[3], [
        {matrix: addKeyFrame([-0.145811, 0.947348, -0.00042], -70, 0, 0), duration: 1},
        {matrix: addKeyFrame([-0.145811, 0.947348, -0.00042], 0, 0, 0), duration: 1500}], false);
    penguinArmDown.start();

    /*
    penguinArm = new Animation(penguinMain[3], [
        {matrix: addKeyFrame([-0.145811, 0.947348, -0.00042], -45, 0, 0), duration: 1000},
        {matrix: addKeyFrame([-0.145811, 0.947348, -0.00042], 0, 0, 0), duration: 1000}], false);
    penguinArm.start();

     */

}

function createSceneGraph(gl, resources) {
    //create scenegraph
    const root = new ShaderSGNode(createProgram(gl, resources.vs, resources.fs))

    // create node with different shaders
    function createLightSphere() {
        return new ShaderSGNode(createProgram(gl, resources.vs_single, resources.fs_single), [
            new RenderSGNode(makeSphere(.2, 10, 10))
        ]);
    }

// /*
    // create white light node
    let light = new LightSGNode();
    light.ambient = [0, 0, 0, 1];
    light.diffuse = [1, 1, 1, 1];
    light.specular = [1, 1, 1, 1];
    light.position = [1, 10, 0];
    light.append(createLightSphere(resources));
    // add light to scenegraph
    root.append(light);

    // create floor
    let floor = new MaterialSGNode( [
        new RenderSGNode(makeRect(10, 10))
    ]);
    //dark
    floor.ambient = [0.2, 0.4, 0.2, 1];
    floor.diffuse = [0.1, 0.1, 0.1, 1];
    floor.specular = [0.5, 0.5, 0.5, 1];
    floor.shininess = 3;
    // add floor to scenegraph
    root.append(new TransformationSGNode(glm.transform({translate: [0, 0, 0], rotateX: -90, scale: 5}), [
        floor
    ]));
    // floor = createFloor(root);



    // orb.shininess = 67;

    orb = createOrb(root, resources);
    // let mainTNode = orb[0];
    // let orbRotTNode = orb[1];

    // mainTNode.append(orbRotTNode);
    // root.append(mainTNode);
    // orb = [mainTNode, orbRotTNode];


    return root;
}

/**
 * render one frame
 */
function render(timeInMilliseconds) {
    // check for resize of browser window and adjust canvas sizes
    checkForWindowResize(gl);

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clearColor(0.9, 0.9, 0.9, 1.0);
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




    // penguinMain[2].setMatrix(mat4.multiply(mat4.create(), glm.rotateX(1), penguinMain[2].matrix));
    // penguinMain[3].setMatrix(mat4.multiply(mat4.create(), penguinMain[3].matrix, glm.rotateX(1)));

    // testNode.setMatrix(mat4.multiply(mat4.create(), glm.rotateX(1), testNode.matrix));

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

            orbAnim.forEach(e => e.update(deltaTime));

        }
        if (!orbAnim[0].running) {
            orbAnim[1].running = false;
            ufoFlight[0].update(deltaTime);
        }
        if (!ufoFlight[0].running) {
            ufoFlight[1].update(deltaTime);
            // ufoFlight[2].update(deltaTime);
            ufoTNodes[3].setMatrix(glm.translate(0, 0, 0));
        }
        if (!ufoFlight[1].running) {
            // ufoFlight[2].running = false;
            ufoTNodes[3].setMatrix(glm.translate(0, -7, 0));
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

