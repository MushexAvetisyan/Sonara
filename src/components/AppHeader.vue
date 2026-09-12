<template>
  <header class="app-header">
    <div class="header-inner">
      <div class="logo">
        <span class="logo-icon">♫</span>

        <div>
          <h1>Music Vault</h1>
          <span>Music discovery</span>
        </div>
      </div>

      <nav class="nav">
        <RouterLink
            to="/"
            class="nav-link"
        >
          Home
        </RouterLink>

        <RouterLink
            to="/playlists"
            class="nav-link"
        >
          Playlists
        </RouterLink>

        <RouterLink
            to="/favorites"
            class="nav-link"
        >
          Favorites
        </RouterLink>

        <RouterLink
            to="/history"
            class="nav-link"
        >
          History
        </RouterLink>
      </nav>
    </div>
  </header>
</template>
<style scoped lang="scss">
.app-header {
  position: sticky;
  top: 0;
  z-index: 100;

  border-bottom: 1px solid rgba(255, 255, 255, 0.07);

  background: rgba(8, 8, 12, 0.72);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);

  box-shadow:
      0 10px 40px rgba(0, 0, 0, 0.18);

  transition:
      background 0.25s ease,
      border-color 0.25s ease;
}

.header-inner {
  width: min(1400px, 100%);
  min-height: 76px;
  margin: 0 auto;
  padding: 14px 30px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
}

/* =========================
   LOGO
========================= */

.logo {
  display: flex;
  align-items: center;
  gap: 12px;

  min-width: max-content;
  text-decoration: none;

  .logo-icon {
    width: 44px;
    height: 44px;

    display: grid;
    place-items: center;

    border: 1px solid rgba(255, 255, 255, 0.09);
    border-radius: 13px;

    background:
        linear-gradient(
            145deg,
            rgba(255, 255, 255, 0.11),
            rgba(255, 255, 255, 0.035)
        );

    color: #fff;

    font-size: 24px;
    line-height: 1;

    box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.08),
        0 8px 30px rgba(0, 0, 0, 0.2);

    transition:
        transform 0.25s ease,
        background 0.25s ease,
        border-color 0.25s ease;
  }

  h1 {
    margin: 0;

    color: #fff;

    font-size: 18px;
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.02em;
  }

  span:not(.logo-icon) {
    display: block;

    margin-top: 4px;

    color: rgba(255, 255, 255, 0.38);

    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.04em;
  }

  &:hover {
    .logo-icon {
      transform: translateY(-1px);

      border-color: rgba(255, 255, 255, 0.16);

      background:
          linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.15),
              rgba(255, 255, 255, 0.05)
          );
    }
  }
}

/* =========================
   NAVIGATION
========================= */

.nav {
  display: flex;
  align-items: center;
  gap: 6px;

  padding: 5px;

  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;

  background: rgba(255, 255, 255, 0.025);

  box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.025);
}

.nav-link {
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 38px;
  padding: 0 15px;

  border-radius: 10px;

  color: rgba(255, 255, 255, 0.48);

  text-decoration: none;

  font-size: 13px;
  font-weight: 500;

  transition:
      color 0.2s ease,
      background 0.2s ease,
      transform 0.2s ease;
}

.nav-link:hover {
  color: rgba(255, 255, 255, 0.9);

  background: rgba(255, 255, 255, 0.045);

  transform: translateY(-1px);
}

/* Active route */

.nav-link.router-link-active {
  color: #fff;

  background: rgba(255, 255, 255, 0.09);

  box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.05),
      0 4px 15px rgba(0, 0, 0, 0.12);
}

.nav-link.router-link-active::after {
  content: "";

  position: absolute;

  left: 50%;
  bottom: 4px;

  width: 4px;
  height: 4px;

  border-radius: 50%;

  background: rgba(255, 255, 255, 0.75);

  transform: translateX(-50%);
}

/* =========================
   TABLET
========================= */

@media (max-width: 900px) {
  .header-inner {
    padding: 13px 20px;
  }

  .nav-link {
    padding: 0 12px;
  }
}

/* =========================
   MOBILE
========================= */

@media (max-width: 700px) {
  .header-inner {
    min-height: 68px;
    padding: 12px 16px;
  }

  .nav {
    display: none;
  }

  .logo {
    .logo-icon {
      width: 40px;
      height: 40px;

      border-radius: 11px;

      font-size: 21px;
    }

    h1 {
      font-size: 16px;
    }

    span:not(.logo-icon) {
      font-size: 10px;
    }
  }
}

/* =========================
   SMALL MOBILE
========================= */

@media (max-width: 380px) {
  .header-inner {
    padding: 10px 13px;
  }

  .logo {
    gap: 9px;

    .logo-icon {
      width: 37px;
      height: 37px;

      font-size: 19px;
    }

    h1 {
      font-size: 15px;
    }

    span:not(.logo-icon) {
      font-size: 9px;
    }
  }
}
</style>