/**
 * Rotates the camera or object first based on the given angles and then translates it to the wanted location.
 * Is also used to add the penguins arm/button-pressing rotation.
 * @param position  The coordinates where the viewer is positioned.
 * @param xAngle    The view's angle on the x-axis.
 * @param yAngle    The view's angle on the y-axis.
 * @param zAngle    The view's angle on the z-axis.
 * @return The defined matrix.
 */
function addKeyFrame(position, xAngle, yAngle, zAngle) {
    let out = mat4.translate(mat4.create(), mat4.create(), position);
    out = mat4.rotateY(mat4.create(), out, glm.deg2rad(yAngle));
    out = mat4.rotateX(mat4.create(), out, glm.deg2rad(xAngle));
    out = mat4.rotateZ(mat4.create(), out, glm.deg2rad(zAngle))
    return out;
}

/**
 * Adds the complete camera animation for the video by defining suitable keyframes with {@link #addKeyFrame}.
 * @param camera    The camera object created in {@link #init}.
 * @return The camera animation.
 */
function addCameraAnimation(camera) {
    return new Animation(camera, [
            {matrix: addKeyFrame([-0.4, 1, -3.6], 0, -45, 0), duration: 1},
            {matrix: addKeyFrame([3, 1, -8], 0, -30, 0), duration: 5000},
            {matrix: addKeyFrame([-1, 2, -12], 0, 15, 0), duration: 850},
            {matrix: addKeyFrame([-1, 2, -12], 0, 20, 0), duration: 2000},
            {matrix: addKeyFrame([-1, 4, -12], 0, 20, 0), duration: 150},
            {matrix: addKeyFrame([-1, 4, -12], -25, 20, 0), duration: 850},
            {matrix: addKeyFrame([-15, 10, -17], 10, 60, 0), duration: 4000},
            {matrix: addKeyFrame([-15, 10, -17], 13, 57, 0), duration: 5500},
            {matrix: addKeyFrame([-20 + 3, 10, -17 - (2 * 0.4)], 13, 57 - 0.8, 0), duration: 4000},
            {matrix: addKeyFrame([-20, 10, -20], 13, 50, 0), duration: 2000},
            {matrix: addKeyFrame([-18, 10, -20 + 0.8], 13, 48, 0), duration: 2000},
            {matrix: addKeyFrame([-18, 10, -20 + 0.8], 13, 53, 0), duration: 1500},
            {matrix: addKeyFrame([10, 7, -5], 40, -75, 0), duration: 500},
            {matrix: addKeyFrame([10, 7, -5], 40, -75, 0), duration: 1500},
        ],
        false);
}