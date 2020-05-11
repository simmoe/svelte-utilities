<script>
import { scale } from 'svelte/transition'

let image, canvas, video, data
let picTaken = false
//The width to height ratio of a Golden Rectangle is 1:1.618
let height = 300
let width = height * 1.618

const takepicture = () => {
    var context = canvas.getContext('2d')
    context.drawImage(video, 0, 0, width, height)    
    data = canvas.toDataURL('image/png')
    picTaken = true
}

const startvideo = () => {
    navigator.mediaDevices.getUserMedia({ video: { width: width, height: height }, audio: false})
    .then(function(stream) {
        video.srcObject = stream
        video.play()
    })
    .catch(function(err) {
        console.log("An error occurred: " + err);
    })
}
</script>

<canvas bind:this={canvas} height={height} width={width} style='display:none;'/>
<section>
    <video bind:this={video} class="video" use:startvideo />
    <img class='golden'  src="./assets/golden.png" alt="">
    {#if picTaken}
        <img transition:scale class='photo' src={data} alt="camera" />
    {/if}
    <div class="buttons">    
        <button transition:scale on:click={takepicture}>take a picture</button>
        {#if picTaken}
            <button in:scale on:click={() => picTaken = false }>clear</button>
            <a transition:scale={{delay:400}} href={data} download = 'profile.png'>save</a>
        {/if}
    </div>
</section>

<style>
    section{
        position:relative;
        overflow:hidden;
    }
    video{
        justify-self:start;
    }
    .golden, .photo{
        position:absolute;
        left:0;
        top:0;
        height:100%;
    }
    .buttons{
        position:absolute;
        display:grid;
        height:8rem;
        grid-template-rows:repeat(3, 1fr);
        right:0;
        bottom:0;
    }
    button, a{
        border:none;
        color:#4285F4;
        cursor: pointer;
        text-decoration: none;
    }
</style>