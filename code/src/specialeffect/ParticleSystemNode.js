class ParticleSystemNode extends SGNode {
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
    init() {
        this.setBuffer();
    }
    spawn() {
        for(let i = this.children.length; i < this.maxParticles; i++) {
            this.children.push(new TransformationSGNode(glm.translate(this.position[0]+Math.random()*i/this.maxParticles, this.position[1]+Math.random(), this.position[2]+Math.random()*i/this.maxParticles) ,[new MaterialSGNode(new TexturedObjectNode(this.texture, [new RenderSGNode(this.model)]))]));
            this.birth.push(Date.now());
            this.age.push(1500*Math.random());
            this.direction.push(this.setDirection());
        }
    }

    isDead(age, birth) {
        return Date.now()-birth > age;
    }

    setBuffer() {
        this.directionBuff = gl.createBuffer();
        this.timeBuff = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, this.directionBuff);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.timeBuff);

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.setDirection()), gl.STATIC_DRAW);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([Date.now()]), gl.STATIC_DRAW);
    }

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

    setDirection() {
        let xOffset = (Math.round(Math.random()) ? 1 : -1)*Math.random()*.02
        let yOffset = -Math.random()*.02;
        let zOffset = (Math.round(Math.random()) ? 1 : -1)*Math.random()*.02

        return [xOffset, yOffset, zOffset];

    }
}