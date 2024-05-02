<script lang="ts">
  import { format } from 'date-fns';  
  import { settings } from '../store/store';

  export let prayerName: string;
  export let prayerTime: Date;
  export let isNextPrayer: boolean;

  function translatePrayerName(prayer: string): string {
    switch (prayer) {
      case 'Fajr':
        return 'Subuh';
      case 'Sunrise':
        return 'Terbit Matahari';
      case 'Dhuhr':
        return 'Zohor';
      case 'Asr':
        return 'Asar';
      case 'Maghrib':
        return 'Maghrib';
      case 'Isha':
        return 'Isyak';
      default:
        return prayer; // Return the original name if not found
    }
  }

  function translateTimeUnits(text) {
    switch (text) {
      case 'hours':
        return 'jam';
      case 'hour':
        return 'jam';
      case 'minutes':
        return 'minit';
      case 'minute':
        return 'minit';
      default:
        return text;
    }
  }

  // Exported variable from another component
  export let timeToNextPrayer: string;

  // Translated version of timeToNextPrayer
  let translatedTimeToNextPrayer = "";

  function updateTranslatedTime() {
    console.log("timeToNextPrayer:", timeToNextPrayer); // Debugging
    if (!timeToNextPrayer) return; // Ensure timeToNextPrayer is defined
    let [prefix, ...rest] = timeToNextPrayer.split(" ");
    prefix = "dalam";
    let [timeValue, unit] = rest.join(" ").split(" ");
    let translatedUnit = translateTimeUnits(unit);
    translatedTimeToNextPrayer = `${prefix} ${timeValue} ${translatedUnit}`;
    console.log("translatedTimeToNextPrayer:", translatedTimeToNextPrayer); // Debugging
  }

  // Update the translated string whenever timeToNextPrayer changes
  $: updateTranslatedTime();
</script>

<div
  class="content-box"
  class:active={isNextPrayer}
  class:muted={!isNextPrayer}
>
  <div class="waqt-name">
    {#if isNextPrayer}
      {translatePrayerName(prayerName)}
      <span class="next-waqt-time">{translatedTimeToNextPrayer}</span>
    {:else}
      {translatePrayerName(prayerName)}
    {/if}
  </div>
  <div class="waqt-time">
    {#if prayerTime != null && !isNaN(prayerTime.getTime()) && $settings.timeFormat != null}
      <div>{format(prayerTime, $settings.timeFormat)}</div>
    {:else}
      ...
    {/if}
  </div>
</div>


<style lang="scss">
  @import '../styles/variables';

  .content-box {
    margin: 10px;
    padding: 25px;
    color: white;
    z-index: 1;
    border-radius: 1.4rem;
    backdrop-filter: blur(10px);
  }
  .content-box:nth-child(1) {
    color: map-get($map: $fajr-style, $key: foreground);
    background: map-get($map: $fajr-style, $key: background);
  }
  .content-box:nth-child(2) {
    color: map-get($map: $sunrise-style, $key: foreground);
    background: map-get($map: $sunrise-style, $key: background);
  }
  .content-box:nth-child(3) {
    color: map-get($map: $dhuhr-style, $key: foreground);
    background: map-get($map: $dhuhr-style, $key: background);
  }
  .content-box:nth-child(4) {
    color: map-get($map: $asr-style, $key: foreground);
    background: map-get($map: $asr-style, $key: background);
  }
  .content-box:nth-child(5) {
    color: map-get($map: $maghrib-style, $key: foreground);
    background: map-get($map: $maghrib-style, $key: background);
    backdrop-filter: blur(90px);
  }
  .content-box:nth-child(6) {
    color: map-get($map: $isha-style, $key: foreground);
    background: map-get($map: $isha-style, $key: background);
  }
  .waqt-name {
    font-family: var(--base-font);
    font-size: 20pt;
    white-space: nowrap;
    overflow: auto;
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */
    opacity: 80%;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .waqt-time {
    margin-top: 20px;
    font-family: var(--base-font);
    font-size: 40pt;
    white-space: nowrap;
    overflow: auto;
  }

  @keyframes flash {
    0% {
      border-color: #333;
    }
    100% {
      border-color: #fff;
    }
  }
  .active {
    z-index: 99;
    box-shadow: 0 0 25px 2px white, inset 0 0 30px 2px rgba(255, 255, 255, 0.5);
    @include backlight(
      0,
      0,
      5vw,
      1.2,
      var(--glow-color),
      var(--glow-color-secondary),
      10s
    );
  }
  .muted {
    filter: grayscale(80%) opacity(50%);
  }
</style>
