<template>
    <div class="stopwatch">
      <div class="circle">
        <div class="time">
          <span class="hour">{{ formatTime.hours }}</span>:
          <span class="minute">{{ formatTime.minutes }}</span>:
          <span class="second">{{ formatTime.seconds }}</span>:
          <span class="millisecond">{{ formatTime.milliseconds }}</span>
        </div>
      </div>
      <div class="controls">
        <button @click="toggleTimer" :class="{ running: running }">
          {{ running ? 'Stop' : 'Start' }}
        </button>
        <button @click="reset" :disabled="!running && time === 0">Reset</button>
      </div>
    </div>
</template>
  
<script>
export default {
    data() {
      return {
        running: false,
        time: 0,
        timer: null
      };
    },
    computed: {
      formatTime() {
        let hours = Math.floor(this.time / 3600000);
        let minutes = Math.floor((this.time % 3600000) / 60000);
        let seconds = Math.floor((this.time % 60000) / 1000);
        let milliseconds = this.time % 1000;
  
        return {
          hours: this.padNumber(hours),
          minutes: this.padNumber(minutes),
          seconds: this.padNumber(seconds),
          milliseconds: this.padNumber(milliseconds, 2)
        };
      }
    },
    methods: {
      padNumber(number, size = 2) {
        return number.toString().padStart(size, '0');
      },
      toggleTimer() {
        if (this.running) {
          clearInterval(this.timer);
        } else {
          this.timer = setInterval(() => {
            this.time += 10;
          }, 10);
        }
        this.running = !this.running;
      },
      reset() {
        clearInterval(this.timer);
        this.time = 0;
        this.running = false;
      }
    },
    beforeUnmount() {
      clearInterval(this.timer);
    }
};
</script> 
  
<style scoped>
  .stopwatch {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }

  .circle {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 330px;
    height: 300px;
    border-radius: 50%;
    background: linear-gradient(135deg, lightgrey,grey,lightblue);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
    position: relative;
    overflow: hidden;
  }

  .circle::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    transform: scaleX(1.2);
    opacity: 0.6;
    filter: blur(10px);
    animation: shadowAnimation 6s infinite alternate;
  }

  @keyframes shadowAnimation {
    0% {
      transform: scaleX(1.2);
    }
    100% {
      transform: scaleX(1);
    }
  }

  .time {
    font-size: 40px; 
    font-weight: bold;
    color: #fff;
    text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.5);
  }

  .time span {
    padding: 0 10px;
  }

  .circle::after {
    content: '';
    position: absolute;
    width: 3px;
    height: 50%;
    background-color: #fff;
    top: 25%;
    left: 50%;
    transform-origin: bottom;
    transform: translateX(-50%) rotate(0deg);
    animation: tickAnimation 60s infinite;
  }

  @keyframes tickAnimation {
    from {
      transform: translateX(-50%) rotate(0deg);
    }
    to {
      transform: translateX(-50%) rotate(360deg);
    }
  }

  .controls {
    display: flex;
    gap: 10px;
    margin-top: 20px;
    justify-content: center;
  }

  button {
    font-size: 24px;
    padding: 12px 24px;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
    background-color: #4CAF50;
    color: white;
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }

  button.running {
    background-color: #f44336;
  }

  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
</style>


