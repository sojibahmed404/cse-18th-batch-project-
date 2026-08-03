import React from 'react';
import { X, Phone, Mail, User, HelpCircle, ShieldAlert, BookOpen } from 'lucide-react';

interface NeedHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NeedHelpModal: React.FC<NeedHelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-opacity">
      <div className="relative w-full max-w-lg overflow-hidden bg-[#0B2D3B] border border-cyan-500/30 rounded-2xl shadow-2xl text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/20 bg-slate-900/40">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Need Portal Support?</h3>
              <p className="text-xs text-cyan-300/80">Department of CSE - 18th Batch Support</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">

          {/* CR Contact Section */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-emerald-500/20 space-y-3">
            <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-sm">
              <User className="w-4 h-4" />
              <span>Class Representative (CR) Contact</span>
            </div>
            <div className="space-y-1 pl-6 text-xs text-slate-300">
              <p className="font-semibold text-white">Md. Sojib Ahmed (18th Batch CR)</p>
              <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-cyan-400" /> 01754-301132</p>
              <p className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-cyan-400" /> mdsojibahmed544@gmail.com</p>
            </div>
          </div>

          {/* Department Helpdesk */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-cyan-500/20 space-y-3">
            <div className="flex items-center space-x-2 text-cyan-400 font-semibold text-sm">
              <BookOpen className="w-4 h-4" />
              <span>CSE Department Office (KYAU)</span>
            </div>
            <div className="space-y-1 pl-6 text-xs text-slate-300">
              <p>Khwaja Yunus Ali University Academic Building</p>
              <p>Enayetpur, Sirajganj, Bangladesh</p>
              <p className="flex items-center gap-2 mt-1"><Mail className="w-3.5 h-3.5 text-cyan-400" /> cse@kyau.edu.bd</p>
            </div>
          </div>

          {/* FAQs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" /> Frequently Asked Questions
            </h4>
            
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800">
                <p className="font-semibold text-white">What is my Student ID format?</p>
                <p className="text-slate-400 mt-1">Your 13-digit KYAU Student ID (e.g. <code className="text-emerald-400 font-mono">6224205101006</code>).</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800">
                <p className="font-semibold text-white">How do I access my official Edu Email?</p>
                <p className="text-slate-400 mt-1">Your official edu email is formatted as <code className="text-emerald-400 font-mono">student_id@student.kyau.edu.bd</code>.</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800">
                <p className="font-semibold text-white">What if my account gets locked?</p>
                <p className="text-slate-400 mt-1">If you fail 5 consecutive login attempts, the system automatically locks login for 15 minutes to protect your account. You may reset your password via Forgot Password.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end px-6 py-4 border-t border-cyan-500/20 bg-slate-900/60">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors shadow-lg shadow-emerald-500/20"
          >
            Got it, Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default NeedHelpModal;
