import React from 'react';

const Title = ({ user }) => {
    return (
            <div>
                <header className="header">
                    <img className="header--logo" src='https://pbs.twimg.com/media/Dc6Z6GbWkAELnoS.png' alt="NC logo"></img>
                    <h1 className="header--title">News</h1>
                    <p className="header--username"><i className="fas fa-user-alt"></i>{user} is logged in</p>
                </header>
            </div>
    );
};

export default Title;