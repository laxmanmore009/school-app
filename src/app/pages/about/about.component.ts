import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <section class="about-hero">
      <div>
        <p class="eyebrow">About our school</p>
        <h1>Learning with purpose. Growing with confidence.</h1>
        <p>
          आश्रम शाळा शैक्षणिक संकुल, खामगांव brings together a strong academic foundation,
          caring mentorship and a community where every child can discover their potential.
        </p>
      </div>
      <img
        src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85"
        alt="Students walking together across a school campus"
      />
    </section>

    <section class="about-section about-split">
      <div class="section-kicker">Who we are</div>
      <div>
        <h2>A school community built around the whole child.</h2>
        <p>
          We believe education is more than a classroom outcome. It is the confidence to ask
          questions, the discipline to keep learning and the empathy to contribute to the world
          around us.
        </p>
        <p>
          Our teachers create a supportive environment where foundational skills, creativity,
          physical wellbeing and character grow together.
        </p>
      </div>
    </section>

    <section class="about-section vision-grid">
      <article>
        <div class="section-kicker">Our vision</div>
        <h2>To help every learner see a bigger horizon.</h2>
        <p>
          We prepare students with knowledge, curiosity and a global perspective, while staying
          rooted in the values of community life.
        </p>
      </article>
      <article>
        <div class="section-kicker">Our mission</div>
        <h2>Strong foundations for meaningful futures.</h2>
        <p>
          Through dynamic teaching and a balanced curriculum, we develop problem-solving skills,
          positive attitudes, ethics and the courage to do what is right.
        </p>
      </article>
    </section>

    <section class="about-section journey-section">
      <div>
        <div class="section-kicker">Our journey</div>
        <h2>Growing alongside our learners.</h2>
      </div>
      <div class="journey-list">
        <div><strong>01</strong><span>Learn</span><p>Build strong foundations through engaging, active classrooms.</p></div>
        <div><strong>02</strong><span>Discover</span><p>Explore interests, talents and new ways of thinking.</p></div>
        <div><strong>03</strong><span>Lead</span><p>Use knowledge and character to make a positive difference.</p></div>
      </div>
    </section>

    <section class="location-section about-location">
      <div>
        <div class="section-kicker">Come and meet us</div>
        <h2>आश्रम शाळा शैक्षणिक संकुल, खामगांव</h2>
        <p>Find our campus and plan your visit.</p>
      </div>
      <a class="map-link" href="https://maps.app.goo.gl/yrJCMwxjvhnbAxsu6" target="_blank" rel="noopener noreferrer">
        <span class="map-pin" aria-hidden="true">⌖</span>
        <span>Open in Google Maps</span>
        <span aria-hidden="true">↗</span>
      </a>
    </section>
  `,
})
export class AboutComponent {}
