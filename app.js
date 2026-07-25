// NAMA Gesamtrechner & Übungssuite - Master Application Logic

document.addEventListener('DOMContentLoaded', () => {
  // Tab Switching
  const navBtns = document.querySelectorAll('.nav-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      navBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const target = document.getElementById(btn.dataset.tab);
      if (target) target.classList.add('active');
    });
  });

  // ==========================================
  // MODULE 1: M&A INTEGRATED VALUATION
  // ==========================================
  const presets = {
    ss25pt1: {
      sks: 15, sgew: 14, sz: 5.5, rwacc: 8.15, rfk: 5.4, fk: 6500,
      ebitda: [1850, 2250, 1950, 2850],
      afa: [450, 450, 450, 450],
      co2: [7.0, 9.5, 9.0, 10.0],
      sp: [224, 232, 240, 240],
      hasSocial: false, social123: 0, socialEwig: 0
    },
    ss24pt1: {
      sks: 15, sgew: 14, sz: 5.5, rwacc: 7.3625, rfk: 4.0, fk: 8000,
      ebitda: [1500, 1750, 1900, 2020],
      afa: [240, 240, 240, 240],
      co2: [4.0, 2.9, 3.0, 2.9],
      sp: [224, 232, 240, 240],
      hasSocial: true, social123: 651, socialEwig: 714
    },
    ss24pt2: {
      sks: 15, sgew: 14, sz: 5.5, rwacc: 7.78, rfk: 4.0, fk: 7000,
      ebitda: [1600, 1850, 1800, 2150],
      afa: [300, 300, 300, 300],
      co2: [4.0, 2.9, 3.0, 2.9],
      sp: [224, 232, 240, 240],
      hasSocial: false, social123: 0, socialEwig: 0
    }
  };

  const presetSelect = document.getElementById('preset-select');
  const inputSks = document.getElementById('input-sks');
  const inputSgew = document.getElementById('input-sgew');
  const inputSz = document.getElementById('input-sz');
  const inputRwacc = document.getElementById('input-rwacc');
  const enableSocial = document.getElementById('enable-social');
  const socialInputs = document.getElementById('social-inputs');

  const calcInputs = document.querySelectorAll('#calc-form input, #preset-select');
  calcInputs.forEach(i => i.addEventListener('input', calculateMAValuation));

  presetSelect.addEventListener('change', (e) => {
    const p = presets[e.target.value];
    if (p) {
      inputSks.value = p.sks;
      inputSgew.value = p.sgew;
      inputSz.value = p.sz;
      inputRwacc.value = p.rwacc;
      document.getElementById('input-rfk').value = p.rfk;
      document.getElementById('input-fk').value = p.fk;

      for (let i = 1; i <= 3; i++) {
        document.getElementById(`ebitda-${i}`).value = p.ebitda[i-1];
        document.getElementById(`afa-${i}`).value = p.afa[i-1];
        document.getElementById(`co2-${i}`).value = p.co2[i-1];
        document.getElementById(`sp-${i}`).value = p.sp[i-1];
      }
      document.getElementById('ebitda-ewig').value = p.ebitda[3];
      document.getElementById('afa-ewig').value = p.afa[3];
      document.getElementById('co2-ewig').value = p.co2[3];
      document.getElementById('sp-ewig').value = p.sp[3];

      enableSocial.checked = p.hasSocial;
      if (p.hasSocial) {
        socialInputs.classList.remove('hidden');
        document.getElementById('social-123').value = p.social123;
        document.getElementById('social-ewig').value = p.socialEwig;
      } else {
        socialInputs.classList.add('hidden');
      }
    }
    calculateMAValuation();
  });

  enableSocial.addEventListener('change', () => {
    if (enableSocial.checked) socialInputs.classList.remove('hidden');
    else socialInputs.classList.add('hidden');
    calculateMAValuation();
  });

  const toggleMathBtn = document.getElementById('toggle-math-btn');
  const mathDetails = document.getElementById('math-details');
  if (toggleMathBtn) {
    toggleMathBtn.addEventListener('click', () => {
      mathDetails.classList.toggle('hidden');
    });
  }

  function calculateMAValuation() {
    const sks = parseFloat(inputSks.value) / 100 || 0;
    const sgew = parseFloat(inputSgew.value) / 100 || 0;
    const sz = parseFloat(inputSz.value) / 100 || 0;
    const rwacc = parseFloat(inputRwacc.value) / 100 || 0.0815;

    const seff = sks * (1 + sz) + sgew;
    document.getElementById('res-tax').innerText = (seff * 100).toFixed(4) + '%';

    const years = [
      { ebitda: parseFloat(document.getElementById('ebitda-1').value)||0, afa: parseFloat(document.getElementById('afa-1').value)||0, co2: parseFloat(document.getElementById('co2-1').value)||0, sp: parseFloat(document.getElementById('sp-1').value)||0 },
      { ebitda: parseFloat(document.getElementById('ebitda-2').value)||0, afa: parseFloat(document.getElementById('afa-2').value)||0, co2: parseFloat(document.getElementById('co2-2').value)||0, sp: parseFloat(document.getElementById('sp-2').value)||0 },
      { ebitda: parseFloat(document.getElementById('ebitda-3').value)||0, afa: parseFloat(document.getElementById('afa-3').value)||0, co2: parseFloat(document.getElementById('co2-3').value)||0, sp: parseFloat(document.getElementById('sp-3').value)||0 },
      { ebitda: parseFloat(document.getElementById('ebitda-ewig').value)||0, afa: parseFloat(document.getElementById('afa-ewig').value)||0, co2: parseFloat(document.getElementById('co2-ewig').value)||0, sp: parseFloat(document.getElementById('sp-ewig').value)||0 }
    ];

    let tbodyHTML = '';
    let fcfList = [], envCostList = [];

    for (let i = 0; i < 4; i++) {
      const ebit = years[i].ebitda - years[i].afa;
      const fcf = ebit * (1 - seff);
      const envCost = years[i].co2 * years[i].sp * 1000;
      fcfList.push(fcf);
      envCostList.push(envCost);

      const label = i < 3 ? `t=${i+1}` : 'ab t=4 (ewig)';
      tbodyHTML += `
        <tr>
          <td><strong>${label}</strong></td>
          <td>${ebit.toFixed(2)} TE</td>
          <td><strong>${fcf.toFixed(2)} TE</strong></td>
          <td class="color-red">${envCost.toFixed(2)} TE</td>
        </tr>
      `;
    }
    document.getElementById('res-table-body').innerHTML = tbodyHTML;

    let fv_explicit = 0;
    for (let t = 1; t <= 3; t++) fv_explicit += fcfList[t-1] / Math.pow(1 + rwacc, t);
    const fv_perpetuity = fcfList[3] / (rwacc * Math.pow(1 + rwacc, 3));
    const financialValue = fv_explicit + fv_perpetuity;

    let ev_explicit = 0;
    for (let t = 1; t <= 3; t++) ev_explicit += envCostList[t-1] / Math.pow(1 + rwacc, t);
    const ev_perpetuity = envCostList[3] / (rwacc * Math.pow(1 + rwacc, 3));
    const environmentalValue = ev_explicit + ev_perpetuity;

    let socialValue = 0;
    if (enableSocial.checked) {
      const s123 = parseFloat(document.getElementById('social-123').value) || 0;
      const sewig = parseFloat(document.getElementById('social-ewig').value) || 0;
      let sv_exp = 0;
      for (let t = 1; t <= 3; t++) sv_exp += s123 / Math.pow(1 + rwacc, t);
      const sv_perp = sewig / (rwacc * Math.pow(1 + rwacc, 3));
      socialValue = sv_exp + sv_perp;
    }

    const integratedValue = financialValue - environmentalValue + socialValue;

    document.getElementById('res-fv').innerText = financialValue.toFixed(2) + ' TE';
    document.getElementById('res-fv-mio').innerText = (financialValue / 1000).toFixed(4) + ' Mio. €';

    document.getElementById('res-ev').innerText = environmentalValue.toFixed(2) + ' TE';
    document.getElementById('res-ev-mio').innerText = (environmentalValue / 1000).toFixed(4) + ' Mio. €';

    document.getElementById('res-iv').innerText = integratedValue.toFixed(2) + ' TE';
    document.getElementById('res-iv-mio').innerText = (integratedValue / 1000).toFixed(4) + ' Mio. €';

    document.getElementById('math-details').innerHTML = `
      <h4>Step 1: Effektiver Steuersatz</h4>
      <p>s_eff = 15% * (1 + 0.055) + 14% = <strong>${(seff*100).toFixed(4)}%</strong></p>
      <h4>Step 2: Free Cash Flows &amp; Barwerte</h4>
      <p>Financial Value (FV) = <strong>${financialValue.toFixed(2)} TE</strong> (${(financialValue/1000).toFixed(4)} Mio. €)</p>
      <p>Environmental Value (EV) = <strong>${environmentalValue.toFixed(2)} TE</strong> (${(environmentalValue/1000).toFixed(4)} Mio. €)</p>
      <p>Integrated Value (IV) = <strong>${integratedValue.toFixed(2)} TE</strong> (${(integratedValue/1000).toFixed(4)} Mio. €)</p>
    `;

    if (integratedValue < 0) {
      document.getElementById('res-interpretation').innerHTML = `
        <span class="color-red"><strong>⚠️ NEGATIVER INTEGRATED VALUE (${(integratedValue/1000).toFixed(2)} Mio. €):</strong></span><br>
        Der finanzielle Wert (${(financialValue/1000).toFixed(2)} Mio. €) wird durch die Umweltschadenkosten durch CO2 (${(environmentalValue/1000).toFixed(2)} Mio. €) übertroffen. Aus Sicht einer Integrated Due Diligence ist von der Übernahme abzuraten, sofern keine Dekarbonisierung erfolgt.
      `;
    } else {
      document.getElementById('res-interpretation').innerHTML = `
        <span class="color-green"><strong>✅ POSITIVER INTEGRATED VALUE (${(integratedValue/1000).toFixed(2)} Mio. €):</strong></span><br>
        Der finanzielle Ertrag übersteigt die externen Umweltschadenkosten. Die M&amp;A-Transaktion schafft gesellschaftlichen Nettowert.
      `;
    }
  }

  calculateMAValuation();

  // ==========================================
  // MODULE 2: PCAF SCOPE 3 CAT 15 FINANCED EMISSIONS
  // ==========================================
  const pcafInputs = document.querySelectorAll('#pcaf-form input');
  pcafInputs.forEach(i => i.addEventListener('input', calculatePCAF));

  function calculatePCAF() {
    const credit = parseFloat(document.getElementById('pcaf-credit').value) || 0;
    const totcap = parseFloat(document.getElementById('pcaf-totcap').value) || 1;
    const sc12 = parseFloat(document.getElementById('pcaf-scope12').value) || 0;
    const sc3 = parseFloat(document.getElementById('pcaf-scope3').value) || 0;

    const af = (credit / totcap); // Attribution Factor
    const finSc12 = af * sc12;
    const finTotal = af * (sc12 + sc3);

    document.getElementById('pcaf-res-af').innerText = (af * 100).toFixed(2) + ' %';
    document.getElementById('pcaf-res-sc12').innerText = finSc12.toLocaleString('de-DE', {maximumFractionDigits: 0}) + ' t CO2e';
    document.getElementById('pcaf-res-total').innerText = finTotal.toLocaleString('de-DE', {maximumFractionDigits: 0}) + ' t CO2e';

    document.getElementById('pcaf-math-box').innerHTML = `
      <strong>Rechenschema (PCAF Standard):</strong><br>
      Attributionsfaktor (AF) = ${credit} Mio. € / ${totcap} Mio. € = <strong>${(af*100).toFixed(2)}%</strong><br>
      Finanzierte Scope 1+2 = ${(af*100).toFixed(2)}% * ${sc12.toLocaleString()} = <strong>${finSc12.toLocaleString('de-DE', {maximumFractionDigits: 2})} t CO2e</strong><br>
      Finanzierte Scope 1+2+3 = ${(af*100).toFixed(2)}% * ${(sc12+sc3).toLocaleString()} = <strong>${finTotal.toLocaleString('de-DE', {maximumFractionDigits: 2})} t CO2e</strong>
    `;
  }
  calculatePCAF();

  // ==========================================
  // MODULE 3: EU TAXONOMIE & GAR
  // ==========================================
  const garInputs = document.querySelectorAll('#gar-form input');
  garInputs.forEach(i => i.addEventListener('input', calculateGAR));

  function calculateGAR() {
    const align = parseFloat(document.getElementById('gar-tax-align').value) || 0;
    const elig = parseFloat(document.getElementById('gar-tax-elig').value) || 0;
    const cov = parseFloat(document.getElementById('gar-tot-cov').value) || 1;

    const eligRatio = (elig / cov) * 100;
    const gar = (align / cov) * 100;

    document.getElementById('gar-res-elig').innerText = eligRatio.toFixed(2) + ' %';
    document.getElementById('gar-res-gar').innerText = gar.toFixed(2) + ' %';
  }
  calculateGAR();

  // ==========================================
  // MODULE 4: LCA GETRÄNKEVERPACKUNG (PET VS. GLAS)
  // ==========================================
  const lcaInputs = document.querySelectorAll('#lca-form input');
  lcaInputs.forEach(i => i.addEventListener('input', calculateLCA));

  function calculateLCA() {
    const petProd = parseFloat(document.getElementById('lca-pet-prod').value) || 0;
    const petTrans = parseFloat(document.getElementById('lca-pet-trans').value) || 0;

    const glasProd = parseFloat(document.getElementById('lca-glas-prod').value) || 0;
    const glasTrips = parseFloat(document.getElementById('lca-glas-trips').value) || 1;
    const glasSpuel = parseFloat(document.getElementById('lca-glas-spuel').value) || 0;
    const glasTrans = parseFloat(document.getElementById('lca-glas-trans').value) || 0;

    // Per 1.000 Liter (1.000 Flaschen)
    const petTotalKg = (petProd + petTrans) * 1000 / 1000; // in kg
    const glasTotalKg = ((glasProd / glasTrips) + glasSpuel + glasTrans) * 1000 / 1000; // in kg

    const diffPct = ((glasTotalKg - petTotalKg) / petTotalKg) * 100;

    document.getElementById('lca-res-pet').innerText = petTotalKg.toFixed(1) + ' kg CO2e';
    document.getElementById('lca-res-glas').innerText = glasTotalKg.toFixed(1) + ' kg CO2e';

    const diffElem = document.getElementById('lca-res-diff');
    if (diffPct < 0) {
      diffElem.innerText = `${diffPct.toFixed(1)}% CO2 (Glas ist besser)`;
      diffElem.className = 'color-green';
      document.getElementById('lca-res-text').innerText = `Glas-Mehrweg ist bei ${glasTrips} Umläufen ökologisch überlegen, da die hohen Herstellungs-Emissionen (${glasProd}g) auf ${glasTrips} Nutzungen aufgeteilt werden.`;
    } else {
      diffElem.innerText = `+${diffPct.toFixed(1)}% CO2 (PET ist besser)`;
      diffElem.className = 'color-red';
      document.getElementById('lca-res-text').innerText = `Bei nur ${glasTrips} Umläufen kann Glas-Mehrweg die hohen Herstellungsemissionen nicht kompensieren. Erst bei mehr Umläufen wird Glas besser.`;
    }
  }
  calculateLCA();

  // ==========================================
  // MODULE 5: WACC & SOZIALES KAPITAL
  // ==========================================
  const waccInputs = document.querySelectorAll('#wacc-form input');
  waccInputs.forEach(i => i.addEventListener('input', calculateWACC));

  function calculateWACC() {
    const rek = parseFloat(document.getElementById('w-rek').value) / 100 || 0;
    const rfk = parseFloat(document.getElementById('w-rfk').value) / 100 || 0;
    const ekq = parseFloat(document.getElementById('w-ekq').value) / 100 || 0.6;
    const tax = parseFloat(document.getElementById('w-tax').value) / 100 || 0.3;
    const rsoz = parseFloat(document.getElementById('w-rsoz').value) / 100 || 0.022;
    const sozq = parseFloat(document.getElementById('w-sozq').value) / 100 || 0.15;

    const fk|q = 1 - ekq;
    const waccTrad = (ekq * rek) + (fkq * rfk * (1 - tax));

    // Integrated WACC including social/env capital
    const waccInteg = ((1 - sozq) * waccTrad) + (sozq * rsoz);

    document.getElementById('wacc-res-trad').innerText = (waccTrad * 100).toFixed(2) + ' %';
    document.getElementById('wacc-res-integ').innerText = (waccInteg * 100).toFixed(2) + ' %';

    document.getElementById('wacc-formula-display').innerHTML = `
      Klassischer WACC = (${(ekq*100).toFixed(0)}% * ${(rek*100).toFixed(1)}%) + (${(fkq*100).toFixed(0)}% * ${(rfk*100).toFixed(1)}% * (1 - ${(tax*100).toFixed(0)}%)) = <strong>${(waccTrad*100).toFixed(2)}%</strong><br>
      Integrated WACC = (${((1-sozq)*100).toFixed(0)}% * ${(waccTrad*100).toFixed(2)}%) + (${(sozq*100).toFixed(0)}% * ${(rsoz*100).toFixed(1)}%) = <strong>${(waccInteg*100).toFixed(2)}%</strong>
    `;
  }
  calculateWACC();
});
