import React from 'react'

class HomePage extends React.Component {
    render(){
        return (
            <div>
                <h1>
                    TODO List:
                </h1>
                <h2>
                    Users
                </h2>
                <ul>
                    <li>
                        Public profiles?
                    </li>
                    <li>
                        Build user dashboard
                    </li>
                    <li>
                        Allow user password reset
                    </li>
                    <li>
                        Provide visual analytics of match data
                    </li>
                    <li>
                        Allow you to invite and add "Friends"
                    </li>
                </ul>

                <h2>
                    Decks
                </h2>
                <ul>
                    <li>
                        Allow "Public" decks
                    </li>
                    <li>
                        Allow editing decks
                    </li>
                    <li>
                        Pull meta data from decklist suppliers such as MTG Goldfish; Archideck and Tappedout.
                    </li>
                </ul>

                <h2>Matchs</h2>
                <ul>
                    <li>
                        Create match for recording
                    </li>
                    <li>
                        Track turn order; decks player; users played and who won.
                    </li>
                    <li>
                        Provider user statistics
                    </li>
                    <li>
                        Allow a match to be shared, and other users "claim" being a particpant in the match
                    </li>
                </ul>
            </div>

        )
    }
}

export default HomePage;