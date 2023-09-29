<script>
    import { cardsFlipped, cheat, nbMatches } from "./store/cards";

    export let position;
    export let offset;

    let flipped = false;
    let matched = false;

    const flip = () => {
        console.log("called", flipped);
        if (flipped) return;

        if ($cardsFlipped.length < 2) {
            $cardsFlipped = [...$cardsFlipped, offset];
            flipped = true;
            console.log($cardsFlipped);

            if ($cardsFlipped.length === 2) {
                console.log("two are flipped", $cardsFlipped[0], $cardsFlipped[1]);
                if ($cardsFlipped[0] === $cardsFlipped[1]) {
                    $nbMatches += 2;
                    console.log("A match was found", $nbMatches);
                }
            }
        }
    };

    cardsFlipped.subscribe((value) => {
        if (value.length == 2) {
            if($cardsFlipped[0] === $cardsFlipped[1] && $cardsFlipped[0] == offset)
            {
                matched = true;
            }
            setTimeout(() => {
                flipped = false;
                $cardsFlipped = [];
            }, 1000);
        }
    });

    cheat.subscribe(val => {
        flipped = val;
    })
</script>

<div
    role="button"
    tabindex={position}
    on:keydown={() => {}}
    on:click={flip}
    id={`card-${position}`}
    class={`game-card game-card-${offset}`}
    class:flipped
    class:matched
>
    <div class="game-card-back" />
    <div class="game-card-front" 
    style={`background-position-y: ${100 * offset}px`}/>
</div>

<style>
    .game-card {
        position: relative;
        width: 100px;
        height: 100px;
        perspective: 1000px;
    }

    .game-card.flipped .game-card-back,
    .game-card.matched .game-card-back {
        transform: rotateY(180deg);
    }

    .game-card.flipped .game-card-front,
    .game-card.matched .game-card-front {
        transform: rotateY(360deg);
    }
    .game-card-front,
    .game-card-back {
        position: absolute;
        width: 100%;
        height: 100%;
        -webkit-backface-visibility: hidden; /* Pour apple qui ne fait pas comme les autres */
        backface-visibility: hidden;
        transition: transform 0.8s;
    }

    .game-card-back {
        background-image: url("../assets/images/back.png");
        height: 100%;
        width: 100%;
        border-radius: 20px;
    }

    .game-card-front {
        background-image: url("../assets/images/cards.png");
        transform: rotateY(180deg);
        height: 100%;
        width: 100%;
        border-radius: 20px;
    }
</style>
