import { Injectable } from '@angular/core';
import {
  School,
  SchoolLevel,
  StudentRegistration,
  StudentRegistrationRequest,
  Teacher,
} from '../models/school.model';

@Injectable({ providedIn: 'root' })
export class SchoolService {
  private readonly schools: School[] = [
    {
      id: 1,
      name: 'आश्रम शाळा शैक्षणिक संकुल, खामगांव',
      level: 'Primary',
      board: 'State Board',
      grades: 'Grade 1 - Grade 5',
      address: '12 Maple Street',
      city: 'Springfield',
      phone: '+1 555 0100',
      email: 'office@greenwood-primary.edu',
      establishedYear: 1994,
      students: 480,
      teacherIds: [1, 2, 3],
      facilities: ['Playground', 'Library', 'Activity Room', 'Health Room'],
      description:
        'A foundation school focused on activity based learning, literacy and numeracy for young learners.',
    },
    {
      id: 2,
      name: 'Riverside Primary School',
      level: 'Primary',
      board: 'CBSE',
      grades: 'Grade 1 - Grade 5',
      address: '8 River Lane',
      city: 'Riverton',
      phone: '+1 555 0122',
      email: 'contact@riverside-primary.edu',
      establishedYear: 2005,
      students: 360,
      teacherIds: [4, 5],
      facilities: ['Smart Classrooms', 'Music Room', 'Sports Ground'],
      description:
        'Small class sizes with a strong emphasis on creativity, storytelling and outdoor learning.',
    },
    {
      id: 3,
      name: 'St. Andrews Secondary School',
      level: 'Secondary',
      board: 'CBSE',
      grades: 'Grade 6 - Grade 10',
      address: '45 Hill Road',
      city: 'Springfield',
      phone: '+1 555 0155',
      email: 'admin@standrews-sec.edu',
      establishedYear: 1978,
      students: 920,
      teacherIds: [6, 7, 8],
      facilities: ['Science Labs', 'Computer Lab', 'Auditorium', 'Basketball Court'],
      description:
        'A well established secondary school with strong science, mathematics and competitive exam preparation.',
    },
    {
      id: 4,
      name: 'Lakeview Higher Secondary School',
      level: 'Secondary',
      board: 'ICSE',
      grades: 'Grade 6 - Grade 12',
      address: '90 Lakeview Avenue',
      city: 'Lakeside',
      phone: '+1 555 0177',
      email: 'info@lakeview-hss.edu',
      establishedYear: 1988,
      students: 1250,
      teacherIds: [9, 10],
      facilities: ['Robotics Lab', 'Language Lab', 'Hostel', 'Swimming Pool'],
      description:
        'Offers Science, Commerce and Humanities streams in senior grades with career counselling support.',
    },
  ];

  private readonly studentRegistrations: StudentRegistration[] = [];

