const { Matrix4x4 } = require("./Transform.js");
function testFunctionWithParams(a, b) {
  return a + b;
}

function testFunctionLog(data) {
  console.log(data);
}

function testRequire(){
  return Matrix4x4.fromRows([1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]);
}

module.exports = {
  testFunctionWithParams,
  testFunctionLog,
  testRequire,
};
