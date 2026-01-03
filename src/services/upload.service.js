export const uploadService = {
  uploadImg
}

async function uploadImg(ev, folderName = 'toys_app/misc') {
  const CLOUD_NAME = "drwckesw5"
  const UPLOAD_PRESET = "toy_upload"

  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  const formData = new FormData()
  formData.append('upload_preset', UPLOAD_PRESET)
  formData.append('file', ev.target.files[0])

  // formData.append('folder', folderName) 

  try {
    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData
    })
    const data = await res.json()
    return data.secure_url
  } catch (err) {
    console.error('Failed to upload', err)
    throw err
  }
}