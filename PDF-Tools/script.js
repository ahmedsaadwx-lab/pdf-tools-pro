const navToggle = document.getElementById('navToggle');
const navMenuMain = document.getElementById('navMenuMain');
const langSwitcher = document.getElementById('langSwitcher');
const langButton = document.getElementById('langButton');
const langMenu = document.getElementById('langMenu');
const langItems = langMenu ? langMenu.querySelectorAll('[data-lang]') : [];
const uploadButton = document.getElementById('uploadButton');
const uploadArea = document.getElementById('uploadArea');
const uploadDropzone = document.getElementById('uploadDropzone');
const fileInput = document.getElementById('fileInput');
const imageToPdfCard = document.querySelector('.tool-card[data-action="imageToPdf"]');
const supportedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
const downloadPdfButton = document.getElementById('downloadPdfButton');
const imagePreviewContainer = document.getElementById('imagePreviewContainer');
const resultsContainer = document.getElementById('resultsContainer');
const downloadAllButton = document.getElementById('downloadAllButton');
const clearSelectionButton = document.getElementById('clearSelectionButton');
const visualRemovePanel = document.getElementById('visualRemovePanel');
const pagesContainer = document.getElementById('pagesContainer');
const selectedCountDisplay = document.getElementById('selectedCount');
const executeRemoveButton = document.getElementById('executeRemoveButton');

// Split PDF Globals
const selectedCountSplitDisplay = document.getElementById('selectedCountSplit');
const executeSplitButton = document.getElementById('executeSplitButton');
const clearSplitSelectionButton = document.getElementById('clearSplitSelectionButton');
const visualSplitPanel = document.getElementById('visualSplitPanel');

let generatedPdfBlob = null;
let generatedPdfName = '';
let generatedPdfBlobs = [];
let selectedImageFiles = [];
let mergeFilesQueue = [];
let pagesToRemove = new Set();
let selectedPagesForSplit = new Set();
let currentPdfFile = null;

const mergeButton = document.getElementById('mergeButton');
const compressButton = document.getElementById('compressButton');
const previewButton = document.getElementById('previewButton');
const convertButton = document.getElementById('convertButton');
const clearResultsButton = document.getElementById('clearResultsButton');
const mergeFileList = document.getElementById('mergeFileList');
const previewModal = document.getElementById('previewModal');
const previewClose = document.getElementById('previewClose');
const previewFrame = document.getElementById('previewFrame');
const themeToggle = document.getElementById('themeToggle');
let mergeMode = false;
let compressMode = false;
let previewMode = false;
let splitMode = false;
let removeMode = false;
const fileNameDisplay = document.getElementById('fileName');
const fileSizeDisplay = document.getElementById('fileSize');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const progressPercent = document.getElementById('progressPercent');
const faqItems = document.querySelectorAll('.faq-item');

const translations = {
  en: {
    brandText: 'PDF Tools Pro',
    navTools: 'PDF Tools',
    navTestimonials: 'Testimonials',
    navFaq: 'FAQ',
    themeToggle: 'Dark/Light',
    heroEyebrow: '100% Free PDF Tools',
    heroTitle: 'Convert, merge, compress, and manage PDFs with enterprise-grade speed.',
    heroDescription: 'PDF Tools Pro offers an all-in-one PDF workflow for teams, freelancers, and ambitious creators. Enjoy premium conversions, powerful compression, and intuitive file control. Always free, no account required.',
    heroPrimary: 'Explore tools',
    heroBadge: 'Trusted conversion suite',
    heroUptime: 'uptime',
    heroCardText: 'Accelerate your file work with secure uploads and lightning-fast downloads.',
    heroFeature1: 'Fast convert',
    heroFeatureText1: 'Images, Word, and documents.',
    heroFeature2: 'Secure export',
    heroFeatureText2: 'Data safe with advanced encryption.',
    toolsEyebrow: 'PDF Tools',
    toolsTitle: 'Free tools for every PDF workflow.',
    toolImageToPdfTitle: 'Image to PDF',
    toolImageToPdfText: 'Convert JPG, PNG, and scanned images into ready-to-share PDF files.',
    toolPdfToWordTitle: 'PDF to Word',
    toolPdfToWordText: 'Export editable Word documents while keeping formatting intact.',
    toolWordToPdfTitle: 'Word to PDF',
    toolWordToPdfText: 'Save Word files as polished PDFs optimized for modern sharing.',
    toolMergePdfTitle: 'Merge PDF',
    toolMergePdfText: 'Combine multiple files into one elegant PDF package.',
    toolSplitPdfTitle: 'Split PDF',
    toolSplitPdfText: 'Extract pages and create custom documents with ease.',
    toolCompressPdfTitle: 'Compress PDF',
    toolCompressPdfText: 'Shrink files fast without sacrificing professional quality.',
    toolRemovePagesTitle: 'Remove PDF Pages',
    toolRemovePagesText: 'Delete unwanted pages and keep only the content that matters.',
    toolPdfToJpgTitle: 'PDF to JPG',
    toolPdfToJpgText: 'Export sharp images from PDF pages for quick previews and shareable assets.',
    toolScannerTitle: 'Document Scanner',
    toolScannerText: 'Scan documents using your camera or upload images for processing.',
    uploadEyebrow: 'Drag & drop ready',
    uploadTitle: 'Upload files instantly and see progress in real time.',
    uploadText: 'Drop your documents or browse from your device. File size and upload status are updated automatically.',
    uploadButton: 'Upload files',
    uploadHint: 'Supports PDF, JPG, PNG up to 20MB.',
    uploadDropzone: 'Drag files here or click upload',
    fileNameLabel: 'Selected file',
    fileSizeLabel: 'File size',
    progressText: 'Waiting for upload…',
    uploadDone: 'Upload complete',
    whyEyebrow: 'Why Choose Us',
    whyTitle: 'Built for performance, security, and modern conversion workflows.',
    whyFastTitle: 'Fast conversion',
    whyFastText: 'Instant results with optimized engines that keep your process moving.',
    whySecurityTitle: 'Military-grade security',
    whySecurityText: 'Encrypted transfers and secure storage for every document upload.',
    whyAiTitle: 'AI-powered optimization',
    whyAiText: 'Smart compression and formatting tools reduce manual cleanup.',
    whyCloudTitle: 'Cloud processing',
    whyCloudText: 'Scale without limits using fast cloud-based document handling.',
    whyFreeTitle: '100% Free',
    whyFreeText: 'All tools are available at no cost, with no registration required.',
    statsFiles: '10M+',
    statsFilesText: 'files converted',
    statsUsers: '500K+',
    statsUsersText: 'users',
    statsUptime: '99.9%',
    statsUptimeText: 'uptime',
    statsGlobal: 'Global',
    statsGlobalText: 'availability',
    downloadPdfButton: 'Download PDF',
    testimonialsEyebrow: 'Testimonials',
    testimonialsTitle: 'Loved by creators and teams worldwide.',
    testimonialText1: '"The fastest PDF experience I have used. Results are flawless."',
    testimonialName1: 'Aya M. — Product Manager',
    testimonialText2: '"A polished toolset that makes converting and sharing documents effortless."',
    testimonialName2: 'Luis G. — Freelance Designer',
    testimonialText3: '"Premium UI and smart automation saved us time managing reports."',
    testimonialName3: 'Emre T. — Operations Lead',
    faqEyebrow: 'FAQ',
    faqTitle: 'Frequently asked questions about PDF Tools Pro.',
    faqQuestion1: 'Can I use PDF Tools Pro for free?',
    faqAnswer1: 'Yes. All our tools are completely free and do not require an account.',
    faqQuestion2: 'Is file upload secure?',
    faqAnswer2: 'Absolutely. We use encrypted processing to keep your documents protected.',
    faqQuestion3: 'Do you support batch uploads?',
    faqAnswer3: 'Yes. You can process multiple files with our optimized tools.',
    adPlaceholder: 'AdSense-ready premium placement',
    footerBrand: 'PDF Tools Pro',
    footerCopy: 'Secure, fast, and elegant PDF tools. 100% Free.',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    footerContact: 'Contact'
  },
  ar: {
    brandText: 'بي دي إف تولز برو',
    navTools: 'أدوات PDF',
    navTestimonials: 'آراء العملاء',
    navFaq: 'الأسئلة الشائعة',
    themeToggle: 'داكن/فاتح',
    heroEyebrow: 'أدوات PDF مجانية 100%',
    heroTitle: 'حوّل، ادمج، ضغط، ونظم ملفات PDF بسرعة احترافية.',
    heroDescription: 'PDF Tools Pro توفر سير عمل متكامل للفِرق، المستقلين، والمبدعين. استمتع بتحويلات عالية الجودة وتجربة استخدام متقدمة. مجاني دائماً، بدون حساب.',
    heroPrimary: 'استعرض الأدوات',
    heroBadge: 'مجموعة تحويل موثوقة',
    heroUptime: 'جاهزية',
    heroCardText: 'سرّع عمل ملفاتك برفع آمن وتنزيلات سريعة.',
    heroFeature1: 'تحويل سريع',
    heroFeatureText1: 'صور، Word، والمستندات.',
    heroFeature2: 'تصدير آمن',
    heroFeatureText2: 'بيانات محمية مع تشفير متقدم.',
    toolsEyebrow: 'أدوات PDF',
    toolsTitle: 'أدوات مجانية لكل مهام PDF.',
    toolImageToPdfTitle: 'صورة إلى PDF',
    toolImageToPdfText: 'حوّل JPG و PNG إلى ملفات PDF جاهزة للمشاركة.',
    toolPdfToWordTitle: 'PDF إلى Word',
    toolPdfToWordText: 'استخرج مستندات Word قابلة للتعديل بنفس التنسيق.',
    toolWordToPdfTitle: 'Word إلى PDF',
    toolWordToPdfText: 'احفظ ملفات Word كـ PDF احترافية للمشاركة الحديثة.',
    toolMergePdfTitle: 'دمج PDF',
    toolMergePdfText: 'ادمج ملفات متعددة في PDF واحد أنيق.',
    toolSplitPdfTitle: 'تقسيم PDF',
    toolSplitPdfText: 'استخرج الصفحات التي تحتاجها بسهولة.',
    toolCompressPdfTitle: 'ضغط PDF',
    toolCompressPdfText: 'قلّل حجم الملفات بسرعة دون فقدان الجودة.',
    toolRemovePagesTitle: 'حذف صفحات PDF',
    toolRemovePagesText: 'احذف الصفحات غير المرغوب فيها واحتفظ بالمحتوى المهم.',
    toolPdfToJpgTitle: 'PDF إلى JPG',
    toolPdfToJpgText: 'استخرج صور عالية الجودة من صفحات PDF.',
    toolScannerTitle: 'ماسح المستندات',
    toolScannerText: 'قم برفع صورة أو استخدام الكاميرا لمسح المستندات ضوئياً.',
    uploadEyebrow: 'جاهز للسحب والإفلات',
    uploadTitle: 'حمّل الملفات فوراً وشاهد التقدم في الوقت الحقيقي.',
    uploadText: 'ضع مستنداتك هنا أو اختر من جهازك. يتم تحديث حجم الملف وحالته تلقائياً.',
    uploadButton: 'رفع الملفات',
    uploadHint: 'يدعم PDF, JPG, PNG حتى 20 ميغابايت.',
    uploadDropzone: 'اسحب الملفات هنا أو انقر للرفع',
    fileNameLabel: 'اسم الملف',
    fileSizeLabel: 'حجم الملف',
    progressText: 'في انتظار الرفع…',
    uploadDone: 'اكتمل الرفع',
    whyEyebrow: 'لماذا تختارنا',
    whyTitle: 'مصمم للأداء والأمان وسير العمل الحديث.',
    whyFastTitle: 'تحويل سريع',
    whyFastText: 'نتائج فورية بمحركات محسّنة تحافظ على تقدمك.',
    whySecurityTitle: 'أمان عسكري',
    whySecurityText: 'نقل مشفر وتخزين آمن لكل مستند.',
    whyAiTitle: 'تحسين بالذكاء الاصطناعي',
    whyAiText: 'ضغط ذكي وأدوات تنسيق تقلل العمل اليدوي.',
    whyCloudTitle: 'معالجة سحابية',
    whyCloudText: 'قم بالتوسّع دون حدود باستخدام معالجة سريعة في السحابة.',
    whyFreeTitle: 'مجاني 100%',
    whyFreeText: 'جميع وظائف PDF متاحة مجاناً، ولا تتطلب إنشاء حساب.',
    statsFiles: '10 مليون+',
    statsFilesText: 'ملف تم تحويله',
    statsUsers: '500 ألف+',
    statsUsersText: 'مستخدم',
    statsUptime: '99.9%',
    statsUptimeText: 'جاهزية',
    statsGlobal: 'عالمي',
    statsGlobalText: 'التوفر',
    downloadPdfButton: 'تحميل PDF',
    testimonialsEyebrow: 'آراء العملاء',
    testimonialsTitle: 'محبوب من قبل المبدعين والفرق حول العالم.',
    testimonialText1: '"أسرع تجربة PDF استخدمتها والنتائج مثالية."',
    testimonialName1: 'آية م. — مديرة منتج',
    testimonialText2: '"مجموعة أدوات محترفة تجعل التحويل والمشاركة سهلاً."',
    testimonialName2: 'لويس ج. — مصمم مستقل',
    testimonialText3: '"واجهة مميزة وفرّت علينا وقت إدارة التقارير."',
    testimonialName3: 'أمر ت. — مدير عمليات',
    faqEyebrow: 'الأسئلة الشائعة',
    faqTitle: 'أسئلة متكررة حول PDF Tools Pro.',
    faqQuestion1: 'هل يمكنني استخدام PDF Tools Pro مجاناً؟',
    faqAnswer1: 'نعم. جميع أدواتنا مجانية تماماً ولا تتطلب إنشاء حساب.',
    faqQuestion2: 'هل رفع الملفات آمن؟',
    faqAnswer2: 'بالطبع. نستخدم معالجة مشفرة لحماية المستندات.',
    faqQuestion3: 'هل تدعمون رفع دفعات كبيرة؟',
    faqAnswer3: 'نعم. يمكنك معالجة ملفات متعددة باستخدام أدواتنا المحمنة.',
    adPlaceholder: 'مكان جاهز للإعلانات من Google AdSense',
    footerBrand: 'بي دي إف تولز برو',
    footerCopy: 'أدوات PDF آمنة وسريعة وأنيقة. مجانية 100%.',
    privacyPolicy: 'سياسة الخصوصية',
    termsOfService: 'شروط الخدمة',
    footerContact: 'Contact'
  }
};

