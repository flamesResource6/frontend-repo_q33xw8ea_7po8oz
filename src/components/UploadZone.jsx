import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon, FileAudio, FileText, Video, Trash2 } from 'lucide-react';

const fileTypeMap = {
  image: { icon: ImageIcon, label: 'Image', accept: 'image/*' },
  video: { icon: Video, label: 'Video', accept: 'video/*' },
  audio: { icon: FileAudio, label: 'Audio', accept: 'audio/*' },
  text: { icon: FileText, label: 'Document', accept: '.txt,.md,.pdf,.doc,.docx,application/pdf,text/plain' },
};

const detectType = (file) => {
  if (!file) return 'text';
  if (file.type.startsWith('image/')) return 'image';
  if (file.type.startsWith('video/')) return 'video';
  if (file.type.startsWith('audio/')) return 'audio';
  // crude detection for PDFs & text
  if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) return 'text';
  return 'text';
};

const UploadZone = ({ onChange }) => {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const handleFiles = (files) => {
    const f = files?.[0];
    if (!f) return;
    const typeKey = detectType(f);
    setFile({ file: f, type: typeKey });

    if (typeKey === 'image' || typeKey === 'video' || typeKey === 'audio') {
      const url = URL.createObjectURL(f);
      setPreviewUrl(url);
    } else {
      setPreviewUrl('');
    }
    onChange?.(f, typeKey);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeFile = () => {
    setFile(null);
    setPreviewUrl('');
    if (inputRef.current) inputRef.current.value = '';
    onChange?.(null, null);
  };

  const typeInfo = file ? fileTypeMap[file.type] : null;
  const Icon = typeInfo ? typeInfo.icon : Upload;

  return (
    <div className="w-full">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={`relative rounded-2xl border border-white/15 bg-white/5 p-6 text-center transition ${dragOver ? 'ring-2 ring-sky-400/60 bg-white/10' : 'ring-1 ring-white/10'}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={Object.values(fileTypeMap).map((t) => t.accept).join(',')}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        <div className="flex flex-col items-center justify-center gap-3">
          <div className="grid h-16 w-16 place-items-center rounded-xl bg-gradient-to-br from-fuchsia-500/30 to-sky-500/30 text-white ring-1 ring-white/20">
            <Icon className="h-8 w-8" />
          </div>
          <p className="text-sm text-slate-300">
            Drag and drop files here, or
            <button
              onClick={() => inputRef.current?.click()}
              className="ml-2 rounded-md bg-white/10 px-2 py-1 font-medium text-white ring-1 ring-white/20 hover:bg-white/20"
            >
              browse
            </button>
          </p>
          <p className="text-xs text-slate-400">
            Supported: images, videos, audio, text, PDF
          </p>
        </div>

        {file && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-black/30 p-3 ring-1 ring-white/10">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <Icon className="h-4 w-4" />
                  <span>{file.file.name}</span>
                </div>
                <button onClick={removeFile} className="rounded-md bg-white/10 p-1 ring-1 ring-white/20 hover:bg-white/20">
                  <Trash2 className="h-4 w-4 text-white/80" />
                </button>
              </div>
              <div className="aspect-video w-full overflow-hidden rounded-lg bg-white/5">
                {file.type === 'image' && previewUrl && (
                  <img src={previewUrl} alt="preview" className="h-full w-full object-cover" />
                )}
                {file.type === 'video' && previewUrl && (
                  <video src={previewUrl} className="h-full w-full object-cover" controls />
                )}
                {file.type === 'audio' && previewUrl && (
                  <audio src={previewUrl} className="w-full" controls />
                )}
                {file.type === 'text' && (
                  <div className="flex h-full items-center justify-center text-sm text-slate-300">
                    Document ready for analysis
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-slate-900/60 to-slate-900/30 p-4 ring-1 ring-white/10">
              <h4 className="mb-2 text-left text-sm font-semibold text-white">Auto-detected</h4>
              <ul className="space-y-2 text-left text-sm text-slate-300">
                <li>
                  Type: <span className="font-medium text-white">{file.type.toUpperCase()}</span>
                </li>
                <li>Size: {(file.file.size / 1024 / 1024).toFixed(2)} MB</li>
                <li>MIME: {file.file.type || 'n/a'}</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadZone;
