<script lang="ts">
  import FaCog from 'svelte-icons/fa/FaCog.svelte';

  export let onClick: () => void;
  export let localTime: Date;
  export let timeZone: string;
</script>

<div id="header-box">
  <div id="header-text">Waktu Solat</div>

  <button title="Settings" on:click={onClick}>
    <div class="icon">
      <FaCog />
    </div>
  </button>
</div>

<style lang="scss" scoped>
  @import '../styles/variables';

  #header-box {
    font-family: var(--base-font);
    color: #ddd;
    padding: 20px;
    font-size: 20pt;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    #header-text {
      color: #bbb;
    }
  }
  .icon {
    color: #bbb;
    width: 1.6rem;
    height: 1.6rem;
  }
</style>
