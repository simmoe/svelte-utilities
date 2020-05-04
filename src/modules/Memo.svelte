<script>
import IoIosMic from 'svelte-icons/io/IoIosMic.svelte'
let audio 
let audioChunks = []
let mediaRecorder
let recording = false
let recordedFile = false

const startRecording = node => {
    navigator.mediaDevices.getUserMedia({ audio: true})
    .then(function(stream) {
        mediaRecorder = new MediaRecorder(stream)
        mediaRecorder.start()
        recording = true
        mediaRecorder.addEventListener('dataavailable', event => audioChunks.push(event.data))
        mediaRecorder.addEventListener('stop', () => {
            let blob = new Blob(audioChunks)
            audio.src = URL.createObjectURL(blob)
            audio.controls = true
            recordedFile = true
        })
    })
    .catch(function(err) {
        console.log("An error occurred: " + err);
    })
}

const stopRecording = () => {
    mediaRecorder.stop()
    recording = false
}

const save = (node) => {
    node.target.href = audio.src
    node.target.download = 'rec.webm'
}

const clear = () => {
    audioChunks = []
    audio.controls = false
    recordedFile = false
}

</script>



<section>
    <audio bind:this={audio} class="audio" />
    <!-- <IoIosMic /> -->
    <div class="buttons">    
    {#if recording}
        <button on:click={stopRecording}>stop</button>
    {/if}
    {#if recordedFile}
        <button on:click={clear}>clear</button>
        <a download="rec.webm" on:click={save}>save</a>
    {/if}
    {#if !recording && !recordedFile}
        <button on:click={startRecording}>start</button>
    {/if}
    </div>
</section>

<style>
    .buttons{
        position:absolute;
        bottom:2rem;
        display:grid;
        grid-template-columns: repeat(3, 200px);
    }
</style>
