/**
 * Represents a 3D transformation with translation and rotation.
 */
class Transform {
  /**
   * Creates a new Transform.
   * @param {number} x - The x-coordinate for translation.
   * @param {number} y - The y-coordinate for translation.
   * @param {number} z - The z-coordinate for translation.
   * @param {number} rxDeg - Rotation about the x-axis in degrees.
   * @param {number} ryDeg - Rotation about the y-axis in degrees.
   * @param {number} rzDeg - Rotation about the z-axis in degrees.
   */

  constructor(x, y, z, rxDeg, ryDeg, rzDeg) {
    this.x = x
    this.y = y
    this.z = z
    this.rxDeg = rxDeg
    this.ryDeg = ryDeg
    this.rzDeg = rzDeg
  }
  /**
   * Converts a Matrix4x4 instance to a Transform.
   * @param {Matrix4x4} matrix - The matrix to convert.
   * @returns {Transform} The resulting Transform.
   * @throws Will throw an error if the matrix is not an instance of Matrix4x4.
   */
  static fromMatrix4x4(matrix) {
    if (matrix instanceof Matrix4x4) {
      return matrix.toTransform()
    } else {
      throw new Error('Invalid matrix type. Expected Matrix4x4.')
    }
  }

  /**
   * Mutiplies two transforms.
   * @param {Transform} a
   * @param {Transform} b
   * @returns {Transform} The result of the multiplication.
   */
  static compose(a, b) {
    return Matrix4x4.multiply(a.toMatrix4x4(), b.toMatrix4x4())
  }

  /**
   * Returns the inverse of a transform.
   * @param {Transform} a
   * @returns {Transform} The inverse of a.
   */
  static inverse(a) {
    let invMatrix = Matrix4x4.inverse(a.toMatrix4x4())
    return invMatrix.toTransform()
  }

  /**
   * Converts this Transform instance to a Matrix4x4.
   * @returns {Matrix4x4} The Matrix4x4 representation of this transform.
   */
  toMatrix4x4() {
    return Matrix4x4.fromTransform(this.x, this.y, this.z, this.rxDeg, this.ryDeg, this.rzDeg)
  }

  /**
   * Creates a Transform with only a z component
   * @param {Number} zDisplacement - The displacement
   * @returns {Transform} The resulting Transform.
   */
  static zDisplacement(zDisplacement) {
    return new Transform(0, 0, zDisplacement, 0, 0, 0)
  }
}

class Matrix4x4 {
  /**
   * Creates a new Matrix4x4.
   * @param {...number} values - The 16 values for the 4x4 matrix.
   */
  constructor(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    this.m00 = m00
    this.m01 = m01
    this.m02 = m02
    this.m03 = m03
    this.m10 = m10
    this.m11 = m11
    this.m12 = m12
    this.m13 = m13
    this.m20 = m20
    this.m21 = m21
    this.m22 = m22
    this.m23 = m23
    this.m30 = m30
    this.m31 = m31
    this.m32 = m32
    this.m33 = m33
  }

  /**
   * Converts this Matrix4x4 to a Transform instance.
   * @returns {Transform} The corresponding Transform.
   */
  toTransform() {
    const x = this.m03
    const y = this.m13
    const z = this.m23

    const rx = (Math.atan2(this.m21, this.m22) * 180) / Math.PI
    const ry = (Math.asin(-this.m20) * 180) / Math.PI
    const rz = (Math.atan2(this.m10, this.m00) * 180) / Math.PI

    return new Transform(x, y, z, rx, ry, rz)
  }

