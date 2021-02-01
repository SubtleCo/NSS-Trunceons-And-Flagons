export const Score = (teamID, teamScore) => {
    return {
        teamID: teamID,
        teamScore: teamScore,
        date: new Date()
    }
}