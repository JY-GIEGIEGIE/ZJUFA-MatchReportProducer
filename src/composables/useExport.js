import { ref, nextTick } from 'vue'
import domtoimage from 'dom-to-image-more'
import { generateStandaloneHtml } from '../utils/htmlExporter.js'

/**
 * Export composable: image capture via dom-to-image-more,
 * standalone HTML generation, and batch export.
 *
 * @param {object} options
 * @param {import('vue').Ref} options.previewElRef - template ref to the preview root element
 * @param {object} options.matchData - reactive match data
 * @param {object} options.draftManager - draft manager composable
 */
export function useExport({ previewElRef, matchData, draftManager }) {
  const isExporting = ref(false)
  const exportProgress = ref({ current: 0, total: 0 })

  /**
   * Export current preview as a PNG image.
   */
  async function exportImage(filename) {
    if (!previewElRef?.value) {
      console.warn('Preview element not found for export')
      return
    }

    isExporting.value = true
    await nextTick()

    // Wait for fonts
    if (document.fonts?.ready) {
      await document.fonts.ready
    }

    try {
      const dataUrl = await domtoimage.toPng(previewElRef.value, {
        bgColor: '#FFFFFF',
        width: 1080,
        quality: 1,
        scale: 2,  // retina
      })

      // Trigger download
      const link = document.createElement('a')
      link.download = filename || `战报_${matchData.homeTeam || 'A'}-vs-${matchData.awayTeam || 'B'}_${matchData.date || Date.now()}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Export image failed:', err)
      alert('导出图片失败，请重试。')
    } finally {
      isExporting.value = false
    }
  }

  /**
   * Export current match data as a standalone HTML file.
   */
  async function exportHtml(filename) {
    isExporting.value = true

    try {
      const html = generateStandaloneHtml(matchData)
      const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.download = filename || `战报_${matchData.homeTeam || 'A'}-vs-${matchData.awayTeam || 'B'}_${matchData.date || Date.now()}.html`
      link.href = url
      link.click()

      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Export HTML failed:', err)
      alert('导出 HTML 失败，请重试。')
    } finally {
      isExporting.value = false
    }
  }

  /**
   * Batch export: iterate draft IDs, load each, capture image.
   */
  async function batchExport(draftIds) {
    if (!draftIds || draftIds.length === 0) return

    isExporting.value = true
    exportProgress.value = { current: 0, total: draftIds.length }

    // Save current draft first
    draftManager.saveDraft()

    for (let i = 0; i < draftIds.length; i++) {
      const id = draftIds[i]
      exportProgress.value = { current: i + 1, total: draftIds.length }

      // Load the draft
      const loaded = draftManager.loadDraft(id)
      if (!loaded) continue

      await nextTick()
      await new Promise(r => setTimeout(r, 300))  // let DOM settle

      const title = `${matchData.homeTeam || 'A'}-vs-${matchData.awayTeam || 'B'}_${matchData.date || id.slice(0, 8)}.png`
      await exportImage(title)
    }

    isExporting.value = false
    alert(`批量导出完成！共导出 ${draftIds.length} 张战报。`)
  }

  return {
    isExporting,
    exportProgress,
    exportImage,
    exportHtml,
    batchExport,
  }
}
