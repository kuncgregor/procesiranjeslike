
function applyMedian(image) {
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
    posodobiHistogram(histogramVrednosti);
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
    posodobiHistogram(histogramVrednosti);
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
    posodobiHistogram(histogramVrednosti);
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
    posodobiHistogram(histogramVrednosti);
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
    posodobiHistogram(histogramVrednosti);
  }

  function toGrayscale(image) {
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
    posodobiHistogram(histogramVrednosti);
  }