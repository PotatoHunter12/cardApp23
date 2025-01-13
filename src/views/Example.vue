<template>
  <div class="example-container">
    <button class="translate-btn" @click="toggleLanguage">
      {{ isEnglish ? "SLO" : "ENG" }}
    </button>
    <h1>{{ isEnglish ? "Example Score Sheet" : "Primer lista točkovanja" }}</h1>
    <p>{{ isEnglish ? exampleText.introEnglish : exampleText.introSlovene }}</p>
    <table>
      <thead>
        <tr>
          <th>{{ isEnglish ? "Players" : "Igralci" }}</th>
          <th>Ana</th>
          <th>Boris</th>
          <th>Cilka</th>
          <th>David</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ isEnglish ? "Radli" : "Radlci" }}</td>
          <td>xoo</td>
          <td>ooo</td>
          <td>xoo</td>
          <td>xoo</td>
        </tr>
        <tr>
          <td>1</td>
          <td>+40</td>
          <td></td>
          <td>+40</td>
          <td></td>
        </tr>
        <tr>
          <td>2</td>
          <td></td>
          <td></td>
          <td>-30</td>
          <td>-70</td>
        </tr>
        <tr>
          <td>3</td>
          <td></td>
          <td>+70</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>4</td>
          <td></td>
          <td></td>
          <td>+120</td>
          <td></td>
        </tr>
        <tr>
          <td>5</td>
          <td></td>
          <td></td>
          <td>+100</td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>+180</td>
          <td>+210</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>6</td>
          <td>+140</td>
          <td></td>
          <td>+60</td>
          <td></td>
        </tr>
        <tr>
          <td>7</td>
          <td>0</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>8</td>
          <td></td>
          <td></td>
          <td>+90</td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <p class="example-text">
      {{ isEnglish ? exampleText.detailsEnglish : exampleText.detailsSlovene }}
    </p>
    <button class="btn back-btn" @click="goBack">{{ isEnglish ? "BACK" : "NAZAJ" }}</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isEnglish: true,
      exampleText: {
        introEnglish: `After a few games, the score sheet might look like this:`,
        introSlovene: `Po nekaj igrah bi lahko list točkovanja izgledal takole:`,
        detailsEnglish: `
            Let's see what happened:
  
- In the first game Cilka plays 1, calls Ana, and wins by 10, so their score is 30 (for one) + 10 (the difference) = 40.
- In the second game David plays 2, calls Cilka and announces pagat ultimo. Unfortunately, they lose the pagat and the game by 0 points, 20 (for two) + 50 (the announced pagat ultimo) = 70 points are subtracted from their scores.
- In the third game, Boris plays beggar (berač) and wins, so his score is 70 and everybody gets a radl.
- In the fourth game, Cilka plays solo 3, and announces the trula. She wins by 15 and gets the trula. She has some radli, so her score is 40 (for solo three) + 15 (the difference) + 20 (the announced trula), everything * 2 (the radl) = 150. One of her radli is annulled.
- In the fifth game, Ana plays 1 and calls Boris, who announces king ultimo. During the game, Cilka loses her mond to Ana's škis, so 20 points are subtracted from Cilka's score. Ana and Boris win the game by 10 and also win trula, so their score is 30 (for one) + 10 (the difference) + 20 (the announced king ultimo) + 10 (the trula), everything * 2 (Ana's radl) = 140. One of Ana's radli is annulled.
- In the sixth game, Cilka plays 2 and calls Ana. They win only 34 points, so their score is reduced by 20 (for two) + 0 (the difference), everything * 2 (Cilka's radl) = 40. Cilka's radli remain as they are.
- In the seventh game, Ana plays beggar and loses, so her score is 70 (for the beggar) * 2 (the radl) = 140 and everybody gets another radl.
- Before the eighth game Ana's score is 0, so compulsory klop is played. However, after the cards are dealt, David decides his cards are too good, so he plays "solo without" and wins. His score is increased by 80 (for solo without) * 2 (the radl) = 160 and everybody gets another radl.
  
Usually, no blank lines are left; each player's scores are written in the first available space in the column, so the scores are not aligned across the page for each hand, as in the diagram.
  
As already described, the game is traditionally ended by means of a škis round. When the last hand has been played, points are subtracted from the players' scores for any uncancelled radli (100 points per radl), and the winner is announced.
          `,
          detailsSlovene: `
            Poglejmo, kaj se je zgodilo:
  
- V prvi igri Cilka igra 1, pokliče Ano in zmaga za 10, zato je njen rezultat 30 (za eno) + 10 (razlika) = 40.
- V drugi igri David igra 2, pokliče Cilko in napove pagat ultimo. Na žalost izgubijo pagat in igro za 0 točk, 20 (za dve) + 50 (napovedan pagat ultimo) = 70 točk se odšteje od njihovih rezultatov.
- V tretji igri Boris igra berač (berač) in zmaga, tako da je njegov rezultat 70, vsi pa dobijo radl.
- V četrti igri Cilka igra solo 3 in napove trulo. Zmaga za 15 in dobi trulo. Ima nekaj radljev, zato je njen rezultat 40 (za solo tri) + 15 (razlika) + 20 (napovedana trula), vse * 2 (radl) = 150. Eden od njenih radljev je izničen.
- V peti igri Ana igra 1 in pokliče Borisa, ki napove king ultimo. Med igro Cilka izgubi svoj mond proti Aninemu škisu, zato se Cilki odšteje 20 točk. Ana in Boris zmagata igro za 10 in prav tako osvojita trulo, zato je njun rezultat 30 (za eno) + 10 (razlika) + 20 (napovedan king ultimo) + 10 (trula), vse * 2 (Anin radl) = 140. Eden od Aninih radljev je izničen.
- V šesti igri Cilka igra 2 in pokliče Ano. Zmagata le s 34 točkami, zato se njun rezultat zmanjša za 20 (za dve) + 0 (razlika), vse * 2 (Cilkin radl) = 40. Cilkini radlji ostanejo nespremenjeni.
- V sedmi igri Ana igra berač in izgubi, zato je njen rezultat 70 (za berač) * 2 (radl) = 140, vsi pa dobijo še en radl.
- Pred osmo igro ima Ana rezultat 0, zato se igra obvezni klop. Ko pa so karte razdeljene, se David odloči, da so njegove karte preveč dobre, zato igra "solo brez" in zmaga. Njegov rezultat se poveča za 80 (za solo brez) * 2 (radl) = 160, vsi pa dobijo še en radl.
  
Običajno ni praznih vrstic; rezultati vsakega igralca so zapisani v prvem razpoložljivem prostoru v stolpcu, zato rezultati za vsako igro niso poravnani po strani, kot je prikazano na diagramu.
  
Kot že opisano, se igra tradicionalno zaključi s škis krogom. Ko je odigrana zadnja igra, se od rezultatov igralcev odštejejo točke za vse neodpravljene radlje (100 točk za vsak radl), in razglasi se zmagovalec.
          `,
      },
    };
  },
  methods: {
    toggleLanguage() {
      this.isEnglish = !this.isEnglish;
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.example-container {
  background-color: #f4f4f9;
  height: 140vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
  position: relative;
  color: #333;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.translate-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  font-size: 14px;
  border: none;
  background-color: #ff4757;
  color: white;
  border-radius: 3px;
  cursor: pointer;
}

.translate-btn:hover {
  background-color: #e33d4f;
}

.btn {
  display: inline-block;
  padding: 10px 15px;
  border: none;
  background-color: #ff4757;
  color: white;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;
  margin-top: 20px;
}

.btn:hover {
  background-color: #e33d4f;
  transform: scale(1.05);
}
.example-text {
  margin-top: 20px;
  white-space: pre-wrap; /* Preserves line breaks */
  font-family: 'Comic Sans MS', 'Comic Sans', cursive; /* Apply Comic Sans font */
  font-size: 14px;
  line-height: 1.5;
}

.back-btn {
  background-color: #ff4757;
  display: block;
  margin: 30px auto 0 auto;
  width: fit-content;
}
</style>
