import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { StudentRegistration } from '../../models/school.model';
import { SchoolService } from '../../services/school.service';

@Component({
  selector: 'app-student-registration',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <section class="registration-hero">
      <div>
        <p class="eyebrow">Student admissions</p>
        <h1>Register a student for the new academic year.</h1>
        <p>
          Share student, guardian and school preference details with our admissions team. We will
          review your enquiry and contact the guardian with next steps.
        </p>
      </div>
      <div class="registration-callout">
        <span>Need help?</span>
        <strong>Call 9503485361</strong>
        <p>Monday to Friday, 9:00 AM - 5:00 PM</p>
      </div>
    </section>

    @if (submitted()) {
      <section class="success-panel" aria-live="polite">
        <div>
          <p class="section-kicker">Registration received</p>
          <h2>Thank you, {{ submitted()!.studentName }}.</h2>
          <p class="confirmation-number">Application #{{ submitted()!.id }}</p>
          <p>
            Your enquiry for {{ schoolName(submitted()!.schoolId) }} has been recorded. Our team
            will contact {{ submitted()!.guardianName }} at {{ submitted()!.guardianPhone }}.
          </p>
        </div>
        <button type="button" class="secondary-button" (click)="startNewRegistration()">
          Register another student
        </button>
      </section>
    }

    <form class="registration-form" [formGroup]="registrationForm" (ngSubmit)="submit()" novalidate>
      <section class="form-panel">
        <div class="form-section-heading">
          <p class="section-kicker">Student details</p>
          <h2>About the learner</h2>
        </div>

        <div class="form-grid">
          <label>
            Full name
            <input type="text" formControlName="studentName" placeholder="Enter student's full name" />
            @if (showError('studentName')) {
              <span class="field-error">Student name is required.</span>
            }
          </label>

          <label>
            Date of birth
            <input type="date" formControlName="dateOfBirth" />
            @if (showError('dateOfBirth')) {
              <span class="field-error">Date of birth is required.</span>
            }
          </label>

          <label>
            Applying for grade
            <select formControlName="grade">
              <option value="">Select grade</option>
              @for (grade of grades; track grade) {
                <option [value]="grade">{{ grade }}</option>
              }
            </select>
            @if (showError('grade')) {
              <span class="field-error">Please select a grade.</span>
            }
          </label>

          <label>
            Preferred school
            <select formControlName="schoolId">
              <option value="">Select school</option>
              @for (school of schools(); track school.id) {
                <option [value]="school.id">{{ school.name }}</option>
              }
            </select>
            @if (showError('schoolId')) {
              <span class="field-error">Please select a school.</span>
            }
          </label>
        </div>
      </section>

      <section class="form-panel">
        <div class="form-section-heading">
          <p class="section-kicker">Guardian details</p>
          <h2>Primary contact</h2>
        </div>

        <div class="form-grid">
          <label>
            Guardian name
            <input type="text" formControlName="guardianName" placeholder="Parent or guardian name" />
            @if (showError('guardianName')) {
              <span class="field-error">Guardian name is required.</span>
            }
          </label>

          <label>
            Phone number
            <input type="tel" formControlName="guardianPhone" placeholder="10 digit mobile number" />
            @if (showError('guardianPhone')) {
              <span class="field-error">Enter a valid 10 digit phone number.</span>
            }
          </label>

          <label>
            Email address
            <input type="email" formControlName="guardianEmail" placeholder="guardian@example.com" />
            @if (showError('guardianEmail')) {
              <span class="field-error">Enter a valid email address.</span>
            }
          </label>

          <label>
            Address
            <textarea formControlName="address" rows="4" placeholder="Current residential address"></textarea>
            @if (showError('address')) {
              <span class="field-error">Address is required.</span>
            }
          </label>
        </div>
      </section>

      <section class="form-panel">
        <div class="form-section-heading">
          <p class="section-kicker">Additional information</p>
          <h2>Help us prepare</h2>
        </div>

        <label>
          Notes for admissions team
          <textarea
            formControlName="notes"
            rows="5"
            placeholder="Previous school, transport needs, hostel enquiry or other details"
          ></textarea>
        </label>

        <div class="form-actions">
          <button type="submit" class="primary-button">Submit registration</button>
          <a routerLink="/schools" class="text-link">Explore schools first <span aria-hidden="true">↗</span></a>
        </div>
      </section>
    </form>
  `,
})
export class StudentRegistrationComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly schoolService = inject(SchoolService);

  protected readonly grades = Array.from({ length: 12 }, (_, index) => `Grade ${index + 1}`);
  protected readonly schools = computed(() => this.schoolService.getSchools());
  protected readonly submitted = signal<StudentRegistration | null>(null);

  protected readonly registrationForm = this.formBuilder.nonNullable.group({
    studentName: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    grade: ['', Validators.required],
    schoolId: ['', Validators.required],
    guardianName: ['', Validators.required],
    guardianPhone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    guardianEmail: ['', [Validators.required, Validators.email]],
    address: ['', Validators.required],
    notes: [''],
  });

  protected submit(): void {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    const value = this.registrationForm.getRawValue();
    this.submitted.set(
      this.schoolService.registerStudent({
        ...value,
        schoolId: Number(value.schoolId),
        notes: value.notes.trim() || undefined,
      }),
    );
    this.registrationForm.reset();
  }

  protected startNewRegistration(): void {
    this.submitted.set(null);
  }

  protected showError(controlName: keyof typeof this.registrationForm.controls): boolean {
    const control = this.registrationForm.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  protected schoolName(schoolId: number): string {
    return this.schoolService.getSchoolById(schoolId)?.name ?? 'your selected school';
  }
}