function updateLanguage(language) {
  const isRtl = language === 'ar';
  document.documentElement.lang = language;
  document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  document.body.classList.toggle('rtl', isRtl);

  const selected = translations[language] || translations.en;
  Object.entries(selected).forEach(([key, value]) => {
    const elements = document.querySelectorAll(`[data-key="${key}"]`);
    elements.forEach(element => {
        element.textContent = value;
    });
  });
}

function updateProgress(percent, message) {
  if (progressFill) progressFill.style.width = `${percent}%`;
  if (progressPercent) progressPercent.textContent = `${percent}%`;
  if (progressText) progressText.textContent = message;
}

function resetPreviewGrid() {
  if (!imagePreviewContainer) return;
  imagePreviewContainer.innerHTML = '';
}

function renderImagePreviews(files) {
  resetPreviewGrid();
  if (!imagePreviewContainer) return;

  const clearButton = document.getElementById('clearSelectionButton');
  const convertButton = document.getElementById('convertButton');
  if (clearButton) clearButton.hidden = files.length === 0;
  if (convertButton) convertButton.hidden = files.length === 0;

  files.forEach((file, index) => {
    const reader = new FileReader();
    reader.onload = () => {
      const wrapper = document.createElement('div');
      wrapper.className = 'image-preview-item';
      wrapper.draggable = true;
      wrapper.dataset.index = index;
      const fileType = (file.type || '').split('/')[1]?.toUpperCase() || 'IMAGE';
      const fileSizeLabel = `${(file.size / 1024 / 1024).toFixed(2)} MB`;
      const fileName = file.name || `Image ${index + 1}`;
      wrapper.innerHTML = `
        <img class="image-preview-thumb" src="${reader.result}" alt="${fileName}" />
        <div class="image-preview-meta">
          <strong>${fileName}</strong>
          <span><span class="image-meta-badge">${fileSizeLabel}</span><span class="image-meta-badge">${fileType}</span></span>
        </div>
        <div class="image-preview-actions">
          <button class="button button-outline" type="button" data-action="move-up">تحريك لأعلى</button>
          <button class="button button-outline" type="button" data-action="move-down">تحريك لأسفل</button>
          <button class="button image-preview-delete" type="button" data-action="remove">حذف</button>
        </div>
      `;

      wrapper.addEventListener('dragstart', (event) => {
        event.dataTransfer?.setData('text/plain', String(index));
        wrapper.classList.add('dragging');
      });
      wrapper.addEventListener('dragend', () => wrapper.classList.remove('dragging'));
      wrapper.addEventListener('dragover', (event) => {
        event.preventDefault();
        wrapper.classList.add('dragging');
      });
      wrapper.addEventListener('dragleave', () => wrapper.classList.remove('dragging'));
      wrapper.addEventListener('drop', (event) => {
        event.preventDefault();
        const fromIndex = Number(event.dataTransfer?.getData('text/plain') || index);
        const toIndex = index;
        if (fromIndex !== toIndex) {
          const nextFiles = [...selectedImageFiles];
          const [moved] = nextFiles.splice(fromIndex, 1);
          nextFiles.splice(toIndex, 0, moved);
          selectedImageFiles = nextFiles;
          renderImagePreviews(selectedImageFiles);
        }
        wrapper.classList.remove('dragging');
      });

      wrapper.querySelectorAll('button[data-action]').forEach((button) => {
        button.addEventListener('click', (event) => {
          event.stopPropagation();
          const action = button.getAttribute('data-action');
          if (action === 'remove') {
            const nextFiles = selectedImageFiles.filter((_, itemIndex) => itemIndex !== index);
            selectedImageFiles = nextFiles;
            renderImagePreviews(selectedImageFiles);
          }
          if (action === 'move-up' && index > 0) {
            const nextFiles = [...selectedImageFiles];
            [nextFiles[index - 1], nextFiles[index]] = [nextFiles[index], nextFiles[index - 1]];
            selectedImageFiles = nextFiles;
            renderImagePreviews(selectedImageFiles);
          }
          if (action === 'move-down' && index < selectedImageFiles.length - 1) {
            const nextFiles = [...selectedImageFiles];
            [nextFiles[index], nextFiles[index + 1]] = [nextFiles[index + 1], nextFiles[index]];
            selectedImageFiles = nextFiles;
            renderImagePreviews(selectedImageFiles);
          }
        });
      });

      imagePreviewContainer.appendChild(wrapper);
    };
    reader.readAsDataURL(file);
  });
}

function getConversionMode() {
  if (document.querySelector('input[name="conversionMode"]')) {
    return document.querySelector('input[name="conversionMode"]:checked')?.value || 'single';
  }
  return 'single';
}

function getPageSettings() {
  const pageSizeSelect = document.getElementById('pageSizeSelect');
  const orientationInput = document.querySelector('input[name="pageOrientation"]:checked');
  return {
    pageSize: pageSizeSelect?.value || 'a4',
    orientation: orientationInput?.value || 'portrait'
  };
}

function getPdfConfigForImage(img, pageSize, orientation) {
  const portrait = orientation === 'portrait';
  if (pageSize === 'auto') {
    const width = Math.max(240, Math.round(img.width));
    const height = Math.max(320, Math.round(img.height));
    return {
      unit: 'px',
      format: portrait ? [width, height] : [height, width]
    };
  }

  const format = pageSize === 'letter' ? 'letter' : 'a4';
  return {
    unit: 'px',
    format,
    orientation: portrait ? 'p' : 'l'
  };
}

function createPdfFromImages(files, options = {}) {
  const { mode = getConversionMode(), pageSize = getPageSettings().pageSize, orientation = getPageSettings().orientation } = options;

  if (mode === 'separate') {
    return Promise.all(files.map((file) => createSinglePdfFromImage(file, { pageSize, orientation })));
  }

  return createSinglePdfFromImage(files, { pageSize, orientation });
}

