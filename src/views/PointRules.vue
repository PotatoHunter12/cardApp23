<template>
    <div class="rules-container">
      <button class="translate-btn" @click="toggleLanguage">
        {{ isEnglish ? "SLO" : "ENG" }}
      </button>
      <h1>{{ isEnglish ? "How to Count Points in Tarok" : "Kako šteti točke v Taroku" }}</h1>
      <div>
        <!-- The Scoring -->
        <h2>{{ isEnglish ? "The Scoring" : "Točkovanje" }}</h2>
        <p>
          {{ isEnglish
            ? "A cumulative score is kept on paper. In most cases, only the declarer (and their partner, if any) score. Solidarity of partnerships applies, meaning if the declarer has a partner, both members win or lose the same amount."
            : "Skupna ocena se vodi na papirju. V večini primerov točke beleži le napovedovalec (in njegov partner, če ga ima). Velja načelo solidarnosti partnerjev, kar pomeni, da oba člana zmagata ali izgubita enako število točk." }}
        </p>
        <ul>
          <li>
            {{ isEnglish
              ? "Klop: Everyone scores separately."
              : "Klop: Vsak igralec beleži točke posebej." }}
          </li>
          <li>
            {{ isEnglish
              ? "The penalty for losing the Mond applies only to the player who lost it."
              : "Kazni za izgubo Monda se nanašajo le na igralca, ki ga je izgubil." }}
          </li>
          <li>
            {{ isEnglish
              ? "Penalties for revoking, misdealing, etc., apply only to the culprit."
              : "Kazni za napačno igranje, napačno deljenje itd., se nanašajo le na kršitelja." }}
          </li>
        </ul>
        <p>
          {{ isEnglish
            ? "The point value of the contract is added to the player's score if they win or subtracted if they lose. For normal contracts, this value is increased by the card point difference, calculated as:"
            : "Vrednost pogodbe se prišteje k igralčevim točkam, če zmaga, ali odšteje, če izgubi. Pri običajnih pogodbah se ta vrednost poveča za razliko v točkah kart, kar se izračuna:" }}
        </p>
        <p>
          {{ isEnglish
            ? "Difference = (Card points won - 35), rounded to the nearest 5."
            : "Razlika = (Točke kart - 35), zaokroženo na najbližjih 5." }}
        </p>
  
        <!-- Contracts -->
        <h2>{{ isEnglish ? "Contracts and Bonuses" : "Pogodbe in Bonusi" }}</h2>
        <ul>
          <li>
            {{ isEnglish
              ? "Three, Two, One: Declarer calls a king as a partner and exchanges cards with the talon. Winning condition: 36 card points."
              : "Tri, Dve, Ena: Napovedovalec pokliče kralja za partnerja in zamenja karte s talonom. Pogoj za zmago: 36 točk kart." }}
          </li>
          <li>
            {{ isEnglish
              ? "Solo contracts: Declarer plays alone and exchanges cards with the talon. Bonus points are added."
              : "Solo pogodbe: Napovedovalec igra sam in zamenja karte s talonom. Dodajo se bonus točke." }}
          </li>
          <li>
            {{ isEnglish
              ? "Berač (Beggar): Declarer plays alone and takes no tricks."
              : "Berač: Napovedovalec igra sam in ne sme vzeti nobene štih." }}
          </li>
          <li>
            {{ isEnglish
              ? "Colour Valat: Declarer wins all tricks, with trumps acting as an ordinary suit."
              : "Barvni Valat: Napovedovalec zmaga vse štih, pri čemer aduti delujejo kot običajna barva." }}
          </li>
          <li>
            {{ isEnglish
              ? "Solo without: Declarer plays alone and does not exchange cards with the talon."
              : "Solo brez: Napovedovalec igra sam in ne zamenja kart s talonom." }}
          </li>
        </ul>
  
        <!-- Radli -->
        <h2>{{ isEnglish ? "Radli (Little Wheels)" : "Radlci (Majhna kolesca)" }}</h2>
        <p>
          {{ isEnglish
            ? "Radli are added to the scoresheet for specific events like Klop, Beggar, or Valat. They double scores but incur penalties if not annulled by the end of the game."
            : "Radlci se dodajo k listu točkovanja za posebne dogodke, kot so Klop, Berač ali Valat. Podvojijo točke, vendar povzročijo kazni, če jih do konca igre ne izbrišemo." }}
        </p>
      </div>
      <button class="btn" @click="navigateToExample">
      {{ isEnglish ? "View Example" : "Poglej Primer" }}
    </button>
    </div>
    <button class="back-btn" @click="goBack">{{ isEnglish ? "BACK" : "NAZAJ" }}</button>
    
  </template>
  
  <script>
  export default {
    data() {
      return {
        isEnglish: true, // Tracks the current language
      };
    },
    methods: {
      toggleLanguage() {
        this.isEnglish = !this.isEnglish;
      },
      navigateToExample() {
      this.$router.push({ name: "Example" });
        },
        goBack() {
        this.$router.push({ name: 'gameSelect' });
        },
    },
  };
  </script>
  
  <style scoped>
  .rules-container {
  background-color: #f4f4f9;
  height: 90vh; /* Full viewport height */
  display: flex;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  flex-direction: column;
  padding: 20px;
  font-family: 'Comic Sans MS', 'Comic Sans', cursive; /* Apply Comic Sans font */
  position: relative;
  color: #333;
}
ul {
  list-style-type: square;
  margin-top: 10px;
  padding-left: 20px;
  font-family: 'Comic Sans MS', 'Comic Sans', cursive; /* Apply Comic Sans font */
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  font-family: 'Comic Sans MS', 'Comic Sans', cursive; /* Apply Comic Sans font */
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  font-family: 'Comic Sans MS', 'Comic Sans', cursive; /* Apply Comic Sans font */
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
  font-family: 'Comic Sans MS', 'Comic Sans', cursive; /* Apply Comic Sans font */
}
.translate-btn:hover {
  background-color: #ff4757;
}
.back-btn {
  background-color: #5a5a5a;
  display: block;
  margin: 30px auto 0 auto;
  width: fit-content;
}
.back-btn:hover {
  background-color: #424242;
  transform: scale(1.05);
}

.btn {
  display: inline-block;
  padding: 10px 15px;
  
  border: none; /* Correct color */
  color: white;
  background-color: #ff4757;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  font-family: 'Comic Sans MS', 'Comic Sans', cursive; /* Apply Comic Sans font */
  text-transform: uppercase;
  transition: background-color 0.3s, transform 0.2s;
}
.btn:hover {
  background-color: #e33d4f; /* Slightly darker hover color */
  transform: scale(1.05); /* Slight zoom effect on hover */
}


h1, h2, p, li {
  font-family: 'Comic Sans MS', 'Comic Sans', cursive; /* Apply Comic Sans font */
}

  </style>
  