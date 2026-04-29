import { useState } from 'react'
import bg from '../assets/page1_bg.png'

// ── Google Apps Script endpoint ───────────────────────────────────────────────
// Step-by-step setup (do this once):
//   1. Open your Google Sheet → Extensions → Apps Script
//   2. Delete any existing code and paste the script from the README / comment below
//   3. Click Deploy → New Deployment → Web App
//      • Execute as: Me
//      • Who has access: Anyone
//   4. Authorise when prompted, then copy the /exec URL
//   5. Replace the placeholder below with that URL
//
// Apps Script code to paste:
// ─────────────────────────────────────────────────────────────────────────────
// function doGet(e) {
//   var lock = LockService.getScriptLock();
//   lock.tryLock(5000);
//   try {
//     var sheet = SpreadsheetApp
//       .openById('100qQABdLLt94XTxtfu23jummR2HTMwo25vWfgtJDXxY')
//       .getSheets()[0];
//     if (sheet.getLastRow() === 0)
//       sheet.appendRow(['Timestamp', 'Guest Name', 'Attending']);
//     sheet.appendRow([
//       new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
//       e.parameter.name || '',
//       e.parameter.attending || ''
//     ]);
//     return ContentService
//       .createTextOutput(JSON.stringify({ result: 'success' }))
//       .setMimeType(ContentService.MimeType.JSON);
//   } catch(f) {
//     return ContentService
//       .createTextOutput(JSON.stringify({ result: 'error', error: f.toString() }))
//       .setMimeType(ContentService.MimeType.JSON);
//   } finally { lock.releaseLock(); }
// }
// ─────────────────────────────────────────────────────────────────────────────

const SHEET_URL = 'https://script.google.com/macros/s/AKfycbz9F4CBR1nbx38q8950OE_foh0wEaH3kT4b2oZBeP1ASuMmb6gYAIdBeVZO7E7pFbeL/exec'

// ─────────────────────────────────────────────────────────────────────────────

const STYLES = `
  /* Gold shimmer on the submit button */
  @keyframes rsvp-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }

  /* Gentle float for the heading */
  @keyframes rsvp-float {
    0%, 100% { transform: translateY(0px);  }
    50%       { transform: translateY(-4px); }
  }

  .rsvp-btn {
    background: linear-gradient(
      120deg,
      #b8822a 0%,
      #e8c06a 40%,
      #d4a84b 55%,
      #e8c06a 70%,
      #b8822a 100%
    );
    background-size: 200% auto;
    animation: rsvp-shimmer 3s linear infinite;
  }

  .rsvp-btn:disabled {
    animation: none;
    background: #6b5030;
    opacity: 0.55;
  }

  .rsvp-input::placeholder { color: #a08060; }
  .rsvp-input:focus        { border-color: #d4a84b; outline: none; }

  .rsvp-select option {
    background: #1a0a00;
    color: #fdf5e4;
  }
`

