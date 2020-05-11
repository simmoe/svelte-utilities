<script>
import { MicOutlineIcon } from 'svelte-eva-icons'
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
    {#if !recording && !recordedFile}
        <div class="icon" on:click={startRecording}>
            <MicOutlineIcon /> 
        </div>
    {/if}
    {#if recording}
        <div class="icon red" on:click={stopRecording}>
            <MicOutlineIcon /> 
        </div>
    {/if}
    
    <div class="buttons">    
    {#if recordedFile}
        <p class='link' on:click={clear}>clear</p>
        <a download="rec.webm" on:click={save}>save</a>
    {/if}
    </div>
</section>

<style>
    .buttons{
        position:absolute;
        bottom:2rem;
        display:grid;
        grid-template-columns: repeat(2, 100px);
        align-items:center;
    }
    .icon{
        height:100px;
        width:100px;
    }
    .red{
        fill:orangered;
    }
    a, .link{
        cursor:pointer;
    }
</style>