  /**
   * Creates a Matrix4x4 from four rows.
   * @param {Array<number>} row1 - The first row of the matrix.
   * @param {Array<number>} row2 - The second row of the matrix.
   * @param {Array<number>} row3 - The third row of the matrix.
   * @param {Array<number>} row4 - The fourth row of the matrix.
   * @returns {Matrix4x4} The created Matrix4x4.
   */
  static fromRows(row1, row2, row3, row4) {
    return new Matrix4x4(
      row1[0],
      row1[1],
      row1[2],
      row1[3],
      row2[0],
      row2[1],
      row2[2],
      row2[3],
      row3[0],
      row3[1],
      row3[2],
      row3[3],
      row4[0],
      row4[1],
      row4[2],
      row4[3]
    )
  }

  /**
   * Creates a Matrix4x4 from four columns.
   * @param {Array<number>} column1 - The first column of the matrix.
   * @param {Array<number>} column2 - The second column of the matrix.
   * @param {Array<number>} column3 - The third column of the matrix.
   * @param {Array<number>} column4 - The fourth column of the matrix.
   * @returns {Matrix4x4} The created Matrix4x4.
   */
  static fromColumns(column1, column2, column3, column4) {
    return new Matrix4x4(
      column1[0],
      column1[1],
      column1[2],
      column1[3],
      column2[0],
      column2[1],
      column2[2],
      column2[3],
      column3[0],
      column3[1],
      column3[2],
      column3[3],
      column4[0],
      column4[1],
      column4[2],
      column4[3]
    )
  }

  /**
   * Creates an identity matrix.
   * @returns {Matrix4x4} The identity matrix.
   */
  static identity() {
    return new Matrix4x4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
  }

  /**
   * Creates a translation matrix.
   * @param {number} x - The x translation.
   * @param {number} y - The y translation.
   * @param {number} z - The z translation.
   * @returns {Matrix4x4} The translation matrix.
   */
  static translationMatrix(x, y, z) {
    return new Matrix4x4(1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1)
  }

  /**
   * Creates a rotation matrix from ZYX Euler angles.
   * @param {number} rx - Rotation around x-axis in radians.
   * @param {number} ry - Rotation around y-axis in radians.
   * @param {number} rz - Rotation around z-axis in radians.
   * @returns {Matrix4x4} The rotation matrix.
   */
  static rotationMatrixFromEulerZYX(rx, ry, rz) {
    const cosRx = Math.cos(rx),
      sinRx = Math.sin(rx)
    const cosRy = Math.cos(ry),
      sinRy = Math.sin(ry)
    const cosRz = Math.cos(rz),
      sinRz = Math.sin(rz)

    const row1 = [
      cosRy * cosRz,
      cosRz * sinRx * sinRy - cosRx * sinRz,
      sinRx * sinRz + cosRx * cosRz * sinRy,
      0
    ]
    const row2 = [
      cosRy * sinRz,
      cosRx * cosRz + sinRx * sinRy * sinRz,
      cosRx * sinRy * sinRz - cosRz * sinRx,
      0
    ]
    const row3 = [-sinRy, cosRy * sinRx, cosRx * cosRy, 0]
    const row4 = [0, 0, 0, 1]

    return Matrix4x4.fromRows(row1, row2, row3, row4)
  }

  /**
   * Creates a Matrix4x4 from Transform data.
   * @param {number} x - The x translation.
   * @param {number} y - The y translation.
   * @param {number} z - The z translation.
   * @param {number} rxDeg - Rotation around x-axis in degrees.
   * @param {number} ryDeg - Rotation around y-axis in degrees.
   * @param {number} rzDeg - Rotation around z-axis in degrees.
   * @returns {Matrix4x4} The resulting Matrix4x4.
   */
  static fromTransform(x, y, z, rxDeg, ryDeg, rzDeg) {
    const translationMatrix = Matrix4x4.translationMatrix(x, y, z)
    const rxRad = (rxDeg * Math.PI) / 180
    const ryRad = (ryDeg * Math.PI) / 180
    const rzRad = (rzDeg * Math.PI) / 180

    const rotationMatrix = Matrix4x4.rotationMatrixFromEulerZYX(rxRad, ryRad, rzRad)
    return Matrix4x4.multiply(translationMatrix, rotationMatrix)
  }

