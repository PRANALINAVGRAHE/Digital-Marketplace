const API_BASE_URL = "http://127.0.0.1:8000";

export function getImageUrl(image) {
  if (!image) {
    return null;
  }

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  return `${API_BASE_URL}${image}`;
}