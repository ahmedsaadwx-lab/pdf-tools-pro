const navToggle = document.getElementById('navToggle');
const navMenuMain = document.getElementById('navMenuMain');
const langSwitcher = document.getElementById('langSwitcher');
const langButton = document.getElementById('langButton');
const langMenu = document.getElementById('langMenu');
const langItems = langMenu.querySelectorAll('[data-lang]');
const uploadButton = document.getElementById('uploadButton');
const uploadArea = document.getElementById('uploadArea');
const uploadDropzone = document.getElementById('uploadDropzone');
const fileInput = document.getElementById('fileInput');
const imageToPdfCard = document.querySelector('.tool-card[data-action="imageToPdf"]');
const supportedImageTypes = ['image/jpeg', 'image/png'];
const fileNameDisplay = document.getElementById('fileName');
const fileSizeDisplay = document.getElementById('fileSize');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const progressPercent = document.getElementById('progressPercent');
const faqItems = document.querySelectorAll('.faq-item');

const translations = {
  en: {
    brandText: 'PDF Tools Pro',
    navCta: 'Get Started',
    navTools: 'PDF Tools',
    navUpload: 'Upload',
    navWhy: 'Why Us',
    navPricing: 'Pricing',
    navFaq: 'FAQ',
    heroEyebrow: 'Premium PDF SaaS',
    heroTitle: 'Convert, merge, compress, and manage PDFs with enterprise-grade speed.',
    heroDescription: 'PDF Tools Pro offers an all-in-one PDF workflow for teams, freelancers, and ambitious creators. Enjoy premium conversions, powerful compression, and intuitive file control in one polished platform.',
    heroPrimary: 'Explore tools',
    heroSecondary: 'View pricing',
    heroBadge: 'Trusted conversion suite',
    heroUptime: 'uptime',
    heroCardText: 'Accelerate your file work with AI-assisted PDF processing, secure uploads, and lightning-fast downloads.',
    heroFeature1: 'Fast convert',
    heroFeatureText1: 'Images, Word, and documents.',
    heroFeature2: 'Secure export',
    heroFeatureText2: 'Data safe with advanced encryption.',
    toolsEyebrow: 'PDF Tools',
    toolsTitle: 'Premium tools for every PDF workflow.',
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
    uploadEyebrow: 'Drag & drop ready',
    uploadTitle: 'Upload files instantly and see progress in real time.',
    uploadText: 'Drop your PDF documents or browse from your device. File size and upload status are updated automatically.',
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
    whyFreeTitle: 'Free tools available',
    whyFreeText: 'Try essential PDF functions at no cost before upgrading.',
    statsFiles: '10M+',
    statsFilesText: 'files converted',
    statsUsers: '500K+',
    statsUsersText: 'users',
    statsUptime: '99.9%',
    statsUptimeText: 'uptime',
    statsGlobal: 'Global',
    statsGlobalText: 'availability',
    pricingEyebrow: 'Pricing plans',
    pricingTitle: 'Choose the plan that grows with your workflow.',
    freePlanName: 'Free',
    freePlanFeature1: '5 conversions per day',
    freePlanFeature2: 'Basic upload tools',
    freePlanFeature3: 'Community support',
    freePlanButton: 'Start free',
    proPlanName: 'Pro',
    proPlanFeature1: 'Unlimited conversions',
    proPlanFeature2: 'Faster processing',
    proPlanFeature3: 'Priority email support',
    proPlanButton: 'Go Pro',
    businessPlanName: 'Business',
    businessPlanFeature1: 'Team management',
    businessPlanFeature2: 'Advanced security',
    businessPlanFeature3: 'White-glove support',
    businessPlanButton: 'Contact sales',
    testimonialsEyebrow: 'Testimonials',
    testimonialsTitle: 'Loved by creators and teams worldwide.',
    testimonialText1: '"The fastest PDF experience I have used. Every upload feels secure, and the results are flawless."',
    testimonialName1: 'Aya M. — Product Manager',
    testimonialText2: '"A polished toolset that makes converting and sharing documents effortless for our remote team."',
    testimonialName2: 'Luis G. — Freelance Designer',
    testimonialText3: '"Premium UI and smart automation helped us save time managing large reports and contracts."',
    testimonialName3: 'Emre T. — Operations Lead',
    faqEyebrow: 'FAQ',
    faqTitle: 'Frequently asked questions about PDF Tools Pro.',
    faqQuestion1: 'Can I use PDF Tools Pro for free?',
    faqAnswer1: 'Yes. The Free plan includes essential PDF operations and is ideal to try before upgrading.',
    faqQuestion2: 'Is file upload secure?',
    faqAnswer2: 'Absolutely. We use encrypted processing and temporary storage to keep your documents protected.',
    faqQuestion3: 'Do you support large batch uploads?',
    faqAnswer3: 'Yes. Business customers can process larger files and batches with priority cloud resources.',
    adPlaceholder: 'AdSense-ready premium placement',
    footerBrand: 'PDF Tools Pro',
    footerCopy: 'Secure, fast, and elegant PDF tools built for modern creators.',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    footerContact: 'Contact'
  },
  ar: {
    brandText: 'بي دي إف تولز برو',
    navCta: 'ابدأ الآن',
    navTools: 'أدوات PDF',
    navUpload: 'رفع',
    navWhy: 'لماذا نحن',
    navPricing: 'الأسعار',
    navFaq: 'الأسئلة',
    heroEyebrow: 'خدمة سحابية متميزة',
    heroTitle: 'حوّل، ادمج، ضغط، ونظم ملفات PDF بسرعة احترافية.',
    heroDescription: 'PDF Tools Pro توفر سير عمل متكامل للفِرق، المستقلين، والمبدعين. استمتع بتحويلات عالية الجودة وتجربة استخدام متقدمة.',
    heroPrimary: 'استعرض الأدوات',
    heroSecondary: 'عرض الأسعار',
    heroBadge: 'مجموعة تحويل موثوقة',
    heroUptime: 'جاهزية',
    heroCardText: 'سرّع عمل ملفاتك بمعالجة مدعومة بالذكاء الاصطناعي، رفع آمن، وتنزيلات سريعة.',
    heroFeature1: 'تحويل سريع',
    heroFeatureText1: 'صور، Word، والمستندات.',
    heroFeature2: 'تصدير آمن',
    heroFeatureText2: 'بيانات محمية مع تشفير متقدم.',
    toolsEyebrow: 'أدوات PDF',
    toolsTitle: 'أدوات مميزة لكل مهام PDF.',
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
    uploadEyebrow: 'جاهز للسحب والإفلات',
    uploadTitle: 'حمّل الملفات فوراً وشاهد التقدم في الوقت الحقيقي.',
    uploadText: 'ضع مستندات PDF هنا أو اختر من جهازك. يتم تحديث حجم الملف وحالته تلقائياً.',
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
    whyFreeTitle: 'أدوات مجانية',
    whyFreeText: 'جرّب الوظائف الأساسية مجاناً قبل الترقية.',
    statsFiles: '10 مليون+',
    statsFilesText: 'ملف تم تحويله',
    statsUsers: '500 ألف+',
    statsUsersText: 'مستخدم',
    statsUptime: '99.9%',
    statsUptimeText: 'جاهزية',
    statsGlobal: 'عالمي',
    statsGlobalText: 'التوفر',
    pricingEyebrow: 'خطط الأسعار',
    pricingTitle: 'اختر الخطة التي تنمو مع سير عملك.',
    freePlanName: 'مجاني',
    freePlanFeature1: '5 تحويلات يومياً',
    freePlanFeature2: 'أدوات رفع أساسية',
    freePlanFeature3: 'دعم المجتمع',
    freePlanButton: 'ابدأ مجاناً',
    proPlanName: 'برو',
    proPlanFeature1: 'تحويلات غير محدودة',
    proPlanFeature2: 'معالجة أسرع',
    proPlanFeature3: 'دعم بريد إلكتروني أولوية',
    proPlanButton: 'احصل على برو',
    businessPlanName: 'أعمال',
    businessPlanFeature1: 'إدارة الفريق',
    businessPlanFeature2: 'أمان متقدم',
    businessPlanFeature3: 'دعم شخصي',
    businessPlanButton: 'تواصل مع المبيعات',
    testimonialsEyebrow: 'آراء العملاء',
    testimonialsTitle: 'محبوب من قبل المبدعين والفرق حول العالم.',
    testimonialText1: '"أسرع تجربة PDF استخدمتها. كل رفع يشعر بالأمان والنتائج مثالية."',
    testimonialName1: 'آية م. — مديرة منتج',
    testimonialText2: '"مجموعة أدوات محترفة تجعل التحويل والمشاركة سهلاً لفريقنا البعيد."',
    testimonialName2: 'لويس ج. — مصمم مستقل',
    testimonialText3: '"واجهة مميزة وأتمتة ذكية وفرّت علينا وقت إدارة التقارير والعقود الكبيرة."',
    testimonialName3: 'أمر ت. — مدير عمليات',
    faqEyebrow: 'الأسئلة الشائعة',
    faqTitle: 'أسئلة متكررة حول PDF Tools Pro.',
    faqQuestion1: 'هل يمكنني استخدام PDF Tools Pro مجاناً؟',
    faqAnswer1: 'نعم. تتضمن الخطة المجانية وظائف PDF الأساسية ومثالية للتجربة قبل الترقية.',
    faqQuestion2: 'هل رفع الملفات آمن؟',
    faqAnswer2: 'بالطبع. نستخدم معالجة مشفرة وتخزين مؤقت لحماية المستندات.',
    faqQuestion3: 'هل تدعمون رفع دفعات كبيرة؟',
    faqAnswer3: 'نعم. يمكن للعملاء التجاريين معالجة ملفات ودفعات أكبر بمصداقية عالية.',
    adPlaceholder: 'مكان جاهز للإعلانات من Google AdSense',
    footerBrand: 'بي دي إف تولز برو',
    footerCopy: 'أدوات PDF آمنة وسريعة وأنيقة للمبدعين العصريين.',
    privacyPolicy: 'سياسة الخصوصية',
    termsOfService: 'شروط الخدمة',
    footerContact: 'اتصل'
  },
  es: {
    brandText: 'PDF Tools Pro',
    navCta: 'Comenzar',
    navTools: 'Herramientas',
    navUpload: 'Subir',
    navWhy: 'Por qué',
    navPricing: 'Precios',
    navFaq: 'FAQ',
    heroEyebrow: 'SaaS PDF premium',
    heroTitle: 'Convierte, merge, comprime y gestiona PDFs con velocidad empresarial.',
    heroDescription: 'PDF Tools Pro ofrece un flujo de trabajo PDF todo en uno para equipos, freelancers y creadores ambiciosos.',
    heroPrimary: 'Explorar herramientas',
    heroSecondary: 'Ver precios',
    heroBadge: 'Suite de conversión confiable',
    heroUptime: 'tiempo activo',
    heroCardText: 'Acelera tu trabajo con procesamiento asistido por IA, subidas seguras y descargas rápidas.',
    heroFeature1: 'Conversión rápida',
    heroFeatureText1: 'Imágenes, Word y documentos.',
    heroFeature2: 'Exportación segura',
    heroFeatureText2: 'Datos protegidos con cifrado avanzado.',
    toolsEyebrow: 'Herramientas PDF',
    toolsTitle: 'Herramientas premium para cada flujo PDF.',
    toolImageToPdfTitle: 'Imagen a PDF',
    toolImageToPdfText: 'Convierte JPG, PNG y escaneos en archivos PDF listos para compartir.',
    toolPdfToWordTitle: 'PDF a Word',
    toolPdfToWordText: 'Exporta documentos Word editables manteniendo el formato.',
    toolWordToPdfTitle: 'Word a PDF',
    toolWordToPdfText: 'Guarda archivos Word como PDF profesionales.',
    toolMergePdfTitle: 'Fusionar PDF',
    toolMergePdfText: 'Combina varios archivos en un PDF elegante.',
    toolSplitPdfTitle: 'Dividir PDF',
    toolSplitPdfText: 'Extrae páginas y crea documentos personalizados.',
    toolCompressPdfTitle: 'Comprimir PDF',
    toolCompressPdfText: 'Reduce archivos sin perder calidad.',
    toolRemovePagesTitle: 'Eliminar páginas PDF',
    toolRemovePagesText: 'Elimina páginas no deseadas y conserva lo importante.',
    toolPdfToJpgTitle: 'PDF a JPG',
    toolPdfToJpgText: 'Extrae imágenes nítidas de las páginas PDF.',
    uploadEyebrow: 'Arrastrar y soltar listo',
    uploadTitle: 'Sube archivos al instante y ve el progreso en tiempo real.',
    uploadText: 'Suelta tus documentos PDF o selecciona desde tu equipo.',
    uploadButton: 'Subir archivos',
    uploadHint: 'Compatible con PDF, JPG, PNG hasta 20MB.',
    uploadDropzone: 'Arrastra archivos aquí o haz clic para subir',
    fileNameLabel: 'Archivo seleccionado',
    fileSizeLabel: 'Tamaño',
    progressText: 'Esperando subida…',
    uploadDone: 'Subida completa',
    whyEyebrow: 'Por qué elegirnos',
    whyTitle: 'Diseñado para rendimiento, seguridad y flujos modernos.',
    whyFastTitle: 'Conversión rápida',
    whyFastText: 'Resultados instantáneos con motores optimizados.',
    whySecurityTitle: 'Seguridad militar',
    whySecurityText: 'Transferencias cifradas y almacenamiento seguro.',
    whyAiTitle: 'Optimización IA',
    whyAiText: 'Compresión inteligente que reduce trabajo manual.',
    whyCloudTitle: 'Procesamiento en la nube',
    whyCloudText: 'Escala sin límites con procesamiento rápido en la nube.',
    whyFreeTitle: 'Herramientas gratuitas',
    whyFreeText: 'Prueba funciones esenciales sin costo.',
    statsFiles: '10M+',
    statsFilesText: 'archivos convertidos',
    statsUsers: '500K+',
    statsUsersText: 'usuarios',
    statsUptime: '99.9%',
    statsUptimeText: 'uptime',
    statsGlobal: 'Global',
    statsGlobalText: 'disponibilidad',
    pricingEyebrow: 'Planes',
    pricingTitle: 'Elige el plan que crezca contigo.',
    freePlanName: 'Gratuito',
    freePlanFeature1: '5 conversiones diarias',
    freePlanFeature2: 'Herramientas básicas',
    freePlanFeature3: 'Soporte comunitario',
    freePlanButton: 'Comenzar gratis',
    proPlanName: 'Pro',
    proPlanFeature1: 'Conversiones ilimitadas',
    proPlanFeature2: 'Procesamiento más rápido',
    proPlanFeature3: 'Soporte prioritario',
    proPlanButton: 'Ir Pro',
    businessPlanName: 'Business',
    businessPlanFeature1: 'Gestión de equipo',
    businessPlanFeature2: 'Seguridad avanzada',
    businessPlanFeature3: 'Soporte dedicado',
    businessPlanButton: 'Contactar ventas',
    testimonialsEyebrow: 'Testimonios',
    testimonialsTitle: 'Amado por creadores y equipos.',
    testimonialText1: '"La experiencia PDF más rápida que he usado. Cada subida se siente segura y perfecta."',
    testimonialName1: 'Aya M. — Product Manager',
    testimonialText2: '"Un conjunto de herramientas pulido que facilita convertir y compartir documentos."',
    testimonialName2: 'Luis G. — Diseñador independiente',
    testimonialText3: '"Una interfaz premium y automatización inteligente nos ahorraron tiempo."',
    testimonialName3: 'Emre T. — Líder de operaciones',
    faqEyebrow: 'FAQ',
    faqTitle: 'Preguntas frecuentes sobre PDF Tools Pro.',
    faqQuestion1: '¿Puedo usar PDF Tools Pro gratis?',
    faqAnswer1: 'Sí. El plan gratuito incluye funciones básicas y es ideal para probar.',
    faqQuestion2: '¿La carga de archivos es segura?',
    faqAnswer2: 'Absolutamente. Usamos procesamiento cifrado y almacenamiento temporal seguro.',
    faqQuestion3: '¿Soportan cargas por lotes grandes?',
    faqAnswer3: 'Sí. Los clientes Business pueden procesar archivos y lotes más grandes con prioridad.',
    adPlaceholder: 'Ubicación premium lista para AdSense',
    footerBrand: 'PDF Tools Pro',
    footerCopy: 'Herramientas PDF seguras y elegantes para creadores modernos.',
    privacyPolicy: 'Política de privacidad',
    termsOfService: 'Términos de servicio',
    footerContact: 'Contacto'
  },
  tr: {
    brandText: 'PDF Tools Pro',
    navCta: 'Başla',
    navTools: 'Araçlar',
    navUpload: 'Yükle',
    navWhy: 'Neden Biz',
    navPricing: 'Fiyatlar',
    navFaq: 'SSS',
    heroEyebrow: 'Premium PDF SaaS',
    heroTitle: 'PDF’leri kurumsal hızda dönüştürün, birleştirin ve sıkıştırın.',
    heroDescription: 'PDF Tools Pro, ekipler, serbest çalışanlar ve yaratıcılar için eksiksiz bir PDF iş akışı sunar.',
    heroPrimary: 'Araçları keşfet',
    heroSecondary: 'Fiyatları gör',
    heroBadge: 'Güvenilir dönüşüm paketi',
    heroUptime: 'çalışma süresi',
    heroCardText: 'Yapay zeka destekli işlem, güvenli yükleme ve hızlı indirmelerle işinizi hızlandırın.',
    heroFeature1: 'Hızlı dönüşüm',
    heroFeatureText1: 'Resimler, Word ve belgeler.',
    heroFeature2: 'Güvenli dışa aktarım',
    heroFeatureText2: 'Veriler gelişmiş şifreleme ile korunur.',
    toolsEyebrow: 'PDF Araçları',
    toolsTitle: 'Her PDF iş akışı için premium araçlar.',
    toolImageToPdfTitle: 'Resim to PDF',
    toolImageToPdfText: 'JPG, PNG ve taranmış resimleri paylaşılabilir PDF’e dönüştürün.',
    toolPdfToWordTitle: 'PDF to Word',
    toolPdfToWordText: 'Biçimi koruyarak düzenlenebilir Word belgeleri dışa aktarın.',
    toolWordToPdfTitle: 'Word to PDF',
    toolWordToPdfText: 'Word dosyalarını şık PDF’lere dönüştürün.',
    toolMergePdfTitle: 'Merge PDF',
    toolMergePdfText: 'Birden çok dosyayı tek bir şık PDF’de birleştirin.',
    toolSplitPdfTitle: 'Split PDF',
    toolSplitPdfText: 'İhtiyacınız olan sayfaları kolayca ayırın.',
    toolCompressPdfTitle: 'Compress PDF',
    toolCompressPdfText: 'Kaliteden ödün vermeden dosya boyutunu küçültün.',
    toolRemovePagesTitle: 'Sayfa kaldır',
    toolRemovePagesText: 'İstenmeyen sayfaları silin ve önemli içeriği koruyun.',
    toolPdfToJpgTitle: 'PDF to JPG',
    toolPdfToJpgText: 'PDF sayfalarından net görüntüler çıkarın.',
    uploadEyebrow: 'Sürükle ve bırak hazır',
    uploadTitle: 'Dosyaları anında yükleyin ve gerçek zamanlı ilerlemeyi görün.',
    uploadText: 'PDF belgelerinizi bırakın veya cihazınızdan seçin.',
    uploadButton: 'Dosya yükle',
    uploadHint: 'PDF, JPG, PNG formatlarını 20MB’a kadar destekler.',
    uploadDropzone: 'Dosyaları buraya bırakın veya yüklemek için tıklayın',
    fileNameLabel: 'Seçilen dosya',
    fileSizeLabel: 'Dosya boyutu',
    progressText: 'Yükleme bekleniyor…',
    uploadDone: 'Yükleme tamamlandı',
    whyEyebrow: 'Neden bizi seçmelisiniz',
    whyTitle: 'Performans, güvenlik ve modern iş akışları için tasarlandı.',
    whyFastTitle: 'Hızlı dönüşüm',
    whyFastText: 'Sürecinizi hareket halinde tutan optimize motorlarla anında sonuçlar.',
    whySecurityTitle: 'Askeri düzey güvenlik',
    whySecurityText: 'Her belge yüklemesi için şifreli aktarım ve güvenli depolama.',
    whyAiTitle: 'Yapay zeka optimizasyonu',
    whyAiText: 'Akıllı sıkıştırma ve biçimlendirme araçları manuel işi azaltır.',
    whyCloudTitle: 'Bulut işlemleri',
    whyCloudText: 'Hızlı bulut tabanlı belge işleme ile sınırsız ölçeklendirin.',
    whyFreeTitle: 'Ücretsiz araçlar',
    whyFreeText: 'Yükseltmeden önce temel PDF işlevlerini ücretsiz deneyin.',
    statsFiles: '10M+',
    statsFilesText: 'dönüştürülen dosya',
    statsUsers: '500K+',
    statsUsersText: 'kullanıcı',
    statsUptime: '99.9%',
    statsUptimeText: 'çalışma süresi',
    statsGlobal: 'Küresel',
    statsGlobalText: 'kullanılabilirlik',
    pricingEyebrow: 'Fiyatlandırma',
    pricingTitle: 'İş akışınızla büyüyecek planı seçin.',
    freePlanName: 'Ücretsiz',
    freePlanFeature1: 'Günde 5 dönüşüm',
    freePlanFeature2: 'Temel yükleme araçları',
    freePlanFeature3: 'Topluluk desteği',
    freePlanButton: 'Ücretsiz başla',
    proPlanName: 'Pro',
    proPlanFeature1: 'Sınırsız dönüşüm',
    proPlanFeature2: 'Daha hızlı işlem',
    proPlanFeature3: 'Öncelikli e-posta desteği',
    proPlanButton: 'Pro’ya geç',
    businessPlanName: 'Business',
    businessPlanFeature1: 'Takım yönetimi',
    businessPlanFeature2: 'Gelişmiş güvenlik',
    businessPlanFeature3: 'Özel destek',
    businessPlanButton: 'Satışla iletişime geç',
    testimonialsEyebrow: 'Referanslar',
    testimonialsTitle: 'Dünyanın dört bir yanındaki yaratıcılar ve ekipler tarafından sevildi.',
    testimonialText1: '"Kullandığım en hızlı PDF deneyimi. Her yükleme güvenli ve kusursuz."',
    testimonialName1: 'Aya M. — Ürün Müdürü',
    testimonialText2: '"Belgeleri dönüştürmeyi ve paylaşmayı kolaylaştıran şık bir araç seti."',
    testimonialName2: 'Luis G. — Serbest Tasarımcı',
    testimonialText3: '"Premium arayüz ve akıllı otomasyon, rapor yönetiminde zaman kazandırdı."',
    testimonialName3: 'Emre T. — Operasyon Lideri',
    faqEyebrow: 'SSS',
    faqTitle: 'PDF Tools Pro hakkında sık sorulan sorular.',
    faqQuestion1: 'PDF Tools Pro’yu ücretsiz kullanabilir miyim?',
    faqAnswer1: 'Evet. Ücretsiz plan temel özellikleri içerir ve denemek için idealdir.',
    faqQuestion2: 'Dosya yükleme güvenli mi?',
    faqAnswer2: 'Kesinlikle. Belgelerinizi korumak için şifreli işlem ve geçici depolama kullanıyoruz.',
    faqQuestion3: 'Büyük birden fazla dosya yüklemeyi destekliyor musunuz?',
    faqAnswer3: 'Evet. Business müşterileri daha büyük dosya ve toplu işlemler için öncelik alır.',
    adPlaceholder: 'AdSense için hazır premium alan',
    footerBrand: 'PDF Tools Pro',
    footerCopy: 'Modern yaratıcılara yönelik güvenli ve şık PDF araçları.',
    privacyPolicy: 'Gizlilik Politikası',
    termsOfService: 'Hizmet Şartları',
    footerContact: 'İletişim'
  }
};

