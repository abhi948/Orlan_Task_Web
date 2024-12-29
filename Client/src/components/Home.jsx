import React from 'react'

function Home() {
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Hello there</h1>
                    <p className="py-6 text-xl">
                        Welcome to the Organization manging site which stores the data of the Teams and Employee detaails for the Particular Organization...
                    </p>
                    <div className='gap-4'>

                    <a href='/organization' className=" m-5 btn btn-primary">Get Started</a>
                    <a href='/heirarchy' className="btn m-5 btn-primary">Heirarchy</a>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Home