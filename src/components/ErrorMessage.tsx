import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="bg-red-50 border-l-4 border-red-400 p-4 my-4">
    <div className="flex items-center">
      <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
      <p className="text-red-700">{message}</p>
    </div>
  </div>
);