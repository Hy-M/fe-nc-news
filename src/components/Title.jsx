import React from 'react';

const Title = ({ user }) => {
    return (
            <div>
                <header className="header">
                    <h1 className="header--title">NC News</h1>
                    {/* <img className="header--logo" src='https://pbs.twimg.com/media/Dc6Z6GbWkAELnoS.png' alt="NC logo"></img> */}
                    <p className="header--username">{user} is logged in!</p>
                </header>
            </div>
    );
};

export default Title;