<template>
    <div class="slideshow-container">
      <div class="image-container">
        <img :src="currentImage" :alt="currentCaption" class="slideshow-image">
      </div>
      <br>
      <button @click="showPrevImage" class="prev-button">Prev</button>
      <button @click="showNextImage" class="next-button">Next</button>
      <p class="caption">{{ currentCaption }}</p>
    </div>
  </template>
  
  <script>
  const images = [
    {
      src: 'https://i.pinimg.com/564x/b2/11/c1/b211c1336bee3015d725d94e07a4b4ee.jpg',
      caption: 'Duck Cute',
    },
    {
      src: 'https://i.pinimg.com/564x/b7/52/02/b75202ec3600dc1b0bdd55a8a1e87207.jpg',
      caption: 'Kawaiiiiiii',
    },
    {
      src: 'https://i.pinimg.com/564x/c2/e4/49/c2e4497184e073a1150f94c52963ae2d.jpg',
      caption: 'Beautiful Girl',
    },
    {
        src:"https://i.pinimg.com/236x/d8/41/55/d84155e828b63af3e0528e9d795bdb45.jpg",
        caption:"I Like :D",
    },
    {
        src:"https://i.pinimg.com/236x/c3/f2/08/c3f208a4d019ef8ec2878883e29f6fcb.jpg",
        caption:"Closing Eyes Elegantly",
    },
    {
        src:"https://i.pinimg.com/236x/64/46/31/6446319a598ce62847b0ac799c8a1bc4.jpg",
        caption:"XieXie",
    },
    {
        src:"https://i.pinimg.com/236x/57/05/a7/5705a724b3455ea8b1960715ba58e5b5.jpg",
        caption:"Very Happy"
    },
    {
        src:"https://i.pinimg.com/236x/01/02/87/0102870603a733c0fb7b68cd1163f7a7.jpg",
        caption:"Sweet Style",
    },
    {
        src:"https://i.pinimg.com/236x/a2/3c/8f/a23c8f254e6f801b51f146428488845a.jpg",
        caption:"Waiting For A Friend To Play Bikes",
    },
    {
        src:"https://i.pinimg.com/236x/1c/f0/99/1cf099bdb025239e5dcc2e09123444b5.jpg",
        caption:"Sweet Food",
    },
    {
        src:"https://i.pinimg.com/236x/55/66/1c/55661c7cc351884234754b6b85ffc041.jpg",
        caption:"Want To Be Spoiled",
    },
    {
        src:"https://i.pinimg.com/236x/75/46/c7/7546c72f62bdbbfdbcb4ae2f7b6c009c.jpg",
        caption:"Is It Beautiful ?",
    },
    {
        src:"https://i.pinimg.com/236x/21/eb/8b/21eb8b3e607081f4d46b5ed4ad7e7d04.jpg",
        caption:"With Pleasure"
    },
    {
        src:"https://i.pinimg.com/236x/d0/b6/7f/d0b67f9e2beb6c35ed9dee7466dcf8f0.jpg",
        caption:"So Delicious",
    },
  ];
  
  export default {
    data() {
      return {
        currentIndex: 0,
      };
    },
    computed: {
      currentImage() {
        return images[this.currentIndex].src;
      },
      currentCaption() {
        return images[this.currentIndex].caption;
      }
    },
    methods: {
      showNextImage() {
        this.currentIndex = (this.currentIndex + 1) % images.length;
      },
      showPrevImage() {
        this.currentIndex = (this.currentIndex - 1 + images.length) % images.length;
      }
    }
  };
  </script>
  
  <style scoped>
  .slideshow-container {
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 400px;
    max-height: 300px;
  }
  
  .image-container {
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .slideshow-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    animation: fadeInOut 1.5s ease-in-out;
  }
  
  .next-button, .prev-button, .slideshow-button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .next-button:hover, .prev-button:hover, .slideshow-button:hover {
    background-color: #45a049;
  }
  
  .caption, .index {
    text-align: center;
    margin-top: 8px;
    font-size: 20px;
    color: #333;
    font-style: italic;
    animation: slideInFromTop 1s ease;
  }
  </style>
  