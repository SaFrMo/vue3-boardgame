import { Client } from 'boardgame.io/client'
import { _ClientImpl, ClientState } from 'boardgame.io/dist/types/src/client/client'
import { Plugin, reactive } from 'vue'
import { Vue3Boardgame } from './types'

export const boardgamePlugin: Plugin = {
    install(app, { autostart, client, options }: Vue3Boardgame.BoardgamePluginOptions) {
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
        const reactiveClient = reactive({ client: client })

        // prep reactive G
        const G = client.getInitialState().G
        const reactiveG = reactive({ G })

        // subscribe to client updates
        client.subscribe((state: ClientState<any>) => {
            if (!state) return
            reactiveG.G = state.G as any
        })

        // provide mixin
        app.mixin({
            computed: {
                client() {
                    return reactiveClient.client
                },
                G() {
                    return reactiveG.G
                },
                moves() {
                    return (this.client as _ClientImpl).moves
                }
            }
        })
    }
}
