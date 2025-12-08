import Navbar from "@/components/Navbar";
import { Activity, Heart, Globe, Zap, CheckCircle, ArrowRight, Mic, Image as ImageIcon, Languages, Wifi } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-sm font-semibold animate-in fade-in slide-in-from-bottom-3">
            🏥 AI-Powered Healthcare for Rural Nepal
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight animate-in fade-in slide-in-from-bottom-4">
            Distance Shouldn&apos;t <br />
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
              Decide Your Health
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-5">
            Instant medical triage powered by GPT-4. Voice-enabled. Bilingual. <br />
            Designed for accessibility in rural and urban Nepal.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-in fade-in slide-in-from-bottom-6">
            <Link
              href="/chat"
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-lg font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              Start Chat Now
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            <a
              href="#how-it-works"
              className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 text-lg font-semibold rounded-full hover:border-blue-300 hover:bg-blue-50 transition-all"
            >
              See How It Works
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-7">
            <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="text-3xl font-bold text-blue-600 mb-1">20M+</div>
              <div className="text-sm text-slate-600">Potential Users</div>
            </div>
            <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="text-3xl font-bold text-cyan-600 mb-1">$0.01</div>
              <div className="text-sm text-slate-600">Per Consultation</div>
            </div>
            <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="text-3xl font-bold text-emerald-600 mb-1">&lt;2s</div>
              <div className="text-sm text-slate-600">Response Time</div>
            </div>
            <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="text-3xl font-bold text-rose-600 mb-1">24/7</div>
              <div className="text-sm text-slate-600">Always Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Powerful Features for <span className="text-blue-600">Everyone</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Built for low-literacy, low-connectivity environments. Accessible to all.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="p-6 bg-gradient-to-br from-rose-50 to-white rounded-2xl border border-rose-100 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Mic className="text-rose-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Voice-First Interface</h3>
              <p className="text-slate-600">
                Speak your symptoms in English or Nepali. AI responds with voice guidance.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-gradient-to-br from-sky-50 to-white rounded-2xl border border-sky-100 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ImageIcon className="text-sky-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Report Analysis</h3>
              <p className="text-slate-600">
