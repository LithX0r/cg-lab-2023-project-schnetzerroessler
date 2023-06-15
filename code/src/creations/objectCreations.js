function createMainPenguin(root, resources) {
    // Moving Penguin
    let pengLeftWing = new MaterialSGNode([new RenderSGNode(resources.penguinLeftWing)]);
    let pengLWingTransformNode = new TransformationSGNode(glm.translate(0, 0, 0), [pengLeftWing]);


    /*
    let pengRightWing = new MaterialSGNode(([new RenderSGNode((resources.penguinRightWing))]));
    let pengRWingTransformNode = new TransformationSGNode(glm.transform(0, 0, 0), [pengRightWing]);
     */



    let pengRightWing = new MaterialSGNode([new RenderSGNode(resources.penguinRightWing_separate)]);

    let pengRWingTransformNode = new TransformationSGNode(glm.translate(-0.145811, 0.947348, -0.00042),[pengRightWing]);
    // pengRWingTransformNode.setMatrix(mat4.multiply(mat4.create(), glm.rotateX(45), pengRWingTransformNode.matrix));
    // pengRWingTransformNode.setMatrix(mat4.multiply(mat4.create(), glm.translate(0, 0.947348 , 0), glm.rotateX(0)));

    let pengHeadBeak = new MaterialSGNode([new RenderSGNode(resources.penguinHeadBeak)]);
    let pengHeadBeakTransformNode = new TransformationSGNode(glm.translate(0, 0 , 0), [pengHeadBeak]);

    let penguinBody = new MaterialSGNode([new RenderSGNode(resources.penguinBody)]);
    let pengBodyTransformNode = new TransformationSGNode(mat4.create(), [penguinBody, pengHeadBeakTransformNode, pengLWingTransformNode, pengRWingTransformNode]);

    // let matBody = mat4.multiply(mat4.create(), mat4.create(), glm.translate(-3.8, 0, -1.5))
    // matBody = mat4.multiply(mat4.create(), matBody, glm.rotateY(125))

    // pengBodyTransformNode.setMatrix(matBody);
    // pengRWingTransformNode.setMatrix(mat4.multiply(mat4.create(), glm.rotateY(125), pengRWingTransformNode.matrix))
    pengBodyTransformNode.setMatrix(glm.rotateY(125));


    let mainTNode = new TransformationSGNode(glm.translate(-3.8, 0, -1.5) );

    root.append(mainTNode);
    mainTNode.append(pengBodyTransformNode);
    // root.append(pengBodyTransformNode);
    // pengBodyTransformNode.append(pengLWingTransformNode);
    // pengBodyTransformNode.append(pengRWingTransformNode);
    // pengBodyTransformNode.append(pengHeadBeakTransformNode);
    return [mainTNode, pengBodyTransformNode, pengLWingTransformNode, pengRWingTransformNode, pengHeadBeakTransformNode];
}

