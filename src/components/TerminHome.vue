<template>
  <header>
    <div class="container">
      <div class="header-top">
        <div class="brand">Lernraum Chemie · Terminbuchung</div>
        <button class="admin-toggle" id="toggleAdminBtn">Admin</button>
      </div>
      <div class="hero">
        <h1>Virtuelle Tutoriumstermine buchen</h1>
        <p>
          Buche einen freien Termin für ein virtuelles Tutorium. Bitte gib deinen Namen und deine E-Mail-Adresse an.
          Individuelle Termine via Zoom passen zum Angebot des Lernraums Chemie; als Kontaktadresse wird
          lernraum_chemie@uni-frankfurt.de genannt.
        </p>
      </div>
    </div>
  </header>

  <main class="container">
    <div class="grid">
      <section class="card">
        <h2>Verfügbare Termine</h2>
        <div class="notice">
          Nach dem Buchen zeigt diese Demo eine E-Mail-Bestätigung nur simuliert an.
          In einer echten Version würden Bestätigungen an die Nutzeradresse und an
          <strong>lernraum_chemie@uni-frankfurt.de</strong> gesendet.
        </div>

        <div id="bookingStatus" class="hidden status info" style="margin-top:14px;"></div>
        <div id="slotList" class="slot-list"></div>
      </section>

      <aside>
        <section class="card">
          <h3>Termin buchen</h3>
          <form id="bookingForm">
            <label>
              Gewählter Termin
              <select id="bookingSlot" required>
                <option value="">Bitte freien Termin auswählen</option>
              </select>
            </label>

            <label>
              Name *
              <input type="text" id="name" required placeholder="Vor- und Nachname" />
            </label>

            <label>
              E-Mail-Adresse *
              <input type="email" id="email" required placeholder="name@example.org" />
            </label>

            <label>
              Kommentar (optional)
              <textarea id="comment" placeholder="Optionaler Hinweis"></textarea>
            </label>

            <button type="submit" class="btn-primary">Termin verbindlich buchen</button>
          </form>
        </section>

        <section class="card admin-panel hidden" id="adminSection">
          <h3>Adminbereich</h3>

          <div id="adminLoginBox">
            <form id="adminLoginForm">
              <label>
                Admin-Passwort
                <input type="password" id="adminPassword" placeholder="Passwort eingeben" />
              </label>
              <button type="submit" class="btn-primary">Einloggen</button>
            </form>
            <p class="muted small">Demo-Passwort: <strong>goethe2026</strong></p>
          </div>

          <div id="adminContent" class="hidden">
            <div class="status info" style="margin-bottom:14px;">
              Demo-Modus: Daten werden nur lokal im Browser gespeichert.
            </div>

            <form id="adminCreateForm">
              <div class="form-row two">
                <label>
                  Titel *
                  <input type="text" id="adminTitle" value="Virtuelles Tutorium" required />
                </label>
                <label>
                  Tutor:in *
                  <input type="text" id="adminTutor" placeholder="z. B. Max Mustermann" required />
                </label>
              </div>

              <div class="form-row two">
                <label>
                  Datum *
                  <input type="date" id="adminDate" required />
                </label>
                <label>
                  Uhrzeit *
                  <input type="time" id="adminTime" required />
                </label>
              </div>

              <label>
                Zusatzinfo / Zoom-Hinweis
                <input type="text" id="adminInfo" placeholder="z. B. Zoom-Link wird per E-Mail versendet" />
              </label>

              <button type="submit" class="btn-success">Termin anlegen</button>
            </form>

            <div style="margin-top:16px; display:flex; gap:10px; flex-wrap:wrap;">
              <button id="seedDemoBtn" class="btn-secondary" type="button">Beispieltermine anlegen</button>
              <button id="logoutAdminBtn" class="btn-secondary" type="button">Logout</button>
            </div>
          </div>
        </section>
      </aside>
    </div>

    <div class="footer">
      Lernraum Chemie · Goethe-inspiriertes Design · Mobile First
    </div>
  </main>

  </template>