import ReactDOMServer from "react-dom/server";

export function useDownload() {

  async function handleDownload(printContent: React.ReactNode){
    const html2pdf = (await import("html2pdf.js/dist/html2pdf.min.js")).default
    const content  = ReactDOMServer.renderToString(printContent)

    console.log(content);

    setTimeout(() => {
      html2pdf().set({
        filename: 'transaction'
      }).from(content as any).save()
    }, 1500);
  };

  return {
    handleDownload
  }
}