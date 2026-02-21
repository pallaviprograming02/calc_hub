export const shareUrl = async (title, text, url) => {
    if (navigator.share) {
        try {
            await navigator.share({ title, text, url });
            return true;
        } catch { }
    }
    // Fallback: copy URL to clipboard
    try {
        await navigator.clipboard.writeText(url || window.location.href);
        return true;
    } catch {
        return false;
    }
};
