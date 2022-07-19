import React from 'react'

const Navbar = ({web3Handler,account}) => {

  return (
    <nav className="flex-between">
 
    

    {account ? (
        <a
            href={`${""}/address/${account}`}
            target="_blank"
            rel="noopener noreferrer"
            className="button">
            {account.slice(0, 5) + '...' + account.slice(38, 42)}
        </a>
    ) : (
        <button onClick={web3Handler} className="button">Connect Wallet</button>
    )}
</nav>
  )
}

export default Navbar