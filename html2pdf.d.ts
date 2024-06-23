declare module 'html2pdf.js/dist/html2pdf.min.js' {
  interface Html2PdfOptions {
    margin?: number | [number, number, number, number];
    filename?: string;
    image?: { type?: string; quality?: number };
    html2canvas?: { scale?: number; useCORS?: boolean };
    jsPDF?: { unit?: string; format?: string; orientation?: string };
    pagebreak?: { mode?: string | string[] };
  }

  interface Html2Pdf {
    from(element: HTMLElement): this;
    set(options: Html2PdfOptions): this;
    toPdf(): this;
    save(): void;
    output(type: string, options?: any): any;
  }

  const html2pdf: {
    (): Html2Pdf;
    (element: HTMLElement, options?: Html2PdfOptions): Promise<void>;
    from(element: HTMLElement): Html2Pdf;
  };

  export default html2pdf;
}