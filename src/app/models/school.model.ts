export type SchoolLevel = 'Primary' | 'Secondary';

export interface School {
  id: number;
  name: string;
  level: SchoolLevel;
  board: string;
  grades: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  establishedYear: number;
  students: number;
  teacherIds: number[];
  facilities: string[];
  description: string;
}

export interface Teacher {
  id: number;
  name: string;
  photoInitials: string;
  subject: string;
  qualification: string;
  experienceYears: number;
  email: string;
  phone: string;
  schoolId: number;
  classTeacherOf?: string;
}
