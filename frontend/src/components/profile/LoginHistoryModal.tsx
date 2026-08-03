import React from 'react';
import { X, ShieldCheck, Monitor, Smartphone, Globe, Clock } from 'lucide-react';

interface LoginHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginHistoryModal: React.FC<LoginHistoryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const logs = [
    {
      id: '1',
      device: 'Desktop (Windows)',
      browser: 'Chrome 122.0',
      ip: '127.0.0.1 (Localhost)',
      location: 'Dhaka, Bangladesh',
      time: 'Just now',
      status: 'SUCCESS',
      isCurrent: true,
    },
    {
      id: '2',
      device: 'Mobile (Android)',
      browser: 'Chrome Mobile',
      ip: '103.145.72.10',
      location: 'Sirajganj, Bangladesh',
      time: 'Yesterday at 08:30 PM',
      status: 'SUCCESS',
      isCurrent: false,
    },
    {
      id: '3',
      device: 'Desktop (Windows)',
      browser: 'Firefox 120.0',
      ip: '103.145.72.10',
      location: 'Sirajganj, Bangladesh',
      time: '2 days ago at 10:15 AM',
      status: 'SUCCESS',
      isCurrent: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-md overflow-hidden bg-[#0A192F] border border-cyan-500/30 rounded-2xl shadow-2xl text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/20 bg-slate-900/80">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Security & Login History</h3>
              <p className="text-[11px] text-cyan-400 font-medium">Recent device logins & active sessions</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-3">
          {logs.map((log) => (
            <div
              key={log.id}
              className={`p-3.5 rounded-xl border transition-all ${
                log.isCurrent
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-white'
                  : 'bg-slate-900/80 border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {log.device.includes('Mobile') ? (
                    <Smartphone className="w-4 h-4 text-cyan-400" />
                  ) : (
                    <Monitor className="w-4 h-4 text-emerald-400" />
                  )}
                  <div>
                    <p className="text-xs font-bold text-white flex items-center gap-1.5">
                      {log.device}
                      {log.isCurrent && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          Active Now
                        </span>
                      )}
                    </p>
                    <p className="text-[11px] text-slate-400">{log.browser}</p>
                  </div>
                </div>
              </div>

              <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Globe className="w-3 h-3 text-slate-500" /> {log.ip}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" /> {log.time}
                </span>
              </div>
            </div>
          ))}

          <div className="pt-2 text-center">
            <button
              onClick={onClose}
              className="w-full py-2.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-900 border border-slate-700 rounded-xl"
            >
              Close History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
