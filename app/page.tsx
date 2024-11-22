import UploadForm from './components/UploadForm'
import Logo from './components/Logo'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
          <Logo className="w-32 h-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">CSV Upload and Analysis</h1>
          <p className="text-blue-100">Upload your CSV file for instant analysis and insights</p>
        </div>
        <div className="p-8">
          <UploadForm />
        </div>
      </div>
    </main>
  )
}
