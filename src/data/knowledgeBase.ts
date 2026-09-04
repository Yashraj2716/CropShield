import { CropInfo, DiseaseInfo, AdvisoryItem } from '../types';

export const CROPS_DATA: CropInfo[] = [
  {
    id: 'tomato',
    nameEn: 'Tomato',
    nameMr: 'टोमॅटो',
    nameHi: 'टमाटर',
    scientificName: 'Solanum lycopersicum',
    varieties: ['Abhinav (अभिनव)', 'Saaho (साहो)', 'Vaishali (वैशाली)', 'Pusa Ruby (पुसा रुबी)', 'Local Desi']
  },
  {
    id: 'cotton',
    nameEn: 'Cotton',
    nameMr: 'कापूस',
    nameHi: 'कपास',
    scientificName: 'Gossypium hirsutum',
    varieties: ['Rasi 659 (रासी ६५९)', 'Ajit 155 (अजित १५५)', 'Bhakti (भक्ती)', 'Ankur 3028', 'Desi Cotton']
  },
  {
    id: 'soybean',
    nameEn: 'Soybean',
    nameMr: 'सोयाबीन',
    nameHi: 'सोयाबीन',
    scientificName: 'Glycine max',
    varieties: ['JS 335 (जेएस ३३५)', 'JS 9305', 'Phule Sangam (फुले संगम / KDS 726)', 'MACS 1407', 'JS 20-34']
  }
];

