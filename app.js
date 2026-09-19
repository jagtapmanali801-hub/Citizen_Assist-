(() => {
  const D = window.CA_DATA;
  const pages = [...document.querySelectorAll('.page')];
  const navLinks = [...document.querySelectorAll('.nav-link')];
  let activeService = null;
  let selectedPersona = null;
  let chosenFeedback = null;

  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];
  const esc = s => String(s ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));

  const translations = {
    en:{
      home:'Home',services:'Services',apply:'How to Apply',faq:'FAQ',about:'About',contact:'Contact',accessibility:'Accessibility',
      skip:'Skip to main content',brandTag:'Government service guidance',alert:'Independent guidance platform — not a government website. We explain services and link to official portals; applications happen there.',
      badge:'Government Services • Made Simple',heroTitle:'Your Guide to Government Services in Maharashtra',heroDesc:'Get simple, step-by-step guides, checklists and support to help you access government digital services with confidence.',search:'Search',searchPlaceholder:'Search for a service (e.g. Passport, Scholarship, Caste Certificate...)',searchIn:'Search in:',
      guides:'Step-by-Step Guides',guidesDesc:'Understand the process in simple language',checklists:'Checklists',checklistsDesc:'Never miss important documents or steps',chatbot:'AI Chatbot',chatbotDesc:'Get instant answers in your language',portals:'Official Portals',portalsDesc:'Verified government links (no application on our platform)',
      startTask:'START WITH A TASK',needToday:'What do you need today?',taskDesc:'Go directly to common government-service tasks.',findAny:'Find any service →',certificates:'Certificates',certDesc:'Caste, income, domicile & more',scholarships:'Scholarships',scholarDesc:'Student schemes & education',pensions:'Pensions & welfare',pensionDesc:'Social assistance services',land:'Land & property',landDesc:'Revenue and property guidance',driving:'Driving & transport',drivingDesc:'Licence and vehicle services',birth:'Birth & family',birthDesc:'Birth, death and family records',
      discover:'DISCOVER',popular:'Popular Services',viewAll:'View all →',personalise:'PERSONALISE',iam:'I am a...',personaDesc:'Choose a profile to bring relevant services to the top.',featured:'Featured Guides',startHere:'START HERE',
      visualEyebrow:'DESIGNED FOR REAL PEOPLE',visualTitle:'From “I don’t know where to start” to “I’m ready.”',visualDesc:'Citizen Assist turns complicated government-service journeys into clear, friendly steps — discover the service, understand what you need, prepare your documents, and then continue to the verified official portal.',smartSearch:'Smart Search',threeLang:'3 Languages',access:'Accessibility',catEyebrow:'SERVICE CATEGORIES',catTitle:'Browse by government-service area',catDesc:'Choose a category when you know the area but not the exact service.',browse:'Browse services',
      statsAreas:'Citizen-friendly service areas',statsLocal:'Detailed Citizen Assist guides',statsNotified:'Official notified services*',statsPortal:'Portal-available services*',sourceNote:'*Official Aaple Sarkar dashboard figures checked during this build. The full live notified-services catalogue remains the source of truth.',
      directory:'SERVICE DIRECTORY',allServices:'Services available on the official Maharashtra portal',directoryDesc:"Search local guidance entries or open Maharashtra's full live official catalogue.",searchServices:'Search services in English / हिंदी / मराठी',allCategories:'All categories',allDifficulty:'All difficulty',allUsers:'All users',easy:'Easy',medium:'Medium',advanced:'Advanced',officialSource:'Official source',catalogueTitle:'Complete Maharashtra notified-services catalogue',catalogueDesc:'Citizen Assist is a guidance layer. For the complete live government list, use the Maharashtra Aaple Sarkar catalogue.',openCatalogue:'Open Official Full Catalogue ↗',clear:'Clear filters',match:'matching services found',noMatch:'No matching local guide',noMatchDesc:'Try another keyword or use the complete official catalogue above.',searchOfficial:'Search the official catalogue for this keyword ↗',
      viewGuide:'View Guide',officialTitle:'Official title:',category:'Category:',purpose:'Purpose:',lastVerified:'Last verified in this project build:',eligibility:'Eligibility Criteria',prerequisites:'Prerequisites',documents:'Required Documents',steps:'Step-by-Step Instructions',checklist:'Interactive Checklist & Progress',checklistDesc:'Tick preparation items. Progress is stored only in this browser session.',mistakes:'Common Mistakes',troubleshooting:'Troubleshooting',officialDestination:'OFFICIAL DESTINATION',officialPortal:'Official Government Portal',portalDesc:'Citizen Assist does not submit your application. Continue only on the government destination shown for this guide.',officialDomain:'Official domain:',source:'Source:',continuePortal:'Continue to Official Portal ↗',relatedFaq:'Related FAQs',feedback:'Feedback',helpful:'Was this guide helpful?',yes:'Yes',no:'No',submitFeedback:'Submit feedback',
      faqTitle:'Frequently Asked Questions',faqDesc:'Quick answers about Citizen Assist and using official digital services safely.',faqPlaceholder:'Search FAQs',aboutEyebrow:'ABOUT CITIZEN ASSIST',aboutTitle:'Making government digital services easier to understand.',contactTitle:'Contact Citizen Assist',contactDesc:'Send project feedback or report an unclear guide.',send:'Send Message',name:'Name',email:'Email',message:'Message',
      accountTitle:'My Account',accountIntro:'Citizen Assist does not use a government login.',accountFeatures:'In this demo, My Account is for your Citizen Assist preferences only:',accountLang:'Language preference',accountAccess:'Accessibility settings',accountProgress:'Checklist progress saved in this browser',accountFeedback:'Local project feedback',accountNo:'No Aadhaar, PAN, OTP, password, bank details or government credentials are stored here.',close:'Close',
      welcome:'WELCOME TO CITIZEN ASSIST',welcomeTitle:'Government services, made easier to understand.',welcomeDesc:'Search a service, prepare your documents, use the checklist, ask Citizen Assist, and continue safely to the official portal. Citizen Assist is independent and does not process applications.',explore:'Explore Services',learn:'Learn About Us',
      chatName:'Citizen Assist',chatStatus:'AI-assisted guidance • not official government advice',chatNeed:'Need help?',chatAsk:'Ask Citizen Assist',chatPlaceholder:'Ask about a service...',
      independent:'Independent platform — not a government website.'
    },
    hi:{
      home:'होम',services:'सेवाएँ',apply:'आवेदन कैसे करें',faq:'अक्सर पूछे जाने वाले प्रश्न',about:'हमारे बारे में',contact:'संपर्क',accessibility:'सुलभता',skip:'मुख्य सामग्री पर जाएँ',brandTag:'सरकारी सेवा मार्गदर्शन',alert:'स्वतंत्र मार्गदर्शन मंच — यह सरकारी वेबसाइट नहीं है। हम सेवाओं की जानकारी देते हैं और आधिकारिक पोर्टल से जोड़ते हैं; आवेदन वहीं किया जाता है।',
      badge:'सरकारी सेवाएँ • आसान तरीके से',heroTitle:'महाराष्ट्र की सरकारी सेवाओं के लिए आपका मार्गदर्शक',heroDesc:'सरकारी डिजिटल सेवाओं तक आसानी से पहुँचने के लिए सरल चरण-दर-चरण मार्गदर्शन, चेकलिस्ट और सहायता पाएँ।',search:'खोजें',searchPlaceholder:'सेवा खोजें (जैसे पासपोर्ट, छात्रवृत्ति, जाति प्रमाणपत्र...)',searchIn:'खोजें:',guides:'चरण-दर-चरण मार्गदर्शन',guidesDesc:'प्रक्रिया को सरल भाषा में समझें',checklists:'चेकलिस्ट',checklistsDesc:'महत्वपूर्ण दस्तावेज़ या चरण न भूलें',chatbot:'एआई चैटबॉट',chatbotDesc:'अपनी भाषा में तुरंत उत्तर पाएँ',portals:'आधिकारिक पोर्टल',portalsDesc:'सत्यापित सरकारी लिंक (हमारे मंच पर आवेदन नहीं होता)',
      startTask:'काम से शुरू करें',needToday:'आज आपको क्या चाहिए?',taskDesc:'सामान्य सरकारी सेवा कार्यों पर सीधे जाएँ।',findAny:'कोई भी सेवा खोजें →',certificates:'प्रमाणपत्र',certDesc:'जाति, आय, अधिवास और अन्य',scholarships:'छात्रवृत्तियाँ',scholarDesc:'छात्र योजनाएँ और शिक्षा',pensions:'पेंशन और कल्याण',pensionDesc:'सामाजिक सहायता सेवाएँ',land:'भूमि और संपत्ति',landDesc:'राजस्व और संपत्ति मार्गदर्शन',driving:'ड्राइविंग और परिवहन',drivingDesc:'लाइसेंस और वाहन सेवाएँ',birth:'जन्म और परिवार',birthDesc:'जन्म, मृत्यु और पारिवारिक रिकॉर्ड',
      discover:'सेवाएँ खोजें',popular:'लोकप्रिय सेवाएँ',viewAll:'सभी देखें →',personalise:'अपनी आवश्यकता चुनें',iam:'मैं हूँ...',personaDesc:'प्रासंगिक सेवाओं को ऊपर दिखाने के लिए प्रोफ़ाइल चुनें।',featured:'विशेष मार्गदर्शिकाएँ',startHere:'यहाँ से शुरू करें',visualEyebrow:'वास्तविक लोगों के लिए बनाया गया',visualTitle:'“कहाँ से शुरू करूँ?” से “मैं तैयार हूँ।” तक',visualDesc:'Citizen Assist सरकारी सेवा की जटिल प्रक्रिया को आसान चरणों में बदलता है — सेवा खोजें, आवश्यकता समझें, दस्तावेज़ तैयार करें और सत्यापित आधिकारिक पोर्टल पर जाएँ।',smartSearch:'स्मार्ट खोज',threeLang:'3 भाषाएँ',access:'सुलभता',catEyebrow:'सेवा श्रेणियाँ',catTitle:'सरकारी सेवा के क्षेत्र के अनुसार खोजें',catDesc:'क्षेत्र पता हो लेकिन सही सेवा पता न हो तो श्रेणी चुनें।',browse:'सेवाएँ देखें',
      statsAreas:'नागरिक-अनुकूल सेवा क्षेत्र',statsLocal:'विस्तृत Citizen Assist मार्गदर्शिकाएँ',statsNotified:'आधिकारिक अधिसूचित सेवाएँ*',statsPortal:'पोर्टल पर उपलब्ध सेवाएँ*',sourceNote:'*इस बिल्ड के दौरान आधिकारिक Aaple Sarkar डैशबोर्ड के आँकड़े जाँचे गए हैं। पूरी लाइव सूची ही अंतिम स्रोत है।',
      directory:'सेवा निर्देशिका',allServices:'महाराष्ट्र पोर्टल पर उपलब्ध सेवाएँ',directoryDesc:'स्थानीय मार्गदर्शन खोजें या महाराष्ट्र की पूरी लाइव आधिकारिक सूची खोलें।',searchServices:'अंग्रेज़ी / हिंदी / मराठी में सेवा खोजें',allCategories:'सभी श्रेणियाँ',allDifficulty:'सभी कठिनाई स्तर',allUsers:'सभी उपयोगकर्ता',easy:'आसान',medium:'मध्यम',advanced:'उन्नत',officialSource:'आधिकारिक स्रोत',catalogueTitle:'महाराष्ट्र की पूरी अधिसूचित सेवा सूची',catalogueDesc:'Citizen Assist एक मार्गदर्शन मंच है। पूरी लाइव सरकारी सूची के लिए महाराष्ट्र Aaple Sarkar सूची देखें।',openCatalogue:'आधिकारिक पूरी सूची खोलें ↗',clear:'फ़िल्टर साफ़ करें',match:'मिलती सेवाएँ मिलीं',noMatch:'कोई स्थानीय मार्गदर्शिका नहीं मिली',noMatchDesc:'दूसरा कीवर्ड आज़माएँ या ऊपर दी गई आधिकारिक सूची खोलें।',searchOfficial:'इस कीवर्ड के लिए आधिकारिक सूची खोजें ↗',
      viewGuide:'मार्गदर्शिका देखें',officialTitle:'आधिकारिक नाम:',category:'श्रेणी:',purpose:'उद्देश्य:',lastVerified:'इस प्रोजेक्ट बिल्ड में अंतिम जाँच:',eligibility:'पात्रता मानदंड',prerequisites:'पूर्व-आवश्यकताएँ',documents:'आवश्यक दस्तावेज़',steps:'चरण-दर-चरण निर्देश',checklist:'इंटरैक्टिव चेकलिस्ट और प्रगति',checklistDesc:'तैयारी के आइटम पर टिक करें। प्रगति केवल इस ब्राउज़र सत्र में सहेजी जाती है।',mistakes:'सामान्य गलतियाँ',troubleshooting:'समस्या समाधान',officialDestination:'आधिकारिक गंतव्य',officialPortal:'आधिकारिक सरकारी पोर्टल',portalDesc:'Citizen Assist आपका आवेदन जमा नहीं करता। केवल इस मार्गदर्शिका में दिए सरकारी पोर्टल पर आगे बढ़ें।',officialDomain:'आधिकारिक डोमेन:',source:'स्रोत:',continuePortal:'आधिकारिक पोर्टल पर जाएँ ↗',relatedFaq:'संबंधित प्रश्न',feedback:'प्रतिक्रिया',helpful:'क्या यह मार्गदर्शिका उपयोगी थी?',yes:'हाँ',no:'नहीं',submitFeedback:'प्रतिक्रिया भेजें',
      faqTitle:'अक्सर पूछे जाने वाले प्रश्न',faqDesc:'Citizen Assist और आधिकारिक डिजिटल सेवाओं के सुरक्षित उपयोग के बारे में त्वरित उत्तर।',faqPlaceholder:'प्रश्न खोजें',aboutEyebrow:'CITIZEN ASSIST के बारे में',aboutTitle:'सरकारी डिजिटल सेवाओं को समझना आसान बनाना।',contactTitle:'Citizen Assist से संपर्क करें',contactDesc:'प्रोजेक्ट प्रतिक्रिया भेजें या अस्पष्ट मार्गदर्शिका की सूचना दें।',send:'संदेश भेजें',name:'नाम',email:'ईमेल',message:'संदेश',close:'बंद करें',welcome:'CITIZEN ASSIST में आपका स्वागत है',welcomeTitle:'सरकारी सेवाओं को समझना अब आसान है।',welcomeDesc:'सेवा खोजें, दस्तावेज़ तैयार करें, चेकलिस्ट का उपयोग करें, Citizen Assist से पूछें और सुरक्षित रूप से आधिकारिक पोर्टल पर जाएँ। Citizen Assist स्वतंत्र है और आवेदन संसाधित नहीं करता।',explore:'सेवाएँ देखें',learn:'हमारे बारे में',chatName:'Citizen Assist',chatStatus:'एआई मार्गदर्शन • आधिकारिक सरकारी सलाह नहीं',chatNeed:'मदद चाहिए?',chatAsk:'Citizen Assist से पूछें',chatPlaceholder:'किसी सेवा के बारे में पूछें...',independent:'स्वतंत्र मार्गदर्शन मंच — यह सरकारी वेबसाइट नहीं है.'
    },
    mr:{
      home:'मुख्यपृष्ठ',services:'सेवा',apply:'अर्ज कसा करावा',faq:'वारंवार विचारले जाणारे प्रश्न',about:'आमच्याबद्दल',contact:'संपर्क',accessibility:'प्रवेशयोग्यता',skip:'मुख्य मजकुराकडे जा',brandTag:'शासकीय सेवा मार्गदर्शन',alert:'स्वतंत्र मार्गदर्शन मंच — ही सरकारी वेबसाइट नाही. आम्ही सेवांची माहिती देतो आणि अधिकृत पोर्टलशी जोडतो; अर्ज तेथे केला जातो.',badge:'शासकीय सेवा • सोप्या पद्धतीने',heroTitle:'महाराष्ट्रातील शासकीय सेवांसाठी तुमचा मार्गदर्शक',heroDesc:'शासकीय डिजिटल सेवांपर्यंत सहज पोहोचण्यासाठी सोपे चरण-दर-चरण मार्गदर्शन, चेकलिस्ट आणि मदत मिळवा.',search:'शोधा',searchPlaceholder:'सेवा शोधा (उदा. पासपोर्ट, शिष्यवृत्ती, जात प्रमाणपत्र...)',searchIn:'यामध्ये शोधा:',guides:'चरण-दर-चरण मार्गदर्शन',guidesDesc:'प्रक्रिया सोप्या भाषेत समजून घ्या',checklists:'चेकलिस्ट',checklistsDesc:'महत्त्वाची कागदपत्रे किंवा टप्पे विसरू नका',chatbot:'एआय चॅटबॉट',chatbotDesc:'तुमच्या भाषेत त्वरित उत्तरे मिळवा',portals:'अधिकृत पोर्टल',portalsDesc:'सत्यापित शासकीय लिंक (आमच्या मंचावर अर्ज होत नाही)',startTask:'कामापासून सुरुवात करा',needToday:'आज तुम्हाला काय हवे आहे?',taskDesc:'सामान्य शासकीय सेवा थेट निवडा.',findAny:'कोणतीही सेवा शोधा →',certificates:'प्रमाणपत्रे',certDesc:'जात, उत्पन्न, अधिवास आणि इतर',scholarships:'शिष्यवृत्ती',scholarDesc:'विद्यार्थी योजना आणि शिक्षण',pensions:'पेन्शन आणि कल्याण',pensionDesc:'सामाजिक सहाय्य सेवा',land:'जमीन आणि मालमत्ता',landDesc:'महसूल आणि मालमत्ता मार्गदर्शन',driving:'ड्रायव्हिंग आणि परिवहन',drivingDesc:'परवाना आणि वाहन सेवा',birth:'जन्म आणि कुटुंब',birthDesc:'जन्म, मृत्यू आणि कौटुंबिक नोंदी',discover:'सेवा शोधा',popular:'लोकप्रिय सेवा',viewAll:'सर्व पहा →',personalise:'तुमची गरज निवडा',iam:'मी आहे...',personaDesc:'संबंधित सेवा वर आणण्यासाठी प्रोफाइल निवडा.',featured:'निवडक मार्गदर्शिका',startHere:'येथून सुरू करा',visualEyebrow:'प्रत्यक्ष लोकांसाठी तयार केलेले',visualTitle:'“कुठून सुरू करू?” पासून “मी तयार आहे.” पर्यंत',visualDesc:'Citizen Assist शासकीय सेवेची गुंतागुंतीची प्रक्रिया सोप्या टप्प्यांत बदलते — सेवा शोधा, गरज समजून घ्या, कागदपत्रे तयार करा आणि सत्यापित अधिकृत पोर्टलवर जा.',smartSearch:'स्मार्ट शोध',threeLang:'३ भाषा',access:'प्रवेशयोग्यता',catEyebrow:'सेवा श्रेणी',catTitle:'शासकीय सेवा क्षेत्रानुसार शोधा',catDesc:'क्षेत्र माहीत असेल पण अचूक सेवा माहीत नसेल तर श्रेणी निवडा.',browse:'सेवा पहा',statsAreas:'नागरिक-अनुकूल सेवा क्षेत्रे',statsLocal:'सविस्तर Citizen Assist मार्गदर्शिका',statsNotified:'अधिकृत अधिसूचित सेवा*',statsPortal:'पोर्टलवर उपलब्ध सेवा*',sourceNote:'*या बिल्डदरम्यान अधिकृत Aaple Sarkar डॅशबोर्डवरील आकडे तपासले आहेत. संपूर्ण लाइव्ह यादी अंतिम स्रोत आहे.',directory:'सेवा निर्देशिका',allServices:'महाराष्ट्र पोर्टलवरील उपलब्ध सेवा',directoryDesc:'स्थानिक मार्गदर्शन शोधा किंवा महाराष्ट्राची संपूर्ण लाइव्ह अधिकृत यादी उघडा.',searchServices:'इंग्रजी / हिंदी / मराठीत सेवा शोधा',allCategories:'सर्व श्रेणी',allDifficulty:'सर्व अवघडपणा',allUsers:'सर्व वापरकर्ते',easy:'सोपे',medium:'मध्यम',advanced:'प्रगत',officialSource:'अधिकृत स्रोत',catalogueTitle:'महाराष्ट्राची संपूर्ण अधिसूचित सेवा यादी',catalogueDesc:'Citizen Assist हे मार्गदर्शन मंच आहे. संपूर्ण लाइव्ह सरकारी यादीसाठी महाराष्ट्र Aaple Sarkar यादी वापरा.',openCatalogue:'अधिकृत संपूर्ण यादी उघडा ↗',clear:'फिल्टर साफ करा',match:'जुळणाऱ्या सेवा सापडल्या',noMatch:'स्थानिक मार्गदर्शिका सापडली नाही',noMatchDesc:'दुसरा कीवर्ड वापरा किंवा वरील अधिकृत यादी उघडा.',searchOfficial:'या कीवर्डसाठी अधिकृत यादी शोधा ↗',viewGuide:'मार्गदर्शिका पहा',officialTitle:'अधिकृत नाव:',category:'श्रेणी:',purpose:'उद्देश:',lastVerified:'या प्रोजेक्ट बिल्डमध्ये शेवटची तपासणी:',eligibility:'पात्रता निकष',prerequisites:'पूर्वअटी',documents:'आवश्यक कागदपत्रे',steps:'चरण-दर-चरण सूचना',checklist:'इंटरॅक्टिव्ह चेकलिस्ट आणि प्रगती',checklistDesc:'तयारीच्या बाबींवर टिक करा. प्रगती फक्त या ब्राउझर सत्रात जतन केली जाते.',mistakes:'सामान्य चुका',troubleshooting:'समस्या निवारण',officialDestination:'अधिकृत गंतव्य',officialPortal:'अधिकृत शासकीय पोर्टल',portalDesc:'Citizen Assist तुमचा अर्ज सादर करत नाही. या मार्गदर्शिकेत दिलेल्या सरकारी पोर्टलवरच पुढे जा.',officialDomain:'अधिकृत डोमेन:',source:'स्रोत:',continuePortal:'अधिकृत पोर्टलवर जा ↗',relatedFaq:'संबंधित प्रश्न',feedback:'अभिप्राय',helpful:'हे मार्गदर्शन उपयुक्त होते का?',yes:'होय',no:'नाही',submitFeedback:'अभिप्राय पाठवा',faqTitle:'वारंवार विचारले जाणारे प्रश्न',faqDesc:'Citizen Assist आणि अधिकृत डिजिटल सेवांचा सुरक्षित वापर याबद्दल झटपट उत्तरे.',faqPlaceholder:'प्रश्न शोधा',aboutEyebrow:'CITIZEN ASSIST बद्दल',aboutTitle:'शासकीय डिजिटल सेवा समजणे अधिक सोपे करणे.',contactTitle:'Citizen Assist शी संपर्क साधा',contactDesc:'प्रोजेक्ट अभिप्राय पाठवा किंवा अस्पष्ट मार्गदर्शिकेची माहिती द्या.',send:'संदेश पाठवा',name:'नाव',email:'ईमेल',message:'संदेश',close:'बंद करा',welcome:'CITIZEN ASSIST मध्ये स्वागत',welcomeTitle:'शासकीय सेवा समजणे आता अधिक सोपे.',welcomeDesc:'सेवा शोधा, कागदपत्रे तयार करा, चेकलिस्ट वापरा, Citizen Assist ला विचारा आणि सुरक्षितपणे अधिकृत पोर्टलवर जा. Citizen Assist स्वतंत्र आहे आणि अर्ज प्रक्रिया करत नाही.',explore:'सेवा पहा',learn:'आमच्याबद्दल',chatName:'Citizen Assist',chatStatus:'एआय मार्गदर्शन • अधिकृत शासकीय सल्ला नाही',chatNeed:'मदत हवी?',chatAsk:'Citizen Assist ला विचारा',chatPlaceholder:'सेवेबद्दल विचारा...',independent:'स्वतंत्र मार्गदर्शन मंच — ही सरकारी वेबसाइट नाही.'
    }
  };
  const lang=()=>localStorage.getItem('ca-lang')||'en';
  const t=key=>translations[lang()][key]||translations.en[key]||key;

  const pageCopy={
    en:{
      faqEyebrow:'FAQ', faqTitle:'Frequently Asked Questions', faqDesc:'Quick answers about Citizen Assist and using official digital services safely.', faqSearch:'Search FAQs',
      guideOverview:'Overview',guideEligibility:'Eligibility',guideDocuments:'Documents',guideSteps:'Steps',guideChecklist:'Checklist',guideFaq:'FAQ',guideServiceInfo:'Service Information',guidePrereq:'Prerequisites',guideProgress:'Tick preparation items. Progress is stored only in this browser session.',guideMistakes:'Common Mistakes',guideTrouble:'Troubleshooting',guideOfficial:'OFFICIAL DESTINATION',guideOfficialTitle:'Official Government Portal',guidePortalDesc:'Citizen Assist does not submit your application. Continue only on the government destination shown for this guide.',guideSourceLinked:'Source-linked',guideFeedback:'Feedback',guideHelpful:'Was this guide helpful?',guideOptional:'Optional feedback — do not enter Aadhaar, PAN, passwords or financial details.',
      aboutEyebrow:'ABOUT CITIZEN ASSIST',aboutTitle:'Making government digital services easier to understand.',aboutIntro:'Citizen Assist is a college CEP project built as an independent educational and procedural guidance platform. It helps people discover the right government service, understand the preparation requirements, and reach the correct official portal with confidence.',aboutIndependent:'Independent platform',aboutIdea:'01 • THE IDEA',aboutIdeaTitle:'Why we created Citizen Assist',aboutIdeaP1:'Government services are important, but the digital journey can feel confusing: users may not know which service to choose, what documents to prepare, where to find the official portal, or what to do when an OTP, upload, payment or session issue occurs.',aboutIdeaP2:'Citizen Assist adds a simple preparation layer before the government transaction.',aboutMission:'02 • OUR MISSION',aboutMissionTitle:'Discover → Understand → Prepare → Verify → Redirect',aboutMissionText:'Every part of the website follows this journey. We explain the service in simple language, provide a checklist, highlight common mistakes, and then send the user to the verified official destination.',aboutWho:'03 • WHO IT HELPS',aboutWhoTitle:'Student • Citizen • Worker • Others',aboutWhat:'04 • WHAT YOU GET',aboutWhatTitle:'A complete preparation experience',aboutSafety:'05 • SAFETY & PRIVACY',aboutSafetyTitle:"We guide — we don't collect sensitive government information.",aboutProcess:'06 • HOW CITIZEN ASSIST WORKS',aboutProcessTitle:'Your journey in 7 simple steps',aboutStats:'07 • MAHARASHTRA SERVICE ECOSYSTEM',aboutStatsTitle:'Built to connect users with the wider official catalogue',aboutAccessibility:'08 • ACCESSIBILITY',aboutAccessibilityTitle:'Designed for more people',aboutTrust:'09 • TRUST & TRANSPARENCY',aboutTrustTitle:'Know who provides the information',aboutReview:'10 • DESIGN REVIEW ACTIONS',aboutReviewTitle:'Built around the citizen task',
      contactEyebrow:'CONTACT & FEEDBACK',contactTitle:'Contact Citizen Assist',contactDesc:'Send project feedback or report an unclear guide.',zeroPii:'Zero-PII reminder:',zeroPiiText:'Do not submit Aadhaar, PAN, Voter ID, passwords, OTPs or financial credentials.',
      accessEyebrow:'ACCESSIBILITY',accessTitle:'Accessibility Settings',textSize:'Text size',highContrast:'High contrast',blackWhite:'Black & white',reset:'Reset',resetSettings:'Reset settings',
      footerTag:'Your digital guide for government services',footerDisclaimer:'Independent guidance platform — not a government website.',footerQuick:'Quick links',footerOfficial:'Official source',footerSource:'Maharashtra Aaple Sarkar ↗',
      english:'English',hindi:'Hindi',marathi:'Marathi', accountLabel:'My Account'
    },
    hi:{
      faqEyebrow:'अक्सर पूछे जाने वाले प्रश्न',faqTitle:'अक्सर पूछे जाने वाले प्रश्न',faqDesc:'Citizen Assist और आधिकारिक डिजिटल सेवाओं के सुरक्षित उपयोग के बारे में त्वरित उत्तर।',faqSearch:'प्रश्न खोजें',
      guideOverview:'अवलोकन',guideEligibility:'पात्रता',guideDocuments:'दस्तावेज़',guideSteps:'चरण',guideChecklist:'चेकलिस्ट',guideFaq:'प्रश्न',guideServiceInfo:'सेवा जानकारी',guidePrereq:'पूर्व-आवश्यकताएँ',guideProgress:'तैयारी की चीज़ों पर टिक करें। प्रगति केवल इस ब्राउज़र सत्र में सहेजी जाती है।',guideMistakes:'सामान्य गलतियाँ',guideTrouble:'समस्या समाधान',guideOfficial:'आधिकारिक गंतव्य',guideOfficialTitle:'आधिकारिक सरकारी पोर्टल',guidePortalDesc:'Citizen Assist आपका आवेदन जमा नहीं करता। केवल इस मार्गदर्शिका में दिए सरकारी पोर्टल पर आगे बढ़ें।',guideSourceLinked:'स्रोत से जुड़ा',guideFeedback:'प्रतिक्रिया',guideHelpful:'क्या यह मार्गदर्शिका उपयोगी थी?',guideOptional:'वैकल्पिक प्रतिक्रिया — यहाँ आधार, पैन, पासवर्ड या वित्तीय विवरण न लिखें।',
      aboutEyebrow:'CITIZEN ASSIST के बारे में',aboutTitle:'सरकारी डिजिटल सेवाओं को समझना आसान बनाना।',aboutIntro:'Citizen Assist एक कॉलेज CEP प्रोजेक्ट है जो स्वतंत्र शैक्षिक और प्रक्रियात्मक मार्गदर्शन मंच के रूप में बनाया गया है। यह लोगों को सही सरकारी सेवा खोजने, तैयारी की आवश्यकताएँ समझने और सही आधिकारिक पोर्टल तक पहुँचने में मदद करता है।',aboutIndependent:'स्वतंत्र मार्गदर्शन मंच',aboutIdea:'01 • विचार',aboutIdeaTitle:'हमने Citizen Assist क्यों बनाया',aboutIdeaP1:'सरकारी सेवाएँ महत्वपूर्ण हैं, लेकिन डिजिटल प्रक्रिया भ्रमित कर सकती है: उपयोगकर्ता को सही सेवा, आवश्यक दस्तावेज़, आधिकारिक पोर्टल या OTP, अपलोड, भुगतान और सत्र की समस्या में क्या करना है, यह स्पष्ट नहीं हो सकता।',aboutIdeaP2:'Citizen Assist सरकारी लेन-देन से पहले एक सरल तैयारी परत देता है।',aboutMission:'02 • हमारा उद्देश्य',aboutMissionTitle:'खोजें → समझें → तैयारी करें → सत्यापित करें → आधिकारिक पोर्टल पर जाएँ',aboutMissionText:'वेबसाइट का हर भाग इसी यात्रा का पालन करता है। हम सेवा को सरल भाषा में समझाते हैं, चेकलिस्ट देते हैं, सामान्य गलतियाँ बताते हैं और फिर उपयोगकर्ता को सत्यापित आधिकारिक गंतव्य तक भेजते हैं।',aboutWho:'03 • यह किसके लिए है',aboutWhoTitle:'विद्यार्थी • नागरिक • कामगार • अन्य',aboutWhat:'04 • आपको क्या मिलेगा',aboutWhatTitle:'पूरी तैयारी का अनुभव',aboutSafety:'05 • सुरक्षा और गोपनीयता',aboutSafetyTitle:'हम मार्गदर्शन देते हैं — संवेदनशील सरकारी जानकारी एकत्र नहीं करते।',aboutProcess:'06 • CITIZEN ASSIST कैसे काम करता है',aboutProcessTitle:'आपकी 7 आसान चरणों की यात्रा',aboutStats:'07 • महाराष्ट्र सेवा व्यवस्था',aboutStatsTitle:'उपयोगकर्ताओं को आधिकारिक सेवा सूची से जोड़ने के लिए बनाया गया',aboutAccessibility:'08 • सुलभता',aboutAccessibilityTitle:'अधिक लोगों के लिए बनाया गया',aboutTrust:'09 • भरोसा और पारदर्शिता',aboutTrustTitle:'जानें कि जानकारी कौन देता है',aboutReview:'10 • डिज़ाइन समीक्षा के बदलाव',aboutReviewTitle:'नागरिक के काम को केंद्र में रखकर बनाया गया',
      contactEyebrow:'संपर्क और प्रतिक्रिया',contactTitle:'Citizen Assist से संपर्क करें',contactDesc:'प्रोजेक्ट प्रतिक्रिया भेजें या अस्पष्ट मार्गदर्शिका की सूचना दें।',zeroPii:'संवेदनशील जानकारी की चेतावनी:',zeroPiiText:'आधार, पैन, वोटर आईडी, पासवर्ड, OTP या वित्तीय जानकारी न भेजें।',
      accessEyebrow:'सुलभता',accessTitle:'सुलभता सेटिंग्स',textSize:'टेक्स्ट आकार',highContrast:'उच्च कंट्रास्ट',blackWhite:'ब्लैक एंड व्हाइट',reset:'रीसेट',resetSettings:'सेटिंग्स रीसेट करें',
      footerTag:'सरकारी सेवाओं के लिए आपका डिजिटल मार्गदर्शक',footerDisclaimer:'स्वतंत्र मार्गदर्शन मंच — यह सरकारी वेबसाइट नहीं है।',footerQuick:'त्वरित लिंक',footerOfficial:'आधिकारिक स्रोत',footerSource:'महाराष्ट्र Aaple Sarkar ↗',english:'अंग्रेज़ी',hindi:'हिंदी',marathi:'मराठी'
    },
    mr:{
      faqEyebrow:'वारंवार विचारले जाणारे प्रश्न',faqTitle:'वारंवार विचारले जाणारे प्रश्न',faqDesc:'Citizen Assist आणि अधिकृत डिजिटल सेवांचा सुरक्षित वापर याबद्दल झटपट उत्तरे.',faqSearch:'प्रश्न शोधा',
      guideOverview:'आढावा',guideEligibility:'पात्रता',guideDocuments:'कागदपत्रे',guideSteps:'टप्पे',guideChecklist:'चेकलिस्ट',guideFaq:'प्रश्न',guideServiceInfo:'सेवा माहिती',guidePrereq:'पूर्वअटी',guideProgress:'तयारीच्या बाबींवर टिक करा. प्रगती फक्त या ब्राउझर सत्रात जतन केली जाते.',guideMistakes:'सामान्य चुका',guideTrouble:'समस्या निवारण',guideOfficial:'अधिकृत गंतव्य',guideOfficialTitle:'अधिकृत शासकीय पोर्टल',guidePortalDesc:'Citizen Assist तुमचा अर्ज सादर करत नाही. या मार्गदर्शिकेत दिलेल्या सरकारी पोर्टलवरच पुढे जा.',guideSourceLinked:'स्रोताशी जोडलेले',guideFeedback:'अभिप्राय',guideHelpful:'हे मार्गदर्शन उपयुक्त होते का?',guideOptional:'ऐच्छिक अभिप्राय — येथे आधार, पॅन, पासवर्ड किंवा आर्थिक तपशील लिहू नका.',
      aboutEyebrow:'CITIZEN ASSIST बद्दल',aboutTitle:'शासकीय डिजिटल सेवा समजणे अधिक सोपे करणे.',aboutIntro:'Citizen Assist हा कॉलेज CEP प्रकल्प असून स्वतंत्र शैक्षणिक आणि प्रक्रियात्मक मार्गदर्शन मंच म्हणून तयार केला आहे. योग्य शासकीय सेवा शोधणे, तयारीच्या आवश्यकता समजणे आणि योग्य अधिकृत पोर्टलपर्यंत पोहोचणे यासाठी तो मदत करतो.',aboutIndependent:'स्वतंत्र मार्गदर्शन मंच',aboutIdea:'01 • कल्पना',aboutIdeaTitle:'आम्ही Citizen Assist का तयार केले',aboutIdeaP1:'शासकीय सेवा महत्त्वाच्या आहेत, पण डिजिटल प्रक्रिया गोंधळाची वाटू शकते: कोणती सेवा निवडायची, कोणती कागदपत्रे तयार करायची, अधिकृत पोर्टल कुठे आहे किंवा OTP, अपलोड, पेमेंट आणि सत्रातील अडचणी आल्यास काय करायचे हे स्पष्ट नसू शकते.',aboutIdeaP2:'Citizen Assist शासकीय व्यवहारापूर्वी सोपी तयारीची पायरी देतो.',aboutMission:'02 • आमचे उद्दिष्ट',aboutMissionTitle:'शोधा → समजून घ्या → तयारी करा → सत्यापित करा → अधिकृत पोर्टलवर जा',aboutMissionText:'वेबसाइटचा प्रत्येक भाग या प्रवासाचे पालन करतो. आम्ही सेवा सोप्या भाषेत समजावतो, चेकलिस्ट देतो, सामान्य चुका दाखवतो आणि नंतर वापरकर्त्याला सत्यापित अधिकृत गंतव्याकडे पाठवतो.',aboutWho:'03 • कोणासाठी',aboutWhoTitle:'विद्यार्थी • नागरिक • कामगार • इतर',aboutWhat:'04 • तुम्हाला काय मिळेल',aboutWhatTitle:'पूर्ण तयारीचा अनुभव',aboutSafety:'05 • सुरक्षितता आणि गोपनीयता',aboutSafetyTitle:'आम्ही मार्गदर्शन करतो — संवेदनशील शासकीय माहिती गोळा करत नाही.',aboutProcess:'06 • CITIZEN ASSIST कसे काम करते',aboutProcessTitle:'तुमचा 7 सोप्या टप्प्यांचा प्रवास',aboutStats:'07 • महाराष्ट्र सेवा व्यवस्था',aboutStatsTitle:'वापरकर्त्यांना अधिकृत सेवा यादीशी जोडण्यासाठी तयार केलेले',aboutAccessibility:'08 • प्रवेशयोग्यता',aboutAccessibilityTitle:'अधिक लोकांसाठी तयार केलेले',aboutTrust:'09 • विश्वास आणि पारदर्शकता',aboutTrustTitle:'माहिती कोण देते ते जाणून घ्या',aboutReview:'10 • डिझाइन पुनरावलोकनातील बदल',aboutReviewTitle:'नागरिकांच्या कामाला केंद्रस्थानी ठेवून तयार केलेले',
      contactEyebrow:'संपर्क आणि अभिप्राय',contactTitle:'Citizen Assist शी संपर्क साधा',contactDesc:'प्रोजेक्ट अभिप्राय पाठवा किंवा अस्पष्ट मार्गदर्शिकेची माहिती द्या.',zeroPii:'संवेदनशील माहितीची सूचना:',zeroPiiText:'आधार, पॅन, मतदार ओळखपत्र, पासवर्ड, OTP किंवा आर्थिक माहिती पाठवू नका.',
      accessEyebrow:'प्रवेशयोग्यता',accessTitle:'प्रवेशयोग्यता सेटिंग्ज',textSize:'मजकूर आकार',highContrast:'उच्च कॉन्ट्रास्ट',blackWhite:'काळा आणि पांढरा',reset:'रीसेट',resetSettings:'सेटिंग्ज रीसेट करा',
      footerTag:'शासकीय सेवांसाठी तुमचा डिजिटल मार्गदर्शक',footerDisclaimer:'स्वतंत्र मार्गदर्शन मंच — ही सरकारी वेबसाइट नाही.',footerQuick:'जलद दुवे',footerOfficial:'अधिकृत स्रोत',footerSource:'महाराष्ट्र Aaple Sarkar ↗',english:'इंग्रजी',hindi:'हिंदी',marathi:'मराठी'
    }
  };
  function serviceText(s, field='name'){ const l=lang(); if(field==='name') return l==='hi'?(s.nameHi||s.name):l==='mr'?(s.nameMr||s.name):s.name; return s[field]; }


  function route(name){
    const valid = ['home','services','guide','faq','about','contact','accessibility','404'];
    if(!valid.includes(name)) name='404';
    pages.forEach(p=>p.classList.toggle('active-page', p.id===`page-${name}`));
    navLinks.forEach(b=>b.classList.toggle('active', b.dataset.nav===name));
    $('#mainNav').classList.remove('open');
    window.scrollTo({top:0,behavior:'smooth'});
    history.replaceState(null,'',`#${name}`);
  }

  function serviceName(s){ return serviceText(s,'name'); }

  function difficultyClass(d){return String(d).toLowerCase();}
  function localizedDescription(s){
    if(lang()==='en') return s.description;
    const name=serviceName(s);
    if(lang()==='hi') return `${name} के लिए पात्रता, आवश्यक दस्तावेज़, चरण, चेकलिस्ट और आधिकारिक पोर्टल तक पहुँच का मार्गदर्शन।`;
    return `${name} साठी पात्रता, आवश्यक कागदपत्रे, टप्पे, चेकलिस्ट आणि अधिकृत पोर्टलपर्यंत पोहोचण्याचे मार्गदर्शन.`;
  }
  function localizedTime(v){ if(lang()==='en') return v; const m=String(v||'').match(/(\d+)\s*(?:min|mins|minutes?)/i); if(!m)return v; return lang()==='hi'?`${m[1]} मिनट`:lang()==='mr'?`${m[1]} मिनिटे`:v; }
  function localizedArray(kind,arr){
    if(lang()==='en') return arr;
    const maps={
      eligibility: lang()==='hi'?['पात्रता आधिकारिक नियमों पर निर्भर करती है।','आवेदन से पहले वर्तमान सरकारी पोर्टल पर आवश्यकताएँ जाँचें।']:['पात्रता अधिकृत नियमांवर अवलंबून आहे.','अर्ज करण्यापूर्वी सध्याच्या अधिकृत पोर्टलवरील आवश्यकता तपासा.'],
      prereq: lang()==='hi'?['यदि आधिकारिक पोर्टल OTP या अपडेट के लिए माँगे तो सक्रिय मोबाइल नंबर और ईमेल रखें।','आधिकारिक आवेदन खोलने से पहले आवश्यक दस्तावेज़ों की स्पष्ट डिजिटल प्रतियाँ तैयार रखें।']:['अधिकृत पोर्टलवर OTP किंवा अपडेटसाठी आवश्यक असल्यास सक्रिय मोबाईल क्रमांक आणि ईमेल ठेवा.','अधिकृत अर्ज उघडण्यापूर्वी आवश्यक कागदपत्रांच्या स्पष्ट डिजिटल प्रती तयार ठेवा.'],
      docs: lang()==='hi'?['आधिकारिक सेवा के अनुसार पहचान / सहायक प्रमाण','जहाँ लागू हो वहाँ पता / पात्रता प्रमाण','आधिकारिक पोर्टल पर दिखाए गए सेवा-विशिष्ट दस्तावेज़','ऑनलाइन अपलोड के लिए स्वीकार्य प्रारूप में स्कैन की गई प्रतियाँ']:['अधिकृत सेवेनुसार ओळख / सहाय्यक पुरावा','लागू असल्यास पत्ता / पात्रता पुरावा','अधिकृत पोर्टलवर दाखवलेली सेवा-विशिष्ट कागदपत्रे','ऑनलाइन अपलोडसाठी स्वीकारलेल्या स्वरूपातील स्कॅन प्रती'],
      steps: lang()==='hi'?['आधिकारिक सेवा जानकारी पढ़ें और सही सेवा चुनी है यह सुनिश्चित करें।','पात्रता जाँचें और सभी आवश्यक दस्तावेज़ तैयार करें।','नीचे दी गई चेकलिस्ट से तैयारी की पुष्टि करें।','दिए गए सत्यापित आधिकारिक पोर्टल को खोलें।','सरकारी फॉर्म केवल आधिकारिक पोर्टल पर भरें और आवेदन / रसीद संख्या सुरक्षित रखें।','जहाँ उपलब्ध हो वहाँ आधिकारिक ट्रैकिंग सुविधा का उपयोग करें।']:['अधिकृत सेवा माहिती वाचा आणि योग्य सेवा निवडल्याची खात्री करा.','पात्रता तपासा आणि सर्व आवश्यक कागदपत्रे तयार करा.','खालील चेकलिस्टने तयारीची खात्री करा.','दिलेल्या सत्यापित अधिकृत पोर्टलवर जा.','सरकारी फॉर्म फक्त अधिकृत पोर्टलवर भरा आणि अर्ज / पावती क्रमांक जतन करा.','उपलब्ध असल्यास अधिकृत ट्रॅकिंग सुविधा वापरा.'],
      mistakes: lang()==='hi'?['अनधिकृत या नकली वेबसाइट का उपयोग करना।','दस्तावेज़ों से मेल न खाने वाला नाम या तारीख दर्ज करना।','धुंधले, कटे हुए या गलत प्रारूप के दस्तावेज़ अपलोड करना।','रसीद / आवेदन संख्या सुरक्षित किए बिना आधिकारिक पोर्टल बंद करना।']:['अनधिकृत किंवा बनावट वेबसाइट वापरणे.','कागदपत्रांशी न जुळणारे नाव किंवा तारीख भरणे.','अस्पष्ट, कापलेल्या किंवा चुकीच्या स्वरूपातील कागदपत्रे अपलोड करणे.','पावती / अर्ज क्रमांक जतन न करता अधिकृत पोर्टल बंद करणे.'],
      troubleshooting: lang()==='hi'?['OTP देर से आए तो थोड़ी देर प्रतीक्षा करें और केवल आधिकारिक पोर्टल पर पुनः प्रयास करें।','भुगतान समस्या में तुरंत दोबारा भुगतान न करें; पहले आधिकारिक स्थिति जाँचें।','सत्र समाप्त हो तो आधिकारिक साइट फिर खोलें और उपलब्ध आवेदन संदर्भ से जारी रखें।','यदि आवश्यकताएँ अलग हों तो वर्तमान आधिकारिक सूचना का पालन करें।']:['OTP उशिरा आल्यास थोडा वेळ थांबा आणि फक्त अधिकृत पोर्टलवर पुन्हा प्रयत्न करा.','पेमेंटची अडचण असल्यास लगेच पुन्हा पेमेंट करू नका; आधी अधिकृत स्थिती तपासा.','सत्र संपल्यास अधिकृत साइट पुन्हा उघडा आणि उपलब्ध अर्ज संदर्भाने पुढे जा.','आवश्यकता वेगळी असल्यास सध्याच्या अधिकृत सूचनेचे पालन करा.']
    }; return maps[kind]||arr;
  }

  function renderCard(s){
    return `<article class="service-card" data-id="${esc(s.id)}">
      <div class="service-icon">${s.icon}</div>
      <h3>${esc(serviceName(s))}</h3>
      <p>${esc(localizedDescription(s))}</p>
      <div class="card-bottom"><span class="badge ${difficultyClass(s.difficulty)}">${esc(lang()==='hi'?(s.difficulty==='Easy'?t('easy'):s.difficulty==='Medium'?t('medium'):t('advanced')):lang()==='mr'?(s.difficulty==='Easy'?t('easy'):s.difficulty==='Medium'?t('medium'):t('advanced')):s.difficulty)}</span><button class="view-guide" data-id="${esc(s.id)}">${esc(t('viewGuide'))}</button></div>
    </article>`;
  }

  function bindGuideButtons(root=document){
    $$('.view-guide', root).forEach(btn=>btn.addEventListener('click',()=>openGuide(btn.dataset.id)));
  }

  function renderHome(){
    $('#localServiceCount').textContent = D.services.length;
    $('#popularGrid').innerHTML = D.services.filter(s=>s.popular).slice(0,8).map(renderCard).join('');
    $('#featuredGrid').innerHTML = D.services.filter(s=>s.featured).slice(0,8).map(renderCard).join('');
    const catBox=$('#homeCategoryGrid');
    if(catBox){
      const cats=Object.entries(D.categories).slice(0,16);
      catBox.innerHTML=cats.map(([id,c])=>`<button type="button" data-category="${esc(id)}"><span>${c.icon||'▦'}</span><strong>${esc(localizedCategory(id))}</strong><small>${esc(t('browse'))}</small></button>`).join('');
      $$('#homeCategoryGrid button').forEach(b=>b.addEventListener('click',()=>{route('services');$('#categoryFilter').value=b.dataset.category;$('#serviceSearch').value='';renderServices();}));
    }
    bindGuideButtons($('#page-home'));
  }

  function normalizeText(v){return String(v??'').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^\p{L}\p{N}]+/gu,' ').trim();}
  function editDistance(a,b){a=normalizeText(a);b=normalizeText(b);if(a===b)return 0;if(!a)return b.length;if(!b)return a.length;let prev=Array.from({length:b.length+1},(_,i)=>i);for(let i=1;i<=a.length;i++){let cur=[i];for(let j=1;j<=b.length;j++)cur[j]=Math.min(cur[j-1]+1,prev[j]+1,prev[j-1]+(a[i-1]===b[j-1]?0:1));prev=cur;}return prev[b.length];}
  const searchAliases={
    passport:['passport seva','passport application','पासपोर्ट','पासपोर्ट सेवा','पासपोर्ट आवेदन'],
    scholarship:['scholarships','mahadbt','student scholarship','छात्रवृत्ति','शिष्यवृत्ति'],
    caste:['caste certificate','जाति प्रमाणपत्र','जात प्रमाणपत्र'],
    income:['income certificate','आय प्रमाणपत्र','उत्पन्न प्रमाणपत्र'],
    domicile:['domicile certificate','residence certificate','अधिवास','रहिवास'],
    birth:['birth certificate','जन्म प्रमाणपत्र'],death:['death certificate','मृत्यु प्रमाणपत्र','मृत्यू प्रमाणपत्र'],
    marriage:['marriage registration','विवाह पंजीकरण','विवाह नोंदणी'],driving:['driving licence','driving license','dl','ड्राइविंग लाइसेंस','ड्रायव्हिंग लायसन्स'],
    farmer:['farmer','agriculture','किसान','शेतकरी','कृषी'],land:['land records','7/12','property','जमीन','भूमी','मालमत्ता'],
    worker:['labour','labour card','e shram','e-shram','श्रमिक','कामगार'],police:['police clearance','police verification','पोलीस','पुलिस'],
    aadhaar:['aadhar','uidai','आधार'],pan:['pan card','पैन कार्ड','पॅन कार्ड'],digilocker:['digi locker','digital locker','डिजिलॉकर'],
    gst:['gst registration','gst return','जीएसटी'],water:['water connection','पाणी कनेक्शन','जल कनेक्शन'],health:['health certificate','medical','आरोग्य','स्वास्थ्य']
  };
  function searchScore(s,q){
    if(!q)return 0;
    const n=normalizeText(q);
    const terms=n.split(/\s+/).filter(Boolean);
    const rawFields=[s.name,s.nameMr,s.nameHi,s.description,s.categoryLabel,...(s.keywords||[]),...(s.docs||[]),...(s.steps||[]),...(s.eligibility||[]),...(s.faqs||[]).flat()].join(' ');
    const hay=normalizeText(rawFields);
    const nameFields=[s.name,s.nameMr,s.nameHi].map(normalizeText);
    const aliasPhrases=Object.entries(searchAliases).filter(([key])=>terms.includes(key)).flatMap(([,vals])=>vals.map(normalizeText));
    const phraseHit=aliasPhrases.some(a=>a && (hay.includes(a)||a.includes(n)));
    let score=phraseHit?300:0;
    for(const term of terms){
      if(hay.includes(term)){score+=70;continue;}
      const aliasHit=Object.values(searchAliases).some(vals=>vals.some(v=>normalizeText(v).includes(term)||term.includes(normalizeText(v))));
      if(aliasHit){score+=35;continue;}
      const hayWords=hay.split(' ');
      const close=hayWords.some(w=>w.length>=3 && Math.max(w.length,term.length)<=14 && editDistance(w,term)<=Math.max(1,Math.floor(Math.min(w.length,term.length)/4)));
      if(close)score+=20; else return -1;
    }
    if(nameFields.some(x=>x===n))score+=1000;
    if(nameFields.some(x=>x.startsWith(n)))score+=500;
    if(nameFields.some(x=>x.includes(n)))score+=250;
    terms.forEach(term=>{if(nameFields.some(x=>x.split(' ').includes(term)))score+=100;});
    return score||1;
  }

  function filteredServices(){
    const q=$('#serviceSearch').value.trim(); const cat=$('#categoryFilter').value; const diff=$('#difficultyFilter').value; const persona=$('#personaFilter').value;
    let list=D.services.filter(s=>(cat==='all'||s.category===cat)&&(diff==='all'||s.difficulty===diff)&&(persona==='all'||s.personas.includes(persona)));
    if(q){
      list=list.map(s=>({s,score:searchScore(s,q)})).filter(x=>x.score>=0).sort((a,b)=>b.score-a.score).map(x=>x.s);
    }
    if(selectedPersona&&selectedPersona!=='others'&&persona==='all'){list=list.slice().sort((a,b)=>Number(!a.personas.includes(selectedPersona))-Number(!b.personas.includes(selectedPersona)));}
    return list;
  }

  function renderSearchSuggestions(){
    const box=$('#searchSuggestions'); if(!box) return;
    const q=$('#serviceSearch').value.trim();
    if(!q){box.classList.remove('open');box.innerHTML='';return;}
    const matches=D.services.map(s=>({s,score:searchScore(s,q)})).filter(x=>x.score>=0).sort((a,b)=>b.score-a.score).slice(0,6);
    if(!matches.length){box.classList.remove('open');box.innerHTML='';return;}
    box.innerHTML=matches.map(({s})=>`<button type="button" class="search-suggestion" data-suggestion="${esc(s.id)}"><span class="search-suggestion-icon">${s.icon}</span><span><strong>${esc(serviceName(s))}</strong><small>${esc(s.categoryLabel)}</small></span></button>`).join('');
    box.classList.add('open');
    $$('.search-suggestion',box).forEach(b=>b.addEventListener('click',()=>{box.classList.remove('open');openGuide(b.dataset.suggestion);}));
  }

  function renderServices(){
    const list = filteredServices();
    $('#resultsCount').textContent = lang()==='en'?`${list.length} ${t('match')}`:`${list.length} ${t('match')}`;
    renderSearchSuggestions();
    $('#servicesGrid').innerHTML = list.map(renderCard).join('');
    $('#emptyState').classList.toggle('hidden', list.length!==0); if(list.length===0){$('#emptyState').innerHTML=`<div>🔎</div><h3>${esc(t('noMatch'))}</h3><p>${esc(t('noMatchDesc'))}</p><a class="primary-btn" target="_blank" rel="noopener noreferrer" href="https://aaplesarkar.mahaonline.gov.in/en/CommonForm/ViewAllServices">${esc(t('searchOfficial'))}</a>`;}
    bindGuideButtons($('#servicesGrid'));
  }

  function localizedCategory(id){
    const labels={
      revenue:{hi:'प्रमाणपत्र और राजस्व',mr:'प्रमाणपत्रे आणि महसूल'},family:{hi:'जन्म, मृत्यु और परिवार',mr:'जन्म, मृत्यू आणि कुटुंब'},education:{hi:'छात्र और शिक्षा',mr:'विद्यार्थी आणि शिक्षण'},labour:{hi:'कामगार और श्रम',mr:'कामगार आणि श्रम'},agriculture:{hi:'कृषि और किसान',mr:'कृषी आणि शेतकरी'},land:{hi:'भूमि और संपत्ति',mr:'जमीन आणि मालमत्ता'},transport:{hi:'ड्राइविंग और परिवहन',mr:'ड्रायव्हिंग आणि परिवहन'},police:{hi:'पुलिस और गृह',mr:'पोलीस आणि गृह'},business:{hi:'व्यवसाय और कर',mr:'व्यवसाय आणि कर'},pwd:{hi:'लोक निर्माण',mr:'सार्वजनिक बांधकाम'},health:{hi:'स्वास्थ्य सेवाएँ',mr:'आरोग्य सेवा'},water:{hi:'जल सेवाएँ',mr:'जल सेवा'},environment:{hi:'पर्यावरण',mr:'पर्यावरण'},urban:{hi:'शहरी विकास',mr:'शहरी विकास'},tourism:{hi:'पर्यटन और सांस्कृतिक',mr:'पर्यटन आणि सांस्कृतिक'},other:{hi:'अन्य सरकारी सेवाएँ',mr:'इतर शासकीय सेवा'}};
    return lang()==='en'?D.categories[id]?.label:(labels[id]?.[lang()]||D.categories[id]?.label||id);
  }
  function localizedGuideFaqs(s){
    if(lang()==='en') return s.faqs;
    if(lang()==='hi') return [['क्या Citizen Assist मेरे लिए आवेदन जमा कर सकता है?','नहीं। Citizen Assist केवल तैयारी का मार्गदर्शन देता है। वास्तविक आवेदन आधिकारिक सरकारी पोर्टल पर पूरा करना होता है।'],['क्या मैं यहाँ अपना आधार या पैन नंबर दर्ज कर सकता हूँ?','नहीं। Citizen Assist में सरकारी पहचान संख्या, पासवर्ड, OTP या वित्तीय जानकारी दर्ज न करें।'],['यदि आधिकारिक पोर्टल पर अलग दस्तावेज़ दिखें तो क्या करें?','वर्तमान आधिकारिक पोर्टल की आवश्यकता का पालन करें। सरकारी प्रक्रियाएँ बदल सकती हैं।']];
    return [['Citizen Assist माझ्यासाठी अर्ज सादर करू शकते का?','नाही. Citizen Assist फक्त तयारीचे मार्गदर्शन देते. प्रत्यक्ष अर्ज अधिकृत शासकीय पोर्टलवर पूर्ण करावा.'],['मी येथे माझा आधार किंवा पॅन क्रमांक देऊ शकतो का?','नाही. Citizen Assist मध्ये सरकारी ओळख क्रमांक, पासवर्ड, OTP किंवा आर्थिक माहिती देऊ नका.'],['अधिकृत पोर्टलवर वेगळी कागदपत्रे दिसली तर?','सध्याच्या अधिकृत पोर्टलवरील आवश्यकतेचे पालन करा. शासकीय प्रक्रिया बदलू शकतात.']];
  }
  function openGuide(id){
    const s = D.services.find(x=>x.id===id); if(!s) return route('404');
    activeService = s;
    $('#crumbHome').textContent=t('home'); $('#crumbServices').textContent=t('services'); $('#crumbService').textContent=serviceName(s); $('#guideCategory').textContent=localizedCategory(s.category); $('#guideTitle').textContent=serviceName(s); $('#guideSubtitle').textContent=localizedDescription(s);
    $('#guideDifficulty').textContent=s.difficulty; $('#guideDifficulty').className=`badge ${difficultyClass(s.difficulty)}`; $('#guideTime').textContent=localizedTime(s.time);
    $('#overviewContent').innerHTML = `<p><strong>${esc(t('officialTitle'))}</strong> ${esc(serviceName(s))}</p><p><strong>${esc(t('category'))}</strong> ${esc(localizedCategory(s.category))}</p><p><strong>${esc(t('purpose'))}</strong> ${esc(lang()==='hi'?'आधिकारिक सरकारी पोर्टल पर जाने से पहले तैयारी का मार्गदर्शन।':lang()==='mr'?'अधिकृत शासकीय पोर्टलवर जाण्यापूर्वी तयारीचे मार्गदर्शन.':'Preparation guidance before the user continues to the official government portal.')}</p><p><strong>${esc(t('lastVerified'))}</strong> ${esc(D.lastVerified)}</p>`;
    $('#eligibilityList').innerHTML=localizedArray('eligibility',s.eligibility).map(x=>`<li>${esc(x)}</li>`).join('');
    $('#prereqList').innerHTML=localizedArray('prereq',s.prereq).map(x=>`<li>${esc(x)}</li>`).join('');
    $('#documentsList').innerHTML=localizedArray('docs',s.docs).map(x=>`<div class="document-pill">📄 ${esc(x)}</div>`).join('');
    $('#stepsList').innerHTML=localizedArray('steps',s.steps).map(x=>`<li>${esc(x)}</li>`).join('');
    $('#mistakesList').innerHTML=localizedArray('mistakes',s.mistakes).map(x=>`<li>${esc(x)}</li>`).join('');
    $('#troubleshootingList').innerHTML=localizedArray('troubleshooting',s.troubleshooting).map(x=>`<li>${esc(x)}</li>`).join('');
    $('#portalBtn').href=s.portal;
    try {
      const domain=new URL(s.portal).hostname.replace(/^www\./,'');
      $('#portalEvidence').innerHTML=`<span><strong>${esc(t('officialDomain'))}</strong> ${esc(domain)}</span><span><strong>${esc(t('source'))}</strong> ${esc(lang()==='hi'?'सेवा मार्गदर्शिका रिकॉर्ड':lang()==='mr'?'सेवा मार्गदर्शिका नोंद':'service guide record')}</span><span><strong>${esc(t('lastVerified'))}</strong> ${esc(D.lastVerified)}</span>`;
    } catch(e) {}
    $('#guideFaqs').innerHTML=localizedGuideFaqs(s).map(([q,a])=>`<div class="acc-item"><button type="button">${esc(q)}<span>＋</span></button><div class="acc-content">${esc(a)}</div></div>`).join('');
    bindAccordions($('#guideFaqs'));
    renderChecklist(s);
    chosenFeedback=null; $$('.feedback-btn').forEach(x=>x.classList.remove('selected')); $('#guideFeedbackText').value=''; $('#guideFeedbackMsg').textContent='';
    $('#guideDifficulty').textContent=lang()==='hi'?(s.difficulty==='Easy'?t('easy'):s.difficulty==='Medium'?t('medium'):t('advanced')):lang()==='mr'?(s.difficulty==='Easy'?t('easy'):s.difficulty==='Medium'?t('medium'):t('advanced')):s.difficulty; const gh=$('#page-guide'); const heads=gh.querySelectorAll('.guide-main h2'); const keys=['overview','eligibility','documents','steps','checklist','mistakes','troubleshooting','officialPortal','relatedFaq','feedback']; const vals=[lang()==='hi'?'1. सेवा जानकारी':lang()==='mr'?'1. सेवा माहिती':'1. Service Information',`2. ${t('eligibility')}`,`4. ${t('documents')}`,`5. ${t('steps')}`,`6–7. ${t('checklist')}`,`8. ${t('mistakes')}`,`9. ${t('troubleshooting')}`,`10. ${t('officialPortal')}`,`11. ${t('relatedFaq')}`,`12. ${t('feedback')}`]; heads.forEach((h,i)=>{if(vals[i])h.textContent=vals[i]}); $('#page-guide .guide-nav').setAttribute('aria-label',t('guideSections')||t('services')); $('#openChatFromGuide').textContent='💬 '+t('chatAsk'); $('#submitGuideFeedback').textContent=t('submitFeedback'); route('guide');
  }

  function renderChecklist(s){
    const docItems=localizedArray('docs',s.docs); const items=[...docItems.slice(0,4).map(x=>lang()==='hi'?`तैयार: ${x}`:lang()==='mr'?`तयार: ${x}`:`Prepared: ${x}`),lang()==='hi'?'मैंने वर्तमान आधिकारिक आवश्यकताएँ जाँची हैं':lang()==='mr'?'मी सध्याच्या अधिकृत आवश्यकता तपासल्या आहेत':'I checked the current official requirements',lang()==='hi'?'मैं आधिकारिक पोर्टल पर जाने के लिए तैयार हूँ':lang()==='mr'?'मी अधिकृत पोर्टलवर जाण्यासाठी तयार आहे':'I am ready to continue to the official portal'];
    const key=`ca-check-${s.id}`;
    let saved=[]; try{saved=JSON.parse(sessionStorage.getItem(key)||'[]')}catch(e){}
    $('#checklistItems').innerHTML=items.map((x,i)=>`<label class="check-item"><input type="checkbox" data-i="${i}" ${saved.includes(i)?'checked':''}><span>${esc(x)}</span></label>`).join('');
    const update=()=>{const checked=$$('#checklistItems input:checked').map(x=>Number(x.dataset.i));sessionStorage.setItem(key,JSON.stringify(checked));const pct=Math.round(checked.length/items.length*100);$('#progressPct').textContent=`${pct}%`;$('#progressBar').style.width=`${pct}%`;};
    $$('#checklistItems input').forEach(x=>x.addEventListener('change',update)); update();
  }

  function bindAccordions(root=document){
    $$('.acc-item button',root).forEach(btn=>btn.addEventListener('click',()=>{const item=btn.closest('.acc-item');item.classList.toggle('open');btn.querySelector('span').textContent=item.classList.contains('open')?'−':'＋';}));
  }

  const generalFaqsByLang={
    en:[
      ['Is Citizen Assist a government website?','No. Citizen Assist is an independent college CEP guidance platform. It explains services and sends users to official government portals.','government website independent official'],
      ['Can I apply for a government service through Citizen Assist?','No. Citizen Assist helps you understand and prepare. The actual application is completed on the official government portal.','apply application submit form can you apply'],
      ['Can I enter Aadhaar, PAN, OTP or password here?','No. Do not enter Aadhaar, PAN, OTPs, passwords, bank details or other sensitive credentials in Citizen Assist.','aadhaar aadhar pan otp password sensitive data privacy number'],
      ['Where can I find all 1,083 Maharashtra portal services?','The official Maharashtra Aaple Sarkar dashboard currently lists 1,083 services available on the portal. Use the Official Full Catalogue button on the Services page for the live government catalogue.','1083 1,083 all services complete list maharashtra services government service catalogue'],
      ['Does Citizen Assist contain detailed guides for all 1,083 services?','No. The 1,083 figure belongs to the official Aaple Sarkar portal. Citizen Assist currently contains a smaller set of detailed local guides and links to the official live catalogue for the complete service set.','all guides detailed guides 1083 citizen assist coverage'],
      ['Why can the official requirements differ from a Citizen Assist guide?','Government requirements can change. Always confirm the current eligibility, documents, fees and process on the official service page before applying.','documents different changed requirements official portal current'],
      ['How does the FAQ search work?','You can type your own question instead of copying a listed FAQ question. Citizen Assist matches common words and related phrases in English, Hindi and Marathi to the most relevant FAQ.','how search question my own wording faq search hindi marathi'],
      ['How does the service search work?','Search by service name, keyword or common wording. If a detailed local guide is not available, Citizen Assist directs you to the complete official Aaple Sarkar catalogue instead of inventing a guide.','search service keyword passport scholarship caste certificate no result official'],
      ['How does checklist progress work?','Checklist progress is stored in this browser session. It does not create a government account or send your checklist to a government department.','checklist progress save account browser session'],
      ['Where does my contact or feedback data go?','In this downloadable demo, contact and guide-feedback entries are saved locally in your browser for the project demonstration. They are not automatically emailed or uploaded to a server.','contact message data stored feedback where save email server database'],
      ['Does Citizen Assist have a real AI API in this ZIP?','This downloadable build uses a local guidance chatbot so it works without an API key. It is not an official government chatbot and should not be treated as an authoritative source.','ai api chatbot real artificial intelligence official'],
      ['What is the official source for Maharashtra services?','The Maharashtra Aaple Sarkar portal is the official source linked from Citizen Assist. The official live catalogue should be used to confirm the latest service details.','official source aaple sarkar website government source'],
      ['Can I track my application here?','Citizen Assist does not process applications. Where official tracking is available, use the tracking feature on the relevant government portal after applying.','track application status receipt number'],
      ['What should I do if I cannot find my service?','Try a different keyword or language. If there is still no local guide, open the official full catalogue and search the Maharashtra government service there.','cannot find service missing search not found'],
      ['Is Citizen Assist storing government credentials?','No. Citizen Assist is designed as an informational guidance layer and does not require a government login. Never enter sensitive credentials here.','credentials login account aadhaar password government login']
    ],
    hi:[
      ['क्या Citizen Assist सरकारी वेबसाइट है?','नहीं। Citizen Assist एक स्वतंत्र कॉलेज CEP मार्गदर्शन मंच है। यह सेवाओं को समझाता है और आधिकारिक सरकारी पोर्टल पर भेजता है।','सरकारी वेबसाइट स्वतंत्र आधिकारिक'],
      ['क्या मैं Citizen Assist से सरकारी आवेदन कर सकता हूँ?','नहीं। Citizen Assist तैयारी और जानकारी में मदद करता है। वास्तविक आवेदन आधिकारिक सरकारी पोर्टल पर पूरा होता है।','आवेदन अप्लाई जमा फॉर्म कर सकते हैं'],
      ['क्या मैं यहाँ आधार, पैन, OTP या पासवर्ड डाल सकता हूँ?','नहीं। Citizen Assist में आधार, पैन, OTP, पासवर्ड, बैंक विवरण या अन्य संवेदनशील जानकारी दर्ज न करें।','आधार पैन ओटीपी पासवर्ड संवेदनशील जानकारी'],
      ['महाराष्ट्र की सभी 1,083 सेवाएँ कहाँ मिलेंगी?','आधिकारिक महाराष्ट्र Aaple Sarkar डैशबोर्ड पर वर्तमान में पोर्टल पर उपलब्ध 1,083 सेवाएँ दिखाई जाती हैं। Services पेज से Official Full Catalogue खोलें।','1083 1,083 सभी सेवाएँ पूरी सूची महाराष्ट्र सरकारी सेवा'],
      ['क्या Citizen Assist में सभी 1,083 सेवाओं की विस्तृत गाइड है?','नहीं। 1,083 का आँकड़ा आधिकारिक Aaple Sarkar पोर्टल का है। Citizen Assist में अभी कुछ सेवाओं की विस्तृत स्थानीय गाइड हैं और पूरी सेवा सूची के लिए आधिकारिक लाइव कैटलॉग दिया गया है।','सभी गाइड 1083 विस्तृत गाइड कवरेज'],
      ['आधिकारिक जानकारी और Citizen Assist की गाइड अलग क्यों हो सकती है?','सरकारी आवश्यकताएँ बदल सकती हैं। आवेदन से पहले आधिकारिक सेवा पेज पर वर्तमान पात्रता, दस्तावेज़, शुल्क और प्रक्रिया जाँचें।','दस्तावेज अलग बदलाव आधिकारिक पोर्टल'],
      ['क्या FAQ में मैं अपना खुद का सवाल खोज सकता हूँ?','हाँ। आपको दिए गए FAQ प्रश्न को बिल्कुल कॉपी करने की जरूरत नहीं है। अपने शब्दों में हिंदी, मराठी या अंग्रेज़ी में सवाल लिखें।','मेरा सवाल अपना प्रश्न FAQ खोज कैसे हिंदी मराठी'],
      ['सेवा खोज कैसे काम करती है?','सेवा का नाम, कीवर्ड या सामान्य शब्दों से खोजें। स्थानीय विस्तृत गाइड न मिलने पर Citizen Assist आधिकारिक Aaple Sarkar कैटलॉग की ओर भेजता है।','सेवा खोज कीवर्ड पासपोर्ट छात्रवृत्ति प्रमाणपत्र नहीं मिला'],
      ['चेकलिस्ट की प्रगति कैसे काम करती है?','चेकलिस्ट की प्रगति इसी ब्राउज़र सत्र में सहेजी जाती है। इससे सरकारी खाता नहीं बनता।','चेकलिस्ट प्रगति ब्राउज़र खाता'],
      ['Contact या feedback का डेटा कहाँ जाता है?','इस डाउनलोडेबल डेमो में contact और guide-feedback डेटा प्रोजेक्ट प्रदर्शन के लिए आपके ब्राउज़र में स्थानीय रूप से सहेजा जाता है। यह अपने आप ईमेल या सर्वर पर अपलोड नहीं होता।','contact संदेश डेटा feedback कहाँ save email server'],
      ['क्या इस ZIP में असली AI API है?','इस ZIP में बिना API key के चलने वाला स्थानीय guidance chatbot है। यह सरकारी chatbot नहीं है।','AI API chatbot असली'],
      ['महाराष्ट्र सेवाओं का आधिकारिक स्रोत क्या है?','Citizen Assist महाराष्ट्र Aaple Sarkar के आधिकारिक पोर्टल से जोड़ता है। नवीनतम जानकारी की पुष्टि आधिकारिक लाइव कैटलॉग से करें।','आधिकारिक स्रोत Aaple Sarkar सरकारी'],
      ['मैं अपने आवेदन का status कहाँ देखूँ?','Citizen Assist आवेदन संसाधित नहीं करता। आवेदन के बाद उपलब्ध होने पर संबंधित सरकारी पोर्टल की tracking सुविधा का उपयोग करें।','आवेदन ट्रैक status रसीद'],
      ['मेरी सेवा नहीं मिल रही तो क्या करूँ?','दूसरा keyword या भाषा आज़माएँ। फिर भी न मिले तो Official Full Catalogue खोलकर महाराष्ट्र सरकार की सेवा सूची में खोजें।','सेवा नहीं मिल रही खोज नहीं मिला'],
      ['क्या Citizen Assist सरकारी credentials रखता है?','नहीं। Citizen Assist एक informational guidance layer है और सरकारी login की आवश्यकता नहीं रखता। यहाँ संवेदनशील credentials दर्ज न करें।','credentials login खाता आधार पासवर्ड']
    ],
    mr:[
      ['Citizen Assist ही सरकारी वेबसाइट आहे का?','नाही. Citizen Assist हे स्वतंत्र कॉलेज CEP मार्गदर्शन मंच आहे. हे सेवा समजावते आणि अधिकृत शासकीय पोर्टलवर पाठवते.','सरकारी वेबसाइट स्वतंत्र अधिकृत'],
      ['मी Citizen Assist वरून शासकीय अर्ज करू शकतो का?','नाही. Citizen Assist तयारी आणि माहितीचे मार्गदर्शन देते. प्रत्यक्ष अर्ज अधिकृत शासकीय पोर्टलवर केला जातो.','अर्ज apply submit form करू शकतो'],
      ['मी येथे आधार, पॅन, OTP किंवा पासवर्ड देऊ शकतो का?','नाही. Citizen Assist मध्ये आधार, पॅन, OTP, पासवर्ड, बँक तपशील किंवा इतर संवेदनशील माहिती देऊ नका.','आधार पॅन OTP पासवर्ड संवेदनशील माहिती'],
      ['महाराष्ट्रातील सर्व 1,083 सेवा कुठे मिळतील?','अधिकृत महाराष्ट्र Aaple Sarkar डॅशबोर्डवर सध्या पोर्टलवर उपलब्ध 1,083 सेवा दाखवल्या आहेत. Services पेजवरून Official Full Catalogue उघडा.','1083 1,083 सर्व सेवा संपूर्ण यादी महाराष्ट्र शासकीय सेवा'],
      ['Citizen Assist मध्ये सर्व 1,083 सेवांची सविस्तर मार्गदर्शिका आहे का?','नाही. 1,083 हा अधिकृत Aaple Sarkar पोर्टलचा आकडा आहे. Citizen Assist मध्ये सध्या काही सेवांसाठी सविस्तर स्थानिक मार्गदर्शिका आहेत आणि संपूर्ण सेवा संचासाठी अधिकृत लाइव्ह कॅटलॉगची लिंक आहे.','सर्व मार्गदर्शिका 1083 सविस्तर कव्हरेज'],
      ['अधिकृत माहिती आणि Citizen Assist मार्गदर्शिका वेगळी का असू शकते?','शासकीय आवश्यकता बदलू शकतात. अर्ज करण्यापूर्वी अधिकृत सेवा पेजवर सध्याची पात्रता, कागदपत्रे, शुल्क आणि प्रक्रिया तपासा.','कागदपत्रे वेगळी बदल अधिकृत पोर्टल'],
      ['FAQ मध्ये मी माझा स्वतःचा प्रश्न शोधू शकतो का?','होय. दिलेला FAQ प्रश्न तसाच कॉपी करण्याची गरज नाही. तुमच्या शब्दांत मराठी, हिंदी किंवा इंग्रजीमध्ये प्रश्न लिहा.','माझा प्रश्न स्वतःचा प्रश्न FAQ शोध मराठी हिंदी'],
      ['सेवा शोध कसा काम करतो?','सेवेचे नाव, कीवर्ड किंवा सामान्य शब्दांनी शोधा. स्थानिक सविस्तर मार्गदर्शिका नसेल तर Citizen Assist अधिकृत Aaple Sarkar कॅटलॉगकडे पाठवते.','सेवा शोध कीवर्ड पासपोर्ट शिष्यवृत्ती प्रमाणपत्र सापडत नाही'],
      ['चेकलिस्टची प्रगती कशी काम करते?','चेकलिस्टची प्रगती या ब्राउझर सत्रात जतन केली जाते. यामुळे शासकीय खाते तयार होत नाही.','चेकलिस्ट प्रगती ब्राउझर खाते'],
      ['Contact किंवा feedback चा डेटा कुठे जातो?','या डाउनलोडेबल डेमोमध्ये contact आणि guide-feedback डेटा प्रोजेक्ट डेमोसाठी तुमच्या ब्राउझरमध्ये स्थानिकरित्या जतन केला जातो. तो आपोआप ईमेल किंवा सर्व्हरवर अपलोड होत नाही.','contact संदेश डेटा feedback कुठे save email server'],
      ['या ZIP मध्ये खरे AI API आहे का?','या ZIP मध्ये API key शिवाय चालणारा स्थानिक guidance chatbot आहे. तो सरकारी chatbot नाही.','AI API chatbot खरे'],
      ['महाराष्ट्र सेवांचा अधिकृत स्रोत कोणता?','Citizen Assist महाराष्ट्र Aaple Sarkar च्या अधिकृत पोर्टलशी जोडते. नवीनतम माहितीची खात्री अधिकृत लाइव्ह कॅटलॉगमधून करा.','अधिकृत स्रोत Aaple Sarkar शासकीय'],
      ['माझ्या अर्जाचा status कुठे पाहू?','Citizen Assist अर्ज प्रक्रिया करत नाही. अर्ज केल्यानंतर उपलब्ध असल्यास संबंधित शासकीय पोर्टलवरील tracking सुविधा वापरा.','अर्ज track status पावती'],
      ['माझी सेवा सापडत नसेल तर काय करू?','दुसरा keyword किंवा भाषा वापरा. तरीही न सापडल्यास Official Full Catalogue उघडून महाराष्ट्राच्या शासकीय सेवा यादीत शोधा.','सेवा सापडत नाही शोध नाही'],
      ['Citizen Assist शासकीय credentials साठवते का?','नाही. Citizen Assist हे informational guidance layer आहे आणि शासकीय login आवश्यक नाही. येथे संवेदनशील credentials देऊ नका.','credentials login खाते आधार पासवर्ड']
    ]
  };
  function renderFaqs(){
    const q=normalizeText($('#faqSearch').value.trim());
    const data=(generalFaqsByLang[lang()]||generalFaqsByLang.en).map(([a,b,k])=>({a,b,k,score:faqScore(q,a,b,k)})).filter(x=>!q||x.score>0).sort((a,b)=>b.score-a.score);
    if(!data.length){
      $('#faqList').innerHTML=`<div class="empty-faq"><div>🔎</div><h3>${esc(lang()==='hi'?'सवाल नहीं मिला':lang()==='mr'?'प्रश्न सापडला नाही':'No matching FAQ found')}</h3><p>${esc(lang()==='hi'?'अपने शब्दों में दूसरा सवाल लिखें, या Citizen Assist chatbot से पूछें।':lang()==='mr'?'तुमच्या शब्दांत दुसरा प्रश्न लिहा किंवा Citizen Assist chatbot ला विचारा.':'Try another wording, or ask the Citizen Assist chatbot.')}</p></div>`;
      return;
    }
    $('#faqList').innerHTML=data.map(({a,b})=>`<div class="acc-item"><button type="button">${esc(a)}<span>＋</span></button><div class="acc-content">${esc(b)}</div></div>`).join('');
    bindAccordions($('#faqList'));
  }
  function faqScore(q,a,b,k){
    if(!q) return 1;
    const hay=normalizeText(`${a} ${b} ${k}`);
    if(hay.includes(q)) return 1000;
    const terms=q.split(/\s+/).filter(x=>x.length>1);
    let score=0;
    for(const term of terms){
      if(hay.includes(term)) score+=100;
      else if(term.length>=3){
        const words=hay.split(/\s+/); const close=words.some(w=>w.length>=3 && Math.abs(w.length-term.length)<=3 && editDistance(w,term)<=Math.max(1,Math.floor(Math.min(w.length,term.length)/4)));
        if(close) score+=25;
      }
    }
    return score;
  }

  function openChat(){
    $('#chatPanel').classList.add('open'); $('#chatPanel').setAttribute('aria-hidden','false');
    if(!$('#chatMessages').children.length) addBot('Hi! I can help you find a Maharashtra government service, explain documents, steps, checklists, or point you to the official portal. Please do not share Aadhaar/PAN numbers, OTPs, passwords or financial details.');
    setTimeout(()=>$('#chatInput').focus(),50);
  }
  function closeChat(){ $('#chatPanel').classList.remove('open'); $('#chatPanel').setAttribute('aria-hidden','true'); }
  function addMsg(text,who){const d=document.createElement('div');d.className=`msg ${who}`;d.textContent=text;$('#chatMessages').appendChild(d);$('#chatMessages').scrollTop=$('#chatMessages').scrollHeight;}
  function addBot(t){addMsg(t,'bot')}
  function localBot(q){
    const lower=q.toLowerCase();
    if(/aadhaar number|pan number|otp|password|bank account number/.test(lower)) return 'For safety, do not share sensitive identity numbers, OTPs, passwords or financial credentials here. I can still explain the service without them.';
    if(activeService && /(document|paper|कागद|दस्तावेज)/.test(lower)) return `${activeService.name}: prepare these items first:\n• ${activeService.docs.join('\n• ')}\nAlways confirm the current list on the official portal.`;
    if(activeService && /(apply|step|process|how)/.test(lower)) return `${activeService.name} preparation flow:\n${activeService.steps.map((x,i)=>`${i+1}. ${x}`).join('\n')}`;
    if(activeService && /(official|portal|link)/.test(lower)) return `Use the “Continue to Official Portal” button on the guide page. Citizen Assist does not submit applications itself.`;
    const matches=D.services.filter(s=>[s.name,s.nameMr,s.nameHi,...s.keywords].join(' ').toLowerCase().includes(lower)).slice(0,5);
    if(matches.length) return `I found these related services:\n• ${matches.map(x=>x.name).join('\n• ')}\nOpen Services and search the same keyword to view the full guide.`;
    if(/service|certificate|licence|license|scholarship|worker|farmer|student|government|महाराष्ट्र|सेवा|प्रमाणपत्र/.test(lower)) return 'I can help with Maharashtra government-service guidance. Try a service name such as “caste certificate”, “income”, “driving licence”, “scholarship”, “e-Shram”, or “birth certificate”.';
    return 'I’m limited to Citizen Assist and government-service guidance. Ask me about a service, eligibility, documents, steps, mistakes, troubleshooting, or official portal access.';
  }

  function applyLang(nextLang){
    localStorage.setItem('ca-lang',nextLang); document.documentElement.lang=nextLang==='hi'?'hi':nextLang==='mr'?'mr':'en';
    const T=translations[nextLang];
    T.student=nextLang==='hi'?'विद्यार्थी':nextLang==='mr'?'विद्यार्थी':'Student'; T.citizen=nextLang==='hi'?'नागरिक':nextLang==='mr'?'नागरिक':'Citizen'; T.worker=nextLang==='hi'?'कामगार':nextLang==='mr'?'कामगार':'Worker'; T.others=nextLang==='hi'?'अन्य':nextLang==='mr'?'इतर':'Others'; T.guideSections=nextLang==='hi'?'मार्गदर्शिका अनुभाग':nextLang==='mr'?'मार्गदर्शिका विभाग':'Guide sections';
    const set=(sel,key)=>{const el=$(sel);if(el&&T[key])el.textContent=T[key];};
    document.title=nextLang==='hi'?'Citizen Assist — महाराष्ट्र सरकारी सेवा मार्गदर्शन':nextLang==='mr'?'Citizen Assist — महाराष्ट्र शासकीय सेवा मार्गदर्शन':'Citizen Assist — Maharashtra Government Service Guidance';
    $('.skip-link').textContent=T.skip; $('.skip-link').setAttribute('aria-label',T.skip);
    $('.brand strong').textContent=nextLang==='hi'?'सिटिजन असिस्ट':nextLang==='mr'?'सिटिझन असिस्ट':'Citizen Assist'; $('.brand span').textContent=T.brandTag;
    $('#alertBar').textContent=T.alert;
    navLinks.forEach(b=>{const key=b.dataset.nav;if(T[key])b.textContent=T[key]});
    $('.hero-badge').textContent=T.badge; $('.hero-copy h1').innerHTML=esc(T.heroTitle); $('.hero-copy p').textContent=T.heroDesc; $('#homeSearch').placeholder=T.searchPlaceholder; $('#homeSearch').setAttribute('aria-label',T.searchPlaceholder); $('#homeSearchBtn').textContent=T.search;
    const ls=$('.language-search'); if(ls){ls.querySelector('span').textContent=T.searchIn; const bs=ls.querySelectorAll('button'); const pc=pageCopy[nextLang]; if(bs[0])bs[0].textContent=pc.english;if(bs[1])bs[1].textContent=pc.hindi;if(bs[2])bs[2].textContent=pc.marathi;}
    const feats=$$('.hero-features > div'); const fk=[['guides','guidesDesc'],['checklists','checklistsDesc'],['chatbot','chatbotDesc'],['portals','portalsDesc']]; feats.forEach((el,i)=>{if(!fk[i])return;const st=el.querySelector('strong'),sm=el.querySelector('small');if(st)st.textContent=T[fk[i][0]];if(sm)sm.innerHTML=esc(T[fk[i][1]]).replace(' ','<br>');});
    const taskHead=$$('.task-shortcuts .section-heading'); if(taskHead.length){taskHead[0].querySelector('.eyebrow').textContent=T.startTask;taskHead[0].querySelector('h2').textContent=T.needToday;taskHead[0].querySelector('p').textContent=T.taskDesc;taskHead[0].querySelector('.text-btn').textContent=T.findAny;}
    const taskCards=$$('.task-grid button'); const taskKeys=[['certificates','certDesc'],['scholarships','scholarDesc'],['pensions','pensionDesc'],['land','landDesc'],['driving','drivingDesc'],['birth','birthDesc']];taskCards.forEach((el,i)=>{const k=taskKeys[i];if(!k)return;el.querySelector('strong').textContent=T[k[0]];el.querySelector('small').textContent=T[k[1]];});
    const secs=$$('.section-heading'); if(secs[1]){secs[1].querySelector('.eyebrow').textContent=T.discover;secs[1].querySelector('h2').textContent=T.popular;secs[1].querySelector('.text-btn').textContent=T.viewAll;} if(secs[2]){secs[2].querySelector('.eyebrow').textContent=T.personalise;secs[2].querySelector('h2').textContent=T.iam;secs[2].querySelector('p').textContent=T.personaDesc;} if(secs[3]){secs[3].querySelector('.eyebrow').textContent=T.startHere;secs[3].querySelector('h2').textContent=T.featured;}
    const visual=$('.visual-showcase'); if(visual){visual.querySelector('.eyebrow').textContent=T.visualEyebrow;visual.querySelector('h2').textContent=T.visualTitle;visual.querySelector('p').textContent=T.visualDesc;const pills=visual.querySelectorAll('.feature-pills span');if(pills[0])pills[0].textContent='🔎 '+T.smartSearch;if(pills[2])pills[2].textContent='🌐 '+T.threeLang;if(pills[3])pills[3].textContent='♿ '+T.access;}
    const catSec=$('.category-section');if(catSec){catSec.querySelector('.eyebrow').textContent=T.catEyebrow;catSec.querySelector('h2').textContent=T.catTitle;catSec.querySelector('p').textContent=T.catDesc;}
    const statSpans=$$('.stats span');[T.statsAreas,T.statsLocal,T.statsNotified,T.statsPortal].forEach((v,i)=>{if(statSpans[i])statSpans[i].textContent=v});$('.source-note').textContent=T.sourceNote;
    const banner=$('#page-services .page-banner');banner.querySelector('.eyebrow').textContent=T.directory;banner.querySelector('h1').textContent=T.allServices;banner.querySelector('p').textContent=T.directoryDesc;$('#serviceSearch').placeholder=T.searchServices;$('#categoryFilter').options[0].textContent=T.allCategories;$('#difficultyFilter').options[0].textContent=T.allDifficulty;$('#difficultyFilter').options[1].textContent=T.easy;$('#difficultyFilter').options[2].textContent=T.medium;$('#difficultyFilter').options[3].textContent=T.advanced;$('#personaFilter').options[0].textContent=T.allUsers;$('#personaFilter').options[1].textContent=T.student||'Student';$('#personaFilter').options[2].textContent=T.citizen||'Citizen';$('#personaFilter').options[3].textContent=T.worker||'Worker';$('#personaFilter').options[4].textContent=T.others||'Others';$('#clearFilters').textContent=T.clear;
    const catOpts=[...$('#categoryFilter').options];Object.entries(D.categories).forEach(([id,c],i)=>{if(catOpts[i+1])catOpts[i+1].textContent=localizedCategory(id)});
    const oc=$('.official-catalogue-card');if(oc){oc.querySelector('.badge').textContent=T.officialSource;oc.querySelector('h3').textContent=T.catalogueTitle;oc.querySelector('p').textContent=T.catalogueDesc;oc.querySelector('.primary-btn').textContent=T.openCatalogue;const ev=oc.querySelectorAll('.source-evidence span');if(ev[0])ev[0].innerHTML='<strong>'+esc(T.officialDomain)+'</strong> aaplesarkar.mahaonline.gov.in';if(ev[1])ev[1].innerHTML='<strong>'+esc(nextLang==='hi'?'अंतिम जाँच:':nextLang==='mr'?'शेवटची तपासणी:':'Last checked:')+'</strong> September 2026';}
    $('#page-faq .page-banner .eyebrow').textContent='FAQ';$('#page-faq h1').textContent=T.faqTitle;$('#page-faq p').textContent=T.faqDesc;$('#faqSearch').placeholder=T.faqPlaceholder;
    const about=$('#page-about');if(about){about.querySelector('.eyebrow').textContent=T.aboutEyebrow;about.querySelector('h1').textContent=T.aboutTitle;}
    $('#page-contact h1').textContent=T.contactTitle;$('#page-contact .page-banner p').textContent=T.contactDesc;$('#contactForm button').textContent=T.send;
    const welcome=$('#welcomeModal');if(welcome){welcome.querySelector('.eyebrow').textContent=T.welcome;$('#welcomeTitle').textContent=T.welcomeTitle;welcome.querySelector('p').textContent=T.welcomeDesc;$('#welcomeExplore').textContent=T.explore;$('#welcomeAbout').textContent=T.learn;welcome.querySelector('small').textContent=T.independent;}
    $('#chatPanel .chat-head strong').textContent=T.chatName;$('#chatPanel .chat-head span').textContent=T.chatStatus;$('#chatInput').placeholder=T.chatPlaceholder;$('#chatFab span').textContent=T.chatAsk;

    const P=pageCopy[nextLang];
    // FAQ page
    const faqBanner=$('#page-faq .page-banner'); if(faqBanner){faqBanner.querySelector('.eyebrow').textContent=P.faqEyebrow;faqBanner.querySelector('h1').textContent=P.faqTitle;faqBanner.querySelector('p').textContent=P.faqDesc;$('#faqSearch').placeholder=P.faqSearch;}
    // Guide static labels
    const gh=$('#page-guide'); if(gh){
      const gnav=gh.querySelectorAll('.guide-nav button'); [P.guideOverview,P.guideEligibility,P.guideDocuments,P.guideSteps,P.guideChecklist,P.guideFaq].forEach((v,i)=>{if(gnav[i])gnav[i].textContent=v;});
      const heads=gh.querySelectorAll('.guide-main h2'); if(heads.length>=10){heads[0].textContent='1. '+P.guideServiceInfo;heads[1].textContent='2. '+P.guideEligibility;gh.querySelector('#eligibility h3').textContent='3. '+P.guidePrereq;heads[2].textContent='4. '+P.guideDocuments;heads[3].textContent='5. '+P.guideSteps;heads[4].textContent='6–7. '+P.guideChecklist;heads[5].textContent='8. '+P.guideMistakes;heads[6].textContent='9. '+P.guideTrouble;heads[7].textContent='10. '+P.guideOfficialTitle;heads[8].textContent='11. '+T.relatedFaq;heads[9].textContent='12. '+P.guideFeedback;}
      const cp=gh.querySelector('#checklist p'); if(cp)cp.textContent=P.guideProgress;
      const portal=gh.querySelector('.portal-card'); if(portal){portal.querySelector('.badge').textContent=P.guideOfficial;portal.querySelector('p').textContent=P.guidePortalDesc;}
      const fb=gh.querySelector('#guideFeedbackText');if(fb)fb.placeholder=P.guideOptional;
      const src=gh.querySelector('.tag-row .badge.verified');if(src)src.textContent=P.guideSourceLinked;
    }
    // About page: translate all visible copy, not only the title.
    const aboutPage=$('#page-about'); if(aboutPage){
      const h=aboutPage.querySelector('.about-hero');h.querySelector('.eyebrow').textContent=P.aboutEyebrow;h.querySelector('h1').textContent=P.aboutTitle;h.querySelector('p').textContent=P.aboutIntro;h.querySelector('.badge.verified').textContent=P.aboutIndependent;
      const cards=aboutPage.querySelectorAll('.content-card');
      const labels=[P.aboutIdea,P.aboutMission,P.aboutWho,P.aboutWhat,P.aboutSafety,P.aboutProcess,P.aboutStats,P.aboutAccessibility,P.aboutTrust,P.aboutReview];cards.forEach((c,i)=>{const k=c.querySelector('.card-kicker');if(k&&labels[i])k.textContent=labels[i];});
      const hs=aboutPage.querySelectorAll('.content-card h2'); const vals=[P.aboutIdeaTitle,P.aboutMissionTitle,P.aboutWhoTitle,P.aboutWhatTitle,P.aboutSafetyTitle,P.aboutProcessTitle,P.aboutStatsTitle,P.aboutAccessibilityTitle,P.aboutTrustTitle,P.aboutReviewTitle]; hs.forEach((x,i)=>{if(vals[i])x.textContent=vals[i];});
      const idea=cards[0]?.querySelectorAll('p'); if(idea?.length){idea[0].textContent=P.aboutIdeaP1;idea[1].textContent=P.aboutIdeaP2;}
      const mission=cards[1]?.querySelector('p');if(mission)mission.textContent=P.aboutMissionText;
      const who=cards[2]?.querySelectorAll('li');if(who?.length){const arr=nextLang==='hi'?['विद्यार्थी: छात्रवृत्ति, शिक्षा और दस्तावेज़ मार्गदर्शन।','नागरिक: प्रमाणपत्र, पहचान, परिवार और सार्वजनिक सेवाएँ।','कामगार: श्रम, कल्याण और सरल बहुभाषी मार्गदर्शन।','अन्य: बिना प्रोफ़ाइल फ़िल्टर के पूरी सेवा निर्देशिका देखें।']:nextLang==='mr'?['विद्यार्थी: शिष्यवृत्ती, शिक्षण आणि कागदपत्र मार्गदर्शन.','नागरिक: प्रमाणपत्रे, ओळख, कुटुंब आणि सार्वजनिक सेवा.','कामगार: कामगार, कल्याण आणि सोपे बहुभाषी मार्गदर्शन.','इतर: प्रोफाइल फिल्टरशिवाय संपूर्ण सेवा निर्देशिका पहा.']:['Students: scholarships, education and document guidance.','Citizens: certificates, identity, family and public services.','Workers: labour, welfare and simplified multilingual guidance.','Others: access the full service directory without a persona filter.'];who.forEach((x,i)=>x.textContent=arr[i]);}
      const safety=cards[4]?.querySelectorAll('.safety-grid p');if(safety?.length){const arr=nextLang==='hi'?['आधार नंबर, पैन नंबर, पासवर्ड, OTP, वित्तीय जानकारी या अन्य संवेदनशील सरकारी पहचान जानकारी।','वास्तविक सरकारी आवेदन और सबमिशन सत्यापित आधिकारिक सरकारी पोर्टल पर Citizen Assist के बाहर होते हैं।','यह मंच सूचना की परत है, सरकारी प्राधिकरण या लेन-देन प्रोसेसर नहीं।']:nextLang==='mr'?['आधार क्रमांक, पॅन क्रमांक, पासवर्ड, OTP, आर्थिक माहिती किंवा इतर संवेदनशील शासकीय ओळख माहिती.','प्रत्यक्ष शासकीय अर्ज आणि सबमिशन सत्यापित अधिकृत सरकारी पोर्टलवर Citizen Assist च्या बाहेर होतात.','हे मंच माहितीची पातळी आहे; शासकीय प्राधिकरण किंवा व्यवहार प्रक्रिया करणारे माध्यम नाही.']:['Aadhaar numbers, PAN numbers, passwords, OTPs, financial credentials or other sensitive government identifiers.','Actual government applications and submissions happen on the verified official government portal, outside Citizen Assist.','The platform is an informational layer, not a government authority or transaction processor.'];safety.forEach((x,i)=>x.textContent=arr[i]);}
      const process=cards[5]?.querySelectorAll('.journey-grid span');if(process?.length){const arr=nextLang==='hi'?['Citizen Assist खोलें','सेवा खोजें','सही मार्गदर्शिका चुनें','पात्रता और दस्तावेज़ जाँचें','चेकलिस्ट पूरी करें','जरूरत हो तो चैटबॉट से पूछें','आधिकारिक पोर्टल पर जाएँ']:nextLang==='mr'?['Citizen Assist उघडा','सेवा शोधा','योग्य मार्गदर्शिका निवडा','पात्रता आणि कागदपत्रे तपासा','चेकलिस्ट पूर्ण करा','गरज असल्यास चॅटबॉटला विचारा','अधिकृत पोर्टलवर जा']:['Open Citizen Assist','Search a service','Select the right guide','Check eligibility & documents','Complete the checklist','Ask the chatbot if needed','Continue to the official portal'];process.forEach((x,i)=>x.textContent=arr[i]);}
      const statsP=cards[6]?.querySelector('p');if(statsP)statsP.textContent=nextLang==='hi'?'आधिकारिक महाराष्ट्र Aaple Sarkar डैशबोर्ड पर 1,212 अधिसूचित सेवाएँ, 1,083 पोर्टल पर उपलब्ध सेवाएँ और 38 विभाग दिखते हैं। Citizen Assist सरल खोज और तैयारी की परत देता है; आधिकारिक सूची अंतिम स्रोत है।':nextLang==='mr'?'अधिकृत महाराष्ट्र Aaple Sarkar डॅशबोर्डवर 1,212 अधिसूचित सेवा, 1,083 पोर्टलवर उपलब्ध सेवा आणि 38 विभाग दिसतात. Citizen Assist सोपी शोध व तयारीची पातळी देते; अधिकृत यादी अंतिम स्रोत आहे.':'The official Maharashtra Aaple Sarkar dashboard displays 1,212 notified services, 1,083 services available on the portal, and 38 departments. Citizen Assist provides a simpler discovery and preparation layer while the official catalogue remains the source of truth.';
      const acc=cards[7]?.querySelector('p');if(acc)acc.textContent=nextLang==='hi'?'अंग्रेज़ी, हिंदी और मराठी समर्थन, बड़े टेक्स्ट, उच्च कंट्रास्ट, ब्लैक-एंड-व्हाइट मोड, कीबोर्ड नेविगेशन और बड़े टच लक्ष्य इंटरफ़ेस को आसान बनाते हैं।':nextLang==='mr'?'इंग्रजी, हिंदी आणि मराठी समर्थन, मोठा मजकूर, उच्च कॉन्ट्रास्ट, काळा-पांढरा मोड, कीबोर्ड नेव्हिगेशन आणि मोठे टच लक्ष्य इंटरफेस वापरणे सोपे करतात.':'English, Hindi and Marathi support, scalable text, high contrast, black-and-white mode, keyboard-friendly navigation and large touch targets help make the interface easier to use.';
      const trust=cards[8]?.querySelector('p');if(trust)trust.textContent=nextLang==='hi'?'Citizen Assist एक स्वतंत्र कॉलेज CEP प्रोजेक्ट है, सरकारी वेबसाइट नहीं। सरकारी तथ्य और गंतव्य हमारे मार्गदर्शन से अलग रखे गए हैं; जहाँ उपलब्ध हो वहाँ आधिकारिक डोमेन और अंतिम जाँच की जानकारी दिखाई जाती है।':nextLang==='mr'?'Citizen Assist हा स्वतंत्र कॉलेज CEP प्रकल्प आहे, सरकारी वेबसाइट नाही. शासकीय तथ्ये आणि गंतव्ये आमच्या मार्गदर्शनापासून वेगळी ठेवली आहेत; उपलब्ध असल्यास अधिकृत डोमेन आणि शेवटची तपासणी माहिती दाखवली जाते.':'Citizen Assist is an independent college CEP project, not a government website. Government facts and destinations are separated from our guidance, with the official domain and last-checked information shown where available.';
    }
    // Contact, accessibility and footer
    const cb=$('#page-contact .page-banner');if(cb){cb.querySelector('.eyebrow').textContent=P.contactEyebrow;cb.querySelector('h1').textContent=P.contactTitle;cb.querySelector('p').textContent=P.contactDesc;}
    const privacy=$('#contactForm .privacy-warning');if(privacy)privacy.innerHTML='<strong>'+P.zeroPii+'</strong> '+P.zeroPiiText; $('#contactForm label:nth-of-type(1)').childNodes[0].textContent=P.name;$('#contactForm label:nth-of-type(2)').childNodes[0].textContent=P.email;$('#contactForm label:nth-of-type(3)').childNodes[0].textContent=P.message;
    const ab=$('#page-accessibility .page-banner');if(ab){ab.querySelector('.eyebrow').textContent=P.accessEyebrow;ab.querySelector('h1').textContent=P.accessTitle;} const settings=$('#page-accessibility .settings-card');if(settings){settings.querySelectorAll('h3')[0].textContent=P.textSize;settings.querySelectorAll('h3')[1].textContent=P.highContrast;settings.querySelectorAll('h3')[2].textContent=P.blackWhite;settings.querySelectorAll('h3')[3].textContent=P.reset;$('#resetAccessibility').textContent=P.resetSettings;}
    $('#footerBrandTag').textContent=P.footerTag;$('#footerDisclaimer').textContent=P.footerDisclaimer;$('#footerQuick').textContent=P.footerQuick;$('#footerOfficial').textContent=P.footerOfficial;$('#footerServices').textContent=T.services;$('#footerFaq').textContent=T.faq;$('#footerAbout').textContent=T.about;$('#footerSource').textContent=P.footerSource;
    // Native language selector labels should also change.
    const lo=$('#languageSelect').options;if(lo.length>=3){lo[0].textContent=P.english;lo[1].textContent=P.hindi;lo[2].textContent=P.marathi;}

    renderHome();renderServices();renderFaqs();if(activeService)openGuide(activeService.id);
  }

  function initAccessibility(){
    const st=JSON.parse(localStorage.getItem('ca-access')||'{}');
    document.body.classList.toggle('high-contrast',!!st.hc);document.body.classList.toggle('bw',!!st.bw);document.documentElement.style.setProperty('--font-scale',st.font||1);
    $('#highContrastToggle').checked=!!st.hc;$('#bwToggle').checked=!!st.bw;
    $$('.segmented button').forEach(b=>b.classList.toggle('active',(st.font||1)===(b.dataset.font==='small'?.9:b.dataset.font==='large'?1.15:1)));
  }
  function saveAccess(){localStorage.setItem('ca-access',JSON.stringify({hc:$('#highContrastToggle').checked,bw:$('#bwToggle').checked,font:Number(getComputedStyle(document.documentElement).getPropertyValue('--font-scale'))||1}));}

  function init(){
    Object.entries(D.categories).forEach(([k,c])=>$('#categoryFilter').insertAdjacentHTML('beforeend',`<option value="${k}">${esc(c.label)}</option>`));
    renderHome();renderServices();renderFaqs();initAccessibility();
    const lang=localStorage.getItem('ca-lang')||'en';$('#languageSelect').value=lang;applyLang(lang);

    $$('[data-nav]').forEach(el=>el.addEventListener('click',()=>route(el.dataset.nav)));
    $('.brand').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ') route('home')});
    $('#menuBtn').addEventListener('click',()=>$('#mainNav').classList.toggle('open'));
    $('#accessibilityBtn').addEventListener('click',()=>route('accessibility'));
    $('#languageSelect').addEventListener('change',e=>applyLang(e.target.value));
    $$('.language-search button').forEach((b,i)=>b.addEventListener('click',()=>{const l=['en','hi','mr'][i];$('#languageSelect').value=l;applyLang(l);}));

    const doHomeSearch=()=>{const q=$('#homeSearch').value.trim();$('#serviceSearch').value=q;$('#categoryFilter').value='all';$('#difficultyFilter').value='all';$('#personaFilter').value='all';selectedPersona=null;route('services');renderServices();setTimeout(()=>$('#serviceSearch').focus(),120);};
    $('#homeSearchBtn').addEventListener('click',doHomeSearch);$('#homeSearch').addEventListener('keydown',e=>{if(e.key==='Enter')doHomeSearch()});
    $$('.quick-links button').forEach(b=>b.addEventListener('click',()=>{$('#homeSearch').value=b.dataset.query;doHomeSearch()}));

    $$('#personaRow button').forEach(b=>b.addEventListener('click',()=>{selectedPersona=b.dataset.persona;$$('#personaRow button').forEach(x=>x.classList.toggle('active',x===b));$('#personaFilter').value=selectedPersona==='others'?'all':selectedPersona;route('services');renderServices()}));
    $('#serviceSearch').addEventListener('input',renderServices);
    ['categoryFilter','difficultyFilter','personaFilter'].forEach(id=>$('#'+id).addEventListener('change',renderServices));
    $('#serviceSearchBtn').addEventListener('click',renderServices);
    $('#clearFilters').addEventListener('click',()=>{$('#serviceSearch').value='';$('#categoryFilter').value='all';$('#difficultyFilter').value='all';$('#personaFilter').value='all';selectedPersona=null;renderServices();$('#searchSuggestions').classList.remove('open')});

    $$('.guide-nav button').forEach(b=>b.addEventListener('click',()=>document.getElementById(b.dataset.scroll)?.scrollIntoView({behavior:'smooth',block:'start'})));
    $('#openChatFromGuide').addEventListener('click',openChat);
    $$('.feedback-btn').forEach(b=>b.addEventListener('click',()=>{chosenFeedback=b.dataset.helpful;$$('.feedback-btn').forEach(x=>x.classList.toggle('selected',x===b))}));
    $('#submitGuideFeedback').addEventListener('click',()=>{if(!chosenFeedback){$('#guideFeedbackMsg').textContent='Please choose Yes or No first.';return;} const all=JSON.parse(localStorage.getItem('ca-feedback')||'[]');all.push({service:activeService?.id,helpful:chosenFeedback,text:$('#guideFeedbackText').value.slice(0,400),at:new Date().toISOString()});localStorage.setItem('ca-feedback',JSON.stringify(all));$('#guideFeedbackMsg').textContent='Thank you — feedback saved in this browser for the project demo.';});

    $('#faqSearch').addEventListener('input',renderFaqs);
    $('#contactForm').addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(e.currentTarget);const text=fd.get('message');if(/\b\d{12}\b|\b\d{10}\b/i.test(text)){$('#contactMsg').textContent='For privacy, please remove possible sensitive identification/account numbers before submitting.';return;}const rows=JSON.parse(localStorage.getItem('ca-contact')||'[]');rows.push({name:fd.get('name'),email:fd.get('email'),message:text,at:new Date().toISOString()});localStorage.setItem('ca-contact',JSON.stringify(rows));e.currentTarget.reset();$('#contactMsg').textContent='Message saved locally for the project demo.';});

    $('#chatFab').addEventListener('click',openChat);$('#closeChat').addEventListener('click',closeChat);$('#chatForm').addEventListener('submit',e=>{e.preventDefault();const q=$('#chatInput').value.trim();if(!q)return;addMsg(q,'user');$('#chatInput').value='';setTimeout(()=>addBot(localBot(q)),180)});$$('.chat-suggestions button').forEach(b=>b.addEventListener('click',()=>{$('#chatInput').value=b.textContent;$('#chatForm').requestSubmit()}));

    $('#highContrastToggle').addEventListener('change',e=>{document.body.classList.toggle('high-contrast',e.target.checked);saveAccess()});
    $('#bwToggle').addEventListener('change',e=>{document.body.classList.toggle('bw',e.target.checked);saveAccess()});
    $$('.segmented button').forEach(b=>b.addEventListener('click',()=>{const v=b.dataset.font==='small'?.9:b.dataset.font==='large'?1.15:1;document.documentElement.style.setProperty('--font-scale',v);$$('.segmented button').forEach(x=>x.classList.toggle('active',x===b));saveAccess()}));
    $('#resetAccessibility').addEventListener('click',()=>{document.body.classList.remove('high-contrast','bw');document.documentElement.style.setProperty('--font-scale',1);$('#highContrastToggle').checked=false;$('#bwToggle').checked=false;localStorage.removeItem('ca-access');initAccessibility()});

    // Welcome pop-up: shown once per browser session.
    const welcomeShown=sessionStorage.getItem('ca-welcome-shown');
    if(!welcomeShown){setTimeout(()=>{$('#welcomeModal').classList.add('open');$('#welcomeModal').setAttribute('aria-hidden','false')},500);}
    const closeWelcome=()=>{$('#welcomeModal').classList.remove('open');$('#welcomeModal').setAttribute('aria-hidden','true');sessionStorage.setItem('ca-welcome-shown','1');};
    $('#closeWelcome').addEventListener('click',closeWelcome);
    $('#welcomeExplore').addEventListener('click',()=>{closeWelcome();route('services');});
    $('#welcomeAbout').addEventListener('click',()=>{closeWelcome();route('about');});
    $('#welcomeModal').addEventListener('click',e=>{if(e.target.id==='welcomeModal')closeWelcome()});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('#welcomeModal').classList.contains('open'))closeWelcome()});
    document.addEventListener('click',e=>{if(!e.target.closest('.search-with-suggestions'))$('#searchSuggestions')?.classList.remove('open')});

    const hash=location.hash.replace('#','');if(hash && ['home','services','faq','about','contact','accessibility'].includes(hash)) route(hash); else route('home');
  }
  document.addEventListener('DOMContentLoaded',init);
})();
