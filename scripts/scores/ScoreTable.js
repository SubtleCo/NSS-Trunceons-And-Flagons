const tableElement = document.querySelector(".table")

export const ScoreTable = (score) => {
   const scoreTable = `
    <div class="table table__scores">
      <table>
        <tr>
            <th>Current Scores</th>
        </tr>
        <tr>
            <td>${score.team1.name}</td>
            <td>${score.team1.score}</td>
        </tr>
        <tr>
            <td>${score.team2.name}</td>
            <td>${score.team2.score}</td>
        </tr>
        <tr>
            <td>${score.team3.name}</td>
            <td>${score.team3.score}</td>
        </tr>
      </table>
    </div>
  `
  render(scoreTable)
}

const render = scoreTable => {
    tableElement.innerHTML = scoreTable
}