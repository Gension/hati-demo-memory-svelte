<script>
  import { onMount } from "svelte";
  import Card from "./lib/Card.svelte";
  import { cheat, nbMatches } from "./lib/store/cards";

  const nbCards = 36;
  let cards = [];

  const genCards = () => {
    for (let i = 0; i < nbCards; i++) {
      cards = [...cards, {
        position: i,
        offset: i >= nbCards/2 ?  i - nbCards/2 : i
      }];
      console.log('called');
    }
    console.log("cards", cards);
  };

  nbMatches.subscribe(val => {
    if(val === nbCards) {
      alert("C'est gagné !")
    }
  })

  const doCheat = () => {
    if(!$cheat) {
      $cheat = true;
      setTimeout(() => $cheat = false, 5000);
    }
  }

  onMount(() => {
    genCards();
  });

</script>

<!-- Entête -->
<header>
  <h1>Memory</h1>
  <button id="cheat" on:click={doCheat}>Cheat</button>
</header>
<main>
  <div class="container">
    <div class="game-box">
      <div class="game-progress-holder" />
      <div class="game-holder">
        {#each cards as card}
          <Card position={card.position} offset={card.offset} />
        {/each}
      </div>
    </div>
  </div>
</main>

<style>
</style>