function createUFO(root, resources) {
    // UFO
    let ufo1 = new MaterialSGNode([new RenderSGNode(resources.ufoFixedParts)]);
    let ufo1TNode = new TransformationSGNode(glm.translate(100, 5, -30), [ufo1]);
    ufo1.diffuse  = rgbToPercent([32,10,98,255]);
    ufo1.specular = rgbToPercent([134,0,250,255]);
    ufo1.ambient  = rgbToPercent([0,0,0,255]);
    ufo1.emission = rgbToPercent([0,0,0,255]);
    ufo1.shininess = 2;


    root.append(ufo1TNode);

    let ufoUDisk = new MaterialSGNode([new RenderSGNode(resources.ufoUpperDisk)]);
    let ufoUDiskTNode = new TransformationSGNode(glm.translate(0, 0, 0), [ufoUDisk]);
    ufoUDisk.diffuse  = rgbToPercent([108,108,108,255]);
    ufoUDisk.specular = rgbToPercent([198,198,198,255]);
    ufoUDisk.ambient  = rgbToPercent([39,39,39,255]);
    ufoUDisk.emission = rgbToPercent([0,0,0,255]);
    ufoUDisk.shininess = 8;
    ufo1TNode.append(ufoUDiskTNode);

    let ufoLDisk = new MaterialSGNode([new RenderSGNode(resources.ufoLowerDisk)]);
    let ufoLDiskTNode = new TransformationSGNode(glm.translate(0, 0, 0), [ufoLDisk]);
    ufoLDiskTNode.diffuse  = rgbToPercent([108,108,108,255]);
    ufoLDiskTNode.specular = rgbToPercent([198,198,198,255]);
    ufoLDiskTNode.ambient  = rgbToPercent([39,39,39,255]);
    ufoLDiskTNode.emission = rgbToPercent([0,0,0,255]);
    ufoLDiskTNode.shininess = 8;
    ufo1TNode.append(ufoLDiskTNode);

    let ufoBeam = new MaterialSGNode([new RenderSGNode(resources.ufoBeam)]);
    let ufoBeamTNode = new TransformationSGNode(glm.translate(0, -7, 0), [ufoBeam]);
    ufoBeam.diffuse  = rgbToPercent([36,23,73,123]);
    ufoBeam.specular = rgbToPercent([255,255,255,123]);
    ufoBeam.ambient  = rgbToPercent([3,108,197,123]);
    ufoBeam.emission = rgbToPercent([4,0,26,123]);
    ufoBeam.shininess = 51;
    ufo1TNode.append(ufoBeamTNode);

    return [ufo1TNode, ufoUDiskTNode, ufoLDiskTNode, ufoBeamTNode];
}

function createPillar(root, resources) {
    // Pillar
    let pillWCirc = new MaterialSGNode([new RenderSGNode(resources.pillarWRing)]);
    let pillWCircTNode = new TransformationSGNode(glm.translate(2.5, 0, -4), [pillWCirc]);
    pillWCirc.diffuse  = rgbToPercent([95,91,83,255]);
    pillWCirc.specular = rgbToPercent([0,0,0,255]);
    pillWCirc.ambient  = rgbToPercent([79,72,53,255]);
    pillWCirc.emission = rgbToPercent([0,0,0,255]);
    pillWCirc.shininess = 0;
    root.append(pillWCircTNode);

    let pillButton = new MaterialSGNode([new RenderSGNode(resources.pillarButton)]);
    let pillButtonTNode = new TransformationSGNode(glm.translate(0, 0, 0), [pillButton]);
    pillButton.diffuse  = rgbToPercent([105,5,5,255]);
    pillButton.specular = rgbToPercent([248,118,124,255]);
    pillButton.ambient  = rgbToPercent([150,0,0,255]);
    pillButton.emission = rgbToPercent([0,0,0,255]);
    pillButton.shininess = 36;
    pillWCircTNode.append(pillButtonTNode);
    return pillButtonTNode;
}


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
    let penguin = new MaterialSGNode(new AdvancedTextureSGNode(resources.penguinTex, [new RenderSGNode(resources.penguinFull)]));
    let penguinTNode = new TransformationSGNode(rotation, [penguin]);
    // let pengMat = parseMtlFile(resources.penguinTex);
    // penguin.ambient = pengMat.ambient;
    // penguin.diffuse = pengMat.diffuse;
    // penguin.specular = pengMat.specular;
    // penguin.emission = pengMat.emission;
    // penguin.shininess = pengMat.shininess;
    // let transM = mat4.multiply(mat4.create(), mat4.create(), rotation);
    let mainTNode = new TransformationSGNode(glm.translate(position[0], position[1], position[2]));
    // penguinTNode.setMatrix(transM);
    mainTNode.append(penguinTNode);
    root.append(mainTNode);
    return [mainTNode, penguinTNode];
}

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

function rgbToPercent(v) {
    for(i = 0; i < 4; i++) {
        v[i] = v[i] / 255;
    }
    return v;
}