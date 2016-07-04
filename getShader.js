function getShader(gl, id) {

  if (!gl) {
    throw new Error('getShader: A WebGL context is required.');
  }

  if (!id) {
    throw new Error('getShader: An id is required.');
  }

  var scriptEl = document.getElementById(id);

  if (!scriptEl) {
    throw new Error('getShader: No script element with id ' + id + ' was found.');
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
