<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import FaSave from 'svelte-icons/fa/FaSave.svelte';
  import FaGithub from 'svelte-icons/fa/FaGithub.svelte';
  import { settings } from '../store/store';
  import { CalculationMethod } from 'adhan';
  import AutoComplete from 'simple-svelte-autocomplete';
  import { onMount } from 'svelte';

  export let localTime: Date;
  export let timeZone: string;

  export let onClose: () => void;

  let selectedEntry: { displayName: string; lat: number; lng: number };
  let citiesData = [];

  $: if (selectedEntry != null) {
    $settings.latitude = selectedEntry['lat'];
    $settings.longitude = selectedEntry['lng'];
    $settings.city = selectedEntry['displayName'];
  }

  onMount(() => {
    import('../cities.json').then((data) => {
      const cities = data.default.map((entry) => {
        return {
          displayName: entry[0] + ', ' + entry[1],
          lat: entry[2],
          lng: entry[3],
        };
      });
      citiesData = cities;
    });
  });
</script>

<div>
  <div id="bg" transition:fade on:click={onClose} on:keypress={() => {}} />
  <div id="settings-box" transition:fly={{ duration: 150, y: 100 }}>
    <div id="settings-header">
      <div id="settings-text">Settings</div>
      <button on:click={onClose} title="Save and close">
        <div class="icon">
          <FaSave />
        </div>
      </button>
    </div>
    <div id="settings-content">
      <div class="control">
        <label class="label" for="cmb-format">Time format</label>
        <select id="cmb-format" bind:value={$settings.timeFormat}>
          <option value="h:mm a">12-hour</option>
          <option value="H:mm">24-hour</option>
        </select>
      </div>
      <div class="control">
        <label class="label" for="cmb-method">Calculation method</label>
        <select id="cmb-method" bind:value={$settings.calcMethod}>
          <option value={CalculationMethod.Egyptian().method}>Egyptian</option>
          <option value={CalculationMethod.Karachi().method}>Karachi</option>
          <option value={CalculationMethod.Kuwait().method}>Kuwait</option>
          <option value={CalculationMethod.UmmAlQura().method}>Makkah</option>
          <option value={CalculationMethod.MoonsightingCommittee().method}>
            Moonsighting Committee
          </option>
          <option value={CalculationMethod.MuslimWorldLeague().method}>
            Muslim World League
          </option>
          <option value={CalculationMethod.NorthAmerica().method}>
            North America
          </option>
          <option value={CalculationMethod.Singapore().method}>
            Singapore
          </option>
          <option value={CalculationMethod.Turkey().method}>Turkey</option>
        </select>
      </div>
      <div class="control">
        <label for="city-input" class="label">City</label>
        <AutoComplete
          items={citiesData}
          autocomplete="off"
          labelFieldName="displayName"
          bind:selectedItem={selectedEntry}
          dropdownClassName="dropdown"
          create={false}
          placeholder={$settings.city ?? 'Search for your nearest city...'}
        />
      </div>
      <div class="control" id="latlong">
        <label class="label" for="latlong-controls">Coordinates</label>
        <div class="grouped" id="latlong-controls">
          <span>
            <input
              type="text"
              placeholder="Latitude"
              bind:value={$settings.latitude}
              on:input={() => {
                $settings.city = null;
              }}
            />
            °&nbsp;N
          </span>
          <span>
            <input
              type="text"
              placeholder="Longitude"
              bind:value={$settings.longitude}
              on:input={() => {
                $settings.city = null;
              }}
            />°&nbsp;E
          </span>
        </div>
      </div>

      <div class="control">
        <label class="label" for="color-scheme">Color scheme</label>
        <select id="color-scheme" bind:value={$settings.colorScheme}>
          <option value="default">System default</option>
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>
      </div>

      <div class="inset">
        <div id="local-time">Local date: {localTime.toLocaleDateString()}</div>
        <div id="timezone">Timezone: {timeZone}</div>
        <div>Date & time fetched from system settings</div>
      </div>
    </div>
  </div>
</div>

<svelte:window
  on:keydown={(e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }}
/>

<style lang="scss" scoped>
  @import '../styles/variables';

  .icon {
    width: 1rem;
    height: 1rem;
    display: inline-block;
    vertical-align: middle;
  }

  #bg {
    top: 0;
    left: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.4;
    z-index: 1000;
  }
  #settings-box {
    position: fixed;
    width: 30%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--bg-color);
    border-radius: 20px;
    box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.4);
    padding: 25px;
    z-index: 1001;
  }
  #settings-header {
    font-family: var(--base-font);
    font-size: 15pt;
    color: var(--text-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  /* width */
  ::-webkit-scrollbar {
    width: 8px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background-color: var(--control-bg-color);
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background-color: var(--control-bg-color-secondary);
  }

  #settings-content {
    font-family: var(--base-font);
    color: var(--text-color);
    position: relative;
    display: grid;
    grid-row-gap: 12px;
    font-size: 11pt;

    .control {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: 0.6rem;
      & > :nth-child(2) {
        flex-grow: 0;
        flex-shrink: 1;
      }
    }

    .label {
      flex-grow: 1;
      flex-shrink: 0;
    }

    .grouped {
      display: flex;
      flex-direction: row;
      gap: 0.6rem;
      flex-grow: 0;
      flex-shrink: 1;

      & > span {
        display: flex;
      }
    }

    #about-info {
      color: var(--text-color-light);
    }
    .about-link {
      margin-top: 2px;
    }

    .inset {
      background-color: var(--control-bg-color);
      border-radius: 15px;
      padding: 10px 15px;
      color: var(--text-color-light);
    }
  }

  @media (max-width: 768px) {
    #settings-box {
      width: 60%;
    }
  }
  @media (max-width: 825px) {
    #settings-box {
      width: 60%;
    }
  }
  @media (max-width: 1024px) {
    #settings-box {
      width: 50%;
    }
  }
  @media (max-width: 575px) {
    #settings-box {
      width: 90%;
      border-radius: 0;
    }
  }
  @media (max-width: 640px) {
    #settings-box {
      border-radius: 0;
    }
  }
</style>
