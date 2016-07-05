function getShader(gl, scriptEl) {

  if (!gl || !(gl instanceof WebGLRenderingContext)) {
    throw new Error('getShader: A WebGL context is required.');
  }

  if (!scriptEl || !(scriptEl instanceof HTMLScriptElement)) {
    throw new Error('getShader: A script element is required.');
  }

  var scriptStr = '';

  var textNodes = Array.prototype.slice.call(scriptEl.childNodes).filter(function getTextNodes(node) {
    return node.nodeType === 3;
  });

  for (var i = 0, length = textNodes.length; i < length; ++i) {
    scriptStr += textNodes[i].textContent;
  }

  var shader;

  if (scriptEl.type === 'x-shader/x-vertex') {
    shader = gl.createShader(gl.VERTEX_SHADER);
  } else if (scriptEl.type === 'x-shader/x-fragment') {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
  } else {
    throw new Error('getShader: Shader type ' + scriptEl.type + ' was not recognized.');
  }

  gl.shaderSource(shader, scriptStr);

  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error('getShader: ' + gl.getShaderInfoLog(shader));
  }

  return shader;

}
