import { X, MapPin, Phone } from "lucide-react";
import { useState } from "react";

interface HealthPostFinderProps {
  isOpen: boolean;
  onClose: () => void;
}

const HEALTH_POSTS: Record<string, Array<{name: string, location: string, phone: string}>> = {
  "Kathmandu": [
    { name: "Bir Hospital", location: "Ratnapark", phone: "01-4221119" },
    { name: "Teaching Hospital", location: "Maharajgunj", phone: "01-4412303" },
    { name: "Teku Hospital", location: "Teku", phone: "01-4253396" }
  ],
  "Lalitpur": [
     { name: "Patan Hospital", location: "Lagankhel", phone: "01-5522278" },
     { name: "Alka Hospital", location: "Jawalakhel", phone: "01-5528999" }
  ],
  "Bhaktapur": [
      { name: "Bhaktapur Hospital", location: "Dudhpati", phone: "01-6610798" },
      { name: "Cancer Hospital", location: "Bhaktapur", phone: "01-6611532" }
  ],
  "Rural (Demo)": [
      { name: "Health Post A", location: "Village Ward 1", phone: "9800000001" },
      { name: "Health Post B", location: "Village Ward 5", phone: "9800000002" }
  ]
};

export default function HealthPostFinder({ isOpen, onClose }: HealthPostFinderProps) {
  const [district, setDistrict] = useState("Kathmandu");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden flex flex-col h-[70vh]">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between bg-blue-50">
          <div className="flex items-center gap-2 text-blue-700">
            <MapPin size={20} />
            <h2 className="font-bold">Nearby Health Posts</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-blue-100 rounded-full text-slate-500">
            <X size={20} />
          </button>
        </div>

        {/* Filter */}
        <div className="p-4 border-b bg-white">
            <label className="text-xs font-bold text-slate-500 uppercase">Select District</label>
            <select 
                value={district} 
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full mt-1 p-2 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {Object.keys(HEALTH_POSTS).map(d => <option key={d} value={d}>{d}</option>)}
            </select>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {HEALTH_POSTS[district].map((post, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                        <div className="font-bold text-slate-800">{post.name}</div>
                        <div className="text-sm text-slate-500 flex items-center gap-1">
                             <MapPin size={12} /> {post.location}
                        </div>
                    </div>
                    <a href={`tel:${post.phone}`} className="p-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors">
                        <Phone size={20} />
                    </a>
                </div>
            ))}
        </div>
        
        <div className="p-3 bg-yellow-50 text-xs text-yellow-700 text-center border-t border-yellow-100">
            ⚠️ Works Offline. Data helps when internet is down.
        </div>
      </div>
    </div>
  );
}
