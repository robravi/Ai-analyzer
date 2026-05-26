"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, FileText, Loader2 } from "lucide-react";
import { useResumeStore } from "@/stores/resume-store";
import { cn } from "@/lib/utils";

export function ResumeUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { fileName, setResumeData } = useResumeStore();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setUploading(true);
      setError(null);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const contentType = res.headers.get("content-type") || "";
        if (!res.ok) {
          if (contentType.includes("application/json")) {
            const data = await res.json();
            throw new Error(data.error || "Upload failed");
          }
          throw new Error(`Upload failed (${res.status})`);
        }

        if (!contentType.includes("application/json")) {
          throw new Error("Unexpected response from server");
        }

        const { text, fileName: name } = await res.json();
        setResumeData(text, name);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setUploading(false);
      }
    },
    [setResumeData]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
  });

  return (
    <Card>
      <CardContent className="p-6">
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
            isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
            uploading && "pointer-events-none opacity-60"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-3">
            {uploading ? (
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
            ) : fileName ? (
              <FileText className="h-10 w-10 text-green-500" />
            ) : (
              <Upload className="h-10 w-10 text-muted-foreground" />
            )}

            {uploading ? (
              <p className="text-sm text-muted-foreground">Parsing resume...</p>
            ) : fileName ? (
              <div>
                <p className="text-sm font-medium">{fileName}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Click or drag to replace
                </p>
              </div>
            ) : (
              <div>
                <p className="text-sm font-medium">
                  {isDragActive ? "Drop your resume here" : "Drag & drop your resume"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PDF or DOCX, max 5MB
                </p>
              </div>
            )}
          </div>
        </div>

        {error && (
          <p className="text-sm text-destructive mt-3">{error}</p>
        )}
      </CardContent>
    </Card>
  );
}
