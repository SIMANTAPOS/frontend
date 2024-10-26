<template>
  <footer class="footer">
    <div class="footer-text">
      &copy; 2024 SIMANTAPOS. All rights reserved.
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style scoped>
.footer {
  background-color: #FFFFFF;
  padding: 10px 20px;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  box-sizing: border-box;
  font-size: 14px;
  position: relative;
  bottom: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center; 
  text-align: center;
}

.footer-text {
  color: #8F8F8F;
}

@media (max-width: 768px) {
  .footer {
    flex-direction: column;
    text-align: center;
  }

  .footer-links {
    margin-top: 10px;
  }
}
</style>
