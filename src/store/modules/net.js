export default {
    namespaced: true,
    state: {
        items: Set,
        amount: 0
    },
    actions: {
        getAllItems(ctx) {
            fetch('http://localhost:8080/bd.json')
                .then(response => response.json())
                .then(result => transformToSet(result))
                .then(set => {
                    ctx.commit('updateSet', { type: 'items', data: set});
                    let amount = countAmountAllItem(set);
                    ctx.commit('updateAmount', { type: 'amount', data: amount});
                    let newSet = createNewSet(set, amount);
                    let filter = filterNewSet(newSet);
                    ctx.commit('updateSet', { type: 'items', data: filter});
                })
            
            function transformToSet(result) {
                let setItems = new Set(result['taskThree']);
                return setItems
            }

            function countAmountAllItem(items) {
                let amount = 0;
                items.forEach(item => {
                    amount += item['Трафик'];
                });
                return amount
            }

            function createNewSet(items, amount) {
                let newSet = new Set();
                items.forEach(item => {
                    newSet.add({
                        'Трафик': item['Трафик'],
                        '%': Math.ceil(item['Трафик'] / amount * 100)
                    })
                });
                return newSet
            }

            function filterNewSet(items) {
                items.forEach(item => {
                    if (item['%'] <= 2 ) items.delete(item)
                });
                return items
            }
        }
    },
    mutations: {
        updateSet(state, { type, data }) {
            state[type] = data;
            // for (let [key, value] of state['items'].entries()) console.log(key);
        },
        updateAmount(state, { type, data }) {
            state[type] = data
        }
    },
    getters: {
        getAmount: state => state.amount,
        getSet: state => Array.from(state.items)
    }
}
