import { X } from "lucide-react";

interface BodyMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPart: (text: string) => void;
  lang: 'en-US' | 'ne-NP';
}

export default function BodyMapModal({ isOpen, onClose, onSelectPart, lang }: BodyMapModalProps) {
  if (!isOpen) return null;

  const handleSelect = (partEn: string, partNe: string) => {
    const text = lang === 'ne-NP' 
      ? `मलाई ${partNe} दुखेको छ` 
      : `I have pain in my ${partEn}`;
    onSelectPart(text);
    onClose();
  };

  // Shared classes for the SVG paths
  const pathClass = "fill-slate-100 stroke-slate-300 stroke-2 hover:fill-blue-100 hover:stroke-blue-500 transition-all cursor-pointer";
  const activeLabelClass = "pointer-events-none fill-sky-800 text-[10px] font-bold uppercase text-center";

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm rounded-[2rem] shadow-2xl overflow-hidden flex flex-col items-center relative animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="w-full bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center">
            <div>
                <h2 className="text-lg font-bold text-slate-800">Tap Pain Location</h2>
                <p className="text-xs text-slate-500">दुखेको भाग छान्नुहोस्</p>
            </div>
            <button onClick={onClose} className="p-2 bg-white rounded-full hover:bg-slate-100 shadow-sm transition-colors border border-slate-200">
                <X size={18} className="text-slate-600" />
            </button>
        </div>

        {/* SVG Container */}
        <div className="p-6 w-full bg-white flex justify-center items-center h-96 relative">
            <svg viewBox="0 0 200 400" className="h-full w-auto drop-shadow-xl">
                {/* HEAD */}
                <g onClick={() => handleSelect("Head", "टाउको")} className="group">
                    <circle cx="100" cy="40" r="28" className={`${pathClass} group-hover:fill-rose-100 group-hover:stroke-rose-500`} />
                    <text x="100" y="45" textAnchor="middle" className="text-[10px] fill-slate-400 group-hover:fill-rose-700 font-bold pointer-events-none">HEAD</text>
                </g>

                {/* NECK */}
                <path d="M85 65 L115 65 L115 80 L85 80 Z" 
                      onClick={() => handleSelect("Neck", "घाँटी")}
                      className={`${pathClass} hover:fill-orange-100 hover:stroke-orange-500`} 
                />

                {/* CHEST */}
                <g onClick={() => handleSelect("Chest", "छाती")} className="group">
                    <path d="M70 80 Q100 80 130 80 L135 140 Q100 145 65 140 Z" 
                          className={`${pathClass} group-hover:fill-teal-100 group-hover:stroke-teal-500`} 
                    />
                     <text x="100" y="115" textAnchor="middle" className="text-[10px] fill-slate-400 group-hover:fill-teal-700 font-bold pointer-events-none">CHEST</text>
                </g>

                {/* STOMACH */}
                <g onClick={() => handleSelect("Stomach", "पेट")} className="group">
                    <path d="M65 140 Q100 145 135 140 L130 200 Q100 210 70 200 Z" 
                          className={`${pathClass} group-hover:fill-amber-100 group-hover:stroke-amber-500`} 
                    />
                    <text x="100" y="175" textAnchor="middle" className="text-[10px] fill-slate-400 group-hover:fill-amber-700 font-bold pointer-events-none">STOMACH</text>
                </g>

                {/* ARMS */}
                {/* Left Arm */}
                <path d="M70 80 L40 160 L55 165 L80 90 Z" 
                      onClick={() => handleSelect("Left Arm", "देब्रे हात")}
                      className={`${pathClass} hover:fill-sky-100 hover:stroke-sky-500`} 
                />
                 {/* Right Arm */}
                <path d="M130 80 L160 160 L145 165 L120 90 Z" 
                      onClick={() => handleSelect("Right Arm", "दाहिने हात")}
                      className={`${pathClass} hover:fill-sky-100 hover:stroke-sky-500`} 
                />

                {/* LEGS */}
                 {/* Left Leg */}
                <path d="M70 200 L60 350 L85 350 L95 205 Z" 
                      onClick={() => handleSelect("Legs", "खुट्टा")}
                      className={`${pathClass} hover:fill-indigo-100 hover:stroke-indigo-500`} 
                />
                 {/* Right Leg */}
                <path d="M130 200 L140 350 L115 350 L105 205 Z" 
                      onClick={() => handleSelect("Legs", "खुट्टा")}
                      className={`${pathClass} hover:fill-indigo-100 hover:stroke-indigo-500`} 
                />
                
            </svg>
            
            {/* Legend/Helper */}
            <div className="absolute bottom-4 bg-slate-50 px-3 py-1 rounded-full border border-slate-200 text-[10px] text-slate-500">
                Front View / अगाडि
            </div>
        </div>
      </div>
    </div>
  );
}