function updateLanguage(language) {
  const isRtl = language === 'ar';
  document.documentElement.lang = language;
  document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  document.body.classList.toggle('rtl', isRtl);

  const selected = translations[language] || translations.en;
  Object.entries(selected).forEach(([key, value]) => {
    const element = document.querySelector(`[data-key="${key}"]`);
    if (element) {
      element.textContent = value;
    }
  });
}

function convertImageToPdf(file) {
  const { jsPDF } = window.jspdf || {};
  if (!jsPDF) {
    alert('الرجاء الاتصال بالإنترنت لتحميل مكتبة تحويل PDF.');
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    const imgData = reader.result;
    const img = new Image();
    img.onload = () => {
      const pdf = new jsPDF({ unit: 'px', format: 'a4' });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const ratio = Math.min(pageWidth / img.width, pageHeight / img.height);
      const imgWidth = img.width * ratio;
      const imgHeight = img.height * ratio;
      const x = (pageWidth - imgWidth) / 2;
      const y = (pageHeight - imgHeight) / 2;
      const imgType = file.type === 'image/png' ? 'PNG' : 'JPEG';
      pdf.addImage(img, imgType, x, y, imgWidth, imgHeight);
      pdf.save(file.name.replace(/\.(jpg|jpeg|png)$/i, '.pdf'));
    };
    img.src = imgData;
  };
  reader.readAsDataURL(file);
}

