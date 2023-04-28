//the OpenGL context
var gl = null,
    program = null;

// TODO: remove Tests

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

let buttonAnim = 0

var penguinMainWaddle = null;
var penguin1Waddle = null;
var penguin2Waddle =null;
var penguin3Waddle =null;
var penguin4Waddle = null;
let startedPenguins = true;

//load the shader resources using a utility function
loadResources({
    // TODO: delete
    vs: './src/shader/phong.vs.glsl',
    fs: './src/shader/phong.fs.glsl',
    vs_single: './src/shader/single.vs.glsl',
    fs_single: './src/shader/single.fs.glsl',
    model: './src/models/C-3PO.obj',

    // Objects
    penguinBody: './src/models/penguin/penguinBodyFeet.obj',
    penguinHeadBeak: './src/models/penguin/penguinHeadBeak.obj',
    penguinLeftWing: './src/models/penguin/penguinLeftWing.obj',
    penguinRightWing: './src/models/penguin/penguinRightWing.obj',
    penguinFull: './src/models/penguin/penguinFull.obj',

    ufoFixedParts: './src/models/ufo/ufoFixedParts.obj',
    ufoUpperDisk: './src/models/ufo/ufoUpperDisk.obj',
    ufoLowerDisk: './src/models/ufo/ufoLowerDisk.obj',

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
    cameraStartPos = vec3.fromValues(0, 10, -15);
    camera = new UserControlledCamera(gl.canvas, cameraStartPos);
    //setup an animation for the camera, moving it into position
    // /*
    // mat4.lookAt(mat4.create(), vec3.fromValues())

    cameraAnimation = new Animation(camera,
        [{matrix: mat4.translate(mat4.create(), mat4.create(), vec3.fromValues(0, 10, -15)), duration: 1}],
        false);
    cameraAnimation.start()

    mat4.lookAt(camera.viewMatrix, vec3.fromValues(0, 10, -15), vec3.fromValues(0, 0, 0), vec3.fromValues(0, 1, 0));


    // */
    //TODO create your own scenegraph
    root = createSceneGraph(gl, resources);


    ufoTNodes = createUFO(root, resources);
    pillButtonTNode = createPillar(root, resources);
    createForest(root, resources);
    penguinMain = createMainPenguin(root, resources);
    penguin1TNode = createPenguin(root, resources, [-4.8, 0, 0.8], glm.rotateY(121));
    // console.log(penguin1TNode.matrix);
    penguin2TNode = createPenguin(root, resources, [-4, 0, 2], glm.rotateY(132));
    penguin3TNode = createPenguin(root, resources, [-3.5, 0, -0.2], glm.rotateY(132));
    penguin4TNode = createPenguin(root, resources, [-6.2, 0, 1.3], glm.rotateY(129));



    // console.log(penguinMainWaddle[0].running);
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
    light.ambient = [1, 1, 1, 1];
    light.diffuse = [1, 1, 1, 1];
    light.specular = [1, 1, 1, 1];
    light.position = [1000, 500, -2];
    light.append(createLightSphere(resources));
    // add light to scenegraph
    root.append(light);

    // create floor
    let floor = new MaterialSGNode([
        new RenderSGNode(makeRect(10, 10))
    ]);
    //dark
    floor.ambient = [0.2, 0.2, 0.2, 1];
    floor.diffuse = [0.1, 0.1, 0.1, 1];
    floor.specular = [0.5, 0.5, 0.5, 1];
    floor.shininess = 3;
    // add floor to scenegraph
    root.append(new TransformationSGNode(glm.transform({translate: [0, 0, 0], rotateX: -90, scale: 5}), [
        floor
    ]));

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
    // console.log(penguinMainWaddle[0].running);


    ufoTNodes[1].setMatrix(mat4.multiply(mat4.create(), glm.rotateY(1.7), ufoTNodes[1].matrix));
    ufoTNodes[2].setMatrix(mat4.multiply(mat4.create(), glm.rotateY(-1.7), ufoTNodes[2].matrix));

    if (pillButtonTNode.matrix[1][1] >= -0.05) {

        // pillButtonTNode.setMatrix(mat4.multiply(mat4.create(), glm.translate(0, , 0), pillButtonTNode.matrix));
    }


    if(startedPenguins) {


        penguinMainWaddle = createPenguinWaddle(penguinMain, [-3.8, 0, -1.5], [2, 0, -4], 125);
        penguin1Waddle = createPenguinWaddle(penguin1TNode,  [-4.8, 0, 0.8], [1, 0, -4.5], 121)
        penguin2Waddle = createPenguinWaddle(penguin2TNode,  [-4, 0, 2], [2, 0, -2.5], 132);
        penguin3Waddle = createPenguinWaddle(penguin3TNode,  [-3.5, 0, -0.2], [1, 0, -3], 132);
        penguin4Waddle = createPenguinWaddle(penguin4TNode,  [-6.2, 0, 1.3], [0, 0, -4.4], 129);
        penguinMainWaddle.forEach(e => e.update(timeInMilliseconds));
        penguin1Waddle.forEach(e => e.update(timeInMilliseconds));
        penguin2Waddle.forEach(e => e.update(timeInMilliseconds));
        penguin3Waddle.forEach(e => e.update(timeInMilliseconds));
        penguin4Waddle.forEach(e => e.update(timeInMilliseconds));
        startedPenguins = penguinMainWaddle[0].running;
        console.log(penguinMainWaddle[0].running);
    } else {
        var animation = new Animation(pillButtonTNode, [{matrix: mat4.translate(mat4.create(), mat4.create(), [0,-0.05,0]), duration: 1500}], false );
        animation.start();
        console.log(animation.running);
        animation.update(timeInMilliseconds);

    }

    if(!startedPenguins) {

    }

    /*
    if(!penguinMainWaddle[0].running) {
        penguinMainWaddle[1].running = false;
        penguin1Waddle[1].running = false;
        penguin2Waddle[1].running = false;
        penguin3Waddle[1].running = false;
        penguin4Waddle[1].running = false;
    }
    */



    var ufoFlight = new Animation(ufoTNodes[0], [{matrix: mat4.translate(mat4.create(), mat4.create(), [30, 5, 3]), duration: 1},
        {matrix: mat4.translate(mat4.create(), mat4.create(), [0, 5, 0]), duration: 5000}]);
    ufoFlight.start();
    ufoFlight.update(timeInMilliseconds);



    //Apply camera
    camera.render(context);

    //Render scene
    root.render(context);

    //request another call as soon as possible
    requestAnimationFrame(render);
}

function createMainPenguin(root, resources) {
    // Moving Penguin
    let pengLeftWing = new MaterialSGNode([new RenderSGNode(resources.penguinLeftWing)]);
    let pengLWingTransformNode = new TransformationSGNode(glm.translate(0, 0, 0), [pengLeftWing]);

    console.log("lw: " + pengLWingTransformNode.matrix);

    let pengRightWing = new MaterialSGNode(([new RenderSGNode((resources.penguinRightWing))]));
    let pengRWingTransformNode = new TransformationSGNode(glm.transform(0, 0, 0), [pengRightWing]);

    console.log("rw: " + pengRWingTransformNode.matrix);

    let pengHeadBeak = new MaterialSGNode([new RenderSGNode(resources.penguinHeadBeak)]);
    let pengHeadBeakTransformNode = new TransformationSGNode(glm.translate(0, 0, 0), [pengHeadBeak]);

    let penguinBody = new MaterialSGNode([new RenderSGNode(resources.penguinBody)]);
    let pengBodyTransformNode = new TransformationSGNode(mat4.create(), [penguinBody]);

    // let matBody = mat4.multiply(mat4.create(), mat4.create(), glm.translate(-3.8, 0, -1.5))
    // matBody = mat4.multiply(mat4.create(), matBody, glm.rotateY(125))

    // pengBodyTransformNode.setMatrix(matBody);
    pengBodyTransformNode.setMatrix(glm.rotateY(125));


    let mainTNode = new TransformationSGNode(glm.translate(-3.8, 0, -1.5));

    root.append(mainTNode);
    mainTNode.append(pengBodyTransformNode);
    // root.append(pengBodyTransformNode);
    pengBodyTransformNode.append(pengLWingTransformNode);
    pengBodyTransformNode.append(pengRWingTransformNode);
    pengBodyTransformNode.append(pengHeadBeakTransformNode);
    return [mainTNode, pengBodyTransformNode, pengLWingTransformNode, pengRWingTransformNode, pengHeadBeakTransformNode];
}

function createUFO(root, resources) {
    // UFO
    let ufo1 = new MaterialSGNode([new RenderSGNode(resources.ufoFixedParts)]);
    let ufo1TNode = new TransformationSGNode(glm.translate(30, 5, 3), [ufo1]);
    root.append(ufo1TNode);

    let ufoUDisk = new MaterialSGNode([new RenderSGNode(resources.ufoUpperDisk)]);
    let ufoUDiskTNode = new TransformationSGNode(glm.translate(0, 0, 0), [ufoUDisk]);
    ufo1TNode.append(ufoUDiskTNode);

    let ufoLDisk = new MaterialSGNode([new RenderSGNode(resources.ufoLowerDisk)]);
    let ufoLDiskTNode = new TransformationSGNode(glm.translate(0, 0, 0), [ufoLDisk]);
    ufo1TNode.append(ufoLDiskTNode);

    return [ufo1TNode, ufoUDiskTNode, ufoLDiskTNode];
}

function createPillar(root, resources) {
    // Pillar
    let pillWCirc = new MaterialSGNode([new RenderSGNode(resources.pillarWRing)]);
    let pillWCircTNode = new TransformationSGNode(glm.translate(2.5, 0, -4), [pillWCirc]);

    root.append(pillWCircTNode);
    let pillButton = new MaterialSGNode([new RenderSGNode(resources.pillarButton)]);
    let pillButtonTNode = new TransformationSGNode(glm.translate(0, 0, 0), [pillButton]);
    pillWCircTNode.append(pillButtonTNode);
    return pillButtonTNode;
}


function createTree(root, trunk, top, position) {
    let treeTop = new MaterialSGNode([new RenderSGNode(top)])
    let treeTopTNode = new TransformationSGNode(glm.translate(0, 0, 0), [treeTop]);
    let treeTrunk = new MaterialSGNode([new RenderSGNode(trunk)])
    let treeTrunkTNode = new TransformationSGNode(glm.translate(0, 0, 0), [treeTrunk]);
    let tree = new TransformationSGNode(glm.translate(position[0], position[1], position[2]), [treeTopTNode, treeTrunkTNode])
    tree.append(treeTopTNode);
    tree.append(treeTrunkTNode);
    root.append(tree);
}


function createForest(root, resources) {
    createTree(root, resources.tree1Trunk, resources.tree1Top, [1, 0, 1]);
    createTree(root, resources.tree2Trunk, resources.tree2Top, [3, 0, 2]);
    createTree(root, resources.tree2Trunk, resources.tree2Top, [5, 0, -3]);
    createTree(root, resources.tree4Trunk, resources.tree4Top, [7.5, 0, -2]);
    createTree(root, resources.tree3Trunk, resources.tree3Top, [5, 0, 1]);
    createTree(root, resources.tree0Trunk, resources.tree0Top, [2, 0, -1]);
    createTree(root, resources.tree1Trunk, resources.tree2Top, [5.8, 0, -7]);
    createTree(root, resources.tree0Trunk, resources.tree0Top, [3.6, 0, -9]);
    createTree(root, resources.tree4Trunk, resources.tree4Top, [8, 0, -10]);
    createTree(root, resources.tree1Trunk, resources.tree1Top, [7.8, 0, -6]);
    createTree(root, resources.tree3Trunk, resources.tree3Top, [10, 0, -7]);
    createTree(root, resources.tree1Trunk, resources.tree1Top, [9.8, 0, -3]);
    createTree(root, resources.tree0Trunk, resources.tree0Top, [12, 0, -4.4]);
    createTree(root, resources.tree2Trunk, resources.tree2Top, [5.5, 0, -12]);
    createTree(root, resources.tree3Trunk, resources.tree3Top, [11, 0, 1]);
    createTree(root, resources.tree1Trunk, resources.tree1Top, [8.5, 0, 3.5]);
    createTree(root, resources.tree4Trunk, resources.tree4Top, [-10, 0, -9]);
    createTree(root, resources.tree0Trunk, resources.tree0Top, [-8, 0, -7]);
    createTree(root, resources.tree2Trunk, resources.tree2Top, [0, 0, -13]);
    createTree(root, resources.tree1Trunk, resources.tree1Top, [-4.5, 0, -11]);
    createTree(root, resources.tree3Trunk, resources.tree3Top, [-5.5, 0, 5]);
    createTree(root, resources.tree3Trunk, resources.tree3Top, [-13, 0, 2]);
}

function createPenguin(root, resources, position, rotation) {
    let penguin = new MaterialSGNode([new RenderSGNode(resources.penguinFull)]);
    let penguinTNode = new TransformationSGNode(rotation, [penguin]);
    // let transM = mat4.multiply(mat4.create(), mat4.create(), rotation);
    let mainTNode = new TransformationSGNode(glm.translate(position[0], position[1], position[2]));
    // penguinTNode.setMatrix(transM);
    mainTNode.append(penguinTNode);
    root.append(mainTNode);
    return [mainTNode, penguinTNode];
}


function createPenguinWaddle(penguin, bPosition, fPosition, angle) {
    var penguinMainTurnAnimation = new Animation(penguin[1],
        [{matrix: mat4.rotateY(mat4.create(),mat4.create(), glm.deg2rad(angle+20)), duration:500},
            {matrix: mat4.rotateY(mat4.create(),mat4.create(), glm.deg2rad(angle-20)), duration:500}], true);

    // */
    penguinMainTurnAnimation.start();

    var penguinMainWalk = new Animation(penguin[0], [{matrix: mat4.translate(mat4.create(), mat4.create(), bPosition), duration:1},
        {matrix: mat4.translate(mat4.create(), mat4.create(), fPosition), duration:7000}], false);
    penguinMainWalk.start();

    return [penguinMainWalk, penguinMainTurnAnimation];
}
