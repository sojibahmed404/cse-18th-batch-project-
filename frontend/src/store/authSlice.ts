import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types';

export interface StudentRecord {
  studentId: string;
  name: string;
  email: string; // official edu email: <studentId>@student.kyau.edu.bd
  phone: string;
  bloodGroup: string;
  address: string;
  role: 'STUDENT' | 'CR' | 'ADMIN';
}

// CSE 18th Batch Student Roster Data (Official Edu Emails Only)
export const CSE18_STUDENTS: StudentRecord[] = [
  { studentId: '6224205101001', name: 'Md. Rakibul Islam', email: '6224205101001@student.kyau.edu.bd', phone: '01643-623400', bloodGroup: 'O+', address: 'Belkuchi', role: 'STUDENT' },
  { studentId: '6224205101002', name: 'Siam Hossain', email: '6224205101002@student.kyau.edu.bd', phone: '01717-412612', bloodGroup: 'B+', address: 'Shahjadpur', role: 'STUDENT' },
  { studentId: '6224205101003', name: 'Md. Radoun Hossin Mukta', email: '6224205101003@student.kyau.edu.bd', phone: '01797-560474', bloodGroup: 'O+', address: 'Ullapara', role: 'STUDENT' },
  { studentId: '6224205101004', name: 'Md. Shahariar Ahmed Kanon', email: '6224205101004@student.kyau.edu.bd', phone: '01845-981362', bloodGroup: 'B+', address: 'Sirajganj', role: 'STUDENT' },
  { studentId: '6224205101005', name: 'Mst. Anamika Jahan', email: '6224205101005@student.kyau.edu.bd', phone: '01738-128521', bloodGroup: 'O+', address: 'Belkuchi', role: 'STUDENT' },
  { studentId: '6224205101006', name: 'Md. Sojib Ahmed', email: '6224205101006@student.kyau.edu.bd', phone: '01754-301132', bloodGroup: 'B+', address: 'Ullapara', role: 'CR' },
  { studentId: '6224205101007', name: 'Mst. Ananna Khandaker', email: '6224205101007@student.kyau.edu.bd', phone: '01773-483358', bloodGroup: 'AB+', address: 'Sirajganj sodor', role: 'STUDENT' },
  { studentId: '6224205101008', name: 'Md. Rakib Hasan Riyad', email: '6224205101008@student.kyau.edu.bd', phone: '01554-839357', bloodGroup: 'A+', address: 'Sirajganj sodor', role: 'STUDENT' },
  { studentId: '6224205101010', name: 'Most. Khadija Khatun', email: '6224205101010@student.kyau.edu.bd', phone: '01861-111297', bloodGroup: 'O+', address: 'Belkuchi', role: 'STUDENT' },
  { studentId: '6224205101011', name: 'Md. Rezwan Ahmed Ratul', email: '6224205101011@student.kyau.edu.bd', phone: '01603-521519', bloodGroup: 'A+', address: 'Belkuchi', role: 'STUDENT' },
  { studentId: '6224205101012', name: 'Maruf Ibna Abdullah Rifat', email: '6224205101012@student.kyau.edu.bd', phone: '01870-632063', bloodGroup: 'O+', address: 'Shahjadpur', role: 'STUDENT' },
  { studentId: '6224205101013', name: 'Md. Rabbi', email: '6224205101013@student.kyau.edu.bd', phone: '01719-712269', bloodGroup: 'O+', address: 'Enayetpur', role: 'STUDENT' },
  { studentId: '6224205101014', name: 'Mst. Mushkat Jahan Shila', email: '6224205101014@student.kyau.edu.bd', phone: '01319-737676', bloodGroup: 'A+', address: 'Ullapara', role: 'STUDENT' },
  { studentId: '6224205101016', name: 'Ijaj Ahmed Rafi', email: '6224205101016@student.kyau.edu.bd', phone: '01752-909577', bloodGroup: 'O+', address: 'Sirajganj sodor', role: 'STUDENT' },
  { studentId: '6224205101017', name: 'Md. Sabbir Hossain Rahat', email: '6224205101017@student.kyau.edu.bd', phone: '01798-819616', bloodGroup: 'O+', address: 'Enayetpur', role: 'STUDENT' },
  { studentId: '6224205101018', name: 'Abid Hasan Hujaifa', email: '6224205101018@student.kyau.edu.bd', phone: '01302-451935', bloodGroup: 'A+', address: 'Enayetpur', role: 'STUDENT' },
  { studentId: '6224205101019', name: 'Sabiha Rumman Medha', email: '6224205101019@student.kyau.edu.bd', phone: '01814-932244', bloodGroup: 'A+', address: 'Sirajganj sodor', role: 'STUDENT' },
  { studentId: '6224205101020', name: 'Md. Intaj Hassan Nibir', email: '6224205101020@student.kyau.edu.bd', phone: '01721-799926', bloodGroup: 'A+', address: 'Sirajganj sodor', role: 'STUDENT' },
  { studentId: '6224205101021', name: 'Md. Asif Foysal', email: '6224205101021@student.kyau.edu.bd', phone: '01754-044354', bloodGroup: 'B+', address: 'Sirajganj sodor', role: 'STUDENT' },
  { studentId: '6224205101023', name: 'Fardin Khan Sadi', email: '6224205101023@student.kyau.edu.bd', phone: '01787-832872', bloodGroup: 'O+', address: 'Sirajganj sodor', role: 'STUDENT' },
  { studentId: '6224205101024', name: 'Abir Deb', email: '6224205101024@student.kyau.edu.bd', phone: '01916-827826', bloodGroup: 'B+', address: 'Sirajganj sodor', role: 'STUDENT' },
  { studentId: '6224205101025', name: 'Bashudeb Kumer Paul', email: '6224205101025@student.kyau.edu.bd', phone: '01716-049996', bloodGroup: 'O+', address: 'Sirajganj', role: 'STUDENT' },
  { studentId: '6224205101026', name: 'Md. Abdur Rahim Ratul', email: '6224205101026@student.kyau.edu.bd', phone: '01786-500883', bloodGroup: 'O+', address: 'Shahjadpur', role: 'STUDENT' },
  { studentId: '6224205101027', name: 'Tahsin Tasnim Tandra', email: '6224205101027@student.kyau.edu.bd', phone: '01786-698281', bloodGroup: 'A+', address: 'Sirajganj sodor', role: 'STUDENT' },
  { studentId: '6224205101028', name: 'Maream', email: '6224205101028@student.kyau.edu.bd', phone: '01580-581167', bloodGroup: 'O+', address: 'Shahjadpur', role: 'STUDENT' },
  { studentId: '6224205101029', name: 'Md. Imran Hassain', email: '6224205101029@student.kyau.edu.bd', phone: '01330-507488', bloodGroup: 'B+', address: 'Enayetpur', role: 'STUDENT' },
  { studentId: '6224205101030', name: 'Abu Sowad Mohammad Ali Siam', email: '6224205101030@student.kyau.edu.bd', phone: '01943-079868', bloodGroup: 'O+', address: 'Belkuchi', role: 'STUDENT' },
  { studentId: '6224205101031', name: 'Fatima Rahman Shoshi', email: '6224205101031@student.kyau.edu.bd', phone: '01341-901709', bloodGroup: 'O+', address: 'Tangail', role: 'STUDENT' },
  { studentId: '6224205101032', name: 'Rukaiya Rafiq Ulfa', email: '6224205101032@student.kyau.edu.bd', phone: '01345-166651', bloodGroup: 'B+', address: 'Enayetpur', role: 'STUDENT' },
  { studentId: '6224205101033', name: 'S. M. Salman Farshi', email: '6224205101033@student.kyau.edu.bd', phone: '01718-896337', bloodGroup: 'B+', address: 'Ullapara', role: 'STUDENT' },
  { studentId: '6224205101034', name: 'Tawhidur Rahman Shishir', email: '6224205101034@student.kyau.edu.bd', phone: '01819-373433', bloodGroup: 'B+', address: 'Shahjadpur', role: 'STUDENT' },
  { studentId: '6224205101035', name: 'Md. Samiul Islam Shihab', email: '6224205101035@student.kyau.edu.bd', phone: '01301-945171', bloodGroup: 'B+', address: 'Shahjadpur', role: 'STUDENT' },
  { studentId: '6224205101036', name: 'Md. Abu Raihan', email: '6224205101036@student.kyau.edu.bd', phone: '01637-426116', bloodGroup: 'O+', address: 'Sirajganj', role: 'STUDENT' },
  { studentId: '6224205101037', name: 'Md. Shimul Sarkar', email: '6224205101037@student.kyau.edu.bd', phone: '01756-351617', bloodGroup: 'O+', address: 'Sirajganj', role: 'STUDENT' },
  { studentId: '6224205101038', name: 'Khairun Nahar Sara', email: '6224205101038@student.kyau.edu.bd', phone: '01632-886305', bloodGroup: 'B+', address: 'Sirajganj sodor', role: 'STUDENT' },
  { studentId: '6224205101039', name: 'Md. Montasir Monir Alif', email: '6224205101039@student.kyau.edu.bd', phone: '01824-063908', bloodGroup: 'AB+', address: 'Belkuchi', role: 'STUDENT' },
  { studentId: '622410105101022', name: 'Tarak Rahman shakib', email: '622410105101022@student.kyau.edu.bd', phone: '01700-000000', bloodGroup: 'O+', address: '17th Batch', role: 'STUDENT' },
];

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  failedAttempts: number;
  lockedUntil: string | null; // ISO timestamp
}

