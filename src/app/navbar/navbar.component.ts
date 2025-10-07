import { HttpClientModule } from '@angular/common/http';
import { Component, AfterViewInit, OnDestroy, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [HttpClientModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']  // <-- corrected to styleUrls (array)
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  private listeners: Array<() => void> = [];

  constructor(
    private router: Router,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  logout() {
    // Clear session/local storage
    localStorage.clear();
    sessionStorage.clear();

    // Optionally show a message
    alert('Logged out successfully.');

    // Redirect to login page
    this.router.navigate(['/login']);
  }

  ngAfterViewInit(): void {
    // attach click listeners to your dropdown toggles (works with <p class="nav-link dropdown-toggle">)
    const toggles = Array.from(
      this.document.querySelectorAll<HTMLElement>('.nav-item.dropdown > .nav-link.dropdown-toggle')
    );

    toggles.forEach(toggle => {
      const unlisten = this.renderer.listen(toggle, 'click', (ev: Event) => {
        ev.preventDefault();
        ev.stopPropagation();
        this.toggleDropdown(toggle);
      });
      this.listeners.push(unlisten);
    });

    // close when clicking outside any dropdown
    const docClickUnlisten = this.renderer.listen('document', 'click', (ev: Event) => {
      const target = ev.target as HTMLElement;
      if (!target || !target.closest('.nav-item.dropdown')) {
        this.closeAllDropdowns();
      }
    });
    this.listeners.push(docClickUnlisten);

    // close on Escape key
    const keydownUnlisten = this.renderer.listen('document', 'keydown', (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
        this.closeAllDropdowns();
      }
    });
    this.listeners.push(keydownUnlisten);

    // auto-close when clicking inside a dropdown menu item, and collapse navbar on mobile
    const items = Array.from(
      this.document.querySelectorAll<HTMLElement>('.dropdown-menu .dropdown-item')
    );
    items.forEach(item => {
      const un = this.renderer.listen(item, 'click', () => {
        const parent = item.closest('.nav-item.dropdown') as HTMLElement | null;
        if (parent) {
          parent.classList.remove('show');
          const m = parent.querySelector('.dropdown-menu');
          m?.classList.remove('show');
          const t = parent.querySelector('.dropdown-toggle');
          t?.setAttribute('aria-expanded', 'false');
        }

        // if navbar is expanded (mobile), collapse it
        const navCollapse = this.document.getElementById('navbarNavDropdown');
        const navToggler = this.document.querySelector('.navbar-toggler');
        if (navCollapse && navCollapse.classList.contains('show')) {
          navCollapse.classList.remove('show');
          if (navToggler) {
            navToggler.classList.add('collapsed');
            (navToggler as HTMLElement).setAttribute('aria-expanded', 'false');
          }
        }
      });
      this.listeners.push(un);
    });

    // Keep dropdowns closed if the collapse is programmatically closed later
    const navCollapse = this.document.getElementById('navbarNavDropdown');
    if (navCollapse) {
      const obs = new MutationObserver((mutations) => {
        // if collapse lost the 'show' class, close dropdowns inside
        if (!navCollapse.classList.contains('show')) {
          this.closeAllDropdowns();
        }
      });
      obs.observe(navCollapse, { attributes: true, attributeFilter: ['class'] });

      // store a cleanup for observer
      this.listeners.push(() => obs.disconnect());
    }
  }

  ngOnDestroy(): void {
    this.listeners.forEach(un => {
      try { un(); } catch (_) {}
    });
    this.listeners = [];
  }

  // ----------------- helper methods -----------------
  private toggleDropdown(toggleEl: HTMLElement) {
    const li = toggleEl.parentElement as HTMLElement | null;
    if (!li) return;

    const menu = li.querySelector('.dropdown-menu') as HTMLElement | null;

    // close all other dropdowns first
    const openNodes = Array.from(this.document.querySelectorAll<HTMLElement>('.nav-item.dropdown.show'));
    openNodes.forEach(open => {
      if (open !== li) {
        open.classList.remove('show');
        const m = open.querySelector('.dropdown-menu');
        m?.classList.remove('show');
        const t = open.querySelector('.dropdown-toggle');
        t?.setAttribute('aria-expanded', 'false');
      }
    });

    // now toggle this one
    const isOpen = li.classList.contains('show');
    if (!isOpen) {
      li.classList.add('show');
      menu?.classList.add('show');
      toggleEl.setAttribute('aria-expanded', 'true');
    } else {
      li.classList.remove('show');
      menu?.classList.remove('show');
      toggleEl.setAttribute('aria-expanded', 'false');
    }
  }

  private closeAllDropdowns() {
    const opens = Array.from(this.document.querySelectorAll<HTMLElement>('.nav-item.dropdown.show'));
    opens.forEach(open => {
      open.classList.remove('show');
      const m = open.querySelector('.dropdown-menu');
      m?.classList.remove('show');
      const t = open.querySelector('.dropdown-toggle');
      t?.setAttribute('aria-expanded', 'false');
    });
  }
}
