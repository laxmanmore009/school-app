import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SchoolService } from '../../services/school.service';

@Component({
  selector: 'app-school-detail',
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (school(); as s) {
      <a routerLink="/schools" class="back">&larr; Back to schools</a>

      <header class="detail-header">
        <span class="badge" [class.primary-badge]="s.level === 'Primary'"
              [class.secondary-badge]="s.level === 'Secondary'">{{ s.level }}</span>
        <h1>{{ s.name }}</h1>
        <p class="muted">{{ s.grades }} &middot; {{ s.board }} &middot; Established {{ s.establishedYear }}</p>
        <p>{{ s.description }}</p>
      </header>

      <div class="panel-grid">
        <section class="panel">
          <h2>Contact</h2>
          <dl class="meta stacked">
            <div><dt>Address</dt><dd>{{ s.address }}, {{ s.city }}</dd></div>
            <div><dt>Phone</dt><dd>{{ s.phone }}</dd></div>
            <div><dt>Email</dt><dd>{{ s.email }}</dd></div>
            <div><dt>Students</dt><dd>{{ s.students }}</dd></div>
          </dl>
        </section>

        <section class="panel">
          <h2>Facilities</h2>
          <ul class="tag-list">
            @for (facility of s.facilities; track facility) {
              <li class="tag">{{ facility }}</li>
            }
          </ul>
        </section>
      </div>

      <section>
        <h2>Teachers ({{ teachers().length }})</h2>
        <div class="card-grid">
          @for (teacher of teachers(); track teacher.id) {
            <article class="card teacher-card">
              <div class="avatar">{{ teacher.photoInitials }}</div>
              <h3>{{ teacher.name }}</h3>
              <p class="muted">{{ teacher.subject }}</p>
              <p>{{ teacher.qualification }} &middot; {{ teacher.experienceYears }} yrs experience</p>
              <a [routerLink]="['/teachers', teacher.id]">Profile &rarr;</a>
            </article>
          }
        </div>
      </section>
    } @else {
      <p class="empty">School not found. <a routerLink="/schools">Back to list</a></p>
    }
  `,
})
export class SchoolDetailComponent {
  private readonly service = inject(SchoolService);

  readonly id = input.required<string>();

  protected readonly school = computed(() => this.service.getSchoolById(Number(this.id())));
  protected readonly teachers = computed(() =>
    this.service.getTeachersBySchool(Number(this.id())),
  );
}
