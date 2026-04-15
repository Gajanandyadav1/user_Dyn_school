import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

export default function FixedImage({ src, ratio = "16/9", alt = "Image", className = "" }) {
  const [hasError, setHasError] = React.useState(false);

  // If there's no src or it fails to load, show a placeholder matching the ratio
  if (!src || hasError) {
    return (
      <div 
        className={`w-full relative overflow-hidden bg-slate-100 flex items-center justify-center border border-slate-200 ${className}`}
        style={{ aspectRatio: ratio, width: '100%', maxWidth: '100%' }}
      >
        <ImageIcon className="text-slate-300 w-10 h-10" />
      </div>
    );
  }

  return (
    <div 
      className={`w-full relative overflow-hidden img-box ${className}`} 
      style={{ aspectRatio: ratio, width: '100%', maxWidth: '100%' }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ maxWidth: '100%', display: 'block' }}
        onError={() => setHasError(true)}
      />
    </div>
  );
}
