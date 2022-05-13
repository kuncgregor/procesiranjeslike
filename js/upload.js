selectedImage.onchange = () => {
    img.src = URL.createObjectURL(selectedImage.files[0]);
    loadImage(img);
    canvas.classList.remove('hidden');
    fileUploader.classList.add('hidden');
    posodobiHistogram(histogramVrednosti);

  };
  
  mergeUploader.onchange = () => {
    mergedImg.src = URL.createObjectURL(imageToMerge.files[0]);
  
    mergedImg.onload = () => {
      ctx.globalAlpha = 1.0;
      ctx.drawImage(img, 0, 0);
      ctx.globalAlpha = 0.5;
      ctx.drawImage(mergedImg, 0, 0);
    };
    posodobiHistogram(histogramVrednosti);

  }

function loadImage(image) {
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
      posodobiHistogram(histogramVrednosti);
    };
    posodobiHistogram(histogramVrednosti);
  }

