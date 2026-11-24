#!/usr/bin/env python3
"""
PFSchools - Technical Documentation Report Generator (DOCX)
Converts TECHNICAL_DOCUMENTATION_REPORT.md to a formatted Word document.
"""

from docx import Document
from docx.shared import Inches, Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.style import WD_STYLE_TYPE
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
import re

def add_page_break(doc):
    doc.add_page_break()

def set_cell_shading(cell, color):
    shading_elm = OxmlElement('w:shd')
    shading_elm.set(qn('w:fill'), color)
    shading_elm.set(qn('w:val'), 'clear')
    cell._tc.get_or_add_tcPr().append(shading_elm)

def create_styles(doc):
    """Create custom styles for the document."""
    style = doc.styles['Normal']
    font = style.font
    font.name = 'Calibri'
    font.size = Pt(11)
    font.color.rgb = RGBColor(0x33, 0x33, 0x33)
    style.paragraph_format.space_after = Pt(6)
    style.paragraph_format.line_spacing = 1.15

    # Heading 1
    h1 = doc.styles['Heading 1']
    h1.font.name = 'Calibri'
    h1.font.size = Pt(22)
    h1.font.bold = True
    h1.font.color.rgb = RGBColor(0x1a, 0x1a, 0x2e)
    h1.paragraph_format.space_before = Pt(24)
    h1.paragraph_format.space_after = Pt(12)

    # Heading 2
    h2 = doc.styles['Heading 2']
    h2.font.name = 'Calibri'
    h2.font.size = Pt(16)
    h2.font.bold = True
    h2.font.color.rgb = RGBColor(0x2c, 0x3e, 0x50)
    h2.paragraph_format.space_before = Pt(18)
    h2.paragraph_format.space_after = Pt(8)

    # Heading 3
    h3 = doc.styles['Heading 3']
    h3.font.name = 'Calibri'
    h3.font.size = Pt(13)
    h3.font.bold = True
    h3.font.color.rgb = RGBColor(0x34, 0x49, 0x5e)
    h3.paragraph_format.space_before = Pt(12)
    h3.paragraph_format.space_after = Pt(6)

def add_horizontal_line(doc):
    """Add a thin horizontal line."""
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(6)
    p.paragraph_format.space_after = Pt(6)
    pPr = p._p.get_or_add_pPr()
    pBdr = OxmlElement('w:pBdr')
    bottom = OxmlElement('w:bottom')
    bottom.set(qn('w:val'), 'single')
    bottom.set(qn('w:sz'), '6')
    bottom.set(qn('w:space'), '1')
    bottom.set(qn('w:color'), 'CCCCCC')
    pBdr.append(bottom)
    pPr.append(pBdr)

def add_bullet(doc, text, level=0, bold_prefix=None):
    """Add a bullet point, optionally with a bold prefix."""
    p = doc.add_paragraph(style='List Bullet')
    p.paragraph_format.left_indent = Cm(1.27 + level * 0.63)
    if bold_prefix:
        run = p.add_run(bold_prefix)
        run.bold = True
        run.font.size = Pt(11)
        if text:
            run = p.add_run(text)
            run.font.size = Pt(11)
    else:
        if text:
            run = p.add_run(text)
            run.font.size = Pt(11)
    return p

def add_table(doc, headers, rows, col_widths=None):
    """Add a formatted table."""
    table = doc.add_table(rows=1 + len(rows), cols=len(headers))
    table.style = 'Light Shading Accent 1'
    table.autofit = True

    # Header row
    for i, header in enumerate(headers):
        cell = table.rows[0].cells[i]
        cell.text = ''
        run = cell.paragraphs[0].add_run(header)
        run.bold = True
        run.font.size = Pt(10)
        run.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
        set_cell_shading(cell, '2C3E50')

    # Data rows
    for r_idx, row in enumerate(rows):
        for c_idx, val in enumerate(row):
            cell = table.rows[r_idx + 1].cells[c_idx]
            cell.text = ''
            run = cell.paragraphs[0].add_run(str(val))
            run.font.size = Pt(10)
            if r_idx % 2 == 1:
                set_cell_shading(cell, 'F2F4F4')

    return table

