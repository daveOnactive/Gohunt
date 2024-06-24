import { useState } from "react";
import ReactDOMServer from "react-dom/server";

export function useDownload() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleDownload(printContent: React.ReactNode, filename: string){
    setIsLoading(true);
    const html2pdf = (await import("html2pdf.js/dist/html2pdf.min.js")).default
    const content  = ReactDOMServer.renderToString(printContent)

    setTimeout(() => {
      html2pdf().set({
        filename
      }).from(content as any).save()

      setIsLoading(false);
    }, 1500);
  };

  return {
    handleDownload,
    isLoading
  }
}