  /**
   * Multiplies two matrices.
   * @param {Matrix4x4} a - The first matrix.
   * @param {Matrix4x4} b - The second matrix.
   * @returns {Matrix4x4} The result of the multiplication.
   */
  static multiply(a, b) {
    return new Matrix4x4(
      a.m00 * b.m00 + a.m01 * b.m10 + a.m02 * b.m20 + a.m03 * b.m30,
      a.m00 * b.m01 + a.m01 * b.m11 + a.m02 * b.m21 + a.m03 * b.m31,
      a.m00 * b.m02 + a.m01 * b.m12 + a.m02 * b.m22 + a.m03 * b.m32,
      a.m00 * b.m03 + a.m01 * b.m13 + a.m02 * b.m23 + a.m03 * b.m33,

      a.m10 * b.m00 + a.m11 * b.m10 + a.m12 * b.m20 + a.m13 * b.m30,
      a.m10 * b.m01 + a.m11 * b.m11 + a.m12 * b.m21 + a.m13 * b.m31,
      a.m10 * b.m02 + a.m11 * b.m12 + a.m12 * b.m22 + a.m13 * b.m32,
      a.m10 * b.m03 + a.m11 * b.m13 + a.m12 * b.m23 + a.m13 * b.m33,

      a.m20 * b.m00 + a.m21 * b.m10 + a.m22 * b.m20 + a.m23 * b.m30,
      a.m20 * b.m01 + a.m21 * b.m11 + a.m22 * b.m21 + a.m23 * b.m31,
      a.m20 * b.m02 + a.m21 * b.m12 + a.m22 * b.m22 + a.m23 * b.m32,
      a.m20 * b.m03 + a.m21 * b.m13 + a.m22 * b.m23 + a.m23 * b.m33,

      a.m30 * b.m00 + a.m31 * b.m10 + a.m32 * b.m20 + a.m33 * b.m30,
      a.m30 * b.m01 + a.m31 * b.m11 + a.m32 * b.m21 + a.m33 * b.m31,
      a.m30 * b.m02 + a.m31 * b.m12 + a.m32 * b.m22 + a.m33 * b.m32,
      a.m30 * b.m03 + a.m31 * b.m13 + a.m32 * b.m23 + a.m33 * b.m33
    )
  }

  /**
   * Applies a transformation by multiplying with the inverse of another matrix.
   * @param {Matrix4x4} position - The matrix to be transformed.
   * @param {Matrix4x4} transform - The transform matrix.
   * @returns {Matrix4x4} The resulting matrix after transformation.
   */
  static applyTransform(position, transform) {
    const transformInverse = Matrix4x4.inverse(transform)
    return Matrix4x4.multiply(position, transformInverse)
  }

  /**
   * Calculates the inverse of a transformation matrix assuming rotation + translation.
   * @param {Matrix4x4} matrix - The matrix to invert.
   * @returns {Matrix4x4} The inverse matrix.
   */
  static inverse(matrix) {
    // Transpose the rotation part (top-left 3x3 matrix)
    const m00 = matrix.m00
    const m01 = matrix.m10
    const m02 = matrix.m20

    const m10 = matrix.m01
    const m11 = matrix.m11
    const m12 = matrix.m21

    const m20 = matrix.m02
    const m21 = matrix.m12
    const m22 = matrix.m22

    // Inverse translation by applying the transposed rotation to the negative translation vector
    const m03 = -(m00 * matrix.m03 + m01 * matrix.m13 + m02 * matrix.m23)
    const m13 = -(m10 * matrix.m03 + m11 * matrix.m13 + m12 * matrix.m23)
    const m23 = -(m20 * matrix.m03 + m21 * matrix.m13 + m22 * matrix.m23)

    // The bottom row remains [0, 0, 0, 1]
    return new Matrix4x4(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, 0, 0, 0, 1)
  }
}

module.exports = {
  Transform,
  Matrix4x4
}