def parse_markdown_to_docx(md_path, docx_path):
    doc = Document()
    create_styles(doc)

    # ===== COVER PAGE =====
    for _ in range(6):
        doc.add_paragraph('')

    # Title
    title_p = doc.add_paragraph()
    title_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = title_p.add_run('PFSchools')
    run.font.size = Pt(48)
    run.font.bold = True
    run.font.color.rgb = RGBColor(0x1a, 0x1a, 0x2e)

    subtitle_p = doc.add_paragraph()
    subtitle_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = subtitle_p.add_run('Comprehensive Technical\nDocumentation Report')
    run.font.size = Pt(28)
    run.font.color.rgb = RGBColor(0x2c, 0x3e, 0x50)

    add_horizontal_line(doc)

    date_p = doc.add_paragraph()
    date_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = date_p.add_run('Generated: June 17, 2026')
    run.font.size = Pt(14)
    run.font.color.rgb = RGBColor(0x7f, 0x8c, 0x8d)

    platform_p = doc.add_paragraph()
    platform_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = platform_p.add_run('Online Learning Platform for Kids')
    run.font.size = Pt(12)
    run.font.color.rgb = RGBColor(0x7f, 0x8c, 0x8d)

    doc.add_page_break()

    # ===== TABLE OF CONTENTS =====
    doc.add_heading('Table of Contents', level=1)
    add_horizontal_line(doc)

    toc_items = [
        "1. Backend CMS / Platform",
        "2. Admin Accounts & Access",
        "3. Hosting & Deployment Information",
        "4. Languages & Frameworks",
        "5. Database Details",
        "6. Source Code Repositories",
        "7. Backup Procedures",
        "8. Maintenance & Continuity Notes",
        "9. Technical Notes",
        "10. Summary"
    ]
    for item in toc_items:
        p = doc.add_paragraph(item)
        p.paragraph_format.space_after = Pt(4)
        p.runs[0].font.size = Pt(12)
        p.runs[0].font.color.rgb = RGBColor(0x2c, 0x3e, 0x50)

    doc.add_page_break()

    # ===== Read and parse markdown file =====
    with open(md_path, 'r') as f:
        content = f.read()

    # Split by sections (## headings)
    sections = re.split(r'\n(?=##\s)', content)

    section_num = 0
    for section in sections:
        lines = section.strip().split('\n')
        if not lines:
            continue

        first_line = lines[0].strip()

        # Skip the main title and TOC sections  
        if first_line.startswith('# ') or first_line.startswith('## Table of Contents'):
            continue

        # Skip the Summary section (handled separately at end? Actually include everything)
        
        # Determine heading level
        if first_line.startswith('### '):
            # Sub-section
            heading_text = first_line.replace('### ', '').strip()
            doc.add_heading(heading_text, level=3)
            lines = lines[1:]
        elif first_line.startswith('## '):
            # Main section
            heading_text = first_line.replace('## ', '').strip()
            # Extract section number for clean heading
            clean_heading = re.sub(r'^\d+\.\s*', '', heading_text)
            numeric_prefix = re.match(r'^(\d+)', heading_text)
            if numeric_prefix:
                section_num = int(numeric_prefix.group(1))
            doc.add_heading(clean_heading, level=2)
            lines = lines[1:]
        else:
            # Top-level title - skip
            continue

        # Process content lines
        in_code_block = False
        code_lines = []
        in_table = False
        table_lines = []

        for line in lines:
            stripped = line.strip()

            # Skip horizontal rules
            if stripped.startswith('---') or stripped.startswith('***'):
                add_horizontal_line(doc)
                continue

            # Code blocks
            if stripped.startswith('```'):
                if in_code_block:
                    # End of code block
                    in_code_block = False
                    p = doc.add_paragraph()
                    p.paragraph_format.left_indent = Cm(1)
                    for cl in code_lines:
                        run = p.add_run(cl + '\n')
                        run.font.name = 'Consolas'
                        run.font.size = Pt(9)
                        run.font.color.rgb = RGBColor(0x2c, 0x3e, 0x50)
                    code_lines = []
                else:
                    in_code_block = True
                continue

            if in_code_block:
                code_lines.append(stripped)
                continue

            # Handle tables (detect by pipe and separator)
            if '|' in stripped and stripped.startswith('|'):
                # Check if it's a separator row
                if re.match(r'^[\|\s\-:]+$', stripped):
                    continue
                # Check if next line is a table row
                table_lines.append(stripped)
                continue
            else:
                # If we were collecting table lines, render the table
                if table_lines:
                    rows_data = []
                    for tl in table_lines:
                        cells = [c.strip() for c in tl.split('|')[1:-1]]
                        rows_data.append(cells)
                    if rows_data:
                        add_table(doc, rows_data[0], rows_data[1:])
                    table_lines = []
                    continue

            # Handle regular content
            if not stripped:
                doc.add_paragraph('')
                continue

            # Check for list items
            if stripped.startswith('- ') or stripped.startswith('* '):
                text = stripped[2:]
                # Check for bold prefix like **text**
                bold_match = re.match(r'\*\*(.+?)\*\*\s*—?\s*(.*)', text)
                if bold_match:
                    add_bullet(doc, bold_match.group(2), bold_prefix=bold_match.group(1) + ' - ')
                elif '**' in text:
                    parts = text.split('**')
                    p = doc.add_paragraph(style='List Bullet')
                    run = p.add_run(parts[0])
                    run.font.size = Pt(11)
                    for i in range(1, len(parts)):
                        if i % 2 == 1:
                            run = p.add_run(parts[i])
                            run.bold = True
                            run.font.size = Pt(11)
                        else:
                            run = p.add_run(parts[i])
                            run.font.size = Pt(11)
                else:
                    add_bullet(doc, text)
                continue

            # Check for numbered list
            num_match = re.match(r'^\d+\.\s+(.*)', stripped)
            if num_match:
                p = doc.add_paragraph()
                p.paragraph_format.left_indent = Cm(1.27)
                run = p.add_run(num_match.group(1))
                run.font.size = Pt(11)
                continue

            # Check for bold prefixed lines like **Word:** text
            bold_prefix = re.match(r'\*\*(.+?)\*\*\s*(.*)', stripped)
            if bold_prefix and bold_prefix.group(2):
                p = doc.add_paragraph()
                run = p.add_run(bold_prefix.group(1) + ' ')
                run.bold = True
                run.font.size = Pt(11)
                run = p.add_run(bold_prefix.group(2))
                run.font.size = Pt(11)
                continue

            # Regular paragraph - handle inline bold
            p = doc.add_paragraph()
            parts = re.split(r'(\*\*.*?\*\*)', stripped)
            for part in parts:
                if part.startswith('**') and part.endswith('**'):
                    run = p.add_run(part[2:-2])
                    run.bold = True
                    run.font.size = Pt(11)
                else:
                    run = p.add_run(part)
                    run.font.size = Pt(11)

    # ===== Add footer to document =====
    for section in doc.sections:
        footer = section.footer
        footer.is_linked_to_previous = False
        p = footer.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        run = p.add_run('PFSchools — Technical Documentation Report | June 2026 | Confidential')
        run.font.size = Pt(8)
        run.font.color.rgb = RGBColor(0x95, 0xa5, 0xa6)

    doc.save(docx_path)
    print(f"Word document saved to: {docx_path}")

if __name__ == '__main__':
    import os
    script_dir = os.path.dirname(os.path.abspath(__file__))
    md_file = os.path.join(script_dir, 'TECHNICAL_DOCUMENTATION_REPORT.md')
    docx_file = os.path.join(script_dir, 'PFSchools_Technical_Documentation_Report.docx')
    parse_markdown_to_docx(md_file, docx_file)