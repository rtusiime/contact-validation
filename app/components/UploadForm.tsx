'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { uploadAndSendEmail } from '../actions'
import { CheckCircle2, Upload, X } from 'lucide-react'

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null)
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls', '.xlsx']
    },
    multiple: false
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!file || !email) return

    setIsLoading(true)
    setMessage('')

    const formData = new FormData()
    formData.append('csvFile', file)
    formData.append('email', email)

    const result = await uploadAndSendEmail(formData)

    setIsLoading(false)
    setMessage(result.message)
    setIsSuccess(result.success)
  }

  const isFormValid = file && email

  if (isSuccess) {
    return (
      <div className="text-center">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Upload Successful!</h2>
        <p className="text-gray-600 mb-4">Your file has been uploaded and sent successfully.</p>
        <button
          onClick={() => {
            setFile(null)
            setEmail('')
            setMessage('')
            setIsSuccess(false)
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Upload Another File
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Your Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <input {...getInputProps()} />
          {file ? (
            <div className="flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-500 mr-2" />
              <span className="text-gray-700">{file.name}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setFile(null)
                }}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div>
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Drag & drop your CSV or Excel file here, or click to select</p>
              <p className="text-sm text-gray-500 mt-2">Supported formats: .csv, .xls, .xlsx</p>
            </div>
          )}
        </div>
      </div>
      <button
        type="submit"
        disabled={!isFormValid || isLoading}
        className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
          isFormValid && !isLoading
            ? 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            : 'bg-gray-300 cursor-not-allowed'
        }`}
      >
        {isLoading ? 'Uploading...' : 'Upload and Send'}
      </button>
      {message && (
        <p className={`text-sm ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </form>
  )
}