function handleFile(file) {
  if (!file) return;

  const sizeMB = (file.size / 1024 / 1024).toFixed(2);
  fileNameDisplay.textContent = file.name;
  fileSizeDisplay.textContent = `${sizeMB} MB`;
  progressText.textContent = translations[document.documentElement.lang].progressText;
  progressPercent.textContent = '0%';
  progressFill.style.width = '0%';

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 8) + 4;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      progressText.textContent = translations[document.documentElement.lang].uploadDone || 'Upload complete';
      if (supportedImageTypes.includes(file.type)) {
        convertImageToPdf(file);
      }
    }
    progressFill.style.width = `${progress}%`;
    progressPercent.textContent = `${progress}%`;
  }, 200);
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

langItems.forEach((item) => {
  item.addEventListener('click', () => {
    const selectedLang = item.dataset.lang;
    if (selectedLang) {
      langButton.textContent = item.textContent;
      langSwitcher.classList.remove('open');
      langButton.setAttribute('aria-expanded', 'false');
      updateLanguage(selectedLang);
    }
  });
});

window.addEventListener('click', (event) => {
  if (!langSwitcher.contains(event.target)) {
    langSwitcher.classList.remove('open');
    langButton.setAttribute('aria-expanded', 'false');
  }
});

const uploadTargets = [uploadButton, uploadArea, uploadDropzone];
uploadTargets.forEach((target) => {
  target?.addEventListener('click', () => fileInput.click());
});

