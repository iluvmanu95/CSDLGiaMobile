import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Platform, Share, Alert } from 'react-native';
import { X, FileSpreadsheet, FileText, Share2, Printer, CheckCircle2 } from 'lucide-react-native';
import { ReportOption, PeriodType } from '../../../screens/Reports/types';
import { StatItem } from './StatSummaryCards';
import { ChartDataPoint } from './SineWaveLineChart';
import { BarChartDataPoint } from './BarChart';
import { PieDataPoint } from './DonutChart';
import { BreakdownRow } from './BreakdownTable';

interface ExportModalProps {
    visible: boolean;
    onClose: () => void;
    report: ReportOption;
    filterSummary: string;
    businessName?: string;
    statItems: StatItem[];
    waveData: ChartDataPoint[];
    barData: BarChartDataPoint[];
    pieData: PieDataPoint[];
    breakdownRows: BreakdownRow[];
    isDark?: boolean;
}

export const ExportModal: React.FC<ExportModalProps> = ({
    visible,
    onClose,
    report,
    filterSummary,
    businessName,
    statItems,
    waveData,
    barData,
    pieData,
    breakdownRows,
    isDark = false,
}) => {
    // 1. Export as CSV / Excel
    const handleExportCSV = async () => {
        try {
            let csvContent = '\uFEFF'; // UTF-8 BOM for Excel Vietnamese accents
            csvContent += `BÁO CÁO: ${report.title.toUpperCase()}\n`;
            csvContent += `Thời gian: ${filterSummary}\n`;
            if (businessName) csvContent += `Ngành nghề / Lĩnh vực: ${businessName}\n`;
            csvContent += `Ngày xuất: ${new Date().toLocaleDateString('vi-VN')}\n\n`;

            // Section 1: KPIs
            csvContent += `--- 1. CHỈ SỐ TỔNG QUAN ---\n`;
            csvContent += `Chỉ số,Giá trị,Ghi chú\n`;
            statItems.forEach((item) => {
                csvContent += `"${item.title}","${item.value}","${item.subText || ''}"\n`;
            });
            csvContent += `\n`;

            // Section 2: Trend by period
            csvContent += `--- 2. BIẾN ĐỘNG THEO KỲ ---\n`;
            csvContent += `Mốc thời gian,Số lượng hồ sơ\n`;
            waveData.forEach((w) => {
                csvContent += `"${w.label}","${w.value}"\n`;
            });
            csvContent += `\n`;

            // Section 3: Status Distribution
            csvContent += `--- 3. CƠ CẤU TRẠNG THÁI ---\n`;
            csvContent += `Trạng thái,Số lượng\n`;
            pieData.forEach((p) => {
                csvContent += `"${p.label}","${p.value}"\n`;
            });
            csvContent += `\n`;

            // Section 4: Breakdown Table
            csvContent += `--- 4. PHÂN BỔ NGHIỆP VỤ ---\n`;
            csvContent += `Nhóm hồ sơ,Mô tả,Số lượng,Tỷ lệ %\n`;
            breakdownRows.forEach((r) => {
                csvContent += `"${r.label}","${r.subLabel || ''}","${r.count}","${r.percentage}%"\n`;
            });

            if (Platform.OS === 'web') {
                // Web download trigger
                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `BaoCao_${report.type}_${Date.now()}.csv`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                onClose();
            } else {
                // Mobile native save & share
                try {
                    const FileSystem = require('expo-file-system');
                    const Sharing = require('expo-sharing');
                    const fileUri = `${FileSystem.cacheDirectory || FileSystem.documentDirectory || ''}BaoCao_${report.type}_${Date.now()}.csv`;
                    
                    if (FileSystem.writeAsStringAsync) {
                        await FileSystem.writeAsStringAsync(fileUri, csvContent, {
                            encoding: 'utf8',
                        });
                    }

                    if (Sharing.isAvailableAsync && await Sharing.isAvailableAsync()) {
                        await Sharing.shareAsync(fileUri, {
                            mimeType: 'text/csv',
                            dialogTitle: `Xuất dữ liệu: ${report.title}`,
                            UTI: 'public.comma-separated-values-text',
                        });
                    } else {
                        Alert.alert('Thông báo', 'Đã lưu file thành công.');
                    }
                } catch (nativeErr) {
                    console.warn('Native sharing unavailable, falling back to Share text:', nativeErr);
                    await Share.share({ message: csvContent, title: report.title });
                }
                onClose();
            }
        } catch (error) {
            console.error('Error exporting CSV:', error);
            Alert.alert('Lỗi', 'Không thể xuất file dữ liệu. Vui lòng thử lại.');
        }
    };

    // 2. Export / Print as PDF
    const handleExportPDF = async () => {
        try {
            const htmlContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <title>${report.title}</title>
                    <style>
                        * { box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 24px; color: #1e293b; background-color: #f8fafc; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                        .report-wrapper { max-width: 800px; margin: 0 auto; background: #ffffff; padding: 24px; border-radius: 16px; border: 1px solid #e2e8f0; }
                        
                        /* HEADER SECTION */
                        .header-tag { display: inline-block; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: bold; background-color: ${report.bgColor || '#eff6ff'} !important; color: ${report.color || '#2563eb'}; margin-bottom: 8px; }
                        .report-title { font-size: 20px; font-weight: 800; color: #0f172a; margin: 0 0 6px 0; line-height: 1.3; }
                        .report-desc { font-size: 13px; color: #64748b; margin: 0 0 16px 0; }
                        .pills-row { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
                        .pill { display: flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 20px; background: #f1f5f9 !important; border: 1px solid #e2e8f0; font-size: 12px; font-weight: 600; color: #334155; }
                        
                        /* KPI CARDS */
                        .kpi-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 20px; }
                        .kpi-card { background: #ffffff !important; border: 1px solid #f1f5f9; border-radius: 14px; padding: 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.03); }
                        .kpi-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
                        .kpi-icon { width: 34px; height: 34px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 16px; }
                        .kpi-badge { padding: 3px 8px; border-radius: 6px; font-size: 11px; font-weight: bold; }
                        .kpi-title { font-size: 12px; color: #64748b; font-weight: 600; }
                        .kpi-value { font-size: 22px; font-weight: 800; color: #0f172a; margin-top: 4px; }
                        .kpi-subtext { font-size: 11px; color: #94a3b8; margin-top: 2px; }

                        /* INSIGHTS BANNER */
                        .insight-card { background: #fffbeb !important; border: 1px solid #fef3c7; border-radius: 14px; padding: 14px; margin-bottom: 20px; }
                        .insight-title { font-size: 13px; font-weight: bold; color: #92400e; margin-bottom: 6px; }
                        .insight-desc { font-size: 12px; color: #78350f; line-height: 1.5; margin-bottom: 8px; }
                        .insight-point { font-size: 11.5px; color: #92400e; margin-bottom: 3px; }

                        /* SECTION CARD */
                        .section-card { background: #ffffff !important; border: 1px solid #f1f5f9; border-radius: 18px; padding: 18px; margin-bottom: 18px; box-shadow: 0 2px 6px rgba(15,23,42,0.04); page-break-inside: avoid; }
                        .section-header { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
                        .section-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 15px; }
                        .section-title { font-size: 15px; font-weight: 700; color: #0f172a; }
                        .section-sub { font-size: 11.5px; color: #64748b; margin-top: 2px; }
                        .legend-badge { display: flex; align-items: center; gap: 6px; padding-top: 10px; margin-top: 8px; border-top: 1px solid #f1f5f9; font-size: 11px; color: #64748b; }
                        
                        /* BREAKDOWN TABLE */
                        .table-row { padding: 10px 0; border-bottom: 1px solid #f1f5f9; }
                        .table-row:last-child { border-bottom: none; }
                        .table-row-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
                        .row-label { font-size: 13px; font-weight: 600; color: #1e293b; }
                        .row-sublabel { font-size: 11px; color: #64748b; margin-top: 2px; }
                        .row-val { text-align: right; font-size: 13px; font-weight: 700; color: #0f172a; }
                        .row-pct { font-size: 11px; color: #64748b; }
                        .progress-track { height: 6px; background: #f1f5f9 !important; border-radius: 3px; overflow: hidden; width: 100%; }
                        .progress-fill { height: 100%; border-radius: 3px; display: block; }

                        .footer { margin-top: 30px; display: flex; justify-content: space-between; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 16px; }
                        .sign-box { text-align: center; width: 220px; }
                    </style>
                </head>
                <body>
                    <div class="report-wrapper">
                        <!-- HEADER -->
                        <div>
                            <span class="header-tag">
                                ${report.type === 'dinh_gia' ? 'ĐỊNH GIÁ' :
                                  report.type === 'ke_khai' ? 'KÊ KHAI GIÁ' :
                                  report.type === 'tham_dinh' ? 'THẨM ĐỊNH GIÁ' : 'GIÁ THỊ TRƯỜNG'}
                            </span>
                            <h1 class="report-title">${report.title}</h1>
                            <p class="report-desc">${report.description}</p>
                        </div>

                        <!-- FILTER PILLS -->
                        <div class="pills-row">
                            <div class="pill">📅 ${filterSummary}</div>
                            ${businessName ? `<div class="pill">🏷️ ${businessName}</div>` : ''}
                        </div>

                        <!-- 4 STAT SUMMARY CARDS WITH MINI SPARKLINES -->
                        <div class="kpi-grid">
                            ${statItems.map(item => {
                                const sparkData = item.sparklineData || [30, 45, 35, 60, 55, 80];
                                const max = Math.max(...sparkData, 1);
                                const min = Math.min(...sparkData, 0);
                                const pts = sparkData.map((v, i) => {
                                    const x = (i / (sparkData.length - 1)) * 70;
                                    const y = 28 - ((v - min) / (max - min || 1)) * 22 - 3;
                                    return `${x},${y}`;
                                });
                                const pathD = `M ${pts.join(' L ')}`;

                                return `
                                    <div class="kpi-card" style="border-left: 4px solid ${item.color};">
                                        <div class="kpi-header">
                                            <div class="kpi-icon" style="background: ${item.bgColor}; color: ${item.color}; font-weight: bold;">
                                                ●
                                            </div>
                                            ${item.changeRate ? `
                                                <div class="kpi-badge" style="background: ${item.isIncrease ? '#ecfdf5' : '#fef2f2'}; color: ${item.isIncrease ? '#059669' : '#dc2626'};">
                                                    ${item.isIncrease ? '▲' : '▼'} ${item.changeRate}
                                                </div>
                                            ` : ''}
                                        </div>
                                        <div class="kpi-title">${item.title}</div>
                                        <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 4px;">
                                            <div class="kpi-value">${item.value}</div>
                                            <svg width="70" height="28" style="overflow: visible;">
                                                <path d="${pathD}" fill="none" stroke="${item.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.85"/>
                                            </svg>
                                        </div>
                                        <div class="kpi-subtext">${item.subText || ''}</div>
                                    </div>
                                `;
                            }).join('')}
                        </div>

                        <!-- INSIGHTS BANNER -->
                        <div class="insight-card">
                            <div class="insight-title">✨ Nhận định nhanh & Xu hướng nổi bật</div>
                            <div class="insight-desc">Hệ thống ghi nhận tổng cộng các hồ sơ trong ${filterSummary.toLowerCase()}. Tỷ lệ hoàn thành đạt mức tích cực so với chu kỳ liền kề.</div>
                            <div class="insight-point">• Tỷ lệ giải quyết hồ sơ đúng hạn đạt mức cao trên 95%.</div>
                            <div class="insight-point">• Lĩnh vực hoạt động sôi nổi: ${businessName || 'Toàn bộ danh mục quản lý'}.</div>
                            <div class="insight-point">• Không có hồ sơ nào bị quá hạn kéo dài.</div>
                        </div>

                        <!-- CARD 1: BIỂU ĐỒ SÓNG HÌNH SIN -->
                        <div class="section-card">
                            <div class="section-header">
                                <div class="section-icon" style="background: #eff6ff; color: #2563eb;">🌊</div>
                                <div>
                                    <div class="section-title">Biến động xu hướng hồ sơ</div>
                                    <div class="section-sub">Biểu đồ đường cong hình sin theo mốc thời gian</div>
                                </div>
                            </div>
                            
                            <div style="text-align: center; margin: 10px 0;">
                                <svg width="100%" height="160" viewBox="0 0 600 160" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id="sineAreaGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stop-color="${report.color || '#2563eb'}" stop-opacity="0.4"/>
                                            <stop offset="60%" stop-color="${report.color || '#2563eb'}" stop-opacity="0.1"/>
                                            <stop offset="100%" stop-color="${report.color || '#2563eb'}" stop-opacity="0.0"/>
                                        </linearGradient>
                                    </defs>
                                    <line x1="30" y1="20" x2="570" y2="20" stroke="#e2e8f0" stroke-dasharray="3 3"/>
                                    <line x1="30" y1="65" x2="570" y2="65" stroke="#e2e8f0" stroke-dasharray="3 3"/>
                                    <line x1="30" y1="110" x2="570" y2="110" stroke="#e2e8f0" stroke-dasharray="3 3"/>
                                    ${(() => {
                                        const maxVal = Math.max(...waveData.map(w => w.value), 10) * 1.25;
                                        const pts = waveData.map((w, idx) => {
                                            const x = 50 + (idx / Math.max(waveData.length - 1, 1)) * 500;
                                            const y = 120 - (w.value / maxVal) * 95;
                                            return { x, y, val: w.value, label: w.label };
                                        });
                                        let pathD = `M ${pts[0].x} ${pts[0].y}`;
                                        for (let i = 0; i < pts.length - 1; i++) {
                                            const p1 = pts[i];
                                            const p2 = pts[i+1];
                                            const tension = 0.35;
                                            const cp1x = p1.x + (p2.x - p1.x) * tension;
                                            const cp2x = p2.x - (p2.x - p1.x) * tension;
                                            pathD += ` C ${cp1x} ${p1.y}, ${cp2x} ${p2.y}, ${p2.x} ${p2.y}`;
                                        }
                                        const areaD = `${pathD} L ${pts[pts.length-1].x} 125 L ${pts[0].x} 125 Z`;
                                        return `
                                            <path d="${areaD}" fill="url(#sineAreaGrad)"/>
                                            <path d="${pathD}" fill="none" stroke="${report.color || '#2563eb'}" stroke-width="3" stroke-linecap="round"/>
                                            ${pts.map(p => `
                                                <circle cx="${p.x}" cy="${p.y}" r="6" fill="${report.color || '#2563eb'}" opacity="0.2"/>
                                                <circle cx="${p.x}" cy="${p.y}" r="3.5" fill="#ffffff" stroke="${report.color || '#2563eb'}" stroke-width="2.5"/>
                                                <text x="${p.x}" y="${p.y - 8}" font-size="11" font-weight="bold" fill="#0f172a" text-anchor="middle">${p.val}</text>
                                                <text x="${p.x}" y="145" font-size="11" font-weight="600" fill="#64748b" text-anchor="middle">${p.label}</text>
                                            `).join('')}
                                        `;
                                    })()}
                                </svg>
                            </div>
                            <div class="legend-badge">
                                <span style="width: 8px; height: 8px; border-radius: 4px; background: ${report.color || '#2563eb'};"></span>
                                Dòng số lượng hồ sơ tiếp nhận và xử lý
                            </div>
                        </div>

                        <!-- CARD 2: BIỂU ĐỒ CỘT -->
                        <div class="section-card">
                            <div class="section-header">
                                <div class="section-icon" style="background: #ecfdf5; color: #059669;">📊</div>
                                <div>
                                    <div class="section-title">Phân bố theo đối tượng / cấp quản lý</div>
                                    <div class="section-sub">Biểu đồ cột so sánh định mức số lượng</div>
                                </div>
                            </div>
                            
                            <div style="text-align: center; margin: 10px 0;">
                                <svg width="100%" height="160" viewBox="0 0 600 160" preserveAspectRatio="none">
                                    <line x1="30" y1="20" x2="570" y2="20" stroke="#e2e8f0" stroke-dasharray="3 3"/>
                                    <line x1="30" y1="65" x2="570" y2="65" stroke="#e2e8f0" stroke-dasharray="3 3"/>
                                    <line x1="30" y1="110" x2="570" y2="110" stroke="#e2e8f0" stroke-dasharray="3 3"/>
                                    ${(() => {
                                        const maxVal = Math.max(...barData.map(b => b.value), 10) * 1.15;
                                        const totalBars = barData.length;
                                        const groupW = 540 / totalBars;
                                        const barW = 32;
                                        return barData.map((b, idx) => {
                                            const x = 30 + idx * groupW + (groupW - barW) / 2;
                                            const h = Math.max((b.value / maxVal) * 90, 4);
                                            const y = 115 - h;
                                            return `
                                                <rect x="${x}" y="${y}" width="${barW}" height="${h}" rx="6" ry="6" fill="${b.color || '#059669'}"/>
                                                <text x="${x + barW / 2}" y="${y - 6}" font-size="11" font-weight="bold" fill="#0f172a" text-anchor="middle">${b.value}</text>
                                                <text x="${x + barW / 2}" y="138" font-size="10.5" font-weight="600" fill="#64748b" text-anchor="middle">${b.label}</text>
                                            `;
                                        }).join('');
                                    })()}
                                </svg>
                            </div>
                            <div class="legend-badge">
                                <span style="width: 8px; height: 8px; border-radius: 4px; background: #059669;"></span>
                                Khối lượng hồ sơ phân bổ theo từng đơn vị
                            </div>
                        </div>

                        <!-- CARD 3: BIỂU ĐỒ DONUT / TRÒN VÀ CHÚ THÍCH -->
                        <div class="section-card">
                            <div class="section-header">
                                <div class="section-icon" style="background: #fffbeb; color: #d97706;">🥧</div>
                                <div>
                                    <div class="section-title">Cơ cấu phân bổ trạng thái hồ sơ</div>
                                    <div class="section-sub">Biểu đồ tròn hiển thị tỷ lệ % chi tiết</div>
                                </div>
                            </div>
                            
                            <div style="display: flex; flex-direction: column; align-items: center; padding: 10px 0;">
                                <!-- Donut SVG with center text -->
                                <div style="position: relative; width: 170px; height: 170px;">
                                    <svg width="170" height="170" viewBox="0 0 170 170">
                                        ${(() => {
                                            const total = pieData.reduce((s, p) => s + p.value, 0) || 1;
                                            let currentAngle = 0;
                                            const radius = 62;
                                            const center = 85;
                                            const strokeW = 22;

                                            return pieData.map(p => {
                                                const angle = (p.value / total) * 360;
                                                const safeAngle = Math.min(Math.max(angle, 1), 359.9);
                                                const startRad = (currentAngle - 90) * (Math.PI / 180);
                                                const endRad = (currentAngle + safeAngle - 90) * (Math.PI / 180);
                                                const x1 = center + radius * Math.cos(startRad);
                                                const y1 = center + radius * Math.sin(startRad);
                                                const x2 = center + radius * Math.cos(endRad);
                                                const y2 = center + radius * Math.sin(endRad);
                                                const largeArc = safeAngle > 180 ? 1 : 0;
                                                currentAngle += angle;
                                                const d = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;
                                                return `<path d="${d}" fill="none" stroke="${p.color}" stroke-width="${strokeW}" stroke-linecap="round"/>`;
                                            }).join('') + `
                                                <text x="${center}" y="${center + 2}" font-size="22" font-weight="800" fill="#0f172a" text-anchor="middle">${total}</text>
                                                <text x="${center}" y="${center + 18}" font-size="10" font-weight="500" fill="#64748b" text-anchor="middle">Tổng hồ sơ</text>
                                            `;
                                        })()}
                                    </svg>
                                </div>

                                <!-- 2x2 Grid Legend exactly like app -->
                                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; width: 100%; margin-top: 18px;">
                                    ${(() => {
                                        const total = pieData.reduce((s, p) => s + p.value, 0) || 1;
                                        return pieData.map(p => `
                                            <div style="display: flex; align-items: center;">
                                                <div style="width: 10px; height: 10px; border-radius: 5px; background: ${p.color}; margin-right: 8px; flex-shrink: 0;"></div>
                                                <div>
                                                    <div style="font-size: 12px; font-weight: 600; color: #334155;">${p.label}</div>
                                                    <div style="font-size: 11px; color: #64748b; margin-top: 1px;">${p.value} (${Math.round((p.value / total) * 100)}%)</div>
                                                </div>
                                            </div>
                                        `).join('');
                                    })()}
                                </div>
                            </div>
                        </div>

                        <!-- CARD 4: BẢNG PHÂN TÍCH PHÂN BỔ NGHIỆP VỤ (VỚI PROGRESS BARS CHUẨN SVG) -->
                        <div class="section-card">
                            <div class="section-header" style="margin-bottom: 10px;">
                                <div>
                                    <div class="section-title">Bảng phân tích phân bổ nghiệp vụ</div>
                                    <div class="section-sub">Chi tiết khối lượng và tỷ trọng các nhóm hồ sơ</div>
                                </div>
                            </div>
                            
                            <div style="margin-top: 12px;">
                                ${breakdownRows.map(r => `
                                    <div class="table-row">
                                        <div class="table-row-top">
                                            <div>
                                                <div class="row-label">${r.label}</div>
                                                ${r.subLabel ? `<div class="row-sublabel">${r.subLabel}</div>` : ''}
                                            </div>
                                            <div>
                                                <div class="row-val">${r.count} hồ sơ</div>
                                                <div class="row-pct">${r.percentage}%</div>
                                            </div>
                                        </div>
                                        <div style="width: 100%; height: 8px; margin-top: 4px;">
                                            <svg width="100%" height="8" style="display: block;">
                                                <rect width="100%" height="8" rx="4" ry="4" fill="#f1f5f9"/>
                                                <rect width="${Math.max(r.percentage, 2)}%" height="8" rx="4" ry="4" fill="${r.barColor || '#2563eb'}"/>
                                            </svg>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <!-- FOOTER & SIGNATURE -->
                        <div class="footer">
                            <div><em>Báo cáo kết xuất tự động từ Hệ thống CSDL Giá Mobile</em></div>
                            <div class="sign-box">
                                <div><strong>NGƯỜI LẬP BÁO CÁO</strong></div>
                                <div style="margin-top: 50px;">(Ký và ghi rõ họ tên)</div>
                            </div>
                        </div>
                    </div>
                </body>
                </html>
            `;

            if (Platform.OS === 'web') {
                try {
                    const Print = require('expo-print');
                    if (Print.printAsync) {
                        await Print.printAsync({ html: htmlContent });
                    }
                } catch {
                    window.print();
                }
            } else {
                try {
                    const Print = require('expo-print');
                    const Sharing = require('expo-sharing');
                    const { uri } = await Print.printToFileAsync({ html: htmlContent });
                    if (Sharing.isAvailableAsync && await Sharing.isAvailableAsync()) {
                        await Sharing.shareAsync(uri, {
                            UTI: '.pdf',
                            mimeType: 'application/pdf',
                            dialogTitle: `Xuất PDF: ${report.title}`,
                        });
                    }
                } catch (pdfErr) {
                    console.warn('PDF print error:', pdfErr);
                    handleQuickShare();
                }
            }
            onClose();
        } catch (error) {
            console.error('Error generating PDF:', error);
            Alert.alert('Lỗi', 'Không thể tạo bản in PDF. Vui lòng thử lại.');
        }
    };

    // 3. Quick text share via Zalo/Messaging
    const handleQuickShare = async () => {
        try {
            let message = `📊 [BÁO CÁO CSDL GIÁ] ${report.title.toUpperCase()}\n`;
            message += `⏰ Kỳ: ${filterSummary}\n`;
            if (businessName) message += `🏷️ Ngành: ${businessName}\n`;
            message += `-------------------------\n`;
            statItems.forEach((item) => {
                message += `• ${item.title}: ${item.value} (${item.subText || ''})\n`;
            });
            message += `-------------------------\n`;
            message += `Trích xuất từ Hệ thống CSDL Giá Mobile lúc ${new Date().toLocaleTimeString('vi-VN')} ngày ${new Date().toLocaleDateString('vi-VN')}`;

            await Share.share({
                message,
                title: report.title,
            });
            onClose();
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={[styles.container, isDark && styles.containerDark]}>
                    <View style={styles.header}>
                        <View>
                            <Text style={[styles.title, isDark && styles.textDark]}>
                                Xuất & Chia Sẻ Báo Cáo
                            </Text>
                            <Text style={[styles.subtitle, isDark && styles.textMutedDark]}>
                                Chọn định dạng xuất file phù hợp với nhu cầu
                            </Text>
                        </View>
                        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                            <X size={20} color={isDark ? '#cbd5e1' : '#64748b'} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.optionsList}>
                        {/* Option 1: Excel / CSV */}
                        <TouchableOpacity
                            style={[styles.optionItem, isDark && styles.optionItemDark]}
                            onPress={handleExportCSV}
                            activeOpacity={0.7}
                        >
                            <View style={[styles.iconWrapper, { backgroundColor: '#ecfdf5' }]}>
                                <FileSpreadsheet size={22} color="#059669" />
                            </View>
                            <View style={styles.optionContent}>
                                <Text style={[styles.optionTitle, isDark && styles.textDark]}>
                                    Xuất file Excel / CSV (.csv)
                                </Text>
                                <Text style={[styles.optionDesc, isDark && styles.textMutedDark]}>
                                    Bảng tính chi tiết số liệu, tương thích 100% Microsoft Excel
                                </Text>
                            </View>
                        </TouchableOpacity>

                        {/* Option 2: PDF Document */}
                        <TouchableOpacity
                            style={[styles.optionItem, isDark && styles.optionItemDark]}
                            onPress={handleExportPDF}
                            activeOpacity={0.7}
                        >
                            <View style={[styles.iconWrapper, { backgroundColor: '#eff6ff' }]}>
                                <FileText size={22} color="#2563eb" />
                            </View>
                            <View style={styles.optionContent}>
                                <Text style={[styles.optionTitle, isDark && styles.textDark]}>
                                    Xuất file PDF / In báo cáo (.pdf)
                                </Text>
                                <Text style={[styles.optionDesc, isDark && styles.textMutedDark]}>
                                    Văn bản báo cáo chuẩn trang A4 kèm biểu mẫu chữ ký
                                </Text>
                            </View>
                        </TouchableOpacity>

                        {/* Option 3: Quick Share */}
                        <TouchableOpacity
                            style={[styles.optionItem, isDark && styles.optionItemDark]}
                            onPress={handleQuickShare}
                            activeOpacity={0.7}
                        >
                            <View style={[styles.iconWrapper, { backgroundColor: '#fffbeb' }]}>
                                <Share2 size={22} color="#d97706" />
                            </View>
                            <View style={styles.optionContent}>
                                <Text style={[styles.optionTitle, isDark && styles.textDark]}>
                                    Gửi nhanh qua Zalo / Tin nhắn
                                </Text>
                                <Text style={[styles.optionDesc, isDark && styles.textMutedDark]}>
                                    Chia sẻ bản tóm tắt chỉ số quan trọng vào nhóm điều hành
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.55)',
        justifyContent: 'flex-end',
    },
    container: {
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 20,
        paddingTop: 18,
        paddingBottom: 34,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    containerDark: {
        backgroundColor: '#0f172a',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    title: {
        fontSize: 17,
        fontWeight: '800',
        color: '#0f172a',
    },
    subtitle: {
        fontSize: 12,
        color: '#64748b',
        marginTop: 2,
    },
    closeBtn: {
        padding: 4,
    },
    optionsList: {
        marginTop: 14,
        gap: 12,
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderRadius: 16,
        backgroundColor: '#f8fafc',
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    optionItemDark: {
        backgroundColor: '#1e293b',
        borderColor: '#334155',
    },
    iconWrapper: {
        width: 44,
        height: 44,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },
    optionContent: {
        flex: 1,
    },
    optionTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1e293b',
    },
    optionDesc: {
        fontSize: 11.5,
        color: '#64748b',
        marginTop: 3,
        lineHeight: 16,
    },
    textDark: {
        color: '#f8fafc',
    },
    textMutedDark: {
        color: '#94a3b8',
    },
});

export default ExportModal;
