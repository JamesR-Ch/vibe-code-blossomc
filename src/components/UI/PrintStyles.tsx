export const PrintStyles = () => {
  return (
    <style>{`
      @media print {
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        
        body * {
          visibility: hidden;
        }
        
        .contract-template, .contract-template * {
          visibility: visible;
        }
        
        .contract-template {
          position: absolute !important;
          left: 0 !important;
          top: 0 !important;
          width: 210mm !important;
          height: auto !important;
          margin: 0 !important;
          padding: 15mm !important;
          font-size: 11pt !important;
          font-family: Arial, sans-serif !important;
          line-height: 1.3 !important;
          color: #000000 !important;
          background: white !important;
          overflow: visible !important;
          transform: none !important;
          zoom: 1 !important;
        }
        
        .contract-template .grid {
          display: grid !important;
          width: 100% !important;
        }
        
        .contract-template .grid-cols-12 {
          grid-template-columns: repeat(12, 1fr) !important;
        }
        
        .contract-template .grid-cols-2 {
          grid-template-columns: repeat(2, 1fr) !important;
        }
        
        .contract-template .col-span-1 { grid-column: span 1 !important; }
        .contract-template .col-span-2 { grid-column: span 2 !important; }
        .contract-template .col-span-4 { grid-column: span 4 !important; }
        .contract-template .col-span-6 { grid-column: span 6 !important; }
        .contract-template .col-span-8 { grid-column: span 8 !important; }
        .contract-template .col-span-10 { grid-column: span 10 !important; }
        
        .contract-template .border {
          border: 1px solid #000 !important;
        }
        
        .contract-template .border-b {
          border-bottom: 1px solid #000 !important;
        }
        
        .contract-template .border-r {
          border-right: 1px solid #000 !important;
        }
        
        .contract-template .border-gray-800 {
          border-color: #000 !important;
        }
        
        .contract-template .border-gray-400 {
          border-color: #666 !important;
        }
        
        .contract-template .text-xs {
          font-size: 9pt !important;
        }
        
        .contract-template .text-sm {
          font-size: 10pt !important;
        }
        
        .contract-template .text-lg {
          font-size: 14pt !important;
        }
        
        .contract-template .font-bold {
          font-weight: bold !important;
        }
        
        .contract-template .text-center {
          text-align: center !important;
        }
        
        .contract-template .text-right {
          text-align: right !important;
        }
        
        .contract-template .p-1 {
          padding: 2pt !important;
        }
        
        .contract-template .p-2 {
          padding: 4pt !important;
        }
        
        .no-print {
          display: none !important;
        }
        
        /* Hide floating action button when printing */
        .fixed {
          display: none !important;
        }
        
        @page {
          size: A4 portrait;
          margin: 0;
          padding: 0;
        }
      }
      
      /* Mobile-specific print fix - reduce signature margin only */
      @media print and (max-width: 768px) {
        .contract-template .mt-8 {
          margin-top: 16pt !important;
        }
      }
      
      /* iOS Safari specific fixes for time and date inputs */
      .ios-input::-webkit-datetime-edit {
        padding: 0;
      }
      
      .ios-input::-webkit-datetime-edit-fields-wrapper {
        background: transparent;
      }
      
      .ios-input::-webkit-datetime-edit-text {
        color: #374151;
        padding: 0 0.25rem;
      }
      
      .ios-input::-webkit-datetime-edit-month-field,
      .ios-input::-webkit-datetime-edit-day-field,
      .ios-input::-webkit-datetime-edit-year-field,
      .ios-input::-webkit-datetime-edit-hour-field,
      .ios-input::-webkit-datetime-edit-minute-field {
        background: transparent;
        color: #374151;
        font-weight: normal;
      }
      
      .ios-input::-webkit-calendar-picker-indicator {
        opacity: 0.6;
        cursor: pointer;
      }
      
      /* Ensure proper sizing on iOS */
      @supports (-webkit-touch-callout: none) {
        .ios-input {
          min-height: 44px;
          -webkit-appearance: none;
          border-radius: 8px;
        }
      }
    `}</style>
  );
};