const savedToken = localStorage.getItem('accessToken');
const savedUserRaw = localStorage.getItem('activeUser');
let savedUser: User | null = null;
if (savedUserRaw) {
  try { savedUser = JSON.parse(savedUserRaw); } catch { savedUser = null; }
}

const initialState: AuthState = {
  user: savedUser,
  isAuthenticated: !!(savedToken && savedUser),
  isLoading: false,
  token: savedToken,
  failedAttempts: Number(localStorage.getItem('failedAttempts') || 0),
  lockedUntil: localStorage.getItem('lockedUntil'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.failedAttempts = 0;
      state.lockedUntil = null;
      localStorage.setItem('accessToken', action.payload.token);
      localStorage.setItem('activeUser', JSON.stringify(action.payload.user));
      localStorage.removeItem('failedAttempts');
      localStorage.removeItem('lockedUntil');
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('activeUser');
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem('activeUser', JSON.stringify(state.user));
      }
    },
    recordFailedAttempt: (state) => {
      state.failedAttempts += 1;
      localStorage.setItem('failedAttempts', String(state.failedAttempts));
      if (state.failedAttempts >= 5) {
        const lockTime = new Date(Date.now() + 15 * 60 * 1000).toISOString();
        state.lockedUntil = lockTime;
        localStorage.setItem('lockedUntil', lockTime);
      }
    },
    resetFailedAttempts: (state) => {
      state.failedAttempts = 0;
      state.lockedUntil = null;
      localStorage.removeItem('failedAttempts');
      localStorage.removeItem('lockedUntil');
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setCredentials,
  logout,
  updateUser,
  recordFailedAttempt,
  resetFailedAttempts,
  setLoading,
} = authSlice.actions;

export default authSlice.reducer;
