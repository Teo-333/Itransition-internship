"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useTheme } from "next-themes"
import { Progress } from "@/components/ui/progress"
import sha3 from "js-sha3"
const { sha3_256 } = sha3
import { Copy, FileUp, FileText, Files, Check, Sun, Moon, Sparkles, X, AlertCircle } from "lucide-react"
import { BubbleAnimation } from "@/components/bubble-animation"

export default function HashGenerator() {
  const [hash, setHash] = useState<string>("")
  const [copied, setCopied] = useState(false)
  const [fileName, setFileName] = useState<string>("")
  const [textInput, setTextInput] = useState<string>("")
  const [isDragging, setIsDragging] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // Multi-file mode states
  const [multipleFiles, setMultipleFiles] = useState<File[]>([])
  const [processingFiles, setProcessingFiles] = useState(false)
  const [processedCount, setProcessedCount] = useState(0)
  const [combinedHash, setCombinedHash] = useState<string>("")
  const [error, setError] = useState<string>("")

  // Ensure theme toggle only works client-side
  useEffect(() => {
    setMounted(true)
  }, [])

  const calculateFileHash = async (file: File) => {
    setFileName(file.name)
    const arrayBuffer = await file.arrayBuffer()
    const uint8Array = new Uint8Array(arrayBuffer)
    const hash = sha3_256(uint8Array)
    setHash(hash)
  }

  const calculateTextHash = () => {
    const hash = sha3_256(textInput)
    setHash(hash)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      calculateFileHash(file)
    }
  }

  const handleMultipleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files)

      if (filesArray.length > 256) {
        setError("Maximum 256 files allowed")
        return
      }

      setMultipleFiles(filesArray)
      setError("")
    }
  }

  const processMultipleFiles = async () => {
    if (multipleFiles.length === 0) return
    if (multipleFiles.length > 256) {
      setError("Maximum 256 files allowed")
      return
    }

    setProcessingFiles(true)
    setProcessedCount(0)
    setCombinedHash("")
    setError("")

    const hashes: string[] = []

    for (let i = 0; i < multipleFiles.length; i++) {
      try {
        const file = multipleFiles[i]
        const arrayBuffer = await file.arrayBuffer()
        const uint8Array = new Uint8Array(arrayBuffer)
        const hash = sha3_256(uint8Array)
        hashes.push(hash)
        setProcessedCount(i + 1)
      } catch (err) {
        setError(`Error processing file ${multipleFiles[i].name}`)
        setProcessingFiles(false)
        return
      }
    }

    const combined = hashes.join("")
    setCombinedHash(combined)
    setProcessingFiles(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (file) {
      calculateFileHash(file)
    }
  }

  const handleMultiFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesArray = Array.from(e.dataTransfer.files)

      if (filesArray.length > 256) {
        setError("Maximum 256 files allowed")
        return
      }

      setMultipleFiles(filesArray)
      setError("")
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const removeFile = (index: number) => {
    setMultipleFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const clearAllFiles = () => {
    setMultipleFiles([])
    setCombinedHash("")
  }

  return (
    <>
      <BubbleAnimation />
      <div className="container mx-auto py-10 px-4 min-h-screen flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl">
          <div className="flex justify-end mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
              aria-label="Toggle theme"
            >
              {mounted && (theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />)}
            </Button>
          </div>

          <Card className="backdrop-blur-sm bg-background/80 border shadow-lg">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <CardTitle className="text-2xl font-bold">SHA3-256 Hash Generator</CardTitle>
                </div>
              </div>
              <CardDescription>Generate SHA3-256 hash from files or text input</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="file" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="file" className="flex items-center gap-2">
                    <FileUp className="h-4 w-4" />
                    Single File
                  </TabsTrigger>
                  <TabsTrigger value="text" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Text
                  </TabsTrigger>
                  <TabsTrigger value="multi" className="flex items-center gap-2">
                    <Files className="h-4 w-4" />
                    Multiple Files
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="file">
                  <div
                    className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-all duration-300 ${
                      isDragging
                        ? "border-primary bg-primary/10 scale-[0.99]"
                        : "border-muted-foreground/25 hover:border-primary/50 hover:bg-primary/5"
                    }`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => document.getElementById("file-upload")?.click()}
                  >
                    <FileUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="mb-2 text-sm font-medium">Drag and drop a file here or click to browse</p>
                    <p className="text-xs text-muted-foreground">Supports any file type, including binary files</p>
                    <Input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
                  </div>

                  {fileName && (
                    <div className="mt-4 p-3 bg-primary/5 rounded-md">
                      <p className="text-sm">
                        Selected file: <span className="font-medium">{fileName}</span>
                      </p>
                    </div>
                  )}

                  {hash && (
                    <div className="mt-6 space-y-2 animate-in fade-in-50 duration-300">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium">SHA3-256 Hash Result:</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(hash)}
                          className="h-8 transition-all duration-300"
                        >
                          {copied ? (
                            <>
                              <Check className="h-4 w-4 mr-1 text-green-500" /> Copied
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4 mr-1" /> Copy
                            </>
                          )}
                        </Button>
                      </div>
                      <div className="p-4 bg-muted rounded-md overflow-x-auto">
                        <code className="text-xs sm:text-sm font-mono break-all">{hash}</code>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="text">
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Enter text to hash..."
                      className="min-h-[150px] resize-none"
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                    />
                    <Button onClick={calculateTextHash} className="w-full" disabled={!textInput} variant="default">
                      Generate Hash
                    </Button>
                  </div>

                  {hash && (
                    <div className="mt-6 space-y-2 animate-in fade-in-50 duration-300">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium">SHA3-256 Hash Result:</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(hash)}
                          className="h-8 transition-all duration-300"
                        >
                          {copied ? (
                            <>
                              <Check className="h-4 w-4 mr-1 text-green-500" /> Copied
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4 mr-1" /> Copy
                            </>
                          )}
                        </Button>
                      </div>
                      <div className="p-4 bg-muted rounded-md overflow-x-auto">
                        <code className="text-xs sm:text-sm font-mono break-all">{hash}</code>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="multi">
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${
                      isDragging
                        ? "border-primary bg-primary/10 scale-[0.99]"
                        : "border-muted-foreground/25 hover:border-primary/50 hover:bg-primary/5"
                    }`}
                    onDrop={handleMultiFileDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => document.getElementById("multi-file-upload")?.click()}
                  >
                    <Files className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="mb-2 text-sm font-medium">Drag and drop multiple files here or click to browse</p>
                    <p className="text-xs text-muted-foreground">Maximum 256 files allowed</p>
                    <Input
                      id="multi-file-upload"
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleMultipleFileChange}
                    />
                  </div>

                  {error && (
                    <div className="mt-4 p-3 bg-destructive/10 rounded-md flex items-center gap-2 text-destructive">
                      <AlertCircle className="h-4 w-4" />
                      <p className="text-sm font-medium">{error}</p>
                    </div>
                  )}

                  {multipleFiles.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium">
                          {multipleFiles.length} {multipleFiles.length === 1 ? "file" : "files"} selected
                        </p>
                        <Button variant="outline" size="sm" onClick={clearAllFiles} className="h-8">
                          Clear All
                        </Button>
                      </div>

                      <div className="max-h-[150px] overflow-y-auto space-y-2 p-2 bg-muted/50 rounded-md">
                        {multipleFiles.slice(0, 10).map((file, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center text-sm p-2 bg-background rounded"
                          >
                            <span className="truncate max-w-[250px]">{file.name}</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeFile(index)}>
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                        {multipleFiles.length > 10 && (
                          <div className="text-center text-sm text-muted-foreground py-1">
                            + {multipleFiles.length - 10} more files
                          </div>
                        )}
                      </div>

                      <Button
                        onClick={processMultipleFiles}
                        className="w-full"
                        disabled={processingFiles || multipleFiles.length === 0}
                      >
                        {processingFiles ? "Processing..." : "Generate Combined Hash"}
                      </Button>

                      {processingFiles && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Processing files...</span>
                            <span>
                              {processedCount} / {multipleFiles.length}
                            </span>
                          </div>
                          <Progress value={(processedCount / multipleFiles.length) * 100} />
                        </div>
                      )}
                    </div>
                  )}

                  {combinedHash && (
                    <div className="mt-6 space-y-2 animate-in fade-in-50 duration-300">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium">Combined SHA3-256 Hash:</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(combinedHash)}
                          className="h-8 transition-all duration-300"
                        >
                          {copied ? (
                            <>
                              <Check className="h-4 w-4 mr-1 text-green-500" /> Copied
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4 mr-1" /> Copy
                            </>
                          )}
                        </Button>
                      </div>
                      <div className="p-4 bg-muted rounded-md overflow-x-auto">
                        <code className="text-xs sm:text-sm font-mono break-all">{combinedHash}</code>
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>All processing happens in your browser. Your files are never uploaded to any server.</p>
          </div>
        </div>
      </div>
    </>
  )
}

