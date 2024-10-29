/**
 *
 * @param {string} base64
 * @returns {Promise<{width: number, height: number}>}
 */
export function getImageDimensions(base64) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img')
    img.style.position = 'absolute'
    img.style.visibility = 'hidden'
    img.onload = () => {
      //remove img
      document.body.removeChild(img)
      resolve({ width: img.width, height: img.height })
    }
    img.onerror = (error) => {
      reject(error)
    }
    img.src = `${base64}`
    document.body.appendChild(img)
  })
}

/**
 *
 * @param {number} originalWidth
 * @param {number} originalHeight
 * @param {number} minWidth
 * @param {number} maxWidth
 * @returns {{width: number, height: number}}
 */
export function resizeDimensions(
  originalWidth,
  originalHeight,
  minWidth = 400,
  maxWidth = 800
) {
  let newWidth, newHeight

  if (originalWidth > maxWidth) {
    newWidth = maxWidth
  } else if (originalWidth < minWidth) {
    newWidth = minWidth
  } else {
    newWidth = originalWidth
  }

  // Calcular la altura manteniendo la relación de aspecto
  newHeight = (originalHeight / originalWidth) * newWidth

  return { width: newWidth, height: newHeight }
}
