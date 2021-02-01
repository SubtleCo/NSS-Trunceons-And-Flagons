
import { GameSetup } from './game/GameSetupForm.js'
import './game/LiveGameForm.js';
import "./players/PlayerForm.js"
import './teams/TeamForm.js'
import './scores/ScoreDataProvider.js'
import {getFullTeams} from './teams/TeamDataProvider.js';



console.log("Welcome to the main module")

getFullTeams().then(GameSetup);
