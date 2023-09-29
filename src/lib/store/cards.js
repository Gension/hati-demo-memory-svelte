import { writable } from "svelte/store";

export const cardsFlipped = writable([]);

export const nbMatches = writable(0);

export const cheat = writable(false);

export const onWin = writable(() => alert("C'est gagné !"));