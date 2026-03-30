'use client'

import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { formatCurrency, formatDate, formatPaymentMethod, formatRentPeriod } from '@/lib/utils'
import type { RentPayment, Tenancy, Property, Profile, Confirmation } from '@/lib/types/database'

interface ReceiptData {
  payment: RentPayment
  tenancy: Tenancy
  property: Property
  tenant: Profile
  landlord: Profile
  confirmation?: Confirmation
}

export function generateReceiptPDF(data: ReceiptData): jsPDF {
  const { payment, property, tenant, landlord, confirmation } = data

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 20

  // ── Colours ──────────────────────────────────────────────
  const navyHex = '#0f172a'
  const greenHex = '#16a34a'
  const lightGrey = '#f8fafc'
  const borderGrey = '#e2e8f0'
  const textMuted = '#64748b'

  // ── Header bar ───────────────────────────────────────────
  doc.setFillColor(15, 23, 42)       // slate-900
  doc.rect(0, 0, pageWidth, 38, 'F')

  // Logo text
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(20)
  doc.setTextColor(255, 255, 255)
  doc.text('RentProof', margin, 18)

  // Tagline
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(148, 163, 184)   // slate-400
  doc.text('Neutral Rent Payment Verification', margin, 25)

  // Receipt ID (top right)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.setTextColor(255, 255, 255)
  doc.text(payment.receipt_id, pageWidth - margin, 18, { align: 'right' })

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7)
  doc.setTextColor(148, 163, 184)
  doc.text('Receipt ID', pageWidth - margin, 24, { align: 'right' })

  // ── Status badge ─────────────────────────────────────────
  const isVerified = payment.status === 'verified'
  const badgeColor = isVerified ? greenHex : '#d97706'
  const badgeLabel = isVerified ? '✓ VERIFIED' : '⏳ PENDING CONFIRMATION'

  doc.setFillColor(isVerified ? 22 : 217, isVerified ? 163 : 119, isVerified ? 74 : 6)
  doc.roundedRect(margin, 43, 60, 8, 1.5, 1.5, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7)
  doc.setTextColor(255, 255, 255)
  doc.text(badgeLabel, margin + 4, 48.5)

  // Issue date (right)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(100, 116, 139)
  doc.text(`Issued: ${formatDate(payment.created_at)}`, pageWidth - margin, 48, { align: 'right' })

  let y = 60

  // ── Section: Property & Parties ──────────────────────────
  const col1 = margin
  const col2 = pageWidth / 2 + 5

  doc.setFontSize(7)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(100, 116, 139)
  doc.text('PROPERTY ADDRESS', col1, y)
  doc.text('TENANT', col2, y)

  y += 5
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(15, 23, 42)

  const addressLines = [
    property.address_line1,
    property.address_line2,
    `${property.city}, ${property.postcode}`,
    property.country,
  ].filter(Boolean) as string[]

  addressLines.forEach((line) => {
    doc.text(line, col1, y)
    y += 4.5
  })

  const tenantY = 65
  doc.text(tenant.full_name, col2, tenantY)
  if (tenant.phone) {
    doc.setTextColor(100, 116, 139)
    doc.setFontSize(8)
    doc.text(tenant.phone, col2, tenantY + 4.5)
  }

  y += 6

  // Divider
  doc.setDrawColor(226, 232, 240)
  doc.setLineWidth(0.3)
  doc.line(margin, y, pageWidth - margin, y)
  y += 8

  // ── Section: Payment Details ──────────────────────────────
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7)
  doc.setTextColor(100, 116, 139)
  doc.text('PAYMENT DETAILS', margin, y)
  y += 5

  autoTable(doc, {
    startY: y,
    margin: { left: margin, right: margin },
    head: [],
    body: [
      ['Rent Period', formatRentPeriod(payment.rent_period_start, payment.rent_period_end)],
      ['Amount Paid', formatCurrency(payment.amount, payment.currency)],
      ['Payment Method', formatPaymentMethod(payment.payment_method)],
      ['Payment Reference', payment.payment_reference ?? '—'],
      ['Status', payment.status.toUpperCase()],
    ],
    theme: 'grid',
    styles: {
      fontSize: 9,
      cellPadding: 3,
      textColor: [15, 23, 42],
      lineColor: [226, 232, 240],
      lineWidth: 0.2,
    },
    columnStyles: {
      0: {
        fontStyle: 'bold',
        fillColor: [248, 250, 252],
        textColor: [100, 116, 139],
        cellWidth: 55,
      },
      1: { fillColor: [255, 255, 255] },
    },
    didParseCell: (data) => {
      if (data.column.index === 1 && data.row.index === 1) {
        data.cell.styles.fontStyle = 'bold'
        data.cell.styles.fontSize = 11
        data.cell.styles.textColor = [15, 23, 42]
      }
    },
  })

  y = (doc as any).lastAutoTable.finalY + 10

  // ── Confirmation block ────────────────────────────────────
  if (isVerified && confirmation) {
    doc.setFillColor(240, 253, 244)    // green-50
    doc.setDrawColor(187, 247, 208)    // green-200
    doc.setLineWidth(0.3)
    doc.roundedRect(margin, y, pageWidth - margin * 2, 24, 2, 2, 'FD')

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.setTextColor(22, 163, 74)
    doc.text('✓ PAYMENT CONFIRMED BY LANDLORD', margin + 4, y + 7)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(15, 23, 42)
    doc.text(`Confirmed by: ${landlord.full_name}`, margin + 4, y + 13)
    doc.text(`Confirmed at: ${formatDate(confirmation.confirmed_at, 'dd MMM yyyy, HH:mm')} UTC`, margin + 4, y + 18.5)

    y += 32
  } else {
    doc.setFillColor(255, 251, 235)    // amber-50
    doc.setDrawColor(252, 211, 77)     // amber-300
    doc.setLineWidth(0.3)
    doc.roundedRect(margin, y, pageWidth - margin * 2, 20, 2, 2, 'FD')

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.setTextColor(146, 64, 14)
    doc.text('⏳ AWAITING LANDLORD CONFIRMATION', margin + 4, y + 7)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(120, 53, 15)
    doc.text(
      'A confirmation request has been sent. This record constitutes a timestamped payment declaration.',
      margin + 4,
      y + 13
    )

    y += 28
  }

  // ── Parties ───────────────────────────────────────────────
  y += 4
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7)
  doc.setTextColor(100, 116, 139)
  doc.text('LANDLORD', col1, y)
  doc.text('RECEIPT GENERATED', col2, y)
  y += 5

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(15, 23, 42)
  doc.text(landlord.full_name, col1, y)
  if (landlord.phone) {
    doc.setFontSize(8)
    doc.setTextColor(100, 116, 139)
    doc.text(landlord.phone, col1, y + 4.5)
  }

  doc.setFontSize(9)
  doc.setTextColor(15, 23, 42)
  doc.text(formatDate(payment.created_at, 'dd MMM yyyy, HH:mm') + ' UTC', col2, y)

  // ── Footer ────────────────────────────────────────────────
  const footerY = doc.internal.pageSize.getHeight() - 20

  doc.setDrawColor(226, 232, 240)
  doc.setLineWidth(0.3)
  doc.line(margin, footerY - 4, pageWidth - margin, footerY - 4)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7)
  doc.setTextColor(148, 163, 184)
  doc.text(
    'This document is generated by RentProof — a neutral rent payment verification platform. ' +
      'It is not a bank statement or legal contract. Retain for your records.',
    margin,
    footerY,
    { maxWidth: pageWidth - margin * 2 }
  )

  doc.text(
    `rentproof.app | ${payment.receipt_id}`,
    pageWidth - margin,
    footerY + 5,
    { align: 'right' }
  )

  return doc
}

export function downloadReceiptPDF(data: ReceiptData): void {
  const doc = generateReceiptPDF(data)
  doc.save(`RentProof-${data.payment.receipt_id}.pdf`)
}
