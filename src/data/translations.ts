import { Language } from '../types';

export const translations = {
  en: {
    appTitle: 'CropShield',
    appSubtitle: 'National Crop Health & Disease Early Warning System',
    farmerPortal: 'Farmer Portal',
    officerPortal: 'Agriculture Officer Portal',
    switchRole: 'Switch View',
    
    // Farmer Home
    greeting: 'Namaste, Kisan Mitra',
    farmOverview: 'Farm Overview',
    fieldStatus: 'Field Health Status',
    statusHealthy: 'Normal - Low Threat',
    statusWarning: 'Watchful - Moderate Risk',
    statusCritical: 'Alert - High Risk Detected',
    
    // Quick Metrics
    currentRisk: 'Current Disease Risk',
    activeCrop: 'Active Crop',
    growthStage: 'Growth Stage',
    location: 'Farm Location',
    
    // Actions
    scanButton: 'Scan Your Crop',
    scanSubtitle: 'Take a close photo of the affected leaf or plant',
    viewHistory: 'Past Scans & Reports',
    contactKvk: 'Consult KVK Officer',
    
    // Weather Card
    weatherTitle: 'Farm Microclimate',
    weatherUpdated: 'Live update from regional station',
    temp: 'Temperature',
    humidity: 'Relative Humidity',
    rainfall: 'Rainfall (24h)',
    rainProb: 'Rain Probability',
    wind: 'Wind Speed',
    
    // Alerts
    alertsTitle: 'Tehsil & Regional Alerts',
    noAlerts: 'No critical epidemic warnings in your immediate tehsil.',
    
    // Recent Reports
    recentReportsTitle: 'Your Recent Crop Scans',
    viewAllReports: 'View All Reports',
    noReportsYet: 'No previous scans recorded. Take your first photo to begin surveillance.',
    
    // Scanning Modal
    scanModalTitle: 'Crop Health Scanner',
    scanStepSelect: '1. Select Crop & Growth Stage',
    scanStepCapture: '2. Capture or Upload Leaf Image',
    scanStepAnalyze: '3. AI Diagnostics & Risk Evaluation',
    selectCropLabel: 'Select Crop',
    selectVarietyLabel: 'Variety (Optional)',
    selectStageLabel: 'Growth Stage',
    uploadPrompt: 'Tap to take a photo or select an image from gallery',
    uploadTip: 'For accurate results: Photograph in good daylight. Capture a clear, close view of the affected leaf showing visible spots or discoloration.',
    changeImage: 'Change Image',
    startAnalysisBtn: 'Analyze Crop Health',
    analyzingTitle: 'Analyzing foliar sample...',
    analyzingStep1: 'Verifying leaf image resolution and illumination...',
    analyzingStep2: 'Running MobileNetV3 multi-class neural inference...',
    analyzingStep3: 'Retrieving local microclimate & rainfall records...',
    analyzingStep4: 'Synthesizing Integrated Pest Management guidelines...',
    
    // Results
    resultTitle: 'Crop Health Diagnostic Report',
    detectedCondition: 'Possible Condition',
    confidenceScore: 'AI Confidence Score',
    riskLevelLabel: 'Calculated Outbreak Risk',
    riskLowNotice: 'Low environmental conduciveness. Standard preventive monitoring recommended.',
    riskMedNotice: 'Moderate risk. Microclimate favors pathogen incubation. Action advised.',
    riskHighNotice: 'High outbreak risk! Weather and nearby reports indicate rapid spread conditions.',
    confidenceWarning: 'Low confidence detection (<60%). We strongly recommend taking another photo in clearer lighting or requesting a manual review by your local KVK officer.',
    
    // Risk Breakdown
    riskFactorsTitle: 'Why is this risk level assigned?',
    riskFactorsSubtitle: 'CropShield combines visual symptoms, regional weather, and crop phenology instead of relying on image detection alone:',
    factorRainfall: 'Recent Rainfall & Moisture',
    factorHumidity: 'High Foliar Humidity',
    factorStage: 'Growth Stage Vulnerability',
    factorHotspot: 'Nearby Tehsil Reports',
    
    // Advisory
    advisoryTitle: 'Integrated Pest Management (IPM) Advisory',
    advisorySubtitle: 'Curated agricultural practices compliant with SAU & ICAR guidelines',
    categoryCultural: 'Cultural & Preventive Practices',
    categoryBiological: 'Biological & Organic Control',
    categoryMonitoring: 'Field Scouting & Monitoring',
    categoryChemical: 'Official Chemical Intervention',
    categoryExpert: 'Officer Consultation',
    disclaimerIpm: 'Guidelines derived from ICAR / Dr. PDKV / MPKV agronomy protocols. Strictly adhere to approved safety dosages.',
    
    // Buttons
    close: 'Close',
    saveReport: 'Save to My Records',
    reportSaved: 'Saved to Farm Records',
    requestExpertReview: 'Request Officer Verification',
    reviewRequested: 'Review Request Submitted to Local KVK',
    
    // Expert / Officer Dashboard
    expertDashboardTitle: 'Agricultural Authority Surveillance Dashboard',
    expertDashboardSubtitle: 'District-level pest & disease epidemiological monitoring and triage verification',
    kpiTotalReports: 'Total Submissions',
    kpiHighRisk: 'Active High-Risk Clusters',
    kpiPendingReview: 'Pending Verification',
    kpiVerifiedRate: 'Expert Verification Rate',
    
    // Map & Hotspots
    mapTitle: 'Maharashtra Regional Outbreak Hotspot Map',
    filterByCrop: 'Filter by Crop',
    filterByRisk: 'Filter by Risk Level',
    allCrops: 'All Crops',
    allRisks: 'All Risk Levels',
    trendRising: 'Spread Increasing',
    trendStable: 'Contained',
    trendDeclining: 'Declining',
    
    // Verification Queue
    queueTitle: 'Farmer Cases Requiring Field Verification',
    queueSubtitle: 'Review incoming AI classifications and mark verified ground-truth records',
    colId: 'Case ID',
    colDate: 'Timestamp',
    colLocation: 'Tehsil / District',
    colCrop: 'Crop & Stage',
    colPrediction: 'AI Prediction',
    colConfidence: 'Confidence',
    colRisk: 'Risk',
    colStatus: 'Status',
    colAction: 'Action',
    actionReview: 'Review Case',
    statusPending: 'Pending',
    statusVerified: 'Verified',
    statusRejected: 'Rejected',
    
    // Review Modal
    reviewModalTitle: 'Expert Triage Verification',
    verifyAccept: 'Confirm AI Diagnosis',
    verifyChange: 'Correct Diagnosis',
    expertNotesLabel: 'Officer Field Notes & Farmer Guidance',
    expertNotesPlaceholder: 'e.g., Symptoms consistent with early stage Alternaria; recommended field isolation and copper-based foliar spray.',
    confirmVerificationBtn: 'Submit Official Verification',
    verificationFeedbackNotice: 'Submitting this verification immediately updates the farmer advisory and marks this record as validated ground-truth data for seasonal reporting.',
    
    // Risk Levels
    riskLow: 'LOW',
    riskMed: 'MEDIUM',
    riskHigh: 'HIGH',
    
    // Growth Stages
    stageSeedling: 'Seedling / Early vegetative',
    stageVegetative: 'Vegetative growth',
    stageFlowering: 'Flowering & budding',
    stageFruitingBoll: 'Fruiting / Boll formation',
    stageMaturity: 'Maturity / Harvest stage',
  },

  mr: {
    appTitle: 'क्रॉपशील्ड (CropShield)',
    appSubtitle: 'राष्ट्रीय पीक आरोग्य आणि रोग पूर्वसूचना प्रणाली',
    farmerPortal: 'शेतकरी कक्ष',
    officerPortal: 'कृषी अधिकारी कक्ष',
    switchRole: 'दृश्य बदला',
    
    // Farmer Home
    greeting: 'नमस्ते, शेतकरी मित्र',
    farmOverview: 'माझे शेत व पीक माहिती',
    fieldStatus: 'पीक आरोग्य स्थिती',
    statusHealthy: 'सामान्य - कोणताही धोका नाही',
    statusWarning: 'सावधगिरी - मध्यम जोखीम',
    statusCritical: 'धोका इशारा - उच्च जोखीम आढळली',
    
    // Quick Metrics
    currentRisk: 'सध्याचा रोग प्रसार धोका',
    activeCrop: 'सध्याचे पीक',
    growthStage: 'पिकाची वाढीची अवस्था',
    location: 'शेताचे ठिकाण',
    
    // Actions
    scanButton: 'पिकाचा फोटो तपासा',
    scanSubtitle: 'बाधित पानाचा किंवा रोगाचा स्पष्ट फोटो काढा',
    viewHistory: 'मागील तपासणी अहवाल',
    contactKvk: 'कृषी विज्ञान केंद्र (KVK) सल्ला',
    
    // Weather Card
    weatherTitle: 'स्थानिक हवामान स्थिती',
    weatherUpdated: 'स्थानिक वेधशाळेकडून थेट माहिती',
    temp: 'तापमान',
    humidity: 'हवेतील आर्द्रता',
    rainfall: 'गेल्या २४ तासांतील पाऊस',
    rainProb: 'पावसाची शक्यता',
    wind: 'वाऱ्याचा वेग',
    
    // Alerts
    alertsTitle: 'तालुका व विभागीय सूचना',
    noAlerts: 'तुमच्या तालुक्यात सध्या कोणतीही गंभीर रोगराई नाही.',
    
    // Recent Reports
    recentReportsTitle: 'मागील पीक तपासणी नोंदी',
    viewAllReports: 'सर्व अहवाल पहा',
    noReportsYet: 'अद्याप कोणतीही तपासणी केलेली नाही. पहिल्या तपासणीसाठी कॅमेरा वापरा.',
    
    // Scanning Modal
    scanModalTitle: 'पीक आरोग्य स्कॅनर',
    scanStepSelect: '१. पीक आणि वाढीची अवस्था निवडा',
    scanStepCapture: '२. पानाचा फोटो काढा किंवा निवडा',
    scanStepAnalyze: '३. एआय विश्लेषण व धोका पडताळणी',
    selectCropLabel: 'पीक निवडा',
    selectVarietyLabel: 'वाण / जात (ऐच्छिक)',
    selectStageLabel: 'पिकाची अवस्था',
    uploadPrompt: 'फोटो काढण्यासाठी किंवा गॅलरीतून निवडण्यासाठी येथे टॅप करा',
    uploadTip: 'अचूक निदानासाठी: चांगल्या सूर्यप्रकाशात फोटो घ्या. पानावरील डाग आणि रंगबदल स्पष्ट दिसेल असा जवळून फोटो काढा.',
    changeImage: 'फोटो बदला',
    startAnalysisBtn: 'पीक आरोग्य तपासा',
    analyzingTitle: 'पानाच्या नमुन्याचे विश्लेषण सुरू आहे...',
    analyzingStep1: 'पानाच्या फोटोची गुणवत्ता व प्रकाश तपासत आहे...',
    analyzingStep2: 'मोबाईलनेट न्युरल नेटवर्कद्वारे रोग पडताळणी चालू आहे...',
    analyzingStep3: 'स्थानिक हवामान आणि पावसाची आकडेवारी मिळवत आहे...',
    analyzingStep4: 'एकात्मिक कीड व्यवस्थापन (IPM) शिफारसी तयार करत आहे...',
    
    // Results
    resultTitle: 'पीक आरोग्य तपासणी निष्कर्ष',
    detectedCondition: 'संभाव्य रोग किंवा कीड',
    confidenceScore: 'एआय अचूकता / आत्मविश्वास',
    riskLevelLabel: 'रोग प्रसाराचा धोका',
    riskLowNotice: 'वातावरण रोगासाठी अनुकूल नाही. नियमित देखरेख ठेवा.',
    riskMedNotice: 'मध्यम धोका. हवेतील दमटपणामुळे रोग वाढू शकतो. काळजी घ्या.',
    riskHighNotice: 'उच्च धोका! पाऊस व आर्द्रतेमुळे रोग वेगाने पसरण्याची दाट शक्यता आहे.',
    confidenceWarning: 'कमी आत्मविश्वास निदान (<६०%). चांगल्या प्रकाशात पुन्हा फोटो घ्या किंवा कृषी अधिकाऱ्यांचा सल्ला घ्या.',
    
    // Risk Breakdown
    riskFactorsTitle: 'हा धोका कशामुळे जास्त आहे?',
    riskFactorsSubtitle: 'क्रॉपशील्ड केवळ फोटोवर अवलंबून न राहता हवामान, पाऊस आणि वाढीच्या अवस्थेचा एकत्रित विचार करते:',
    factorRainfall: 'अलीकडील पाऊस व ओलसरपणा',
    factorHumidity: 'पानावरील अतिरिक्त आर्द्रता',
    factorStage: 'वाढीच्या अवस्थेतील संवेदनशीलता',
    factorHotspot: 'परिसरातील इतर शेतांतील नोंदी',
    
    // Advisory
    advisoryTitle: 'एकात्मिक कीड व रोग व्यवस्थापन (IPM) सल्ला',
    advisorySubtitle: 'कृषी विद्यापीठ आणि ICAR प्रमाणित सुरक्षित उपाययोजना',
    categoryCultural: 'मशागतीचे व प्रतिबंधात्मक उपाय',
    categoryBiological: 'जैविक व सेंद्रिय नियंत्रण',
    categoryMonitoring: 'शेताची पाहणी व निरीक्षण',
    categoryChemical: 'अधिकृत रासायनिक उपाय',
    categoryExpert: 'कृषी अधिकारी सल्ला',
    disclaimerIpm: 'शिफारशी डॉ. पंजाबराव देशमुख व म.फु.कृ.वि. मार्गदर्शक तत्त्वांनुसार आहेत. लेबलवरील सूचनांचे तंतोतंत पालन करा.',
    
    // Buttons
    close: 'बंद करा',
    saveReport: 'अहवाल जतन करा',
    reportSaved: 'अहवाल सुरक्षित जतन केला',
    requestExpertReview: 'कृषी अधिकाऱ्यांची मदत मागा',
    reviewRequested: 'स्थानिक KVK कृषी अधिकाऱ्यांना विनंती पाठवली आहे',
    
    // Expert / Officer Dashboard
    expertDashboardTitle: 'कृषी विभाग क्षेत्रीय नियंत्रण कक्ष',
    expertDashboardSubtitle: 'जिल्हास्तरीय पीक रोग व कीड प्रादुर्भाव निरीक्षण आणि पडताळणी',
    kpiTotalReports: 'एकूण प्राप्त अहवाल',
    kpiHighRisk: 'उच्च धोका क्षेत्रे',
    kpiPendingReview: 'प्रलंबित पडताळणी',
    kpiVerifiedRate: 'अधिकारी पडताळणी दर',
    
    // Map & Hotspots
    mapTitle: 'महाराष्ट्र प्रादुर्भाव नकाशा (Hotspots)',
    filterByCrop: 'पिकानुसार निवडा',
    filterByRisk: 'धोका पातळीनुसार निवडा',
    allCrops: 'सर्व पिके',
    allRisks: 'सर्व धोके',
    trendRising: 'प्रसार वाढत आहे',
    trendStable: 'नियंत्रणात',
    trendDeclining: 'कमी होत आहे',
    
    // Verification Queue
    queueTitle: 'तपासणीसाठी प्रलंबित शेतकरी प्रकरणे',
    queueSubtitle: 'एआय निष्कर्षांची पाहणी करा आणि प्रत्यक्ष खात्री करून नोंद करा',
    colId: 'क्रमांक',
    colDate: 'वेळ',
    colLocation: 'तालुका / जिल्हा',
    colCrop: 'पीक व अवस्था',
    colPrediction: 'एआय निदान',
    colConfidence: 'अचूकता',
    colRisk: 'धोका',
    colStatus: 'स्थिती',
    colAction: 'कृती',
    actionReview: 'तपासा',
    statusPending: 'प्रलंबित',
    statusVerified: 'प्रमाणित',
    statusRejected: 'नाकारले',
    
    // Review Modal
    reviewModalTitle: 'तज्ज्ञ पडताळणी व प्रमाणीकरण',
    verifyAccept: 'एआय निदान मान्य करा',
    verifyChange: 'निदान दुरुस्त करा',
    expertNotesLabel: 'शेतकऱ्यासाठी अधिकाऱ्याचा सल्ला व शेरा',
    expertNotesPlaceholder: 'उदा. लक्षणांवरून लवकर येणारा करपा दिसत आहे; ताबडतोब ट्रायकोडर्मा किंवा तांबायुक्त बुरशीनाशकाची फवारणी करावी.',
    confirmVerificationBtn: 'प्रमाणित नोंद सबमिट करा',
    verificationFeedbackNotice: 'प्रमाणीकरणामुळे शेतकऱ्याचा अहवाल अद्ययावत होईल आणि भविष्यातील अचूकतेसाठी हा डेटा जतन केला जाईल.',
    
    // Risk Levels
    riskLow: 'कमी',
    riskMed: 'मध्यम',
    riskHigh: 'उच्च',
    
    // Growth Stages
    stageSeedling: 'रोप अवस्था / सुरुवातीची वाढ',
    stageVegetative: 'शाकीय वाढीची अवस्था',
    stageFlowering: 'फुलधारणा व कळ्यांची अवस्था',
    stageFruitingBoll: 'फळधारणा / बोंड अवस्था',
    stageMaturity: 'पक्वता / काढणी अवस्था',
  },

  hi: {
    appTitle: 'क्रॉपशील्ड (CropShield)',
    appSubtitle: 'राष्ट्रीय फसल स्वास्थ्य एवं रोग पूर्व-चेतावनी प्रणाली',
    farmerPortal: 'किसान पोर्टल',
    officerPortal: 'कृषि अधिकारी पोर्टल',
    switchRole: 'दृष्टिकोण बदलें',
    
    // Farmer Home
    greeting: 'नमस्ते, किसान मित्र',
    farmOverview: 'खेत एवं फसल विवरण',
    fieldStatus: 'फसल स्वास्थ्य स्थिति',
    statusHealthy: 'सामान्य - कोई खतरा नहीं',
    statusWarning: 'सतर्कता - मध्यम जोखिम',
    statusCritical: 'चेतावनी - उच्च जोखिम दर्ज',
    
    // Quick Metrics
    currentRisk: 'वर्तमान रोग प्रसार जोखिम',
    activeCrop: 'वर्तमान फसल',
    growthStage: 'फसल की अवस्था',
    location: 'खेत का स्थान',
    
    // Actions
    scanButton: 'फसल का फोटो जांचें',
    scanSubtitle: 'प्रभावित पत्ती या पौधे की स्पष्ट तस्वीर लें',
    viewHistory: 'पिछले जांच रिपोर्ट',
    contactKvk: 'कृषि विज्ञान केंद्र (KVK) परामर्श',
    
    // Weather Card
    weatherTitle: 'स्थानीय मौसम की स्थिति',
    weatherUpdated: 'क्षेत्रीय वेधशाला से सीधा अपडेट',
    temp: 'तापमान',
    humidity: 'वायुमंडलीय नमी',
    rainfall: 'पिछले २४ घंटे में वर्षा',
    rainProb: 'वर्षा की संभावना',
    wind: 'हवा की गति',
    
    // Alerts
    alertsTitle: 'तहसील एवं क्षेत्रीय अलर्ट',
    noAlerts: 'आपकी तहसील में फिलहाल कोई गंभीर महामारी का खतरा नहीं है।',
    
    // Recent Reports
    recentReportsTitle: 'हालिया फसल जांच रिकॉर्ड',
    viewAllReports: 'सभी रिपोर्ट देखें',
    noReportsYet: 'अभी तक कोई जांच नहीं की गई है। पहला फोटो लेने के लिए कैमरा दबाएं।',
    
    // Scanning Modal
    scanModalTitle: 'फसल स्वास्थ्य स्कैनर',
    scanStepSelect: '१. फसल एवं वृद्धि अवस्था चुनें',
    scanStepCapture: '२. पत्ती की तस्वीर लें या अपलोड करें',
    scanStepAnalyze: '३. एआई जांच एवं जोखिम गणना',
    selectCropLabel: 'फसल चुनें',
    selectVarietyLabel: 'किस्म / प्रजाति (वैकल्पिक)',
    selectStageLabel: 'फसल की अवस्था',
    uploadPrompt: 'फोटो खींचने या गैलरी से चुनने के लिए यहां टैप करें',
    uploadTip: 'सटीक परिणाम के लिए: अच्छी प्राकृतिक रोशनी में फोटो लें। पत्ती के धब्बे स्पष्ट दिखने चाहिए।',
    changeImage: 'फोटो बदलें',
    startAnalysisBtn: 'फसल स्वास्थ्य का विश्लेषण करें',
    analyzingTitle: 'पत्ती के नमूने का विश्लेषण जारी है...',
    analyzingStep1: 'तस्वीर की गुणवत्ता और स्पष्टता की जांच हो रही है...',
    analyzingStep2: 'मोबाइलनैट न्यूरल नेटवर्क द्वारा रोग की पहचान हो रही है...',
    analyzingStep3: 'स्थानीय मौसम एवं वर्षा के आंकड़े प्राप्त किए जा रहे हैं...',
    analyzingStep4: 'एकीकृत कीट प्रबंधन (IPM) सलाह तैयार की जा रही है...',
    
    // Results
    resultTitle: 'फसल स्वास्थ्य जांच परिणाम',
    detectedCondition: 'संभावित रोग अथवा कीट',
    confidenceScore: 'एआई सटीकता / विश्वास',
    riskLevelLabel: 'रोग फैलाव का जोखिम',
    riskLowNotice: 'मौसम रोग के अनुकूल नहीं है। सामान्य निगरानी रखें।',
    riskMedNotice: 'मध्यम जोखिम। नमी बढ़ने से रोग बढ़ सकता है। सावधानी रखें।',
    riskHighNotice: 'उच्च जोखिम! मौसम एवं नजदीकी मामलों से रोग तेजी से फैलने की संभावना है।',
    confidenceWarning: 'कम सटीकता (<६०%)। बेहतर रोशनी में दोबारा फोटो लें या कृषि अधिकारी से संपर्क करें।',
    
    // Risk Breakdown
    riskFactorsTitle: 'यह जोखिम उच्च क्यों है?',
    riskFactorsSubtitle: 'क्रॉपशील्ड केवल फोटो नहीं, बल्कि मौसम, नमी और फसल अवस्था को मिलाकर जोखिम तय करता है:',
    factorRainfall: 'हालिया वर्षा एवं नमी',
    factorHumidity: 'पत्तियों पर अत्यधिक आर्द्रता',
    factorStage: 'वृद्धि अवस्था की संवेदनशीलता',
    factorHotspot: 'आसपास के खेतों में दर्ज मामले',
    
    // Advisory
    advisoryTitle: 'एकीकृत कीट प्रबंधन (IPM) सलाह',
    advisorySubtitle: 'भारतीय कृषि अनुसंधान परिषद (ICAR) प्रमाणित अनुशंसित उपाय',
    categoryCultural: 'कृषि एवं निवारक प्रबंधन',
    categoryBiological: 'जैविक एवं प्राकृतिक नियंत्रण',
    categoryMonitoring: 'खेत की नियमित निगरानी',
    categoryChemical: 'अनुमोदित रासायनिक उपाय',
    categoryExpert: 'कृषि विशेषज्ञ परामर्श',
    disclaimerIpm: 'सलाह अधिकृत कृषि विश्वविद्यालयों के मानकों के अनुसार है। दवाइयों की तय मात्रा का ही उपयोग करें।',
    
    // Buttons
    close: 'बंद करें',
    saveReport: 'रिपोर्ट सहेजें',
    reportSaved: 'खेत रिकॉर्ड में सहेजा गया',
    requestExpertReview: 'अधिकारी जांच का अनुरोध करें',
    reviewRequested: 'स्थानीय केवीके (KVK) को अनुरोध भेज दिया गया है',
    
    // Expert / Officer Dashboard
    expertDashboardTitle: 'कृषि विभाग क्षेत्रीय निगरानी नियंत्रण कक्ष',
    expertDashboardSubtitle: 'जिला स्तरीय फसल रोग एवं कीट निगरानी तथा सत्यापन पोर्टल',
    kpiTotalReports: 'कुल प्राप्त रिपोर्ट',
    kpiHighRisk: 'उच्च जोखिम क्लस्टर',
    kpiPendingReview: 'प्रलंबित सत्यापन',
    kpiVerifiedRate: 'सत्यापन दर',
    
    // Map & Hotspots
    mapTitle: 'महाराष्ट्र क्षेत्रीय प्रकोप मानचित्र (Hotspots)',
    filterByCrop: 'फसल अनुसार चुनें',
    filterByRisk: 'जोखिम अनुसार चुनें',
    allCrops: 'सभी फसलें',
    allRisks: 'सभी जोखिम',
    trendRising: 'फैलाव बढ़ रहा है',
    trendStable: 'नियंत्रित',
    trendDeclining: 'कम हो रहा है',
    
    // Verification Queue
    queueTitle: 'सत्यापन हेतु प्रलंबित किसान मामले',
    queueSubtitle: 'एआई परिणामों की समीक्षा करें और पुष्टि दर्ज करें',
    colId: 'क्रमांक',
    colDate: 'समय',
    colLocation: 'तहसील / जिला',
    colCrop: 'फसल एवं अवस्था',
    colPrediction: 'एआई निदान',
    colConfidence: 'सटीकता',
    colRisk: 'जोखिम',
    colStatus: 'स्थिति',
    colAction: 'कार्यवाही',
    actionReview: 'जांचें',
    statusPending: 'प्रलंबित',
    statusVerified: 'प्रमाणित',
    statusRejected: 'अस्वीकृत',
    
    // Review Modal
    reviewModalTitle: 'विशेषज्ञ सत्यापन एवं प्रमाणीकरण',
    verifyAccept: 'एआई निदान की पुष्टि करें',
    verifyChange: 'निदान सही करें',
    expertNotesLabel: 'किसान के लिए अधिकारी की टिप्पणी व निर्देश',
    expertNotesPlaceholder: 'उदा. पत्तियों पर अल्टरनेरिया के लक्षण दिखाई दे रहे हैं; कॉपर ऑक्सीक्लोराइड का छिड़काव अनुशंसित है।',
    confirmVerificationBtn: 'सत्यापित विवरण जमा करें',
    verificationFeedbackNotice: 'सत्यापन से किसान को तुरंत सही सलाह मिलेगी और यह डेटा आगामी मॉडल प्रशिक्षण के लिए सुरक्षित रहेगा।',
    
    // Risk Levels
    riskLow: 'कम',
    riskMed: 'मध्यम',
    riskHigh: 'उच्च',
    
    // Growth Stages
    stageSeedling: 'अंकुरण / आरंभिक अवस्था',
    stageVegetative: 'वानस्पतिक वृद्धि अवस्था',
    stageFlowering: 'फूल एवं कलियां आने की अवस्था',
    stageFruitingBoll: 'फल / गोलक (बोंड) अवस्था',
    stageMaturity: 'परिपक्वता / कटाई अवस्था',
  }
};
