import {useEffect, useState} from "react";

function App() {
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([]);
    const [amount, setAmount] = useState(0);
    const [selectedCoin, setSelectedCoin] = useState(null);
    useEffect(() => {
        fetch('https://api.coinpaprika.com/v1/tickers')
            .then((response) => response.json())
            .then((json) => {
                setCoins(json);
                setSelectedCoin(json[0]);
                setLoading(false);
            });
    }, []);

    const onChange = (event) => {
        setAmount(event.target.value);
    };

    const handleSelectChange = (event) => {
        const coinId = event.target.value;
        setSelectedCoin(coins.find(coin => coin.id === coinId));
    };

    return (
        <div>
            <h1>The Coins! {loading ? null : `(${coins.length})`}</h1>
            {loading ? (
                <strong>Loading...</strong>
            ) : (
                <>
                    <input onChange={onChange} value={amount} type={'number'}/>$
                    / {selectedCoin ? amount / selectedCoin.quotes.USD.price + ` (${selectedCoin.symbol})` : null}
                    <br/>
                    <select onChange={handleSelectChange}>
                        {coins.map((coin) => (
                            <option key={coin.id} value={coin.id}>
                                {coin.name} ({coin.symbol}): {coin.quotes.USD.price} USD
                            </option>
                        ))}
                    </select>
                </>
            )}
        </div>
    );
}

export default App;
