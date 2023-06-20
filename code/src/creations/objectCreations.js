/**
 * Is used for the creation of the main penguin, which is the penguin that presses the button.
 * Creates transformation nodes for all the main penguins body parts and appends them to each other as children.
 * Also appends them to {@param root} via the mainTNode.
 * @param root      Our own scenegraph created in {@link #init}.
 * @param resources An object containing defined keys with loaded resources.
 * @return An array containing all the penguins transformation nodes.
 */
function createMainPenguin(root, resources) {
    let penguinLeftWing = new MaterialSGNode(new TexturedObjectNode(resources.penguinTex, [new RenderSGNode(resources.penguinLeftWing)]));
    let penguinLeftWingTransformNode = new TransformationSGNode(glm.translate(0, 0, 0), [penguinLeftWing]);

    let penguinRightWing = new MaterialSGNode(new TexturedObjectNode(resources.penguinTex, [new RenderSGNode(resources.penguinRightWing)]));
    let penguinRightWingTransformNode = new TransformationSGNode(glm.translate(-0.145811, 0.947348, -0.00042),[penguinRightWing]);

    let penguinHeadBeak = new MaterialSGNode(new TexturedObjectNode(resources.penguinTex, [new RenderSGNode(resources.penguinHeadBeak)]));
    let penguinHeadBeakTransformNode = new TransformationSGNode(glm.translate(0, 0 , 0), [penguinHeadBeak]);

    let penguinBody = new MaterialSGNode(new TexturedObjectNode(resources.penguinTex, [new RenderSGNode(resources.penguinBody)]));
    let penguinBodyTransformNode = new TransformationSGNode(mat4.create(), [penguinBody, penguinHeadBeakTransformNode, penguinLeftWingTransformNode, penguinRightWingTransformNode]);

    penguinBodyTransformNode.setMatrix(glm.rotateY(125));

    let mainTNode = new TransformationSGNode(glm.translate(-3.8, 0, -1.5) );
    root.append(mainTNode);
    mainTNode.append(penguinBodyTransformNode);

    return [mainTNode, penguinBodyTransformNode, penguinLeftWingTransformNode, penguinRightWingTransformNode, penguinHeadBeakTransformNode];
}


/**
 * Is used for the creation of all normal penguins = all penguin besides the main one.
 * Creates a transformation node for the whole penguin and appends it to the mainTNode.
 * Also appends to {@param root} via the mainTNode.
 * @param root      Our own scenegraph created in {@link #init}.
 * @param resources An object containing defined keys with loaded resources.
 * @param position  The position where the tree is placed.
 * @param rotation  The direction in which the penguin should be placed at.
 * @return An array containing the penguins transformation nodes.
 */
function createPenguin(root, resources, position, rotation) {
    let texNode = new TexturedObjectNode(resources.penguinTex, [new RenderSGNode(resources.penguinFull)]);
    let penguin = new MaterialSGNode(texNode);
    let penguinTNode = new TransformationSGNode(rotation, [penguin]);
    let mainTNode = new TransformationSGNode(glm.translate(position[0], position[1], position[2]));
    mainTNode.append(penguinTNode);
    root.append(mainTNode);

    return [mainTNode, penguinTNode];
}


/**
 * Creates transformation nodes for all the UFOs parts and appends them to the ufoCenterTNode.
 * Also appends this node to {@param root}.
 * Defines the UFOs materials and colors.
 * @param root      Our own scenegraph created in {@link #init}.
 * @param resources An object containing defined keys with loaded resources.
 * @return An array containing all the UFOs transformation nodes.
 */
