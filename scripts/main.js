import './game/LiveGameForm.js'
import './players/PlayerForm.js'
import './teams/TeamForm.js'
import './game/GameSetupForm.js'
import './scores/ScoreDataProvider.js'
import {getFullTeams} from './teams/TeamDataProvider.js'
import { TeamSetup } from './teams/TeamSetup.js'



console.log("Welcome to the main module")

getFullTeams().then(TeamSetup);