export const DISEASES_DATA: Record<string, DiseaseInfo> = {
  // TOMATO
  'tomato_early_blight': {
    id: 'tomato_early_blight',
    cropId: 'tomato',
    nameEn: 'Early Blight',
    nameMr: 'लवकर येणारा करपा (Early Blight)',
    nameHi: 'अगेती झुलसा (Early Blight)',
    pathogen: 'Alternaria solani (Fungal)',
    severity: 'Severe',
    category: 'fungal',
    descriptionEn: 'Characterized by dark concentric rings (target board pattern) on older lower leaves, often surrounded by a yellow chlorotic halo. Favored by high humidity and temperatures between 24°C and 29°C.',
    descriptionMr: 'खालच्या जुन्या पानांवर गोलाकार वलय असलेले तपकिरी-काळे ठिपके (टार्गेट बोर्ड पॅटर्न) दिसतात. हवेत ८०% पेक्षा जास्त आर्द्रता असल्यास वेगाने पसरतो.',
    descriptionHi: 'निचली पुरानी पत्तियों पर गहरे संकेंद्री छल्लों वाले भूरे धब्बे बनते हैं। उच्च आर्द्रता एवं २४-२९ डिग्री तापमान में तेजी से फैलता है।'
  },
  'tomato_late_blight': {
    id: 'tomato_late_blight',
    cropId: 'tomato',
    nameEn: 'Late Blight',
    nameMr: 'उशिरा येणारा करपा (Late Blight)',
    nameHi: 'पछेती झुलसा (Late Blight)',
    pathogen: 'Phytophthora infestans (Oomycete)',
    severity: 'Critical',
    category: 'fungal',
    descriptionEn: 'Water-soaked irregular dark green/brown lesions that enlarge rapidly under cool, wet conditions with white mold on leaf undersides. Causes complete crop collapse within days if untreated.',
    descriptionMr: 'थंड आणि ढगाळ दमट वातावरणात पानांवर काळपट पाणथळ डाग पडतात. पानांच्या खाली पांढरी बुरशी दिसते. वेळीच उपाय न केल्यास संपूर्ण पीक करपून नष्ट होते.',
    descriptionHi: 'शीतल और आर्द्र मौसम में पत्तियों पर जल-सिक्त भूरे धब्बे बनते हैं तथा नीचे सफेद फफूंद दिखती है। यह अत्यंत तीव्र गति से फसल नष्ट करता है।'
  },
  'tomato_yellow_leaf_curl': {
    id: 'tomato_yellow_leaf_curl',
    cropId: 'tomato',
    nameEn: 'Yellow Leaf Curl Virus',
    nameMr: 'पिवळा पानांचा गुंडाळा (TYLCV)',
    nameHi: 'पत्ती मरोड़ विषाणु (TYLCV)',
    pathogen: 'Tomato Yellow Leaf Curl Begomovirus (Vectored by Whitefly / Bemisia tabaci)',
    severity: 'Severe',
    category: 'viral',
    descriptionEn: 'Severe upward curling of leaf margins, yellowing (chlorosis), leaf size reduction, and extreme plant stunting. Transmitted primarily by whitefly vectors.',
    descriptionMr: 'पाने वरच्या बाजूला वाटीसारखी गोळा होतात, कडा पिवळ्या पडतात आणि झाडाची वाढ पूर्णपणे खुंटते. पांढऱ्या माशीद्वारे हा विषाणू पसरतो.',
    descriptionHi: 'पत्तियां ऊपर की ओर मुड़कर कप जैसी हो जाती हैं, पीली पड़ती हैं तथा पौधे की बढ़वार रुक जाती है। यह सफेद मक्खी द्वारा फैलता है।'
  },
  'tomato_healthy': {
    id: 'tomato_healthy',
    cropId: 'tomato',
    nameEn: 'Healthy Foliage',
    nameMr: 'निरोगी पीक (Healthy)',
    nameHi: 'स्वस्थ पौधा (Healthy)',
    pathogen: 'None (Control Baseline)',
    severity: 'None',
    category: 'healthy',
    descriptionEn: 'Vigorous green foliage with no observable necrosis, chlorosis, or pathogen signs.',
    descriptionMr: 'पाने निरोगी, हिरवीगार असून कोणताही रोग किंवा किडीचा प्रादुर्भाव नाही.',
    descriptionHi: 'पत्तियां पूरी तरह स्वस्थ, हरी और रोगमुक्त हैं।'
  },

  // COTTON
  'cotton_bacterial_blight': {
    id: 'cotton_bacterial_blight',
    cropId: 'cotton',
    nameEn: 'Bacterial Blight (Black Arm)',
    nameMr: 'जीवाणूजन्य करपा / काळा डाग',
    nameHi: 'जीवाणु झुलसा / काला धब्बा',
    pathogen: 'Xanthomonas citri pv. malvacearum',
    severity: 'Severe',
    category: 'bacterial',
    descriptionEn: 'Angular, water-soaked brown/black lesions bounded by leaf veins on the underside of leaves, progressing to dark lesions along stems (black arm) and bolls.',
    descriptionMr: 'पानांच्या शिरांमुळे मर्यादित राहिलेले कोनीय (Angular) काळपट डाग दिसतात. नंतर फांद्यांवर काळे चट्टे पडून त्या मोडतात (ब्लॅक आर्म).',
    descriptionHi: 'पत्तियों की नसों से सीमित कोणीय काले-भूरे धब्बे बनते हैं। बाद में तनों और गूलरों पर भी काले घाव हो जाते हैं।'
  },
  'cotton_target_spot': {
    id: 'cotton_target_spot',
    cropId: 'cotton',
    nameEn: 'Target Spot (Corynespora)',
    nameMr: 'लक्ष्य ठिपके बुरशीजन्य रोग',
    nameHi: 'टारगेट स्पॉट रोग',
    pathogen: 'Corynespora casiicola',
    severity: 'Moderate',
    category: 'fungal',
    descriptionEn: 'Circular to irregular brown lesions with alternating light and dark concentric rings. High canopy density and prolonged rain accelerate lower leaf drop.',
    descriptionMr: 'पानांवर गोलाकार लहान-मोठे तपकिरी ठिपके दिसतात. दाट पीक आणि सलग पाऊस असल्यास खालची पाने वेगाने गळतात.',
    descriptionHi: 'पत्तियों पर संकेंद्री छल्लेदार गोल धब्बे बनते हैं। अत्यधिक नमी में निचली पत्तियां समय से पहले झड़ने लगती हैं।'
  },
  'cotton_sucking_pest': {
    id: 'cotton_sucking_pest',
    cropId: 'cotton',
    nameEn: 'Sucking Pest Foliar Curl',
    nameMr: 'रसशोषक किडींचे नुकसान (तुडतुडे/मावा)',
    nameHi: 'रस चूसक कीटों का प्रकोप',
    pathogen: 'Amrasca biguttula (Jassids) / Aphis gossypii / Thrips',
    severity: 'Severe',
    category: 'pest_damage',
    descriptionEn: 'Downward curling and yellowing of leaf edges, transitioning to a burnt reddish-brown margin (hopperburn). Sap-sucking by nymphs and adults causes severe vigor loss.',
    descriptionMr: 'पानांच्या कडा खालच्या बाजूने वळतात, पिवळसर आणि तांबूस-तपकिरी होतात (हॉपर बर्न). तुडतुडे व मावा पानांतील रस शोषून घेतात.',
    descriptionHi: 'पत्तियों के किनारे नीचे की ओर मुड़ते हैं और किनारे सूखकर लाल-भूरे हो जाते हैं। रस चूसक कीटों से पौधा कमजोर हो जाता है।'
  },
  'cotton_healthy': {
    id: 'cotton_healthy',
    cropId: 'cotton',
    nameEn: 'Healthy Cotton Foliage',
    nameMr: 'निरोगी कापूस पीक',
    nameHi: 'स्वस्थ कपास का पौधा',
    pathogen: 'None (Control Baseline)',
    severity: 'None',
    category: 'healthy',
    descriptionEn: 'Healthy vegetative canopy with robust square formation and clean foliar structure.',
    descriptionMr: 'झाडाची वाढ जोमदार असून पाने व पात्या पूर्णपणे निरोगी आहेत.',
    descriptionHi: 'पौधे की बढ़वार उत्तम है और पत्तियां बिल्कुल साफ और स्वस्थ हैं।'
  },

  // SOYBEAN
  'soybean_rust': {
    id: 'soybean_rust',
    cropId: 'soybean',
    nameEn: 'Soybean Rust',
    nameMr: 'सोयाबीन तांबेरा (Rust)',
    nameHi: 'सोयाबीन गेरुआ / रतुआ',
    pathogen: 'Phakopsora pachyrhizi (Foliar Basidiomycete)',
    severity: 'Critical',
    category: 'fungal',
    descriptionEn: 'Minute tan to dark brown pustules on leaf undersides emitting rusty powdery spores, causing premature defoliation and severe pod-filling failure during Kharif season.',
    descriptionMr: 'पानांच्या खालील बाजूस बारीक तांबूस-तपकिरी रंगाचे पुटकुळ्यासारखे ठिपके दिसतात, त्यातून तांबूस भुकटी निघते. संपूर्ण पाने पिवळी पडून गळतात.',
    descriptionHi: 'पत्तियों की निचली सतह पर छोटे भूरे-लाल दाने बनते हैं जिनसे पाउडर निकलता है। पत्तियां समय पूर्व गिर जाती हैं और पैदावार घटती है।'
  },
  'soybean_yellow_mosaic': {
    id: 'soybean_yellow_mosaic',
    cropId: 'soybean',
    nameEn: 'Yellow Mosaic Disease',
    nameMr: 'पिवळा मोझॅक विषाणू (YMV)',
    nameHi: 'पीला मोज़ेक विषाणु (YMV)',
    pathogen: 'Mungbean Yellow Mosaic India Virus (Vectored by Whitefly)',
    severity: 'Severe',
    category: 'viral',
    descriptionEn: 'Bright yellow scattered chlorotic patches alternating with green areas on leaves, reducing photosynthetic efficiency and stunting pod development.',
    descriptionMr: 'पानांवर पिवळे व हिरवे चट्टे (मोझॅक) तयार होतात. नवीन पाने पिवळी पडतात आणि शेंगांमध्ये दाणे नीट भरत नाहीत. पांढरी माशी हा रोग पसरवते.',
    descriptionHi: 'पत्तियों पर पीले और हरे रंग के चितकबरे धब्बे बनते हैं। फलियों में दाने नहीं भरते। यह बीमारी सफेद मक्खी द्वारा फैलती है।'
  },
  'soybean_foliar_pest': {
    id: 'soybean_foliar_pest',
    cropId: 'soybean',
    nameEn: 'Foliar Defoliator Damage',
    nameMr: 'पाने खाणारी अळी / लष्करी अळी प्रादुर्भाव',
    nameHi: 'पत्ती खाने वाली इल्ली का प्रकोप',
    pathogen: 'Spodoptera litura / Semilooper (Chrysodeixis acuta)',
    severity: 'Moderate',
    category: 'pest_damage',
    descriptionEn: 'Characteristic skeletonized feeding patterns, irregular shot-holes, and chewed leaf margins with dark fecal pellets visible on foliage.',
    descriptionMr: 'अळ्या पाने कुरतडतात, पानांना छिद्रे पाडतात किंवा फक्त शिरा शिल्लक ठेवतात (चाळणीसारखी पाने होतात). विष्ठा पानावरील भागात दिसते.',
    descriptionHi: 'इल्लियां पत्तियों को खाकर छलनी कर देती हैं। नसों के बीच का हरा भाग खा जाने से केवल जालीदार पत्तियां बचती हैं।'
  },
  'soybean_healthy': {
    id: 'soybean_healthy',
    cropId: 'soybean',
    nameEn: 'Healthy Soybean Canopy',
    nameMr: 'निरोगी सोयाबीन पीक',
    nameHi: 'स्वस्थ सोयाबीन फसल',
    pathogen: 'None (Control Baseline)',
    severity: 'None',
    category: 'healthy',
    descriptionEn: 'Uniformly trifoliate green leaves with clean petioles and vigorous nodulation.',
    descriptionMr: 'सर्व पाने हिरवीगार, निरोगी असून शेंगांची वाढ योग्य गतीने होत आहे.',
    descriptionHi: 'फसल हरी-भरी और पूरी तरह स्वस्थ है।'
  }
};