function createSinglePdfFromImage(fileOrFiles, { pageSize, orientation } = {}) {
  const files = Array.isArray(fileOrFiles) ? fileOrFiles : [fileOrFiles];
  if (!files.length) return Promise.resolve([]);

  return new Promise((resolve, reject) => {
    let currentPdf = null;
    const imageFiles = files;
    let completed = 0;

    const buildPdf = () => {
      if (completed >= imageFiles.length) {
        const blob = currentPdf.output('blob');
        resolve(blob);
        return;
      }

      const file = imageFiles[completed];
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const pageConfig = getPdfConfigForImage(img, pageSize, orientation);
          if (!currentPdf) {
            currentPdf = new window.jspdf.jsPDF(pageConfig);
          } else {
            currentPdf.addPage(pageConfig.format, pageConfig.orientation || 'p');
          }

          const pageWidth = currentPdf.internal.pageSize.getWidth();
          const pageHeight = currentPdf.internal.pageSize.getHeight();
          const ratio = Math.min(pageWidth / img.width, pageHeight / img.height);
          const imgWidth = img.width * ratio;
          const imgHeight = img.height * ratio;
          const x = (pageWidth - imgWidth) / 2;
          const y = (pageHeight - imgHeight) / 2;
          const prepared = prepareImageData(img, file.type);
          currentPdf.addImage(prepared.data, prepared.type, x, y, imgWidth, imgHeight);

          completed += 1;
          const percent = Math.min(100, Math.round((completed / imageFiles.length) * 100));
          updateProgress(percent, `Converting ${completed}/${imageFiles.length} images...`);
          buildPdf();
        };
        img.onerror = () => reject(new Error('Unable to parse image file.'));
        img.src = reader.result;
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    };

    buildPdf();
  });
}

function prepareImageData(img, fileType) {
  if (fileType === 'image/png') {
    return { data: img, type: 'PNG' };
  }
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  return { data: canvas.toDataURL('image/jpeg', 0.92), type: 'JPEG' };
}

function renderMergeFileList(files) {
  if (!mergeFileList) return;
  mergeFileList.innerHTML = '';
  if (!files.length) {
    mergeFileList.innerHTML = '<div class="upload-hint">لم يتم اختيار ملفات PDF بعد.</div>';
    return;
  }

  const list = document.createElement('div');
  list.className = 'merge-file-list';
  files.forEach((file, index) => {
    const item = document.createElement('div');
    item.className = 'merge-file-item';
    item.draggable = true;
    item.innerHTML = `
      <div class="merge-file-info">
        <span class="merge-file-name">${file.name}</span>
        <span class="merge-file-meta">${(file.size / 1024 / 1024).toFixed(2)} MB</span>
      </div>
      <div class="merge-file-actions">
        <button class="button button-outline" type="button" data-action="move-up">أعلى</button>
        <button class="button button-outline" type="button" data-action="move-down">أسفل</button>
        <button class="button merge-file-delete" type="button" data-action="remove">حذف</button>
      </div>
    `;

    item.addEventListener('dragstart', (event) => {
      event.dataTransfer?.setData('text/plain', String(index));
      item.classList.add('dragging');
    });
    item.addEventListener('dragend', () => item.classList.remove('dragging'));
    item.addEventListener('dragover', (event) => {
      event.preventDefault();
      item.classList.add('dragging');
    });
    item.addEventListener('dragleave', () => item.classList.remove('dragging'));
    item.addEventListener('drop', (event) => {
      event.preventDefault();
      const fromIndex = Number(event.dataTransfer?.getData('text/plain') || index);
      if (fromIndex !== index) {
        const reordered = [...mergeFilesQueue];
        const [moved] = reordered.splice(fromIndex, 1);
        reordered.splice(index, 0, moved);
        mergeFilesQueue = reordered;
        renderMergeFileList(mergeFilesQueue);
      }
      item.classList.remove('dragging');
    });

    item.querySelectorAll('button[data-action]').forEach((button) => {
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        const action = button.getAttribute('data-action');
        if (action === 'remove') {
          mergeFilesQueue = mergeFilesQueue.filter((_, itemIndex) => itemIndex !== index);
          renderMergeFileList(mergeFilesQueue);
        }
        if (action === 'move-up' && index > 0) {
          const reordered = [...mergeFilesQueue];
          [reordered[index - 1], reordered[index]] = [reordered[index], reordered[index - 1]];
          mergeFilesQueue = reordered;
          renderMergeFileList(mergeFilesQueue);
        }
        if (action === 'move-down' && index < mergeFilesQueue.length - 1) {
          const reordered = [...mergeFilesQueue];
          [reordered[index], reordered[index + 1]] = [reordered[index + 1], reordered[index]];
          mergeFilesQueue = reordered;
          renderMergeFileList(mergeFilesQueue);
        }
      });
    });

    list.appendChild(item);
  });
  mergeFileList.appendChild(list);
}

async function mergePdfFiles(files) {
  if (!files.length) {
    showToast('يرجى اختيار ملفات PDF أولاً.', 'error');
    return;
  }

  updateProgress(0, 'جاري الدمج...');
  if (mergeButton) mergeButton.disabled = true;
  try {
    const mergedPdf = await PDFLib.PDFDocument.create();
    let completed = 0;
    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const sourcePdf = await PDFLib.PDFDocument.load(arrayBuffer);
      const copiedPages = await mergedPdf.copyPages(sourcePdf, sourcePdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
      completed += 1;
      updateProgress(Math.round((completed / files.length) * 100), `جاري دمج ${completed}/${files.length}`);
    }

    const mergedBytes = await mergedPdf.save();
    const blob = new Blob([mergedBytes], { type: 'application/pdf' });
    generatedPdfBlob = blob;
    generatedPdfName = 'merged-files.pdf';
    if (downloadPdfButton) downloadPdfButton.hidden = false;
    showToast('تم دمج الملفات بنجاح.', 'success');
  } catch (error) {
    console.error(error);
    showToast('فشل الدمج. يرجى التأكد من صحة ملفات PDF.', 'error');
  } finally {
    if (mergeButton) mergeButton.disabled = false;
  }
}

function handleFile(fileList) {
  if (!fileList || fileList.length === 0) return;

  const isRemovePage = window.location.pathname.includes('remove-pages.html');
  const isSplitPage = window.location.pathname.includes('split-pdf.html');
  const isCompressPage = window.location.pathname.includes('compress-pdf.html');
  const isWordToPdfPage = window.location.pathname.includes('word-to-pdf.html');
  const isPdfToWordPage = window.location.pathname.includes('pdf-to-word.html');
  const isScannerPage = window.location.pathname.includes('scanner.html');

  if (isScannerPage) {
    const file = fileList[0];
    if (supportedImageTypes.includes(file.type)) {
      handleScannerFile(file);
    } else {
      showToast('يرجى اختيار صورة صالحة (JPG, PNG, WEBP).', 'error');
    }
    return;
  }

  if (mergeMode) {
    mergeMode = false;
    fileInput.multiple = false;
    mergeFiles(Array.from(fileList));
    return;
  }

  if (splitMode || removeMode || isRemovePage || isSplitPage) {
    const isRemoving = removeMode || isRemovePage;
    splitMode = false;
    removeMode = false;
    fileInput.multiple = false;
    const file = fileList[0];
    if (isRemovePage) {
        renderPdfPagesForRemoval(file);
    } else if (isSplitPage) {
        renderPdfPagesForSplit(file);
    } else {
        showSplitPanel(file, isRemoving);
    }
    return;
  }

  if (previewMode) {
    previewMode = false;
    fileInput.multiple = false;
    showPreview(fileList[0]);
    return;
  }

  if (compressMode || isCompressPage) {
    compressMode = false;
    fileInput.multiple = false;
    compressPdf(fileList[0]);
    return;
  }

  if (isWordToPdfPage) {
    fileInput.multiple = false;
    if (fileList.length !== 1) {
      updateProgress(0, 'Please upload one DOCX file.');
      showToast('Please upload one DOCX file.');
      return;
    }
    convertWordToPdf(fileList[0]);
    return;
  }

  if (isPdfToWordPage) {
    fileInput.multiple = false;
    if (fileList.length !== 1) {
      updateProgress(0, 'Please upload one PDF file.');
      showToast('Please upload one PDF file.');
      return;
    }
    convertPdfToWord(fileList[0]);
    return;
  }

  const files = Array.from(fileList);
  const isMergePage = Boolean(document.getElementById('mergeFileList'));
  if (isMergePage) {
    const pdfFiles = files.filter((file) => file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf'));
    if (!pdfFiles.length) {
      showToast('يرجى اختيار ملفات PDF فقط.', 'error');
      return;
    }
    mergeFilesQueue = [...mergeFilesQueue, ...pdfFiles];
    renderMergeFileList(mergeFilesQueue);
    if (mergeButton) mergeButton.hidden = false;
    if (clearSelectionButton) clearSelectionButton.hidden = false;
    updateProgress(0, 'تمت إضافة الملفات');
    return;
  }

  const images = files.filter((file) => supportedImageTypes.includes(file.type));
  const isImageToolPage = Boolean(document.getElementById('convertButton'));

  if (isImageToolPage) {
    const nextFiles = [...selectedImageFiles, ...images];
    selectedImageFiles = nextFiles;
    renderImagePreviews(selectedImageFiles);
    updateProgress(0, 'Images ready for conversion');
    if (downloadPdfButton) downloadPdfButton.hidden = true;
    if (progressText) progressText.textContent = 'Images ready for conversion';
    if (progressPercent) progressPercent.textContent = '0%';
    if (progressFill) progressFill.style.width = '0%';
    return;
  }

  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  if (fileNameDisplay) fileNameDisplay.textContent = images.length > 1 ? `${images.length} images selected` : files[0].name;
  if (fileSizeDisplay) fileSizeDisplay.textContent = `${(totalSize / 1024 / 1024).toFixed(2)} MB`;
  updateProgress(0, 'Preparing images...');
  resetPreviewGrid();
  generatedPdfBlob = null;
  generatedPdfName = '';
  if (downloadPdfButton) downloadPdfButton.hidden = true;

  if (images.length > 0 && images.length === files.length) {
    renderImagePreviews(images);
    selectedImageFiles = images;
    createPdfFromImages(images)
      .then((blob) => {
        generatedPdfBlob = blob;
        generatedPdfName = `images-${Date.now()}.pdf`;
        if (downloadPdfButton) downloadPdfButton.hidden = false;
        showToast('Your PDF is ready for download.');
      })
      .catch((error) => {
        console.error(error);
        updateProgress(0, 'Conversion failed');
        showToast('Failed to convert images. Please try again.');
      });
    return;
  }

  const file = files[0];
  const sizeMB = (file.size / 1024 / 1024).toFixed(2);
  if (fileNameDisplay) fileNameDisplay.textContent = file.name;
  if (fileSizeDisplay) fileSizeDisplay.textContent = `${sizeMB} MB`;
  if (progressText) progressText.textContent = translations[document.documentElement.lang].progressText;
  if (progressPercent) progressPercent.textContent = '0%';
  if (progressFill) progressFill.style.width = '0%';

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 8) + 4;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      if (progressText) progressText.textContent = translations[document.documentElement.lang].uploadDone || 'Upload complete';
      if (supportedImageTypes.includes(file.type)) {
        createPdfFromImages([file])
          .then((blob) => {
            generatedPdfBlob = blob;
            generatedPdfName = file.name.replace(/\.(jpg|jpeg|png|webp)$/i, '.pdf');
            if (downloadPdfButton) downloadPdfButton.hidden = false;
            showToast('Your PDF is ready for download.');
          })
          .catch((error) => {
            console.error(error);
            updateProgress(0, 'Conversion failed');
            showToast('Failed to convert image. Please try again.');
          });
      } else {
        showToast('File ready. For more actions use the tool buttons.');
      }
    }
    if (progressFill) progressFill.style.width = `${progress}%`;
    if (progressPercent) progressPercent.textContent = `${progress}%`;
  }, 200);
}

