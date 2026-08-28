import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SchoolService } from '../../services/school.service';

@Component({
  selector: 'app-teacher-detail',
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (teacher(); as t) {
      <a routerLink="/teachers" class="back">&larr; Back to teachers</a>

      <header class="detail-header teacher-header">
        <div class="avatar large">{{ t.photoInitials }}</div>
        <div>
          <h1>{{ t.name }}</h1>
          <p class="muted">{{ t.subject }} teacher</p>
        </div>
      </header>

      <div class="panel-grid">
        <section class="panel">
          <h2>Professional</h2>
          <dl class="meta stacked">
            <div><dt>Qualification</dt><dd>{{ t.qualification }}</dd></div>
            <div><dt>Experience</dt><dd>{{ t.experienceYears }} years</dd></div>
            <div><dt>Class teacher of</dt><dd>{{ t.classTeacherOf ?? 'Not assigned' }}</dd></div>
          </dl>
        </section>

        <section class="panel">
          <h2>Contact</h2>
          <dl class="meta stacked">
            <div><dt>Email</dt><dd>{{ t.email }}</dd></div>
            <div><dt>Phone</dt><dd>{{ t.phone }}</dd></div>
          </dl>
        </section>
      </div>

      @if (school(); as s) {
        <section class="panel">
          <h2>School</h2>
          <p>
            <strong>{{ s.name }}</strong> &middot; {{ s.level }} &middot; {{ s.grades }}
          </p>
          <p class="muted">{{ s.address }}, {{ s.city }}</p>
          <a [routerLink]="['/schools', s.id]">School details &rarr;</a>
        </section>
      }
    } @else {
      <p class="empty">Teacher not found. <a routerLink="/teachers">Back to list</a></p>
    }
  `,
})
export class TeacherDetailComponent {
  private readonly service = inject(SchoolService);

  readonly id = input.required<string>();

  protected readonly teacher = computed(() => this.service.getTeacherById(Number(this.id())));
  protected readonly school = computed(() => {
    const schoolId = this.teacher()?.schoolId;
    return schoolId ? this.service.getSchoolById(schoolId) : undefined;
  });
}