export const IPM_ADVISORIES: Record<string, AdvisoryItem[]> = {
  'tomato_early_blight': [
    {
      id: 'teb_1',
      category: 'cultural',
      titleEn: 'Field Sanitation & Debris Removal',
      titleMr: 'रोगट पाने गोळा करून नष्ट करणे',
      titleHi: 'संक्रमित पत्तियों को हटाना',
      descEn: 'Prune and safely burn or compost deeply buried lower infected leaves to break fungal spore cycles. Avoid overhead sprinkler irrigation.',
      descMr: 'जमिनीलगतची करपलेली पाने तोडून शेताबाहेर खड्ड्यात गाडून नष्ट करा. तुषार सिंचनाऐवजी ठिबक सिंचनाचा वापर करा.',
      descHi: 'निचली संक्रमित पत्तियों को काटकर खेत से दूर नष्ट करें। फव्वारा सिंचाई के स्थान पर ड्रिप सिंचाई अपनाएं।',
      urgency: 'immediate'
    },
    {
      id: 'teb_2',
      category: 'biological',
      titleEn: 'Bio-Fungicide Soil & Foliar Shield',
      titleMr: 'ट्रायकोडर्मा व्हिरीडी फवारणी',
      titleHi: 'ट्राइकोडर्मा जैविक छिड़काव',
      descEn: 'Foliar application of Trichoderma viride @ 5g/L water during early dawn or late evening to colonize leaf surfaces against Alternaria.',
      descMr: 'ट्रायकोडर्मा व्हिरीडी ५ ग्रॅम प्रति लिटर पाण्यात मिसळून संध्याकाळी फवारणी करावी.',
      descHi: 'ट्राइकोडर्मा विरिडी ५ ग्राम प्रति लीटर पानी में मिलाकर शाम के समय छिड़कें।',
      urgency: 'normal'
    },
    {
      id: 'teb_3',
      category: 'chemical',
      titleEn: 'Approved Contact Fungicide Application',
      titleMr: 'मँकोझेब किंवा कॉपर ऑक्सीक्लोराईड फवारणी',
      titleHi: 'मेंकोजेब या कॉपर ऑक्सीक्लोराइड छिड़काव',
      descEn: 'Spray Mancozeb 75 WP @ 2.0 to 2.5 g/L or Copper Oxychloride 50 WP @ 2.5 g/L water. Maintain 10-12 day interval if wet conditions persist.',
      descMr: 'मँकोझेब ७५% WP २ ते २.५ ग्रॅम किंवा कॉपर ऑक्सीक्लोराईड ५०% WP २.५ ग्रॅम प्रति लिटर पाण्यात मिसळून फवारावे. हवामान दमट असल्यास १० दिवसांनी दुसरी फवारणी करावी.',
      descHi: 'मेंकोजेब ७५ WP २ से २.५ ग्राम अथवा कॉपर ऑक्सीक्लोराइड ५० WP २.५ ग्राम प्रति लीटर पानी में मिलाकर छिड़काव करें।',
      urgency: 'immediate'
    },
    {
      id: 'teb_4',
      category: 'monitoring',
      titleEn: 'Leaf Moisture Scouting',
      titleMr: 'हवामान व पानावरील ओलावा निरीक्षण',
      titleHi: 'पत्ती की नमी पर निगरानी',
      descEn: 'Inspect lower leaf canopies twice weekly, especially after morning dew or intermittent rain events.',
      descMr: 'आठवड्यातून दोनदा शेताची पाहणी करा, विशेषतः सकाळी पडणाऱ्या दवाच्या वेळी रोगाच्या खुणा तपासा.',
      descHi: 'सप्ताह में दो बार निचली पत्तियों की जांच करें, खासकर ओस या बारिश के बाद।',
      urgency: 'normal'
    }
  ],

  'tomato_late_blight': [
    {
      id: 'tlb_1',
      category: 'cultural',
      titleEn: 'Drainage & Air Circulation',
      titleMr: 'पाण्याचा निचरा व झाडांमधील हवा खेळती ठेवणे',
      titleHi: 'जल निकासी एवं वायु संचार सुधार',
      descEn: 'Ensure zero waterlogging in furrows. Stake tomato vines to elevate foliage above damp soil and improve canopy ventilation.',
      descMr: 'शेतात पाणी साचणार नाही याची काळजी घ्या. झाडांना आधार देऊन पाने जमिनीपासून वर ठेवा जेणेकरून हवा खेळती राहील.',
      descHi: 'खेत में जलजमाव न होने दें। पौधों को सहारा देकर पत्तियों को गीली मिट्टी से ऊपर रखें।',
      urgency: 'immediate'
    },
    {
      id: 'tlb_2',
      category: 'chemical',
      titleEn: 'Systemic Fungicidal Intervention',
      titleMr: 'सायमॉक्सानिल + मँकोझेब फवारणी',
      titleHi: 'साइमोक्सानिल + मैंकोजेब छिड़काव',
      descEn: 'Immediately spray Cymoxanil 8% + Mancozeb 64% WP @ 2.0 g/L or Metalaxyl 8% + Mancozeb 64% WP @ 2.5 g/L under overcast epidemic conditions.',
      descMr: 'रोग वेगाने पसरत असल्यास सायमॉक्सानिल ८% + मँकोझेब ६४% WP २ ग्रॅम प्रति लिटर पाण्यात मिसळून ताबडतोब फवारावे.',
      descHi: 'रोग का प्रकोप दिखने पर साइमोक्सानिल ८% + मेंकोजेब ६४% WP २ ग्राम प्रति लीटर पानी में तुरंत छिड़कें।',
      urgency: 'immediate'
    },
    {
      id: 'tlb_3',
      category: 'expert',
      titleEn: 'KVK Agriculture Alert',
      titleMr: 'तालुका कृषी अधिकारी सूचना',
      titleHi: 'केवीके विशेषज्ञ सूचना',
      descEn: 'Inform your local Taluka Agriculture Officer if lesions appear on stem junctions, as late blight spores spread rapidly downwind.',
      descMr: 'रोगाची लक्षणे खोडावर दिसल्यास तात्काळ कृषी विज्ञान केंद्र (KVK) अथवा कृषी सहाय्यकांशी संपर्क साधा.',
      descHi: 'यदि तने पर काले धब्बे दिखें तो तुरंत कृषि विज्ञान केंद्र के विशेषज्ञ से संपर्क करें।',
      urgency: 'normal'
    }
  ],

  'tomato_yellow_leaf_curl': [
    {
      id: 'tylc_1',
      category: 'cultural',
      titleEn: 'Yellow Sticky Traps Installation',
      titleMr: 'पिवळे चिकट सापळे लावणे',
      titleHi: 'पीले चिपचिपे प्रपंच लगाना',
      descEn: 'Install 15-20 yellow sticky traps per acre at canopy height to continuously monitor and trap whitefly vectors.',
      descMr: 'पांढरी माशी पकडण्यासाठी शेतात एकरी १५ ते २० पिवळे चिकट सापळे पिकाच्या उंचीवर लावावेत.',
      descHi: 'सफेद मक्खी को नियंत्रित करने के लिए प्रति एकड़ १५-२० पीले चिपचिपे जाल लगाएं।',
      urgency: 'immediate'
    },
    {
      id: 'tylc_2',
      category: 'biological',
      titleEn: 'Neem-Based Natural Repellent',
      titleMr: 'कडुलिंब तेल (Azadirachtin) फवारणी',
      titleHi: 'नीम तेल का छिड़काव',
      descEn: 'Spray Neem Seed Kernel Extract (NSKE 5%) or Azadirachtin 1500 ppm @ 3.0 to 4.0 ml/L to disrupt whitefly egg laying.',
      descMr: '५% निंबोळी अर्क किंवा अझाडिरॅक्टिन १५०० ppm ३ ते ४ मिली प्रति लिटर पाण्यात मिसळून फवारावे.',
      descHi: 'नीम का तेल (१५०० ppm) ३ से ४ मिली प्रति लीटर पानी में मिलाकर छिड़कें।',
      urgency: 'normal'
    },
    {
      id: 'tylc_3',
      category: 'chemical',
      titleEn: 'Vector Targeted Control',
      titleMr: 'पांढऱ्या माशीचे रासायनिक नियंत्रण',
      titleHi: 'सफेद मक्खी पर कीटनाशक छिड़काव',
      descEn: 'Apply Diafenthiuron 50 WP @ 1.2 g/L or Acetamiprid 20 SP @ 0.3 g/L if adult whitefly count exceeds 5-8 flies per leaf.',
      descMr: 'पांढऱ्या माशीचा प्रादुर्भाव जास्त असल्यास ॲसिटामिप्रीड २० SP ०.३ ग्रॅम किंवा डायफेन्थियुरॉन ५० WP १.२ ग्रॅम प्रति लिटर फवारावे.',
      descHi: 'मक्खियों की संख्या अधिक होने पर एसिटामिप्रिड २० SP ०.३ ग्राम प्रति लीटर की दर से छिड़कें।',
      urgency: 'normal'
    }
  ],

  'tomato_healthy': [
    {
      id: 'th_1',
      category: 'monitoring',
      titleEn: 'Preventive Canopy Surveillance',
      titleMr: 'नियमित पीक पाहणी व स्वच्छता',
      titleHi: 'नियमित फसल निगरानी',
      descEn: 'Maintain regular field scouting. Ensure balanced NPK fertilization avoiding excessive nitrogen which makes foliage tender to blights.',
      descMr: 'पिकाची योग्य वाढ होत आहे. नत्राचा (युरिया) अतिवापर टाळा, कारण त्यामुळे रोगाचा प्रादुर्भाव वाढू शकतो.',
      descHi: 'फसल स्वस्थ है। यूरिया का अधिक उपयोग न करें ताकि पत्तियां फफूंद के प्रति संवेदनशील न हों।',
      urgency: 'normal'
    },
    {
      id: 'th_2',
      category: 'cultural',
      titleEn: 'Mulching & Microclimate Stability',
      titleMr: 'मल्चिंग व सिंचन व्यवस्थापन',
      titleHi: 'मल्चिंग एवं उचित सिंचाई',
      descEn: 'Ensure organic straw or plastic mulch remains intact to minimize soil splash during rains.',
      descMr: 'मातीचे उडणारे थेंब पानांवर पडू नयेत म्हणून आच्छादनाचा (मल्चिंग) वापर सुरू ठेवा.',
      descHi: 'मिट्टी के कण पत्तियों पर न उछलें इसके लिए मल्चिंग बनाए रखें।',
      urgency: 'normal'
    }
  ],

  // COTTON
  'cotton_bacterial_blight': [
    {
      id: 'cbb_1',
      category: 'chemical',
      titleEn: 'Bactericide + Copper Combination',
      titleMr: 'स्ट्रेप्टोसायक्लिन आणि कॉपर ऑक्सीक्लोराईड',
      titleHi: 'स्ट्रेप्टोसाइक्लिन और कॉपर का छिड़काव',
      descEn: 'Spray Streptocycline @ 0.1 g/L (1g in 10L) combined with Copper Oxychloride 50 WP @ 2.5 g/L at first appearance of angular spots.',
      descMr: 'कॉपर ऑक्सीक्लोराईड २५ ग्रॅम + स्ट्रेप्टोसायक्लिन १ ग्रॅम प्रति १० लिटर पाण्यात मिसळून तात्काळ फवारणी करावी.',
      descHi: 'कॉपर ऑक्सीक्लोराइड २५ ग्राम + स्ट्रेप्टोसाइक्लिन १ ग्राम प्रति १० लीटर पानी में मिलाकर तुरंत छिड़कें।',
      urgency: 'immediate'
    },
    {
      id: 'cbb_2',
      category: 'cultural',
      titleEn: 'Field Sanitation in Rainy Spells',
      titleMr: 'पावसात शेताची मशागत सावधपणे करणे',
      titleHi: 'गीले खेत में कार्य से बचें',
      descEn: 'Avoid working in wet cotton fields as farm tools and laborer clothing mechanically transmit bacterial ooze between plants.',
      descMr: 'पाऊस पडताना किंवा पाने ओली असताना शेतात काम करू नका, त्यामुळे जीवाणू एका झाडावरून दुसऱ्या झाडावर पसरतात.',
      descHi: 'पत्तियां गीली होने पर खेत में काम न करें, इससे जीवाणु एक पौधे से दूसरे में फैलते हैं।',
      urgency: 'normal'
    }
  ],

  'cotton_sucking_pest': [
    {
      id: 'csp_1',
      category: 'cultural',
      titleEn: 'Yellow & Blue Sticky Cards',
      titleMr: 'पिवळे व निळे चिकट सापळे',
      titleHi: 'पीले और नीले चिपचिपे कार्ड',
      descEn: 'Erect alternating yellow (for aphids/whiteflies) and blue sticky traps (for thrips) @ 10-12 traps per acre.',
      descMr: 'तुडतुडे व माव्यासाठी पिवळे तर फुलकिड्यांसाठी (थ्रिप्स) निळे चिकट सापळे एकरी १० ते १२ लावावेत.',
      descHi: 'माहू और सफेद मक्खी हेतु पीले तथा थ्रिप्स हेतु नीले स्टिकी कार्ड प्रति एकड़ १०-१२ लगाएं।',
      urgency: 'immediate'
    },
    {
      id: 'csp_2',
      category: 'biological',
      titleEn: 'Botanical Neem Shield (10000 ppm)',
      titleMr: 'निंबोळी अर्क किंवा १०००० ppm कडुलिंब तेल',
      titleHi: 'नीम अर्क छिड़काव',
      descEn: 'Spray cold-pressed Neem Oil (10,000 ppm) @ 2.0 ml/L to deter sucking insect reproduction and feeding.',
      descMr: 'कडुलिंब तेल (१०,००० ppm) २ मिली प्रति लिटर पाण्यात मिसळून फवारावे.',
      descHi: 'नीम का तेल (१०,००० ppm) २ मिली प्रति लीटर पानी में छिड़कें।',
      urgency: 'normal'
    },
    {
      id: 'csp_3',
      category: 'chemical',
      titleEn: 'Selective Neonicotinoid if ETL Breached',
      titleMr: 'थियामेथोक्साम किंवा फ्लोनिकामिड फवारणी',
      titleHi: 'फ्लोनिकामिड या थायमेथोक्सम का छिड़काव',
      descEn: 'If jassid count exceeds 2-3 per leaf (economic threshold), apply Flonicamid 50 WG @ 0.3 g/L or Thiamethoxam 25 WG @ 0.25 g/L.',
      descMr: 'प्रादुर्भाव आर्थिक नुकसानीच्या पातळीवर गेल्यास फ्लोनिकामिड ५० WG ०.३ ग्रॅम किंवा थियामेथोक्साम २५ WG ०.२५ ग्रॅम फवारावे.',
      descHi: 'नुकसान अधिक होने पर फ्लोनिकामिड ५० WG ०.३ ग्राम अथवा थायमेथोक्सम २५ WG ०.२५ ग्राम प्रति लीटर पानी में छिड़कें।',
      urgency: 'immediate'
    }
  ],

  'cotton_target_spot': [
    {
      id: 'cts_1',
      category: 'cultural',
      titleEn: 'Canopy Thinning & Weed Clearing',
      titleMr: 'तण नियंत्रण व अतिरिक्त फुटवे काढणे',
      titleHi: 'खरपतवार नियंत्रण एवं हवा संचार',
      descEn: 'Remove broadleaf weeds in cotton furrows to minimize ground humidity that sparks fungal target spots.',
      descMr: 'ओळींमधील तण काढून टाका जेणेकरून झाडाच्या बुंध्याजवळ हवा खेळती राहील व बुरशी वाढणार नाही.',
      descHi: 'पौधों के बीच खरपतवार निकालें ताकि जमीन के पास हवा का बहाव ठीक रहे।',
      urgency: 'normal'
    },
    {
      id: 'cts_2',
      category: 'chemical',
      titleEn: 'Targeted Triazole Spray',
      titleMr: 'टेब्युकोनॅझोल किंवा प्रोपिकोनेझोल फवारणी',
      titleHi: 'टेबुकोनाजोल का छिड़काव',
      descEn: 'Apply Tebuconazole 25.9% EC @ 1.0 ml/L or Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1.0 ml/L.',
      descMr: 'टेब्युकोनॅझोल २५.९% EC १ मिली किंवा अझॉक्सीस्ट्रॉबिन + डायफेनोकोनॅझोल १ मिली प्रति लिटर फवारावे.',
      descHi: 'टेबुकोनाजोल २५.९% EC १ मिली प्रति लीटर पानी में मिलाकर छिड़कें।',
      urgency: 'immediate'
    }
  ],

  'cotton_healthy': [
    {
      id: 'ch_1',
      category: 'monitoring',
      titleEn: 'Scouting for Square & Boll Integrity',
      titleMr: 'पात्या व बोंडांचे नियमित निरीक्षण',
      titleHi: 'फूल और गूलरों की नियमित निगरानी',
      descEn: 'Inspect 20 random plants weekly for early signs of sucking pests on terminal shoots.',
      descMr: 'आठवड्यातून एकदा शेतातील २० झाडांचे निरीक्षण करून शेंड्यावर रसशोषक किडी नाहीत ना याची खात्री करा.',
      descHi: 'सप्ताह में एक बार पौधों की नई शाखाओं पर कीटों की जांच करते रहें।',
      urgency: 'normal'
    }
  ],

  // SOYBEAN
  'soybean_rust': [
    {
      id: 'sr_1',
      category: 'chemical',
      titleEn: 'Urgent Triazole Protective Spray',
      titleMr: 'हेक्झाकोनॅझोल किंवा टेब्युकोनॅझोल त्वरित फवारणी',
      titleHi: 'हेक्साकोनाजोल या प्रोपिकोनाजोल का तत्काल छिड़काव',
      descEn: 'Apply Hexaconazole 5% EC @ 1.0 ml/L or Propiconazole 25% EC @ 1.0 ml/L at first symptom detection. Rust causes massive defoliation if delayed 48 hours.',
      descMr: 'तांबेऱ्याची लक्षणे दिसताच हेक्झाकोनॅझोल ५% EC १ मिली किंवा प्रोपिकोनेझोल २५% EC १ मिली प्रति लिटर पाण्यात फवारावे.',
      descHi: 'गेरुआ के लक्षण दिखते ही हेक्साकोनाजोल ५% EC १ मिली अथवा प्रोपिकोनाजोल २५% EC १ मिली प्रति लीटर पानी में तुरंत छिड़कें।',
      urgency: 'immediate'
    },
    {
      id: 'sr_2',
      category: 'cultural',
      titleEn: 'Avoid Late Nitrogen Application',
      titleMr: 'अतिरिक्त युरिया टाळणे',
      titleHi: 'यूरिया का अधिक प्रयोग न करें',
      descEn: 'Do not top-dress with nitrogen during rust outbreaks as lush succulent foliage accelerates spore spread.',
      descMr: 'तांबेरा दिसू लागल्यावर शेतात युरिया खताचा वापर करू नये, त्यामुळे पाने मऊ होऊन रोग जास्त पसरतो.',
      descHi: 'रोग दिखने पर यूरिया न डालें, इससे पत्तियां अधिक कोमल होकर रोग को बढ़ावा देती हैं।',
      urgency: 'normal'
    },
    {
      id: 'sr_3',
      category: 'expert',
      titleEn: 'KVK Rust Outbreak Warning',
      titleMr: 'कृषी विद्यापीठ / KVK कडे नोंद करणे',
      titleHi: 'केवीके को सूचना देना',
      descEn: 'Register case with nearest KVK office so aerial spore alerts can be broadcast to neighboring soybean belts.',
      descMr: 'आपल्या तालुक्यातील कृषी विज्ञान केंद्राला (KVK) तात्काळ माहिती द्या जेणेकरून परिसरातील शेतकऱ्यांना सावध करता येईल.',
      descHi: 'नजदीकी कृषि विज्ञान केंद्र को सूचित करें ताकि आसपास के किसानों को सचेत किया जा सके।',
      urgency: 'normal'
    }
  ],

  'soybean_yellow_mosaic': [
    {
      id: 'sym_1',
      category: 'cultural',
      titleEn: 'Rogue Out Systemically Infected Plants',
      titleMr: 'पिवळी पडलेली रोगट झाडे उपटून नष्ट करणे',
      titleHi: 'पीले पौधों को उखाड़कर नष्ट करना',
      descEn: 'During early vegetative stage, immediately rogue out and bury plants showing mosaic symptoms before whiteflies spread virus.',
      descMr: 'सुरुवातीच्या काळात पिवळा मोझॅक दिसलेली झाडे उपटून शेताबाहेर खड्ड्यात गाडून टाकावीत.',
      descHi: 'शुरुआत में पीले दिखे पौधों को उखाड़कर खेत से बाहर मिट्टी में दबा दें।',
      urgency: 'immediate'
    },
    {
      id: 'sym_2',
      category: 'chemical',
      titleEn: 'Control Whitefly Insect Vector',
      titleMr: 'पांढऱ्या माशीचे तातडीने नियंत्रण',
      titleHi: 'सफेद मक्खी पर कीटनाशक नियंत्रण',
      descEn: 'Spray Thiamethoxam 25% WG @ 0.25 g/L or Imidacloprid 17.8% SL @ 0.3 ml/L to halt vector transmission.',
      descMr: 'विषाणू पसरवणाऱ्या पांढऱ्या माशीच्या नियंत्रणासाठी थियामेथोक्साम २५ WG ०.२५ ग्रॅम किंवा इमिडाक्लोप्रिड ०.३ मिली प्रति लिटर पाण्यात फवारावे.',
      descHi: 'सफेद मक्खी पर नियंत्रण के लिए थायमेथोक्सम २५ WG ०.२५ ग्राम या इमिडाक्लोप्रिड ०.३ मिली प्रति लीटर पानी में मिलाकर छिड़कें।',
      urgency: 'immediate'
    }
  ],

  'soybean_foliar_pest': [
    {
      id: 'sfp_1',
      category: 'biological',
      titleEn: 'NPV (Nuclear Polyhedrosis Virus) & Pheromone Traps',
      titleMr: 'कामगंध सापळे व जैविक विषाणू फवारणी',
      titleHi: 'फेरोमोन ट्रैप और जैविक उपाय',
      descEn: 'Install 5 Spodoptera pheromone traps per acre. Spray SlNPV @ 1.5 ml/L during evening hours on early instar larvae.',
      descMr: 'लष्करी अळीच्या नियंत्रणासाठी एकरी ५ कामगंध सापळे लावावेत. लहान अळ्यांवर SlNPV १.५ मिली प्रति लिटर फवारावे.',
      descHi: 'प्रति एकड़ ५ फेरोमोन ट्रैप लगाएं। छोटी इल्लियों पर SlNPV १.५ मिली प्रति लीटर शाम के समय छिड़कें।',
      urgency: 'immediate'
    },
    {
      id: 'sfp_2',
      category: 'chemical',
      titleEn: 'Larvicide Spray on Economic Damage Threshold',
      titleMr: 'इमामेक्टिन बेन्झोएट फवारणी',
      titleHi: 'इमामेक्टिन बेंजोएट का छिड़काव',
      descEn: 'Spray Emamectin Benzoate 5 SG @ 0.4 g/L or Chlorantraniliprole 18.5 SC @ 0.3 ml/L if defoliation exceeds 25%.',
      descMr: 'पानांचे नुकसान २५% पेक्षा जास्त असल्यास इमामेक्टिन बेन्झोएट ५ SG ०.४ ग्रॅम किंवा क्लोरँट्रानिलीप्रोल १८.५ SC ०.३ मिली प्रति लिटर फवारावे.',
      descHi: 'नुकसान अधिक होने पर इमामेक्टिन बेंजोएट ५ SG ०.४ ग्राम या कोराजन ०.३ मिली प्रति लीटर की दर से छिड़कें।',
      urgency: 'immediate'
    }
  ],

  'soybean_healthy': [
    {
      id: 'sh_1',
      category: 'monitoring',
      titleEn: 'Pod-Filling Canopy Health Check',
      titleMr: 'शेंगा भरण्याच्या अवस्थेत पाण्याची पाहणी',
      titleHi: 'फली बनते समय नमी का ध्यान रखें',
      descEn: 'Ensure consistent soil moisture during flowering and pod development. Inspect leaf undersides after rains.',
      descMr: 'फुलधारणा आणि शेंगा भरण्याच्या काळात जमिनीत ओलावा टिकवून ठेवा. पावसाळ्यानंतर पानाच्या खालील बाजूस लक्ष ठेवा.',
      descHi: 'फूल और फलियां बनने के समय खेत में नमी की कमी न होने दें।',
      urgency: 'normal'
    }
  ]
};
