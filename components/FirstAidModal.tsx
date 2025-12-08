import { X, ChevronRight, Activity } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FirstAidModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FIRST_AID_DATA = [
  {
    title: "Snake Bite",
    nepali: "सर्पले टोकेमा",
    color: "bg-rose-50 text-rose-700 hover:bg-rose-100 border-rose-200",
    icon: "🐍",
    dos: [
      { en: "Keep patient calm", ne: "बिरामीलाई शान्त राख्नुहोस्" },
      { en: "Immobilize the bitten limb", ne: "टोकेको भाग नचलाउनुहोस्" },
      { en: "Go to hospital immediately", ne: "तुरुन्त अस्पताल लैजानुहोस्" }
    ],
    donts: [
      { en: "Do NOT suck the venom", ne: "विष चुस्ने प्रयास नगर्नुहोस्" },
      { en: "Do NOT tie tight tourniquets", ne: "कसीएर नबाँध्नुहोस्" },
      { en: "Do NOT cut the wound", ne: "घाउ नकाट्नुहोस्" }
    ]
  },
  {
    title: "Burn",
    nepali: "जलेमा",
    color: "bg-orange-50 text-orange-700 hover:bg-orange-100 border-orange-200",
    icon: "🔥",
    dos: [
      { en: "Run cool water for 20 mins", ne: "२० मिनेट चिसो पानी खन्याउनुहोस्" },
      { en: "Cover with clean cloth", ne: "सफा कपडाले छोप्नुहोस्" },
      { en: "Keep patient warm", ne: "बिरामीलाई न्यानो राख्नुहोस्" }
    ],
    donts: [
      { en: "Do NOT use ice", ne: "बरफ प्रयोग नगर्नुहोस्" },
      { en: "Do NOT apply toothpaste", ne: "टुथपेस्ट वा घ्यू नलगाउनुहोस्" },
      { en: "Do NOT burst blisters", ne: "फोका नफुटाउनुहोस्" }
    ]
  },
  {
    title: "Fever",
    nepali: "ज्वरो आएमा",
    color: "bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200",
    icon: "🤒",
    dos: [
      { en: "Drink plenty of fluids", ne: "प्रशस्त पानी/झोल पिउनुहोस्" },
      { en: "Use lukewarm water sponge", ne: "मनतातो पानीले पुछ्नुहोस्" },
      { en: "Take Paracetamol if high", ne: "ज्वरो धेरै भए प्यारासिटामोल खानुहोस्" }
    ],
    donts: [
      { en: "Do NOT cover heavily", ne: "बाक्लो कपडाले नछोप्नुहोस्" },
      { en: "Do NOT give Aspirin to kids", ne: "बच्चालाई एस्पिरिन नदिनुहोस्" }
    ]
  },
  {
    title: "Fracture",
    nepali: "हाड भाँचिएमा",
    color: "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200",
    icon: "🦴",
    dos: [
      { en: "Immobilize the area", ne: "त्यस भागलाई नचलाउनुहोस्" },
      { en: "Apply ice pack if swollen", ne: "सुन्निएमा बरफले सेक्नुहोस्" },
      { en: "Seek medical help", ne: "स्वास्थ्य संस्था लैजानुहोस्" }
    ],
    donts: [
      { en: "Do NOT massage", ne: "मालिश नगर्नुहोस्" },
      { en: "Do NOT straighten bone", ne: "हड्डी सोझो पार्न नखोज्नुहोस्" }
    ]
  }
];

export default function FirstAidModal({ isOpen, onClose }: FirstAidModalProps) {
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden max-h-[85vh] flex flex-col animate-in slide-in-from-bottom-4 duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500">
               <Activity size={20} />
            </div>
            <div>
                <h2 className="font-bold text-slate-800 text-lg">First Aid Guide</h2>
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Offline Mode • अफलाइन</div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {selectedTopic === null ? (
            <div className="grid grid-cols-1 gap-3">
              {FIRST_AID_DATA.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedTopic(idx)}
                  className={`w-full flex items-center p-4 rounded-2xl border transition-all ${item.color} group`}
                >
                  <span className="text-2xl mr-4">{item.icon}</span>
                  <div className="text-left flex-1">
                    <div className="font-bold text-base">{item.title}</div>
                    <div className="text-xs opacity-80">{item.nepali}</div>
                  </div>
                  <ChevronRight size={20} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          ) : (
            <div className="animate-in slide-in-from-right duration-300">
              <button 
                onClick={() => setSelectedTopic(null)}
                className="text-sm font-semibold text-slate-500 mb-6 flex items-center gap-2 hover:text-slate-800 transition-colors px-1"
              >
                ← Back List
              </button>
              
              <div className="flex items-center gap-4 mb-6">
                   <div className="text-4xl">{FIRST_AID_DATA[selectedTopic].icon}</div>
                   <div>
                       <h3 className="text-2xl font-bold text-slate-800">{FIRST_AID_DATA[selectedTopic].title}</h3>
                       <p className="text-slate-500 font-medium">{FIRST_AID_DATA[selectedTopic].nepali}</p>
                   </div>
              </div>

              <div className="space-y-4">
                <div className="bg-emerald-50/50 p-5 rounded-3xl border border-emerald-100">
                  <h4 className="font-bold text-emerald-700 mb-4 flex items-center gap-2 uppercase text-xs tracking-wider">
                     ✅ Do This / गर्नुहोस्
                  </h4>
                  <ul className="space-y-3">
                    {FIRST_AID_DATA[selectedTopic].dos.map((d, i) => (
                        <li key={i} className="flex flex-col text-sm">
                            <span className="font-semibold text-slate-700">{d.en}</span>
                            <span className="text-emerald-600/80 text-xs">{d.ne}</span>
                        </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-rose-50/50 p-5 rounded-3xl border border-rose-100">
                  <h4 className="font-bold text-rose-700 mb-4 flex items-center gap-2 uppercase text-xs tracking-wider">
                     ❌ Avoid This / नगर्नुहोस्
                  </h4>
                  <ul className="space-y-3">
                    {FIRST_AID_DATA[selectedTopic].donts.map((d, i) => (
                        <li key={i} className="flex flex-col text-sm">
                            <span className="font-semibold text-slate-700">{d.en}</span>
                            <span className="text-rose-600/80 text-xs">{d.ne}</span>
                        </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