// Split UI handlers
const splitPanel = document.getElementById('splitPanel');
const splitRangesInput = document.getElementById('splitRanges');
const splitExtractButton = document.getElementById('splitExtractButton');
const splitCancelButton = document.getElementById('splitCancelButton');

function showSplitPanel(file, invert = false) {
  if (!splitPanel) return showToast('Split UI unavailable');
  splitPanel.classList.remove('hidden');
  splitRangesInput.value = '';
  // load pdf to inform pages
  PDFLib.PDFDocument.load(file.arrayBuffer()).then((pdf) => {
    const count = pdf.getPageCount ? pdf.getPageCount() : pdf.getPages().length;
    splitRangesInput.placeholder = `1-${count}`;
  }).catch(() => {});

  splitExtractButton.onclick = async () => {
    const raw = splitRangesInput.value.trim();
    if (!raw) return showToast('يرجى إدخال نطاق صفحات.');
    const ranges = raw.split(',').map(part => {
      if (part.includes('-')) {
        const [s,e] = part.split('-').map(n=>parseInt(n.trim(),10));
        return { start: s, end: e };
      }
      const p = parseInt(part.trim(),10);
      return { start: p, end: p };
    }).filter(r => Number.isFinite(r.start) && Number.isFinite(r.end));
    if (!ranges.length) return showToast('نطاق غير صالح.');
    try {
      splitPanel.classList.add('hidden');
      updateProgress(5, invert ? 'Removing pages...' : 'Extracting pages...');
      const blob = await extractPagesFromPdf(file, ranges, invert);
      generatedPdfBlob = blob;
      generatedPdfName = `${invert ? 'modified' : 'extracted'}-${Date.now()}.pdf`;
      if (downloadPdfButton) downloadPdfButton.hidden = false;
      // preview
      const url = URL.createObjectURL(blob);
      previewFrame.src = url;
      previewModal.style.display = 'grid';
      previewModal.setAttribute('aria-hidden', 'false');
      showToast(invert ? 'Pages removed — preview ready' : 'Pages extracted — preview ready');
    } catch (err) {
      console.error(err);
      showToast('Action failed');
    }
  };

  splitCancelButton.onclick = () => {
    splitPanel.classList.add('hidden');
  };
}

// Visual Removal Logic
async function renderPdfPagesForRemoval(file) {
    if (!file) return;
    currentPdfFile = file;
    pagesToRemove.clear();
    if (selectedCountDisplay) selectedCountDisplay.textContent = '0';

    updateProgress(10, 'جاري معالجة صفحات الملف...');
    try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const pageCount = pdf.numPages;

        const visualRemovePanel = document.getElementById('visualRemovePanel');
        const pagesContainer = document.getElementById('pagesContainer');
        const uploadDropzone = document.getElementById('uploadDropzone');

        if (uploadDropzone) uploadDropzone.classList.add('hidden');
        if (visualRemovePanel) visualRemovePanel.classList.remove('hidden');
        if (pagesContainer) pagesContainer.innerHTML = '';

        for (let i = 1; i <= pageCount; i++) {
            const page = await pdf.getPage(i);
            const viewport = page.getViewport({ scale: 0.3 });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            await page.render({ canvasContext: context, viewport }).promise;

            const pageItem = document.createElement('div');
            pageItem.className = 'page-item';
            pageItem.dataset.pageIndex = i - 1;

            const img = document.createElement('img');
            img.src = canvas.toDataURL();

            const label = document.createElement('div');
            label.className = 'page-label';
            label.textContent = `صفحة ${i}`;

            pageItem.appendChild(img);
            pageItem.appendChild(label);

            pageItem.addEventListener('click', () => {
                const idx = i - 1;
                if (pagesToRemove.has(idx)) {
                    pagesToRemove.delete(idx);
                    pageItem.classList.remove('selected');
                } else {
                    pagesToRemove.add(idx);
                    pageItem.classList.add('selected');
                }
                if (selectedCountDisplay) selectedCountDisplay.textContent = pagesToRemove.size;
            });

            pagesContainer.appendChild(pageItem);
            updateProgress(Math.round((i / pageCount) * 100), `جاري عرض الصفحة ${i} من ${pageCount}`);
        }
        updateProgress(100, 'تم تحميل الصفحات بنجاح.');
    } catch (error) {
        console.error('Error rendering PDF:', error);
        showToast('فشل في تحميل صفحات الملف.');
    }
}

// Visual Split Logic
async function renderPdfPagesForSplit(file) {
    if (!file) return;
    currentPdfFile = file;
    selectedPagesForSplit.clear();
    if (selectedCountSplitDisplay) selectedCountSplitDisplay.textContent = '0';

    updateProgress(10, 'جاري معالجة صفحات الملف للتقسيم...');
    try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const pageCount = pdf.numPages;

        const pagesContainer = document.getElementById('pagesContainer');
        const uploadDropzone = document.getElementById('uploadDropzone');

        if (uploadDropzone) uploadDropzone.classList.add('hidden');
        if (visualSplitPanel) visualSplitPanel.classList.remove('hidden');
        if (pagesContainer) pagesContainer.innerHTML = '';

        for (let i = 1; i <= pageCount; i++) {
            const page = await pdf.getPage(i);
            const viewport = page.getViewport({ scale: 0.3 });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            await page.render({ canvasContext: context, viewport }).promise;

            const pageItem = document.createElement('div');
            pageItem.className = 'page-item';
            pageItem.dataset.pageIndex = i - 1;

            const img = document.createElement('img');
            img.src = canvas.toDataURL();

            const label = document.createElement('div');
            label.className = 'page-label';
            label.textContent = `صفحة ${i}`;

            pageItem.appendChild(img);
            pageItem.appendChild(label);

            pageItem.addEventListener('click', () => {
                const idx = i - 1;
                if (selectedPagesForSplit.has(idx)) {
                    selectedPagesForSplit.delete(idx);
                    pageItem.classList.remove('selected');
                } else {
                    selectedPagesForSplit.add(idx);
                    pageItem.classList.add('selected');
                }
                if (selectedCountSplitDisplay) selectedCountSplitDisplay.textContent = selectedPagesForSplit.size;
            });

            pagesContainer.appendChild(pageItem);
            updateProgress(Math.round((i / pageCount) * 100), `جاري عرض الصفحة ${i} من ${pageCount}`);
        }
        updateProgress(100, 'تم تحميل الصفحات بنجاح.');
    } catch (error) {
        console.error('Error rendering PDF:', error);
        showToast('فشل في تحميل صفحات الملف.');
    }
}

if (executeSplitButton) {
    executeSplitButton.addEventListener('click', async () => {
        if (!currentPdfFile || selectedPagesForSplit.size === 0) {
            return showToast('يرجى تحديد صفحة واحدة على الأقل للاستخراج.');
        }

        try {
            updateProgress(20, 'جاري إنشاء ملف PDF جديد...');
            const arrayBuffer = await currentPdfFile.arrayBuffer();
            const sourcePdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
            const totalPages = sourcePdfDoc.getPageCount();

            const newPdfDoc = await PDFLib.PDFDocument.create();
            const keepIndices = Array.from(selectedPagesForSplit).sort((a, b) => a - b);

            const copiedPages = await newPdfDoc.copyPages(sourcePdfDoc, keepIndices);
            copiedPages.forEach((page) => newPdfDoc.addPage(page));

            const pdfBytes = await newPdfDoc.save();
            generatedPdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
            generatedPdfName = `extracted-${Date.now()}.pdf`;

            if (downloadPdfButton) downloadPdfButton.hidden = false;
            updateProgress(100, 'تم استخراج الصفحات بنجاح. الملف جاهز للتحميل.');
            showToast('تمت العملية بنجاح.');
        } catch (error) {
            console.error('Error splitting PDF:', error);
            showToast('حدث خطأ أثناء معالجة الملف.');
        }
    });
}

if (clearSplitSelectionButton) {
    clearSplitSelectionButton.addEventListener('click', () => {
        selectedPagesForSplit.clear();
        if (selectedCountSplitDisplay) selectedCountSplitDisplay.textContent = '0';
        const pageItems = document.querySelectorAll('.page-item');
        pageItems.forEach(item => item.classList.remove('selected'));
        showToast('تم مسح التحديد.');
    });
}

