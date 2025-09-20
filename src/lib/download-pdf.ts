"use client";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface DownloadResumePdfOptions {
  elementId?: string;
  fileName?: string;
}

const DEFAULT_ELEMENT_ID = "resume-preview-container";
const DEFAULT_FILENAME = "resume.pdf";

export async function downloadResumePdf(options: DownloadResumePdfOptions = {}) {
  const { elementId = DEFAULT_ELEMENT_ID, fileName = DEFAULT_FILENAME } = options;

  const hostElement = document.getElementById(elementId);

  if (!hostElement) {
    throw new Error("Resume preview element not found.");
  }

  const targetElement = hostElement.querySelector(".page-container");
  const nodeToRender = (targetElement instanceof HTMLElement ? targetElement : hostElement).cloneNode(true) as HTMLElement;

  nodeToRender.style.transform = "none";
  nodeToRender.style.transformOrigin = "top left";
  nodeToRender.style.width = "210mm";
  nodeToRender.style.maxWidth = "210mm";

  const wrapper = document.createElement("div");
  wrapper.style.position = "fixed";
  wrapper.style.inset = "0";
  wrapper.style.zIndex = "-1";
  wrapper.style.opacity = "0";
  wrapper.style.pointerEvents = "none";
  wrapper.style.backgroundColor = "#ffffff";
  wrapper.appendChild(nodeToRender);

  document.body.appendChild(wrapper);

  try {
    const scale = Math.max(window.devicePixelRatio || 1, 2);
    const canvas = await html2canvas(nodeToRender, {
      scale,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
      scrollX: 0,
      scrollY: 0,
      windowWidth: nodeToRender.scrollWidth,
      windowHeight: nodeToRender.scrollHeight,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save(fileName);
  } finally {
    document.body.removeChild(wrapper);
  }
}
