import React, { useState, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, Share2, ArrowLeft, BookOpen, User, Send, Users, CheckSquare, Square } from 'lucide-react';
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
  
  // State to toggle generating for others vs self
  const [generateForBatchmates, setGenerateForBatchmates] = useState(false);
  const [selectedBatchmateId, setSelectedBatchmateId] = useState('');

  const queryCourseCode = searchParams.get('courseCode');
  const queryTopic = searchParams.get('topic');

  // Match course from URL query or default to first course
  const matchedInitialCourse = KYAU_COURSES_LIST.find(c => c.code === queryCourseCode) || KYAU_COURSES_LIST[0];

  const defaultStudentName = user?.student?.firstName ? `${user.student.firstName} ${user.student.lastName}` : 'Md. Sojib Ahmed';
  const defaultStudentId = user?.student?.studentId || '6224205101006';

  // Form State matching KYAU PDF Builder
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

  const handleToggleBatchmates = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setGenerateForBatchmates(checked);
    if (!checked) {
      // Revert to self
      setSelectedBatchmateId('');
      setFormData(prev => ({
        ...prev,
        studentName: defaultStudentName,
        studentId: defaultStudentId,
      }));
    }
  };

  const handleSelectBatchmate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sId = e.target.value;
    setSelectedBatchmateId(sId);
    const found = CSE_18TH_BATCH_STUDENTS.find(s => s.studentId === sId);
    if (found) {
      setFormData(prev => ({
        ...prev,
        studentName: found.name,
        studentId: found.studentId,
      }));
    }
  };

  // PDF Filename dynamically including Student Name as requested
  const getPdfFilename = () => {
    const cleanName = formData.studentName.replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_');
    const cleanCourse = formData.courseCode.replace(/[^a-zA-Z0-9]/g, '_');
    return `${cleanName}_${cleanCourse}_CoverPage.pdf`;
  };

  const handleGeneratePdf = () => {
    if (!pdfRef.current) return;
    setIsGenerating(true);

    const element = pdfRef.current;
    const filename = getPdfFilename();
    const opt = {
      margin: 0,
      filename: filename,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 3, useCORS: true, scrollY: 0, letterRendering: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().then(() => {
      setIsGenerating(false);
      toast.success(`PDF downloaded as: ${filename}`);
    }).catch((err: any) => {
      console.error(err);
      setIsGenerating(false);
      toast.error('Failed to generate PDF');
    });
  };

  const handleShareWhatsApp = async () => {
    if (!pdfRef.current) return;
    setIsSharing(true);

    const element = pdfRef.current;
    const filename = getPdfFilename();
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
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Official Format</span>
            </h1>
            <p className="text-sm text-slate-400">Generate official Khwaja Yunus Ali University A4 PDF cover pages</p>
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
              
              {/* Batchmates Cover Page Checkbox Option */}
              <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 space-y-2">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-indigo-300">
                  <input
                    type="checkbox"
                    checked={generateForBatchmates}
                    onChange={handleToggleBatchmates}
                    className="rounded border-slate-800 bg-slate-950 text-indigo-500 focus:ring-indigo-500 h-4 w-4"
                  />
                  <span className="flex items-center gap-1.5">
                    <Users size={15} className="text-indigo-400" /> Generate cover page for another batchmate
                  </span>
                </label>

                {generateForBatchmates && (
                  <div className="pt-2 space-y-1.5 animate-in fade-in duration-200">
                    <label className="text-[11px] font-semibold text-slate-300">Select CSE 18th Batchmate Name</label>
                    <select
                      value={selectedBatchmateId}
                      onChange={handleSelectBatchmate}
                      className="flex h-10 w-full rounded-lg border border-indigo-500/60 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                    >
                      <option value="">Choose a student from 18th Batch...</option>
                      {CSE_18TH_BATCH_STUDENTS.map((s) => (
                        <option key={s.studentId} value={s.studentId}>
                          {s.name} ({s.studentId})
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Quick Select CSE 18th Batch Course */}
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
                  <User size={14} /> Submitted By
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

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">Batch No</label>
                    <select
                      name="batch"
                      value={formData.batch}
                      onChange={handleChange}
                      className="flex h-9 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      {Array.from({ length: 16 }, (_, i) => i + 10).map(batchNum => (
                        <option key={batchNum} value={`${batchNum}th`}>{batchNum}th</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">Current Semester</label>
                    <select
                      name="semester"
                      value={formData.semester}
                      onChange={handleChange}
                      className="flex h-9 w-full rounded-lg border border-slate-800 bg-slate-950 px-2 py-1.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="1st Year 1st Semester">1st Year 1st Semester</option>
                      <option value="1st Year 2nd Semester">1st Year 2nd Semester</option>
                      <option value="2nd Year 1st Semester">2nd Year 1st Semester</option>
                      <option value="2nd Year 2nd Semester">2nd Year 2nd Semester</option>
                      <option value="3rd Year 1st Semester">3rd Year 1st Semester</option>
                      <option value="3rd Year 2nd Semester">3rd Year 2nd Semester</option>
                      <option value="4th Year 1st Semester">4th Year 1st Semester</option>
                      <option value="4th Year 2nd Semester">4th Year 2nd Semester</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submitted To Section */}
              <div className="pt-3 border-t border-slate-800 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1">
                  <User size={14} /> Submitted To
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
                <Button 
                  onClick={handleGeneratePdf} 
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 shadow-lg shadow-emerald-600/30 text-sm"
                  isLoading={isGenerating}
                >
                  <Download className="mr-2 h-4 w-4" /> Download PDF Cover Page
                </Button>
                <div className="text-[11px] text-center text-slate-400 font-mono">
                  PDF output file: <span className="text-emerald-400 font-bold">{getPdfFilename()}</span>
                </div>
                <Button 
                  onClick={handleShareWhatsApp} 
                  variant="outline"
                  className="w-full border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 font-semibold py-2 text-xs"
                  isLoading={isSharing}
                >
                  <Send className="mr-2 h-3.5 w-3.5" /> Share Cover Page
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
