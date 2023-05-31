function createMainPenguin(root, resources) {
    // Moving Penguin
    let pengLeftWing = new MaterialSGNode([new RenderSGNode(resources.penguinLeftWing)]);
    let pengLWingTransformNode = new TransformationSGNode(glm.translate(0, 0, 0), [pengLeftWing]);


    let pengRightWing = new MaterialSGNode(([new RenderSGNode((resources.penguinRightWing))]));
    let pengRWingTransformNode = new TransformationSGNode(glm.transform(0, 0, 0), [pengRightWing]);


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
    let ufo1TNode = new TransformationSGNode(glm.translate(100, 5, -30), [ufo1]);
    root.append(ufo1TNode);

    let ufoUDisk = new MaterialSGNode([new RenderSGNode(resources.ufoUpperDisk)]);
    let ufoUDiskTNode = new TransformationSGNode(glm.translate(0, 0, 0), [ufoUDisk]);
    ufo1TNode.append(ufoUDiskTNode);

    let ufoLDisk = new MaterialSGNode([new RenderSGNode(resources.ufoLowerDisk)]);
    let ufoLDiskTNode = new TransformationSGNode(glm.translate(0, 0, 0), [ufoLDisk]);
    ufo1TNode.append(ufoLDiskTNode);

    let ufoBeam = new MaterialSGNode([new RenderSGNode(resources.ufoBeam)]);
    let ufoBeamTNode = new TransformationSGNode(glm.translate(0, -7, 0), [ufoBeam]);
    ufo1TNode.append(ufoBeamTNode);

    return [ufo1TNode, ufoUDiskTNode, ufoLDiskTNode, ufoBeamTNode];
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
