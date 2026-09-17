import { FileText, Upload, X, CheckCircle } from 'lucide-react'
import { useCallback, useState } from 'react'
import { cn } from '../../utils/cn'
import { formatFileSize } from '../../utils/format'

interface FileUploadProps {
  onFileSelect: (file: File) => void
  accept?: string
  maxSizeMB?: number
  className?: string
}

export function FileUpload({ onFileSelect, accept = '.pdf,.docx', maxSizeMB = 10, className }: FileUploadProps) {
  const [dragOver, setDragOver] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  const validateAndSet = useCallback(
    (f: File) => {
      setError(null)
      const maxBytes = maxSizeMB * 1024 * 1024
      if (f.size > maxBytes) {
        setError(`File size must be under ${maxSizeMB} MB`)
        return
      }
      const ext = f.name.split('.').pop()?.toLowerCase()
      if (!['pdf', 'docx', 'doc'].includes(ext ?? '')) {
        setError('Please upload PDF or DOCX files only')
        return
      }
      setFile(f)
      onFileSelect(f)
    },
    [maxSizeMB, onFileSelect],
  )

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped) validateAndSet(dropped)
  }

  const clearFile = () => {
    setFile(null)
    setError(null)
  }

  if (file) {
    return (
      <div className={cn('rounded-lg border border-border bg-surface p-6', className)}>
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-text truncate">{file.name}</p>
            <p className="text-sm text-text-muted">{formatFileSize(file.size)}</p>
            <div className="flex items-center gap-1.5 mt-2 text-success text-sm">
              <CheckCircle className="h-4 w-4" />
              File uploaded
            </div>
          </div>
          <button onClick={clearFile} className="text-text-muted hover:text-text" aria-label="Remove file">
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={cn(
          'rounded-lg border-2 border-dashed p-8 text-center transition-colors cursor-pointer',
          dragOver ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-background',
        )}
      >
        <input
          type="file"
          accept={accept}
          className="hidden"
          id="file-upload"
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) validateAndSet(f)
          }}
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <Upload className="mx-auto h-10 w-10 text-text-muted mb-3" />
          <p className="font-medium text-text">Drag & Drop your tender here</p>
          <p className="text-sm text-text-muted mt-1">or</p>
          <span className="inline-block mt-2 text-sm font-medium text-primary">Browse Files</span>
          <p className="text-xs text-text-muted mt-3">PDF, DOCX (max {maxSizeMB} MB)</p>
        </label>
      </div>
      {error && <p className="mt-2 text-sm text-error">{error}</p>}
    </div>
  )
}
