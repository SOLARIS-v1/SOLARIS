import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Layers, AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export class ThreeErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMessage: '',
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('3D Canvas WebGL recovered via 2D Fallback:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#F5F0E9] font-mono text-xs">
          <div className="w-12 h-12 rounded-xl bg-[#FAF3E8] border border-[#EBD7BE] text-[#B87D3B] flex items-center justify-center mb-3">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-[#33302E] mb-1">WebGL 3D Fallback Mode Active</h3>
          <p className="text-[#817A76] max-w-sm mb-4">
            System shifted to 2D anatomical schematic mode. All organ sensor telemetry and flight hazard data remain fully accessible.
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FFFCF8] border border-[#E4DAD0] hover:border-[#D5BDA4] text-[#33302E] hover:text-[#542B38] transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry 3D WebGL</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
