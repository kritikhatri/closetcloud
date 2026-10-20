export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_FILE_BYTES = 10 * 1024 * 1024 // 10 MB

/*
  Phone photos are often 3–8 MB and 4000px wide — far bigger than a card
  on screen. This shrinks a photo to at most `maxSize` px on its longest
  side and re-encodes it as a JPEG, usually ending up around 100–200 KB.

  How: draw the image onto an off-screen <canvas> at the smaller size,
  then ask the canvas for a compressed JPEG as a "data URL" (the image
  encoded as a long text string, which we can store and use as <img src>).
*/
export async function resizeImage(file, { maxSize = 1200, quality = 0.82 } = {}) {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    throw new Error('Please choose a JPG, PNG or WebP photo.')
  }
  if (file.size > MAX_FILE_BYTES) {
    throw new Error('That photo is over 10 MB. Please choose a smaller one.')
  }

  let bitmap
  try {
    // createImageBitmap decodes the file and respects the photo's
    // rotation info, so portrait phone photos don't come out sideways.
    bitmap = await createImageBitmap(file)
  } catch {
    throw new Error('We couldn’t read that photo. Try a different file.')
  }

  const scale = Math.min(1, maxSize / Math.max(bitmap.width, bitmap.height))
  const width = Math.round(bitmap.width * scale)
  const height = Math.round(bitmap.height * scale)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')
  // JPEG has no transparency, so fill white first — otherwise transparent
  // areas of a PNG cut-out would turn black.
  context.fillStyle = '#ffffff'
  context.fillRect(0, 0, width, height)
  context.drawImage(bitmap, 0, 0, width, height)
  bitmap.close()

  return canvas.toDataURL('image/jpeg', quality)
}
