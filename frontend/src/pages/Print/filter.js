const applyFilter = (data, filter) => {
  switch (filter) {
    case "sepia(30%) contrast(85%) brightness(90%)": // Vintage
      applySepia(data, 0.3);
      applyContrast(data, 0.85);
      applyBrightness(data, 0.9);
      break;
    case "sepia(20%) saturate(150%)": // Warm
      applySepia(data, 0.2);
      applySaturate(data, 1.5);
      break;
    case "hue-rotate(180deg) saturate(120%)": // Cool
      applyHueRotate(data, 180);
      applySaturate(data, 1.2);
      break;
    case "contrast(150%)": // High Contrast
      applyContrast(data, 1.5);
      break;
    case "brightness(110%) contrast(90%) saturate(110%)": // Soft
      applyBrightness(data, 1.1);
      applyContrast(data, 0.9);
      applySaturate(data, 1.1);
      break;
    case "contrast(130%) brightness(80%)": // Dramatic
      applyContrast(data, 1.3);
      applyBrightness(data, 0.8);
      break;
    default:
      console.log("Filter not found");
  }
};

const applySepia = (data, intensity) => {
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    data[i] = r * (1 - 0.607 * intensity) + g * 0.769 * intensity + b * 0.189 * intensity;
    data[i + 1] = r * 0.349 * intensity + g * (1 - 0.314 * intensity) + b * 0.168 * intensity;
    data[i + 2] = r * 0.272 * intensity + g * 0.534 * intensity + b * (1 - 0.869 * intensity);
  }
};

const applyContrast = (data, contrast) => {
  const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
  for (let i = 0; i < data.length; i += 4) {
    data[i] = factor * (data[i] - 128) + 128;
    data[i + 1] = factor * (data[i + 1] - 128) + 128;
    data[i + 2] = factor * (data[i + 2] - 128) + 128;
  }
};

const applyBrightness = (data, brightness) => {
  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.min(data[i] * brightness, 255);
    data[i + 1] = Math.min(data[i + 1] * brightness, 255);
    data[i + 2] = Math.min(data[i + 2] * brightness, 255);
  }
};

const applySaturate = (data, saturation) => {
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const avg = (r + g + b) / 3;

    data[i] = avg + (r - avg) * saturation;
    data[i + 1] = avg + (g - avg) * saturation;
    data[i + 2] = avg + (b - avg) * saturation;
  }
};

const applyHueRotate = (data, degrees) => {
  const radians = (degrees * Math.PI) / 180;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    data[i] = Math.min(r * (cos + (1.0 - cos) / 3.0) + g * ((1.0 / 3.0) * (1.0 - cos) - Math.sqrt(1.0 / 3.0) * sin) + b * ((1.0 / 3.0) * (1.0 - cos) + Math.sqrt(1.0 / 3.0) * sin), 255);
    data[i + 1] = Math.min(r * ((1.0 / 3.0) * (1.0 - cos) + Math.sqrt(1.0 / 3.0) * sin) + g * (cos + (1.0 / 3.0) * (1.0 - cos)) + b * ((1.0 / 3.0) * (1.0 - cos) - Math.sqrt(1.0 / 3.0) * sin), 255);
    data[i + 2] = Math.min(r * ((1.0 / 3.0) * (1.0 - cos) - Math.sqrt(1.0 / 3.0) * sin) + g * ((1.0 / 3.0) * (1.0 - cos) + Math.sqrt(1.0 / 3.0) * sin) + b * (cos + (1.0 / 3.0) * (1.0 - cos)), 255);
  }
};

export { applyFilter };
