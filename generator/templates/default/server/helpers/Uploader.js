import fs from 'fs'
import multer from 'multer'
import config from '../Configuration'

const destination = config.getUploadDestination()
const fileSizeLimit = config.getUploadSizeLimit()

class Uploader {
  static getSingleFileUploader() {
    return multer({
      dest: destination,
      limits: {
        fields: 1,
        fileSize: fileSizeLimit,
      },
    }).single('file')
  }

  static getMultipleFilesUploader() {
    return multer({
      dest: destination,
      limits: {
        files: 3,
        fileSize: fileSizeLimit,
      },
    }).array('file')
  }

  static deleteLocalFile(filename) {
    let path = config.getUploadDestination() + filename

    return new Promise((resolve) => {
      fs.stat(path, function (error) {
        if (!error) {
          fs.unlink(path)
        }
        resolve()
      })
    })
  }
}

export default Uploader