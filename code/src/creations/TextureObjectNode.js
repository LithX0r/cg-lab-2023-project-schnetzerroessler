/**
 * Extends AdvancedTextureSGNode in order to set the uniform u_enableObjectTexture only if an object actually uses a texture.
 */
class TexturedObjectNode extends AdvancedTextureSGNode {
    constructor(image, children) {
        children.push(new SetUniformSGNode("u_enableObjectTexture", true));
        super(image, children);
    }

    render(context) {
        gl.uniform1i(gl.getUniformLocation(context.shader, 'u_enableObjectTexture'), 1);
        super.render(context);
        gl.uniform1i(gl.getUniformLocation(context.shader, 'u_enableObjectTexture'), 0);
    }
}