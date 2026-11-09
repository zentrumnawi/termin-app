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
          <v-form id="bookingForm" @submit.prevent="onBookingSubmit">
            <v-select
              id="bookingSlot"
              v-model="booking.slotId"
              :items="shiftItems"
              item-title="title"
              item-value="value"
              label="Gewählter Termin"
              placeholder="Bitte freien Termin auswählen"
              variant="outlined"
              density="comfortable"
              hide-details="auto"
              :rules="[rules.required]"
              :loading="shiftsLoading"
              required
            />

            <v-text-field
              id="name"
              v-model="booking.name"
              label="Name *"
              placeholder="Vor- und Nachname"
              variant="outlined"
              density="comfortable"
              hide-details="auto"
              :rules="[rules.required]"
              required
            />

            <v-text-field
              id="email"
              v-model="booking.email"
              type="email"
              label="E-Mail-Adresse *"
              placeholder="name@example.org"
              variant="outlined"
              density="comfortable"
              hide-details="auto"
              :rules="[rules.required, rules.email]"
              required
            />

            <v-textarea
              id="comment"
              v-model="booking.comment"
              label="Kommentar (optional)"
              placeholder="Optionaler Hinweis"
              variant="outlined"
              density="comfortable"
              hide-details="auto"
              rows="3"
              auto-grow
            />

            <v-btn type="submit" block>
              Termin verbindlich buchen
            </v-btn>
          </v-form>
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

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useShiftsStore } from '@/stores/shifts'

const shiftsStore = useShiftsStore()
const { shifts } = storeToRefs(shiftsStore)

const shiftsLoading = ref(false)

const booking = reactive({
  slotId: null as string | null,
  name: '',
  email: '',
  comment: '',
})

const rules = {
  required: (value: unknown) => Boolean(value) || 'Pflichtfeld',
  email: (value: string) => /.+@.+\..+/.test(value) || 'Ungültige E-Mail-Adresse',
}

const shiftItems = computed(() =>
  shifts.value.map((shift) => ({
    title: `${shift.date} · ${shift.time}`,
    value: shift.id,
  })),
)

async function loadShifts() {
  shiftsLoading.value = true
  try {
    await shiftsStore.getShifts()
  } finally {
    shiftsLoading.value = false
  }
}

function onBookingSubmit() {
  // Submit to create appointment
}

onMounted(() => {
  void loadShifts()
})
</script>