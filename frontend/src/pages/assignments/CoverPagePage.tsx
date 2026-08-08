import React, { useState, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, Share2, ArrowLeft, BookOpen, User, Send, Users, CheckSquare, Square, Layers, Loader2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import html2pdf from 'html2pdf.js';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { KYAU_COURSES_LIST } from '../CoursesPage';

export const CSE_18TH_BATCH_STUDENTS = [
  { studentId: '6224205101001', name: 'Md. Rakibul Islam' },
  { studentId: '6224205101002', name: 'Siam Hossain' },
  { studentId: '6224205101003', name: 'Md. Radoun Hossin Mukta' },
  { studentId: '6224205101004', name: 'Md. Shahariar Ahmed Kanon' },
  { studentId: '6224205101005', name: 'Mst. Anamika Jahan' },
  { studentId: '6224205101006', name: 'Md. Sojib Ahmed' },
  { studentId: '6224205101007', name: 'Mst. Ananna Khandaker' },
  { studentId: '6224205101008', name: 'Md. Rakib Hasan Riyad' },
  { studentId: '6224205101010', name: 'Most. Khadija Khatun' },
  { studentId: '6224205101011', name: 'Md. Rezwan Ahmed Ratul' },
  { studentId: '6224205101012', name: 'Maruf Ibna Abdullah Rifat' },
  { studentId: '6224205101013', name: 'Md. Rabbi' },
  { studentId: '6224205101014', name: 'Mst. Mushkat Jahan Shila' },
  { studentId: '6224205101016', name: 'Ijaj Ahmed Rafi' },
  { studentId: '6224205101017', name: 'Md. Sabbir Hossain Rahat' },
  { studentId: '6224205101018', name: 'Abid Hasan Hujaifa' },
  { studentId: '6224205101019', name: 'Sabiha Rumman Medha' },
  { studentId: '6224205101020', name: 'Md. Intaj Hassan Nibir' },
  { studentId: '6224205101021', name: 'Md. Asif Foysal' },
  { studentId: '6224205101023', name: 'Fardin Khan Sadi' },
  { studentId: '6224205101024', name: 'Abir Deb' },
  { studentId: '6224205101025', name: 'Bashudeb Kumer Paul' },
  { studentId: '6224205101026', name: 'Md. Abdur Rahim Ratul' },
  { studentId: '6224205101027', name: 'Tahsin Tasnim Tandra' },
  { studentId: '6224205101028', name: 'Maream' },
  { studentId: '6224205101029', name: 'Md. Imran Hassain' },
  { studentId: '6224205101030', name: 'Abu Sowad Mohammad Ali Siam' },
  { studentId: '6224205101031', name: 'Fatima Rahman Shoshi' },
  { studentId: '6224205101032', name: 'Rukaiya Rafiq Ulfa' },
  { studentId: '6224205101033', name: 'S. M. Salman Farshi' },
  { studentId: '6224205101034', name: 'Tawhidur Rahman Shishir' },
  { studentId: '6224205101035', name: 'Md. Samiul Islam Shihab' },
  { studentId: '6224205101036', name: 'Md. Abu Raihan' },
  { studentId: '6224205101037', name: 'Md. Shimul Sarkar' },
  { studentId: '6224205101038', name: 'Khairun Nahar Sara' },
  { studentId: '6224205101039', name: 'Md. Montasir Monir Alif' },
];

export default function CoverPagePage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const pdfRef = useRef<HTMLDivElement>(null);

  const [isGenerating, setIsGenerating] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [bulkProgress, setBulkProgress] = useState<{ current: number; total: number; name: string } | null>(null);

  // Mode: 'SINGLE' vs 'BULK'
  const [generationMode, setGenerationMode] = useState<'SINGLE' | 'BULK'>('SINGLE');
  
  // Selected Students for Bulk Download (Array of Student IDs)
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([
    user?.student?.studentId || '6224205101006'
  ]);

  const queryCourseCode = searchParams.get('courseCode');
  const queryTopic = searchParams.get('topic');

  // Match course from URL query or default to first course
  const matchedInitialCourse = KYAU_COURSES_LIST.find(c => c.code === queryCourseCode) || KYAU_COURSES_LIST[0];

  const defaultStudentName = user?.student?.firstName ? `${user.student.firstName} ${user.student.lastName}` : 'Md. Sojib Ahmed';
  const defaultStudentId = user?.student?.studentId || '6224205101006';

  // Form State (Shared Course & Subject Information entered ONCE)
  const [formData, setFormData] = useState({
    type: matchedInitialCourse.title.toLowerCase().includes('lab') ? 'Lab Report' : 'Assignment',
    no: '01',
    courseCode: matchedInitialCourse.code,
    courseTitle: matchedInitialCourse.title,
    topic: queryTopic || 'Relational Algebra & Normalization',
    semSeason: 'Fall',
    semYear: '2026',
    studentName: defaultStudentName,
    studentId: defaultStudentId,
    batch: '18th',
    semester: user?.student?.currentSemester || '3rd Year 1st Semester',
    teacherName: matchedInitialCourse.teacher,
    teacherDesignation: matchedInitialCourse.designation || 'Lecturer',
    teacherDept: 'Computer Science and Engineering',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCourseSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCode = e.target.value;
    const matchedCourse = KYAU_COURSES_LIST.find(c => c.code === selectedCode);
    if (matchedCourse) {
      setFormData(prev => ({
        ...prev,
        courseCode: matchedCourse.code,
        courseTitle: matchedCourse.title,
        teacherName: matchedCourse.teacher,
        teacherDesignation: matchedCourse.designation || 'Lecturer',
        type: matchedCourse.title.toLowerCase().includes('lab') ? 'Lab Report' : 'Assignment',
      }));
    }
  };

  // Toggle Single vs Bulk Student Mode
  const handleSingleStudentSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sId = e.target.value;
    const found = CSE_18TH_BATCH_STUDENTS.find(s => s.studentId === sId);
    if (found) {
      setFormData(prev => ({
        ...prev,
        studentName: found.name,
        studentId: found.studentId,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        studentName: defaultStudentName,
        studentId: defaultStudentId,
      }));
    }
  };

  // Checkbox Selection for Bulk Students
  const toggleStudentSelection = (studentId: string) => {
    setSelectedStudentIds(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSelectAllStudents = () => {
    setSelectedStudentIds(CSE_18TH_BATCH_STUDENTS.map(s => s.studentId));
  };

  const handleDeselectAllStudents = () => {
    setSelectedStudentIds([]);
  };

  // PDF Filename format including Student Name
  const getPdfFilename = (name: string, courseCode: string) => {
    const cleanName = name.replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_');
    const cleanCourse = courseCode.replace(/[^a-zA-Z0-9]/g, '_');
    return `${cleanName}_${cleanCourse}_CoverPage.pdf`;
  };

  // Generate PDF for Single Student
  const handleGeneratePdfSingle = async () => {
    if (!pdfRef.current) return;
    setIsGenerating(true);

    const element = pdfRef.current;
    const filename = getPdfFilename(formData.studentName, formData.courseCode);
    const opt = {
      margin: 0,
      filename: filename,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 3, useCORS: true, scrollY: 0, letterRendering: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
      await (html2pdf() as any).set(opt).from(element).save();
      toast.success(`Downloaded: ${filename}`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to generate PDF');
    } finally {
      setIsGenerating(false);
    }
  };

  // Bulk PDF Generator (One Click Download for Selected / All Students)
  const handleGeneratePdfBulk = async () => {
    if (!pdfRef.current) return;
    if (selectedStudentIds.length === 0) {
      toast.error('Please select at least 1 student to download.');
      return;
    }

    setIsGenerating(true);
    const targetStudents = CSE_18TH_BATCH_STUDENTS.filter(s => selectedStudentIds.includes(s.studentId));
    toast.loading(`Starting bulk download for ${targetStudents.length} students...`, { id: 'bulk-toast' });

    for (let i = 0; i < targetStudents.length; i++) {
      const student = targetStudents[i];
      setBulkProgress({ current: i + 1, total: targetStudents.length, name: student.name });

      // Update Form Data to current student so preview element updates
      setFormData(prev => ({
        ...prev,
        studentName: student.name,
        studentId: student.studentId,
      }));

      // Wait 250ms for React state & DOM to render
      await new Promise(resolve => setTimeout(resolve, 250));

      const element = pdfRef.current;
      const filename = getPdfFilename(student.name, formData.courseCode);
      const opt = {
        margin: 0,
        filename: filename,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 3, useCORS: true, scrollY: 0, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      try {
        await (html2pdf() as any).set(opt).from(element).save();
      } catch (err) {
        console.error(`Failed to download for ${student.name}`, err);
      }
    }

    toast.dismiss('bulk-toast');
    toast.success(`Successfully downloaded ${targetStudents.length} PDF cover pages!`);
    setIsGenerating(false);
    setBulkProgress(null);
  };

  const handleShareWhatsApp = async () => {
    if (!pdfRef.current) return;
    setIsSharing(true);

    const element = pdfRef.current;
    const filename = getPdfFilename(formData.studentName, formData.courseCode);
    const opt = {
      margin: 0,
      filename: filename,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
      const blob = await (html2pdf() as any).set(opt).from(element).output('blob');
      const file = new File([blob], filename, { type: 'application/pdf' });
      if (navigator.share) {
        await navigator.share({
          files: [file],
          title: 'KYAU Cover Page',
          text: `KYAU ${formData.type} Cover Page for ${formData.studentName} (${formData.courseCode})`,
        });
        toast.success('Shared successfully!');
      } else {
        toast.error('Sharing not supported on this device. Try Downloading.');
      }
    } catch (e) {
      console.error(e);
      toast.error('Could not share file');
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              KYAU Cover Page Generator
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Batch Generator</span>
            </h1>
            <p className="text-sm text-slate-400">Generate A4 PDF cover pages for yourself or bulk download for batchmates</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://kyau-pdf-builder.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-indigo-400 hover:text-indigo-300 underline flex items-center gap-1"
          >
            Visit Original KYAU PDF Builder ↗
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Form Controls */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="bg-slate-900/90 border-slate-800 backdrop-blur-md shadow-xl">
            <CardHeader className="pb-3 border-b border-slate-800">
              <CardTitle className="text-white flex items-center gap-2 text-base font-semibold">
                <BookOpen size={18} className="text-emerald-400" /> KYAU Cover Editor
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              
              {/* Generation Mode Selector Tabs: Single vs Bulk Selection */}
              <div className="p-1 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-2 gap-1 text-xs">
                <button
                  type="button"
                  onClick={() => setGenerationMode('SINGLE')}
                  className={`py-2 px-3 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
                    generationMode === 'SINGLE'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <User size={14} /> Single Student Mode
                </button>
                <button
                  type="button"
                  onClick={() => setGenerationMode('BULK')}
                  className={`py-2 px-3 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
                    generationMode === 'BULK'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Users size={14} /> Bulk Batch Download
                </button>
              </div>

              {/* MODE 1: Single Student Picker */}
              {generationMode === 'SINGLE' && (
                <div className="space-y-1.5 animate-in fade-in duration-200">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                    <User size={13} className="text-indigo-400" /> Select Student / Batchmate
                  </label>
                  <select
                    value={formData.studentId}
                    onChange={handleSingleStudentSelect}
                    className="flex h-10 w-full rounded-lg border border-indigo-500/40 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                  >
                    <option value={defaultStudentId}>My Profile ({defaultStudentName} - {defaultStudentId})</option>
                    <optgroup label="CSE 18th Batch Students">
                      {CSE_18TH_BATCH_STUDENTS.map((s) => (
                        <option key={s.studentId} value={s.studentId}>
                          {s.name} ({s.studentId})
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>
              )}

              {/* MODE 2: Multi-Select Batchmates Grid */}
              {generationMode === 'BULK' && (
                <div className="space-y-3 p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1">
                        <Users size={14} /> Select Batchmates for Bulk Download
                      </h4>
                      <p className="text-[11px] text-slate-400">Selected: <strong className="text-amber-400">{selectedStudentIds.length}</strong> / {CSE_18TH_BATCH_STUDENTS.length} students</p>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={handleSelectAllStudents}
                        className="px-2 py-1 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold hover:bg-amber-500/30"
                      >
                        Select All
                      </button>
                      <button
                        type="button"
                        onClick={handleDeselectAllStudents}
                        className="px-2 py-1 rounded bg-slate-800 text-slate-400 text-[10px] font-bold hover:text-white"
                      >
                        Clear
                      </button>
                    </div>
                  </div>

                  {/* Scrollable Checkbox List */}
                  <div className="max-h-48 overflow-y-auto space-y-1 pr-1 custom-scrollbar bg-slate-950 p-2 rounded-lg border border-slate-800 text-xs">
                    {CSE_18TH_BATCH_STUDENTS.map((s) => {
                      const isSelected = selectedStudentIds.includes(s.studentId);
                      return (
                        <label
                          key={s.studentId}
                          onClick={() => toggleStudentSelection(s.studentId)}
                          className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                            isSelected ? 'bg-amber-500/10 text-amber-200 font-semibold' : 'text-slate-400 hover:bg-slate-900'
                          }`}
                        >
                          <span className="truncate pr-2">{s.name} ({s.studentId})</span>
                          {isSelected ? (
                            <CheckSquare size={16} className="text-amber-400 shrink-0" />
                          ) : (
                            <Square size={16} className="text-slate-600 shrink-0" />
                          )}
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Shared Course Information (Entered ONCE) */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Quick Select CSE 18th Batch Course</label>
                <select
                  value={formData.courseCode}
                  onChange={handleCourseSelect}
                  className="flex h-10 w-full rounded-lg border border-emerald-500/40 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                >
                  {KYAU_COURSES_LIST.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code} — {c.title} ({c.teacher})
                    </option>
                  ))}
                </select>
              </div>

              {/* Type & Number */}
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2 space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Type</label>
                  <select 
                    name="type" 
                    value={formData.type} 
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Assignment">Assignment</option>
                    <option value="Lab Report">Lab Report</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">No.</label>
                  <Input name="no" value={formData.no} onChange={handleChange} className="bg-slate-950 border-slate-800 text-white h-10 text-xs" placeholder="01" />
                </div>
              </div>

              {/* Course Code & Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Course Code</label>
                <Input name="courseCode" value={formData.courseCode} onChange={handleChange} className="bg-slate-950 border-slate-800 text-white h-10 text-xs" />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Course Title</label>
                <Input name="courseTitle" value={formData.courseTitle} onChange={handleChange} className="bg-slate-950 border-slate-800 text-white h-10 text-xs" />
              </div>

              {/* Topic Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Topic Name</label>
                <Input name="topic" value={formData.topic} onChange={handleChange} className="bg-slate-950 border-slate-800 text-white h-10 text-xs" placeholder="Enter Topic Name" />
              </div>

              {/* Season & Year */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Season</label>
                  <select
                    name="semSeason"
                    value={formData.semSeason}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Spring">Spring</option>
                    <option value="Summer">Summer</option>
                    <option value="Fall">Fall</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Year</label>
                  <Input name="semYear" value={formData.semYear} onChange={handleChange} className="bg-slate-950 border-slate-800 text-white h-10 text-xs" placeholder="2026" />
                </div>
              </div>

              {/* Submitted By Section */}
              <div className="pt-3 border-t border-slate-800 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                  <User size={14} /> Submitted By Info
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">Student Name</label>
                    <Input name="studentName" value={formData.studentName} onChange={handleChange} className="bg-slate-950 border-slate-800 text-white h-9 text-xs" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">ID Number</label>
                    <Input name="studentId" value={formData.studentId} onChange={handleChange} className="bg-slate-950 border-slate-800 text-white h-9 text-xs" />
                  </div>
                </div>
              </div>

              {/* Submitted To Section */}
              <div className="pt-3 border-t border-slate-800 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1">
                  <User size={14} /> Submitted To Info
                </h3>
                <div className="space-y-2">
                  <Input name="teacherName" value={formData.teacherName} onChange={handleChange} placeholder="Teacher Name" className="bg-slate-950 border-slate-800 text-white h-9 text-xs" />
                  <div className="grid grid-cols-2 gap-3">
                    <select
                      name="teacherDesignation"
                      value={formData.teacherDesignation}
                      onChange={handleChange}
                      className="flex h-9 w-full rounded-lg border border-slate-800 bg-slate-950 px-2 py-1.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="Lecturer">Lecturer</option>
                      <option value="Assistant Professor">Assistant Professor</option>
                      <option value="Associate Professor">Associate Professor</option>
                      <option value="Professor">Professor</option>
                    </select>
                    <Input name="teacherDept" value={formData.teacherDept} onChange={handleChange} placeholder="Department" className="bg-slate-950 border-slate-800 text-white h-9 text-xs" />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col gap-3">
                {generationMode === 'SINGLE' ? (
                  <Button 
                    onClick={handleGeneratePdfSingle} 
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 shadow-lg shadow-emerald-600/30 text-sm"
                    isLoading={isGenerating}
                  >
                    <Download className="mr-2 h-4 w-4" /> Download PDF Cover Page
                  </Button>
                ) : (
                  <Button 
                    onClick={handleGeneratePdfBulk} 
                    className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-3 shadow-lg shadow-amber-500/20 text-sm"
                    isLoading={isGenerating}
                  >
                    {isGenerating ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="animate-spin h-4 w-4" /> 
                        {bulkProgress ? `Generating (${bulkProgress.current}/${bulkProgress.total}) ${bulkProgress.name}` : 'Generating PDFs...'}
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Download className="h-4 w-4" /> Download All PDFs ({selectedStudentIds.length} Selected)
                      </span>
                    )}
                  </Button>
                )}

                <div className="text-[11px] text-center text-slate-400 font-mono">
                  PDF output file: <span className="text-emerald-400 font-bold">{getPdfFilename(formData.studentName, formData.courseCode)}</span>
                </div>

                <Button 
                  onClick={handleShareWhatsApp} 
                  variant="outline"
                  className="w-full border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 font-semibold py-2 text-xs"
                  isLoading={isSharing}
                >
                  <Send className="mr-2 h-3.5 w-3.5" /> Share Active Cover Page
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Live A4 Preview (Exact HTML layout matching kyau-pdf-builder.netlify.app) */}
        <div className="lg:col-span-7 flex justify-center">
          <div 
            className="bg-white text-black overflow-hidden shadow-2xl rounded-sm border border-slate-300"
            style={{ width: '210mm', minHeight: '296.5mm', transform: 'scale(0.85)', transformOrigin: 'top center', marginBottom: '-10%' }}
          >
            {/* The exact cover page markup exported to PDF */}
            <div 
              ref={pdfRef} 
              id="cover-page"
              className="bg-white text-black font-sans flex flex-col"
              style={{
                width: '210mm',
                height: '296.5mm',
                padding: '15mm 20mm',
                boxSizing: 'border-box',
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
              }}
            >
              {/* Header Section */}
              <div className="text-center mb-6">
                <img 
                  src="/images/logo/kyau.png" 
                  alt="Khwaja Yunus Ali University Logo" 
                  className="mx-auto mb-3 logo-img"
                  style={{ width: '110px', height: 'auto' }}
                  onError={(e) => {
                    (e.target as HTMLElement).setAttribute('src', '/images/logo/kyau-logo.svg');
                  }}
                />
                <h1 
                  className="text-3xl font-bold tracking-tight m-0"
                  style={{ color: '#2e7d32', fontSize: '30px', fontWeight: 'bold' }}
                >
                  Khwaja Yunus Ali University
                </h1>
                <div 
                  className="text-2xl font-bold italic mt-4"
                  style={{ color: '#1b4f72', fontSize: '26px', fontStyle: 'italic', fontWeight: 'bold' }}
                >
                  <span>{formData.type}</span> <span>{formData.no ? `- ${formData.no}` : ''}</span>
                </div>
              </div>

              {/* Info Section */}
              <div className="mt-5 text-lg flex-grow space-y-3.5" style={{ fontSize: '18px' }}>
                <div className="grid grid-cols-[220px_25px_1fr] items-start leading-snug">
                  <div className="font-bold">Name of the Department</div>
                  <div className="text-center font-bold">:</div>
                  <div className="font-bold text-left break-words">Computer Science and Engineering</div>
                </div>

                <div className="grid grid-cols-[220px_25px_1fr] items-start leading-snug">
                  <div className="font-bold">Course Code</div>
                  <div className="text-center font-bold">:</div>
                  <div className="font-bold text-left break-words">{formData.courseCode}</div>
                </div>

                <div className="grid grid-cols-[220px_25px_1fr] items-start leading-snug">
                  <div className="font-bold">Course Title</div>
                  <div className="text-center font-bold">:</div>
                  <div className="font-bold text-left break-words">{formData.courseTitle}</div>
                </div>

                <div className="grid grid-cols-[220px_25px_1fr] items-start leading-snug">
                  <div className="font-bold">{formData.type} No.</div>
                  <div className="text-center font-bold">:</div>
                  <div className="font-bold text-left break-words">{formData.no}</div>
                </div>

                <div className="grid grid-cols-[220px_25px_1fr] items-start leading-snug">
                  <div className="font-bold">Topic</div>
                  <div className="text-center font-bold">:</div>
                  <div className="font-bold text-left break-words">{formData.topic}</div>
                </div>

                <div className="grid grid-cols-[220px_25px_1fr] items-start leading-snug">
                  <div className="font-bold">Semester</div>
                  <div className="text-center font-bold">:</div>
                  <div className="font-bold text-left break-words">
                    {(formData.semSeason || formData.semYear) ? `${formData.semSeason} ${formData.semYear}` : ''}
                  </div>
                </div>
              </div>

              {/* Instructor Signature Line */}
              <div 
                className="my-7 mx-auto text-center font-bold"
                style={{ width: '280px', borderTop: '1px dashed #000', paddingTop: '5px', fontSize: '15px' }}
              >
                ---------------------------<br />
                Instructor Signature & Date
              </div>

              {/* Footer Table */}
              <table 
                className="w-full border-collapse mt-auto mb-5 text-left"
                style={{ tableLayout: 'fixed' }}
              >
                <thead>
                  <tr>
                    <th 
                      className="p-2.5 border border-black font-semibold"
                      style={{ backgroundColor: '#7fb3d5', fontSize: '17px' }}
                    >
                      Submitted by –
                    </th>
                    <th 
                      className="p-2.5 border border-black font-semibold"
                      style={{ backgroundColor: '#7fb3d5', fontSize: '17px' }}
                    >
                      Submitted to –
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td 
                      className="p-4 border border-black align-top leading-snug"
                      style={{ height: '160px' }}
                    >
                      <p className="my-1 text-[16px]"><span className="font-bold">Name:</span> <span className="font-extrabold text-[17px]">{formData.studentName}</span></p>
                      <p className="my-1 text-[16px]"><span className="font-bold">ID Number:</span> <span>{formData.studentId}</span></p>
                      <p className="my-1 text-[16px]"><span className="font-bold">Batch No:</span> <span>{formData.batch}</span></p>
                      <p className="my-1 text-[16px]"><span className="font-bold">Semester:</span> <span>{formData.semester}</span></p>
                      <p className="mt-2.5 mb-1 text-[16px] font-bold">Khwaja Yunus Ali University</p>
                    </td>
                    <td 
                      className="p-4 border border-black align-top leading-snug"
                      style={{ height: '160px' }}
                    >
                      <p className="my-1 text-[16px]"><span className="font-bold">Name:</span> <span className="font-extrabold text-[17px]">{formData.teacherName}</span></p>
                      <p className="my-1 text-[16px] font-bold">{formData.teacherDesignation}</p>
                      <p className="my-1 text-[16px]"><span className="font-bold">Department of {formData.teacherDept.replace(/^Department of\s+/i, '')}</span></p>
                      <p className="mt-2.5 mb-1 text-[16px] font-bold">Khwaja Yunus Ali University</p>
                    </td>
                  </tr>
                </tbody>
              </table>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
