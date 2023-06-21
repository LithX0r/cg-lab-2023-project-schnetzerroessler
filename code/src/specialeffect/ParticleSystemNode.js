/**
 * Represents a particle system and contains all methods used for creating it.
 */
class ParticleSystemNode extends SGNode {

    /**
     * Constructor for class ParticleSystemNode.
     * @param model         The model that should be spawned as a particle.
     * @param texture       The texture of the spawned model.
     * @param maxParticles  The maximum number of active particles the particle system can have simultaneously.
     * @param position      Current position of the particle system relative to its root.
     */
    constructor(model, texture, maxParticles, position) {
        super();
        this.position = position;
        this.model = model;
        this.texture = texture;
        this.birth = [];
        this.age = [];
        this.direction = [];
        this.maxParticles = maxParticles;
        this.startupTime = Date.now();
    }

    /**
     * Initializes the particle system by setting a buffer.
     */
    init() {
        this.setBuffer();
    }

    /**
     * Spawns particles until the maximum number of particles has been reached.
     * Sets the values birth(spawn time), age(max age) and direction for every particle spawned.
     */
    spawn() {
        for(let i = this.children.length; i < this.maxParticles; i++) {
            this.children.push(new TransformationSGNode(glm.translate(this.position[0]+Math.random()*i/this.maxParticles, this.position[1]+Math.random(), this.position[2]+Math.random()*i/this.maxParticles) ,[new MaterialSGNode(new TexturedObjectNode(this.texture, [new RenderSGNode(this.model)]))]));
            this.birth.push(Date.now());
            this.age.push(1500*Math.random());
            this.direction.push(this.setDirection());
        }
    }

    /**
     * Check if a particle has exceeded its maximum age by subtracting the spawn time from Date.now().
     * @param age   The maximum age of a particle.
     * @param birth The spawn time of a particle.
     * @return True if the current age is higher than its maximum age, false otherwise.
     */
    isDead(age, birth) {
        return Date.now()-birth > age;
    }

    /**
     * Sets buffers for the attributes direction and time for the vertex and fragment shader.
     * Vertex shader: particles.vs.glsl
     * Fragment shader: particles.fs.glsl
     */
    setBuffer() {
        this.directionBuff = gl.createBuffer();
        this.timeBuff = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, this.directionBuff);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.timeBuff);

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.setDirection()), gl.STATIC_DRAW);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([Date.now()]), gl.STATIC_DRAW);
    }

    /**
     * Iterates over the nodes in the particle system backwards to make removing more convenient.
     * Checks for each node if it should be alive or dead with the method {@link isDead}.
     * If it is dead, it gets removed from the children list and its values are deleted from this.birth and this.age.
     */
    update() {
        for(let i = this.maxParticles-1; i >= 0; i--) {
            let cur = this.children[i];
            if(this.isDead(this.age[i], this.birth[i])) {
                this.children.splice(i, 1);
                this.birth.splice(i, 1);
                this.age.splice(i, 1);
            }
        }
        this.spawn();
    }

    /**
     * Calls render of SGNode, which is the superclass of class ParticleSystemNode.
     * Loads values into attribute buffers.
     * Sets values for every uniform in particles.vs.glsl and particles.fs.glsl.
     * @context The context.
     */
    render(context) {
        super.render(context);
        const directionLocation = gl.getAttribLocation(context.shader, 'a_direction');
        const timeLocation = gl.getAttribLocation(context.shader, 'a_time');
        gl.enableVertexAttribArray(directionLocation)
        gl.bindBuffer(gl.ARRAY_BUFFER, this.directionBuff);
        gl.vertexAttribPointer(directionLocation, 3, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.timeBuff);
        gl.vertexAttribPointer(timeLocation, 1, gl.FLOAT, false, 0, 0);

        let modelView = mat4.multiply(mat4.create(), context.viewMatrix, context.sceneMatrix);
        gl.uniformMatrix4fv(gl.getUniformLocation(context.shader, 'u_modelView'), false, mat4.multiply(mat4.create(), context.viewMatrix, context.sceneMatrix));
        gl.uniformMatrix3fv(gl.getUniformLocation(context.shader, 'u_normalMatrix'), false, mat3.fromMat4(mat3.create(), modelView));
        gl.uniformMatrix4fv(gl.getUniformLocation(context.shader, 'u_projection'), false, context.projectionMatrix);
        gl.uniform1f(gl.getUniformLocation(context.shader, 'u_age'), Date.now() - this.startupTime);
        gl.uniform1f(gl.getUniformLocation(context.shader, 'u_birth'), this.birth);
    }

    /**
     * Sets the direction of a particle to modify it in the shader.
     * Uses (Math.round() ? 1 : -1) to generate both positive and negative direction values.
     * @return An array containing the offsets of the x, y and z coordinates of a particle.
     */
    setDirection() {
        let xOffset = (Math.round(Math.random()) ? 1 : -1)*Math.random()*.02
        let yOffset = -Math.random()*.02;
        let zOffset = (Math.round(Math.random()) ? 1 : -1)*Math.random()*.02

        return [xOffset, yOffset, zOffset];
    }
}