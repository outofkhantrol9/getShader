function getShader(gl, scriptEl) {
  
  'use strict';

  if (!(gl instanceof WebGLRenderingContext)) {
    throw new TypeError('getShader: ' + gl + ' (parameter 1) is not a WebGL context.');
  }

  if (!(scriptEl instanceof HTMLScriptElement)) {
    throw new TypeError('getShader: ' + scriptEl + ' (parameter 2) is not a script element.');
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
