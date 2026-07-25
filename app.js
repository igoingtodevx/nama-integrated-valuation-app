// NAMA Integrated Valuation Master - Application Logic

document.addEventListener('DOMContentLoaded', () => {
  // Tab Switching
  const navBtns = document.querySelectorAll('.nav-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      navBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
    });
  });

  // Presets Data
  const presets = {
    ss25pt1: {
      sks: 15, sgew: 14, sz: 5.5, rwacc: 8.15, rfk: 5.4, fk: 6500,
      ebitda: [1850, 2250, 1950, 2850],
      afa: [450, 450, 450, 450],
      co2: [7.0, 9.5, 9.0, 10.0],
      sp: [224, 232, 240, 240],
      hasSocial: false,
      social123: 0, socialEwig: 0
    },
    ss24pt1: {
      sks: 15, sgew: 14, sz: 5.5, rwacc: 7.3625, rfk: 4.0, fk: 8000,
      ebitda: [1500, 1750, 1900, 2020],
      afa: [240, 240, 240, 240],
      co2: [4.0, 2.9, 3.0, 2.9],
      sp: [224, 232, 240, 240],
      hasSocial: true,
      social123: 651, socialEwig: 714 // 6.2/6.4/6.7 * 105
    },
    ss24pt2: {
      sks: 15, sgew: 14, sz: 5.5, rwacc: 7.78, rfk: 4.0, fk: 7000,
      ebitda: [1600, 1850, 1800, 2150],
      afa: [300, 300, 300, 300],
      co2: [4.0, 2.9, 3.0, 2.9],
      sp: [224, 232, 240, 240],
      hasSocial: false,
      social123: 0, socialEwig: 0
    }
  };

  // DOM Elements
  const presetSelect = document.getElementById('preset-select');
  const inputSks = document.getElementById('input-sks');
  const inputSgew = document.getElementById('input-sgew');
  const inputSz = document.getElementById('input-sz');
  const inputRwacc = document.getElementById('input-rwacc');
  const inputRfk = document.getElementById('input-rfk');
  const inputFk = document.getElementById('input-fk');
  const enableSocial = document.getElementById('enable-social');
  const socialInputs = document.getElementById('social-inputs');

  // Input Listeners
  const allInputs = document.querySelectorAll('#calc-form input, #preset-select');
  allInputs.forEach(input => {
    input.addEventListener('input', calculateValuation);
  });

  presetSelect.addEventListener('change', (e) => {
    const p = presets[e.target.value];
    if (p) {
      inputSks.value = p.sks;
      inputSgew.value = p.sgew;
      inputSz.value = p.sz;
      inputRwacc.value = p.rwacc;
      inputRfk.value = p.rfk;
      inputFk.value = p.fk;

      for(let i=1; i<=3; i++) {
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
    calculateValuation();
  });

  enableSocial.addEventListener('change', () => {
    if (enableSocial.checked) {
      socialInputs.classList.remove('hidden');
    } else {
      socialInputs.classList.add('hidden');
    }
    calculateValuation();
  });

  // Accordion Toggle
  const toggleMathBtn = document.getElementById('toggle-math-btn');
  const mathDetails = document.getElementById('math-details');
  toggleMathBtn.addEventListener('click', () => {
    mathDetails.classList.toggle('hidden');
  });

  // Main Valuation Calculation Logic
  let currentValuation = {};

  function calculateValuation() {
    // 1. Taxes & Rates
    const sks = parseFloat(inputSks.value) / 100 || 0;
    const sgew = parseFloat(inputSgew.value) / 100 || 0;
    const sz = parseFloat(inputSz.value) / 100 || 0;
    const rwacc = parseFloat(inputRwacc.value) / 100 || 0.0815;

    // Effective Tax Rate: s_eff = s_ks * (1 + s_z) + s_gew
    const seff = sks * (1 + sz) + sgew;
    document.getElementById('res-tax').innerText = (seff * 100).toFixed(4) + '%';

    // 2. Years Data
    const years = [
      { ebitda: parseFloat(document.getElementById('ebitda-1').value)||0, afa: parseFloat(document.getElementById('afa-1').value)||0, co2: parseFloat(document.getElementById('co2-1').value)||0, sp: parseFloat(document.getElementById('sp-1').value)||0 },
      { ebitda: parseFloat(document.getElementById('ebitda-2').value)||0, afa: parseFloat(document.getElementById('afa-2').value)||0, co2: parseFloat(document.getElementById('co2-2').value)||0, sp: parseFloat(document.getElementById('sp-2').value)||0 },
      { ebitda: parseFloat(document.getElementById('ebitda-3').value)||0, afa: parseFloat(document.getElementById('afa-3').value)||0, co2: parseFloat(document.getElementById('co2-3').value)||0, sp: parseFloat(document.getElementById('sp-3').value)||0 },
      { ebitda: parseFloat(document.getElementById('ebitda-ewig').value)||0, afa: parseFloat(document.getElementById('afa-ewig').value)||0, co2: parseFloat(document.getElementById('co2-ewig').value)||0, sp: parseFloat(document.getElementById('sp-ewig').value)||0 }
    ];

    let tbodyHTML = '';
    let fcfList = [];
    let envCostList = [];

    for (let i = 0; i < 4; i++) {
      const ebit = years[i].ebitda - years[i].afa;
      const fcf = ebit * (1 - seff);
      const envCost = years[i].co2 * years[i].sp * 1000; // Mio Tonnen * €/t * 1000 = TE
      
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

    // 3. Financial Value Calculation
    // FV = FCF_1 / (1+r) + FCF_2 / (1+r)^2 + FCF_3 / (1+r)^3 + FCF_ewig / (r * (1+r)^3)
    let fv_explicit = 0;
    for (let t = 1; t <= 3; t++) {
      fv_explicit += fcfList[t-1] / Math.pow(1 + rwacc, t);
    }
    const fv_perpetuity = fcfList[3] / (rwacc * Math.pow(1 + rwacc, 3));
    const financialValue = fv_explicit + fv_perpetuity;

    // 4. Environmental Value Calculation
    let ev_explicit = 0;
    for (let t = 1; t <= 3; t++) {
      ev_explicit += envCostList[t-1] / Math.pow(1 + rwacc, t);
    }
    const ev_perpetuity = envCostList[3] / (rwacc * Math.pow(1 + rwacc, 3));
    const environmentalValue = ev_explicit + ev_perpetuity;

    // 5. Social Value (if enabled)
    let socialValue = 0;
    if (enableSocial.checked) {
      const s123 = parseFloat(document.getElementById('social-123').value) || 0;
      const sewig = parseFloat(document.getElementById('social-ewig').value) || 0;
      let sv_exp = 0;
      for (let t = 1; t <= 3; t++) sv_exp += s123 / Math.pow(1 + rwacc, t);
      const sv_perp = sewig / (rwacc * Math.pow(1 + rwacc, 3));
      socialValue = sv_exp + sv_perp;
    }

    // 6. Integrated Value
    const integratedValue = financialValue - environmentalValue + socialValue;

    // Store for trainer
    currentValuation = {
      seff: seff * 100,
      fcf1: fcfList[0],
      fv: financialValue,
      ev: environmentalValue,
      iv: integratedValue
    };

    // Render Summary Outputs
    document.getElementById('res-fv').innerText = financialValue.toFixed(2) + ' TE';
    document.getElementById('res-fv-mio').innerText = (financialValue / 1000).toFixed(4) + ' Mio. €';

    document.getElementById('res-ev').innerText = environmentalValue.toFixed(2) + ' TE';
    document.getElementById('res-ev-mio').innerText = (environmentalValue / 1000).toFixed(4) + ' Mio. €';

    document.getElementById('res-iv').innerText = integratedValue.toFixed(2) + ' TE';
    document.getElementById('res-iv-mio').innerText = (integratedValue / 1000).toFixed(4) + ' Mio. €';

    // Render Step-by-Step Math Details
    document.getElementById('math-details').innerHTML = `
      <h4>Step 1: Effektiver Steuersatz</h4>
      <p>s_eff = 15% * (1 + 0.055) + 14% = <strong>${(seff*100).toFixed(4)}%</strong></p>
      
      <h4>Step 2: Free Cash Flows (NOPAT)</h4>
      <p>FCF_2023 = (1850 - 450) * (1 - ${(seff).toFixed(5)}) = <strong>${fcfList[0].toFixed(4)} TE</strong></p>
      <p>FCF_2024 = (2250 - 450) * (1 - ${(seff).toFixed(5)}) = <strong>${fcfList[1].toFixed(4)} TE</strong></p>
      <p>FCF_2025 = (1950 - 450) * (1 - ${(seff).toFixed(5)}) = <strong>${fcfList[2].toFixed(4)} TE</strong></p>
      <p>FCF_ewig = (2850 - 450) * (1 - ${(seff).toFixed(5)}) = <strong>${fcfList[3].toFixed(4)} TE</strong></p>
      
      <h4>Step 3: Barwert des Financial Value</h4>
      <p>FV_explizit = ${fcfList[0].toFixed(2)} / (1.0815)^1 + ${fcfList[1].toFixed(2)} / (1.0815)^2 + ${fcfList[2].toFixed(2)} / (1.0815)^3 = ${fv_explicit.toFixed(2)} TE</p>
      <p>FV_ewig = ${fcfList[3].toFixed(2)} / (0.0815 * 1.0815^3) = ${fv_perpetuity.toFixed(2)} TE</p>
      <p><strong>Financial Value Ges. = ${financialValue.toFixed(2)} TE</strong></p>

      <h4>Step 4: Barwert der Umwelt-Schadenkosten ($CO_2$)</h4>
      <p>EV_explizit = ${envCostList[0].toFixed(0)} / (1.0815)^1 + ${envCostList[1].toFixed(0)} / (1.0815)^2 + ${envCostList[2].toFixed(0)} / (1.0815)^3 = ${ev_explicit.toFixed(2)} TE</p>
      <p>EV_ewig = ${envCostList[3].toFixed(0)} / (0.0815 * 1.0815^3) = ${ev_perpetuity.toFixed(2)} TE</p>
      <p><strong>Environmental Value Ges. = ${environmentalValue.toFixed(2)} TE</strong></p>

      <h4>Step 5: Integrated Value</h4>
      <p>Integrated Value = ${financialValue.toFixed(2)} TE - ${environmentalValue.toFixed(2)} TE ${socialValue > 0 ? '+ ' + socialValue.toFixed(2) + ' TE (Social)' : ''} = <strong>${integratedValue.toFixed(2)} TE</strong></p>
    `;

    // Render Interpretation
    if (integratedValue < 0) {
      document.getElementById('res-interpretation').innerHTML = `
        <span class="color-red"><strong>⚠️ NEGATIVER INTEGRATED VALUE (${(integratedValue/1000).toFixed(2)} Mio. €):</strong></span><br>
        Der finanzielle Wert der Transaktion (${(financialValue/1000).toFixed(2)} Mio. €) wird durch die extrem hohen gesellschaftlichen Umweltschadenkosten durch $CO_2$ (${(environmentalValue/1000).toFixed(2)} Mio. €) vollständig vernichtet. Aus Sicht eines nachhaltigen Investors (Integrated Due Diligence) ist von der Übernahme in dieser Form abzuraten, sofern keine sofortigen Dekarbonisierungsmaßnahmen ergriffen werden.
      `;
    } else {
      document.getElementById('res-interpretation').innerHTML = `
        <span class="color-green"><strong>✅ POSITIVER INTEGRATED VALUE (${(integratedValue/1000).toFixed(2)} Mio. €):</strong></span><br>
        Der finanzielle Wert der M&A-Transaktion übersteigt die monetarisierten Umweltschadenkosten. Die Übernahme schafft auch unter Einbeziehung externer Nachhaltigkeitseffekte einen positiven Nettowert.
      `;
    }
  }

  // Initial Run
  calculateValuation();

  // Quiz / Trainer Logic
  let currentQuiz = {};
  const generateQuizBtn = document.getElementById('generate-quiz-btn');
  
  function generateQuiz() {
    const presetsKeys = ['ss25pt1', 'ss24pt1', 'ss24pt2'];
    const randomPreset = presetsKeys[Math.floor(Math.random() * presetsKeys.length)];
    const p = presets[randomPreset];

    // Slight randomization
    const mult = (0.9 + Math.random() * 0.2);
    const quizRwacc = (p.rwacc * mult).toFixed(4);
    const quizFk = Math.round(p.fk * mult);

    currentQuiz = {
      presetName: randomPreset,
      p: p,
      rwacc: parseFloat(quizRwacc)
    };

    document.getElementById('quiz-scenario-card').innerHTML = `
      <h3><i class="fa-solid fa-file-signature color-accent"></i> Prüfungsaufgabe (M&amp;A Valuations)</h3>
      <p>Ein Investor prüft die Übernahme eines Zielunternehmens. Folgende Eckdaten sind gegeben:</p>
      <ul>
        <li>EBITDA: t=1: ${p.ebitda[0]} TE | t=2: ${p.ebitda[1]} TE | t=3: ${p.ebitda[2]} TE | ab t=4: ${p.ebitda[3]} TE</li>
        <li>Abschreibungen: Jährlich konstant ${p.afa[0]} TE</li>
        <li>Steuersätze: KSt = ${p.sks}%, GewSt = ${p.sgew}%, SolZ = ${p.sz}%</li>
        <li>Kapitalkostensatz $r_{wacc} = \mathbf{${quizRwacc}\%}$</li>
        <li>CO2: t=1: ${p.co2[0]} Mio. t | t=2: ${p.co2[1]} Mio. t | t=3: ${p.co2[2]} Mio. t | ab t=4: ${p.co2[3]} Mio. t</li>
        <li>Schattenpreise: t=1: ${p.sp[0]} €/t | t=2: ${p.sp[1]} €/t | t=3: ${p.sp[2]} €/t | ab t=4: ${p.sp[3]} €/t</li>
      </ul>
    `;

    // Clear Feedback
    document.querySelectorAll('.feedback').forEach(f => { f.innerHTML = ''; f.className = 'feedback'; });
    document.querySelectorAll('.quiz-inputs-grid input').forEach(i => i.value = '');
  }

  generateQuizBtn.addEventListener('click', generateQuiz);
  generateQuiz();

  // Quiz Checking
  document.querySelectorAll('.check-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.target.dataset.target;
      const userVal = parseFloat(document.getElementById(`user-${target}`).value);
      const fb = document.getElementById(`feedback-${target}`);

      let correctVal = 0;
      let tol = 1.0; // Tolerance

      if (target === 'seff') {
        correctVal = currentValuation.seff;
        tol = 0.01;
      } else if (target === 'fcf1') {
        correctVal = currentValuation.fcf1;
        tol = 2.0;
      } else if (target === 'fv') {
        correctVal = currentValuation.fv;
        tol = 50.0;
      } else if (target === 'ev') {
        correctVal = currentValuation.ev;
        tol = 50.0;
      } else if (target === 'iv') {
        correctVal = currentValuation.iv;
        tol = 50.0;
      }

      if (isNaN(userVal)) {
        fb.innerHTML = 'Bitte einen Wert eingeben.';
        fb.className = 'feedback incorrect';
      } else if (Math.abs(userVal - correctVal) <= tol) {
        fb.innerHTML = `✅ Richtig! (${correctVal.toFixed(2)})`;
        fb.className = 'feedback correct';
      } else {
        fb.innerHTML = `❌ Falsch. Exakter Wert: ${correctVal.toFixed(2)}`;
        fb.className = 'feedback incorrect';
      }
    });
  });
});
