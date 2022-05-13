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
    posodobiHistogram(histogramVrednosti);
  };

  buttonGrayscale.onclick = () => {
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