if (imageToPdfCard) {
  imageToPdfCard.style.cursor = 'pointer';
  imageToPdfCard.addEventListener('click', () => fileInput.click());
}

fileInput.addEventListener('change', () => {
  const file = fileInput.files?.[0];
  if (file) {
    handleFile(file);
  }
});

['dragenter', 'dragover'].forEach((eventName) => {
  uploadDropzone.addEventListener(eventName, (event) => {
    event.preventDefault();
    event.stopPropagation();
    uploadDropzone.classList.add('dragging');
  });
});

['dragleave', 'dragend'].forEach((eventName) => {
  uploadDropzone.addEventListener(eventName, (event) => {
    event.preventDefault();
    event.stopPropagation();
    uploadDropzone.classList.remove('dragging');
  });
});

uploadDropzone.addEventListener('drop', (event) => {
  event.preventDefault();
  event.stopPropagation();
  uploadDropzone.classList.remove('dragging');
  const file = event.dataTransfer?.files?.[0];
  if (file) {
    handleFile(file);
  }
});

faqItems.forEach((item) => {
  const button = item.querySelector('.faq-question');
  button?.addEventListener('click', () => {
    item.classList.toggle('open');
  });
});

if (langButton) {
  langButton.textContent = 'العربية';
}

updateLanguage('ar');
