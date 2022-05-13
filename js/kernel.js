const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const buttonGrayscale = document.getElementById('button-grayscale');
const buttonBoxBlur = document.getElementById('button-box-blur');
const buttonGaussianBlur = document.getElementById('button-gaussian-blur');
const buttonSharpen = document.getElementById('button-sharpen');
const buttonSobelOperator = document.getElementById('button-sobel-operator');
const buttonLaplacianOperator = document.getElementById(
  'button-laplacian-operator'
);
const buttonMedianFilter = document.getElementById('button-median-filter');
const buttonReset = document.getElementById('button-reset');
const buttonNegative = document.getElementById('button-negative');

const sliderGamma = document.getElementById('slider-gamma');
const gammaValue = document.getElementById('gamma-value');
const buttonGammaApply = document.getElementById('button-gamma-apply');

const redValue = document.getElementById('red-value');
const greenValue = document.getElementById('green-value');
const blueValue = document.getElementById('blue-value');
const sliderColorRed = document.getElementById('slider-color-red');
const sliderColorGreen = document.getElementById('slider-color-green');
const sliderColorBlue = document.getElementById('slider-color-blue');
const buttonColorApply = document.getElementById('button-color-apply');

const thresholdValue = document.getElementById('threshold-value');
const sliderThreshold = document.getElementById('slider-threshold');
const buttonThresholdApply = document.getElementById('button-threshold-apply');

const fileUploader = document.getElementById('file-uploader');
const selectedImage = document.getElementById('file-upload');

const mergeUploader = document.getElementById('merge-uploader');
const imageToMerge = document.getElementById('merge-upload');

const buttonPartApply = document.getElementById('button-part-apply');

const imageX1 = document.getElementById('image-part-x1');
const imageY1 = document.getElementById('image-part-y1');
const imageX2 = document.getElementById('image-part-x2');
const imageY2 = document.getElementById('image-part-y2');

let x1;
let x2;
let x3;
let x4;

let originalImageData;

const img = new Image();
const mergedImg = new Image();

buttonPartApply.onclick = () => {
  x1 = imageX1.value;
  y1 = imageY1.value;
  x2 = imageX2.value;
  y2 = imageY2.value;
};

posodobiHistogram(histogramVrednosti);


