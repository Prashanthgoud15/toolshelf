export const cn = (...parts) => parts.filter(Boolean).join(' ');

const NEW_DAYS = 14;

export const isNew = (tool) => {
  if (!tool.addedAt) return false;
  const added = new Date(tool.addedAt).getTime();
  if (Number.isNaN(added)) return false;
  return Date.now() - added < NEW_DAYS * 24 * 60 * 60 * 1000;
};

export const isMac = () =>
  typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

export const matchesQuery = (tool, query) => {
  if (!query) return true;
  const hay = [tool.name, tool.tagline, tool.description, tool.category, ...(tool.tags || [])]
    .join(' ')
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => hay.includes(word));
};

export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }
}
