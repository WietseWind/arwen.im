/* =========================================================================
   ARWEN.IM — een klein beetje JavaScript, meer niet.
   Geen dependencies, geen fetch, geen localStorage, geen cookies.
   Eén ding: tik op Loela of Bobbel en ze zeggen iets.
   ========================================================================= */

(function () {
  'use strict';

  // Wil de bezoeker zo min mogelijk beweging? Dan laten we het tekstballonnetje
  // langer staan, want het popt dan niet op maar staat er ineens.
  var rustig = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // De zinnetjes. Ze rouleren, zodat er bij elke tik iets anders komt.
  var zinnetjes = {
    loela: [
      'Hoehoe!',
      'Wat een mooie sterren vanavond.',
      'Ik kan bijna de tafel van 7!',
      'Bobbel maakt weer bubbels.',
      'Hallo Arwèn!'
    ],
    bobbel: [
      'Hihi, dat kietelt!',
      'Kijk eens, bubbels!',
      'Zwem je mee?',
      'Ik lach de hele dag.',
      'Hallo Arwèn!'
    ]
  };

  // Per dier onthouden we welk zinnetje aan de beurt is en welke timer loopt.
  var stand = {
    loela:  { index: 0, timer: null },
    bobbel: { index: 0, timer: null }
  };

  /* Laat één dier iets zeggen.
     knop = het element dat is aangetikt (de mascotte-knop of de pil-knop).
     We zoeken vanaf daar het dichtstbijzijnde tekstballonnetje. */
  function zegIets(naam, knop) {
    var lijst = zinnetjes[naam];
    if (!lijst) { return; }

    var plek = knop.closest('.mascotte-plek');
    // Staat de knop buiten de tekening (de pil onder een portret)?
    // Zoek dan het ballonnetje binnen dezelfde kaart.
    if (!plek) {
      var kaart = knop.closest('.vriend');
      plek = kaart ? kaart.querySelector('.mascotte-plek') : null;
    }
    if (!plek) { return; }

    var wolkje = plek.querySelector('.wolkje');
    if (!wolkje) { return; }

    var eigen = stand[naam];
    clearTimeout(eigen.timer);

    wolkje.textContent = lijst[eigen.index % lijst.length];
    eigen.index++;
    wolkje.classList.add('is-zichtbaar');

    // Het dier zelf reageert ook even.
    var tekening = plek.querySelector('.mascotte') || plek.querySelector('.portret');
    if (tekening) {
      var klassen = ['wiebelt'];
      if (naam === 'loela')  { klassen.push('knippert'); }
      if (naam === 'bobbel') { klassen.push('lacht'); }

      klassen.forEach(function (k) { tekening.classList.remove(k); });
      void tekening.offsetWidth; // hiermee begint de animatie opnieuw
      klassen.forEach(function (k) { tekening.classList.add(k); });

      setTimeout(function () {
        tekening.classList.remove('wiebelt', 'knippert');
      }, 700);
    }

    eigen.timer = setTimeout(function () {
      wolkje.classList.remove('is-zichtbaar');
      if (tekening) { tekening.classList.remove('lacht'); }
    }, rustig ? 5000 : 3000);
  }

  // Alles met data-mascotte="loela" of "bobbel" luistert mee:
  // de twee grote tekeningen in de hero en de twee knoppen bij de portretten.
  var knoppen = document.querySelectorAll('[data-mascotte]');

  Array.prototype.forEach.call(knoppen, function (knop) {
    knop.addEventListener('click', function () {
      zegIets(knop.getAttribute('data-mascotte'), knop);
    });
  });
})();
