// NAMA Integrated Valuation Master Trainer - Beginners-to-100% Logic

document.addEventListener('DOMContentLoaded', () => {
  // Preset Datasets with FULL ORIGINAL EXAM TEXTS
  const presets = {
    ss25pt1: {
      name: "Altklausur 1: Krombacher Brauerei / Hawesko GmbH (SoSe 2025 – 1. PT)",
      tag: "Sommersemester 2025 – 1. PT (Dr. Mies)",
      story: `Der CFO der Krombacher Brauerei prüft derzeit, gemeinsam mit einer amerikanischen Private-Equity-Gesellschaft den internationalen Weinimporteur Hawesko GmbH zu übernehmen. Da es für die Hawesko GmbH bislang keine detaillierten Zukunftsplanungen gibt, bittet der CFO Sie um eine überschlägige Bewertung des Unternehmens auf Basis einer Financial Due Diligence für die Jahre 2023 bis 2026.<br><br>
      <div class="table-responsive"><table class="data-table">
        <thead><tr><th>In TE</th><th>2023</th><th>2024</th><th>2025</th><th>ab 2026</th></tr></thead>
        <tbody>
          <tr><td>Periodenergebnis vor Zinsen, Steuern und Abschreibungen (EBITDA)</td><td>1.850</td><td>2.250</td><td>1.950</td><td>2.850</td></tr>
          <tr><td>Abschreibungen</td><td>450</td><td>450</td><td>450</td><td>450</td></tr>
        </tbody>
      </table></div><br>
      Das Fremdkapital beträgt in allen Geschäftsjahren konstant 6.500 TE, wobei der Buchwert dem Marktwert entspricht. Investitionen werden jeweils in Höhe der Abschreibungen vorgenommen. Die Hawesko GmbH verfügt über eine hochmoderne Logistik an der A3. Im Rahmen Ihrer Due Diligence erhalten Sie zudem den CO2-Verbrauch der Verwaltung, der Teilabfüllanlage sowie der Logistik als saldierten Wert auf Jahresbasis.<br><br>
      <div class="table-responsive"><table class="data-table">
        <thead><tr><th>Parameter</th><th>2023</th><th>2024</th><th>2025</th><th>ab 2026</th></tr></thead>
        <tbody>
          <tr><td>CO2 in Mio. Tonnen</td><td>7</td><td>9,5</td><td>9</td><td>10</td></tr>
          <tr><td>SchattenPreis laut TruePriceIndex</td><td>224</td><td>232</td><td>240</td><td>240</td></tr>
        </tbody>
      </table></div><br>
      Weiterhin sind folgende Angaben bekannt:<br>
      - Kapitalkostensatz r_WACC = 8,15%<br>
      - Körperschaftsteuer s_ks = 15%<br>
      - Fremdkapitalkosten r_Fk = 5,4%<br>
      - Abgeltungssteuer s_A = 25%<br>
      - Gewerbesteuer s_gew = 14%<br>
      - Solidaritätszuschlag s_z = 5,5%`,
      sks: 15, sgew: 14, sz: 5.5, rwacc: 8.15, rfk: 5.4, fk: 6500,
      ebitda: [1850, 2250, 1950, 2850],
      afa: [450, 450, 450, 450],
      co2: [7.0, 9.5, 9.0, 10.0],
      sp: [224, 232, 240, 240],
      hasSocial: false, social123: 0, socialEwig: 0
    },
    ss25pt2: {
      name: "Altklausur 2: Maschinenbau Müller GmbH (SoSe 2025 – 2. PT)",
      tag: "Sommersemester 2025 – 2. PT (Dr. Mies)",
      story: `Der CFO eines führenden Siegener Maschinenbauunternehmens prüft derzeit gemeinsam mit einer amerikanischen Private-Equity-Gesellschaft die Übernahme des internationalen Anbieters für Industrieanlagen, der Maschinenbau Müller GmbH. Da es für die Maschinenbau Müller GmbH bislang keine detaillierten Zukunftsplanungen gibt, bittet der CFO Sie um eine überschlägige Bewertung des Unternehmens auf Basis einer Financial Due Diligence für die Jahre 2023 bis 2026.<br><br>
      <div class="table-responsive"><table class="data-table">
        <thead><tr><th>In TE</th><th>2023</th><th>2024</th><th>2025</th><th>ab 2026</th></tr></thead>
        <tbody>
          <tr><td>Periodenergebnis vor Zinsen, Steuern und Abschreibungen</td><td>1.950</td><td>3.250</td><td>2.950</td><td>4.850</td></tr>
          <tr><td>Abschreibungen</td><td>450</td><td>450</td><td>450</td><td>450</td></tr>
        </tbody>
      </table></div><br>
      Das Fremdkapital beträgt in allen Geschäftsjahren konstant 6.500 TE, wobei der Buchwert dem Marktwert entspricht. Investitionen werden jeweils in Höhe der Abschreibungen vorgenommen. Die Müller GmbH verfügt über eine hochmoderne Fertigung an der A45. Im Rahmen Ihrer Due Diligence erhalten Sie zudem den CO2-Verbrauch der Verwaltung, der Teilabfüllanlage sowie der Logistik als saldierten Wert auf Jahresbasis.<br><br>
      <div class="table-responsive"><table class="data-table">
        <thead><tr><th>Parameter</th><th>2023</th><th>2024</th><th>2025</th><th>ab 2026</th></tr></thead>
        <tbody>
          <tr><td>CO2 in Mio. Tonnen</td><td>7</td><td>9,5</td><td>9</td><td>10</td></tr>
          <tr><td>SchattenPreis laut TruePriceIndex</td><td>224</td><td>232</td><td>240</td><td>240</td></tr>
        </tbody>
      </table></div><br>
      Weiterhin sind folgende Angaben bekannt:<br>
      - Kapitalkostensatz r_WACC = 8,15%<br>
      - Körperschaftsteuer s_ks = 15%<br>
      - Fremdkapitalkosten r_Fk = 5,4%<br>
      - Abgeltungssteuer s_A = 25%<br>
      - Gewerbesteuer s_gew = 14%<br>
      - Solidaritätszuschlag s_z = 5,5%`,
      sks: 15, sgew: 14, sz: 5.5, rwacc: 8.15, rfk: 5.4, fk: 6500,
      ebitda: [1950, 3250, 2950, 4850],
      afa: [450, 450, 450, 450],
      co2: [7.0, 9.5, 9.0, 10.0],
      sp: [224, 232, 240, 240],
      hasSocial: false, social123: 0, socialEwig: 0
    },
    ss24pt1: {
      name: "Altklausur 3: Siegerland Zwickelbier / Sauerland Brauerei (SoSe 2024 – 1. PT)",
      tag: "Sommersemester 2024 – 1. PT (Dr. Mies)",
      story: `Der CFO der Siegerland Zwickelbier AG erwägt, die Sauerland Privatbrauerei GmbH gemeinsam mit einer amerikanischen Private Equity Gesellschaft zu erwerben. Da für die Sauerland Privatbrauerei noch keine Planungen vorliegen, bittet Sie der CFO um eine überschlägige Wertermittlung auf Basis einer Financial Due Diligence für die Jahre 2021 bis 2024.<br><br>
      <div class="table-responsive"><table class="data-table">
        <thead><tr><th>In TE</th><th>2021</th><th>2022</th><th>2023</th><th>ab 2024</th></tr></thead>
        <tbody>
          <tr><td>Periodenergebnis vor Zinsen, Steuern und Abschreibungen</td><td>1.500</td><td>1.750</td><td>1.900</td><td>2.020</td></tr>
          <tr><td>Abschreibungen</td><td>240</td><td>240</td><td>240</td><td>240</td></tr>
        </tbody>
      </table></div><br>
      Das Fremdkapital beträgt in allen Geschäftsjahren konstant 8.000 TE, wobei der Buchwert dem Marktwert entspricht. Investitionen werden in Höhe der Abschreibungen getätigt. Die Sauerland Privatbrauerei verfügt über eine hochmoderne Brauanlage. Auf Basis Ihrer Due Diligence erhalten Sie zusätzlich den CO2-Verbrauch der Abfüllanlage, der Produktion und der Logistik als saldierten Wert auf Jahresbasis. Darüber hinaus engagiert sich die Sauerländer Privatbrauerei für die Renaturierung und Verbesserung der sozioökonomischen Faktoren der Regenwaldbewohner. Eine empirische Studie der Universität Siegen schätzt, dass dadurch die Lebensqualität der Anrainer stetig steigt.<br><br>
      <div class="table-responsive"><table class="data-table">
        <thead><tr><th>Parameter</th><th>2021</th><th>2022</th><th>2023</th><th>ab 2024</th></tr></thead>
        <tbody>
          <tr><td>CO2 in Mio. Tonnen</td><td>4</td><td>2,9</td><td>3</td><td>2,9</td></tr>
          <tr><td>SchattenPreis laut TruePriceIndex</td><td>224</td><td>232</td><td>240</td><td>240</td></tr>
          <tr><td>Quality life years added</td><td>6,2</td><td>6,4</td><td>6,7</td><td>6,8</td></tr>
          <tr><td>Schattenpreis, je 1000 EUR</td><td>105</td><td>105</td><td>105</td><td>105</td></tr>
        </tbody>
      </table></div><br>
      Weiterhin sind folgende Angaben bekannt:<br>
      - Kapitalkostensatz r_WACC = 7,3625%<br>
      - Körperschaftsteuer s_ks = 15%<br>
      - Fremdkapitalkosten r_Fk = 4%<br>
      - Abgeltungssteuer s_A = 25%<br>
      - Gewerbesteuer s_gew = 14%<br>
      - Solidaritätszuschlag s_z = 5,5%`,
      sks: 15, sgew: 14, sz: 5.5, rwacc: 7.3625, rfk: 4.0, fk: 8000,
      ebitda: [1500, 1750, 1900, 2020],
      afa: [240, 240, 240, 240],
      co2: [4.0, 2.9, 3.0, 2.9],
      sp: [224, 232, 240, 240],
      hasSocial: true, social123: 651, socialEwig: 714
    },
    ss24pt2: {
      name: "Altklausur 4: Siegerländer Genussmanufaktur / BordeauxToGo (SoSe 2024 – 2. PT)",
      tag: "Sommersemester 2024 – 2. PT (Dr. Mies)",
      story: `Der CFO der Siegerländer Genussmanufaktur erwägt, den Zukauf des internationalen Weinhandels BordeauxToGo LLC gemeinsam mit einer amerikanischen Private Equity Gesellschaft zu erwerben. Da für die BordeauxToGo LLC noch keine Planungen vorliegen, bittet Sie der CFO um eine überschlägige Wertermittlung auf Basis einer Financial Due Diligence für die Jahre 2021 bis 2024.<br><br>
      <div class="table-responsive"><table class="data-table">
        <thead><tr><th>In TE</th><th>2021</th><th>2022</th><th>2023</th><th>ab 2024</th></tr></thead>
        <tbody>
          <tr><td>Periodenergebnis vor Zinsen, Steuern und Abschreibungen</td><td>1.600</td><td>1.850</td><td>1.800</td><td>2.150</td></tr>
          <tr><td>Abschreibungen</td><td>300</td><td>300</td><td>300</td><td>300</td></tr>
        </tbody>
      </table></div><br>
      Das Fremdkapital beträgt in allen Geschäftsjahren konstant 7.000 TE, wobei der Buchwert dem Marktwert entspricht. Investitionen werden in Höhe der Abschreibungen getätigt. Die BordeauxToGo verfügt über eine hochmoderne Logistik an der A45. Auf Basis Ihrer Due Diligence erhalten Sie zudem den CO2-Verbrauch der Verwaltung, der Teilabfüllanlage sowie der Logistik als saldierten Wert auf Jahresbasis.<br><br>
      <div class="table-responsive"><table class="data-table">
        <thead><tr><th>Parameter</th><th>2021</th><th>2022</th><th>2023</th><th>ab 2024</th></tr></thead>
        <tbody>
          <tr><td>CO2 in Mio. Tonnen</td><td>4</td><td>2,9</td><td>3</td><td>2,9</td></tr>
          <tr><td>SchattenPreis laut TruePriceIndex</td><td>224</td><td>232</td><td>240</td><td>240</td></tr>
        </tbody>
      </table></div><br>
      Weiterhin sind folgende Angaben bekannt:<br>
      - Kapitalkostensatz r_WACC = 7,78%<br>
      - Körperschaftsteuer s_ks = 15%<br>
      - Fremdkapitalkosten r_Fk = 4%<br>
      - Abgeltungssteuer s_A = 25%<br>
      - Gewerbesteuer s_gew = 14%<br>
      - Solidaritätszuschlag s_z = 5,5%`,
      sks: 15, sgew: 14, sz: 5.5, rwacc: 7.78, rfk: 4.0, fk: 7000,
      ebitda: [1600, 1850, 1800, 2150],
      afa: [300, 300, 300, 300],
      co2: [4.0, 2.9, 3.0, 2.9],
      sp: [224, 232, 240, 240],
      hasSocial: false, social123: 0, socialEwig: 0
    }
  };

  const presetSelect = document.getElementById('preset-select');
  const examTagLabel = document.getElementById('exam-tag-label');
  const examStoryText = document.getElementById('exam-story-text');

  const inputSks = document.getElementById('input-sks');
  const inputSgew = document.getElementById('input-sgew');
  const inputSz = document.getElementById('input-sz');
  const inputRwacc = document.getElementById('input-rwacc');

  const enableSocial = document.getElementById('enable-social');
  const socialInputs = document.getElementById('social-inputs');
  const cardSvBox = document.getElementById('card-sv-box');

  const toggleMathBtn = document.getElementById('toggle-math-btn');
  const mathDetails = document.getElementById('math-details');
  const toggleSettingsBtn = document.getElementById('toggle-settings-btn');
  const settingsContent = document.getElementById('settings-content');

  if (toggleMathBtn) {
    toggleMathBtn.addEventListener('click', () => mathDetails.classList.toggle('hidden'));
  }
  if (toggleSettingsBtn) {
    toggleSettingsBtn.addEventListener('click', () => settingsContent.classList.toggle('hidden'));
  }

  // Handle Preset Changes
  presetSelect.addEventListener('change', loadPreset);

  function loadPreset() {
    const val = presetSelect.value;
    const p = presets[val];

    if (p) {
      examTagLabel.innerText = p.tag;
      examStoryText.innerHTML = p.story;

      inputSks.value = p.sks;
      inputSgew.value = p.sgew;
      inputSz.value = p.sz;
      inputRwacc.value = p.rwacc;

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
        cardSvBox.classList.remove('hidden');
        document.getElementById('social-123').value = p.social123;
        document.getElementById('social-ewig').value = p.socialEwig;
      } else {
        socialInputs.classList.add('hidden');
        cardSvBox.classList.add('hidden');
      }
    } else {
      examTagLabel.innerText = "Eigenes individuelles Szenario";
      examStoryText.innerHTML = "Du befindest dich im manuellen Modus. Passe die Parameter unten nach Belieben an!";
    }

    calculateAll();
  }

  const allInputs = document.querySelectorAll('#calc-form input');
  allInputs.forEach(inp => inp.addEventListener('input', calculateAll));
  enableSocial.addEventListener('change', () => {
    if (enableSocial.checked) {
      socialInputs.classList.remove('hidden');
      cardSvBox.classList.remove('hidden');
    } else {
      socialInputs.classList.add('hidden');
      cardSvBox.classList.add('hidden');
    }
    calculateAll();
  });

  function calculateAll() {
    const sks = parseFloat(inputSks.value) / 100 || 0.15;
    const sgew = parseFloat(inputSgew.value) / 100 || 0.14;
    const sz = parseFloat(inputSz.value) / 100 || 0.055;
    const rwacc = parseFloat(inputRwacc.value) / 100 || 0.0815;

    // 1. Effective Tax Rate
    const seff = sks * (1 + sz) + sgew;

    document.getElementById('step1-calc').innerHTML = `
      s_eff = s_ks * (1 + s_z) + s_gew<br>
      s_eff = 15.00% * (1 + 5.50%) + 14.00% = 15.825% + 14.00% = <strong>${(seff * 100).toFixed(4)}%</strong> (bzw. 0,29825)
    `;

    // 2. FCF & NOPAT per year
    const years = [
      { ebitda: parseFloat(document.getElementById('ebitda-1').value)||0, afa: parseFloat(document.getElementById('afa-1').value)||0, co2: parseFloat(document.getElementById('co2-1').value)||0, sp: parseFloat(document.getElementById('sp-1').value)||0 },
      { ebitda: parseFloat(document.getElementById('ebitda-2').value)||0, afa: parseFloat(document.getElementById('afa-2').value)||0, co2: parseFloat(document.getElementById('co2-2').value)||0, sp: parseFloat(document.getElementById('sp-2').value)||0 },
      { ebitda: parseFloat(document.getElementById('ebitda-3').value)||0, afa: parseFloat(document.getElementById('afa-3').value)||0, co2: parseFloat(document.getElementById('co2-3').value)||0, sp: parseFloat(document.getElementById('sp-3').value)||0 },
      { ebitda: parseFloat(document.getElementById('ebitda-ewig').value)||0, afa: parseFloat(document.getElementById('afa-ewig').value)||0, co2: parseFloat(document.getElementById('co2-ewig').value)||0, sp: parseFloat(document.getElementById('sp-ewig').value)||0 }
    ];

    let fcfList = [], envCostList = [];
    let tbodyHTML = '';

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
          <td>${years[i].ebitda.toFixed(0)} TE</td>
          <td>${years[i].afa.toFixed(0)} TE</td>
          <td>${ebit.toFixed(0)} TE</td>
          <td class="color-green"><strong>${fcf.toFixed(2)} TE</strong></td>
          <td class="color-red">${envCost.toFixed(2)} TE</td>
        </tr>
      `;
    }
    document.getElementById('fcf-table-body').innerHTML = tbodyHTML;

    // 3. Financial Value & Environmental Value
    let fv_exp = 0;
    for (let t = 1; t <= 3; t++) fv_exp += fcfList[t-1] / Math.pow(1 + rwacc, t);
    const fv_perp = fcfList[3] / (rwacc * Math.pow(1 + rwacc, 3));
    const financialValue = fv_exp + fv_perp;

    let ev_exp = 0;
    for (let t = 1; t <= 3; t++) ev_exp += envCostList[t-1] / Math.pow(1 + rwacc, t);
    const ev_perp = envCostList[3] / (rwacc * Math.pow(1 + rwacc, 3));
    const environmentalValue = ev_exp + ev_perp;

    let socialValue = 0;
    if (enableSocial.checked) {
      const s123 = parseFloat(document.getElementById('social-123').value) || 0;
      const sewig = parseFloat(document.getElementById('social-ewig').value) || 0;
      let sv_exp = 0;
      for (let t = 1; t <= 3; t++) sv_exp += s123 / Math.pow(1 + rwacc, t);
      const sv_perp = sewig / (rwacc * Math.pow(1 + rwacc, 3));
      socialValue = sv_exp + sv_perp;

      document.getElementById('res-sv').innerText = socialValue.toFixed(2) + ' TE';
      document.getElementById('res-sv-mio').innerText = (socialValue / 1000).toFixed(4) + ' Mio. €';
    }

    const integratedValue = financialValue - environmentalValue + socialValue;

    document.getElementById('res-fv').innerText = financialValue.toFixed(2) + ' TE';
    document.getElementById('res-fv-mio').innerText = (financialValue / 1000).toFixed(4) + ' Mio. €';

    document.getElementById('res-ev').innerText = environmentalValue.toFixed(2) + ' TE';
    document.getElementById('res-ev-mio').innerText = (environmentalValue / 1000).toFixed(4) + ' Mio. €';

    document.getElementById('res-iv').innerText = integratedValue.toFixed(2) + ' TE';
    document.getElementById('res-iv-mio').innerText = '(' + (integratedValue / 1000).toFixed(4) + ' Mio. €)';

    document.getElementById('math-details').innerHTML = `
      <strong>1. Financial Value (FV) Rechenweg:</strong><br>
      - Explizite Phase (t=1..3): ${fcfList[0].toFixed(2)} / (1+r)^1 + ${fcfList[1].toFixed(2)} / (1+r)^2 + ${fcfList[2].toFixed(2)} / (1+r)^3 = ${fv_exp.toFixed(2)} TE<br>
      - Ewige Rente (ab t=4): ${fcfList[3].toFixed(2)} / (${(rwacc*100).toFixed(2)}% * (1+r)^3) = ${fv_perp.toFixed(2)} TE<br>
      - <strong>Summe FV = ${financialValue.toFixed(2)} TE (${(financialValue/1000).toFixed(4)} Mio. €)</strong><br><br>

      <strong>2. Environmental Value (EV) Rechenweg:</strong><br>
      - Explizite Phase (t=1..3): ${envCostList[0].toFixed(2)} / (1+r)^1 + ${envCostList[1].toFixed(2)} / (1+r)^2 + ${envCostList[2].toFixed(2)} / (1+r)^3 = ${ev_exp.toFixed(2)} TE<br>
      - Ewige Rente (ab t=4): ${envCostList[3].toFixed(2)} / (${(rwacc*100).toFixed(2)}% * (1+r)^3) = ${ev_perp.toFixed(2)} TE<br>
      - <strong>Summe EV = ${environmentalValue.toFixed(2)} TE (${(environmentalValue/1000).toFixed(4)} Mio. €)</strong>
    `;

    // 5. Interpretation for Part d)
    if (integratedValue < 0) {
      document.getElementById('res-interpretation').innerHTML = `
        Der errechnete rein finanzielle Unternehmenswert (Financial Value) beträgt <strong>${(financialValue/1000).toFixed(4)} Mio. €</strong> (${financialValue.toFixed(2)} TE). Unter Berücksichtigung der externen Umweltschadenkosten (Environmental Value) von <strong>${(environmentalValue/1000).toFixed(4)} Mio. €</strong> (${environmentalValue.toFixed(2)} TE) ergibt sich ein <strong>negativer Integrated Value von ${(integratedValue/1000).toFixed(4)} Mio. €</strong> (${integratedValue.toFixed(2)} TE).<br><br>
        <span class="color-red"><strong>M&amp;A-Empfehlung:</strong></span> Aus Sicht einer Integrated Financial &amp; ESG Due Diligence wird von der Übernahme zum rein finanziellen Kaufpreis dringend abgeraten, da das Unternehmen netto gesellschaftlichen Schaden verursacht und hohe Dekarbonisierungsinvestitionen erforderlich sind.
      `;
    } else {
      document.getElementById('res-interpretation').innerHTML = `
        Der errechnete finanzielle Unternehmenswert (Financial Value) beträgt <strong>${(financialValue/1000).toFixed(4)} Mio. €</strong> (${financialValue.toFixed(2)} TE). Nach Abzug der externen CO2-Umweltschadenkosten (Environmental Value) von <strong>${(environmentalValue/1000).toFixed(4)} Mio. €</strong> (${environmentalValue.toFixed(2)} TE) verbleibt ein <strong>positiver Integrated Value von ${(integratedValue/1000).toFixed(4)} Mio. €</strong> (${integratedValue.toFixed(2)} TE).<br><br>
        <span class="color-green"><strong>M&amp;A-Empfehlung:</strong></span> Die Übernahme schafft auch unter Berücksichtigung externer Effekte nachhaltigen Wert. Der Integrated Value stellt die absolute Obergrenze für eine nachhaltige Kaufpreisverhandlung dar.
      `;
    }
  }

  // Initial load
  loadPreset();
});
