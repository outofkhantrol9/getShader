function getShader(gl, scriptEl) {

  if (!gl || !(gl instanceof WebGLRenderingContext)) {
    throw new Error('getShader: A WebGL context is required.');
  }

  if (!scriptEl || !(scriptEl instanceof HTMLScriptElement)) {
    throw new Error('getShader: A script element is required.');
  }

  var shader;

  if (scriptEl.type === 'x-shader/x-vertex') {
    shader = gl.createShader(gl.VERTEX_SHADER);
  } else if (scriptEl.type === 'x-shader/x-fragment') {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
  } else {
    throw new Error('getShader: Shader type ' + scriptEl.type + ' was not recognized.');
  }

  gl.shaderSource(shader, scriptEl.textContent);

  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error('getShader: ' + gl.getShaderInfoLog(shader));
  }

  return shader;

}
