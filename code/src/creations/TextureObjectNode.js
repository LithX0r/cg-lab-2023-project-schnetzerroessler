// Please don't doc unless you figure out why we need this by yourself. Will explain later when im awake
class TexturedObjectNode extends AdvancedTextureSGNode {
    constructor(image, children) {
        children.push(new SetUniformSGNode("u_enableObjectTexture", true));
        // let u_enableObjTex = new SetUniformSGNode("u_enableObjectTexture", true);
        super(image, children);
    }

    render(context) {
        gl.uniform1i(gl.getUniformLocation(context.shader, 'u_enableObjectTexture'), 1);
        super.render(context);
        gl.uniform1i(gl.getUniformLocation(context.shader, 'u_enableObjectTexture'), 0);
    }

}