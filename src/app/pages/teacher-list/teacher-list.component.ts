import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SchoolService } from '../../services/school.service';

@Component({
  selector: 'app-teacher-list',
  standalone: true,
  imports: [RouterLink],
  template: `
    <h1>Teachers</h1>

    <div class="toolbar">
      <input
        type="search"
        placeholder="Search by name..."
        [value]="search()"
        (input)="search.set($any($event.target).value)"
        aria-label="Search teachers"
      />
      <select [value]="subject()" (change)="subject.set($any($event.target).value)" aria-label="Filter by subject">
        <option value="">All subjects</option>
        @for (s of subjects; track s) {
          <option [value]="s">{{ s }}</option>
        }
      </select>
    </div>

    @if (filtered().length === 0) {
      <p class="empty">No teachers match your search.</p>
    }

    <div class="card-grid">
      @for (teacher of filtered(); track teacher.id) {
        <article class="card teacher-card">
          <div class="avatar">{{ teacher.photoInitials }}</div>
          <h3>{{ teacher.name }}</h3>
          <p class="muted">{{ teacher.subject }}</p>
          <dl class="meta">
            <div><dt>Qualification</dt><dd>{{ teacher.qualification }}</dd></div>
            <div><dt>Experience</dt><dd>{{ teacher.experienceYears }} yrs</dd></div>
            <div><dt>School</dt><dd>{{ schoolName(teacher.schoolId) }}</dd></div>
            @if (teacher.classTeacherOf) {
              <div><dt>Class teacher</dt><dd>{{ teacher.classTeacherOf }}</dd></div>
            }
          </dl>
          <a [routerLink]="['/teachers', teacher.id]">Profile &rarr;</a>
        </article>
      }
    </div>
  `,
})
export class TeacherListComponent {
  private readonly service = inject(SchoolService);

  protected readonly subjects = this.service.getSubjects();
  protected readonly search = signal('');
  protected readonly subject = signal('');

  protected readonly filtered = computed(() => {
    const term = this.search().trim().toLowerCase();
    const subject = this.subject();
    return this.service
      .getTeachers()
      .filter((t) => !subject || t.subject === subject)
      .filter((t) => !term || t.name.toLowerCase().includes(term));
  });

  protected schoolName(schoolId: number): string {
    return this.service.getSchoolById(schoolId)?.name ?? 'Unknown';
  }
}
