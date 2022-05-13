
const matrices = {
    boxBlur: {
      matrix: [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
      ],
      matrixMultiply: 1 / 9,
    },
    gaussianBlur: {
      matrix: [
        [1, 2, 1],
        [2, 4, 2],
        [1, 2, 1],
      ],
      matrixMultiply: 1 / 16,
    },
    sobelOperatorX: {
      matrix: [
        [1, 0, -1],
        [2, 0, -2],
        [1, 0, -1],
      ],
      matrixMultiply: 1,
    },
    sobelOperatorY: {
      matrix: [
        [1, 2, 1],
        [0, 0, 0],
        [-1, -2, -1],
      ],
      matrixMultiply: 1,
    },
    laplacianOperator: {
      matrix: [
        [-1, -1, -1],
        [-1, 8, -1],
        [-1, -1, -1],
      ],
      matrixMultiply: 1,
    },
    sharpen: {
      matrix: [
        [0, -1, 0],
        [-1, 5, -1],
        [0, -1, 0],
      ],
      matrixMultiply: 1,
    },
  };

function applyMatrix(image, matrix) {
    console.log(x1, y1, x2, y2);
  
    const imgData = ctx.getImageData(x1, y1, x2, y2);
    const imgDataCopy = ctx.getImageData(x1, y1, x2, y2);
    for (let x = 1; x < x2 - 1; x++) {
      for (let y = 1; y < y2 - 1; y++) {
        const index = x * 4 + y * x2 * 4;
  
        const sumRed =
          imgData.data[(x - 1) * 4 + (y - 1) * x2 * 4] *
            matrix.matrix[0][0] + // Top left
          imgData.data[(x + 0) * 4 + (y - 1) * x2 * 4] *
            matrix.matrix[0][1] + // Top center
          imgData.data[(x + 1) * 4 + (y - 1) * x2 * 4] *
            matrix.matrix[0][2] + // Top right
          imgData.data[(x - 1) * 4 + (y + 0) * x2 * 4] *
            matrix.matrix[1][0] + // Mid left
          imgData.data[(x + 0) * 4 + (y + 0) * x2 * 4] *
            matrix.matrix[1][1] + // Current pixel
          imgData.data[(x + 1) * 4 + (y + 0) * x2 * 4] *
            matrix.matrix[1][2] + // Mid right
          imgData.data[(x - 1) * 4 + (y + 1) * x2 * 4] *
            matrix.matrix[2][0] + // Low left
          imgData.data[(x + 0) * 4 + (y + 1) * x2 * 4] *
            matrix.matrix[2][1] + // Low center
          imgData.data[(x + 1) * 4 + (y + 1) * x2 * 4] *
            matrix.matrix[2][2]; // Low right
  
        const sumGreen =
          imgData.data[(x - 1) * 4 + (y - 1) * x2 * 4 + 1] *
            matrix.matrix[0][0] + // Top left
          imgData.data[(x + 0) * 4 + (y - 1) * x2 * 4 + 1] *
            matrix.matrix[0][1] + // Top center
          imgData.data[(x + 1) * 4 + (y - 1) * x2 * 4 + 1] *
            matrix.matrix[0][2] + // Top right
          imgData.data[(x - 1) * 4 + (y + 0) * x2 * 4 + 1] *
            matrix.matrix[1][0] + // Mid left
          imgData.data[(x + 0) * 4 + (y + 0) * x2 * 4 + 1] *
            matrix.matrix[1][1] + // Current pixel
          imgData.data[(x + 1) * 4 + (y + 0) * x2 * 4 + 1] *
            matrix.matrix[1][2] + // Mid right
          imgData.data[(x - 1) * 4 + (y + 1) * x2 * 4 + 1] *
            matrix.matrix[2][0] + // Low left
          imgData.data[(x + 0) * 4 + (y + 1) * x2 * 4 + 1] *
            matrix.matrix[2][1] + // Low center
          imgData.data[(x + 1) * 4 + (y + 1) * x2 * 4 + 1] *
            matrix.matrix[2][2]; // Low right
  
        const sumBlue =
          imgData.data[(x - 1) * 4 + (y - 1) * x2 * 4 + 2] *
            matrix.matrix[0][0] + // Top left
          imgData.data[(x + 0) * 4 + (y - 1) * x2 * 4 + 2] *
            matrix.matrix[0][1] + // Top center
          imgData.data[(x + 1) * 4 + (y - 1) * x2 * 4 + 2] *
            matrix.matrix[0][2] + // Top right
          imgData.data[(x - 1) * 4 + (y + 0) * x2 * 4 + 2] *
            matrix.matrix[1][0] + // Mid left
          imgData.data[(x + 0) * 4 + (y + 0) * x2 * 4 + 2] *
            matrix.matrix[1][1] + // Current pixel
          imgData.data[(x + 1) * 4 + (y + 0) * x2 * 4 + 2] *
            matrix.matrix[1][2] + // Mid right
          imgData.data[(x - 1) * 4 + (y + 1) * x2 * 4 + 2] *
            matrix.matrix[2][0] + // Low left
          imgData.data[(x + 0) * 4 + (y + 1) * x2 * 4 + 2] *
            matrix.matrix[2][1] + // Low center
          imgData.data[(x + 1) * 4 + (y + 1) * x2 * 4 + 2] *
            matrix.matrix[2][2]; // Low right
  
        imgDataCopy.data[index] = sumRed * matrix.matrixMultiply;
        imgDataCopy.data[index + 1] = sumGreen * matrix.matrixMultiply;
        imgDataCopy.data[index + 2] = sumBlue * matrix.matrixMultiply;
      }
    }
    ctx.putImageData(imgDataCopy, x1, y1);
  }