if (executeRemoveButton) {
    executeRemoveButton.addEventListener('click', async () => {
        if (!currentPdfFile || pagesToRemove.size === 0) {
            return showToast('يرجى تحديد صفحة واحدة على الأقل لحذفها.');
        }

        try {
            updateProgress(20, 'جاري إنشاء ملف PDF جديد...');
            const arrayBuffer = await currentPdfFile.arrayBuffer();
            const sourcePdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
            const totalPages = sourcePdfDoc.getPageCount();

            if (pagesToRemove.size >= totalPages) {
                return showToast('لا يمكن حذف جميع صفحات الملف.');
            }

            // Create a new PDF document using pdf-lib
            const newPdfDoc = await PDFLib.PDFDocument.create();

            // Identify pages to keep (all indices NOT in pagesToRemove)
            const keepIndices = [];
            for (let i = 0; i < totalPages; i++) {
                if (!pagesToRemove.has(i)) {
                    keepIndices.push(i);
                }
            }

            // Copy the pages we want to keep into the new document
            const copiedPages = await newPdfDoc.copyPages(sourcePdfDoc, keepIndices);
            copiedPages.forEach((page) => newPdfDoc.addPage(page));

            const pdfBytes = await newPdfDoc.save();
            generatedPdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
            generatedPdfName = `modified-${Date.now()}.pdf`;

            if (downloadPdfButton) downloadPdfButton.hidden = false;
            updateProgress(100, 'تمت إزالة الصفحات بنجاح. الملف جاهز للتحميل.');
            showToast('تمت العملية بنجاح.');
        } catch (error) {
            console.error('Error removing pages:', error);
            showToast('حدث خطأ أثناء معالجة الملف.');
        }
    });
}

const clearSelectionButtonRemoval = document.getElementById('clearSelectionButton');
if (clearSelectionButtonRemoval && window.location.pathname.includes('remove-pages.html')) {
    clearSelectionButtonRemoval.addEventListener('click', () => {
        pagesToRemove.clear();
        if (selectedCountDisplay) selectedCountDisplay.textContent = '0';
        const pageItems = document.querySelectorAll('.page-item');
        pageItems.forEach(item => item.classList.remove('selected'));
        showToast('تم مسح التحديد.');
    });
}

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenuMain.classList.toggle('open');
  });
}

if (langButton && langSwitcher) {
  langButton.addEventListener('click', () => {
    langSwitcher.classList.toggle('open');
    langButton.setAttribute('aria-expanded', langSwitcher.classList.contains('open'));
  });
}

if (langItems.length) {
  langItems.forEach((item) => {
    item.addEventListener('click', () => {
      const selectedLang = item.dataset.lang;
      if (selectedLang && langButton && langSwitcher) {
        langButton.textContent = item.textContent;
        langSwitcher.classList.remove('open');
        langButton.setAttribute('aria-expanded', 'false');
        updateLanguage(selectedLang);
      }
    });
  });
}

if (langSwitcher && langButton) {
  window.addEventListener('click', (event) => {
    if (!langSwitcher.contains(event.target)) {
      langSwitcher.classList.remove('open');
      langButton.setAttribute('aria-expanded', 'false');
    }
  });
}

const uploadTargets = [uploadButton, uploadDropzone];
uploadTargets.forEach((target) => {
  target?.addEventListener('click', (event) => {
    event.stopPropagation();
    if (window.location.pathname.includes('remove-pages.html')) {
        removeMode = true;
    }
    fileInput.click();
  });
});

if (imageToPdfCard) {
  imageToPdfCard.style.cursor = 'pointer';
  imageToPdfCard.addEventListener('click', () => {
    fileInput.multiple = true;
    fileInput.value = '';
    fileInput.click();
  });
}

if (downloadPdfButton) {
  downloadPdfButton.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (generatedPdfBlobs.length) {
      generatedPdfBlobs.forEach(({ blob, name }) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      });
      return;
    }
    if (!generatedPdfBlob) return;
    const url = URL.createObjectURL(generatedPdfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = generatedPdfName || 'images.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });
}

if (mergeButton) {
  mergeButton.addEventListener('click', (event) => {
    event.stopPropagation();
    mergePdfFiles(mergeFilesQueue);
  });
}

if (clearSelectionButton) {
  clearSelectionButton.addEventListener('click', (event) => {
    event.stopPropagation();
    mergeFilesQueue = [];
    renderMergeFileList(mergeFilesQueue);
    if (mergeButton) mergeButton.hidden = true;
    if (clearSelectionButton) clearSelectionButton.hidden = true;
    if (downloadPdfButton) downloadPdfButton.hidden = true;
    updateProgress(0, 'تمت إزالة جميع الملفات');
  });
}

function displayJpgResults() {
  if (!resultsContainer) return;
  resultsContainer.innerHTML = '';

  if (!generatedPdfBlobs || generatedPdfBlobs.length === 0) return;

  generatedPdfBlobs.forEach((item, index) => {
    const url = URL.createObjectURL(item.blob);
    item.url = url;

    const wrapper = document.createElement('div');
    wrapper.className = 'result-item';
    wrapper.style.textAlign = 'center';
    wrapper.style.marginBottom = '20px';

    const img = document.createElement('img');
    img.src = url;
    img.alt = `Page ${index + 1}`;
    img.style.maxWidth = '100%';
    img.style.borderRadius = '8px';
    img.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';

    const label = document.createElement('div');
    label.textContent = `Page ${index + 1}`;
    label.style.marginTop = '8px';
    label.style.fontSize = '14px';
    label.style.fontWeight = 'bold';

    wrapper.appendChild(img);
    wrapper.appendChild(label);
    resultsContainer.appendChild(wrapper);
  });

  if (downloadAllButton) downloadAllButton.hidden = false;
  if (clearResultsButton) clearResultsButton.hidden = false;
}

if (convertButton) {
  convertButton.addEventListener('click', (event) => {
    event.stopPropagation();

    if (window.location.pathname.includes('pdf-to-jpg.html')) {
      const file = fileInput.files[0];
      if (!file) return showToast('Please select a PDF file first.');

      convertPdfToJpg(file).then(async (pdf) => {
        if (!pdf) return;

        if (resultsContainer) resultsContainer.innerHTML = '';
        generatedPdfBlobs.forEach(item => {
          if (item.url) URL.revokeObjectURL(item.url);
        });
        generatedPdfBlobs = [];

        const pageCount = pdf.numPages;
        for (let i = 1; i <= pageCount; i++) {
          updateProgress(Math.round((i / pageCount) * 100), `Rendering page ${i} of ${pageCount}...`);

          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 2 });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          await page.render({ canvasContext: context, viewport }).promise;

          const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.9));
          const url = URL.createObjectURL(blob);

          generatedPdfBlobs.push({
            blob,
            url,
            name: `${file.name.replace(/\.pdf$/i, '')}-page-${i}.jpg`
          });

          const wrapper = document.createElement('div');
          wrapper.className = 'result-item';
          wrapper.style.textAlign = 'center';
          wrapper.style.marginBottom = '20px';
          wrapper.innerHTML = `
            <img src="${url}" alt="Page ${i}" style="max-width:100%; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.1);" />
            <div style="margin-top:8px; font-weight:bold;">Page ${i}</div>
          `;
          resultsContainer.appendChild(wrapper);
        }

        if (downloadAllButton) downloadAllButton.hidden = false;
        if (clearResultsButton) clearResultsButton.hidden = false;
        updateProgress(100, 'Conversion complete');
      });
      return;
    }

    if (!selectedImageFiles.length) {
      showToast('Please add at least one image.');
      return;
    }

    const mode = getConversionMode();
    const { pageSize, orientation } = getPageSettings();
    updateProgress(0, 'Creating PDF...');
    generatedPdfBlobs = [];
    generatedPdfBlob = null;
    if (downloadPdfButton) downloadPdfButton.hidden = true;

    if (mode === 'separate') {
      createPdfFromImages(selectedImageFiles, { mode, pageSize, orientation })
        .then((blobs) => {
          generatedPdfBlobs = blobs.map((blob, index) => ({
            blob,
            name: `${selectedImageFiles[index]?.name?.replace(/\.(jpg|jpeg|png|webp)$/i, '') || 'image'}-${index + 1}.pdf`
          }));
          if (downloadPdfButton) downloadPdfButton.hidden = false;
          showToast('Separate PDFs are ready.');
        })
        .catch((error) => {
          console.error(error);
          updateProgress(0, 'Conversion failed');
          showToast('Failed to convert images. Please try again.');
        });
      return;
    }

    createPdfFromImages(selectedImageFiles, { mode: 'single', pageSize, orientation })
      .then((blob) => {
        generatedPdfBlob = blob;
        generatedPdfName = `images-${Date.now()}.pdf`;
        if (downloadPdfButton) downloadPdfButton.hidden = false;
        showToast('Your PDF is ready for download.');
      })
      .catch((error) => {
        console.error(error);
        updateProgress(0, 'Conversion failed');
        showToast('Failed to convert images. Please try again.');
      });
  });
}