  private readonly teachers: Teacher[] = [
    {
      id: 1,
      name: 'Anita Sharma',
      photoInitials: 'AS',
      subject: 'English',
      qualification: 'M.A., B.Ed.',
      experienceYears: 14,
      email: 'anita.sharma@greenwood-primary.edu',
      phone: '+1 555 0201',
      schoolId: 1,
      classTeacherOf: 'Grade 3-A',
    },
    {
      id: 2,
      name: 'Rahul Menon',
      photoInitials: 'RM',
      subject: 'Mathematics',
      qualification: 'B.Sc., B.Ed.',
      experienceYears: 9,
      email: 'rahul.menon@greenwood-primary.edu',
      phone: '+1 555 0202',
      schoolId: 1,
      classTeacherOf: 'Grade 5-B',
    },
    {
      id: 3,
      name: 'Grace Fernandes',
      photoInitials: 'GF',
      subject: 'Environmental Studies',
      qualification: 'B.Sc., D.El.Ed.',
      experienceYears: 6,
      email: 'grace.fernandes@greenwood-primary.edu',
      phone: '+1 555 0203',
      schoolId: 1,
    },
    {
      id: 4,
      name: 'Priya Nair',
      photoInitials: 'PN',
      subject: 'Hindi',
      qualification: 'M.A., B.Ed.',
      experienceYears: 11,
      email: 'priya.nair@riverside-primary.edu',
      phone: '+1 555 0204',
      schoolId: 2,
      classTeacherOf: 'Grade 2-A',
    },
    {
      id: 5,
      name: 'Daniel Cruz',
      photoInitials: 'DC',
      subject: 'Music & Arts',
      qualification: 'B.F.A.',
      experienceYears: 7,
      email: 'daniel.cruz@riverside-primary.edu',
      phone: '+1 555 0205',
      schoolId: 2,
    },
    {
      id: 6,
      name: 'Meera Iyer',
      photoInitials: 'MI',
      subject: 'Physics',
      qualification: 'M.Sc., B.Ed.',
      experienceYears: 16,
      email: 'meera.iyer@standrews-sec.edu',
      phone: '+1 555 0206',
      schoolId: 3,
      classTeacherOf: 'Grade 10-A',
    },
    {
      id: 7,
      name: 'Joseph Thomas',
      photoInitials: 'JT',
      subject: 'Mathematics',
      qualification: 'M.Sc., M.Ed.',
      experienceYears: 21,
      email: 'joseph.thomas@standrews-sec.edu',
      phone: '+1 555 0207',
      schoolId: 3,
    },
    {
      id: 8,
      name: 'Kavya Reddy',
      photoInitials: 'KR',
      subject: 'Computer Science',
      qualification: 'M.C.A.',
      experienceYears: 8,
      email: 'kavya.reddy@standrews-sec.edu',
      phone: '+1 555 0208',
      schoolId: 3,
      classTeacherOf: 'Grade 8-C',
    },
    {
      id: 9,
      name: 'Arun Desai',
      photoInitials: 'AD',
      subject: 'Chemistry',
      qualification: 'M.Sc., Ph.D.',
      experienceYears: 18,
      email: 'arun.desai@lakeview-hss.edu',
      phone: '+1 555 0209',
      schoolId: 4,
      classTeacherOf: 'Grade 12-Science',
    },
    {
      id: 10,
      name: 'Sofia Almeida',
      photoInitials: 'SA',
      subject: 'Economics',
      qualification: 'M.A., B.Ed.',
      experienceYears: 12,
      email: 'sofia.almeida@lakeview-hss.edu',
      phone: '+1 555 0210',
      schoolId: 4,
    },
  ];

  getSchools(level?: SchoolLevel): School[] {
    return level ? this.schools.filter((s) => s.level === level) : [...this.schools];
  }

  getSchoolById(id: number): School | undefined {
    return this.schools.find((s) => s.id === id);
  }

  getTeachers(): Teacher[] {
    return [...this.teachers];
  }

  getTeacherById(id: number): Teacher | undefined {
    return this.teachers.find((t) => t.id === id);
  }

  getTeachersBySchool(schoolId: number): Teacher[] {
    return this.teachers.filter((t) => t.schoolId === schoolId);
  }

  getSubjects(): string[] {
    return [...new Set(this.teachers.map((t) => t.subject))].sort();
  }

  registerStudent(request: StudentRegistrationRequest): StudentRegistration {
    const registration: StudentRegistration = {
      ...request,
      id: this.studentRegistrations.length + 1,
      submittedAt: new Date().toISOString(),
    };

    this.studentRegistrations.push(registration);
    return registration;
  }

  getStudentRegistrations(): StudentRegistration[] {
    return [...this.studentRegistrations];
  }

  getStats() {
    return {
      schools: this.schools.length,
      primary: this.schools.filter((s) => s.level === 'Primary').length,
      secondary: this.schools.filter((s) => s.level === 'Secondary').length,
      teachers: this.teachers.length,
      students: this.schools.reduce((sum, s) => sum + s.students, 0),
    };
  }
}
