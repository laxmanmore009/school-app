import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SchoolLevel } from '../../models/school.model';
import { SchoolService } from '../../services/school.service';

@Component({
  selector: 'app-school-list',
  standalone: true,
  imports: [RouterLink],
  template: `
    <h1>Schools</h1>

    <div class="toolbar">
      <input
        type="search"
        placeholder="Search by name or city..."
        [value]="search()"
        (input)="search.set($any($event.target).value)"
        aria-label="Search schools"
      />
      <div class="filters">
        @for (option of levels; track option) {
          <button
            type="button"
            class="chip"
            [class.active]="level() === option"
            (click)="level.set(option)"
          >
            {{ option ?? 'All' }}
          </button>
        }
      </div>
    </div>

    @if (filtered().length === 0) {
      <p class="empty">No schools match your search.</p>
    }

    <div class="card-grid">
      @for (school of filtered(); track school.id) {
        <article class="card">
          <span class="badge" [class.primary-badge]="school.level === 'Primary'"
                [class.secondary-badge]="school.level === 'Secondary'">{{ school.level }}</span>
          <h3>{{ school.name }}</h3>
          <p class="muted">{{ school.grades }} &middot; {{ school.board }}</p>
          <p>{{ school.description }}</p>
          <dl class="meta">
            <div><dt>City</dt><dd>{{ school.city }}</dd></div>
            <div><dt>Students</dt><dd>{{ school.students }}</dd></div>
            <div><dt>Teachers</dt><dd>{{ school.teacherIds.length }}</dd></div>
            <div><dt>Since</dt><dd>{{ school.establishedYear }}</dd></div>
          </dl>
          <a [routerLink]="['/schools', school.id]">View details &rarr;</a>
        </article>
      }
    </div>
  `,
})
export class SchoolListComponent {
  private readonly service = inject(SchoolService);

  protected readonly levels: (SchoolLevel | null)[] = [null, 'Primary', 'Secondary'];
  protected readonly search = signal('');
  protected readonly level = signal<SchoolLevel | null>(
    inject(ActivatedRoute).snapshot.queryParamMap.get('level') as SchoolLevel | null,
  );

  protected readonly filtered = computed(() => {
    const level = this.level();
    const term = this.search().trim().toLowerCase();
    return this.service
      .getSchools(level ?? undefined)
      .filter(
        (s) =>
          !term ||
          s.name.toLowerCase().includes(term) ||
          s.city.toLowerCase().includes(term),
      );
  });
}
