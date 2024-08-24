import { useState, memo } from 'react'

const classes = {
    0: 'square',
    1: 'circle',
    2: 'diamond'
}

const Line = memo(function Line({index, lineIndex}: {index: number, lineIndex: number}) {
    const getFigures = () => {
        const type = lineIndex % 3

        const data = []

        for (let i = 0; i < index; i++) {
            data.push(<div className={classes[type as keyof typeof classes]} key={i} />)
        }

        return data
    }
    
    return (
        <div className='line'>
            <div className='index'>{index}</div>
            {getFigures()}
        </div>
    )
})

const App = () => {
    const [items, setItems] = useState<number[]>([])

    const add = () => {
        setItems(items => {
            const next = items.length > 1 ?  items[items.length - 2] + items[items.length - 1] : 1

            return [
                ...items,
                next
            ]
        })
    }

    const remove = () => {
        setItems(items => [...items.slice(0, -1)])
    }

    const restart = () => {
        setItems([])
    }

    return (
        <div className='root'>
            <div className='header'>
                <span className='icon' />
                <span className='name'>Fibonacci Sequence</span>
            </div>
            <div className='panel'>
                <span className='title margin'>Current Index <b>{items.length}</b></span>
                <div>
                    <button onClick={add} className='button main margin'>Add</button>
                    <button onClick={remove} className='button main margin'>Remove</button>
                    <button onClick={restart} className='button margin'>Restart</button>
                </div>
            </div>
            <div className='container'>
                {items.map((item, index) => {
                    return <Line key={index} index={item} lineIndex={index} />
                })}
            </div>
            {items.length > 9 && <div className='dialog'>
                <div className='alert margin'>
                    <div className='title margin text'>Current index is {items.length}</div>
                    <div className='margin text'>The game will restart</div>
                    <button onClick={restart} className='button main margin'>Restart</button>
                </div>
            </div>}
        </div>
    )
}

export default App
