import { Client } from 'boardgame.io/client'
import { _ClientImpl, ClientState } from 'boardgame.io/dist/types/src/client/client'
import { Plugin, reactive, ref, Ref } from 'vue'
import { Vue3Boardgame } from './types'

export const boardgamePlugin: Plugin = {
    install(app, { autostart, client, options, useMixin, useProvide }: Vue3Boardgame.BoardgamePluginOptions) {
        useMixin = useMixin ?? true
        useProvide = useProvide ?? false

        // create client if we have options
        if (!client && options) {
            client = Client(options)
        }

        if (!client) {
            console.warn('Client not created. Include `client` or `options` when installing the plugin.')
            return
        }

        // start client if needed
        if (autostart === undefined || autostart) {
            client.start()
        }

        // prep reactive client
        const reactiveClient = ref(client)

        const initialState = reactiveClient.value.getInitialState()

        // prep reactive G
        const G = initialState.G
        // const reactiveG = reactive({ G })
        const reactiveG = ref(G)

        // prep reactive ctx
        const ctx = initialState.ctx
        const reactiveCtx = ref(ctx)

        // subscribe to client updates
        client.subscribe((state: ClientState<any>) => {
            if (!state) return
            reactiveG.value = state.G
            reactiveCtx.value = state.ctx
        })

        // global mixin
        if (useMixin) {
            app.mixin({
                computed: {
                    client() {
                        return reactiveClient
                    },
                    ctx() {
                        return reactiveCtx
                    },
                    G() {
                        return reactiveG
                    },
                    moves() {
                        return (this.client as Ref<_ClientImpl>).value.moves
                    }
                }
            })
        }

        // provude
        if (useProvide) {
            app.provide('client', reactiveClient)
            app.provide('ctx', reactiveCtx)
            app.provide('G', reactiveG)
            app.provide('moves', reactiveClient.value.moves)
        }
    }
}