const Footer = () => {
  const [name,      setName]      = useState('')
  const [attending, setAttending] = useState('')
  const [status,    setStatus]    = useState('idle') // idle | submitting | success | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim() || !attending) return
    setStatus('submitting')

    try {
      // GET request avoids CORS preflight — Apps Script handles it natively.
      // With mode:'no-cors' the response is opaque; a thrown error = network fail.
      const url =
        `${SHEET_URL}` +
        `?name=${encodeURIComponent(name.trim())}` +
        `&attending=${encodeURIComponent(attending)}` +
        `&ts=${encodeURIComponent(new Date().toISOString())}`

      await fetch(url, { mode: 'no-cors' })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <style>{STYLES}</style>

      {/* Short footer — auto height, not full-screen */}
      <div className="relative w-full overflow-hidden flex flex-col items-center">

        {/* Background image */}
        <img
          src={bg}
          alt=""
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Dark overlay so text stays legible over the bg */}


        {/* ── Content ──────────────────────────────────────────────────── */}
        <div className="relative z-10 flex flex-col items-center w-full px-8 pt-10 pb-12 gap-6">

          {/* ── Heading ─────────────────────────────────────────────────── */}
          <div
            className="flex flex-col items-center gap-[3px]"
            style={{ animation: 'rsvp-float 4s ease-in-out infinite' }}
          >
            {/* "Kindly" label */}
            <p className="font-libre text-[0.60rem] tracking-[0.5em] uppercase text-[#710C20] mb-[10px]">
              Kindly
            </p>

            {/* Big script RSVP */}
            <p className="font-cormorant text-[2.6rem] text-[#710C20] leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              RSVP
            </p>

            {/* Deadline */}
            <p className="font-cormorant text-[0.82rem] tracking-[0.22em] font-semibold uppercase text-[#710C20] mt-[5px]">
              by 10th May 2026
            </p>

            {/* Thin gold rule beneath heading */}
            <div className="flex items-center gap-2 w-48 mt-2">
              <span className="flex-1 border-t border-[#b8822a]/60" />
              <span className="text-[0.45rem] text-[#b8822a]" style={{ fontFamily: 'serif' }}>✦</span>
              <span className="flex-1 border-t border-[#b8822a]/60" />
            </div>
          </div>

          {/* ── Form / Success state ─────────────────────────────────────── */}
          {status === 'success' ? (

            /* Success message */
            <div className="flex flex-col items-center gap-1 text-center py-2">
              <p
                className="font-great-vibes text-[2rem] text-[#d4a84b] drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
              >
                Thank you!
              </p>
              <p className="font-cormorant text-[0.90rem] tracking-[0.18em] italic text-[#d4a84b]">
                We look forward to celebrating with you.
              </p>
            </div>

          ) : (

            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center gap-4 w-full max-w-[260px]"
            >

              {/* ── Guest name input ─────────────────────────────────────── */}
              <div className="w-full flex flex-col gap-[5px]">
                <label className="font-libre text-[0.74rem] tracking-[0.35em] uppercase text-[#710C20] text-center">
                  Guest Name
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="rsvp-input w-full font-semibold rounded-lg px-4 py-[10px] font-cormorant text-[0.72rem] tracking-[0.1em] text-black uppercase text-center transition-colors"
                  style={{
                    background:   'rgba(255,255,255,0.07)',
                    border:       '1px solid rgba(212,168,75,0.45)',
                    backdropFilter: 'blur(6px)',
                  }}
                />
              </div>

              {/* ── Attendance dropdown ──────────────────────────────────── */}
              <div className="w-full flex flex-col gap-[5px]">
                <label className="font-libre text-[0.62rem] tracking-[0.35em] uppercase text-[#710C20] font-semibold text-center">
                  Will you attend?
                </label>
                <select
                  value={attending}
                  onChange={e => setAttending(e.target.value)}
                  required
                  className="rsvp-select rsvp-input w-full rounded-lg px-4 py-[10px] font-cormorant text-[0.72rem] tracking-[0.1em] text-center transition-colors appearance-none cursor-pointer"
                  style={{
                    background:     attending
                      ? 'rgba(255,255,255,0.10)'
                      : 'rgba(255,255,255,0.07)',
                    border:         '1px solid rgba(212,168,75,0.45)',
                    backdropFilter: 'blur(6px)',
                    color:          attending ? '#fdf5e4' : '#a08060',
                  }}
                >
                  <option value="" disabled hidden>Select one…</option>
                  <option value="Joyfully Accepts">✓  Joyfully Accepts</option>
                  <option value="Regretfully Declines">✗  Regretfully Declines</option>
                </select>
              </div>

              {/* ── Submit button ─────────────────────────────────────────── */}
              <button
                type="submit"
                disabled={status === 'submitting' || !name.trim() || !attending}
                className="rsvp-btn mt-1 w-full rounded-full py-[10px]  font-libre text-[0.5rem] tracking-[0.32em] uppercase transition-all"
                style={{
                  color:      'black',
                  boxShadow:  '0 3px 14px rgba(184,130,42,0.45)',
                  fontWeight: 800,
                }}
              >
                {status === 'submitting' ? 'Sending…' : 'Send RSVP  ✦'}
              </button>

              {/* Error message */}
              {status === 'error' && (
                <p className="font-cormorant text-[0.6rem] tracking-[0.1em] italic text-red-900 text-center">
                  Something went wrong — please try again.
                </p>
              )}

            </form>

          )}

        </div>
      </div>
    </>
  )
}

export default Footer
