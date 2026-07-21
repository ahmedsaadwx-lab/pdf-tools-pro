/**
 * Document Scanner Logic
 * Isolated from the main script.js
 */

/**
 * Handles the selected/pasted image for the scanner
 * @param {File} file
 */
function handleScannerFile(file) {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const previewImage = document.getElementById('scannerPreviewImage');
        const previewArea = document.getElementById('scannerPreviewArea');
        const dropzone = document.getElementById('uploadDropzone');
        const canvas = document.getElementById('scannerCanvas');

        if (previewArea && dropzone) {
            previewArea.classList.remove('hidden');
            dropzone.classList.add('hidden');

            // Meta info
            const fileNameEl = document.getElementById('scannerFileName');
            const fileSizeEl = document.getElementById('scannerFileSize');
            const dimensionsEl = document.getElementById('scannerDimensions');

            if (fileNameEl) fileNameEl.textContent = file.name || 'Pasted Image';

            // formatFileSize is global from script.js
            if (fileSizeEl) {
                if (typeof formatFileSize === 'function') {
                    fileSizeEl.textContent = formatFileSize(file.size);
                } else {
                    fileSizeEl.textContent = (file.size / 1024 / 1024).toFixed(2) + ' MB';
                }
            }

            const img = new Image();
            img.onload = () => {
                if (dimensionsEl) dimensionsEl.textContent = `${img.width} x ${img.height}`;

                // Phase 2 preparation: Draw to canvas if it exists
                if (canvas) {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                }

                // Also update preview image if it exists (Phase 1 logic)
                if (previewImage) {
                    previewImage.src = e.target.result;
                }
            };
            img.src = e.target.result;
        }
    };
    reader.readAsDataURL(file);
}

// Paste support for scanner
window.addEventListener('paste', (event) => {
    if (window.location.pathname.includes('scanner.html')) {
        const items = (event.clipboardData || event.originalEvent.clipboardData).items;
        for (const item of items) {
            if (item.type.indexOf('image') !== -1) {
                const file = item.getAsFile();
                handleScannerFile(file);
                break;
            }
        }
    }
});

// UI Event Listeners for Scanner Page
document.addEventListener('DOMContentLoaded', () => {
    if (!window.location.pathname.includes('scanner.html')) return;

    const replaceImageButton = document.getElementById('replaceImageButton');
    const clearImageButton = document.getElementById('clearImageButton');
    const autoDetectBtn = document.getElementById('autoDetectButton');
    const fInput = document.getElementById('fileInput');

    if (replaceImageButton) {
        replaceImageButton.addEventListener('click', () => {
            if (fInput) fInput.click();
        });
    }

    if (clearImageButton) {
        clearImageButton.addEventListener('click', () => {
            const previewArea = document.getElementById('scannerPreviewArea');
            const dropzone = document.getElementById('uploadDropzone');
            const previewImage = document.getElementById('scannerPreviewImage');
            const canvas = document.getElementById('scannerCanvas');

            if (previewArea && dropzone) {
                previewArea.classList.add('hidden');
                dropzone.classList.remove('hidden');
                if (previewImage) previewImage.src = '';
                if (canvas) {
                    const ctx = canvas.getContext('2d');
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                }
                if (fInput) fInput.value = '';

                const correctedArea = document.getElementById('correctedArea');
                if (correctedArea) correctedArea.classList.add('hidden');
            }
        });
    }

    // Specific file input listener for scanner page
    if (fInput) {
        fInput.addEventListener('change', () => {
            const file = fInput.files[0];
            if (file && supportedImageTypes.includes(file.type)) {
                handleScannerFile(file);
            } else if (file) {
                if (typeof showToast === 'function') {
                    showToast('يرجى اختيار صورة صالحة (JPG, PNG, WEBP).', 'error');
                }
            }
        });
    }

    if (autoDetectBtn) {
        autoDetectBtn.addEventListener('click', () => {
            if (typeof cv !== 'undefined') {
                if (typeof showToast === 'function') showToast('OpenCV is working!');
            } else {
                if (typeof showToast === 'function') showToast('OpenCV is not loaded yet.', 'error');
            }
        });
    }
});

// OpenCV status hooks
function onOpenCvReady() {
    const statusEl = document.getElementById('opencvStatus');
    if (statusEl) {
        statusEl.textContent = 'OpenCV.js Ready';
        statusEl.classList.remove('loading');
        statusEl.classList.add('ready');
    }
    const autoDetectBtn = document.getElementById('autoDetectButton');
    if (autoDetectBtn) autoDetectBtn.disabled = false;
    console.log('OpenCV.js is ready.');
}

function onOpenCvError() {
    const statusEl = document.getElementById('opencvStatus');
    if (statusEl) {
        statusEl.textContent = 'OpenCV.js failed to load';
        statusEl.classList.remove('loading');
        statusEl.classList.add('error');
    }
    console.error('OpenCV.js failed to load.');
}