function createUFO(root, resources) {
    let ufoCenter = new MaterialSGNode([new RenderSGNode(resources.ufoFixedParts)]);
    let ufoCenterTNode = new TransformationSGNode(glm.translate(100, 5, -30), [ufoCenter]);
    ufoCenter.diffuse  = rgbToPercent([32,10,98,255]);
    ufoCenter.specular = rgbToPercent([134,0,250,255]);
    ufoCenter.ambient  = rgbToPercent([0,0,0,255]);
    ufoCenter.emission = rgbToPercent([0,0,0,255]);
    ufoCenter.shininess = 2;

    root.append(ufoCenterTNode);

    let ufoTopDisk = new MaterialSGNode([new RenderSGNode(resources.ufoUpperDisk)]);
    let ufoTopDiskTNode = new TransformationSGNode(glm.translate(0, 0, 0), [ufoTopDisk]);
    ufoTopDisk.diffuse  = rgbToPercent([108,108,108,255]);
    ufoTopDisk.specular = rgbToPercent([198,198,198,255]);
    ufoTopDisk.ambient  = rgbToPercent([39,39,39,255]);
    ufoTopDisk.emission = rgbToPercent([0,0,0,255]);
    ufoTopDisk.shininess = 8;

    ufoCenterTNode.append(ufoTopDiskTNode);

    let ufoBottomDisk = new MaterialSGNode([new RenderSGNode(resources.ufoLowerDisk)]);
    let ufoBottomDiskTNode = new TransformationSGNode(glm.translate(0, 0, 0), [ufoBottomDisk]);
    ufoBottomDiskTNode.diffuse  = rgbToPercent([108,108,108,255]);
    ufoBottomDiskTNode.specular = rgbToPercent([198,198,198,255]);
    ufoBottomDiskTNode.ambient  = rgbToPercent([39,39,39,255]);
    ufoBottomDiskTNode.emission = rgbToPercent([0,0,0,255]);
    ufoBottomDiskTNode.shininess = 8;

    ufoCenterTNode.append(ufoBottomDiskTNode);

    let ufoBeam = new MaterialSGNode([new RenderSGNode(resources.ufoBeam)]);
    let ufoBeamTNode = new TransformationSGNode(glm.translate(0, -7, 0), [ufoBeam]);
    ufoBeam.diffuse  = rgbToPercent([36,23,73,123]);
    ufoBeam.specular = rgbToPercent([255,255,255,123]);
    ufoBeam.ambient  = rgbToPercent([3,108,197,123]);
    ufoBeam.emission = rgbToPercent([4,0,26,123]);
    ufoBeam.shininess = 51;

    ufoCenterTNode.append(ufoBeamTNode);

    return [ufoCenterTNode, ufoTopDiskTNode, ufoBottomDiskTNode, ufoBeamTNode];
}


/**
 * Creates transformation nodes for the pillar base structure and the button.
 * Appends the pillarButtonTNode to the pillarBaseTNode.
 * Also appends the pillarBaseTNode to {@param root}.
 * Defines the pillars materials and colors.
 * @param root      Our own scenegraph created in {@link #init}.
 * @param resources An object containing defined keys with loaded resources.
 * @return The buttons transformation node.
 */
function createPillar(root, resources) {
    let pillarBase = new MaterialSGNode([new RenderSGNode(resources.pillarWRing)]);
    let pillarBaseTNode = new TransformationSGNode(glm.translate(2.5, 0, -4), [pillarBase]);
    pillarBase.diffuse  = rgbToPercent([95,91,83,255]);
    pillarBase.specular = rgbToPercent([0,0,0,255]);
    pillarBase.ambient  = rgbToPercent([79,72,53,255]);
    pillarBase.emission = rgbToPercent([0,0,0,255]);
    pillarBase.shininess = 0;

    root.append(pillarBaseTNode);

    let pillarButton = new MaterialSGNode([new RenderSGNode(resources.pillarButton)]);
    let pillarButtonTNode = new TransformationSGNode(glm.translate(0, 0, 0), [pillarButton]);
    pillarButton.diffuse  = rgbToPercent([105,5,5,255]);
    pillarButton.specular = rgbToPercent([248,118,124,255]);
    pillarButton.ambient  = rgbToPercent([150,0,0,255]);
    pillarButton.emission = rgbToPercent([0,0,0,255]);
    pillarButton.shininess = 36;

    pillarBaseTNode.append(pillarButtonTNode);

    return pillarButtonTNode;
}