if (downloadAllButton) {
  downloadAllButton.addEventListener('click', () => {
    if (!generatedPdfBlobs || generatedPdfBlobs.length === 0) return;

    showToast('جاري تحميل جميع الصور...');

    generatedPdfBlobs.forEach((item, index) => {
      setTimeout(() => {
        const downloadUrl = URL.createObjectURL(item.blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = `page-${index + 1}.jpg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Revoke the Object URL after a short delay to allow the download to start
        setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
      }, index * 300);
    });
  });
}

if (clearResultsButton) {
  clearResultsButton.addEventListener('click', () => {
    if (resultsContainer) resultsContainer.innerHTML = '';
    generatedPdfBlobs.forEach(item => {
      if (item.url) URL.revokeObjectURL(item.url);
    });
    generatedPdfBlobs = [];
    if (downloadAllButton) downloadAllButton.hidden = true;
    if (clearResultsButton) clearResultsButton.hidden = true;
    updateProgress(0, 'Waiting');
  });
}

if (clearSelectionButton) {
  clearSelectionButton.addEventListener('click', (event) => {
    event.stopPropagation();
    selectedImageFiles = [];
    generatedPdfBlob = null;
    generatedPdfName = '';
    generatedPdfBlobs = [];
    if (downloadPdfButton) downloadPdfButton.hidden = true;
    renderImagePreviews(selectedImageFiles);
    updateProgress(0, 'Selection cleared');
  });
}

if (fileInput) {
  fileInput.addEventListener('change', () => {
  const files = fileInput.files;
  if (files && files.length) {
    handleFile(files);
  }
});
}

['dragenter', 'dragover'].forEach((eventName) => {
  uploadDropzone?.addEventListener(eventName, (event) => {
    event.preventDefault();
    event.stopPropagation();
    uploadDropzone.classList.add('dragging');
  });
});

['dragleave', 'dragend'].forEach((eventName) => {
  uploadDropzone?.addEventListener(eventName, (event) => {
    event.preventDefault();
    event.stopPropagation();
    uploadDropzone.classList.remove('dragging');
  });
});

uploadDropzone?.addEventListener('drop', (event) => {
  event.preventDefault();
  event.stopPropagation();
  uploadDropzone.classList.remove('dragging');
  const files = event.dataTransfer?.files;
  if (files && files.length) {
    handleFile(files);
  }
});

faqItems.forEach((item) => {
  const button = item.querySelector('.faq-question');
  button?.addEventListener('click', () => {
    item.classList.toggle('open');
  });
});

// Merge PDFs using PDF-Lib
async function mergeFiles(files) {
  try {
    showToast('Merging PDFs...');
    const mergedPdf = await PDFLib.PDFDocument.create();
    let total = files.length;
    let done = 0;
    for (const f of files) {
      const arrayBuffer = await f.arrayBuffer();
      const pdf = await PDFLib.PDFDocument.load(arrayBuffer);
      const copied = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copied.forEach((p) => mergedPdf.addPage(p));
      done += 1;
      updateProgress(Math.round((done / total) * 90) + 5, `Merging ${done}/${total}...`);
    }
    const mergedBytes = await mergedPdf.save();
    const blob = new Blob([mergedBytes], { type: 'application/pdf' });
    generatedPdfBlob = blob;
    generatedPdfName = 'merged.pdf';
    if (downloadPdfButton) downloadPdfButton.hidden = false;
    // preview merged
    const url = URL.createObjectURL(blob);
    previewFrame.src = url;
    previewModal.style.display = 'grid';
    previewModal.setAttribute('aria-hidden', 'false');
    showToast('Merge complete — preview ready');
  } catch (err) {
    console.error(err);
    showToast('Merge failed — check console');
  }
}

// Show preview: if PDF, open directly; if image, convert to PDF blob then preview
async function showPreview(file) {
  if (!file) return;
  if (file.type === 'application/pdf') {
    const url = URL.createObjectURL(file);
    previewFrame.src = url;
    previewModal.style.display = 'grid';
    previewModal.setAttribute('aria-hidden', 'false');
    return;
  }
  if (supportedImageTypes.includes(file.type)) {
    // create PDF blob without forcing download
    const { jsPDF } = window.jspdf || {};
    if (!jsPDF) {
      showToast('Preview requires internet to load libs.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const pdf = new jsPDF({ unit: 'px', format: 'a4' });
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const ratio = Math.min(pageWidth / img.width, pageHeight / img.height);
        const imgWidth = img.width * ratio;
        const imgWidthFinal = imgWidth;
        const imgHeight = img.height * ratio;
        const imgHeightFinal = imgHeight;
        const x = (pageWidth - imgWidthFinal) / 2;
        const y = (pageHeight - imgHeightFinal) / 2;
        const imgType = file.type === 'image/png' ? 'PNG' : 'JPEG';
        pdf.addImage(img, imgType, x, y, imgWidthFinal, imgHeightFinal);
        const blob = pdf.output('blob');
        const url = URL.createObjectURL(blob);
        previewFrame.src = url;
        previewModal.style.display = 'grid';
        previewModal.setAttribute('aria-hidden', 'false');
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  }
}

// Split PDF: extract page ranges
async function extractPagesFromPdf(file, ranges, invert = false) {
  try {
    updateProgress(5, invert ? 'Preparing removal...' : 'Preparing split...');
    const arrayBuffer = await file.arrayBuffer();
    const src = await PDFLib.PDFDocument.load(arrayBuffer);
    const outDoc = await PDFLib.PDFDocument.create();
    const indices = src.getPageIndices();
    const specified = [];
    ranges.forEach((r) => {
      if (r.start === r.end) specified.push(r.start - 1);
      else for (let i = r.start - 1; i <= r.end - 1; i++) specified.push(i);
    });

    let toKeep;
    if (invert) {
        const toRemove = new Set(specified);
        toKeep = indices.filter(idx => !toRemove.has(idx));
    } else {
        toKeep = Array.from(new Set(specified)).filter(i => i >= 0 && i < indices.length);
    }

    if (toKeep.length === 0) throw new Error("No pages remaining.");

    let done = 0;
    for (const idx of toKeep) {
      const [copied] = await outDoc.copyPages(src, [idx]);
      outDoc.addPage(copied);
      done += 1;
      updateProgress(Math.round((done / toKeep.length) * 90) + 5, (invert ? `Saving page ${done}/${toKeep.length}` : `Extracting ${done}/${toKeep.length}...`));
    }
    const bytes = await outDoc.save();
    const blob = new Blob([bytes], { type: 'application/pdf' });
    return blob;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

function formatFileSize(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function updateCompressionStats(originalSize, compressedSize) {
  const originalSizeEl = document.getElementById('originalSize');
  const compressedSizeEl = document.getElementById('compressedSize');
  const compressionPercentEl = document.getElementById('compressionPercent');

  if (originalSizeEl) originalSizeEl.textContent = formatFileSize(originalSize);
  if (compressedSize == null) {
    if (compressedSizeEl) compressedSizeEl.textContent = '—';
    if (compressionPercentEl) compressionPercentEl.textContent = '—';
    return;
  }

  const reduction = originalSize ? ((originalSize - compressedSize) / originalSize) * 100 : 0;
  if (compressedSizeEl) compressedSizeEl.textContent = formatFileSize(compressedSize);
  if (compressionPercentEl) compressionPercentEl.textContent = `${reduction.toFixed(1)}%`;
}

async function convertWordToPdf(file) {
  if (!file || !file.name.toLowerCase().endsWith('.docx')) {
    updateProgress(0, 'Please upload one DOCX file.');
    showToast('Please upload one DOCX file.');
    return;
  }

  const { jsPDF } = window.jspdf || {};
  if (!window.mammoth || !jsPDF) {
    updateProgress(0, 'Conversion libraries are not available.');
    showToast('Word to PDF conversion requires the DOCX and PDF libraries.');
    return;
  }

  try {
    generatedPdfBlob = null;
    generatedPdfName = '';
    generatedPdfBlobs = [];
    if (downloadPdfButton) downloadPdfButton.hidden = true;

    updateProgress(10, 'Reading DOCX...');
    const arrayBuffer = await file.arrayBuffer();

    updateProgress(35, 'Extracting document text...');
    const result = await mammoth.extractRawText({ arrayBuffer });
    const text = (result.value || '').trim();
    if (!text) throw new Error('No text found in DOCX.');

    updateProgress(65, 'Creating PDF...');
    const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
    const margin = 48;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const lineHeight = 16;
    let y = margin;

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);

    text.split(/\n+/).forEach((paragraph) => {
      const lines = pdf.splitTextToSize(paragraph.trim(), pageWidth - margin * 2);
      lines.forEach((line) => {
        if (y > pageHeight - margin) {
          pdf.addPage();
          y = margin;
        }
        pdf.text(line, margin, y);
        y += lineHeight;
      });
      y += lineHeight / 2;
    });

    generatedPdfBlob = pdf.output('blob');
    generatedPdfName = file.name.replace(/\.docx$/i, '.pdf');
    if (downloadPdfButton) downloadPdfButton.hidden = false;
    updateProgress(100, 'Conversion complete. PDF ready for download.');
    showToast('PDF is ready for download.');
  } catch (error) {
    console.error(error);
    generatedPdfBlob = null;
    generatedPdfName = '';
    if (downloadPdfButton) downloadPdfButton.hidden = true;
    updateProgress(0, 'Word to PDF conversion failed.');
    showToast('Word to PDF conversion failed.');
  }
}

function getPdfPageParagraphs(textContent, pageWidth = 595) {
  const rows = [];
  const styles = textContent.styles || {};
  const fontSizes = [];

  textContent.items.forEach((item) => {
    const text = (item.str || '').trim();
    if (!text) return;

    const transform = item.transform || [];
    const x = transform[4] || 0;
    const y = transform[5] || 0;
    const fontSize = Math.abs(transform[3] || transform[0] || item.height || 11);
    const fontInfo = styles[item.fontName] || {};
    const fontLabel = `${item.fontName || ''} ${fontInfo.fontFamily || ''}`;
    const width = item.width || text.length * fontSize * 0.45;
    fontSizes.push(fontSize);
    let row = rows.find((candidate) => Math.abs(candidate.y - y) <= 4);

    if (!row) {
      row = { y, items: [] };
      rows.push(row);
    }

    row.items.push({
      x,
      text,
      width,
      fontSize,
      bold: /bold|black|heavy|semibold|demi/i.test(fontLabel),
      italic: /italic|oblique/i.test(fontLabel),
      dir: item.dir || ''
    });
  });

  const bodyFontSize = getMedianNumber(fontSizes) || 11;
  const lines = rows
    .sort((a, b) => b.y - a.y)
    .map((row) => {
      const rowText = row.items.map((item) => item.text).join(' ');
      const isRtlRow = row.items.some((item) => item.dir === 'rtl') || isRtlText(rowText);
      const orderedItems = [...row.items].sort((a, b) => isRtlRow ? b.x - a.x : a.x - b.x);
      const minX = Math.min(...row.items.map((item) => item.x));
      const maxX = Math.max(...row.items.map((item) => item.x + item.width));
      const center = (minX + maxX) / 2;
      const alignment = Math.abs(center - pageWidth / 2) < pageWidth * 0.12
        ? 'center'
        : (isRtlRow || minX > pageWidth * 0.45 ? 'right' : 'left');
      const cells = getSimpleTableCells(orderedItems, isRtlRow);
      const text = orderedItems.map((item) => item.text).join(' ').replace(/\s+/g, ' ').trim();
      const maxFontSize = Math.max(...orderedItems.map((item) => item.fontSize));
      const avgFontSize = orderedItems.reduce((sum, item) => sum + item.fontSize, 0) / orderedItems.length;

      return {
        y: row.y,
        text,
        runs: orderedItems,
        cells,
        alignment,
        isRtl: isRtlRow,
        x: minX,
        width: maxX - minX,
        fontSize: maxFontSize,
        bodyFontSize,
        isHeadingCandidate: isHeadingLine(text, maxFontSize, avgFontSize, bodyFontSize, orderedItems),
        bold: orderedItems.some((item) => item.bold),
        italic: orderedItems.some((item) => item.italic)
      };
    })
    .filter((line) => line.text);

  const blocks = [];
  let currentParagraph = [];
  let tableRows = [];
  let previousY = null;

  const flushParagraph = () => {
    if (!currentParagraph.length) return;
    blocks.push({ type: 'paragraph', lines: currentParagraph });
    currentParagraph = [];
  };
  const flushTable = () => {
    if (!tableRows.length) return;
    if (isSimpleTableRows(tableRows)) {
      blocks.push({ type: 'table', rows: tableRows });
    } else {
      tableRows.forEach((row) => {
        blocks.push({ type: 'paragraph', lines: [createLineFromCells(row)] });
      });
    }
    tableRows = [];
  };

  lines.forEach((line) => {
    const listInfo = getListInfo(line.text);
    const isTableLine = line.cells.length > 1 && !listInfo && !line.isHeadingCandidate;

    if (previousY !== null) {
      const gap = Math.abs(previousY - line.y);
      if (gap > 28) {
        flushParagraph();
        flushTable();
        if (gap > 42) blocks.push({ type: 'spacer' });
      }
    }

    if (listInfo || line.isHeadingCandidate) {
      flushParagraph();
      flushTable();
      blocks.push({ type: 'paragraph', lines: [line] });
    } else if (isTableLine) {
      flushParagraph();
      tableRows.push(line.cells);
    } else {
      flushTable();
      currentParagraph.push(line);
    }

    previousY = line.y;
  });

  flushParagraph();
  flushTable();
  return blocks;
}

function getMedianNumber(values) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
}

function isRtlText(text) {
  return /[\u0590-\u05ff\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff\ufb50-\ufdff\ufe70-\ufeff]/.test(text);
}

function getSimpleTableCells(items, isRtlRow) {
  const ordered = [...items].sort((a, b) => a.x - b.x);
  const cells = [];
  let currentCell = [];
  let previousRight = null;

  ordered.forEach((item) => {
    const gap = previousRight === null ? 0 : item.x - previousRight;
    if (gap > 28 && currentCell.length) {
      cells.push(currentCell);
      currentCell = [];
    }
    currentCell.push(item);
    previousRight = item.x + item.width;
  });

  if (currentCell.length) cells.push(currentCell);
  return isRtlRow ? cells.reverse() : cells;
}

function isSimpleTableRows(rows) {
  if (!rows.length) return false;
  const columnCounts = rows.map((row) => row.length);
  const mainColumnCount = Math.max(...columnCounts);
  return mainColumnCount > 1 && columnCounts.filter((count) => Math.abs(count - mainColumnCount) <= 1).length >= Math.min(2, rows.length);
}

function createLineFromCells(cells) {
  const runs = cells.flatMap((cell, cellIndex) => cell.map((item, itemIndex) => ({
    ...item,
    text: `${cellIndex || itemIndex ? ' ' : ''}${item.text}`
  })));
  const text = runs.map((item) => item.text).join('').replace(/\s+/g, ' ').trim();

  return {
    y: cells[0]?.[0]?.y || 0,
    text,
    runs,
    cells: [runs],
    alignment: isRtlText(text) ? 'right' : 'left',
    isRtl: isRtlText(text),
    fontSize: Math.max(...runs.map((item) => item.fontSize || 11)),
    bodyFontSize: getMedianNumber(runs.map((item) => item.fontSize || 11)) || 11,
    bold: runs.some((item) => item.bold),
    italic: runs.some((item) => item.italic)
  };
}

function getListInfo(text) {
  if (/^\s*([*\u2022\-])\s+/.test(text)) return { type: 'bullet', text: text.replace(/^\s*([*\u2022\-])\s+/, '') };
  if (/^\s*([0-9]+|[A-Za-z])[\.)]\s+/.test(text)) return { type: 'number', text: text.replace(/^\s*([0-9]+|[A-Za-z])[\.)]\s+/, '') };
  return null;
}

function isHeadingLine(text, maxFontSize, avgFontSize, bodyFontSize, runs) {
  const normalized = text.trim();
  if (!normalized || getListInfo(normalized) || /[.!?؟،,;:]$/.test(normalized) && normalized.length > 60) return false;

  const isShort = normalized.length <= 110;
  const mostlyBold = runs.filter((run) => run.bold).length >= Math.ceil(runs.length * 0.6);
  const largerThanBody = maxFontSize >= bodyFontSize + 2 || avgFontSize >= bodyFontSize * 1.18;
  const titleLike = isShort && !/\s{2,}/.test(normalized);

  return titleLike && (largerThanBody || (mostlyBold && maxFontSize >= bodyFontSize));
}

function getHeadingLevel(lines) {
  const text = lines.map((line) => line.text).join(' ');
  const maxSize = Math.max(...lines.map((line) => line.fontSize || 11));
  const bodySize = getMedianNumber(lines.map((line) => line.bodyFontSize || 11)) || 11;
  const isShort = text.length <= 110;
  const hasBodyBreaks = lines.length > 2;

  if (!isShort || hasBodyBreaks || !lines.some((line) => line.isHeadingCandidate)) return null;
  if (maxSize >= Math.max(18, bodySize + 6)) return 1;
  if (maxSize >= Math.max(15, bodySize + 3)) return 2;
  if (lines.some((line) => line.bold) || maxSize > bodySize) return 3;
  return null;
}

function createDocxRunsFromLine(line, docxApi, stripListMarker = false) {
  const { TextRun } = docxApi;
  const sourceRuns = stripListMarker ? stripListMarkerFromRuns(line) : line.runs;

  return sourceRuns.map((run) => new TextRun({
    text: run.text,
    bold: run.bold,
    italics: run.italic,
    rightToLeft: line.isRtl,
    size: Math.max(18, Math.min(36, Math.round((run.fontSize || line.fontSize || 11) * 2)))
  }));
}

function stripListMarkerFromRuns(line) {
  const markerPattern = /^\s*([*\u2022\-]|[0-9]+|[A-Za-z])[\.)]?\s+/;
  const runs = (line.runs || []).map((run) => ({ ...run }));

  if (!runs.length) {
    return [{ text: getListInfo(line.text)?.text || line.text, bold: line.bold, italic: line.italic, fontSize: line.fontSize }];
  }

  if (markerPattern.test(runs[0].text)) {
    runs[0].text = runs[0].text.replace(markerPattern, '');
  } else if (runs.length > 1 && /^([*\u2022\-]|[0-9]+|[A-Za-z])[\.)]?$/.test(runs[0].text.trim())) {
    runs.shift();
    runs[0].text = runs[0].text.replace(/^\s+/, '');
  }

  const cleaned = runs.filter((run) => run.text);
  if (cleaned.length) return cleaned;
  return [{ text: getListInfo(line.text)?.text || line.text, bold: line.bold, italic: line.italic, fontSize: line.fontSize }];
}

function createDocxParagraph(block, docxApi) {
  const { Paragraph, TextRun, AlignmentType, HeadingLevel } = docxApi;
  const lines = block.lines || [];
  const text = lines.map((line) => line.text).join('\n');
  const isRtl = isRtlText(text);
  const leftAlignment = AlignmentType?.LEFT || 'left';
  const rightAlignment = AlignmentType?.RIGHT || 'right';
  const centerAlignment = AlignmentType?.CENTER || 'center';
  const firstLine = lines[0] || { text: '', alignment: isRtl ? 'right' : 'left' };
  const listInfo = lines.length === 1 ? getListInfo(firstLine.text) : null;
  const headingLevel = getHeadingLevel(lines);
  const alignment = firstLine.alignment === 'center' ? centerAlignment : (firstLine.alignment === 'right' || isRtl ? rightAlignment : leftAlignment);
  const children = lines.length
    ? lines.flatMap((line, index) => {
        const lineRuns = createDocxRunsFromLine(line, docxApi, Boolean(listInfo && index === 0));
        return index === 0 ? lineRuns : [new TextRun({ break: 1 }), ...lineRuns];
      })
    : [new TextRun('')];

  return new Paragraph({
    bidirectional: isRtl,
    alignment,
    heading: headingLevel && HeadingLevel ? HeadingLevel[`HEADING_${headingLevel}`] : undefined,
    bullet: listInfo?.type === 'bullet' ? { level: 0 } : undefined,
    numbering: listInfo?.type === 'number' ? { reference: 'pdf-to-word-numbering', level: 0 } : undefined,
    spacing: {
      before: block.type === 'spacer' ? 180 : (headingLevel ? 260 : 80),
      after: headingLevel ? 180 : (listInfo ? 80 : 140),
      line: 276,
      lineRule: 'auto'
    },
    children
  });
}

function createDocxTable(block, docxApi) {
  const { Table, TableRow, TableCell, Paragraph, TextRun, WidthType, AlignmentType } = docxApi;

  return new Table({
    width: { size: 100, type: WidthType?.PERCENTAGE || 'pct' },
    rows: block.rows.map((row) => new TableRow({
      children: row.map((cell) => {
        const text = cell.map((item) => item.text).join(' ').replace(/\s+/g, ' ').trim();
        const isRtl = isRtlText(text);
        return new TableCell({
          children: [new Paragraph({
            bidirectional: isRtl,
            alignment: isRtl ? (AlignmentType?.RIGHT || 'right') : (AlignmentType?.LEFT || 'left'),
            children: cell.map((item, index) => new TextRun({
              text: `${index === 0 ? '' : ' '}${item.text}`,
              bold: item.bold,
              italics: item.italic,
              rightToLeft: isRtl,
              size: Math.max(18, Math.min(32, Math.round((item.fontSize || 11) * 2)))
            }))
          })],
          margins: { top: 80, bottom: 80, left: 120, right: 120 }
        });
      })
    }))
  });
}

function createDocxBlock(block, docxApi) {
  if (block.type === 'table' && docxApi.Table) return createDocxTable(block, docxApi);
  if (block.type === 'spacer') return createDocxParagraph({ type: 'spacer', lines: [] }, docxApi);
  return createDocxParagraph(block, docxApi);
}

async function convertPdfToWord(file) {
  if (!file || (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf'))) {
    updateProgress(0, 'Please upload one PDF file.');
    showToast('Please upload one PDF file.');
    return;
  }

  if (!window.pdfjsLib || !window.docx) {
    updateProgress(0, 'Conversion libraries are not available.');
    showToast('PDF to Word conversion requires PDF.js and docx.');
    return;
  }

  try {
    generatedPdfBlob = null;
    generatedPdfName = '';
    generatedPdfBlobs = [];
    if (downloadPdfButton) downloadPdfButton.hidden = true;

    if (pdfjsLib.GlobalWorkerOptions) {
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
    }

    updateProgress(10, 'Loading PDF...');
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const blocks = [];

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      updateProgress(10 + Math.round((pageNumber / pdf.numPages) * 60), `Extracting text ${pageNumber}/${pdf.numPages}...`);
      const page = await pdf.getPage(pageNumber);
      const viewport = page.getViewport({ scale: 1 });
      const textContent = await page.getTextContent();
      const pageBlocks = getPdfPageParagraphs(textContent, viewport.width);
      blocks.push(...pageBlocks);
      if (pageNumber < pdf.numPages) blocks.push({ type: 'spacer' });
    }

    if (!blocks.some((block) => {
      if (block.type === 'paragraph') return block.lines.some((line) => line.text.trim());
      if (block.type === 'table') return block.rows.some((row) => row.some((cell) => cell.some((item) => item.text.trim())));
      return false;
    })) {
      throw new Error('No text found in PDF.');
    }

    updateProgress(80, 'Creating DOCX...');
    const { Document, Packer } = window.docx;
    const doc = new Document({
      numbering: {
        config: [{
          reference: 'pdf-to-word-numbering',
          levels: [{
            level: 0,
            format: window.docx.LevelFormat?.DECIMAL || 'decimal',
            text: '%1.',
            alignment: window.docx.AlignmentType?.LEFT || 'left'
          }]
        }]
      },
      sections: [{
        properties: {},
        children: blocks.map((block) => createDocxBlock(block, window.docx))
      }]
    });

    generatedPdfBlob = await Packer.toBlob(doc);
    generatedPdfName = file.name.replace(/\.pdf$/i, '.docx');
    if (downloadPdfButton) downloadPdfButton.hidden = false;
    updateProgress(100, 'Conversion complete. DOCX ready for download.');
    showToast('DOCX is ready for download.');
  } catch (error) {
    console.error(error);
    generatedPdfBlob = null;
    generatedPdfName = '';
    if (downloadPdfButton) downloadPdfButton.hidden = true;
    updateProgress(0, 'PDF to Word conversion failed.');
    showToast('PDF to Word conversion failed.');
  }
}

// Compress PDF or image (best-effort client-side)
async function compressPdf(file) {
  if (!file) return showToast('No file selected');
  generatedPdfBlob = null;
  generatedPdfName = '';
  generatedPdfBlobs = [];
  updateCompressionStats(file.size, null);
  if (downloadPdfButton) downloadPdfButton.hidden = true;

  if (supportedImageTypes.includes(file.type)) {
    // compress image by drawing to canvas and re-encoding
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxW = 1200;
        const scale = Math.min(1, maxW / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          // convert to PDF using jsPDF
          const { jsPDF } = window.jspdf || {};
          if (!jsPDF) return showToast('Compression requires internet to load libs.');
          const url = URL.createObjectURL(blob);
          const pdf = new jsPDF({ unit: 'px', format: 'a4' });
          const image = new Image();
          image.onload = () => {
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const ratio = Math.min(pageWidth / image.width, pageHeight / image.height);
            const imgWidth = image.width * ratio;
            const imgHeight = image.height * ratio;
            const x = (pageWidth - imgWidth) / 2;
            const y = (pageHeight - imgHeight) / 2;
            pdf.addImage(image, 'JPEG', x, y, imgWidth, imgHeight);
            generatedPdfBlob = pdf.output('blob');
            generatedPdfName = file.name.replace(/\.(jpg|jpeg|png|webp)$/i, '.compressed.pdf');
            updateCompressionStats(file.size, generatedPdfBlob.size);
            if (downloadPdfButton) downloadPdfButton.hidden = false;
            showToast('Compressed file is ready for download');
          };
          image.src = url;
        }, 'image/jpeg', 0.65);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
    return;
  }
  // For PDFs, client-side compression is limited; recommend server-side processing
  // Attempt client-side compression by rasterizing pages and re-encoding as JPEG
  try {
    const arrayBuffer = await file.arrayBuffer();
    if (!window.pdfjsLib) {
      showToast('Compression requires PDF.js to be available.');
      return;
    }
    // set worker if available
    if (pdfjsLib.GlobalWorkerOptions) {
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
    }
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    const pageCount = pdf.numPages;
    updateProgress(5, 'Rendering pages...');
    const { jsPDF } = window.jspdf || {};
    if (!jsPDF) return showToast('Compression requires jsPDF to be loaded.');
    const outPdf = new jsPDF({ unit: 'px', format: 'a4' });
    let completed = 0;
    for (let i = 1; i <= pageCount; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext('2d');
      await page.render({ canvasContext: ctx, viewport }).promise;
      // convert to jpeg at 0.7 quality
      const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
      const img = new Image();
      await new Promise((res, rej) => {
        img.onload = () => res();
        img.onerror = rej;
        img.src = dataUrl;
      });
      const pageWidth = outPdf.internal.pageSize.getWidth();
      const pageHeight = outPdf.internal.pageSize.getHeight();
      const ratio = Math.min(pageWidth / img.width, pageHeight / img.height);
      const imgWidth = img.width * ratio;
      const imgHeight = img.height * ratio;
      const x = (pageWidth - imgWidth) / 2;
      const y = (pageHeight - imgHeight) / 2;
      if (i > 1) outPdf.addPage();
      outPdf.addImage(img, 'JPEG', x, y, imgWidth, imgHeight);
      completed += 1;
      updateProgress(Math.round((completed / pageCount) * 90) + 5, `Compressing ${completed}/${pageCount}...`);
    }
    const blob = outPdf.output('blob');
    generatedPdfBlob = blob;
    generatedPdfName = file.name.replace(/\.pdf$/i, '.compressed.pdf');
    if (downloadPdfButton) downloadPdfButton.hidden = false;
    updateCompressionStats(file.size, blob.size);
    // preview compressed
    const url = URL.createObjectURL(blob);
    previewFrame.src = url;
    previewModal.style.display = 'grid';
    previewModal.setAttribute('aria-hidden', 'false');
    showToast('Compression complete — preview ready');
  } catch (err) {
    console.error(err);
    showToast('PDF compression failed — backend recommended');
  }
}

// Phase 1: Document Scanner handlers
function handleScannerFile(file) {
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const previewImage = document.getElementById('scannerPreviewImage');
    const previewArea = document.getElementById('scannerPreviewArea');
    const dropzone = document.getElementById('uploadDropzone');

    if (previewImage && previewArea && dropzone) {
      previewImage.src = e.target.result;
      previewArea.classList.remove('hidden');
      dropzone.classList.add('hidden');

      // Meta info
      const fileNameEl = document.getElementById('scannerFileName');
      const fileSizeEl = document.getElementById('scannerFileSize');
      const dimensionsEl = document.getElementById('scannerDimensions');

      if (fileNameEl) fileNameEl.textContent = file.name || 'Pasted Image';
      if (fileSizeEl) fileSizeEl.textContent = formatFileSize(file.size);

      // Get dimensions
      const img = new Image();
      img.onload = () => {
        if (dimensionsEl) dimensionsEl.textContent = `${img.width} x ${img.height}`;
      };
      img.src = e.target.result;
    }
  };
  reader.readAsDataURL(file);
}

// Paste support
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

// Replace/Clear Scanner Image
const replaceImageButton = document.getElementById('replaceImageButton');
const clearImageButton = document.getElementById('clearImageButton');

if (replaceImageButton) {
  replaceImageButton.addEventListener('click', () => {
    if (fileInput) fileInput.click();
  });
}

if (clearImageButton) {
  clearImageButton.addEventListener('click', () => {
    const previewArea = document.getElementById('scannerPreviewArea');
    const dropzone = document.getElementById('uploadDropzone');
    const previewImage = document.getElementById('scannerPreviewImage');

    if (previewArea && dropzone && previewImage) {
      previewArea.classList.add('hidden');
      dropzone.classList.remove('hidden');
      previewImage.src = '';
      if (fileInput) fileInput.value = '';
    }
  });
}

// PDF to JPG conversion
async function convertPdfToJpg(file) {
  if (!file || (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf'))) {
    if (typeof showToast === 'function') showToast('Please select a valid PDF file.');
    return null;
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    return pdf;
  } catch (error) {
    console.error('Error loading PDF:', error);
    if (typeof showToast === 'function') showToast('Failed to load PDF document.');
    return null;
  }
}

// Simple toast
function showToast(msg, timeout = 3500) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => {
    t.remove();
  }, timeout);
}

// Wire up action buttons
if (document.getElementById('splitButton')) {
  const splitButton = document.getElementById('splitButton');
  splitButton.addEventListener('click', () => {
    splitMode = true;
    fileInput.multiple = false;
    fileInput.value = '';
    fileInput.click();
  });
}
if (previewButton) {
  previewButton.addEventListener('click', () => {
    previewMode = true;
    fileInput.multiple = false;
    fileInput.click();
  });
}
if (compressButton) {
  compressButton.addEventListener('click', () => {
    compressMode = true;
    fileInput.multiple = false;
    fileInput.click();
  });
}
if (previewClose) {
  previewClose.addEventListener('click', () => {
    previewModal.style.display = 'none';
    previewModal.setAttribute('aria-hidden', 'true');
    previewFrame.src = '';
  });
}

// Theme toggle
if (themeToggle) {
  const stored = localStorage.getItem('pdftools_theme');
  if (stored === 'light') document.body.classList.add('light');
  themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light');
    themeToggle.setAttribute('aria-pressed', isLight ? 'true' : 'false');
    localStorage.setItem('pdftools_theme', isLight ? 'light' : 'dark');
  });
}

if (langButton) {
  langButton.textContent = 'العربية';
}

updateLanguage('ar');
