import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, Share2, ArrowLeft, BookOpen, User } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import html2pdf from 'html2pdf.js';
import { useAuth } from '../../hooks/useAuth';
import { KYAU_COURSES_LIST } from '../CoursesPage';

export default function CoverPagePage() {
  const { id } = useParams();
  const { user } = useAuth();
  const pdfRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Default to first course in KYAU list
  const defaultCourse = KYAU_COURSES_LIST[0];

  // Form State initialized with user and default course data
  const [formData, setFormData] = useState({
    type: 'Assignment',
    no: '01',
    courseCode: defaultCourse.code,
    courseTitle: defaultCourse.title,
    topic: 'Relational Algebra & Normalization',
    semSeason: 'Fall',
    semYear: '2026',
    studentName: user?.student?.firstName ? `${user.student.firstName} ${user.student.lastName}` : 'Md. Sojib Ahmed',
    studentId: user?.student?.studentId || '06224205101005',
    batch: '18th',
    semester: user?.student?.currentSemester || '3rd Year 1st Semester',
    teacherName: defaultCourse.teacher,
    teacherDesignation: defaultCourse.designation,
    teacherDept: 'Department of Computer Science & Engineering',
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
        teacherDesignation: matchedCourse.designation,
        type: matchedCourse.title.toLowerCase().includes('lab') ? 'Lab Report' : 'Assignment',
      }));
    }
  };

  const handleGeneratePdf = () => {
    if (!pdfRef.current) return;
    setIsGenerating(true);

    const element = pdfRef.current;
    const opt = {
      margin: [10, 10, 10, 10],
      filename: `${formData.type}_${formData.studentId}_${formData.courseCode.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().then(() => {
      setIsGenerating(false);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Cover Page Generator</h1>
          <p className="text-sm text-text-secondary">Generate official KYAU A4 PDF cover page for CSE 18th Batch</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Form Controls */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="bg-slate-900/80 border-slate-800 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BookOpen size={18} className="text-indigo-400" /> Select Course & Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Quick Select Course */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-200">Select CSE 18th Batch Course</label>
                <select
                  value={formData.courseCode}
                  onChange={handleCourseSelect}
                  className="flex h-11 w-full rounded-xl border border-indigo-500/40 bg-slate-950 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                >
                  {KYAU_COURSES_LIST.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code} — {c.title} ({c.teacher})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Type</label>
                  <select 
                    name="type" 
                    value={formData.type} 
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Assignment">Assignment</option>
                    <option value="Lab Report">Lab Report</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Number</label>
                  <Input name="no" value={formData.no} onChange={handleChange} className="bg-slate-950 border-slate-800 text-white" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Course Code</label>
                <Input name="courseCode" value={formData.courseCode} onChange={handleChange} className="bg-slate-950 border-slate-800 text-white" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Course Title</label>
                <Input name="courseTitle" value={formData.courseTitle} onChange={handleChange} className="bg-slate-950 border-slate-800 text-white" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Assignment / Lab Topic</label>
                <Input name="topic" value={formData.topic} onChange={handleChange} className="bg-slate-950 border-slate-800 text-white" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Semester Season</label>
                  <Input name="semSeason" value={formData.semSeason} onChange={handleChange} className="bg-slate-950 border-slate-800 text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Year</label>
                  <Input name="semYear" value={formData.semYear} onChange={handleChange} className="bg-slate-950 border-slate-800 text-white" />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-3">
                <label className="text-sm font-semibold text-slate-200 flex items-center gap-1">
                  <User size={16} className="text-indigo-400" /> Faculty / Instructor Info
                </label>
                <div className="space-y-2">
                  <Input name="teacherName" value={formData.teacherName} onChange={handleChange} placeholder="Teacher Name" className="bg-slate-950 border-slate-800 text-white" />
                  <Input name="teacherDesignation" value={formData.teacherDesignation} onChange={handleChange} placeholder="Teacher Designation" className="bg-slate-950 border-slate-800 text-white" />
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <Button 
                  onClick={handleGeneratePdf} 
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30"
                  isLoading={isGenerating}
                >
                  <Download className="mr-2 h-4 w-4" /> Download PDF Cover Page
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Live Preview */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="bg-white text-black overflow-hidden shadow-2xl rounded-sm" style={{ width: '210mm', minHeight: '297mm', transform: 'scale(0.85)', transformOrigin: 'top center', marginBottom: '-10%' }}>
            {/* The exact HTML structure that will be exported to PDF */}
            <div ref={pdfRef} className="p-12 font-serif h-full flex flex-col justify-between" style={{ backgroundColor: '#fff' }}>
              
              {/* Header Section */}
              <div className="text-center space-y-4 pt-6">
                <h1 className="text-3xl font-bold tracking-wide" style={{ color: '#006400', fontFamily: 'Times New Roman, serif' }}>
                  Khwaja Yunus Ali University
                </h1>
                
                <h2 className="text-2xl font-bold italic mt-6" style={{ color: '#000080', fontFamily: 'Times New Roman, serif', fontStyle: 'italic' }}>
                  {formData.type}
                </h2>

                {/* Table for Info */}
                <div className="flex justify-center mt-8">
                  <table className="w-[85%] text-left text-lg">
                    <tbody>
                      <tr>
                        <td className="py-2 font-semibold w-[35%]">{formData.type} No</td>
                        <td className="py-2 w-[5%]">:</td>
                        <td className="py-2">{formData.no}</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold">Course Code</td>
                        <td className="py-2">:</td>
                        <td className="py-2 font-mono font-semibold">{formData.courseCode}</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold">Course Title</td>
                        <td className="py-2">:</td>
                        <td className="py-2">{formData.courseTitle}</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold">Topic</td>
                        <td className="py-2">:</td>
                        <td className="py-2">{formData.topic}</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold">Semester</td>
                        <td className="py-2">:</td>
                        <td className="py-2">{formData.semSeason} {formData.semYear}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Footer Section */}
              <div className="mt-16 flex justify-between w-full pb-10">
                {/* Submitted By */}
                <div className="w-[48%]">
                  <h3 className="text-xl font-bold mb-4 underline">Submitted By</h3>
                  <div className="space-y-1 text-[17px]">
                    <p><span className="font-semibold">Name:</span> {formData.studentName}</p>
                    <p><span className="font-semibold">Student ID:</span> {formData.studentId}</p>
                    <p><span className="font-semibold">Batch:</span> {formData.batch}</p>
                    <p><span className="font-semibold">Semester:</span> {formData.semester}</p>
                    <p className="font-semibold mt-2 pt-2">Department of Computer Science & Engineering</p>
                    <p className="font-semibold">Khwaja Yunus Ali University</p>
                  </div>
                </div>

                {/* Submitted To */}
                <div className="w-[48%]">
                  <h3 className="text-xl font-bold mb-4 underline">Submitted To</h3>
                  <div className="space-y-1 text-[17px]">
                    <p className="font-semibold text-lg">{formData.teacherName}</p>
                    <p>{formData.teacherDesignation}</p>
                    <p>{formData.teacherDept}</p>
                    <p className="font-semibold">Khwaja Yunus Ali University</p>
                    
                    <div className="mt-16 border-t border-black w-48 inline-block pt-1 text-center">
                      <p>Signature</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
