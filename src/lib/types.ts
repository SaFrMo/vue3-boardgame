import { Client, ClientOpts, _ClientImpl } from 'boardgame.io/dist/types/src/client/client'

declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        client: typeof Client
        moves: Record<string, (...args: any) => void>

        // USER ACTION REQUIRED: Make sure to implement G in your project. 
        // See example below.
    }
}

// example G declaration (my-boardgame-types.ts):
/*
interface MyGameState {
    // ...
}

declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        G: MyGameState
    }
}
*/

export namespace Vue3Boardgame {
    export interface BoardgamePluginOptions {
        /** Whether or not to start the client automatically. If `false`, you must call `.start()` yourself on your game client. Default `true`. */
        autostart?: boolean
        /** Provide `client` if you're initializing the client yourself. Ignores `options` if provided. */
        client?: _ClientImpl
        /** Provide options to let the plugin create the client automatically. */
        options?: ClientOpts
        /** Whether or not to register properties as mixins. Default true. */
        useMixin?: boolean
        /** Whether or not to register properties using provide. Default false. */
        useProvide?: boolean
    }
}