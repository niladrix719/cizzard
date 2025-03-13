import { createApp, h, hFragment, hString } from "https://unpkg.com/cizzard@1.1.0/dist/cizzard.js"

const state = 0;

const view = (state, emit) => {
  return hFragment([
    h('button', {
      "on": {
        "click": () => {
          emit('plus', 1)
        }
      },
    }, [
      hString('+')
    ])
    ,
    h('span', {}, [hString(state)]),
    h('button', {
      "on": {
        "click": () => {
          emit('minus', 1)
        }
      },
    }, [
      hString('-')
    ])
  ]);
}

const reducers = {
  'plus': (state, payload) => state + payload,
  'minus': (state, payload) => state - payload
}

const app = createApp({ state, view, reducers });

app.mount(document.body);
