function escapeCSV(value) {
  const s = String(value ?? "")
  return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s
}

function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function downloadCSV(filename, headers, rows) {
  const lines = [headers, ...rows].map(r => r.map(escapeCSV).join(","))
  const csv = "﻿" + lines.join("\r\n")
  triggerDownload(new Blob([csv], { type: "text/csv;charset=utf-8;" }), filename)
}

export async function downloadPDF(filename, title, headers, rows) {
  const { jsPDF } = await import('jspdf')
  const { autoTable } = await import('jspdf-autotable')
  const doc = new jsPDF()
  doc.setFontSize(15)
  doc.text(title, 14, 17)
  autoTable(doc, {
    head: [headers],
    body: rows,
    startY: 23,
    styles: { fontSize: 9 },
    headStyles: { fillColor: [26, 75, 110] },
  })
  doc.save(filename)
}