Upload prescriptions and lab reports. GPT-4 Vision extracts insights instantly.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-gradient-to-br from-emerald-50 to-white rounded-2xl border border-emerald-100 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Languages className="text-emerald-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Truly Bilingual</h3>
              <p className="text-slate-600">
                Native Nepali AI responses. Auto-detects language and adapts.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 bg-gradient-to-br from-amber-50 to-white rounded-2xl border border-amber-100 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Wifi className="text-amber-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Offline Tools</h3>
              <p className="text-slate-600">
                First-aid guides, body map, and health post finder work without internet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-sky-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              How It <span className="text-blue-600">Works</span>
            </h2>
            <p className="text-xl text-slate-600">
              Medical triage in 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                1
              </div>
              <div className="p-8 bg-white rounded-2xl shadow-md border border-slate-100 h-full">
                <h3 className="text-2xl font-bold text-slate-900 mb-3 mt-4">Describe Symptoms</h3>
                <p className="text-slate-600">
                  Type, speak, or upload a medical report. MedAssist accepts all input methods.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-cyan-500 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                2
              </div>
              <div className="p-8 bg-white rounded-2xl shadow-md border border-slate-100 h-full">
                <h3 className="text-2xl font-bold text-slate-900 mb-3 mt-4">AI Analysis</h3>
                <p className="text-slate-600">
                  GPT-4 asks targeted Yes/No or MCQ questions for fast, accurate triage.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                3
              </div>
              <div className="p-8 bg-white rounded-2xl shadow-md border border-slate-100 h-full">
                <h3 className="text-2xl font-bold text-slate-900 mb-3 mt-4">Get Guidance</h3>
                <p className="text-slate-600">
                  Receive medical advice, urgency level, and actionable next steps instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Real <span className="text-blue-600">Impact</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Transforming healthcare access across Nepal and beyond
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="text-emerald-500 flex-shrink-0 mt-1" size={28} />
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Bridging the Healthcare Gap</h3>
                  <p className="text-slate-600">
                    80% of Nepal&apos;s population lives in rural areas with limited access to doctors. MedAssist brings medical expertise to every smartphone.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="text-emerald-500 flex-shrink-0 mt-1" size={28} />
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">97% Cost Reduction</h3>
                  <p className="text-slate-600">
                    From $5-10 clinic visits to $0.01 AI consultations. Affordable healthcare for everyone.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="text-emerald-500 flex-shrink-0 mt-1" size={28} />
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">4-6 Hours Saved</h3>
                  <p className="text-slate-600">
                    Eliminates travel time to distant health posts. Instant triage from home.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="text-emerald-500 flex-shrink-0 mt-1" size={28} />
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Scalable Across South Asia</h3>
                  <p className="text-slate-600">
                    Built for Nepal, ready to expand to India, Bangladesh, and Pakistan with Hindi and Bengali support.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 border border-blue-100">
              <blockquote className="text-2xl font-semibold text-slate-900 mb-6 leading-relaxed">
                &quot;Healthcare shouldn&apos;t depend on your zip code. MedAssist brings the doctor to you.&quot;
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full"></div>
                <div>
                  <div className="font-bold text-slate-900">MedAssist Team</div>
                  <div className="text-sm text-slate-600">Healthcare Innovation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consult an Expert Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Need a <span className="text-blue-600">Human Expert?</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              MedAssist AI is powerful, but sometimes you need to talk to a real doctor.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Video Consultation */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-400 p-8 text-white">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
                  <Activity size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-2">Video Consultation</h3>
                <p className="text-blue-50">Connect with licensed doctors via video call</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-emerald-500 flex-shrink-0 mt-0.5" size={20} />
                  <p className="text-slate-600">15-30 minute sessions</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-emerald-500 flex-shrink-0 mt-0.5" size={20} />
                  <p className="text-slate-600">Digital prescription provided</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-emerald-500 flex-shrink-0 mt-0.5" size={20} />
                  <p className="text-slate-600">Available in English & Nepali</p>
                </div>
                <div className="pt-4">
                  <div className="text-3xl font-bold text-slate-900 mb-1">NPR 500</div>
                  <div className="text-sm text-slate-500 mb-4">per consultation</div>
                  <button className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
                    Book Video Call
                  </button>
                </div>
              </div>
            </div>

            {/* In-Person Appointment */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-400 p-8 text-white">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
                  <Heart size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-2">In-Person Visit</h3>
                <p className="text-emerald-50">Schedule an appointment at nearby clinic</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-emerald-500 flex-shrink-0 mt-0.5" size={20} />
                  <p className="text-slate-600">Physical examination included</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-emerald-500 flex-shrink-0 mt-0.5" size={20} />
                  <p className="text-slate-600">Lab tests on-site (if needed)</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-emerald-500 flex-shrink-0 mt-0.5" size={20} />
                  <p className="text-slate-600">Network of 100+ health posts</p>
                </div>
                <div className="pt-4">
                  <div className="text-3xl font-bold text-slate-900 mb-1">NPR 800</div>
                  <div className="text-sm text-slate-500 mb-4">average fee</div>
                  <button className="w-full px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors">
                    Find Nearby Clinic
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-500 text-sm">
              💡 <strong>Tip:</strong> Use MedAssist AI for initial triage, then book an expert if needed.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-cyan-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
Ready to Experience AI Healthcare?
          </h2>
          <p className="text-xl text-blue-50 mb-10">
            Join thousands using MedAssist for instant medical guidance
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-blue-600 text-xl font-bold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
          >
            Start Your Free Consultation
            <ArrowRight size={24} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl p-0.5">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <Heart className="text-rose-500" size={20} />
              </div>
            </div>
            <span className="text-xl font-bold">MedAssist</span>
          </div>
          <p className="text-slate-400 mb-6">
            Built with ❤️ for accessible healthcare in Nepal
          </p>
          <div className="text-sm text-slate-500">
            © 2025 MedAssist. For emergencies, call 100 (Police) or 102 (Ambulance).
          </div>
        </div>
      </footer>
    </div>
  );
}
