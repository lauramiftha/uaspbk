<template>
    <div id="app">
      <h1 class="title">Tic Tac Toe</h1>
      <div class="board">
        <div v-for="(cell, index) in board" :key="index" @click="makeMove(index)">
          <div class="cell" :class="{'x': cell === 'X', 'o': cell === 'O'}">
            {{ cell }}
          </div>
        </div>
      </div>
      <div v-if="winner" class="result-message animated fadeIn">
        <h2>{{ winner }} wins!</h2>
        <button @click="resetGame">Play Again</button>
      </div>
      <div v-if="!winner && !isGameDraw" class="time-left animated fadeIn">
        <p>Time left: {{ timeLeft }}</p>
      </div>
      <div v-if="isGameDraw && !winner" class="result-message animated fadeIn">
        <h2>It's a draw!</h2>
        <button @click="resetGame">Play Again</button>
      </div>
      <div v-if="winner || isGameDraw" class="score animated fadeIn">
        <h3>Score</h3>
        <p>Player X: {{ playerXScore }}</p>
        <p>Player O: {{ playerOScore }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        board: ['', '', '', '', '', '', '', '', ''],
        currentPlayer: 'X',
        winner: null,
        isGameDraw: false,
        playerXScore: 0,
        playerOScore: 0,
        timeLeft: 60,
      };
    },
    methods: {
      makeMove(index) {
        if (!this.board[index] && !this.winner && !this.isGameDraw) {
          this.board.splice(index, 1, this.currentPlayer);
          if (this.checkWin(this.currentPlayer)) {
            this.winner = this.currentPlayer;
            if (this.currentPlayer === 'X') {
              this.playerXScore++;
            } else {
              this.playerOScore++;
            }
            this.$nextTick(() => {
              const resultMessage = document.querySelector(".result-message");
              resultMessage.classList.add("animated", "bounce");
            });
          } else if (this.checkDraw()) {
            this.isGameDraw = true
            this.$nextTick(() => {
              const resultMessage = document.querySelector(".result-message");
              resultMessage.classList.add("animated", "shake");
            });
          } else {
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
          }
        }
      },
      checkWin(player) {
        const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      return winningCombos.some(combo => {
        return combo.every(index => this.board[index] === player);
      });
      },
      checkDraw() {
        return this.board.every(cell => cell === 'X' || cell === 'O');
      },
      resetGame() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.winner = null;
        this.isGameDraw = false;
      },
      updateTimeLeft() {
        if (this.timeLeft > 0 && !this.winner && !this.isGameDraw) {
          this.timeLeft--;
        }
        if (this.timeLeft === 0) {
          this.isGameDraw = true;
        }
      },
    },
    mounted() {
      setInterval(this.updateTimeLeft, 1000);
    },
  };
  </script>
  
  <style scoped>
  #app {
    text-align: center;
    padding: 20px;
  }
  
  .title {
    font-size: 36px;
    margin-bottom: 20px;
    color: #336699;
  }
  
  .board {
    display: grid;
    grid-template-columns: repeat(3, 100px);
    gap: 5px;
    justify-content: center;
  }
  
  .cell {
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48px;
    border: 1px solid #000;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .cell.x {
    background-color: #ff6347;
    color: #fff;
  }
  
  .cell.o {
    background-color: #66cc66;
    color: #fff;
  }
  
  .button {
    background-color: #336699;
    color: #fff;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 10px;
  }
  
  .button:hover {
    background-color: #2c4d75;
  }
  
  /* Animasi */
  .animated {
    animation-duration: 1s;
  }
  
  .fadeIn {
    animation-name: fadeIn;
  }
  
  .bounce {
    animation-name: bounce;
  }
  
  .shake {
    animation-name: shake;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes bounce {
    from, 20%, 53%, 80%, to {
      animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
      transform: translate3d(0, 0, 0);
    }
    40%, 43% {
      animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
      transform: translate3d(0, -30px, 0);
    }
    70% {
      animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
      transform: translate3d(0, -15px, 0);
    }
    90% {
      transform: translate3d(0,-4px,0);
    }
  }
  
  @keyframes shake {
    from, to {
      transform: translateX(0);
    }
    10%, 30%, 50%, 70%, 90% {
      transform: translateX(-10px);
    }
    20%, 40%, 60%, 80% {
      transform: translateX(10px);
    }
  }
  </style>
  
  