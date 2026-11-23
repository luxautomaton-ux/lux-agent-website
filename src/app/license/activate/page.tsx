import React from 'react';
import Link from 'next/link';

export default function LicenseActivatePage() {
  const activateCode = `
    async function handleActivate(event) {
      event.preventDefault();
      
      const licenseKey = document.getElementById('licenseKey').value;
      const deviceId = document.getElementById('deviceId').value;
      const deviceName = document.getElementById('deviceName').value;
      const os = document.getElementById('os').value;

      const btn = document.getElementById('btn-activate');
      const text = document.getElementById('btn-activate-text');
      const loader = document.getElementById('btn-activate-loader');
      const resultBox = document.getElementById('result-box');
      const resultSuccess = document.getElementById('result-success');
      const resultError = document.getElementById('result-error');

      if (!licenseKey || !deviceId) {
        alert('Please fill out all fields.');
        return;
      }

      btn.disabled = true;
      text.style.opacity = '0';
      loader.style.display = 'block';
      resultBox.style.display = 'none';

      try {
        const res = await fetch('/api/license/activate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ licenseKey, deviceId, deviceName, os })
        });

        const data = await res.json();
        
        resultBox.style.display = 'block';
        if (res.ok && data.success) {
          resultSuccess.style.display = 'block';
          resultError.style.display = 'none';
          document.getElementById('display-token').textContent = data.offlineToken;
          document.getElementById('display-type').textContent = data.licenseType;
          document.getElementById('display-pack').textContent = data.packSlug || 'None';
        } else {
          resultSuccess.style.display = 'none';
          resultError.style.display = 'block';
          document.getElementById('display-error').textContent = data.error || 'Failed to activate license';
        }
      } catch (e) {
        resultBox.style.display = 'block';
        resultSuccess.style.display = 'none';
        resultError.style.display = 'block';
        document.getElementById('display-error').textContent = 'Network connection error';
      } finally {
        btn.disabled = false;
        text.style.opacity = '1';
        loader.style.display = 'none';
      }
    }
  `;

  return (
    <main style={{ paddingTop: 140, paddingBottom: 100, minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
      <div style={{ position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(162,117,255,0.04) 0%, transparent 60%)', filter: 'blur(50px)', zIndex: 0, pointerEvents: 'none' }} />

      <div className="container" style={{ maxWidth: 640, position: 'relative', zIndex: 1 }}>
        <div style={{ background: 'rgba(26,26,30,0.5)', border: '1px solid var(--border)', borderRadius: 24, padding: 40, backdropFilter: 'blur(20px)' }}>
          
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>License Activation</span>
            <h1 style={{ fontSize: 32, fontWeight: 800, color: '#fff', margin: '6px 0 0' }}>Activate Your USB Device</h1>
            <p style={{ color: 'var(--text-dim)', fontSize: 14, marginTop: 8 }}>
              Perform the one-time online registration to generate your local offline token.
            </p>
          </div>

          <form id="activate-form" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label htmlFor="licenseKey" style={{ fontSize: 12, color: 'var(--text-dim)', fontWeight: 500 }}>License Key</label>
              <input 
                type="text" 
                id="licenseKey" 
                placeholder="LUX-PACK-XXXX-XXXX-XXXX" 
                required
                style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', padding: '12px 16px', borderRadius: 8, color: '#fff', fontSize: 14, fontFamily: 'monospace' }}
              />
            </div>

            <div className="grid grid-2" style={{ gap: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label htmlFor="deviceId" style={{ fontSize: 12, color: 'var(--text-dim)', fontWeight: 500 }}>Device Fingerprint (ID)</label>
                <input 
                  type="text" 
                  id="deviceId" 
                  defaultValue="dev_mac_silicon_fb3a12"
                  required
                  style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', padding: '12px 16px', borderRadius: 8, color: '#fff', fontSize: 14, fontFamily: 'monospace' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label htmlFor="deviceName" style={{ fontSize: 12, color: 'var(--text-dim)', fontWeight: 500 }}>Device Name</label>
                <input 
                  type="text" 
                  id="deviceName" 
                  defaultValue="My Macbook Pro"
                  required
                  style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', padding: '12px 16px', borderRadius: 8, color: '#fff', fontSize: 14 }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label htmlFor="os" style={{ fontSize: 12, color: 'var(--text-dim)', fontWeight: 500 }}>Operating System</label>
              <select 
                id="os" 
                defaultValue="mac"
                style={{ background: 'rgba(26,26,30,1)', border: '1px solid var(--border)', padding: '12px 16px', borderRadius: 8, color: '#fff', fontSize: 14, outline: 'none' }}
              >
                <option value="mac">macOS (Apple Silicon / Intel)</option>
              </select>
            </div>

            <button 
              type="submit"
              id="btn-activate"
              style={{ 
                background: 'var(--primary)', 
                color: '#fff', 
                border: 'none', 
                padding: '14px 20px', 
                borderRadius: 10, 
                fontWeight: 700, 
                cursor: 'pointer', 
                fontSize: 15,
                marginTop: 10,
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <span id="btn-activate-text">Activate License</span>
              <span id="btn-activate-loader" style={{ display: 'none', width: '20px', height: '20px', border: '3px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            </button>
          </form>

          {/* RESULTS BOX */}
          <div id="result-box" style={{ display: 'none', marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            
            {/* SUCCESS PANEL */}
            <div id="result-success" style={{ display: 'none', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--success)', fontWeight: 700, fontSize: 14, marginBottom: 16 }}>
                ✓ Activation Token Generated Successfully
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border)', borderRadius: 12, padding: 20 }}>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>LICENSE TYPE</div>
                  <div id="display-type" style={{ fontSize: 14, fontWeight: 700, color: '#fff', textTransform: 'capitalize' }}>-</div>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>SUCCESS PACK SLUG</div>
                  <div id="display-pack" style={{ fontSize: 14, fontWeight: 700, color: '#fff', textTransform: 'uppercase' }}>-</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6 }}>OFFLINE TOKEN</div>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)' }}>
                    <code id="display-token" style={{ flex: 1, fontFamily: 'monospace', color: 'var(--success)', fontSize: 13, wordBreak: 'break-all', overflowWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
                      -
                    </code>
                  </div>
                </div>
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 14, lineHeight: 1.4 }}>
                👉 Copy the offline token above and paste it into the <code>license-token.json</code> configuration inside the <code>.LUX_Core/data/</code> folder on your USB drive. LANA will read this token locally to run fully offline.
              </p>
            </div>

            {/* ERROR PANEL */}
            <div id="result-error" style={{ display: 'none', textAlign: 'center', background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)', padding: 20, borderRadius: 12 }}>
              <div style={{ color: 'var(--error)', fontWeight: 700, fontSize: 14, marginBottom: 6 }}>
                ✕ Activation Failed
              </div>
              <p id="display-error" style={{ color: 'var(--text-dim)', fontSize: 13, margin: 0 }}>
                -
              </p>
            </div>

          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        input:focus {
          border-color: var(--primary) !important;
        }
      ` }} />
      <script dangerouslySetInnerHTML={{ __html: activateCode }} />
      <script dangerouslySetInnerHTML={{ __html: `
        document.getElementById('activate-form').addEventListener('submit', handleActivate);
      ` }} />
    </main>
  );
}