/*selectedImage.onchange = () => {
  img.src = URL.createObjectURL(selectedImage.files[0]);
  loadImage(img);
  canvas.classList.remove('hidden');
  fileUploader.classList.add('hidden');
};

mergeUploader.onchange = () => {
  mergedImg.src = URL.createObjectURL(imageToMerge.files[0]);

  mergedImg.onload = () => {
    ctx.globalAlpha = 1.0;
    ctx.drawImage(img, 0, 0);
    ctx.globalAlpha = 0.5;
    ctx.drawImage(mergedImg, 0, 0);
  };
}

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

/*function loadImage(image) {
  image.onload = () => {
    canvas.width = image.width;
    canvas.height = image.height;
    imageX2.placeholder = `X2: ${image.width}px`;
    imageY2.placeholder = `Y2: ${image.height}px`;
    x1 = 0;
    y1 = 0;
    x2 = image.width;
    y2 = image.height;
    ctx.drawImage(image, 0, 0);
    originalImageData = ctx.getImageData(0, 0, image.width, image.height);
  };
}

/*function toGrayscale(image) {
  const imgData = ctx.getImageData(x1, y1, x2, y2);
  for (let i = 0; i < imgData.data.length; i += 4) {
    const red = imgData.data[i];
    const green = imgData.data[i + 1];
    const blue = imgData.data[i + 2];

    const grayscale = red * 0.299 + green * 0.587 + blue * 0.114;

    imgData.data[i] = grayscale;
    imgData.data[i + 1] = grayscale;
    imgData.data[i + 2] = grayscale;
  }

  ctx.putImageData(imgData, x1, y1);
}

/*buttonGrayscale.onclick = () => {
  toGrayscale(img);
};

buttonNegative.onclick = () => {
  toNegative(img);
};

buttonBoxBlur.onclick = () => {
  applyMatrix(img, matrices.boxBlur);
};

buttonGaussianBlur.onclick = () => {
  applyMatrix(img, matrices.gaussianBlur);
};

buttonSobelOperator.onclick = () => {
  toGrayscale(img);
  applyMatrix(img, matrices.sobelOperatorY);
};

buttonLaplacianOperator.onclick = () => {
  toGrayscale(img);
  applyMatrix(img, matrices.laplacianOperator);
};

buttonSharpen.onclick = () => {
  applyMatrix(img, matrices.sharpen);
};

buttonMedianFilter.onclick = () => {
  applyMedian(img);
};

sliderGamma.oninput = () => {
  gammaValue.innerHTML = `𝛾 = ${sliderGamma.value}`;
};

sliderColorRed.oninput = () => {
  redValue.innerHTML = `Red: ${Math.round(sliderColorRed.value * 100)}%`;
};

sliderColorGreen.oninput = () => {
  greenValue.innerHTML = `Green: ${Math.round(sliderColorGreen.value * 100)}%`;
};

sliderColorBlue.oninput = () => {
  blueValue.innerHTML = `Blue: ${Math.round(sliderColorBlue.value * 100)}%`;
};

buttonColorApply.onclick = () => {
  adjustColorBalance(
    img,
    sliderColorRed.value,
    sliderColorGreen.value,
    sliderColorBlue.value
  );
};

buttonGammaApply.onclick = () => {
  correctGamma(img, sliderGamma.value);
};

sliderThreshold.oninput = () => {
  thresholdValue.innerHTML = `Threshold level: ${sliderThreshold.value}`;
};

buttonThresholdApply.onclick = () => {
  toGrayscale(img);
  adjustThreshold(img, sliderThreshold.value);
};

buttonReset.onclick = () => {
  ctx.putImageData(originalImageData, 0, 0);
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

/*function applyMedian(image) {
  const imgData = ctx.getImageData(x1, y1, x2, y2);
  const imgDataCopy = ctx.getImageData(x1, y1, x2, y2);
  for (let x = 1; x < x2 - 1; x++) {
    for (let y = 1; y < y2 - 1; y++) {
      const index = x * 4 + y * x2 * 4;

      const arrRed = [
        imgData.data[(x - 1) * 4 + (y - 1) * x2 * 4], // Top left
        imgData.data[(x + 0) * 4 + (y - 1) * x2 * 4], // Top center
        imgData.data[(x + 1) * 4 + (y - 1) * x2 * 4], // Top right
        imgData.data[(x - 1) * 4 + (y + 0) * x2 * 4], // Mid left
        imgData.data[(x + 0) * 4 + (y + 0) * x2 * 4], // Current pixel
        imgData.data[(x + 1) * 4 + (y + 0) * x2 * 4], // Mid right
        imgData.data[(x - 1) * 4 + (y + 1) * x2 * 4], // Low left
        imgData.data[(x + 0) * 4 + (y + 1) * x2 * 4], // Low center
        imgData.data[(x + 1) * 4 + (y + 1) * x2 * 4], // Low right
      ];

      const arrGreen = [
        imgData.data[(x - 1) * 4 + (y - 1) * x2 * 4 + 1], // Top left
        imgData.data[(x + 0) * 4 + (y - 1) * x2 * 4 + 1], // Top center
        imgData.data[(x + 1) * 4 + (y - 1) * x2 * 4 + 1], // Top right
        imgData.data[(x - 1) * 4 + (y + 0) * x2 * 4 + 1], // Mid left
        imgData.data[(x + 0) * 4 + (y + 0) * x2 * 4 + 1], // Current pixel
        imgData.data[(x + 1) * 4 + (y + 0) * x2 * 4 + 1], // Mid right
        imgData.data[(x - 1) * 4 + (y + 1) * x2 * 4 + 1], // Low left
        imgData.data[(x + 0) * 4 + (y + 1) * x2 * 4 + 1], // Low center
        imgData.data[(x + 1) * 4 + (y + 1) * x2 * 4 + 1], // Low right
      ];

      const arrBlue = [
        imgData.data[(x - 1) * 4 + (y - 1) * x2 * 4 + 2], // Top left
        imgData.data[(x + 0) * 4 + (y - 1) * x2 * 4 + 2], // Top center
        imgData.data[(x + 1) * 4 + (y - 1) * x2 * 4 + 2], // Top right
        imgData.data[(x - 1) * 4 + (y + 0) * x2 * 4 + 2], // Mid left
        imgData.data[(x + 0) * 4 + (y + 0) * x2 * 4 + 2], // Current pixel
        imgData.data[(x + 1) * 4 + (y + 0) * x2 * 4 + 2], // Mid right
        imgData.data[(x - 1) * 4 + (y + 1) * x2 * 4 + 2], // Low left
        imgData.data[(x + 0) * 4 + (y + 1) * x2 * 4 + 2], // Low center
        imgData.data[(x + 1) * 4 + (y + 1) * x2 * 4 + 2], // Low right
      ];

      arrRed.sort((a, b) => {
        return a - b;
      });

      arrGreen.sort((a, b) => {
        return a - b;
      });

      arrBlue.sort((a, b) => {
        return a - b;
      });

      imgDataCopy.data[index] = arrRed[4];
      imgDataCopy.data[index + 1] = arrGreen[4];
      imgDataCopy.data[index + 2] = arrBlue[4];
    }
  }
  ctx.putImageData(imgDataCopy, x1, y1);
}

function toNegative(image) {
  const imgData = ctx.getImageData(x1, y1, x2, y2);
  for (let i = 0; i < imgData.data.length; i += 4) {
    const red = imgData.data[i];
    const green = imgData.data[i + 1];
    const blue = imgData.data[i + 2];

    imgData.data[i] = 255 - red;
    imgData.data[i + 1] = 255 - green;
    imgData.data[i + 2] = 255 - blue;
  }

  ctx.putImageData(imgData, x1, y1);
}

function correctGamma(image, gamma) {
  const imgData = ctx.getImageData(x1, y1, x2, y2);
  const gammaCorrection = 1 / gamma;
  for (let i = 0; i < imgData.data.length; i += 4) {
    const red = imgData.data[i];
    const green = imgData.data[i + 1];
    const blue = imgData.data[i + 2];

    imgData.data[i] = 255 * Math.pow(red / 255, gammaCorrection);
    imgData.data[i + 1] = 255 * Math.pow(green / 255, gammaCorrection);
    imgData.data[i + 2] = 255 * Math.pow(blue / 255, gammaCorrection);
  }

  ctx.putImageData(imgData, x1, y1);
}

function adjustColorBalance(image, redValue, greenValue, blueValue) {
  const imgData = ctx.getImageData(x1, y1, x2, y2);
  for (let i = 0; i < imgData.data.length; i += 4) {
    const red = imgData.data[i];
    const green = imgData.data[i + 1];
    const blue = imgData.data[i + 2];

    imgData.data[i] = red + red * redValue;
    imgData.data[i + 1] = green + green * greenValue;
    imgData.data[i + 2] = blue + blue * blueValue;
  }

  ctx.putImageData(imgData, x1, y1);
}

function adjustThreshold(image, level) {
  const imgData = ctx.getImageData(x1, y1, x2, y2);
  for (let i = 0; i < imgData.data.length; i += 4) {
    if (imgData.data[i] >= level) {
      imgData.data[i] = 255;
      imgData.data[i + 1] = 255;
      imgData.data[i + 2] = 255;
    } else {
      imgData.data[i] = 0;
      imgData.data[i + 1] = 0;
      imgData.data[i + 2] = 0;
    }
  }

  ctx.putImageData(imgData, x1, y1);
}*/