import { useState } from "react";
import ReactDOMServer from "react-dom/server";

export function useDownload() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleDownload(printContent: React.ReactNode){
    setIsLoading(true);
    const html2pdf = (await import("html2pdf.js/dist/html2pdf.min.js")).default
    const content  = ReactDOMServer.renderToString(printContent)

    setTimeout(() => {
      html2pdf().set({
        filename: 'transaction'
      }).from(content as any).save()
    }, 1500);

    setIsLoading(false);
  };

  return {
    handleDownload,
    isLoading
  }
}