# Vue 3 + boardgame.io

This is a plugin to make developing a Vue 3/[boardgame.io](https://boardgame.io/) app easier.

## Installation

`npm install vue3-boardgame`

Then, [create your Vue 3 app](https://v3.vuejs.org/guide/instance.html) and install:

```js
import { createApp } from 'vue'
import App from 'YourApp.vue'
import { boardgamePlugin } from 'vue3-boardgame'

const app = createApp(App)
app.use(boardgamePlugin, { 
    // select one of the following:
    options: {},    // an object describing your client options
                    // this will be fed directly into the boardgame.io/Client method
                    // see https://boardgame.io/documentation/#/tutorial?id=defining-a-game
    // OR
    client: {},     // an already-initialized boardgame.io client

    // other options
    autostart: true,    // whether or not to start the client automatically
                        // if false, you must start the client yourself
                        // default true
})
app.mount('#app')

```

## Usage

From there, each component in your app has access to:

* `G`: a reactive object describing the current game state
* `client`: a reactive object describing the client
* `moves`: an object containing all the moves of your game

For example, in a `.vue` file:

```html
<template>
    <div class="player-hand">
        <SingleCard v-for="(card, i) in G.playerHand" :card="card">
    </div>

    <button @click="playMove">Play Move</button>
</template>

<script>
export default {
    mounted(){
        console.log(this.G)
    },
    methods: {
        playMove(){
            this.moves.playMove()
        }
    }
}
</script>

```

## Typescript

For the best Typescript experience, add the following code in your types file (for example, `src/game-types.d.ts`):

```js
declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        G: YourGameStateType
    }
}
```

This way you'll be able to access `this.G` from any component and see autocompletion, types, etc.