import {writable} from "svelte/store";

export const txPool = writable([])

const fetchMempool = async () => {
    const response = await fetch('http://blocksum.org:11898/json_rpc', {
        method: 'POST',
        cache: 'no-cache',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
            jsonrpc: "2.0",
            id: "test",
            method: "f_on_transactions_pool_json",
            params: {}
        })
    });
    let data = await response.json();
    txPool.set(data.result.transactions)
}

setInterval(fetchMempool, 1000 * 10)
fetchMempool()