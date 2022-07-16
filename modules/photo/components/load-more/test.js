import React, { useState } from 'react'

const fetchNewsList = async () => { }

function LoadMore({ onLoadMore }) {
    const [pending, setPending] = useState(false)
    const [error, setError] = useState(null)
    const [page, setPage] = useState(2)

    const clickHandler = async function () {
        setPending(true)
        try {
            const response = await fetchNewsList({
                page,
                query: "...",
                // ...
            })
            if (response.data) {
                onLoadMore(response.data);
                setPage(prevPage => prevPage + 1)
            }
            else setError("error message")
        } catch (error) {
            setError(error.message)
        }
        setPending(false)
    }
    return (
        <>
            {pending && <h1>loading ...</h1>}
            {!pending && !error && <button onClick={clickHandler}>LoadMore</button>}
            {error && <h1>{error}</h1>}
        </>
    )
}

export default LoadMore