import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SchoolService } from '../../services/school.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="hero">
      <div class="hero-content">
        <p class="eyebrow">आश्रम शाळा शैक्षणिक संकुल, खामगांव</p>
        <h1>Where every child finds their way forward.</h1>
        <p>
          Discover welcoming schools, thoughtful programmes and the teachers who make learning
          matter every day.
        </p>
        <div class="hero-actions">
          <a routerLink="/schools" class="btn primary">Find a school <span aria-hidden="true">↗</span></a>
          <a routerLink="/teachers" class="btn">Meet our teachers</a>
        </div>
      </div>
      <img
        class="hero-image"
        src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=85"
        alt="Children learning together in a village school classroom"
      />
    </section>

    <section class="intro-section">
      <div class="section-kicker">Who we are</div>
      <div class="intro-copy">
        <h2>Building confident learners for a changing world.</h2>
        <p>
          Our schools bring together strong foundations, curious minds and a caring community.
          Explore the people and places shaping the next generation.
        </p>
      </div>
    </section>

    <section class="stat-grid" aria-label="Portal statistics">
      <div class="stat"><span class="stat-value">{{ stats.schools }}</span><span class="stat-label">Schools</span></div>
      <div class="stat"><span class="stat-value">{{ stats.primary }}</span><span class="stat-label">Primary</span></div>
      <div class="stat"><span class="stat-value">{{ stats.secondary }}</span><span class="stat-label">Secondary</span></div>
      <div class="stat"><span class="stat-value">{{ stats.teachers }}</span><span class="stat-label">Teachers</span></div>
      <div class="stat"><span class="stat-value">{{ stats.students }}</span><span class="stat-label">Students</span></div>
    </section>

    <section>
      <div class="section-heading-row">
        <div>
          <div class="section-kicker">Find your fit</div>
          <h2>Education levels</h2>
        </div>
        <a routerLink="/schools" class="text-link">View all schools <span aria-hidden="true">↗</span></a>
      </div>
      <div class="card-grid">
        <article class="card">
          <img
            class="level-image"
            src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=85"
            alt="Young primary school students learning together"
          />
          <span class="badge primary-badge">Primary</span>
          <h3>Grades 1 - 5</h3>
          <p>
            Foundational literacy and numeracy, environmental studies, arts and activity based
            classroom learning.
          </p>
          <a routerLink="/schools" [queryParams]="{ level: 'Primary' }">Primary schools &rarr;</a>
        </article>
        <article class="card">
          <img
            class="level-image"
            src="https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=800&q=85"
            alt="Students collaborating in a secondary school classroom"
          />
          <span class="badge secondary-badge">Secondary</span>
          <h3>Grades 6 - 12</h3>
          <p>
            Subject specialisation across sciences, mathematics, languages and commerce with board
            exam preparation.
          </p>
          <a routerLink="/schools" [queryParams]="{ level: 'Secondary' }">Secondary schools &rarr;</a>
        </article>
      </div>
    </section>

    <section class="location-section">
      <div>
        <div class="section-kicker">Visit our campus</div>
        <h2>आश्रम शाळा शैक्षणिक संकुल, खामगांव</h2>
        <p>Find our school and plan your visit using Google Maps.</p>
      </div>
      <a
        class="map-link"
        href="https://maps.app.goo.gl/yrJCMwxjvhnbAxsu6"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="map-pin" aria-hidden="true">⌖</span>
        <span>Open location in Google Maps</span>
        <span aria-hidden="true">↗</span>
      </a>
    </section>
  `,
})
export class HomeComponent {
  protected readonly stats = inject(SchoolService).getStats();
}