/**
 * Creates transformation node for the orb and appends it to the mainTNode.
 * Also appends to {@param root} via the mainTNode.
 * Defines the orbs material and color.
 * @param root      Our own scenegraph created in {@link #init}.
 * @param resources An object containing defined keys with loaded resources.
 * @return An array containing the orbs transformation nodes.
 */
function createOrb(root, resources) {
    let orb = new MaterialSGNode([new RenderSGNode(resources.orb)]);
    orb.diffuse = rgbToPercent([0,255,122,255])
    orb.specular = rgbToPercent([250,250,250,255]);
    orb.ambient = rgbToPercent([88,177,4,255]);
    orb.emission = rgbToPercent([36,214,210,255]);
    orb.shininess = 51;

    let orbRotTNode = new TransformationSGNode(mat4.create(), [orb]);
    let mainTNode = new TransformationSGNode(glm.translate(2.5, -2, -4), [orbRotTNode]);
    mainTNode.append(orbRotTNode);
    root.append(mainTNode);

    return [mainTNode, orbRotTNode];
}


/**
 * Creates transformation nodes for the tree top and trunk and appends them to the trees transformation node "tree".
 * Also appends this node to {@param root}.
 * Defines the trees materials and colors.
 * @param root      Our own scenegraph created in {@link #init}.
 * @param trunk     The tree trunk resource.
 * @param top       The tree top resource.
 * @param position  The position where the tree is placed.
 */
function createTree(root, trunk, top, position) {
    let treeTop = new MaterialSGNode([new RenderSGNode(top)])
    let treeTopTNode = new TransformationSGNode(glm.translate(0, 0, 0), [treeTop]);
    treeTop.diffuse = rgbToPercent([58,100,58,255]);
    treeTop.specular = rgbToPercent([4,35,0,255]);
    treeTop.ambient = rgbToPercent([8,72,2,255]);
    treeTop.emission = rgbToPercent([0,0,0,255]);
    treeTop.shininess = 81;

    let treeTrunk = new MaterialSGNode([new RenderSGNode(trunk)])
    let treeTrunkTNode = new TransformationSGNode(glm.translate(0, 0, 0), [treeTrunk]);
    treeTrunk.diffuse = rgbToPercent([73,41,12,255]);
    treeTrunk.specular = rgbToPercent([0,0,0,255]);
    treeTrunk.ambient = rgbToPercent([74,44,19,255]);
    treeTrunk.emission = rgbToPercent([0,0,0,255]);
    treeTrunk.shininess = 0;

    let tree = new TransformationSGNode(glm.translate(position[0], position[1], position[2]), [treeTopTNode, treeTrunkTNode])
    tree.append(treeTopTNode);
    tree.append(treeTrunkTNode);
    root.append(tree);
}


/**
 * Creates and places multiple trees to create a forest.
 * There are four different tree models to choose from.
 * @param root      Our own scenegraph created in {@link #init}.
 * @param resources An object containing defined keys with loaded resources.
 */
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


/**
 * Defines the floors material and color and appends it to {@link root} via a new transformation node.
 * @param root      Our own scenegraph created in {@link #init}.
 * @return The defined floor.
 */
function createFloor(root) {
    let floor = new MaterialSGNode( [new RenderSGNode(makeRect(10, 10))]);
    floor.ambient = [0.2, 0.4, 0.2, 1];
    floor.diffuse = [0.1, 0.1, 0.1, 1];
    floor.specular = [0.5, 0.5, 0.5, 1];
    floor.shininess = 3;
    // add floor to scenegraph
    root.append(new TransformationSGNode(glm.transform({translate: [0, 0, 0], rotateX: -90, scale: 5}), [floor]));

    return floor;
}


/**
 * Takes RGB values and converts them to percent to be able to use these values in WebGL.
 * @param v Array of RGB values [red, green, blue, alpha]
 * @return Returns the color values in percent.
 */
function rgbToPercent(v) {
    for(i = 0; i < 4; i++) {
        v[i] = v[i] / 255;
    }
    return v;
}






