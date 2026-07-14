/**
 * Generate a standalone HTML file by cloning the preview DOM
 * and inlining all computed styles.
 *
 * @param {object} matchData - reactive match data (used for title)
 * @returns {string} complete HTML document
 */
export function generateStandaloneHtml(matchData) {
  // Find the preview element
  const previewEl = document.querySelector('.bg-white.preview-text')
  if (!previewEl) {
    return '<!DOCTYPE html><html><body><p>预览未加载</p></body></html>'
  }

  // Deep clone the preview
  const clone = previewEl.cloneNode(true)

  // Inline all computed styles
  inlineStyles(previewEl, clone)

  const title = `${matchData.homeTeam || 'A'} vs ${matchData.awayTeam || 'B'} — ${matchData.matchName || '战报'}`

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    :root {
      --color-theme-blue: #3498db;
      --color-sub-green: #2ecc71;
      --color-sub-red: #e74c3c;
      --color-warning-yellow: #f1c40f;
      --color-white: #ffffff;
    }

    .preview-text {
      font-family: 'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', sans-serif;
    }

    .score-number {
      font-family: 'DIN Alternate', 'Consolas', monospace;
      font-weight: 700;
    }

    .timeline-vertical-line {
      border-left: 2px solid var(--color-theme-blue);
    }

    .event-card {
      background-color: var(--color-theme-blue);
      color: var(--color-white);
      border-radius: 6px;
      padding: 4px 12px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 14px;
      white-space: nowrap;
    }

    .time-node {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: var(--color-theme-blue);
      color: var(--color-white);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-family: 'DIN Alternate', 'Consolas', monospace;
      font-weight: 700;
      flex-shrink: 0;
    }

    .connection-line {
      width: 16px;
      height: 0;
      border-top: 2px solid var(--color-theme-blue);
      flex-shrink: 0;
    }

    body {
      display: flex;
      justify-content: center;
      background: #f3f4f6;
      padding: 20px;
    }
  </style>
</head>
<body>
  <div style="width: 1080px; background: white; padding: 40px 60px;">
    ${clone.outerHTML}
  </div>
</body>
</html>`
}

/**
 * Recursively inline computed styles from source to target element.
 */
function inlineStyles(source, target) {
  const computed = window.getComputedStyle(source)

  // Key styles to inline (skip defaults/browser-specific)
  const importantProps = [
    'display', 'flex-direction', 'align-items', 'justify-content',
    'gap', 'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
    'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
    'width', 'height', 'min-height', 'max-width',
    'font-size', 'font-weight', 'font-family', 'text-align', 'color',
    'background', 'background-color', 'border', 'border-radius', 'border-top',
    'border-right', 'border-bottom', 'border-left', 'border-color',
    'line-height', 'letter-spacing', 'white-space', 'overflow',
    'position', 'top', 'right', 'bottom', 'left',
    'transform', 'z-index', 'opacity',
    'row-gap', 'column-gap', 'grid-template-columns',
  ]

  const styleArr = []
  for (const prop of importantProps) {
    const val = computed.getPropertyValue(prop)
    if (val && val !== 'normal' && val !== 'auto' && val !== 'rgba(0, 0, 0, 0)' && val !== 'transparent') {
      // Convert to kebab-case for inline style
      const kebab = prop.replace(/([A-Z])/g, '-$1').toLowerCase()
      styleArr.push(`${kebab}: ${val}`)
    }
  }

  if (styleArr.length > 0) {
    target.setAttribute('style', styleArr.join('; '))
  }

  // Recurse into children
  const srcChildren = source.children
  const tgtChildren = target.children
  for (let i = 0; i < srcChildren.length; i++) {
    if (i < tgtChildren.length) {
      inlineStyles(srcChildren[i], tgtChildren[i])
    }
  }
}
