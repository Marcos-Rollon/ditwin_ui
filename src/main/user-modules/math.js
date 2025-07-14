
// In Z-Y-X order
function rotationMatrixFromEuler(rx, ry, rz) {
    const cos = Math.cos;
    const sin = Math.sin;

    const row1 = [
        cos(ry) * cos(rz),
        cos(rz) * sin(rx) * sin(ry) - cos(rx) * sin(rz),
        sin(rx) * sin(rz) + cos(rx) * cos(rz) * sin(ry),
        0
    ];

    const row2 = [
        cos(ry) * sin(rz),
        cos(rx) * cos(rz) + sin(rx) * sin(ry) * sin(rz),
        cos(rx) * sin(ry) * sin(rz) - cos(rz) * sin(rx),
        0
    ];

    const row3 = [
        -sin(ry),
        cos(ry) * sin(rx),
        cos(rx) * cos(ry),
        0
    ];

    const row4 = [0, 0, 0, 1];

    return [row1, row2, row3, row4];
}

function createTransformMatrix(x, y, z, rx, ry, rz) {
    // Convert degrees to radians
    const degToRad = Math.PI / 180;
    rx *= degToRad;
    ry *= degToRad;
    rz *= degToRad;

    const cx = Math.cos(rx), sx = Math.sin(rx);
    const cy = Math.cos(ry), sy = Math.sin(ry);
    const cz = Math.cos(rz), sz = Math.sin(rz);

    // Create rotation matrix (ZYX order)
    const r00 = cy * cz;
    const r01 = cz * sx * sy - cx * sz;
    const r02 = sx * sz + cx * cz * sy;
    const r10 = cy * sz;
    const r11 = cx * cz + sx * sy * sz;
    const r12 = cx * sy * sz - cz * sx;
    const r20 = -sy;
    const r21 = cy * sx;
    const r22 = cx * cy;

    // Combine rotation and translation
    return [
        [r00, r01, r02, x],
        [r10, r11, r12, y],
        [r20, r21, r22, z],
        [0, 0, 0, 1]
    ];
}

function transformMatrixToComponents(matrix) {
    // Extract position
    const x = matrix[0][3];
    const y = matrix[1][3];
    const z = matrix[2][3];

    // Extract rotation (ZYX order)
    let rx, ry, rz;

    if (Math.abs(matrix[2][0]) < 1 - 1e-6) {
        ry = -Math.asin(matrix[2][0]);
        const cosY = Math.cos(ry);
        rz = Math.atan2(matrix[1][0] / cosY, matrix[0][0] / cosY);
        rx = Math.atan2(matrix[2][1] / cosY, matrix[2][2] / cosY);
    } else {
        // Gimbal lock case
        rz = 0; // Assume no roll in gimbal lock
        if (matrix[2][0] > 0) {
            // Pitch = -pi/2
            ry = -Math.PI / 2;
            rx = -Math.atan2(-matrix[0][1], matrix[0][2]);
        } else {
            // Pitch = pi/2
            ry = Math.PI / 2;
            rx = Math.atan2(-matrix[0][1], -matrix[0][2]);
        }
    }

    // Convert radians to degrees
    const radToDeg = 180 / Math.PI;
    rx *= radToDeg;
    ry *= radToDeg;
    rz *= radToDeg;

    return { x, y, z, rx, ry, rz };
}

function multiplyMatrices4x4(A, B) {
    // Initialize a 4x4 result matrix with all zeros
    let result = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    // Perform matrix multiplication
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            for (let k = 0; k < 4; k++) {
                result[i][j] += A[i][k] * B[k][j];
            }
        }
    }

    return result;
}

module.exports = {
    rotationMatrixFromEuler,
    createTransformMatrix,
    transformMatrixToComponents,
    multiplyMatrices4x4,
};