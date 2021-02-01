
import { GameSetup } from './game/GameSetupForm.js'
import './game/LiveGameForm.js';
import "./players/PlayerForm.js"
import './teams/TeamForm.js'
import './scores/ScoreDataProvider.js'
import { useFullTeams, getFullTeams, getTeams } from './teams/TeamDataProvider.js';
import { getPlayers } from './players/PlayersDataProvider.js';



console.log("Welcome to the main module")

getFullTeams().then(GameSetup);

const fteam = useFullTeams();
console.log(fteam)