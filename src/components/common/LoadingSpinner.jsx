import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ size = 40, className = '' }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2 className="animate-spin text-primary" size={size} />
    </div>
  );
}
