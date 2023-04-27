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

    ufoFixedParts: './src/models/ufo/ufoFixedParts.obj',
    ufoUpperDisk: './src/models/ufo/ufoUpperDisk.obj',
    ufoLowerDisk: './src/models/ufo/ufoLowerDisk.obj',

    pillarWRing: './src/models/pillar/pillarWCircle.obj',
    pillarButton: './src/models/pillar/pillarButton.obj'



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
    cameraStartPos = vec3.fromValues(0, 3, -15);
    camera = new UserControlledCamera(gl.canvas, cameraStartPos);
    //setup an animation for the camera, moving it into position
    // /*

    cameraAnimation = new Animation(camera,
        [{matrix: mat4.translate(mat4.create(), mat4.create(), vec3.fromValues(0, 3, -15)), duration: 1000}],
        false);
    cameraAnimation.start()
    
     // */
    //TODO create your own scenegraph
    root = createSceneGraph(gl, resources);
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
    light.position = [0, 500, -2];
    light.append(createLightSphere(resources));
    // add light to scenegraph
    root.append(light);

 // */
    /*
    let light2= new LightSGNode();
    light2.ambient = [1, 1, 1, 1];
    light2.position = [3, 20, 3];
    root.append(light2)

    let light3= new LightSGNode();
    light3.ambient = [1, 1, 1, 1];
    light3.position = [-3, 20, 3];
    root.append(light3)
     */

    /*
    // create C3PO
    let c3po = new MaterialSGNode([
        new RenderSGNode(resources.model)
    ]);
    //gold
    c3po.ambient = [0.24725, 0.1995, 0.0745, 1];
    c3po.diffuse = [0.75164, 0.60648, 0.22648, 1];
    c3po.specular = [0.628281, 0.555802, 0.366065, 1];
    c3po.shininess = 50;

    let test = mat4.multiply(mat4.create(), glm.translate(0, -1.5, 0), glm.scale(.5, .5, .5))

    let transformNode = new TransformationSGNode(test, [
        c3po
    ]);
    // transformNode = gl.rotateY(gl.toRadian(45));

    // add C3PO to scenegraph
    root.append(transformNode);
     */

    /*
    light2 = new LightSGNode();
    light2.ambient = [1,1,1,1];
    light2.position = [5, 0, 5];
    root.append(light2);

     */

    // /*
    // Moving Penguin
    let penguinBody = new MaterialSGNode([new RenderSGNode(resources.penguinBody)]);

    let pengBodyTransformNode = new TransformationSGNode(glm.translate(10,0., 0), [penguinBody]);
    root.append(pengBodyTransformNode);

    let pengLeftWing = new MaterialSGNode([new RenderSGNode(resources.penguinLeftWing)]);
    let pengLWingTransformNode = new TransformationSGNode(glm.translate(0, 0, 0), [pengLeftWing]);
    pengBodyTransformNode.append(pengLWingTransformNode);

    let pengRightWing = new MaterialSGNode(([new RenderSGNode((resources.penguinRightWing))]));
    let pengRWingTransformNode = new TransformationSGNode(glm.transform(0, 0, 0), [pengRightWing]);
    pengBodyTransformNode.append(pengRWingTransformNode);

    let pengHeadBeak = new MaterialSGNode([new RenderSGNode(resources.penguinHeadBeak)]);
    let pengHeadBeakTransformNode = new TransformationSGNode(glm.translate(0, 0, 0), [pengHeadBeak]);
    pengBodyTransformNode.append(pengHeadBeakTransformNode);

     // */



    // UFO

    let ufo1 = new MaterialSGNode([new RenderSGNode(resources.ufoFixedParts)]);
    let ufo1TNode = new TransformationSGNode(glm.translate(0,0,0),[ufo1]);
    root.append(ufo1TNode);

    let ufoUDisk = new MaterialSGNode([new RenderSGNode(resources.ufoUpperDisk)]);
    let ufoUDiskTNode = new TransformationSGNode(glm.translate(0,0,0), [ufoUDisk]);
    ufo1TNode.append(ufoUDiskTNode);

    let ufoLDisk = new MaterialSGNode([new RenderSGNode(resources.ufoLowerDisk)]);
    let ufoLDiskTNode = new TransformationSGNode(glm.translate(0,0,0), [ufoLDisk]);
    ufo1TNode.append(ufoLDiskTNode);

    let anim = new Animation(ufoLDiskTNode, [{matrix: glm.rotateY(glm.deg2rad(0)), duration: 0}, {matrix: glm.rotateY(glm.deg2rad(180)), duration: 1000}], true);
    anim.start();


    // Pillar
    let pillWCirc = new MaterialSGNode([new RenderSGNode(resources.pillarWRing)]);
    let pillWCircTNode = new TransformationSGNode(glm.translate(5, 0, 5), [pillWCirc]);
    root.append(pillWCircTNode);


    // create floor
    let floor = new MaterialSGNode([
        new RenderSGNode(makeRect(5, 5))
    ]);
    //dark
    floor.ambient = [0.2, 0.2, 0.2, 1];
    floor.diffuse = [0.1, 0.1, 0.1, 1];
    floor.specular = [0.5, 0.5, 0.5, 1];
    floor.shininess = 3;
    // add floor to scenegraph
    root.append(new TransformationSGNode(glm.transform({translate: [0, 0, 0], rotateX: -90, scale: 3}), [
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

    //Apply camera
    camera.render(context);

    //Render scene
    root.render(context);

    //request another call as soon as possible
    requestAnimationFrame(render);
}

