import React, { useState } from 'react';
import { X, User, Phone, Mail, MapPin, Heart, AlertCircle, Save } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: {
    firstName: string;
    lastName: string;
    personalEmail?: string;
    phone?: string;
    bloodGroup?: string;
    address?: string;
    emergencyContact?: string;
    bio?: string;
  };
  onSave: (updatedData: any) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    firstName: initialData.firstName || '',
    lastName: initialData.lastName || '',
    personalEmail: initialData.personalEmail || '',
    phone: initialData.phone || '',
    bloodGroup: initialData.bloodGroup || 'UNKNOWN',
    address: initialData.address || '',
    emergencyContact: initialData.emergencyContact || '',
    bio: initialData.bio || '',
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      onSave(formData);
      setLoading(false);
      toast.success('Profile updated successfully!');
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg overflow-hidden bg-[#0A192F] border border-cyan-500/30 rounded-2xl shadow-2xl text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/20 bg-slate-900/80">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Edit Profile</h3>
              <p className="text-[11px] text-cyan-400 font-medium">Update your personal contact details</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-cyan-300 mb-1 uppercase tracking-wider">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:border-emerald-400 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-cyan-300 mb-1 uppercase tracking-wider">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:border-emerald-400 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-cyan-300 mb-1 uppercase tracking-wider">
              Personal Gmail / Email
            </label>
            <div className="relative">
              <input
                type="email"
                name="personalEmail"
                value={formData.personalEmail}
                onChange={handleChange}
                placeholder="e.g. user@gmail.com"
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:border-emerald-400 outline-none"
              />
              <Mail className="absolute left-3 top-3 w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-cyan-300 mb-1 uppercase tracking-wider">
                Phone Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+8801700000000"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:border-emerald-400 outline-none font-mono"
                />
                <Phone className="absolute left-3 top-3 w-3.5 h-3.5 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-cyan-300 mb-1 uppercase tracking-wider">
                Blood Group
              </label>
              <div className="relative">
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:border-emerald-400 outline-none appearance-none"
                >
                  <option value="UNKNOWN">Select Blood Group</option>
                  <option value="A_POSITIVE">A+</option>
                  <option value="A_NEGATIVE">A-</option>
                  <option value="B_POSITIVE">B+</option>
                  <option value="B_NEGATIVE">B-</option>
                  <option value="AB_POSITIVE">AB+</option>
                  <option value="AB_NEGATIVE">AB-</option>
                  <option value="O_POSITIVE">O+</option>
                  <option value="O_NEGATIVE">O-</option>
                </select>
                <Heart className="absolute left-3 top-3 w-3.5 h-3.5 text-rose-400" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-cyan-300 mb-1 uppercase tracking-wider">
              Emergency Contact
            </label>
            <input
              type="text"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleChange}
              placeholder="e.g. Guardian Name & Phone (+8801...)"
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:border-emerald-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-cyan-300 mb-1 uppercase tracking-wider">
              Present Address
            </label>
            <div className="relative">
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="e.g. Enayetpur, Sirajganj / Permanent Address"
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:border-emerald-400 outline-none"
              />
              <MapPin className="absolute left-3 top-3 w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-cyan-300 mb-1 uppercase tracking-wider">
              Bio / About Me
            </label>
            <textarea
              name="bio"
              rows={3}
              value={formData.bio}
              onChange={handleChange}
              placeholder="Write a brief bio..."
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:border-emerald-400 outline-none"
            />
          </div>

          <div className="pt-2 flex justify-end space-x-2 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-medium text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 rounded-xl transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
            >
              <Save className="w-3.5 h-3.5" />
              {loading ? 'Saving Changes...' : 'Save Profile Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
